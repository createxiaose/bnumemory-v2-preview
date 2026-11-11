(()=>{'use strict';
const KEY='muduo-v2-design-demo-v1',GUIDE='muduo-v2-guide-dismissed-v1',$=id=>document.getElementById(id);
const defaults=()=>({schema:1,page:'history',settings:{music:40,sfx:65,muted:false,reduce:false,large:false},memories:[],unlocks:['desk','chair','bookshelf','lamp'],layout:[{id:'desk',x:4,y:3},{id:'chair',x:3,y:4},{id:'bookshelf',x:0,y:1},{id:'lamp',x:8,y:3}],drafts:[],feedback:[],lampOn:true,roomTheme:'day'});
let state=defaults(),persistent=true,guideSeen=false;
try{const raw=localStorage.getItem(KEY);if(raw){const value=JSON.parse(raw);state=validate(value)}guideSeen=localStorage.getItem(GUIDE)==='yes'}catch{persistent=false}
function validate(v){if(v?.schema!==1||!['history','community','home'].includes(v.page)||!Array.isArray(v.layout)||v.layout.length>12||!Array.isArray(v.memories)||v.memories.length>100||!Array.isArray(v.unlocks)||!Array.isArray(v.drafts)||v.drafts.length>20||!Array.isArray(v.feedback)||v.feedback.length>20)throw Error('备份格式不正确');const clean=defaults();for(const name of ['music','sfx']){if(!Number.isFinite(v.settings?.[name])||v.settings[name]<0||v.settings[name]>100)throw Error('声音设置不正确');clean.settings[name]=v.settings[name]}for(const name of ['muted','reduce','large'])clean.settings[name]=v.settings[name]===true;clean.page=v.page;clean.memories=v.memories.filter(x=>typeof x.id==='string'&&typeof x.title==='string').map(x=>({id:x.id.slice(0,50),title:x.title.slice(0,100),kind:x.kind==='history'?'history':'community',date:String(x.date).slice(0,30)}));clean.unlocks=[...new Set(v.unlocks.filter(x=>['desk','chair','bookshelf','lamp','plant','bell','frame','camera'].includes(x)))];clean.layout=v.layout.map(x=>{if(!clean.unlocks.includes(x.id)||!Number.isInteger(x.x)||!Number.isInteger(x.y)||x.x<0||x.y<0||x.x>11||x.y>5)throw Error('家具位置不正确');return{id:x.id,x:x.x,y:x.y}});if(new Set(clean.layout.map(x=>x.id)).size!==clean.layout.length)throw Error('家具重复');clean.drafts=v.drafts.map(x=>({title:String(x.title).slice(0,60),text:String(x.text).slice(0,3000),date:String(x.date).slice(0,30)}));clean.feedback=v.feedback.map(x=>({text:String(x.text).slice(0,2000),date:String(x.date).slice(0,30)}));clean.lampOn=v.lampOn!==false;clean.roomTheme=v.roomTheme==='night'?'night':'day';return clean}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));$('saveStatus').textContent='已保存到当前浏览器'}catch{persistent=false;$('saveStatus').textContent='当前为临时体验，无法持久保存；请导出备份'}}
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let toastTimer;
function toast(text){$('toast').textContent=text;$('toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').style.display='none',3200)}
const history=[['y1949','1949 · 新校牌','把新的名字，挂在门前','试着挂上校牌，留住一次重新出发。','media/plaque.png','plant'],['y1902','1902 · 一间教室','从一页讲义开始','走进教室，做一次关于学习的选择。','media/classroom.png','bell'],['y1971','1971 · 灯下点校','字里行间，一盏灯','翻开书稿，看看一段文字如何被留下。','media/editor.png','frame'],['y2002','2002 · 百年校庆','站在同一片阳光里','试一次取景，把眼前的相聚记下来。','media/celebration.png','camera']];
const stories=[{id:'night',title:'教室的灯还亮着',tag:'课堂 · 夜读',image:'media/editor.png',reward:'frame',lines:['那天自习结束得很晚。走廊已经安静下来，窗边还留着最后一盏灯。','你把散开的书页理好，听见隔壁有人轻轻关上门。桌面上的光，还够照亮一句话。','后来想起校园时，记得的不只是哪一门课，还有那盏陪你多坐了一会儿的灯。'],choices:['再读一页','把书轻轻合上']},{id:'track',title:'散场后的操场',tag:'操场 · 相遇',image:'media/celebration.png',reward:'camera',lines:['活动散场后，操场上的声音渐渐远了。你和朋友还站在原地，谁也没急着说再见。','夕阳把影子拉得很长。有人举起相机，又笑着说，不用站得那么整齐。','照片未必记得所有细节，但那天一起走回去的路，留在了你的记忆里。'],choices:['把这一刻拍下来','陪朋友再走一圈']},{id:'window',title:'窗边的一点绿',tag:'日常 · 校园',image:'media/classroom.png',reward:'plant',lines:['你总喜欢坐在同一扇窗边。窗外的一点绿，从学期开始陪到了学期末。','这次，你停下翻页，看见风把叶子吹向另一边。原来熟悉的地方，也一直在变化。','你决定给今天留一句话：愿以后也能发现，这些很小、却值得记住的时刻。'],choices:['看一会儿窗外','写下一句话']}];
$('historyCards').innerHTML=history.map(h=>`<article class="card"><img src="${h[4]}" alt="${h[1]}像素场景"><div class="card-body"><span class="meta">${h[1]}</span><h3>${h[2]}</h3><p>${h[3]}</p></div><button data-history="${h[0]}">体验一次选择 →</button></article>`).join('');
$('communityCards').innerHTML=stories.map(s=>`<article class="card"><img src="${s.image}" alt="演示故事的像素场景"><div class="card-body"><span class="meta">${s.tag} · 虚构演示</span><h3>${s.title}</h3><p>${s.lines[0]}</p></div><button data-story="${s.id}">走进这页记忆 →</button></article>`).join('');
const method=[['记忆锚点','哪件小物、哪一束光，让你一下想起那一天？'],['人物处境','那时的你在做什么，又在期待什么？'],['玩家动作','让后来的人亲手做哪一个动作，能靠近这段记忆？'],['世界反馈','做完以后，场景里会发生什么变化？'],['余留物','故事结束后，希望留下一件什么小东西？'],['可信边界','哪些是真实发生，哪些是为体验作的概括或创作？']];
$('methodQuestions').innerHTML=method.map((x,i)=>`<article><h3>0${i+1}　${x[0]}</h3><p>${x[1]}</p></article>`).join('');
const routeNames={history:'校史回忆',community:'我们的 BNU',home:'我的家园',settings:'设置与帮助',welcome:'第一次来',method:'记忆可玩方法',feedback:'我要反馈',draft:'留下我的故事',story:'一页校园记忆',player:'走进校史'};
let currentRoute=state.page,routeStack=[];
function go(page,push=true){
 if(!routeNames[page])page='history';
 if(push&&page!==currentRoute)routeStack.push(currentRoute);
 currentRoute=page;
 document.querySelectorAll('.page').forEach(x=>x.hidden=x.id!==page);
 document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===page));
 $('settingsOpen').classList.toggle('active',['settings','welcome','method','feedback'].includes(page));
 $('routeBar').hidden=['history','community','home'].includes(page);$('routeTitle').textContent=routeNames[page];
 if(['history','community','home'].includes(page)){state.page=page;save()}
 renderCollections();syncPlayerPause();window.scrollTo(0,0);
 if(location.hash!=='#/'+page)window.history.pushState({route:page},'', '#/'+page);
 if(page==='home')startRoomLoop();else stopRoomLoop();
}
function back(){go(routeStack.pop()||state.page,false)}
$('routeBack').onclick=back;document.querySelector('.brand').onclick=e=>{e.preventDefault();go('history')};
window.addEventListener('popstate',()=>{const target=location.hash.replace('#/','');go(target==='player'&&!playing?'history':target,false)});
function open(id){if(id==='guide'){if(!$('guide').open)$('guide').showModal()}else go(id);syncPlayerPause()}
function close(id){if(id==='guide'){$('guide').close();dismissGuide()}else{if(id==='player'){$('gameFrame').src='about:blank';playing=null}back()}syncPlayerPause()}
function dismissGuide(){guideSeen=true;try{localStorage.setItem(GUIDE,'yes')}catch{persistent=false;toast('引导本次已关闭；浏览器限制保存，下次可能再次出现。')}}
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>close(b.dataset.close));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('cancel',e=>{e.preventDefault();close(d.id)});d.addEventListener('close',()=>{if(d.id==='guide')dismissGuide();syncPlayerPause()})});
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>go(b.dataset.page));
$('settingsOpen').onclick=()=>open('settings');$('playerSettings').onclick=()=>open('settings');
$('guideAgain').onclick=()=>open('welcome');$('methodOpen').onclick=()=>open('method');$('feedbackOpen').onclick=()=>open('feedback');
$('guideStart').onclick=()=>{close('guide');go('history');launchHistory('y1949')};$('guideExplore').onclick=()=>close('guide');$('draftOpen').onclick=()=>open('draft');
function applySettings(){for(const name of ['music','sfx']){$(name).value=state.settings[name];$(name+'Value').textContent=state.settings[name]+'%'}$('muted').checked=state.settings.muted;$('reduceMotion').checked=state.settings.reduce;$('largeText').checked=state.settings.large;document.body.classList.toggle('reduced',state.settings.reduce);document.body.classList.toggle('large',state.settings.large);const control=$('gameFrame').contentWindow?.__demoControl;if(control)control.settings(state.settings);save()}
for(const name of ['music','sfx'])$(name).oninput=()=>{state.settings[name]=Number($(name).value);applySettings()};
for(const [id,key]of [['muted','muted'],['reduceMotion','reduce'],['largeText','large']])$(id).onchange=()=>{state.settings[key]=$(id).checked;applySettings()};
let audio;function bell(){if(state.settings.muted||!state.settings.sfx)return;try{audio||=new AudioContext();audio.resume();[220,330,440,660].forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=f;o.connect(g);g.connect(audio.destination);g.gain.setValueAtTime(.05/(i+1)*state.settings.sfx/100,audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+1.5);o.start();o.stop(audio.currentTime+1.6)})}catch{toast('这个浏览器暂时不能播放声音')}}$('trySound').onclick=bell;
function download(value,name){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('exportData').onclick=()=>download({type:'muduo-v2-demo-backup',savedAt:new Date().toISOString(),guideSeen,state},'木铎声里-Demo本机备份.json');$('importData').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>1024*1024)throw Error('备份应小于1MB');const value=JSON.parse(await file.text());if(value.type!=='muduo-v2-demo-backup')throw Error('这不是Demo备份');const imported=validate(value.state);validateLayout(imported.layout,imported.unlocks);state=imported;preview=structuredClone(state.layout);if(value.guideSeen)dismissGuide();for(const item of state.layout){if(!validPlacement(item,state.layout)){let done=false;for(let y=0;y<6&&!done;y++)for(let x=0;x<12&&!done;x++){const proposal={...item,x,y};if(validPlacement(proposal,state.layout)){item.x=x;item.y=y;done=true}}}}preview=structuredClone(state.layout);
applySettings();const requested=location.hash.replace('#/','');go(routeNames[requested]&&!['player','story'].includes(requested)?requested:state.page,false);toast('已恢复这份本机备份')}catch(e){toast(e.message)}e.target.value=''};
$('feedbackForm').onsubmit=e=>{e.preventDefault();const text=$('feedbackText').value.trim();if(!text)return;state.feedback.push({text,date:new Date().toISOString()});state.feedback=state.feedback.slice(-20);save();$('feedbackForm').reset();close('feedback');toast('已保存本机反馈，未向外发送')};
let previewUrl; $('draftImage').onchange=e=>{if(previewUrl)URL.revokeObjectURL(previewUrl);const file=e.target.files[0];if(!file){$('draftPreview').hidden=true;return}if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>10*1024*1024){toast('请选择10MB以内的PNG、JPEG或WebP图片');e.target.value='';return}previewUrl=URL.createObjectURL(file);$('draftPreview').src=previewUrl;$('draftPreview').hidden=false};
$('draftForm').onsubmit=e=>{e.preventDefault();const title=$('draftTitle').value.trim(),text=$('draftText').value.trim();if(!title||!text)return;state.drafts.push({title,text,date:new Date().toISOString()});state.drafts=state.drafts.slice(-20);save();renderCollections();$('draftForm').reset();$('draftPreview').hidden=true;if(previewUrl)URL.revokeObjectURL(previewUrl);close('draft');toast('草稿已保存在本机；尚未公开投稿')};
function complete(id,title,kind,reward){if(!state.memories.some(x=>x.id===id))state.memories.push({id,title,kind,date:new Date().toISOString()});if(!state.unlocks.includes(reward))state.unlocks.push(reward);save();renderCollections();toast('这段记忆已放进家园，新的纪念物可以摆放了。')}
let chapter=0,activeStory=null;
function launchStory(id){activeStory=stories.find(x=>x.id===id);chapter=0;renderStory();open('story')}
function renderStory(){const s=activeStory;$('storyBody').innerHTML=`<div class="eyebrow">个人记忆 · 虚构演示 · ${chapter+1}/3</div><h2>${s.title}</h2><img class="story-visual" src="${s.image}" alt="像素故事场景"><p>${s.lines[chapter]}</p><div class="story-choice">${chapter===0?s.choices.map(x=>`<button data-next="1" class="secondary">${x}</button>`).join(''):chapter===1?'<button data-next="2" class="primary">把这一刻记下来 →</button>':'<button id="collectStory" class="primary">收进我的家园 →</button>'}</div>`;$('storyBody').querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>{chapter=Number(b.dataset.next);renderStory()});if($('collectStory'))$('collectStory').onclick=()=>{complete('community:'+s.id,s.title,'community',s.reward);close('story');go('home')}}
let playing=null;
function launchHistory(id){playing=history.find(x=>x[0]===id);$('playerTitle').textContent=playing[1];$('playerStatus').textContent='完成一次操作，留下本次记忆。';$('gameFrame').src='player.html?free=1&scene='+id;open('player')}
$('gameFrame').onload=()=>{try{$('gameFrame').contentWindow.__demoControl?.settings(state.settings);syncPlayerPause()}catch{}};
function syncPlayerPause(){try{$('gameFrame').contentWindow.__demoControl?.pause(currentRoute!=='player'||$('guide').open)}catch{}}
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('gameFrame').contentWindow)return;if(e.data?.type==='muduo-demo-open'&&['feedback','method'].includes(e.data.panel)){open(e.data.panel);return}if(e.data?.type!=='muduo-demo-event'||!playing)return;if(e.data.event==='card_get'){const id=e.data.details?.card_id||'';if(id.startsWith(playing[0]+':')){complete('history:'+playing[0],playing[2],'history',playing[5]);$('playerStatus').textContent='本次记忆已保存，可返回家园查看。'}}});
document.addEventListener('click',e=>{const h=e.target.closest('[data-history]');if(h)launchHistory(h.dataset.history);const s=e.target.closest('[data-story]');if(s)launchStory(s.dataset.story)});
const furniture={desk:{name:'书桌',prop:'desk',w:3,scale:1.02},chair:{name:'椅子',prop:'chair',w:1,scale:.82},bookshelf:{name:'记忆书架',prop:'bookshelf',w:3,scale:1.02},lamp:{name:'台灯',prop:'lamp',w:1,scale:.90},plant:{name:'一盆校园的绿',prop:'plant',w:1,scale:.7},bell:{name:'木铎纪念物',prop:'bell',w:1,scale:.65},frame:{name:'灯下的相框',prop:'frame',w:1,scale:.65},camera:{name:'相聚的相机',prop:'camera',w:1,scale:.65}};
let preview=structuredClone(state.layout),editing=false,selected=null,drag=null,ghost=null,hits=[],undo=[];
const canvas=$('room'),ctx=canvas.getContext('2d'),props=new Image(),tiles=new Image();props.src='../assets/props-v3.png';tiles.src='../assets/tileset-v3.png';const person=new Image();person.src='../assets/characters-v5-full-20261109.png';props.onload=()=>{thumbCache.clear();renderCollections()};
function validPlacement(item,layout){const f=furniture[item.id];return f&&item.x>=0&&item.y>=0&&item.x+f.w<=12&&item.y<6&&!layout.some(o=>o.id!==item.id&&o.y===item.y&&o.x<item.x+f.w&&o.x+furniture[o.id].w>item.x)}
function validateLayout(layout,unlocks){if(layout.some(o=>!unlocks.includes(o.id)||!validPlacement(o,layout)))throw Error('家具位置越界或重叠')}
function renderCollections(){if(!furniture)return;$('homeCount').textContent=`已留下 ${state.memories.length} 段记忆`;if(!editing)preview=structuredClone(state.layout);$('inventory').innerHTML=Object.entries(furniture).map(([id,f])=>state.unlocks.includes(id)?`<button data-furniture="${id}" class="${selected===id?'selected':''}"><img alt="" src="${thumbnail(f.prop)}"><span>${f.name}<small>${preview.some(o=>o.id===id)?'已摆放':'已解锁，可摆放'} · ${f.w}格</small></span></button>`:`<div class="locked">${f.name} · 游玩故事后解锁</div>`).join('');$('inventory').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(!editing)startArrange();selected=b.dataset.furniture;renderCollections();$('roomHint').textContent='已选择'+furniture[selected].name+'，点选一块空地放置。'});$('memoryShelf').innerHTML=state.memories.length?state.memories.map(m=>`<article class="card"><div class="card-body"><span class="meta">${m.kind==='history'?'校史回忆':'我们的 BNU · 演示'}</span><h3>${esc(m.title)}</h3><p>这段记忆已经留在你的小屋里。</p></div><button ${m.kind==='history'?`data-history="${esc(m.id.split(':')[1])}"`:`data-story="${esc(m.id.split(':')[1])}"`}>再走进一次 →</button></article>`).join(''):'<p class="quiet-note">书架还空着。体验一段故事，第一枚记忆就会来到这里。</p>';$('draftList').innerHTML=state.drafts.length?'<h3>本机草稿</h3>'+state.drafts.map(d=>`<p>${esc(d.title)} <small>· 仅本机保存，未上传</small></p>`).join(''):''}
function startArrange(){undo=[];editing=true;preview=structuredClone(state.layout);$('arrangeButton').hidden=true;$('saveRoom').hidden=false;$('cancelRoom').hidden=false;$('undoRoom').hidden=false;$('removeFurniture').hidden=false;$('roomHint').textContent='点选家具再点空地，或拖动家具。完成后记得保存。'}
function stopArrange(){editing=false;selected=null;ghost=null;drag=null;$('arrangeButton').hidden=false;$('saveRoom').hidden=true;$('cancelRoom').hidden=true;$('undoRoom').hidden=true;$('removeFurniture').hidden=true;$('roomHint').textContent='点击台灯开关灯，点击书架查看记忆。';renderCollections()}
$('arrangeButton').onclick=startArrange;$('saveRoom').onclick=()=>{state.layout=structuredClone(preview);save();stopArrange();toast('房间布置已保存')};$('cancelRoom').onclick=()=>{preview=structuredClone(state.layout);stopArrange()};
function coords(e){const box=canvas.getBoundingClientRect();return{x:(e.clientX-box.left)*780/box.width,y:(e.clientY-box.top)*500/box.height}}
function hit(p){return[...hits].reverse().find(h=>p.x>=h.x&&p.x<=h.x+h.w&&p.y>=h.y&&p.y<=h.y+h.h)}
function place(p){if(!selected)return;const item={id:selected,x:Math.floor((p.x-110)/42),y:Math.floor((p.y-185)/28)};if(!validPlacement(item,preview)){toast('这块位置放不下，换一块空地试试。');return}undo.push(structuredClone(preview));preview=preview.filter(x=>x.id!==selected);preview.push(item);ghost=null;renderCollections()}
canvas.onpointerdown=e=>{const p=coords(e),h=hit(p);if(editing){if(h){selected=h.id;drag={start:p};canvas.setPointerCapture(e.pointerId)}else place(p);renderCollections()}else if(h){if(h.id==='lamp'){state.lampOn=!state.lampOn;save();toast(state.lampOn?'台灯亮了。':'台灯关上了。')}else if(h.id==='bell')bell();else if(h.id==='bookshelf')$('memoryShelf').scrollIntoView({behavior:state.settings.reduce?'instant':'smooth',block:'center'});else toast(furniture[h.id].name+'，留给下一段值得记住的故事。')}};
canvas.onpointermove=e=>{if(drag){const p=coords(e);if(Math.hypot(p.x-drag.start.x,p.y-drag.start.y)>5)ghost=p}};
canvas.onpointerup=e=>{if(drag&&ghost)place(coords(e));drag=null;ghost=null};canvas.onpointercancel=()=>{drag=null;ghost=null};
function prop(name,x,y,scale){const b=window.MUDUO_PROP_BOUNDS[name];if(!b||!props.complete||!props.naturalWidth)return;ctx.drawImage(props,b.sx,b.sy,b.sw,b.sh,Math.round(x-b.sw*scale/2),Math.round(y-b.sh*scale),Math.round(b.sw*scale),Math.round(b.sh*scale))}
const thumbCache=new Map();
function thumbnail(name){if(thumbCache.has(name))return thumbCache.get(name);const b=window.MUDUO_PROP_BOUNDS[name],c=document.createElement('canvas');c.width=c.height=48;const g=c.getContext('2d');g.imageSmoothingEnabled=false;if(props.complete&&props.naturalWidth){const scale=Math.min(42/b.sw,42/b.sh);g.drawImage(props,b.sx,b.sy,b.sw,b.sh,(48-b.sw*scale)/2,(48-b.sh*scale)/2,b.sw*scale,b.sh*scale)}const url=c.toDataURL();thumbCache.set(name,url);return url}
$('lightTheme').onclick=()=>{state.roomTheme=state.roomTheme==='night'?'day':'night';save();$('lightTheme').textContent=state.roomTheme==='night'?'夜灯':'日光'};
$('undoRoom').onclick=()=>{if(!undo.length){toast('还没有需要撤销的摆放。');return}preview=undo.pop();renderCollections()};
$('removeFurniture').onclick=()=>{if(!selected){toast('先选中一件家具。');return}undo.push(structuredClone(preview));preview=preview.filter(x=>x.id!==selected);renderCollections();toast('已收回背包，保存后生效。')};
canvas.onkeydown=e=>{if(!editing||!selected)return;const move={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!move)return;e.preventDefault();const item=preview.find(x=>x.id===selected);if(!item)return;const next={...item,x:item.x+move[0],y:item.y+move[1]};if(!validPlacement(next,preview)){toast('这个方向放不下。');return}undo.push(structuredClone(preview));preview=preview.map(x=>x.id===selected?next:x);renderCollections()};
const roomCache=new Map();let roomRaf=0,lastRoomFrame=0;
function startRoomLoop(){if(!roomRaf)roomRaf=requestAnimationFrame(drawRoom)}
function stopRoomLoop(){if(roomRaf)cancelAnimationFrame(roomRaf);roomRaf=0}
function rectangle(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function backdrop(night){const key=(night?'night':'day')+':'+(tiles.complete&&tiles.naturalWidth?'loaded':'loading');if(roomCache.has(key))return roomCache.get(key);const c=document.createElement('canvas');c.width=780;c.height=500;const g=c.getContext('2d');g.imageSmoothingEnabled=false;
 rectangle(g,0,0,780,500,night?'#263d3c':'#d6c6a3');
 // Outer shadow, cutaway wall returns, cornice, plaster and wooden wainscot.
 rectangle(g,69,72,646,374,'#17201b30');rectangle(g,70,55,640,365,'#4f3829');rectangle(g,80,64,620,345,'#a9794a');rectangle(g,91,74,598,120,night?'#63766e':'#eadab8');
 for(let y=80;y<185;y+=13)for(let x=96;x<680;x+=16){const v=(x*11+y*7)%19;if(v<5)rectangle(g,x,y,1,1,night?'#83928a':'#cbbb99')}
 rectangle(g,86,65,610,9,'#503923');rectangle(g,90,74,602,3,'#e0bb7b');
 for(let x=92;x<689;x+=24){rectangle(g,x,148,23,44,night?'#546054':'#a67b4d');rectangle(g,x+2,152,19,34,night?'#5f6a5c':'#ba905c');rectangle(g,x+18,151,2,38,'#5b442b35')}
 rectangle(g,87,145,608,5,'#59402b');rectangle(g,89,149,604,2,'#d2ad6b');rectangle(g,87,191,608,8,'#63442c');rectangle(g,91,192,600,2,'#d6ae6c');
 // The walkable grid remains 12x6, preserving saved positions.
 g.save();g.beginPath();g.rect(92,198,596,184);g.clip();
 if(tiles.complete&&tiles.naturalWidth){for(let y=198;y<390;y+=32)for(let x=92;x<690;x+=32){const index=((x/32|0)+(y/32|0))%4;g.drawImage(tiles,index*32,0,32,32,x,y,32,32)}}else rectangle(g,92,198,596,184,'#ba8b55');
 for(let row=0;row<8;row++){const yy=198+row*24;rectangle(g,92,yy,596,1,'#53351e55');for(let x=92+(row%2)*38;x<688;x+=76)rectangle(g,x,yy,1,24,'#51341e40')}
 g.restore();
 const grad=g.createLinearGradient(0,195,0,386);grad.addColorStop(0,'#35231355');grad.addColorStop(.35,'#30231400');grad.addColorStop(1,night?'#12242280':'#6b492322');g.fillStyle=grad;g.fillRect(92,198,596,184);
 // Woven rug: one built-in surface rather than an unlockable inventory object.
 rectangle(g,252,272,220,74,night?'#3d5d53':'#6c8870');rectangle(g,258,278,208,62,night?'#59715d':'#a5ad7c');rectangle(g,265,284,194,50,night?'#6c7b60':'#b6bd89');
 for(let x=267;x<459;x+=12){rectangle(g,x,283,5,2,'#e4cf9b');rectangle(g,x,333,5,2,'#e4cf9b')}
 for(let y=286;y<333;y+=7)rectangle(g,270,y,184,1,'#374d3d18');
 // Door return and foreground floor thickness make the room a tangible miniature.
 rectangle(g,620,110,49,83,'#5b3b28');rectangle(g,626,116,37,77,night?'#59604b':'#a87947');rectangle(g,630,120,29,48,night?'#62654f':'#bb905b');rectangle(g,655,164,3,3,'#e6c77f');
 rectangle(g,81,382,618,12,'#725033');rectangle(g,91,382,598,3,'#dab175');rectangle(g,87,394,606,7,'#503824');
 rectangle(g,76,74,15,308,'#6b492e');rectangle(g,689,74,14,308,'#5b402a');rectangle(g,80,74,4,304,'#bd9459');
 // An unobtrusive wall plaque and books add detail without duplicating unlockable rewards.
 rectangle(g,144,93,155,36,'#6a4c33');rectangle(g,148,97,147,28,night?'#d1c4a3':'#f0e4c8');g.font='14px SimSun';g.fillStyle='#4f4d37';g.fillText('一间记忆的小屋',161,116);
 if(night){g.fillStyle='#19323a2b';g.fillRect(91,74,598,308)}
 roomCache.set(key,c);if(roomCache.size>4)roomCache.delete(roomCache.keys().next().value);return c;
}
function drawRoom(now){roomRaf=0;if(currentRoute!=='home'||document.hidden)return;
 const step=state.settings.reduce?100:33;if(now-lastRoomFrame<step){startRoomLoop();return}lastRoomFrame=now;ctx.imageSmoothingEnabled=false;const night=state.roomTheme==='night';ctx.clearRect(0,0,780,500);ctx.drawImage(backdrop(night),0,0);
 $('lightTheme').textContent=night?'夜灯':'日光';
 // Window light and restrained curtain movement, all rendered from existing pixel assets.
 prop('window',514,179,1.02);
 const sway=state.settings.reduce?0:Math.round(Math.sin(now*.001)*2);rectangle(ctx,451+sway,63,10,118,night?'#697e73':'#8da18a');rectangle(ctx,568-sway,63,10,118,night?'#697e73':'#8da18a');rectangle(ctx,449,60,132,4,'#5f4934');
 if(!night){ctx.save();ctx.globalAlpha=.12;ctx.fillStyle='#fff0bd';ctx.beginPath();ctx.moveTo(473,177);ctx.lineTo(552,177);ctx.lineTo(618,304);ctx.lineTo(381,304);ctx.closePath();ctx.fill();ctx.restore()}
 // Warm lamp halo follows its placement and can be switched off.
 const placedLamp=preview.find(o=>o.id==='lamp');if(state.lampOn&&placedLamp){const f=furniture.lamp,lx=110+(placedLamp.x+f.w/2)*42,ly=185+(placedLamp.y+1)*28-68;const flick=state.settings.reduce?0:Math.sin(now*.002)*.015;const glow=ctx.createRadialGradient(lx,ly,3,lx,ly,125);glow.addColorStop(0,`rgba(255,226,145,${(night?.44:.22)+flick})`);glow.addColorStop(1,'rgba(255,226,145,0)');ctx.fillStyle=glow;ctx.fillRect(lx-125,ly-125,250,250)}
 if(editing){ctx.strokeStyle='#fff5c345';ctx.lineWidth=1;for(let x=0;x<=12;x++){ctx.beginPath();ctx.moveTo(110+x*42,185);ctx.lineTo(110+x*42,353);ctx.stroke()}for(let y=0;y<=6;y++){ctx.beginPath();ctx.moveTo(110,185+y*28);ctx.lineTo(614,185+y*28);ctx.stroke()}}
 hits=[];
 for(const item of [...preview].sort((a,b)=>a.y-b.y||a.x-b.x)){const f=furniture[item.id],x=110+(item.x+f.w/2)*42,y=185+(item.y+1)*28,b=window.MUDUO_PROP_BOUNDS[f.prop];
  ctx.save();ctx.fillStyle='#21190f38';ctx.beginPath();ctx.ellipse(x,y-1,b.sw*f.scale*.43,4,0,0,Math.PI*2);ctx.fill();if(drag&&selected===item.id)ctx.globalAlpha=.4;prop(f.prop,x,y,f.scale);ctx.restore();
  if(item.id==='desk'){prop('books',x+25,y-b.sh*f.scale+2,.27);rectangle(ctx,x-24,y-b.sh*f.scale+2,20,4,'#e9ddbf');rectangle(ctx,x-20,y-b.sh*f.scale+3,9,1,'#a34532')}
  if(item.id==='bookshelf'){rectangle(ctx,x-15,y-13,4,6,'#b47c50');rectangle(ctx,x-10,y-13,3,6,'#e4cd92')}
  hits.push({id:item.id,x:x-b.sw*f.scale/2,y:y-b.sh*f.scale,w:b.sw*f.scale,h:b.sh*f.scale});
  if(editing&&selected===item.id){ctx.strokeStyle='#ac4938';ctx.lineWidth=2;ctx.strokeRect(110+item.x*42,185+item.y*28,f.w*42,28);rectangle(ctx,x-2,y-b.sh*f.scale-9,4,4,'#ac4938')}
 }
 // A familiar visitor makes the scale and warmth of the room visible.
 if(person.complete&&person.naturalWidth){const col=state.settings.reduce?0:Math.sin(now*.002)>.4?1:0;ctx.fillStyle='#2b251f35';ctx.beginPath();ctx.ellipse(655,358,16,4,0,0,Math.PI*2);ctx.fill();ctx.drawImage(person,col*32,6*48,32,48,635,298,40,60)}
 if(ghost&&selected){const f=furniture[selected],gx=Math.floor((ghost.x-110)/42),gy=Math.floor((ghost.y-185)/28),good=validPlacement({id:selected,x:gx,y:gy},preview);ctx.fillStyle=good?'#699a6240':'#a3453240';ctx.fillRect(110+gx*42,185+gy*28,f.w*42,28);ctx.save();ctx.globalAlpha=.65;prop(f.prop,110+(gx+f.w/2)*42,185+(gy+1)*28,f.scale);ctx.restore()}
 rectangle(ctx,94,413,590,38,night?'#233c35':'#e8dbbc');ctx.fillStyle=night?'#e5d7b5':'#5b624d';ctx.font='13px SimSun';ctx.fillText(editing?'轻轻挪动，让每件记忆找到合适的位置。':'今天也为自己，留一盏灯。',114,438);
 startRoomLoop();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopRoomLoop();else if(currentRoute==='home')startRoomLoop()});

for(const item of state.layout){if(!validPlacement(item,state.layout)){let done=false;for(let y=0;y<6&&!done;y++)for(let x=0;x<12&&!done;x++){const proposal={...item,x,y};if(validPlacement(proposal,state.layout)){item.x=x;item.y=y;done=true}}}}preview=structuredClone(state.layout);
applySettings();const requested=location.hash.replace('#/','');go(routeNames[requested]&&!['player','story'].includes(requested)?requested:state.page,false);if(!persistent)$('saveStatus').textContent='浏览器限制保存；请导出备份';if(!guideSeen)open('guide');

$('exportTestFeedback').onclick=()=>download({type:'muduo-beta-feedback',version:'2026-11-11',feedback:state.feedback},'木铎声里-灰度测试反馈.json');
})();
