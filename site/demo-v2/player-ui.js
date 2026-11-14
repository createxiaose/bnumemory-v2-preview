(() => {
  const SCENES = {
    intro: {
      era: '2026', title: '校史馆', subtitle: '序 · 一段很轻的钟声', stage: 'SCENE 01', next: 'y1902',
      mini: '点击上方场景标签，可以跳到任意年代。',
      narration: '校史馆快闭馆了。玻璃柜里有一只木铎，标签上写着：1902—2026。你凑近时，听见一段很轻的钟声，像从很远的地方传来。',
      choices: [
        { key: 'glass', label: '把手放在玻璃上', text: '玻璃是凉的。钟声却突然近了一寸。你看见一扇门，门后是 1902 年的教室。' },
        { key: 'photo', label: '先看旁边的旧照片', text: '照片上是一间教室，黑板是门板刷的。背面写着一行小字：1938，城固。你把照片放回原处，钟声又响了一次。' }
      ]
    },
    y1902: {
      era: '1902', title: '京师大学堂师范馆', subtitle: '第一幕 · 第一课', stage: 'SCENE 02', next: 'y1919',
      mini: '1902 年，京师大学堂师范馆开学。课程里既有经史，也有教育与西学。这道题没有标准答案。',
      narration: '开学第一天。第一批师范生坐在这里，桌上只有几页讲义和一支笔。先生问：“要做一个好老师，先学什么？”',
      choices: [
        { key: 'classics', label: '先学经史', text: '先生说：“根柢要深。”你在讲义背面写下：先做一个读书人。' },
        { key: 'pedagogy', label: '先学教育法', text: '先生说：“知道怎么教，才不辜负讲台。”你在讲义背面写下：先做一个教书人。' },
        { key: 'west', label: '先学西学', text: '先生说：“眼睛要往外看。”你在讲义背面写下：先做一个开眼看世界的人。' }
      ]
    },
    y1919: {
      era: '1919', title: '北京街头', subtitle: '第二幕 · 那一天', stage: 'SCENE 03', next: 'y1938',
      mini: '1919 年 5 月 4 日，北京高师学生参与了五四运动。游戏不评判选择，只让你承担它。',
      narration: '五月四日，消息从北大传到高师。操场上有人喊“上街”，也有人主张先上课，还有人想写信回乡。你站在人群里。',
      choices: [
        { key: 'march', label: '走上街头', text: '你和同学一起走出校门。那天之后，很多事都不一样了。' },
        { key: 'stay', label: '留在学校', text: '你留在教室，把讲义收好。后来你才知道，缺的那一课，在街上。' },
        { key: 'letter', label: '写信回乡', text: '你给家里写信，说北京的春天很乱。信寄出后，你在校门口站了很久。' }
      ]
    },
    y1938: {
      era: '1938', title: '城固临时课堂', subtitle: '第三幕 · 一箱书', stage: 'SCENE 04', next: 'y1949',
      mini: '1938 年，西迁师生转至陕西城固，在西北联大继续办学。课堂、书箱和空袭细节为情境创作。',
      narration: '师生辗转到城固。故事里的临时课堂借在祠堂。书箱只剩七只，粮食也不多了。今天你只有两件事要做。',
      choices: []
    },
    y1949: {
      era: '1949', title: '新校牌', subtitle: '第四站 · 复名', stage: 'SCENE 05', next: 'y1952',
      mini: '1949 年，北平和平解放，学校复用“北京师范大学”原名。',
      narration: '1949 年，北平和平解放。学校恢复“北京师范大学”的名字。旧校牌被取下来，新校牌还没挂正。',
      choices: []
    },
    y1952: {
      era: '1952', title: '辅仁并入', subtitle: '第五站 · 两校合一', stage: 'SCENE 06', next: 'y1971',
      mini: '1952 年院系调整，辅仁大学主体并入北师大；启功到北师大中文系任教，讲授中国古典文学。',
      narration: '1952 年，全国高校院系调整，辅仁大学主体并入北京师范大学。书要从这边搬到那边，课也要接着上。',
      choices: []
    },
    y1971: {
      era: '1971', title: '点校', subtitle: '第六站 · 一个字', stage: 'SCENE 07', next: 'y1991',
      mini: '启功曾参与《二十四史》《清史稿》的校对整理。本幕以 1971 为叙事坐标，具体工作日期仍待档案复核；对白为创作。',
      narration: '20 世纪 70 年代的点校工作中，屋里只有翻书声。这是根据治学事迹创作的一幕。一个字的用法，他们查了整整一个下午。',
      choices: [
        { key: 'check', label: '再查一遍原书', text: '你翻到原书那一页，发现抄本漏了一个字。启功先生说：“一个字，也是一段历史。”' },
        { key: 'doubt', label: '先把疑问记下来', text: '你在卡片上写下疑问，夹进书里。先生说：“存疑，也是一种认真。”' },
        { key: 'rest', label: '劝他休息一下', text: '他笑了笑：“书还没校完，休息什么。”' }
      ]
    },
    y1991: {
      era: '1991', title: '励耘', subtitle: '第七站 · 一碗面', stage: 'SCENE 08', next: 'y1996',
      mini: '1990 年启功在香港举办书画义展；1991 年将义卖所得 163 万余元捐给北师大，设立励耘奖学助学基金。对白与生活细节为创作。',
      narration: '1991 年，启功把此前义卖书画所得的 163 万余元，全部捐给学校，设立“励耘奖学助学基金”。',
      choices: [
        { key: 'ask', label: '问他为什么不留一点', text: '他说：“钱够吃饭就行。”桌上是一碗面条，几根黄瓜。' },
        { key: 'scrolls', label: '帮他整理画作', text: '你替他把画一卷卷收好。每一卷的签条上，都写着陈垣先生的书斋名：励耘。' },
        { key: 'student', label: '去通知第一个受助学生', text: '你骑车去学生宿舍。那年的冬天，有人第一次不必为下个月的饭钱发愁。' }
      ]
    },
    y1996: {
      era: '1996', title: '校训', subtitle: '第八站 · 八个字', stage: 'SCENE 09', next: 'y2002',
      mini: '1996 年夏，启功响应校训征集提出“学为人师，行为世范”；同年 11 月 4 日，校务会议定为校训，并请启功题写勒碑。',
      narration: '1996 年夏天，学校征集校训。启功写下八个字：“学为人师，行为世范。”11 月 4 日，校务会议把它定为校训。',
      choices: [
        { key: 'ink', label: '帮他研墨', text: '墨在水里慢慢化开。他提笔，先写“学”，再写“行”。' },
        { key: 'meaning', label: '问他这八个字是什么意思', text: '他说：“所学足为后辈之师，所行应为世人之范。”' },
        { key: 'paper', label: '把纸压平', text: '你压住纸角。最后一笔落下，窗外正好起风。' }
      ]
    },
    y2002: {
      era: '2002', title: '百年', subtitle: '第九站 · 校训碑', stage: 'SCENE 10', next: 'y2026',
      mini: '2002 年，北师大百年校庆；校训碑成为校园记忆的一部分。',
      narration: '2002 年，北师大百年校庆。校训碑前排队拍照的人，从早上排到傍晚。有人念出那八个字，像在念一句口令。',
      choices: []
    },
    y2026: {
      era: '2026', title: '校史馆', subtitle: '尾声 · 钟声', stage: 'SCENE 11', next: 'intro',
      mini: '记忆不是被保存下来的，是被一次次重新经历的。',
      narration: '',
      choices: [
        { key: 'pass', label: '把这段记忆交给下一个人', text: '你按下展示屏上的“开始”。下一个走进来的人，听见了钟声。' },
        { key: 'listen', label: '自己再听一遍', text: '你站在原地，听完最后一声。玻璃柜里的木铎，好像轻轻动了一下。' }
      ]
    }
  };

  const REVISITS = {
    y1902: [
      { label: '第二次 · 放学以后', subtitle: '第一幕 · 黑板还没有擦', mini: '同一间教室，放学后的光从窗格里慢慢退出去。', narration: '放学以后，讲台边只剩半截粉笔。先生没有走，他在黑板角落补上一行小字：明天还要来。' },
      { label: '第三次 · 熄灯以前', subtitle: '第一幕 · 一张旧课桌', mini: '桌椅空着，讲义留在桌肚里，像有人刚刚离开。', narration: '熄灯以前，你在一张旧课桌的桌肚里摸到一叠讲义。纸页卷边，第一页写着：先学做一个读书人。' }
    ],
    y1919: [
      { label: '第二次 · 灯亮以后', subtitle: '第二幕 · 校门没有关', mini: '白天的口号被夜风吹散，校门还留着一道缝。', narration: '天黑了，街上的旗子还在响。有人把剩下的传单抱回学校，也有人在门里等他们回来。' },
      { label: '第三次 · 散去以后', subtitle: '第二幕 · 一张空标语', mini: '人群散尽，地上只剩半张被踩皱的标语。', narration: '第二天清晨，操场空了。你捡起半张标语，把背面的针脚抚平。那一天并没有结束，只是换了一个地方继续。' }
    ],
    y1938: [
      { label: '第二次 · 雨停以后', subtitle: '第三幕 · 书箱从泥里抬出来', mini: '雨停了，祠堂门槛上的水迹像一条细细的线。', narration: '雨停以后，学生把书箱从泥里抬出来。每一本书都包着一层旧报纸，像把课堂先藏了起来。' },
      { label: '第三次 · 天亮以前', subtitle: '第三幕 · 课还要继续', mini: '天还没亮，窗外有山影，屋里已经有人翻书。', narration: '天亮以前，教室里先亮起一盏灯。谁也没有说今天会不会安稳，只把第一页翻开。' }
    ],
    y1949: [
      { label: '第二次 · 挂好以后', subtitle: '第四站 · 红绸还在响', mini: '校牌挂正了，门口的风却一直没有停。', narration: '校牌挂好以后，大家没有马上离开。有人抬头念了一遍校名，像在确认这件事真的发生了。' },
      { label: '第三次 · 风停下来', subtitle: '第四站 · 门里和门外', mini: '风停下时，校牌上的红布贴在木头上了。', narration: '风停下来，校门里外都安静了一瞬。你忽然明白，复名不是换一块木板，而是让很多人重新找到自己的位置。' }
    ],
    y1952: [
      { label: '第二次 · 书搬完以后', subtitle: '第五站 · 空出来的位置', mini: '书箱落进新库房，旧书架却空了一排。', narration: '书搬完以后，旧书架空出一排。有人把两只写着不同校名的书箱并排放好，没有急着合上。' },
      { label: '第三次 · 新课本发下来', subtitle: '第五站 · 同一首诗', mini: '新的课程表贴上墙，两个名字第一次出现在同一行。', narration: '新课本发下来，第一课还是同一首诗。授课的人换了，坐在下面的人也在换，但诗还在。' }
    ],
    y1971: [
      { label: '第二次 · 灯灭以后', subtitle: '第六站 · 桌面上还留着字', mini: '台灯灭了，窗外雨还在下，稿纸没有收走。', narration: '灯灭以后，稿纸上的批注还在。白天没有查完的字，被小心地折进下一页。' },
      { label: '第三次 · 天亮以前', subtitle: '第六站 · 最后一个字', mini: '天快亮了，最后一行批注终于写完。', narration: '天亮以前，最后一行批注终于写完。启功把笔放下，说：先这样，明天再看一遍。' }
    ],
    y1991: [
      { label: '第二次 · 墨迹干了', subtitle: '第七站 · 案上的一幅画', mini: '画已经卷起，砚台里的墨干成了一圈边。', narration: '墨迹干了，画也已经装箱。桌子腾出来以后，你才发现案角还留着一枚小小的红印。' },
      { label: '第三次 · 晚饭之后', subtitle: '第七站 · 一碗面', mini: '捐款的数字上了纸，晚饭还是那碗面。', narration: '晚饭之后，桌上仍是一碗面。有人问值不值得，他说：学生能安心读书，就值得。' }
    ],
    y1996: [
      { label: '第二次 · 风干以后', subtitle: '第八站 · 最后一笔', mini: '纸上的墨慢慢干了，窗外风还在吹。', narration: '风干以后，八个字留在了纸上。先生把笔放回笔架，没有再说别的。' },
      { label: '第三次 · 碑立起来', subtitle: '第八站 · 写给后来的人', mini: '校训碑立起来以后，纸上的字才真正走到了校园里。', narration: '碑立起来以后，字从纸上走进了风里。有人停下脚步念了一遍，像把它交给下一位路过的人。' }
    ],
    y2002: [
      { label: '第二次 · 人群散去', subtitle: '第九站 · 校训碑前', mini: '拍照的人散了，校训碑前只剩一束花。', narration: '人群散去以后，校训碑前多了一束花。八个字没有被拍进镜头，却留在每一个停下来的人身上。' },
      { label: '第三次 · 照片洗出来', subtitle: '第九站 · 另一半画面', mini: '照片洗出来，画面边缘多了一双举旗的手。', narration: '照片洗出来，校训碑只占了一半，另一半是人群和风。你忽然觉得，这样也很好。' }
    ]
  };

  const state = {
    scene: 'intro',
    t: 0,
    freezeT: false,
    mode: 'title',
    proArt: true,
    shareIndex: 0,
    shareCards: [],
    visitsLeft: 9,
    eraVisits: {},
    runActive: false,
    runCards: new Set(),
    loadout: [],
    perfectEras: new Set(),
    runPerfects: 0,
    runEnding: null,
    runRank: '',
    runScore: 0,
    runEndStatic: false,
    sortSelected: null,
    sortDone: new Set(),
    sortHint: '',
    day: 1,
    actionsToday: 0,
    raidDone: false,
    ending1938: null,
    free1938Active: false,
    aimActive: false,
    aimPos: 46,
    aimDir: 1,
    aimResult: null,
    framePos: 42,
    frameResult: null,
    chosen: {},
    cards: new Set(),
    discoveries: new Set(),
    muted: false,
    finaleShown: false,
    pendingFinale: false,
    finaleStatic: false,
    actions1938: 0,
    event1938: false,
    resources: { box: 7, food: 5, morale: 78, energy: 62 },
    log: [],
    resFlash: [],
    visitedEras: new Set()
  };

  const $ = id => document.getElementById(id);
  window.MUDUO_VER = '1.3.0';
  window.MUDUO_PRODUCT_VER = '1.3.0';
  window.MUDUO_FEEDBACK_EMAIL = '';

  function feedbackQueue() {
    try { return JSON.parse(localStorage.getItem('muduo-v2-player-feedback-v1') || '[]'); } catch (e) { return []; }
  }
  function pushFeedbackLocal(entry) {
    try {
      const q = feedbackQueue();
      q.push(entry);
      localStorage.setItem('muduo-v2-player-feedback-v1', JSON.stringify(q.slice(-20)));
    } catch (e) {}
  }
  window.openFeedback = () => { $('feedback').classList.add('show'); };
  window.closeFeedback = (silent = false) => {
    $('feedback').classList.remove('show');
    if (!silent) sfxCancel();
  };
  window.submitFeedback = () => parent.postMessage({type:'muduo-demo-open',panel:'feedback'},location.origin);
  const telemetry = window.MuduoTelemetry;

  let analyticsSceneKey = '';
  let analyticsSceneEnteredAt = Date.now();
  let analyticsFirstAction = false;

  function trackEvent(event, details = {}) {
    parent.postMessage({type:'muduo-demo-event',event,details},location.origin);
    if (!telemetry) return;
    telemetry.track(event, {
      mode: state.mode,
      screen: state.scene,
      ...details
    });
  }

  function markFirstAction(action) {
    if (!telemetry || analyticsFirstAction || !SCENES[state.scene]) return;
    analyticsFirstAction = true;
    trackEvent('first_action', {
      era: SCENES[state.scene].era,
      dwell_ms: Math.max(0, Date.now() - analyticsSceneEnteredAt),
      action
    });
  }

  function markAnalyticsScene() {
    if (!telemetry || !SCENES[state.scene]) return;
    const shareMode = state.mode === 'share' || state.mode === 'auto';
    const key = [
      state.mode,
      state.scene,
      currentVariant(),
      shareMode ? state.shareIndex : 'hub'
    ].join('|');
    if (key === analyticsSceneKey) return;
    analyticsSceneKey = key;
    analyticsSceneEnteredAt = Date.now();
    analyticsFirstAction = false;
    trackEvent('scene_enter', {
      era: SCENES[state.scene].era,
      visit_index: currentVariant(),
      loadout: state.loadout.slice()
    });
    if (shareMode && state.scene === 'y2026') {
      trackEvent('finale_reach', {
        bell_rings: 3,
        cards_run: state.shareCards.length
      });
    }
  }

  function downloadTelemetry(button) {
    if (!telemetry) return;
    telemetry.downloadData();
    if (button) {
      const previous = button.textContent;
      button.textContent = '已导出 JSON';
      setTimeout(() => { button.textContent = previous; }, 1600);
    }
  }

  async function copyDiagnostics(button) {
    if (!telemetry) return;
    const copied = await telemetry.copyDiagnostics();
    if (button) {
      const previous = button.textContent;
      button.textContent = copied ? '诊断已复制' : '复制失败';
      setTimeout(() => { button.textContent = previous; }, 1600);
    }
  }

  try { state.soundMode = localStorage.getItem('muduo-v2-player-soundmode') || 'all'; } catch (e) { state.soundMode = 'all'; }
  if (!['all', 'sfx', 'off'].includes(state.soundMode)) state.soundMode = 'all';
  try { state.muted = localStorage.getItem('muduo-v2-player-muted') === '1' || state.soundMode === 'off'; } catch (e) {}
  state.proArt = true; // One public renderer; ignore retired stored preferences.
  let actx = null;
  function audioCtx() {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      return actx;
    } catch (e) { return null; }
  }
  function tone(freq, dur, type = 'square', vol = 0.03, delay = 0, kind = 'sfx') {
    vol *= kind === 'music' ? (window.__demoMusic ?? 1) : (window.__demoSfx ?? 1);
    if(vol <= 0) return;
    if (state.muted) return;
    const ctx = audioCtx();
    if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    o.connect(g); g.connect(ctx.destination);
    const t0 = ctx.currentTime + delay;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const sfxClick = () => tone(620, .05, 'square', .02);
  const sfxCard = () => { tone(740, .09, 'triangle', .035); tone(988, .14, 'triangle', .03, .08); };
  const sfxBell = () => [220,330,440,660].forEach((f,i) => tone(f, 1.8, 'sine', .05/(i+1), i*.015));
  const sfxConfirm = () => { tone(523, .06, 'square', .025); tone(784, .10, 'square', .022, .06); };
  const sfxCancel = () => { tone(392, .07, 'square', .020); tone(262, .10, 'square', .018, .07); };
  const sfxWin = () => [659, 784, 988].forEach((f, i) => tone(f, .12, 'triangle', .03, i * .09));
  const sfxDay = () => { tone(196, .25, 'sine', .03); tone(147, .35, 'sine', .025, .12); };
  function stamp(text = '记') {
    const el = $('stampFx');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    tone(128, .18, 'triangle', .035);
    setTimeout(() => el.classList.remove('show'), 420);
  }
  let resFlashTimer = 0;
  function setResFlash(items) {
    state.resFlash = items;
    clearTimeout(resFlashTimer);
    resFlashTimer = setTimeout(() => {
      state.resFlash = [];
      if (state.scene === 'y1938') render();
    }, 1500);
  }
  let ambientSource = null, ambientGain = null, audioUnlocked = false;
  function ensureAmbient() {
    if (!audioUnlocked) return;
    const ctx = audioCtx();
    if (!ctx) return;
    if (!ambientSource) {
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 2), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
      ambientSource = ctx.createBufferSource();
      ambientSource.buffer = buffer;
      ambientSource.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 650;
      ambientGain = ctx.createGain();
      ambientGain.gain.value = 0;
      ambientSource.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(ctx.destination);
      ambientSource.start();
    }
    const target = state.muted ? 0 : (['y1938','y1971'].includes(state.scene) ? 0.035 : state.scene === 'y2026' ? 0.012 : 0);
    ambientGain.gain.setTargetAtTime(target * (window.__demoMusic ?? 1), ctx.currentTime, 0.5);
  }
  const MUSIC_PROFILES = {
    modern: { base: [98.00, 146.83], notes: [196.00, 220.00, 261.63, 329.63], motif: [0, 2, 1, 3], gain: .018 },
    postwar: { base: [110.00, 164.81], notes: [220.00, 261.63, 293.66, 392.00], motif: [0, 1, 3, 2], gain: .020 },
    contemporary: { base: [123.47, 185.00], notes: [246.94, 293.66, 369.99, 440.00], motif: [0, 2, 3, 1], gain: .022 },
    finale: { base: [130.81, 196.00], notes: [261.63, 329.63, 392.00, 523.25], motif: [0, 1, 2, 3], gain: .026 }
  };
  let musicA = null, musicB = null, musicGain = null, musicTimer = 0;
  let musicGroup = '';
  const motifTimers = [];
  function musicGroupForScene() {
    if (state.scene === 'intro') return 'modern';
    if (state.scene === 'y2026') return 'finale';
    if (['y1949', 'y1952', 'y1971'].includes(state.scene)) return 'postwar';
    if (['y1991', 'y1996', 'y2002'].includes(state.scene)) return 'contemporary';
    return 'modern';
  }
  function clearMotif() {
    clearTimeout(musicTimer);
    motifTimers.splice(0).forEach(clearTimeout);
  }
  function playMotif(profile) {
    clearMotif();
    if (state.muted || state.soundMode === 'sfx' || !audioUnlocked) return;
    profile.motif.forEach((index, step) => {
      motifTimers.push(setTimeout(() => {
        if (!state.muted && state.soundMode !== 'sfx') tone(profile.notes[index], 1.15, 'sine', .012, 0, 'music');
      }, step * 620));
    });
    musicTimer = setTimeout(() => playMotif(profile), 9200);
  }
  function syncMusic(force = false) {
    if (!audioUnlocked) return;
    const ctx = audioCtx();
    if (!ctx) return;
    const group = musicGroupForScene();
    const profile = MUSIC_PROFILES[group];
    if (!musicA) {
      musicGain = ctx.createGain();
      musicGain.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 520;
      musicA = ctx.createOscillator();
      musicB = ctx.createOscillator();
      musicA.type = 'sine';
      musicB.type = 'triangle';
      musicA.connect(filter);
      musicB.connect(filter);
      filter.connect(musicGain);
      musicGain.connect(ctx.destination);
      musicA.start();
      musicB.start();
    }
    musicGain.gain.setTargetAtTime(state.muted ? 0 : profile.gain * (window.__demoMusic ?? 1), ctx.currentTime, .7);
    musicA.frequency.setTargetAtTime(profile.base[0], ctx.currentTime, .8);
    musicB.frequency.setTargetAtTime(profile.base[1], ctx.currentTime, .8);
    if (force || musicGroup !== group) {
      musicGroup = group;
      playMotif(profile);
    }
    if (state.muted) clearMotif();
  }

  function fitViewport() {
    const s = Math.min(window.innerWidth / 1600, window.innerHeight / 1000);
    document.querySelector('.viewport').style.transform = `scale(${s})`;
  }
  window.addEventListener('resize', fitViewport);
  function pushStage() {
    const stage = document.querySelector('.stage');
    if (!stage) return;
    stage.classList.remove('push');
    void stage.offsetWidth;
    stage.classList.add('push');
    setTimeout(() => stage.classList.remove('push'), 460);
  }
  function dayFade() {
    const stage = document.querySelector('.stage');
    if (!stage) return;
    stage.classList.remove('day-end');
    void stage.offsetWidth;
    stage.classList.add('day-end');
    setTimeout(() => stage.classList.remove('day-end'), 780);
  }
  const CARD_TITLES = {
    y1902: { classics: '读书人', pedagogy: '教书人', west: '开眼看世界' },
    y1919: { march: '走上街头', stay: '留在学校', letter: '写信回乡' },
    y1938: { move: '带走书箱', teach: '最后一课', hide: '把书藏起来' },
    y1949: { center: '校牌挂正', close: '歪一点也真实', off: '改天再挂' },
    y1952: { fuyin: '辅仁校刊', beishi: '师大讲义', common: '共通经典' },
    y1971: { check: '一个字', doubt: '存疑', rest: '书没校完' },
    y1991: { ask: '钱够吃饭', scrolls: '励耘签条', student: '第一个受助生' },
    y1996: { ink: '研墨', meaning: '所学所行', paper: '压住纸角' },
    y2002: { center: '正中构图', close: '手一抖也真实', off: '只拍到半块碑' }
  };
  const CARD_DESCS = {
    y1902: {
      classics: '先生说：“根柢要深。”你在讲义背面写下：先做一个读书人。',
      pedagogy: '先生说：“知道怎么教，才不辜负讲台。”你在讲义背面写下：先做一个教书人。',
      west: '先生说：“眼睛要往外看。”你在讲义背面写下：先做一个开眼看世界的人。'
    },
    y1919: {
      march: '你和同学一起走出校门。那天之后，很多事都不一样了。',
      stay: '你留在教室，把讲义收好。后来你才知道，缺的那一课，在街上。',
      letter: '你给家里写信，说北京的春天很乱。信寄出后，你在校门口站了很久。'
    },
    y1938: {
      move: '你带着学生和书箱走进夜色。第二天，课在另一间祠堂继续。',
      teach: '你把最后一段讲完。学生没有走。警报声里，黑板上的字还在。',
      hide: '你们把书箱藏进祠堂后院，用稻草盖好。有些东西留了下来，等以后再取。'
    },
    y1949: {
      center: '你停在了正中。校牌挂正了，红布被风吹得猎猎响。',
      close: '校牌稍微歪了一点。大家仰头看了看，笑出了声。它还是挂上去了，像那一天任何一件不完美却真实发生的事。',
      off: '你们试着把校牌举上去，还差一点。有人说改天再挂。红绸在风里一直响。'
    },
    y1952: {
      fuyin: '辅仁校刊被放进了辅仁书箱。纸页上还有旧图书馆的印章。',
      beishi: '北师大讲义被放进了北师大书箱。封面上是新的课程表。',
      common: '《诗经》注被放进了共通书箱。两所学校都要讲同一首诗。'
    },
    y1971: {
      check: '你翻到原书那一页，发现抄本漏了一个字。启功先生说：“一个字，也是一段历史。”',
      doubt: '你在卡片上写下疑问，夹进书里。先生说：“存疑，也是一种认真。”',
      rest: '他笑了笑：“书还没校完，休息什么。”'
    },
    y1991: {
      ask: '他说：“钱够吃饭就行。”桌上是一碗面条，几根黄瓜。',
      scrolls: '每一卷的签条上，都写着陈垣先生的书斋名：励耘。',
      student: '你骑车去学生宿舍。那年的冬天，有人第一次不必为下个月的饭钱发愁。'
    },
    y1996: {
      ink: '墨在水里慢慢化开。他提笔，先写“学”，再写“行”。',
      meaning: '他说：“所学足为后辈之师，所行应为世人之范。”',
      paper: '你压住纸角。最后一笔落下，窗外正好起风。'
    },
    y2002: {
      center: '咔嚓。校训碑正好在画面正中。',
      close: '咔嚓。画面偏了一点，旁边的人笑出了声。照片没有完美，却记住了那天的风。',
      off: '咔嚓。校训碑只拍到了一半。你还是把照片留下了，因为另一半在人群里。'
    }
  };
  const SOURCES = {
    y1902: '参考：北师大官网《校史沿革》',
    y1919: '参考：北师大官网《校史沿革》；五四运动公开资料',
    y1938: '参考：北师大官网《校史沿革》；西北联大相关公开资料',
    y1949: '参考：北师大官网《校史沿革》',
    y1952: '参考：北师大官网《校史沿革》；360 百科《启功》',
    y1971: '参考：360 百科《启功》；《清史稿》点校相关公开资料',
    y1991: '参考：360 百科《启功》',
    y1996: '参考：光明日报、共产党员网校训报道',
    y2002: '参考：北师大官网、百年校庆公开报道'
  };
  const CARD_EFFECTS = {
    'y1902:classics': '1952 搬书：显示一条分类提示',
    'y1919:march': '1938 开局士气 +5；警报时新增“先护人”选项',
    'y1938:move': '1938 开局书箱 +2',
    'y1938:hide': '1938 开局书箱 +1',
    'y1952:common': '1952 显示分类提示；2026 增加两校合并展柜',
    'y1971:check': '1996 校训书写时显示启功批注',
    'y1971:rest': '1938 开局体力 +5',
    'y1991:ask': '1938 开局粮食 +1',
    'y1991:student': '1938 开局士气 +3',
    'y1996:meaning': '1938 警报时士气损失减半',
    'y1996:paper': '1938 开局体力 +3',
    'y2002:center': '1949 / 2002 判定区变宽'
  };
  const DISCOVERIES = [
    { id: '1902-blackboard', scene: 'y1902', x: 390, y: 76, title: '黑板背面的课表', text: '黑板边缘留着被反复擦拭的课程表痕迹。经史、教育、西学被挤在同一块木板上。', source: '情境复原：依据 1902 年师范馆课程结构创作' },
    { id: '1902-books', scene: 'y1902', x: 585, y: 249, title: '讲义夹页', text: '一页旧讲义从书堆里露出来，背面写着四个字：先学做人。', source: '情境复原：课堂物件细节' },
    { id: '1919-banner', scene: 'y1919', x: 390, y: 86, title: '标语背面的针脚', text: '标语背面是学生自己缝的粗针脚。布不够，几块旧旗被拼在了一起。', source: '情境复原：五四时期学生标语' },
    { id: '1919-crate', scene: 'y1919', x: 520, y: 228, title: '传单木箱', text: '木箱里还留着油墨味。箱盖内侧写着一行小字：别淋雨。', source: '情境复原：街头传单与木箱' },
    { id: '1938-stove', scene: 'y1938', x: 82, y: 214, title: '炉边烘干的课本', text: '课本被雨打湿，又贴近火炉烘干。纸页卷起，字还看得清。', source: '情境复原：城固临时课堂' },
    { id: '1938-crate', scene: 'y1938', x: 690, y: 212, title: '封箱标签', text: '书箱标签写着“师范用书”，墨迹被手指反复摸过。', source: '情境复原：南迁书箱' },
    { id: '1949-plaque', scene: 'y1949', x: 390, y: 80, title: '校牌背面的旧钉孔', text: '新校牌背面留着几个旧钉孔，像一块被历史重新挂起的木牌。', source: '情境复原：复名与换牌' },
    { id: '1949-camera', scene: 'y1949', x: 474, y: 228, title: '第一张新校牌合影', text: '有人举起相机。镜头里，校牌还微微歪着，人群却已经站好了。', source: '情境复原：换牌现场' },
    { id: '1952-cart', scene: 'y1952', x: 310, y: 248, title: '搬书清单', text: '清单把书分成三类：辅仁、师大、两校共用。分类不是终点，能继续上课才是。', source: '情境复原：院系调整搬书' },
    { id: '1952-tree', scene: 'y1952', x: 73, y: 146, title: '树下的校徽', text: '一枚旧校徽落在树根旁，背面刻着一个人的名字，名字已经磨浅了。', source: '情境复原：校园旧物' },
    { id: '1971-desk', scene: 'y1971', x: 447, y: 204, title: '页边批注', text: '书页边上有一行铅笔字：“此字疑，待再核。”字很小，力气很大。', source: '情境复原：点校工作现场' },
    { id: '1971-clock', scene: 'y1971', x: 492, y: 86, title: '停住的钟', text: '墙上的钟停在一个寻常时刻。屋里的人没有抬头，只继续翻页。', source: '情境复原：夜间点校' },
    { id: '1991-scroll', scene: 'y1991', x: 418, y: 198, title: '励耘签条', text: '画作卷起后，签条上仍旧写着“励耘”二字。捐赠不是把东西交出去，而是把来处也一起留下。', source: '情境复原：励耘奖学助学基金' },
    { id: '1991-bowl', scene: 'y1991', x: 291, y: 253, title: '一碗面', text: '桌上只有一碗面和几根黄瓜。钱去了哪里，答案在这一顿饭里。', source: '情境复原：启功生活细节' },
    { id: '1996-scroll', scene: 'y1996', x: 390, y: 58, title: '校训初稿', text: '纸上有几处淡去的笔痕。后来留下来的八个字，经过了不止一次斟酌。', source: '情境复原：校训题写' },
    { id: '1996-chair', scene: 'y1996', x: 451, y: 226, title: '最后一笔墨', text: '砚台边的墨已经半干，笔尖还朝着最后一个字。写完以后，位置就要让给后来的人。', source: '情境复原：校训书写现场' },
    { id: '2002-monument', scene: 'y2002', x: 390, y: 166, title: '校训碑拓片', text: '拓片的纸纹很粗，八个字却很清楚。有人把它卷起来，准备带回家。', source: '情境复原：百年校庆与校训碑' },
    { id: '2002-camera', scene: 'y2002', x: 443, y: 246, title: '碑前的花', text: '拍照的人散去以后，校训碑前多了一束花。另一半记忆留在人群里。', source: '情境复原：校庆后的校训碑' },
    { id: '2026-case', scene: 'y2026', x: 390, y: 196, title: '木铎内壁刻字', text: '展柜说明没有写出内壁的小字：修复时，请把声音也一起修好。', source: '情境复原：校史馆展陈' },
    { id: '2026-panel', scene: 'y2026', x: 84, y: 76, title: '未署名的捐赠名录', text: '名录最后一页没有名字，只有一枚模糊的指印。记忆有时以这种办法留下。', source: '情境复原：校史馆捐赠档案' }
  ];
  const ERA_ORDER = ['y1902','y1919','y1938','y1949','y1952','y1971','y1991','y1996','y2002'];
  const ERA_GROUPS = [
    { label: '1902—1938 · 近代', keys: ['y1902', 'y1919', 'y1938'] },
    { label: '1949—1971 · 建国后', keys: ['y1949', 'y1952', 'y1971'] },
    { label: '1991—2002 · 当代', keys: ['y1991', 'y1996', 'y2002'] }
  ];
  const SHARE_PATH = ['intro', 'y1902', 'y1938', 'y1952', 'y1996', 'y2026'];
  const SORT_BOOKS = [
    { id: 'fuyin', title: '辅仁校刊', bin: 'fuyin' },
    { id: 'beishi', title: '北师大讲义', bin: 'beishi' },
    { id: 'common', title: '《诗经》注', bin: 'common' }
  ];
  const SORT_BINS = [
    { id: 'fuyin', label: '辅仁书箱' },
    { id: 'beishi', label: '北师大书箱' },
    { id: 'common', label: '共通书箱' }
  ];
  const cardId = (scene, key) => `${scene}:${key}`;
  const eraCards = scene => Object.entries(CARD_TITLES[scene] || {}).map(([key, title]) => ({ key, title }));
  const eraCount = scene => eraCards(scene).filter(c => state.cards.has(cardId(scene, c.key))).length;
  const eraDone = scene => eraCount(scene) === 3;
  const runEraCount = scene => [...state.runCards].filter(id => id.startsWith(scene + ':')).length;
  const GROUP_ECHOES = [
    '近代组回声：从师范馆到城固，课堂始终没有被中断。讲台前的人，把“师范”二字站成了重量。',
    '建国后组回声：复名、合并与点校，把一所学校放回国家的时间里。每一个不肯含糊的字，都在替后来的人校准方向。',
    '当代组回声：励耘、校训与百年，把记忆交到下一代手中。愿意让后来者比自己走得更远，是这所学校最长久的光。'
  ];
  function groupEchoText() {
    return ERA_GROUPS
      .map((group, index) => group.keys.every(eraDone) ? GROUP_ECHOES[index] : '')
      .filter(Boolean)
      .join(' ');
  }
  function currentVariant(scene = state.scene) {
    if (state.mode !== 'free' || !ERA_ORDER.includes(scene)) return 1;
    return Math.min(3, state.eraVisits?.[scene] || 1);
  }
  function currentSceneData(scene = state.scene) {
    const base = SCENES[scene];
    const variant = currentVariant(scene);
    if (!base || variant <= 1 || !REVISITS[scene]) return base;
    return {
      ...base,
      ...REVISITS[scene][Math.min(1, variant - 2)],
      choices: base.choices,
      revisitLabel: REVISITS[scene][Math.min(1, variant - 2)].label
    };
  }

  function saveCards() {
    try { localStorage.setItem('muduo-v2-player-cards-v1', JSON.stringify({ cards: [...state.cards] })); } catch (e) {}
  }
  function saveDiscoveries() {
    try { localStorage.setItem('muduo-v2-player-discoveries-v1', JSON.stringify([...state.discoveries])); } catch (e) {}
  }
  function saveRun() {
    try {
      localStorage.setItem('muduo-v2-player-run-v1', JSON.stringify({
        active: state.runActive,
        visitsLeft: state.visitsLeft,
        cards: [...state.runCards],
        eraVisits: state.eraVisits,
        loadout: state.loadout,
        perfects: state.runPerfects,
        perfectEras: [...state.perfectEras]
      }));
    } catch (e) {}
  }
  function saveVisited() {
    try {
      localStorage.setItem('muduo-v2-player-visited-v1', JSON.stringify([...state.visitedEras]));
    } catch (e) {}
  }
  try {
    const saved = JSON.parse(localStorage.getItem('muduo-v2-player-cards-v1') || '{}');
    (saved.cards || []).forEach(id => state.cards.add(id));
  } catch (e) {}
  try {
    const saved = JSON.parse(localStorage.getItem('muduo-v2-player-discoveries-v1') || '[]');
    if (Array.isArray(saved)) saved.forEach(id => state.discoveries.add(id));
  } catch (e) {}
  try {
    const savedRun = JSON.parse(localStorage.getItem('muduo-v2-player-run-v1') || '{}');
    if (savedRun.active) {
      state.runActive = true;
      state.visitsLeft = savedRun.visitsLeft ?? 9;
      state.runCards = new Set(savedRun.cards || []);
      state.eraVisits = savedRun.eraVisits && typeof savedRun.eraVisits === 'object' ? savedRun.eraVisits : {};
      state.loadout = Array.isArray(savedRun.loadout) ? savedRun.loadout.slice(0, 3) : [];
      state.runPerfects = savedRun.perfects || 0;
      state.perfectEras = new Set(savedRun.perfectEras || []);
    }
  } catch (e) {}
  try {
    const visited = JSON.parse(localStorage.getItem('muduo-v2-player-visited-v1') || '[]');
    if (Array.isArray(visited)) visited.forEach(id => state.visitedEras.add(id));
  } catch (e) {}
  const validIds = new Set(ERA_ORDER.flatMap(e => Object.keys(CARD_TITLES[e]).map(k => cardId(e, k))));
  let cleaned = false;
  [...state.cards].forEach(id => { if (!validIds.has(id)) { state.cards.delete(id); cleaned = true; } });
  if (cleaned) saveCards();

  function addCard(scene, key) {
    if (!CARD_TITLES[scene] || !CARD_TITLES[scene][key]) return;
    const id = cardId(scene, key);
    parent.postMessage({type:'muduo-demo-event',event:'card_action',details:{card_id:id}},location.origin);
    const globalNew = !state.cards.has(id);
    if (globalNew) {
      state.cards.add(id);
      if (state.cards.size === 27) state.pendingFinale = true;
      saveCards();
    }
    if (state.mode === 'free' && state.runActive) {
      const runNew = !state.runCards.has(id);
      state.runCards.add(id);
      if (runNew) {
        showCard(CARD_TITLES[scene][key]);
        sfxCard();
        trackEvent('card_get', {
          era: SCENES[scene].era,
          card_id: id,
          is_new: globalNew
        });
      }
      saveRun();
      return;
    }
    if (globalNew) {
      showCard(CARD_TITLES[scene][key]);
      sfxCard();
      trackEvent('card_get', {
        era: SCENES[scene].era,
        card_id: id,
        is_new: true
      });
    }
  }

  function recordShareCard(scene, key) {
    if (state.mode !== 'share' && state.mode !== 'auto') return;
    if (!CARD_TITLES[scene] || !CARD_TITLES[scene][key]) return;
    if (!state.shareCards.some(c => c.scene === scene)) {
      state.shareCards.push({ scene, title: CARD_TITLES[scene][key] });
    }
  }

  function showCard(title) {
    const el = $('cardToast');
    $('toastKicker').textContent = '档案卡';
    $('toastTitle').textContent = title;
    $('toastSub').textContent = '已收入档案室';
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    const count = $('fragCount');
    count.classList.remove('pulse');
    void count.offsetWidth;
    count.classList.add('pulse');
  }

  function showDiscovery(title) {
    const el = $('cardToast');
    $('toastKicker').textContent = '馆藏注记';
    $('toastTitle').textContent = title;
    $('toastSub').textContent = '已写入馆藏边注';
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  function collectDiscovery(id) {
    markFirstAction('note');
    const item = DISCOVERIES.find(d => d.id === id);
    if (!item || state.discoveries.has(id)) return;
    state.discoveries.add(id);
    saveDiscoveries();
    showDiscovery(item.title);
    sfxCard();
    stamp('见');
    trackEvent('note_get', {
      era: SCENES[item.scene] ? SCENES[item.scene].era : '',
      note_id: id
    });
    render();
  }

  function openDiscovery(id) {
    const item = DISCOVERIES.find(d => d.id === id);
    if (!item || !state.discoveries.has(id)) return;
    const scene = SCENES[item.scene];
    $('detailEra').textContent = `${scene.era} · ${scene.title} · 馆藏注记`;
    $('detailTitle').textContent = item.title;
    $('detailText').textContent = item.text;
    $('detailNote').textContent = '这不是主线档案卡，而是场景中可被亲手发现的第二层记忆。';
    $('detailSource').textContent = item.source;
    $('cardDetail').classList.add('show');
  }

  function renderHotspots() {
    const host = $('stageHotspots');
    if (!host) return;
    host.innerHTML = '';
    if (state.mode !== 'free' || !state.runActive || state.runEnding) return;
    DISCOVERIES
      .filter(item => item.scene === state.scene && !state.discoveries.has(item.id))
      .forEach(item => {
        const button = document.createElement('button');
        button.className = 'hotspot';
        button.style.left = `${item.x / 780 * 100}%`;
        button.style.top = `${item.y / 280 * 100}%`;
        button.title = `查看：${item.title}`;
        button.setAttribute('aria-label', `发现馆藏注记：${item.title}`);
        button.addEventListener('click', () => collectDiscovery(item.id));
        host.appendChild(button);
      });
  }

  function showSceneFlash(id) {
    const el = $('sceneFlash');
    const d = currentSceneData(id);
    if (!d) return;
    el.textContent = `${d.era} · ${d.title}`;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  function resetTransientState() {
    state.chosen = {};
    state.actions1938 = 0;
    state.event1938 = false;
    state.resources = { box: 7, food: 5, morale: 78, energy: 62 };
    state.log = [];
    state.resFlash = [];
    state.sortSelected = null;
    state.sortDone = new Set();
    state.sortHint = '';
    state.day = 1;
    state.actionsToday = 0;
    state.raidDone = false;
    state.ending1938 = null;
    state.free1938Active = false;
    state.aimActive = false;
    state.aimPos = 46;
    state.aimDir = 1;
    state.aimResult = null;
    state.framePos = 42;
    state.frameResult = null;
  }

  function hasLoadout(id) {
    return state.mode === 'free' && state.loadout.includes(id);
  }

  function addPerfect(scene) {
    if (state.mode !== 'free' || !state.runActive) return;
    if (state.perfectEras.has(scene)) return;
    state.perfectEras.add(scene);
    state.runPerfects++;
  }

  function newRun() {
    resetTransientState();
    state.mode = 'free';
    state.runActive = true;
    state.visitsLeft = 9;
    state.runCards = new Set();
    state.eraVisits = {};
    state.loadout = [];
    state.perfectEras = new Set();
    state.runPerfects = 0;
    state.runEnding = null;
    state.runRank = '';
    state.runScore = 0;
    state.runEndStatic = false;
    state.scene = 'y2026';
    const end = $('runEnd');
    if (end) { end.classList.remove('show'); end.classList.remove('static'); }
    const lo = $('loadout');
    if (lo) lo.classList.remove('show');
    saveRun();
    render();
  }

  function startMode(mode) {
    $('titleScreen').classList.add('hide');
    state.mode = mode;
    trackEvent('mode_select', { selected_mode: mode });
    if (mode === 'free') {
      if (!state.runActive || state.runEnding) { newRun(); return; }
      state.scene = 'y2026';
      render();
      return;
    }
    resetTransientState();
    if (mode === 'share') {
      state.shareIndex = 0;
      state.shareCards = [];
      state.scene = 'intro';
      render();
      pushStage();
      showSceneFlash('intro');
    } else if (mode === 'auto') {
      state.mode = 'auto';
      state.shareIndex = 0;
      state.shareCards = [];
      state.scene = 'intro';
      render();
      pushStage();
      startAuto();
    }
  }

  function backToTitle() {
    sfxCancel();
    stopAuto();
    state.mode = 'title';
    state.scene = 'intro';
    $('runEnd').classList.remove('show');
    $('loadout').classList.remove('show');
    $('titleScreen').classList.remove('hide');
    render();
  }

  let autoTimers = [];
  let autoStartedAt = 0;
  function stopAuto() {
    autoTimers.forEach(clearTimeout);
    autoTimers = [];
    const badge = $('autoBadge');
    if (badge) badge.classList.add('hide');
  }
  function startAuto() {
    stopAuto();
    autoStartedAt = Date.now();
    const badge = $('autoBadge');
    if (badge) badge.classList.remove('hide');
    const at = (ms, fn) => autoTimers.push(setTimeout(fn, ms));
    at(700, () => choose('glass'));
    at(1500, () => next());
    at(2300, () => choose('classics'));
    at(3100, () => next());
    at(3900, () => doAction('class'));
    at(4700, () => doAction('box'));
    at(5500, () => chooseEvent('teach'));
    at(6300, () => next());
    at(7100, () => { selectBook('fuyin'); sortTo('fuyin'); });
    at(7900, () => { selectBook('beishi'); sortTo('beishi'); });
    at(8700, () => { selectBook('common'); sortTo('common'); });
    at(9600, () => next());
    at(10400, () => choose('ink'));
    at(11200, () => next());
    at(12500, () => stopAuto());
  }

  function openAlbum(staticMode) {
    const grid = $('albumGrid');
    grid.innerHTML = ERA_ORDER.map(e => {
      const n = eraCount(e);
      return `<div class="album-era ${n === 3 ? 'done' : ''}">
        <h3>${SCENES[e].era} · ${SCENES[e].title}</h3>
        ${eraCards(e).map(c => {
          const has = state.cards.has(cardId(e, c.key));
          return has
            ? `<button class="album-card on" onclick="window.openCard('${e}','${c.key}')"><i></i>${c.title}</button>`
            : `<div class="album-card"><i></i>？？？</div>`;
        }).join('')}
      </div>`;
    }).join('');
    grid.innerHTML += `
      <div class="album-era album-notes">
        <h3>馆藏注记 · ${state.discoveries.size}/${DISCOVERIES.length}</h3>
        <div class="album-note-grid">
          ${DISCOVERIES.map(d => state.discoveries.has(d.id)
            ? `<button class="album-note on" onclick="window.openDiscovery('${d.id}')">${d.title}</button>`
            : '<span class="album-note">？？？</span>').join('')}
        </div>
      </div>`;
    $('albumCount').textContent = state.cards.size;
    $('albumNoteCount').textContent = state.discoveries.size;
    const el = $('album');
    el.classList.toggle('static', !!staticMode);
    el.classList.add('show');
  }

  function openCard(scene, key, staticMode) {
    if (!state.cards.has(cardId(scene, key))) return;
    const d = SCENES[scene];
    $('detailEra').textContent = `${d.era} · ${d.title}`;
    $('detailTitle').textContent = CARD_TITLES[scene][key];
    $('detailText').textContent = CARD_DESCS[scene]?.[key] || '';
    $('detailNote').textContent = d.mini;
    $('detailSource').textContent = SOURCES[scene] || '';
    const el = $('cardDetail');
    el.classList.toggle('static', !!staticMode);
    el.classList.add('show');
  }

  function closeCard() {
    const el = $('cardDetail');
    el.classList.remove('show');
    el.classList.remove('static');
    sfxCancel();
  }

  function openSources(staticMode) {
    const el = $('sources');
    el.classList.toggle('static', !!staticMode);
    el.classList.add('show');
  }

  function closeSources() {
    const el = $('sources');
    el.classList.remove('show');
    el.classList.remove('static');
    sfxCancel();
  }

  function openMethod(staticMode) {
    const el = $('method');
    el.classList.toggle('static', !!staticMode);
    el.classList.add('show');
    sfxClick();
  }

  function closeMethod() {
    const el = $('method');
    el.classList.remove('show');
    el.classList.remove('static');
    sfxCancel();
  }

  function openLoadout(staticMode) {
    renderLoadout();
    $('loadoutFoot').textContent = '最多装配 3 张；卡面效果只在自由档案的一局内生效。';
    const el = $('loadout');
    el.classList.toggle('static', !!staticMode);
    el.classList.add('show');
  }

  function closeLoadout() {
    const el = $('loadout');
    el.classList.remove('show');
    el.classList.remove('static');
    sfxCancel();
  }

  function renderLoadout() {
    $('loadoutSlots').innerHTML = [0, 1, 2].map(i => {
      const id = state.loadout[i];
      if (!id) return '<div class="loadout-slot">空槽 · 从下方选择</div>';
      const [e, k] = id.split(':');
      const title = CARD_TITLES[e] && CARD_TITLES[e][k] ? CARD_TITLES[e][k] : '?';
      const effect = CARD_EFFECTS[id] || '收藏卡 · 暂无被动效果';
      return `<div class="loadout-slot on"><b>${title}</b>${effect}</div>`;
    }).join('');
    $('loadoutGrid').innerHTML = ERA_ORDER.map(e => `
      <div class="loadout-era">
        <h3>${SCENES[e].era} · ${SCENES[e].title}</h3>
        ${eraCards(e).map(c => {
          const id = cardId(e, c.key);
          const has = state.cards.has(id);
          const eq = state.loadout.includes(id);
          const effect = CARD_EFFECTS[id] || '收藏卡 · 暂无被动效果';
          return `<button class="loadout-card ${eq ? 'equipped' : ''}" ${has ? '' : 'disabled'} onclick="window.toggleLoadout('${id}')">
            <b>${has ? c.title : '？？？'}</b>
            <em>${has ? effect : '尚未收入档案'}</em>
          </button>`;
        }).join('')}
      </div>
    `).join('');
  }

  function toggleLoadout(id) {
    if (!state.cards.has(id)) return;
    const i = state.loadout.indexOf(id);
    if (i >= 0) {
      state.loadout.splice(i, 1);
      sfxCancel();
    } else if (state.loadout.length < 3) {
      state.loadout.push(id);
      sfxConfirm();
    } else {
      $('loadoutFoot').textContent = '最多装配 3 张。先卸下一张，再装新的。';
      return;
    }
    renderLoadout();
    saveRun();
    render();
    trackEvent('loadout_set', { card_ids: state.loadout.slice() });
  }

  function settleRun() {
    if (!state.runActive || state.runEnding) return;
    const cards = state.runCards.size;
    const perfects = state.runPerfects;
    const idle = state.visitsLeft;
    const score = cards * 12 + perfects * 8 + idle * 2;
    const bell = cards >= 9 ? 3 : cards >= 7 ? 2 : cards >= 5 ? 1 : 0;
    const text = ['静默的校史馆', '一声轻响', '回声', '木铎长鸣'][bell];
    const note = perfects >= 3
      ? '馆员批注：你不仅找回了记忆，也把每个细节放回了原位。'
      : state.loadout.length === 3
        ? '馆员批注：三张随身记忆彼此照亮，这一局走出了自己的路线。'
        : idle >= 3
          ? '馆员批注：你走得很从容，还留下一段时间，听见了馆里的回声。'
          : '馆员批注：有些记忆还没有被找到，它们仍在馆里等你。';
    state.runEnding = { cards, perfects, score, bell, text, note };
    state.runActive = false;
    saveRun();
    trackEvent('finale_reach', {
      bell_rings: bell,
      cards_run: cards,
      perfects,
      notes: state.discoveries.size,
      route: 'free-run'
    });
    $('runRank').textContent = bell ? `${bell}响` : '静';
    $('runEnding').textContent = text;
    $('runSummary').innerHTML = `本局带走 ${cards} 张记忆 · ${perfects} 次完美 · 木铎 ${bell}/3<br><span style="color:#8a7a66;font-size:12px;">累计馆藏注记 ${state.discoveries.size}/20 · ${note}</span>`;
    $('runEndCards').innerHTML = [...state.runCards].map(id => {
      const [e, k] = id.split(':');
      return `<span>${CARD_TITLES[e] && CARD_TITLES[e][k] ? CARD_TITLES[e][k] : '?'}</span>`;
    }).join('');
    const endEl = $('runEnd');
    endEl.classList.toggle('static', state.runEndStatic);
    endEl.classList.add('show');
    if (bell >= 3) sfxBell(); else sfxCard();
    render();
  }

  function closeAlbum() {
    $('album').classList.remove('show');
    sfxCancel();
  }

  let transitioning = false;
  function go(id) {
    if (!SCENES[id] || transitioning) return;
    if (id === state.scene) { render(); return; }
    const fromScene = state.scene;
    const isEra = ERA_ORDER.includes(id);
    if (isEra && !state.visitedEras.has(id)) {
      state.visitedEras.add(id);
      saveVisited();
    }
    if (state.mode === 'free' && isEra) {
      if (!state.runActive || state.runEnding) return;
      if (state.visitsLeft <= 0) {
        if (state.scene !== 'y2026') go('y2026');
        return;
      }
      state.visitsLeft--;
      state.eraVisits[id] = (state.eraVisits[id] || 0) + 1;
      delete state.chosen[id];
      if (id === 'y1938') initFree1938();
      saveRun();
    }
    if (id === 'y1952') {
      state.sortSelected = null;
      state.sortDone = new Set();
      state.sortHint = '';
    }
    if (id === 'y1949') {
      state.aimResult = null;
      state.aimPos = 46;
      state.aimDir = 1;
    } else {
      stopAim();
    }
    if (id === 'y2002') {
      state.frameResult = null;
      state.framePos = 42;
    }
    transitioning = true;
    const fade = $('fade');
    fade.classList.add('on');
    setTimeout(() => {
      state.scene = id;
      if (id === 'y2026' && ERA_ORDER.includes(fromScene)) {
        trackEvent('hub_return', {
          cards_total: state.cards.size,
          visits_left: state.mode === 'free' ? state.visitsLeft : null
        });
      }
      render();
      pushStage();
      showSceneFlash(id);
      fade.classList.remove('on');
      transitioning = false;
    }, 180);
  }

  function choose(key) {
    markFirstAction('choice');
    const data = SCENES[state.scene];
    if (!data || state.chosen[state.scene]) return;
    const c = data.choices.find(x => x.key === key);
    if (!c) return;
    state.chosen[state.scene] = c.text;
    addCard(state.scene, c.key);
    recordShareCard(state.scene, c.key);
    sfxClick();
    stamp('记');
    render();
  }

  function chooseEvent(key) {
    markFirstAction('event-choice');
    if (state.chosen.y1938) return;
    const texts = {
      move: '你带着学生和书箱走进夜色。第二天，课在另一间祠堂继续。',
      teach: '你把最后一段讲完。学生没有走。警报声里，黑板上的字还在。',
      hide: '你和学生把书箱搬进祠堂后院，用稻草盖好。第二天回来，箱子还在。'
    };
    state.chosen.y1938 = texts[key];
    addCard('y1938', key);
    recordShareCard('y1938', key);
    sfxClick();
    stamp(key === 'teach' ? '课' : key === 'move' ? '行' : '藏');
    state.log.unshift(key === 'move' ? '傍晚：立刻转移，书箱 7 只全部带走' : key === 'teach' ? '傍晚：先上完这堂课，学生一个没少' : '傍晚：把书箱藏进祠堂后院');
    render();
  }

  function doAction(key) {
    markFirstAction(key);
    if (state.mode === 'free') { doFreeAction(key); return; }
    if (state.actions1938 >= 2 || state.event1938) return;
    const r = state.resources;
    if (key === 'class') {
      r.energy = Math.max(0, r.energy - 10);
      r.morale = Math.min(100, r.morale + 2);
      state.log.unshift('上午：上课，士气 +2，体力 -10');
      setResFlash(['士气 +2', '体力 −10']);
    } else if (key === 'box') {
      r.energy = Math.max(0, r.energy - 6);
      r.box = Math.min(12, r.box + 1);
      state.log.unshift('午后：整理书箱，书箱 +1，体力 -6');
      setResFlash(['书箱 +1', '体力 −6']);
    } else if (key === 'food') {
      r.food = Math.max(0, r.food - 1);
      r.morale = Math.min(100, r.morale + 6);
      state.log.unshift('傍晚：开饭，士气 +6，粮食 -1');
      setResFlash(['士气 +6', '粮食 −1']);
    }
    state.actions1938++;
    if (state.actions1938 >= 2) {
      state.event1938 = true;
      const stage = document.querySelector('.stage');
      stage.classList.remove('shake');
      void stage.offsetWidth;
      stage.classList.add('shake');
      setTimeout(() => stage.classList.remove('shake'), 500);
      tone(110, .28, 'sawtooth', .03);
    }
    sfxClick();
    render();
  }

  function initFree1938() {
    state.day = 1;
    state.actionsToday = 0;
    state.raidDone = false;
    state.ending1938 = null;
    state.resources = {
      box: 7 + (hasLoadout('y1938:move') ? 2 : 0) + (hasLoadout('y1938:hide') ? 1 : 0),
      food: 5 + (hasLoadout('y1991:ask') ? 1 : 0),
      morale: 78 + (hasLoadout('y1919:march') ? 5 : 0) + (hasLoadout('y1991:student') ? 3 : 0),
      energy: 62 + (hasLoadout('y1971:rest') ? 5 : 0) + (hasLoadout('y1996:paper') ? 3 : 0)
    };
    state.log = [];
    state.free1938Active = true;
  }

  function resetFree1938() {
    initFree1938();
    render();
  }

  function doFreeAction(key) {
    markFirstAction(key);
    if (state.ending1938 || state.actionsToday >= 2) return;
    const r = state.resources;
    if (key === 'class') {
      r.energy = Math.max(0, r.energy - 10);
      r.morale = Math.min(100, r.morale + 2);
      state.log.unshift(`第${state.day}天：上课`);
      setResFlash(['士气 +2', '体力 −10']);
    } else if (key === 'box') {
      r.energy = Math.max(0, r.energy - 6);
      r.box = Math.min(12, r.box + 1);
      state.log.unshift(`第${state.day}天：整理书箱`);
      setResFlash(['书箱 +1', '体力 −6']);
    } else if (key === 'food') {
      r.food = Math.max(0, r.food - 1);
      r.morale = Math.min(100, r.morale + 6);
      state.log.unshift(`第${state.day}天：开饭`);
      setResFlash(['士气 +6', '粮食 −1']);
    }
    state.actionsToday++;
    sfxClick();
    render();
  }

  function endDay() {
    markFirstAction('end-day');
    if (state.ending1938 || state.actionsToday < 2) return;
    if (state.day >= 7) { settle1938(); return; }
    const finished = state.day;
    state.day++;
    state.actionsToday = 0;
    state.resources.food = Math.max(0, state.resources.food - 1);
    state.resources.morale = Math.max(0, state.resources.morale - 1);
    state.log.unshift(`第${finished}天结束：粮食-1，士气-1`);
    setResFlash(['粮食 −1', '士气 −1']);
    sfxDay();
    dayFade();
    render();
  }

  function raidChoice(key) {
    markFirstAction(`raid-${key}`);
    if (state.raidDone) return;
    const r = state.resources;
    const before = r.morale;
    if (key === 'move') {
      r.energy = Math.max(0, r.energy - 10);
      r.morale = Math.min(100, r.morale + 5);
      state.log.unshift('第3天：连夜转移');
      setResFlash(['士气 +5', '体力 −10']);
    } else if (key === 'teach') {
      r.energy = Math.max(0, r.energy - 15);
      r.morale = Math.min(100, r.morale + 10);
      r.box = Math.max(0, r.box - 1);
      state.log.unshift('第3天：先上完这堂课');
      setResFlash(['士气 +10', '书箱 −1', '体力 −15']);
    } else if (key === 'hide') {
      r.box = Math.min(12, r.box + 1);
      r.morale = Math.max(0, r.morale - 5);
      state.log.unshift('第3天：把书箱藏进祠堂');
      setResFlash(['书箱 +1', '士气 −5']);
    } else if (key === 'protect' && hasLoadout('y1919:march')) {
      r.energy = Math.max(0, r.energy - 10);
      r.box = Math.max(0, r.box - 2);
      r.morale = Math.min(100, r.morale + 12);
      state.log.unshift('第3天：像当年一样，先护人再护书');
      setResFlash(['士气 +12', '书箱 −2', '体力 −10']);
    }
    if (hasLoadout('y1996:meaning') && r.morale < before) {
      r.morale = Math.min(100, r.morale + Math.ceil((before - r.morale) / 2));
    }
    state.raidDone = true;
    sfxClick();
    render();
  }

  function settle1938() {
    const r = state.resources;
    let key, text, reason;
    if (r.box >= 10 && r.morale >= 50) {
      key = 'move';
      text = '你带着学生和十只书箱走出城固。第二天，课在另一间祠堂继续。';
      reason = `书箱 ${r.box}/10、士气 ${r.morale}/50，两条转移条件都满足了。`;
    } else if (r.morale >= 70) {
      key = 'teach';
      text = '课堂没有断。警报声里，你把最后一段讲完，学生一个没少。';
      reason = `士气 ${r.morale}/70 达标，但书箱 ${r.box}/10 还不够；你选择先把课上完。`;
    } else {
      key = 'hide';
      text = '你们把书箱藏进祠堂后院，用稻草盖好。有些东西留了下来，等以后再取。';
      reason = `书箱 ${r.box}/10、士气 ${r.morale}/70 至少有一项未达标，于是把书留在了祠堂。`;
    }
    state.ending1938 = { key, text, reason };
    addCard('y1938', key);
    state.log.unshift(`第7天结算：书箱 ${r.box}/12，士气 ${r.morale}`);
    sfxClick();
    render();
  }

  function selectBook(id) {
    markFirstAction('select-book');
    if (state.sortDone.has(id)) return;
    state.sortSelected = id;
    state.sortHint = '';
    render();
  }

  function sortTo(bin) {
    markFirstAction(`sort-${bin}`);
    if (!state.sortSelected) {
      state.sortHint = '先点一本书。';
      render();
      return;
    }
    const book = SORT_BOOKS.find(b => b.id === state.sortSelected);
    if (!book) return;
    if (book.bin === bin) {
      state.sortDone.add(book.id);
      addCard('y1952', book.id);
      recordShareCard('y1952', book.id);
      state.sortSelected = null;
      state.sortHint = '';
      sfxClick();
      stamp('归');
      if (state.sortDone.size >= SORT_BOOKS.length) sfxWin();
    } else {
      state.sortHint = '不对，再看看书上的标签。';
      const el = document.querySelector('.sort-game');
      if (el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
      tone(180, .12, 'sawtooth', .025);
    }
    render();
  }

  function startAim() {
    state.aimActive = true;
    const layer = $('aimLayer'), marker = $('aimMarker');
    if (layer) layer.classList.remove('hide');
    if (marker) marker.style.left = `${state.aimPos}%`;
  }

  function stopAim() {
    state.aimActive = false;
    const layer = $('aimLayer');
    if (layer) layer.classList.add('hide');
  }

  function aimMove(delta) {
    if (state.aimResult) return;
    state.aimPos = Math.max(35, Math.min(65, state.aimPos + delta));
    const marker = $('aimMarker');
    if (marker) marker.style.left = `${state.aimPos}%`;
  }

  function aimStop() {
    markFirstAction('aim-stop');
    if (state.aimResult) return;
    const d = Math.abs(state.aimPos - 50);
    const key = d <= (hasLoadout('y2002:center') ? 2.5 : 1.5)
      ? 'center'
      : d <= (hasLoadout('y2002:center') ? 5 : 4) ? 'close' : 'off';
    state.aimResult = key;
    if (key === 'center') addPerfect('y1949');
    addCard('y1949', key);
    if (key === 'center') sfxWin(); else sfxClick();
    stamp(key === 'center' ? '正' : '挂');
    stopAim();
    render();
  }

  function resetAim() {
    state.aimResult = null;
    state.aimPos = 46;
    state.aimDir = 1;
    render();
  }

  function frameMove(delta) {
    if (state.frameResult) return;
    state.framePos = Math.max(35, Math.min(65, state.framePos + delta));
    const box = $('frameBox');
    if (box) box.style.left = `${state.framePos - 15}%`;
  }

  function frameShoot() {
    markFirstAction('frame-shoot');
    if (state.frameResult) return;
    const d = Math.abs(state.framePos - 50);
    const key = d <= (hasLoadout('y2002:center') ? 2.5 : 1.5)
      ? 'center'
      : d <= (hasLoadout('y2002:center') ? 5 : 4) ? 'close' : 'off';
    state.frameResult = key;
    if (key === 'center') addPerfect('y2002');
    addCard('y2002', key);
    if (key === 'center') sfxWin(); else sfxClick();
    stamp('存');
    render();
  }

  function resetFrame() {
    state.frameResult = null;
    state.framePos = 42;
    render();
  }

  function downloadShareCard() {
    trackEvent('share_longimg', {
      route: 'download',
      cards_run: state.shareCards.length
    });
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f2e1be';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#2f4a52';
    ctx.fillRect(0, 0, canvas.width, 250);
    ctx.strokeStyle = '#2a1c12';
    ctx.lineWidth = 12;
    ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
    ctx.strokeStyle = '#a84234';
    ctx.lineWidth = 4;
    ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#f6e6c4';
    ctx.font = '64px "STSong", "SimSun", serif';
    ctx.fillText('我的校史一日', 88, 118);
    ctx.fillStyle = '#d8b36e';
    ctx.font = '22px "FusionPixel", "SimHei", sans-serif';
    ctx.fillText('木铎声里 · 1902—2026', 92, 170);
    ctx.fillStyle = '#b7ccc4';
    ctx.font = '18px "KaiTi", "STKaiti", serif';
    ctx.fillText('我把这段记忆重新走了一遍。', 92, 210);

    const cards = state.shareCards.length
      ? [...state.shareCards, { scene: 'y2026', title: '听见完整的钟声' }]
      : [{ scene: 'y2026', title: '一段很轻的钟声' }];
    const startY = 330;
    const gap = Math.min(210, 980 / Math.max(1, cards.length));
    ctx.strokeStyle = 'rgba(168,68,52,.48)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(132, startY - 15);
    ctx.lineTo(132, startY + gap * (cards.length - 1) + 40);
    ctx.stroke();
    cards.forEach((card, index) => {
      const y = startY + index * gap;
      ctx.fillStyle = '#a84234';
      ctx.beginPath();
      ctx.arc(132, y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2a1c12';
      ctx.font = '42px "STSong", "SimSun", serif';
      ctx.fillText(SCENES[card.scene] ? SCENES[card.scene].era : '记忆', 180, y + 8);
      ctx.fillStyle = '#7a5a3a';
      ctx.font = '20px "KaiTi", "STKaiti", serif';
      ctx.fillText(SCENES[card.scene] ? SCENES[card.scene].title : '', 180, y + 40);
      ctx.fillStyle = '#2a1c12';
      ctx.font = '30px "FusionPixel", "SimHei", sans-serif';
      ctx.fillText(card.title, 180, y + 88);
      ctx.strokeStyle = 'rgba(138,109,74,.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(180, y + 110);
      ctx.lineTo(790, y + 110);
      ctx.stroke();
    });

    ctx.fillStyle = '#2a1c12';
    ctx.font = '26px "KaiTi", "STKaiti", serif';
    ctx.fillText('记忆不是被保存下来的，', 92, 1390);
    ctx.fillText('是被一次次重新经历的。', 92, 1432);
    ctx.fillStyle = '#a84234';
    ctx.fillRect(724, 1420, 82, 82);
    ctx.fillStyle = '#f6e6c4';
    ctx.font = '22px "STSong", "SimSun", serif';
    ctx.textAlign = 'center';
    ctx.fillText('木铎', 765, 1453);
    ctx.fillText('声里', 765, 1483);
    ctx.fillStyle = '#7a5a3a';
    ctx.textAlign = 'left';
    ctx.font = '17px "FusionPixel", "SimHei", sans-serif';
    ctx.fillText('《木铎声里》· 校史互动叙事', 92, 1520);
    ctx.fillStyle = '#8a7a66';
    ctx.font = '15px "KaiTi", "STKaiti", serif';
    ctx.fillText('本作只是一块砖——愿更多记忆被做成可以走进去的游戏。', 92, 1552);

    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '木铎声里-我的校史一日.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  function memoryStoryEntries() {
    return state.shareCards.length
      ? [...state.shareCards, { scene: 'y2026', title: '听见完整的钟声' }]
      : [{ scene: 'y2026', title: '一段很轻的钟声' }];
  }

  function storyPayload() {
    return {
      v: 1,
      date: new Date().toISOString().slice(0, 10),
      cards: memoryStoryEntries().map(card => {
        const scene = SCENES[card.scene];
        return {
          era: scene ? scene.era : '记忆',
          scene: scene ? scene.title : '',
          title: card.title
        };
      }),
      quote: '记忆不是被保存下来的，是被一次次重新经历的。'
    };
  }

  function encodeStoryPayload() {
    const bytes = new TextEncoder().encode(JSON.stringify(storyPayload()));
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  function onlineShareUrl() {
    if (!['http:', 'https:'].includes(location.protocol)) return '';
    return `${new URL('share.html', location.href).href}?d=${encodeStoryPayload()}&src=qr`;
  }

  function memoryPayloadText() {
    const url = onlineShareUrl();
    if (url) return url;
    const lines = storyPayload().cards.map(card => {
      return `${card.era}｜${card.scene}｜${card.title}`;
    });
    return `木铎声里·我的校史一日\n${lines.join('\n')}\n记忆不是被保存下来的，是被一次次重新经历的。`;
  }

  function openMemoryCode() {
    const online = Boolean(onlineShareUrl());
    trackEvent('share_qr', {
      has_host: online,
      route: 'open'
    });
    $('shareCodeCopy').textContent = online
      ? '扫描后可直接打开这次校史路线；页面可继续回到游戏。'
      : '当前是本地文件模式，二维码会写入完整文字记忆；部署到服务器后会自动生成线上分享链接。';
    const qr = qrcode(0, 'M');
    qr.addData(memoryPayloadText(), 'Byte');
    qr.make();
    const count = qr.getModuleCount();
    const canvas = document.createElement('canvas');
    const pad = 4;
    const scale = 8;
    canvas.width = (count + pad * 2) * scale;
    canvas.height = (count + pad * 2) * scale;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1a1512';
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) {
          ctx.fillRect((col + pad) * scale, (row + pad) * scale, scale, scale);
        }
      }
    }
    const host = $('qrCanvas');
    host.innerHTML = '';
    host.appendChild(canvas);
    $('shareCode').classList.add('show');
  }

  function downloadQr() {
    const canvas = $('qrCanvas').querySelector('canvas');
    if (!canvas) return;
    trackEvent('share_qr', {
      has_host: Boolean(onlineShareUrl()),
      route: 'download'
    });
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '木铎声里-我的校史记忆码.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  function next() {
    if (state.mode === 'share' || state.mode === 'auto') {
      if (state.shareIndex < SHARE_PATH.length - 1) {
        state.shareIndex++;
        go(SHARE_PATH[state.shareIndex]);
      }
      return;
    }
    if (state.scene === 'y2026') { sfxCancel(); state.scene = 'intro'; render(); return; }
    sfxCancel();
    go('y2026');
  }

  function replay() {
    delete state.chosen[state.scene];
    if (state.scene === 'y1938') {
      state.actions1938 = 0;
      state.event1938 = false;
      state.resources = { box: 7, food: 5, morale: 78, energy: 62 };
      state.log = [];
    }
    if (state.scene === 'y1952') {
      state.sortSelected = null;
      state.sortDone = new Set();
      state.sortHint = '';
    }
    render();
  }

  function resetArchive() {
    if (!confirm('确定清空全部档案卡与馆藏注记吗？')) return;
    state.cards.clear();
    state.discoveries.clear();
    saveCards();
    saveDiscoveries();
    resetTransientState();
    state.runActive = false;
    state.runEnding = null;
    saveRun();
    state.finaleShown = false;
    state.pendingFinale = false;
    state.scene = 'intro';
    render();
  }

  function fragSlots() {
    $('fragSlots').innerHTML = ERA_ORDER.map(e => `<i class="slot ${eraDone(e) ? 'fill' : ''}"></i>`).join('');
    $('fragCount').textContent = state.cards.size;
    $('exploreCount').textContent = `注记 ${state.discoveries.size}/${DISCOVERIES.length}`;
  }

  function discoveryHTML(scene) {
    if (state.mode !== 'free' || !state.runActive) return '';
    const items = DISCOVERIES.filter(d => d.scene === scene);
    if (!items.length) return '';
    const found = items.filter(d => state.discoveries.has(d.id)).length;
    return `
      <div class="fgroup">馆藏注记 ${found}/${items.length}</div>
      ${items.map(d => `<div class="fragline"><i class="dot ${state.discoveries.has(d.id) ? 'on' : ''}"></i>${state.discoveries.has(d.id) ? d.title : '朱红圈出的旧物'}</div>`).join('')}`;
  }

  function cardPreview(scene, runMode = false) {
    const owned = runMode ? state.runCards : state.cards;
    return `<div class="era-preview">${eraCards(scene).map(c => owned.has(cardId(scene, c.key)) ? c.title : '？？？').join(' · ')}</div>`;
  }

  function sideHTML() {
    const shareMode = state.mode === 'share' || state.mode === 'auto';
    if (audioUnlocked) ensureAmbient();
    if (shareMode) {
      if (state.scene === 'y2026') {
        return `
          <h3>分享模式 · 完成</h3>
          <p class="quote">记忆不是被保存下来的，是被一次次重新经历的。</p>
          <p class="endnote">${state.shareCards.length} 张记忆卡已收入档案。</p>`;
      }
      const cards = eraCards(state.scene);
      const mini = state.scene === 'intro' ? '四站记忆，约十分钟。听完钟声，就出发。' : SCENES[state.scene].mini;
      return `
        <h3>分享模式 · ${Math.min(state.shareIndex, 5)}/5</h3>
        ${cards.length ? cards.map(c => `<div class="fragline"><i class="dot ${state.cards.has(cardId(state.scene, c.key)) ? 'on' : ''}"></i>${c.title}</div>`).join('') : '<p class="quote">从一段很轻的钟声开始。</p>'}
        <p class="quote">${mini}</p>
        <p class="endnote">本幕选一张卡，继续下一站。</p>`;
    }
    if (state.scene === 'intro') {
      return `
        <h3>记忆档案 ${state.cards.size}/27</h3>
        <p class="quote">九段记忆，每段三张卡。集齐二十七张，木铎才会发出完整的声音。</p>
        <p class="endnote">点击场景标签，或进入 2026 档案室。</p>`;
    }
    if (state.scene === 'y1938') {
      const r = state.resources;
      const bar = (label, val, max, col) => `
        <div class="row"><span>${label}</span><div class="bar"><i style="width:${Math.round(val/max*100)}%;background:${col}"></i></div><b>${val}</b></div>`;
      if (state.mode === 'free') {
        return `
          <h3>第 ${state.day} 天 · 行动 ${state.actionsToday}/2</h3>
          <div class="res">
            ${bar('书箱', r.box, 12, '#c98a4b')}
            ${bar('粮食', r.food, 10, '#9fb87a')}
            ${bar('士气', r.morale, 100, '#c24a3a')}
            ${bar('体力', r.energy, 100, '#4a7a8c')}
          </div>
          ${state.resFlash.length ? `<div class="res-flash">${state.resFlash.join(' · ')}</div>` : ''}
          <div class="log">${state.log.slice(0,5).map(x => '· ' + x).join('<br>') || '· 七天开始了。'}</div>
          ${discoveryHTML('y1938')}
          <p class="endnote">${state.ending1938 ? '七天结束。' : '七天结束后结算。'}</p>`;
      }
      return `
        ${state.event1938 && !state.chosen.y1938 ? '<div class="alert">警报已响</div>' : ''}
        <h3>今日状态</h3>
        <div class="res">
          ${bar('书箱', r.box, 12, '#c98a4b')}
          ${bar('粮食', r.food, 10, '#9fb87a')}
          ${bar('士气', r.morale, 100, '#c24a3a')}
          ${bar('体力', r.energy, 100, '#4a7a8c')}
        </div>
        ${state.resFlash.length ? `<div class="res-flash">${state.resFlash.join(' · ')}</div>` : ''}
        <div class="log">${state.log.slice(0,3).map(x => '· ' + x).join('<br>') || '· 今天还没有安排。'}</div>
        <p class="endnote">本幕档案 ${eraCount('y1938')}/3 · ${state.chosen.y1938 ? '这一天结束了，再进一次可换一条路。' : state.event1938 ? '警报已响：选择之后，这一天就结束了。' : '做两件事，傍晚会有事发生。'}</p>`;
    }
    if (state.scene === 'y2026') {
      if (state.mode === 'free' && state.runActive) {
        const names = state.loadout.map(id => {
          const [e, k] = id.split(':');
          return CARD_TITLES[e] && CARD_TITLES[e][k] ? CARD_TITLES[e][k] : '?';
        });
        return `
          <h3>闭馆倒计时 ${state.visitsLeft} 天</h3>
          <div class="fragline"><i class="dot on"></i>本局档案 ${state.runCards.size} 张</div>
          <div class="fragline"><i class="dot on"></i>完美 ${state.runPerfects}</div>
          <div class="fragline"><i class="dot on"></i>装配 ${state.loadout.length}/3</div>
          <p class="quote">${names.length ? names.join(' · ') : '装配台还空着。'}</p>
          ${discoveryHTML('y2026')}
          <button class="album-link" onclick="window.openLoadout()">装配台 →</button>
          <button class="album-link" onclick="window.settleRun()">闭馆开展 →</button>
          <button class="album-link" onclick="window.openAlbum()">档案册</button>
          <button class="reset-link" onclick="window.newRun()">新开一局</button>`;
      }
      return `
        <h3>档案总览 ${state.cards.size}/27</h3>
        ${ERA_GROUPS.map(g => `<div class="fgroup">${g.label}　${g.keys.filter(eraDone).length}/3</div>`).join('')}
        <p class="quote">九幕，每幕三张卡。集齐二十七张，钟声才会完整。</p>
        <p class="endnote">点击左侧档案格，进入对应年代。进度自动保存在本机浏览器。</p>
        <button class="album-link" onclick="window.openAlbum()">打开档案册 →</button>
        <button class="reset-link" onclick="window.resetArchive()">重置档案</button>`;
    }
    const cards = eraCards(state.scene);
    const sceneData = currentSceneData();
    return `
      <h3>本幕档案 ${eraCount(state.scene)}/3${currentVariant() > 1 ? ' · 重访' : ''}</h3>
      ${cards.map(c => `<div class="fragline"><i class="dot ${state.cards.has(cardId(state.scene,c.key))?'on':''}"></i>${c.title}</div>`).join('')}
      ${discoveryHTML(state.scene)}
      <p class="quote">${sceneData.mini}</p>
      <p class="endnote">总进度 ${state.cards.size}/27 · 再进一次可走另一条路</p>
      <button class="album-link" onclick="window.openAlbum()">档案册 →</button>`;
  }

  function render() {
    const data = currentSceneData();
    if (!data) return;
    syncMusic();
    if (ERA_ORDER.includes(state.scene) && !state.visitedEras.has(state.scene)) {
      state.visitedEras.add(state.scene);
      saveVisited();
    }
    const shareMode = state.mode === 'share' || state.mode === 'auto';
    $('tabs').style.display = shareMode ? 'none' : 'flex';
    $('memory').style.display = shareMode ? 'none' : 'flex';
    $('shareProgress').classList.toggle('on', shareMode);
    $('shareProgress').textContent = `分享模式 · ${Math.min(state.shareIndex, 5)}/5`;
    const freeRun = state.mode === 'free' && state.runActive;
    $('runChip').classList.toggle('on', freeRun);
    if (freeRun) $('runChip').textContent = `闭馆 ${state.visitsLeft} 天 · 本局 ${state.runCards.size}`;


    state.filledGroups = ERA_GROUPS.filter(g => g.keys.every(eraDone)).length;
    if (shareMode && state.scene === 'y2026') state.filledGroups = 3;
    if (state.scene === 'y1949' && !state.aimResult) {
      if (!state.aimActive) startAim();
    } else if (state.aimActive) {
      stopAim();
    }
    if (state.scene === 'y2002' && !state.frameResult) {
      $('frameLayer').classList.remove('hide');
      $('frameBox').style.left = `${state.framePos - 15}%`;
    } else {
      $('frameLayer').classList.add('hide');
    }
    window.drawScene(state.scene, state);
    renderHotspots();
    markAnalyticsScene();

    document.querySelectorAll('#tabs button').forEach(b => {
      b.classList.toggle('on', b.dataset.scene === state.scene);
      b.classList.toggle('visited', state.visitedEras.has(b.dataset.scene));
    });
    fragSlots();

    $('era').textContent = data.era;
    $('title').textContent = data.title;
    $('subtitle').textContent = data.subtitle;
    if (state.scene === 'y2026' && state.cards.size < 27 && !shareMode) $('subtitle').textContent = '档案室 · 九段记忆';
    $('mini').textContent = data.mini;
    $('stageTag').textContent = `${data.stage} · 像素校史${currentVariant() > 1 ? ' · 重访' : ''}`;
    $('wm').textContent = data.era;
    $('foot').textContent = shareMode ? '分享模式 · 每站选一张卡，继续下一站' : '选择没有标准答案 · 每幕三张档案卡，集齐才算完成';
    $('side').innerHTML = sideHTML();

    const nextBtn = $('next');
    const replayBtn = $('replay');
    const choices = $('choices');
    const narration = $('narration');
    narration.style.minHeight = state.scene === 'y2026' ? '58px' : '';
    const revisitNote = $('revisitNote');
    if (currentVariant() > 1) {
      revisitNote.classList.remove('hide');
      revisitNote.textContent = `重访视角 ${currentVariant() - 1}/2 · ${data.revisitLabel}｜${data.mini}`;
    } else {
      revisitNote.classList.add('hide');
      revisitNote.textContent = '';
    }
    const showDone = () => {
      const share = state.mode === 'share' || state.mode === 'auto';
      nextBtn.classList.remove('hide');
      replayBtn.classList.toggle('hide', share || state.mode === 'free');
      nextBtn.textContent = share ? '继续 →' : '回档案室 →';
      replayBtn.textContent = '再进一次 ↺';
    };
    const hideDone = () => { nextBtn.classList.add('hide'); replayBtn.classList.add('hide'); };
    const runHub = state.scene === 'y2026' && state.mode === 'free' && state.runActive;
    $('foot').style.display = runHub ? 'none' : 'block';
    choices.style.marginTop = runHub ? '8px' : '';

    if (state.scene === 'y1938') {
      if (state.mode === 'free') {
        if (state.ending1938) {
          narration.textContent = state.ending1938.text;
          const missing = eraCards('y1938').filter(c => !state.cards.has(cardId('y1938', c.key))).map(c => c.title);
          choices.innerHTML = `
            <div class="ending-reason">判定：${state.ending1938.reason}${missing.length ? `<br>本幕仍缺：${missing.join('、')}` : '<br>本幕档案已经集齐。'}</div>
            <button class="choice alt" onclick="window.next()">回档案室 →</button>`;
          hideDone();
        } else if (state.day === 3 && !state.raidDone) {
          narration.textContent = '第 3 天，警报响了。今夜必须转移。课还没上完，书箱也还没封好。';
          choices.innerHTML = `
            <button class="choice warn" onclick="window.raidChoice('move')">立刻转移</button>
            <button class="choice alt" onclick="window.raidChoice('teach')">先上完这堂课</button>
            <button class="choice" onclick="window.raidChoice('hide')">把书箱藏进祠堂</button>
            ${hasLoadout('y1919:march') ? `<button class="choice alt" onclick="window.raidChoice('protect')">像当年一样，先护人</button>` : ''}`;
          hideDone();
        } else if (state.actionsToday < 2) {
          narration.textContent = `第 ${state.day} 天。今天还可以做 ${2 - state.actionsToday} 件事。`;
          choices.innerHTML = `
            <button class="choice" onclick="window.doAction('class')">上课 <small>士气 +2 / 体力 -10</small></button>
            <button class="choice alt" onclick="window.doAction('box')">整理书箱 <small>书箱 +1 / 体力 -6</small></button>
            <button class="choice warn" onclick="window.doAction('food')">开饭 <small>士气 +6 / 粮食 -1</small></button>`;
          hideDone();
        } else {
          const today = state.log.slice(0, 2).map(x => `· ${x}`).join(' ');
          narration.textContent = `第 ${state.day} 天的事做完了。${today}`;
          choices.innerHTML = `<button class="choice" onclick="window.endDay()">结束今天 →</button>`;
          hideDone();
        }
        return;
      }
      if (state.chosen.y1938) {
        narration.textContent = state.chosen.y1938;
        choices.innerHTML = '';
        showDone();
      } else if (state.event1938) {
        narration.textContent = '傍晚，警报响了。今夜必须转移。课还没上完，书箱也还没封好。';
        choices.innerHTML = `
          <button class="choice warn" onclick="window.chooseEvent('move')">立刻转移</button>
          <button class="choice alt" onclick="window.chooseEvent('teach')">先上完这堂课</button>
          <button class="choice" onclick="window.chooseEvent('hide')">把书箱藏进祠堂</button>
          ${hasLoadout('y1919:march') ? `<button class="choice alt" onclick="window.chooseEvent('protect')">像当年一样，先护人</button>` : ''}`;
        hideDone();
      } else {
        const left = 2 - state.actions1938;
        narration.textContent = `师生辗转到城固。故事里的临时课堂借在祠堂。书箱只剩七只，粮食也不多了。今天还可以做 ${left} 件事。`;
        choices.innerHTML = `
          <button class="choice" onclick="window.doAction('class')">上课 <small>士气 +2 / 体力 -10</small></button>
          <button class="choice alt" onclick="window.doAction('box')">整理书箱 <small>书箱 +1 / 体力 -6</small></button>
          <button class="choice warn" onclick="window.doAction('food')">开饭 <small>士气 +6 / 粮食 -1</small></button>`;
        hideDone();
      }
      return;
    }

    if (state.scene === 'y1952') {
      const done = state.sortDone.size === 3;
      if (done) {
        addPerfect('y1952');
        narration.textContent = '三本书都放对了。辅仁、北师大、共通，各自有了位置。';
        choices.innerHTML = '';
        showDone();
      } else {
        narration.textContent = '书要从这边搬到那边。先点一本书，再点它该去的书箱。';
        let hint = state.sortHint;
        if (!hint && hasLoadout('y1952:common') && state.sortSelected) {
          const book = SORT_BOOKS.find(b => b.id === state.sortSelected);
          const bin = book ? SORT_BINS.find(b => b.id === book.bin) : null;
          if (book && bin) hint = `共通经典提示：${book.title} → ${bin.label}`;
        }
        if (!hint && hasLoadout('y1902:classics') && !state.sortSelected) {
          hint = '读书人提示：辅仁校刊应放入辅仁书箱。';
        }
        choices.innerHTML = `<div class="sort-game ${state.sortHint ? 'shake' : ''}">
          <div class="sort-books">${SORT_BOOKS.map(b => `<button class="sort-book ${state.sortSelected === b.id ? 'sel' : ''} ${state.sortDone.has(b.id) ? 'done' : ''}" onclick="window.selectBook('${b.id}')" ${state.sortDone.has(b.id) ? 'disabled' : ''}>${b.title}</button>`).join('')}</div>
          <div class="sort-bins">${SORT_BINS.map(b => `<button class="sort-bin" onclick="window.sortTo('${b.id}')">${b.label}</button>`).join('')}</div>
          ${hint ? `<div class="sort-hint">${hint}</div>` : ''}
        </div>`;
        hideDone();
      }
      return;
    }

    if (state.scene === 'y1949') {
      if (state.aimResult) {
        const texts = {
          center: '你停在了正中。校牌挂正了，红布被风吹得猎猎响。',
          close: '校牌稍微歪了一点。大家仰头看了看，笑出了声。它还是挂上去了。',
          off: '你们试着把校牌举上去，还差一点。有人说，改天再挂。红绸在风里一直响。'
        };
        narration.textContent = texts[state.aimResult];
        choices.innerHTML = `
          <button class="choice" onclick="window.resetAim()">再挂一次 ↺</button>
          <button class="choice alt" onclick="window.next()">把这次挂法记下来 →</button>`;
      } else {
        narration.textContent = '校牌要挂正。用左右按钮微调位置，再决定是否挂上。留一点歪，也是一种真实的记忆。';
        choices.innerHTML = `
          <button class="choice" onclick="window.aimMove(-2)">← 左移</button>
          <button class="choice" onclick="window.aimStop()">挂上</button>
          <button class="choice" onclick="window.aimMove(2)">右移 →</button>
          <button class="choice alt" onclick="window.next()">回档案室 →</button>`;
      }
      hideDone();
      return;
    }

    if (state.scene === 'y2002') {
      if (state.frameResult) {
        const texts = {
          center: '咔嚓。校训碑正好在画面正中。',
          close: '咔嚓。画面偏了一点，旁边的人笑出了声。照片没有完美，却记住了那天的风。',
          off: '咔嚓。校训碑只拍到了一半。你还是把照片留下了，因为另一半在人群里。'
        };
        narration.textContent = texts[state.frameResult];
        choices.innerHTML = `
          <button class="choice" onclick="window.resetFrame()">再拍一张 ↺</button>
          <button class="choice alt" onclick="window.next()">把这张照片留下 →</button>`;
      } else {
        narration.textContent = '把校训碑框进画面中心。用左右调整，按“拍”。';
        choices.innerHTML = `
          <button class="choice" onclick="window.frameMove(-2)">← 左移</button>
          <button class="choice" onclick="window.frameShoot()">拍</button>
          <button class="choice" onclick="window.frameMove(2)">右移 →</button>
          <button class="choice alt" onclick="window.next()">回档案室 →</button>`;
      }
      hideDone();
      return;
    }

    if (state.scene === 'y2026') {
      if (state.mode === 'share' || state.mode === 'auto') {
        narration.textContent = '一路走来的记忆拼在一起。玻璃柜里的木铎第一次发出完整的声音，从 1902 年一直响到今天。';
        choices.innerHTML = `<div class="share-end">
          <div class="share-cards">${state.shareCards.map(c => `<span>${c.title}</span>`).join('')}</div>
          <div style="font-family:KaiTi,STKaiti,serif;font-size:15px;color:#5a4028;">记忆不是被保存下来的，是被一次次重新经历的。</div>
          <div style="margin:8px 0 2px;padding-top:8px;border-top:1px dashed #c9b28c;font-family:KaiTi,STKaiti,serif;font-size:12px;line-height:1.7;color:#6b4a2f;text-align:left;">
            <p style="margin:0;">尾声 · 致谢：从 1902 年师范馆的第一课，到 2026 年校史馆的木铎，一百二十余年钟声未歇——北京师范大学的历史从来不是先写在纸上的，是先被人一天一天活出来的。本作只是一块砖：愿更多珍贵的故事、记忆与旧照片被做成可以走进去的游戏，让记忆不只被保存，而是真实可触及。</p>
          </div>
          <div class="share-actions">
            <button onclick="window.startMode('share')">再走一遍</button>
            <button onclick="window.downloadShareCard()">保存我的校史一日 ↓</button>
            <button onclick="window.openMemoryCode()">生成记忆码 QR</button>
            <button onclick="window.downloadTelemetry(this)">导出试玩记录 JSON</button>
            <button onclick="window.copyDiagnostics(this)">复制诊断信息</button>
            <button onclick="window.openFeedback()">我有反馈</button>
            <button onclick="window.backToTitle()">回到标题</button>
          </div>
        </div>`;
        hideDone();
        return;
      }
      if (state.mode === 'free' && state.runActive) {
        if (state.visitsLeft <= 0 && !state.runEnding) {
          narration.textContent = '闭馆时间到了。';
          settleRun();
          return;
        }
        if (state.runEnding) {
          narration.textContent = `闭馆了。这一局找回了 ${state.runCards.size} 张档案卡。`;
          choices.innerHTML = `
            <button class="choice" onclick="window.newRun()">再开一局</button>
            <button class="choice alt" onclick="window.backToTitle()">回到标题</button>`;
          hideDone();
          return;
        }
        const fusionNote = hasLoadout('y1952:common')
          ? ' 两校合并展柜已经亮起：辅仁与师大的旧书箱第一次并排。'
          : '';
        narration.textContent = `闭馆还有 ${state.visitsLeft} 天。本局已经找回 ${state.runCards.size} 张卡。每次进入一个年代消耗 1 天；也可以先装配记忆卡。${fusionNote}`;
        choices.innerHTML = `<div class="era-grid">${ERA_ORDER.map(e => {
          const n = runEraCount(e), done = n === 3;
          return `<button class="era-btn ${done ? 'done' : ''}" onclick="window.go('${e}')">
            <b>${SCENES[e].era} · ${SCENES[e].title}</b>
            <span>${n}/3 张 · 进入 ${state.eraVisits[e] || 0} 次</span>
            <div class="era-dots">${[0,1,2].map(i => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</div>
              ${cardPreview(e, true)}
          </button>`;
        }).join('')}</div>`;
        hideDone();
        return;
      }
      const complete = state.cards.size >= 27;
      if (complete) {
        if (state.pendingFinale && !state.finaleShown) {
          state.pendingFinale = false;
          state.finaleShown = true;
          const el = $('finale');
          el.classList.remove('show');
          void el.offsetWidth;
          if (state.finaleStatic) el.classList.add('static');
          else el.classList.add('show');
          sfxBell();
        }
        const echo = groupEchoText();
        narration.textContent = state.chosen.y2026
          ? `${state.chosen.y2026}${echo ? ` ${echo}` : ''}`
          : `二十七张档案卡拼在一起。玻璃柜里的木铎第一次发出完整的声音，从 1902 年一直响到今天。${echo ? ` ${echo}` : ''}`;
        if (state.chosen.y2026) {
          choices.innerHTML = '';
          nextBtn.classList.remove('hide');
          replayBtn.classList.add('hide');
          nextBtn.textContent = '重新开始 ↺';
        } else {
          choices.innerHTML = data.choices.map(c => `<button class="choice ${c.key === 'pass' ? '' : 'alt'}" onclick="window.choose('${c.key}')">${c.label}</button>`).join('');
          hideDone();
        }
      } else {
        narration.textContent = `档案台上摊着九段记忆。你已经找到 ${state.cards.size} 张档案卡，还差 ${27 - state.cards.size} 张。每段记忆有三张，反复进入才能集齐。`;
        choices.innerHTML = `<div class="era-grid">${ERA_ORDER.map(e => {
          const n = eraCount(e), done = n === 3;
          return `<button class="era-btn ${done ? 'done' : ''}" onclick="window.go('${e}')">
            <b>${SCENES[e].era} · ${SCENES[e].title}</b>
            <span>${n}/3 张</span>
            <div class="era-dots">${[0,1,2].map(i => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</div>
              ${cardPreview(e)}
          </button>`;
        }).join('')}</div>`;
        hideDone();
      }
      return;
    }

    if (state.chosen[state.scene]) {
      narration.textContent = state.chosen[state.scene];
      choices.innerHTML = '';
      showDone();
    } else {
      narration.textContent = data.narration;
      const memoryHint = state.scene === 'y1996' && hasLoadout('y1971:check')
        ? '<div class="memory-hint">“一个字”记忆浮现：落笔前，先看横竖之间留下的空白。</div>'
        : '';
      choices.innerHTML = memoryHint + data.choices.map(c => `<button class="choice ${c.key === 'pedagogy' || c.key === 'stay' ? 'alt' : ''}" onclick="window.choose('${c.key}')">${c.label}</button>`).join('');
      hideDone();
    }
  }

  window.choose = choose;
  window.chooseEvent = chooseEvent;
  window.doAction = doAction;
  window.go = go;
  window.next = next;
  window.replay = replay;
  window.resetArchive = resetArchive;
  window.openAlbum = openAlbum;
  window.openCard = openCard;
  window.openDiscovery = openDiscovery;
  window.openSources = openSources;
  window.openMethod = openMethod;
  window.closeMethod = closeMethod;
  window.openLoadout = openLoadout;
  window.toggleLoadout = toggleLoadout;
  window.settleRun = settleRun;
  window.newRun = newRun;
  window.startMode = startMode;
  window.backToTitle = backToTitle;
  window.selectBook = selectBook;
  window.sortTo = sortTo;
  window.endDay = endDay;
  window.raidChoice = raidChoice;
  window.resetFree1938 = resetFree1938;
  window.aimMove = aimMove;
  window.aimStop = aimStop;
  window.resetAim = resetAim;
  window.frameMove = frameMove;
  window.frameShoot = frameShoot;
  window.resetFrame = resetFrame;
  window.downloadShareCard = downloadShareCard;
  window.openMemoryCode = openMemoryCode;
  window.downloadQr = downloadQr;
  window.buildShareUrl = onlineShareUrl;
  window.downloadTelemetry = downloadTelemetry;
  window.copyDiagnostics = copyDiagnostics;

  document.querySelectorAll('#tabs button').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.scene));
  });
  $('next').addEventListener('click', next);
  $('replay').addEventListener('click', replay);
  $('albumClose').addEventListener('click', closeAlbum);
  $('album').addEventListener('click', e => { if (e.target === $('album')) closeAlbum(); });
  $('sourceBtn').addEventListener('click', openSources);
  $('methodBtn').addEventListener('click', openMethod);
  $('sourcesClose').addEventListener('click', closeSources);
  $('sources').addEventListener('click', e => { if (e.target === $('sources')) closeSources(); });
  $('methodClose').addEventListener('click', closeMethod);
  $('method').addEventListener('click', e => { if (e.target === $('method')) closeMethod(); });
  $('loadoutClose').addEventListener('click', closeLoadout);
  $('loadout').addEventListener('click', e => { if (e.target === $('loadout')) closeLoadout(); });
  $('detailClose').addEventListener('click', closeCard);
  $('cardDetail').addEventListener('click', e => { if (e.target === $('cardDetail')) closeCard(); });
  $('shareCodeClose').addEventListener('click', () => $('shareCode').classList.remove('show'));
  $('shareCode').addEventListener('click', e => { if (e.target === $('shareCode')) $('shareCode').classList.remove('show'); });
  $('feedback').addEventListener('click', e => { if (e.target === $('feedback')) window.closeFeedback(); });
  $('downloadQrBtn').addEventListener('click', downloadQr);
  const soundBtn = $('sound');

  function updateSound() {
    soundBtn.classList.toggle('off', state.muted);
    soundBtn.textContent = state.muted ? '静' : state.soundMode === 'sfx' ? '效' : '音';
  }
  soundBtn.addEventListener('click', () => {
    state.soundMode = state.soundMode === 'all' ? 'sfx' : state.soundMode === 'sfx' ? 'off' : 'all';
    state.muted = state.soundMode === 'off';
    try { localStorage.setItem('muduo-v2-player-soundmode', state.soundMode); } catch (e) {}
    try { localStorage.setItem('muduo-v2-player-muted', state.muted ? '1' : '0'); } catch (e) {}
    updateSound();
    if (audioUnlocked) { ensureAmbient(); syncMusic(true); }
    if (!state.muted) sfxClick();
  });
  updateSound();

  fitViewport();
  document.addEventListener('pointerdown', () => { audioUnlocked = true; audioCtx(); ensureAmbient(); syncMusic(true); }, { once: true });
  document.addEventListener('pointerdown', () => {
    if (state.mode === 'auto' && Date.now() - autoStartedAt > 400) {
      stopAuto();
      state.mode = 'share';
      render();
    }
  });

  const params = new URLSearchParams(location.search);



  if (params.get('filled') === '1') {
    ERA_ORDER.forEach(e => Object.keys(CARD_TITLES[e]).forEach(k => state.cards.add(cardId(e, k))));
  }
  if (params.get('finale') === '1') { state.pendingFinale = true; state.finaleStatic = true; }
  const initial = params.get('scene');
  if (initial && SCENES[initial]) state.scene = initial;
  if (params.get('free') === '1') { state.mode = 'free'; $('titleScreen').classList.add('hide'); }
  if (params.get('share') === '1') {
    state.mode = 'share';
    state.shareIndex = Number(params.get('step') || 0);
    $('titleScreen').classList.add('hide');
  }
  if (params.get('day') === '3') {
    state.mode = 'free';
    state.scene = 'y1938';
    state.free1938Active = true;
    state.day = 3;
    state.actionsToday = 0;
    state.raidDone = false;
    $('titleScreen').classList.add('hide');
  }
  if (params.get('finish1938') === '1') {
    state.mode = 'free';
    state.scene = 'y1938';
    state.free1938Active = true;
    state.day = 7;
    state.actionsToday = 2;
    state.resources = { box: 11, food: 3, morale: 60, energy: 40 };
    $('titleScreen').classList.add('hide');
  }
  if (params.get('runloadout') === '1') {
    state.mode = 'free';
    state.runActive = true;
    state.scene = 'y2026';
    $('titleScreen').classList.add('hide');
  }
  if (params.get('runend') === '1') {
    state.mode = 'free';
    state.runActive = true;
    state.visitsLeft = 0;
    state.runCards = new Set(ERA_ORDER.slice(0, 3).flatMap(e => Object.keys(CARD_TITLES[e]).map(k => cardId(e, k))));
    state.runCards.forEach(id => state.cards.add(id));
    state.runPerfects = 2;
    state.runEndStatic = true;
    state.scene = 'y2026';
    $('titleScreen').classList.add('hide');
  }
  if (params.get('run') === '1') {
    state.mode = 'free';
    state.runActive = true;
    state.visitsLeft = Number(params.get('visits') || 9);
    state.scene = 'y2026';
    $('titleScreen').classList.add('hide');
  }
  if (params.get('t') !== null) {
    state.freezeT = true;
    state.t = Number(params.get('t')) || 0;
  }
  if (params.get('event') === '1') {
    state.actions1938 = 2;
    state.event1938 = true;
  }
  const pick = params.get('pick');
  if (pick && SCENES[state.scene]) {
    const c = SCENES[state.scene].choices.find(x => x.key === pick);
    if (c) {
      state.chosen[state.scene] = c.text;
      addCard(state.scene, c.key);
    }
  }
  render();
  if (params.get('finish1938') === '1') settle1938();
  if (params.get('runend') === '1') settleRun();
  if (params.get('runloadout') === '1') openLoadout(true);
  if (['share','free','auto'].includes(params.get('mode'))) startMode(params.get('mode'));
  if (params.get('flash') === '1') showSceneFlash(state.scene);
  if (params.get('album') === '1') openAlbum(true);
  if (params.get('card')) {
    const [scene, key] = params.get('card').split(':');
    openAlbum(true);
    openCard(scene, key, true);
  }
  if (params.get('sources') === '1') {
    openAlbum(true);
    openSources(true);
  }
  if (params.get('method') === '1') {
    openAlbum(true);
    openMethod(true);
  }
  let lastFrame = 0, emaFrame = 16, prevNow = 0;
  function tick(now) {
    if (prevNow) emaFrame = emaFrame * .9 + (now - prevNow) * .1;
    prevNow = now;
    window.__muduoLowPerf = emaFrame > 45;
    if (!document.hidden && now - lastFrame > 33) {
      if (!state.freezeT) state.t = now / 1000;
      window.drawScene(state.scene, state);
      lastFrame = now;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.__demoControl = {
    settings(s) {
      window.__demoSettings=s;window.__demoMusic=s.music/100;window.__demoSfx=s.sfx/100;
      state.muted=s.muted||window.__demoPaused;state.soundMode=s.music===0?'sfx':'all';
      window.__demoReduced=s.reduce;state.freezeT=window.__demoPaused||s.reduce;
      document.documentElement.style.fontSize=s.large?'18px':'';
      if(audioUnlocked){ensureAmbient();syncMusic(true);}
    },
    pause(value){window.__demoPaused=value;state.freezeT=value||window.__demoReduced;state.muted=value||window.__demoSettings?.muted;if(audioUnlocked){ensureAmbient();syncMusic(true);}}
  };
  window.openFeedback=()=>parent.postMessage({type:'muduo-demo-open',panel:'feedback'},location.origin);
  window.submitFeedback=window.openFeedback;
  window.openMethod=()=>parent.postMessage({type:'muduo-demo-open',panel:'method'},location.origin);
})();
