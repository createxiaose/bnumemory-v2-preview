/* Same-origin anonymous persistence. Credentials stay in HttpOnly cookies. */
(()=>{'use strict';
 const DIRTY='muduo-v2-cloud-dirty',OUTBOX='muduo-v2-cloud-outbox';let csrf='',revision=0,ready=false,started=false,blocked=false,writing=false,timer,onState=()=>{},pendingState=null,lastSignature='',conflict=null,chain=Promise.resolve();
 const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
 const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
 const cloudState=value=>({...structuredClone(value),drafts:[],feedback:[]});
 function status(kind,message){window.dispatchEvent(new CustomEvent('muduo-cloud-status',{detail:{kind,message,ready,revision,conflict,recoveryKey:cloud.recoveryKey||null}}))}
 async function request(url,{method='GET',body,raw=false,headers={}}={}){
  const h={...headers};if(body!==undefined&&!raw)h['Content-Type']='application/json';if(method!=='GET'&&csrf)h['X-CSRF-Token']=csrf;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),30000);
  try{const response=await fetch(url,{method,credentials:'same-origin',headers:h,body:body===undefined?undefined:raw?body:JSON.stringify(body),signal:controller.signal});let value={};try{value=await response.json()}catch{}
   if(!response.ok){const e=Error(value.message||value.error||'服务暂时没有响应');e.status=response.status;e.data=value;throw e}return value;
  }catch(e){if(e.name==='AbortError')throw Error('请求等待超时，请稍后重试');throw e}finally{clearTimeout(timeout)}
 }
 function serial(fn){const result=chain.then(fn);chain=result.catch(()=>{});return result}
 function setConflict(error,local){blocked=true;conflict={state:error.data?.current,revision:error.data?.revision,local};status('conflict','云端已有更新，本机内容已保留。请在设置中选择采用哪一份。')}
 async function put(snapshot){if(!ready||blocked)return;status('saving','正在保存到云端…');try{const result=await request('/api/me/state',{method:'PUT',body:{state:snapshot,revision}});revision=result.revision;lastSignature=JSON.stringify(snapshot);write(DIRTY,!!pendingState&&JSON.stringify(pendingState)!==lastSignature);status('saved','已保存到云端和本机')}catch(e){if(e.status===409)setConflict(e,snapshot);else{write(DIRTY,true);status(e.status>=400&&e.status<500?'error':'offline',e.status>=400&&e.status<500?'云端未接受本次保存：'+e.message+'。本机副本已保留。':'云端暂不可达，改动已保存在本机，等待重试。')}throw e}}
 async function flush(){clearTimeout(timer);const snapshot=pendingState;pendingState=null;if(snapshot)await serial(()=>put(snapshot))}
 async function outbox(){if(!ready||blocked)return;let items=read(OUTBOX,[]);for(const item of items){try{const result=await serial(async()=>{await flushBeforeCompletion();return request('/api/completions',{method:'POST',body:item})});revision=result.revision;onState(result.state,{reason:'completion'});items=items.filter(x=>x.eventId!==item.eventId);write(OUTBOX,items)}catch(e){if(e.status===409)setConflict(e);else status('offline','本次体验已留在本机，纪念物将在联网后同步。');break}}}
 async function flushBeforeCompletion(){const snapshot=pendingState;pendingState=null;clearTimeout(timer);if(snapshot)await put(snapshot)}
 const cloud={recoveryKey:null,features:{},get ready(){return ready},get conflict(){return conflict},get pendingStoryIds(){return read(OUTBOX,[]).map(x=>x.storyId)},request,
  async start(local,callback){started=true;onState=callback;status('connecting','正在连接匿名档案…');try{const health=await request('/api/health');if(!health.ok)throw Error('服务未就绪');cloud.features=health.features||{};const session=await request('/api/session',{method:'POST',body:{}});csrf=session.csrfToken;cloud.recoveryKey=session.recoveryKey||null;const remote=await request('/api/me/state');revision=remote.revision||0;ready=true;
   if(remote.state){if(read(DIRTY,false)&&JSON.stringify(cloudState(local))!==JSON.stringify(cloudState(remote.state))){blocked=true;conflict={state:remote.state,revision,local:structuredClone(local)};status('conflict','有尚未同步的本机修改，请在设置中选择保存版本。')}else{lastSignature=JSON.stringify(cloudState(remote.state));onState(remote.state,{reason:'restore'});status('saved','已恢复云端档案')}}else{pendingState=cloudState(local);await flush()}
   await outbox();return true;
  }catch(e){ready=false;status('offline','当前只保存到本机，云端服务尚未连接。');return false}},
  save(snapshot){if(!started)return;const clean=cloudState(snapshot),value=JSON.stringify(clean);if(value===lastSignature)return;pendingState=clean;write(DIRTY,true);if(!ready||blocked){status(blocked?'conflict':'offline',blocked?'云端与本机有不同版本，请在设置中处理。':'已保存本机，云端连接恢复后可重试同步。');return}clearTimeout(timer);timer=setTimeout(()=>flush().catch(()=>{}),650)},
  async retry(local){if(!ready)return cloud.start(local,onState);if(blocked){status('conflict','请先选择本机或云端版本。');return false}pendingState=cloudState(local);await flush();await outbox();return true},
  async resolve(choice,local){if(!conflict) return;const remote=conflict;revision=remote.revision;blocked=false;conflict=null;if(choice==='remote'){onState(remote.state,{reason:'restore'});lastSignature=JSON.stringify(cloudState(remote.state));pendingState=null;write(DIRTY,false);status('saved','已采用云端版本；原本机副本仍可从设置下载')}else{pendingState=cloudState(local);await flush()}await outbox()},
  complete(item){const items=read(OUTBOX,[]);if(!items.some(x=>x.storyId===item.storyId)){items.push(item);write(OUTBOX,items)}if(ready&&!blocked)outbox().catch(()=>{})},
  async submit(value){if(!ready||blocked)throw Error('请先连接云端并处理存档冲突，再提交故事。');return request('/api/submissions',{method:'POST',body:value})},
  async upload(file){if(!ready)throw Error('云端未连接');const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';return request('/api/media',{method:'POST',raw:true,body:file,headers:{'Content-Type':file.type,'X-Filename':'upload.'+ext}})},
  async submissions(){return ready?request('/api/me/submissions'):{submissions:[]}},
  async action(id,action){if(!ready)throw Error('云端未连接');return request('/api/submissions/'+encodeURIComponent(id)+'/'+action,{method:'POST',body:{}})},
  async stories(){return request('/api/stories')},
  async feedback(text){if(!ready)throw Error('云端未连接，反馈已保存在本机');return request('/api/feedback',{method:'POST',body:{text,eventId:crypto.randomUUID()}})},
  async recover(key){status('connecting','正在恢复档案…');clearTimeout(timer);await chain;const session=await request('/api/session/recover',{method:'POST',body:{recoveryKey:key}});csrf=session.csrfToken;cloud.recoveryKey=null;const remote=await request('/api/me/state');ready=true;blocked=false;conflict=null;revision=remote.revision;pendingState=null;write(DIRTY,false);write(OUTBOX,[]);onState(remote.state,{reason:'restore'});lastSignature=JSON.stringify(cloudState(remote.state));status('saved','已恢复这份匿名云端档案');return true}
 };
 window.MuduoCloud=cloud;
})();
