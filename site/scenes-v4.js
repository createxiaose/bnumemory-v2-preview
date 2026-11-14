(() => {
  const W = 780;
  const H = 280;
  const TILE = 32;
  const HY = 128;
  const CX = W / 2;
  let T = 0;
  let ready = false;
  let loaded = 0;

  const charImg = new Image();
  const tileImg = new Image();
  const propImg = new Image();
  const propBounds = window.MUDUO_PROP_BOUNDS || {};
  const backdropCache = new Map();
  const campusPanels = ["haidian", "furen", "zhuhai", "changping"].map(name => {
    const image = new Image();image.onload = () => backdropCache.clear();
    image.src = "assets/campuses/" + name + "-panel.webp";return image;
  });

  const TILE_ROWS = {
    wood: 0, stone: 4, museum: 8, grass: 12,
    plaster: 16, brick: 20, dark: 24, panel: 28,
    sky: 32, roof: 36, soil: 40, pavement: 44,
    whitewash: 48, redwall: 52, beam: 56, trim: 60,
    column: 64, step: 68, hedge: 72
  };
  const CHAR_ROWS = {
    student_blue: 0, student_brown: 1, student_green: 2, student_female: 3,
    teacher: 4, qigong: 5, visitor: 6, archivist: 7,
    student_1919: 8, worker_1938: 9, cadre_1952: 10,
    editor_1971: 11, photographer_2002: 12
  };
  const FRAME_COL = {
    idle_1: 0, idle_2: 1, blink: 2,
    walk_1: 3, walk_2: 4, walk_3: 5, walk_4: 6,
    point: 7, write: 8, carry: 9, read: 10,
    sit_1: 11, sit_2: 12, sit_blink: 13
  };
  const PROP_INDEX = {
    desk: 0, teacher_desk: 1, blackboard: 2, window: 3, door: 4,
    bookshelf: 5, cabinet: 6, case: 7, monument: 8, tree: 9,
    bench: 10, stove: 11, crate: 12, chair: 13, cart: 14,
    podium: 15, lamp: 16, banner: 17, plant: 18, books: 19,
    scroll: 20, bowl: 21, thermos: 22, paper: 23, inkstone: 24,
    brush: 25, camera: 26, cat: 27, bell: 28, frame: 29,
    label: 30, rug: 31, poster: 32, ladder: 33, cloth: 34,
    radio: 35, typewriter: 36, map: 37, flag: 38, globe: 39,
    clock: 40, suitcase: 41, bamboo: 42, lantern: 43, stool: 44
  };

  function markLoaded() {
    loaded += 1;
    if (loaded < 3) return;
    ready = true;
  }

  const fullCharacters = true;
  let characterFailed = false;
  window.__muduoCharacters = {requested:"full", active:"loading", fallback:false};
  function failedAsset() {
    characterFailed = true;
    window.__muduoCharacters.active = "load-error";
  }
  charImg.onload = () => { window.__muduoCharacters.active = "full"; markLoaded(); };
  tileImg.onload = markLoaded;
  propImg.onload = markLoaded;
  charImg.onerror = tileImg.onerror = propImg.onerror = failedAsset;
  charImg.src = "assets/characters-chibi-v6.png";
  tileImg.src = "assets/tileset-cozy-v4.png";
  propImg.src = "assets/props-chibi-v4.png";
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => backdropCache.clear());
  }

  const R = (ctx, x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
  const line = (ctx, x0, y0, x1, y1, color, width = 1) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };
  const poly = (ctx, points, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fill();
  };
  const ellipse = (ctx, cx, cy, rx, ry, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const hash = (n) => {
    const value = Math.sin(n * 91.731 + 17.13) * 43758.5453;
    return value - Math.floor(value);
  };

  function tile(ctx, name, variant, x, y, w = TILE, h = TILE) {
    const base = TILE_ROWS[name];
    if (base == null) return;
    const index = base + ((variant % 4) + 4) % 4;
    const sx = (index % 16) * TILE;
    const sy = Math.floor(index / 16) * TILE;
    ctx.drawImage(tileImg, sx, sy, TILE, TILE, Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h));
  }

  function tileFill(ctx, name, x, y, w, h, offset = 0) {
    const startX = Math.floor(x / TILE) * TILE;
    const startY = Math.floor(y / TILE) * TILE;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    let row = 0;
    for (let yy = startY; yy < y + h; yy += TILE, row++) {
      let col = 0;
      for (let xx = startX; xx < x + w; xx += TILE, col++) {
        tile(ctx, name, col * 3 + row * 5 + offset, xx, yy);
      }
    }
    ctx.restore();
  }

  function drawWall(ctx, material, y0, y1, wainscot, opts = {}) {
    tileFill(ctx, material, 0, y0, W, y1 - y0, opts.offset || 0);
    const light = ctx.createLinearGradient(0, y0, 0, y1);
    light.addColorStop(0, "rgba(12,8,5,.16)");
    light.addColorStop(.16, "rgba(255,235,190,.03)");
    light.addColorStop(1, "rgba(20,10,5,.16)");
    ctx.fillStyle = light;
    ctx.fillRect(0, y0, W, y1 - y0);
    R(ctx,0,y0,W,3,"#d2b57f");
    for(let x=0;x<W;x+=96){ R(ctx,x,y0+4,3,Math.max(0,y1-y0-8),"rgba(72,63,44,.13)"); }
    if (wainscot) {
      tileFill(ctx, wainscot, 0, y1 - 36, W, 36, 2);
      R(ctx, 0, y1 - 38, W, 5, "#5e3b24");
      R(ctx, 0, y1 - 36, W, 2, "#b07746");
      R(ctx, 0, y1 - 4, W, 4, "rgba(30,16,9,.42)");
      for (let x = 22; x < W; x += 46) R(ctx, x, y1 - 31, 2, 24, "rgba(53,30,18,.40)");
    }
  }

  function drawPerspectiveFloor(ctx, material, horizon = HY, opts = {}) {
    const bands = [horizon, horizon + 6, horizon + 13, horizon + 22, horizon + 33, horizon + 47, horizon + 65, horizon + 87, horizon + 113, H];
    for (let i = 0; i < bands.length - 1; i++) {
      const y = bands[i];
      const h = bands[i + 1] - y;
      const tw = 56 + i * 5;
      for (let x = -12; x < W + tw; x += tw) {
        tile(ctx, material, i + Math.floor(x / tw), x, y, tw + 1, h + 1);
      }
      const shade = Math.max(0, .16 - i * .012);
      if (shade) {
        R(ctx, 0, y, W, h, `rgba(28,16,9,${shade})`);
      }
      R(ctx, 0, y, W, 1, "rgba(62,35,22,.42)");
      R(ctx, 0, y + 1, W, 1, "rgba(255,222,166,.10)");
    }
    ctx.save();
    ctx.globalAlpha = .36;
    for (let i = -14; i <= 22; i++) {
      const backX = CX + i * 34;
      const frontX = CX + i * 59;
      line(ctx, backX, horizon + 2, frontX, H, opts.seam || "rgba(70,40,23,.8)", 1);
    }
    ctx.restore();
    const depth = ctx.createLinearGradient(0, horizon, 0, H);
    depth.addColorStop(0, "rgba(18,10,7,.32)");
    depth.addColorStop(.24, "rgba(18,10,7,.05)");
    depth.addColorStop(1, "rgba(18,10,7,.16)");
    ctx.fillStyle = depth;
    ctx.fillRect(0, horizon, W, H - horizon);
    if (opts.rug) {
      const g = ctx.createRadialGradient(CX, 222, 20, CX, 222, 220);
      g.addColorStop(0, "rgba(112,62,38,.28)");
      g.addColorStop(1, "rgba(112,62,38,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, horizon, W, H - horizon);
    }
  }

  function drawSkyline(ctx, kind, base = 152) {
    const far = "rgba(58,80,92,.50)", near = "rgba(40,58,68,.62)";
    const roof = (x, w, h) => poly(ctx, [[x, base], [x, base - h], [x + w * .18, base - h - 6], [x + w * .82, base - h - 6], [x + w, base - h], [x + w, base]], near);
    if (kind === "street") {
      for (let x = -20; x < W; x += 96) roof(x + ((hash(x) * 20) | 0), 70, 10 + ((hash(x + 1) * 8) | 0));
      R(ctx, 330, base - 34, 10, 34, near); R(ctx, 440, base - 34, 10, 34, near); R(ctx, 322, base - 38, 136, 7, near); R(ctx, 352, base - 31, 76, 10, far);
    } else if (kind === "gate") {
      for (let x = -30; x < W; x += 110) roof(x, 84, 9 + ((hash(x + 2) * 7) | 0));
      R(ctx, 352, base - 46, 76, 46, near); poly(ctx, [[344, base - 44], [390, base - 58], [436, base - 44]], far); R(ctx, 384, base - 32, 12, 16, far);
    } else if (kind === "campus") {
      for (let x = -20; x < W; x += 88) roof(x, 64, 8 + ((hash(x + 3) * 6) | 0));
      for (let x = 60; x < W; x += 150) { poly(ctx, [[x, base], [x - 11, base - 22], [x, base - 44], [x + 11, base - 22]], far); R(ctx, x - 2, base - 22, 4, 22, near); }
    } else {
      for (let x = -10; x < W; x += 64) { const h = 16 + ((hash(x + 4) * 30) | 0); R(ctx, x, base - h, 44, h, hash(x) > .5 ? far : near); }
      for (let i = 0; i < 5; i++) R(ctx, 90 + i * 150, base - 52 + ((hash(i + 9) * 18) | 0), 3, 3, "rgba(193,63,52,.5)");
    }
  }

  function drawSky(ctx, variant = 0, skyKind = null, skyBase = 152) {
    tileFill(ctx, "sky", 0, 0, W, 152, variant);
    const g = ctx.createLinearGradient(0, 0, 0, 152);
    g.addColorStop(0, "rgba(35,65,80,.24)");
    g.addColorStop(.55, "rgba(213,225,210,.04)");
    g.addColorStop(1, "rgba(240,225,190,.18)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, 152);
    ctx.globalAlpha = .32;
    for (let i = 0; i < 8; i++) {
      const x = (i * 131 + 22) % W;
      const y = 22 + (i * 17) % 68;
      R(ctx, x, y, 40 + (i % 3) * 18, 3, "rgba(236,244,238,.75)");
      R(ctx, x + 9, y - 4, 26, 4, "rgba(236,244,238,.74)");
    }
    ctx.globalAlpha = 1;
    if (skyKind) drawSkyline(ctx, skyKind, skyBase);
  }

  function drawWindow(ctx, x, y, w, h, rain = false, curtain = false) {
    R(ctx, x - 7, y - 7, w + 14, h + 14, "#23170f");
    R(ctx, x - 4, y - 4, w + 8, h + 8, "#6a4329");
    R(ctx, x, y, w, h, "#86a7b0");
    const sky = ctx.createLinearGradient(0, y, 0, y + h);
    sky.addColorStop(0, "rgba(187,214,215,.78)");
    sky.addColorStop(.55, "rgba(103,143,155,.68)");
    sky.addColorStop(1, "rgba(67,100,107,.76)");
    ctx.fillStyle = sky;
    ctx.fillRect(x, y, w, h);
    R(ctx, x, y, w, 4, "rgba(236,243,225,.42)");
    R(ctx, x + w / 2 - 3, y, 6, h, "#6a4329");
    R(ctx, x, y + h * .46, w, 6, "#6a4329");
    R(ctx, x + w / 2 - 1, y, 2, h, "rgba(226,183,110,.52)");
    R(ctx, x, y + h * .46 + 1, w, 2, "rgba(226,183,110,.42)");
    R(ctx, x - 8, y + h + 4, w + 16, 7, "#5a3822");
    R(ctx, x - 8, y + h + 4, w + 16, 2, "#a46e41");
    if (curtain) {
      poly(ctx, [[x - 4, y - 8], [x + 22, y - 2], [x + 18, y + h + 8], [x - 9, y + h + 11]], "rgba(103,53,40,.92)");
      R(ctx, x + 2, y, 3, h + 4, "rgba(205,134,85,.28)");
      poly(ctx, [[x + w - 20, y - 3], [x + w + 7, y - 8], [x + w + 8, y + h + 10], [x + w - 16, y + h + 6]], "rgba(103,53,40,.82)");
    }
    if (rain) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip();
      for (let i = 0; i < 18; i++) {
        const rx = x + ((i * 29 + T * 17) % (w + 20)) - 10;
        const ry = y + ((i * 37 + T * 78) % (h + 30)) - 15;
        line(ctx, rx, ry, rx - 4, ry + 13, "rgba(187,218,225,.48)", 1);
      }
      ctx.restore();
    }
  }

  function drawDoorway(ctx, x, y, w, h) {
    R(ctx, x - 8, y - 8, w + 16, h + 8, "#3d2517");
    R(ctx, x, y, w, h, "#17130f");
    R(ctx, x + 8, y + 8, w - 16, h - 8, "rgba(44,61,63,.52)");
    R(ctx, x - 3, y, 8, h, "#865031");
    R(ctx, x + w - 5, y, 8, h, "#4e2d1b");
    R(ctx, x - 6, y - 7, w + 14, 7, "#a66d3e");
  }

  function drawText(ctx, text, x, y, size, color, align = "center", font = "FusionPixel") {
    ctx.save();
    ctx.font = `${size}px "${font}", "SimHei", sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawProp(ctx, name, x, y, scale = 1, opts = {}) {
    const index = PROP_INDEX[name];
    const bounds = propBounds[name] || propBounds[index];
    if (!bounds) return;
    const sw = bounds.sw * scale;
    const sh = bounds.sh * scale;
    const wallProp = ["window", "poster", "map", "clock", "blackboard", "door"].includes(name);
    if (opts.shadow !== false && !wallProp && y > HY + 3) {
      ctx.save();
      ctx.fillStyle = `rgba(14,9,7,${opts.shadowAlpha == null ? .18 : opts.shadowAlpha})`;
      ctx.beginPath();
      ctx.ellipse(Math.round(x), Math.round(y - 1), clamp(sw * .32, 7, 48), Math.max(2, sw * .035), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha = opts.alpha == null ? 1 : opts.alpha;
    if (opts.flip) {
      ctx.translate(Math.round(x), 0);
      ctx.scale(-1, 1);
      ctx.drawImage(propImg, bounds.sx, bounds.sy, bounds.sw, bounds.sh, Math.round(-sw / 2), Math.round(y - sh), Math.ceil(sw), Math.ceil(sh));
    } else {
      ctx.drawImage(propImg, bounds.sx, bounds.sy, bounds.sw, bounds.sh, Math.round(x - sw / 2), Math.round(y - sh), Math.ceil(sw), Math.ceil(sh));
    }
    ctx.restore();
  }

  function contactShadow(ctx, x, y, width, alpha = .26) {
    const g = ctx.createRadialGradient(x, y, 1, x, y, width * .55);
    g.addColorStop(0, `rgba(13,8,6,${alpha})`);
    g.addColorStop(.55, `rgba(13,8,6,${alpha * .45})`);
    g.addColorStop(1, "rgba(13,8,6,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, width * .56, Math.max(3, width * .09), 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const actionFrameCache = new Map();
  function actionFrame(row,col) {
    const phase=col===8?(Math.floor(T*4)%2):((T%5.2)<.14?1:0);
    const key=row+":"+col+":"+phase;
    if(actionFrameCache.has(key))return actionFrameCache.get(key);
    const canvas=document.createElement("canvas");canvas.width=48;canvas.height=64;
    const g=canvas.getContext("2d");g.imageSmoothingEnabled=false;
    g.drawImage(charImg,col*48,row*64,48,64,0,0,48,64);
    if(col===8&&phase){g.clearRect(34,34,12,15);g.drawImage(charImg,col*48+34,row*64+34,12,15,35,34,12,15);}
    if(col===10&&phase)g.drawImage(charImg,2*48+10,row*64+3,26,25,10,3,26,25);
    canvas.__muduoCharacterFrame={row,col,phase};actionFrameCache.set(key,canvas);return canvas;
  }
  function drawChar(ctx, rowName, frame, x, y, scale = 1, opts = {}) {
    const row = CHAR_ROWS[rowName] == null ? 0 : CHAR_ROWS[rowName];
    const col = FRAME_COL[frame] == null ? 0 : FRAME_COL[frame];
    const source=(col===8||col===10)?actionFrame(row,col):charImg;
    const sx=(col===8||col===10)?0:col*48,sy=(col===8||col===10)?0:row*64;
    const sw = 32 * scale;
    const sh = 48 * scale;
    if (!opts.noShadow) contactShadow(ctx, x, y, 21 * scale, .28);
    ctx.save();
    ctx.globalAlpha = opts.alpha == null ? 1 : opts.alpha;
    if (opts.flip) {
      ctx.translate(Math.round(x), 0);
      ctx.scale(-1, 1);
      ctx.drawImage(source, sx, sy, 48, 64,
        Math.round(-sw / 2), Math.round(y - sh), Math.ceil(sw), Math.ceil(sh));
    } else {
      ctx.drawImage(source, sx, sy, 48, 64,
        Math.round(x - sw / 2), Math.round(y - sh), Math.ceil(sw), Math.ceil(sh));
    }
    ctx.restore();
  }


  // Desk contact is derived from the prop's crop height and the sprite's wrist row.
  // Paint desk, upper body/hands, then front apron: arms rest above the surface.
  function deskActor(ctx, name, frame, x, floorY, scale, deskX = x, deskScale = scale * .55, activity = "study") {
    const top = floorY - propBounds.desk.sh * deskScale;
    const footY = top + 2 + (48 - 34) * scale;
    drawProp(ctx, "stool", x, floorY + 1, scale * .30);
    drawProp(ctx, "desk", deskX, floorY, deskScale);
    if (activity === "write") {
      const px = x + 10 * scale;
      poly(ctx, [[px - 6*scale, top+1], [px+7*scale, top+1], [px+9*scale, top+4], [px-6*scale, top+4]], "#ede2c5");
      R(ctx, px - 3*scale, top+2, 5*scale, 1, "#a74735");
    }
    ctx.save();
    ctx.beginPath(); ctx.rect(x-20*scale, 0, 40*scale, top + 4); ctx.clip();
    drawChar(ctx, name, frame, x, footY, scale, {noShadow: true});
    ctx.restore();
    ctx.save();
    ctx.beginPath(); ctx.rect(deskX-60*deskScale, top+5, 120*deskScale, 50*deskScale); ctx.clip();
    drawProp(ctx, "desk", deskX, floorY, deskScale, {shadow:false});
    ctx.restore();
    if (activity === "write") {
      // Continue the existing brush to its paper contact, rather than adding a second pen.
      const px = x + 10*scale;
      line(ctx, px+1, top-3*scale, px, top+2, "#59412e", 1);
      R(ctx, px, top+2, 2, 1, "#29251f");
    }
  }

  function idleFrame(seed = 0, sitting = false) {
    const cycle = (T + seed * 1.73) % 5.2;
    if (cycle < .14) return sitting ? "sit_blink" : "blink";
    if (sitting) return Math.sin(T * 2.1 + seed) > 0 ? "sit_2" : "sit_1";
    return Math.sin(T * 2.05 + seed * .77) > .32 ? "idle_2" : "idle_1";
  }

  function walkFrame(seed = 0) {
    const frames = ["walk_1", "walk_2", "walk_3", "walk_4"];
    return frames[Math.floor((T * 8 + seed) % frames.length)];
  }

  function buildBackdrop(id, state, keySuffix = "", variant = 1) {
    const key = `${id}:${variant}:${keySuffix}`;
    if (backdropCache.has(key)) return backdropCache.get(key);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    if (id === "y1902") backdrop1902(ctx, variant);
    else if (id === "y1919") backdrop1919(ctx, variant);
    else if (id === "y1938") backdrop1938(ctx, variant);
    else if (id === "y1949") backdrop1949(ctx, variant);
    else if (id === "y1952") backdrop1952(ctx, variant);
    else if (id === "y1971") backdrop1971(ctx, variant);
    else if (id === "y1991") backdrop1991(ctx, variant);
    else if (id === "y1996") backdrop1996(ctx, variant);
    else if (id === "y2002") backdrop2002(ctx, variant);
    else backdrop2026(ctx, variant);
    backdropCache.set(key, canvas);
    return canvas;
  }

  function backdrop1902(ctx, variant) {
    drawWall(ctx, "plaster", 0, HY, "panel", { offset: 1 });
    drawPerspectiveFloor(ctx, "wood", HY, { seam: "rgba(72,42,23,.78)", rug: true });
    R(ctx, 0, 0, W, 9, "rgba(37,23,14,.32)");
    R(ctx, 0, 91, W, 5, "#6a4329");
    R(ctx, 0, 91, W, 2, "#b37c4a");
    drawWindow(ctx, 42, 19, 136, 77, false, false);
    drawWindow(ctx, 605, 19, 133, 77, false, false);
    drawProp(ctx, "blackboard", 390, 108, 1.13);
    drawProp(ctx, "door", 730, 126, .95);
    drawProp(ctx, "poster", 244, 105, .65);
    drawProp(ctx, "label", 520, 89, .48);
    drawProp(ctx, "globe", 651, 147, .62);
    // Warm shafts from the windows.
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (const x of [76, 640]) {
      const g = ctx.createLinearGradient(x, 62, x + 160, H);
      g.addColorStop(0, "rgba(255,231,172,.18)");
      g.addColorStop(1, "rgba(255,231,172,0)");
      poly(ctx, [[x - 20, 30], [x + 98, 47], [x + 225, H], [x + 85, H]], g);
    }
    ctx.restore();
  }

  function backdrop1919(ctx, variant) {
    drawSky(ctx, 1, "street", 96);
    drawPerspectiveFloor(ctx, "pavement", 145, { seam: "rgba(89,84,76,.36)" });
    R(ctx, 0, 137, W, 10, "rgba(54,48,40,.32)");
    // Old city wall and gate.
    tileFill(ctx, "brick", 34, 62, 712, 83, 2);
    R(ctx, 34, 58, 712, 10, "#5d4435");
    R(ctx, 34, 68, 712, 3, "rgba(190,152,120,.35)");
    drawDoorway(ctx, 326, 76, 132, 69);
    R(ctx, 28, 52, 724, 9, "rgba(37,28,23,.58)");
    R(ctx, 296, 74, 188, 29, "#552a23");
    R(ctx, 300, 78, 180, 21, "#9f3c31");
    R(ctx, 306, 82, 168, 2, "#d76a53");
    drawText(ctx, "外争主权 · 内除国贼", 390, 89, 11, "#f0ddb5");
    drawProp(ctx, "flag", 102, 170, .72);
    drawProp(ctx, "flag", 674, 170, .73, { flip: true });
    drawProp(ctx, "lantern", 739, 169, .62);
    // A few distant paper notices.
    for (let i = 0; i < 3; i++) {
      const x = 140 + i * 46;
      R(ctx, x, 106, 27, 32, "#e6d5b1");
      R(ctx, x + 4, 112, 19, 2, "#8f3e32");
      R(ctx, x + 4, 118, 16, 1, "rgba(67,45,33,.62)");
      R(ctx, x + 4, 122, 13, 1, "rgba(67,45,33,.62)");
    }
    R(ctx, 0, 154, W, 5, "rgba(71,60,49,.28)");
  }

  function backdrop1938(ctx, variant) {
    drawWall(ctx, "whitewash", 0, HY, "panel", { offset: 3 });
    drawPerspectiveFloor(ctx, "wood", HY, { seam: "rgba(68,39,23,.82)" });
    R(ctx, 0, 0, W, 13, "#4d3322");
    R(ctx, 0, 10, W, 4, "#8a5b36");
    R(ctx, 0, 13, W, 2, "rgba(34,20,12,.46)");
    R(ctx, 10, 0, 7, 109, "rgba(83,49,29,.42)");
    R(ctx, 763, 0, 7, 109, "rgba(83,49,29,.42)");
    R(ctx, 0, 98, W, 6, "#55351f");
    R(ctx, 0, 98, W, 2, "#91623d");
    drawWindow(ctx, 30, 18, 111, 70, true, false);
    drawWindow(ctx, 636, 18, 108, 70, true, false);
    for (const [wx, wy, ww, wh] of [[30, 18, 111, 70], [636, 18, 108, 70]]) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(wx, wy, ww, wh);
      ctx.clip();
      poly(ctx, [[wx - 5, wy + 58], [wx + 34, wy + 38], [wx + 63, wy + 49], [wx + 92, wy + 33], [wx + ww + 4, wy + 56], [wx + ww + 4, wy + wh], [wx - 5, wy + wh]], "rgba(50,63,61,.52)");
      ctx.restore();
    }
    drawProp(ctx, "blackboard", 393, 108, 1.06);
    drawProp(ctx, "poster", 210, 112, .55);
    drawProp(ctx, "poster", 574, 110, .52);
    drawProp(ctx, "stove", 82, 251, .62);
    drawProp(ctx, "crate", 691, 223, .62);
    drawProp(ctx, "crate", 733, 202, .53);
    R(ctx, 0, 107, W, 8, "rgba(55,34,22,.18)");
  }

  function backdrop1949(ctx, variant) {
    drawSky(ctx, 3, "gate", 88);
    drawPerspectiveFloor(ctx, "pavement", 152, { seam: "rgba(93,88,79,.38)" });
    tileFill(ctx, "brick", 0, 64, W, 88, 1);
    R(ctx, 0, 61, W, 8, "#5a3d2d");
    R(ctx, 0, 151, W, 5, "rgba(53,42,32,.35)");
    // Gate piers and the new school plaque.
    R(ctx, 84, 28, 54, 126, "#714133");
    R(ctx, 90, 28, 13, 126, "#9b5b47");
    R(ctx, 84, 24, 60, 8, "#402c25");
    R(ctx, 642, 28, 54, 126, "#714133");
    R(ctx, 676, 28, 13, 126, "#4e3029");
    R(ctx, 642, 24, 60, 8, "#402c25");
    R(ctx, 244, 46, 292, 55, "#4a2b20");
    R(ctx, 250, 52, 280, 43, "#d8c49a");
    R(ctx, 255, 57, 270, 33, "#9d392f");
    drawText(ctx, "北京师范大学", 390, 75, 27, "#f0dfb5");
    R(ctx, 320, 101, 140, 5, "#552c20");
    drawProp(ctx, "flag", 55, 170, .75);
    drawProp(ctx, "flag", 728, 170, .75, { flip: true });
    drawProp(ctx, "lantern", 111, 80, .54);
    drawProp(ctx, "lantern", 670, 80, .54, { flip: true });
    drawProp(ctx, "ladder", 577, 145, .7);
    drawProp(ctx, "banner", 150, 164, .7);
  }

  function backdrop1952(ctx, variant) {
    drawSky(ctx, 2, "campus", 78);
    drawPerspectiveFloor(ctx, "pavement", 144, { seam: "rgba(91,84,72,.35)" });
    tileFill(ctx, "brick", 90, 34, 600, 108, 0);
    R(ctx, 84, 30, 612, 9, "#51362a");
    R(ctx, 84, 138, 612, 8, "#6c665d");
    for (let i = 0; i < 7; i++) {
      const x = 128 + i * 82;
      R(ctx, x, 52, 49, 63, "#7c4f3a");
      R(ctx, x + 5, 57, 39, 53, "#b8c8c2");
      R(ctx, x + 24, 57, 3, 53, "#6c4b3b");
      R(ctx, x, 117, 49, 4, "#4e3428");
    }
    drawDoorway(ctx, 345, 68, 92, 76);
    drawProp(ctx, "tree", 73, 190, 1.15);
    drawProp(ctx, "tree", 710, 187, 1.08, { flip: true });
    drawProp(ctx, "bamboo", 748, 202, .86);
    drawProp(ctx, "banner", 390, 129, .67);
    drawProp(ctx, "teacher_desk", 155, 247, .43);
    drawProp(ctx, "books", 155, 234, .18);
    drawProp(ctx, "thermos", 205, 233, .3);
    R(ctx, 292, 56, 196, 26, "#a8322a");
    R(ctx, 292, 56, 196, 3, "#7d211b");
    R(ctx, 292, 79, 196, 3, "#7d211b");
    drawText(ctx, "院系调整 · 两校合一", 390, 70, 12, "#f6e7c6");
    R(ctx, 0, 144, W, 6, "rgba(62,56,46,.24)");
  }

  function backdrop1971(ctx, variant) {
    drawWall(ctx, "dark", 0, HY, "panel", { offset: 2 });
    drawPerspectiveFloor(ctx, "wood", HY, { seam: "rgba(52,34,22,.9)" });
    R(ctx, 0, 0, W, 18, "rgba(6,11,13,.38)");
    drawWindow(ctx, 48, 20, 138, 75, true, true);
    drawProp(ctx, "bookshelf", 686, 134, 1.02);
    drawProp(ctx, "cabinet", 596, 130, .86);
    drawProp(ctx, "map", 267, 107, .72);
    drawProp(ctx, "clock", 492, 112, .62);
    R(ctx, 0, HY, W, H - HY, "rgba(8,15,18,.36)");
    R(ctx, 200, 8, 338, 12, "rgba(12,11,9,.25)");
    drawText(ctx, "灯下 · 点校", 390, 16, 12, "rgba(225,208,168,.72)");
  }

  function backdrop1991(ctx, variant) {
    drawWall(ctx, "plaster", 0, HY, "panel", { offset: 2 });
    drawPerspectiveFloor(ctx, "wood", HY, { seam: "rgba(86,52,31,.74)", rug: true });
    drawWindow(ctx, 612, 18, 126, 76, false, true);
    drawProp(ctx, "bookshelf", 88, 134, .93);
    drawProp(ctx, "bookshelf", 681, 134, .9);
    drawProp(ctx, "poster", 250, 110, .62);
    drawProp(ctx, "plant", 734, 193, .8);
    R(ctx, 0, 0, W, 10, "rgba(77,43,25,.18)");
    drawText(ctx, "励耘", 457, 31, 17, "rgba(116,50,39,.62)");
  }

  function backdrop1996(ctx, variant) {
    drawWall(ctx, "plaster", 0, HY, "panel", { offset: 3 });
    drawPerspectiveFloor(ctx, "wood", HY, { seam: "rgba(87,54,33,.7)", rug: true });
    drawProp(ctx, "window", 47, 124, .78);
    drawProp(ctx, "bookshelf", 708, 134, .91);
    // Hanging scroll with the university motto.
    R(ctx, 214, 20, 352, 94, "#3a2518");
    R(ctx, 220, 25, 340, 84, "#efe3c7");
    R(ctx, 228, 31, 324, 2, "#c9b48d");
    R(ctx, 228, 102, 324, 2, "#c9b48d");
    drawText(ctx, "学为人师", 318, 55, 19, "#32251d");
    drawText(ctx, "行为世范", 468, 55, 19, "#32251d");
    drawText(ctx, "一九九六", 392, 86, 10, "rgba(122,65,48,.85)");
    R(ctx, 386, 90, 14, 14, "#a84234");
    R(ctx, 390, 93, 6, 8, "#efe3c7");
    // A pool of window light on the floor.
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    poly(ctx, [[40, 78], [154, 104], [363, H], [124, H]], "rgba(255,224,168,.08)");
    ctx.restore();
  }

  function backdrop2002(ctx, variant) {
    drawSky(ctx, 0, "city", 70);
    drawPerspectiveFloor(ctx, "pavement", 146, { seam: "rgba(87,82,72,.35)" });
    tileFill(ctx, "whitewash", 62, 30, 656, 116, 3);
    R(ctx, 55, 25, 670, 9, "#5b3d2e");
    R(ctx, 390, 35, 6, 110, "#8b6b51");
    for (let i = 0; i < 5; i++) {
      const x = 105 + i * 125;
      R(ctx, x, 59, 68, 54, "#6e5946");
      R(ctx, x + 6, 65, 56, 42, "#a6c0c3");
      R(ctx, x + 33, 65, 3, 42, "#6e5946");
      R(ctx, x + 6, 84, 56, 3, "#6e5946");
    }
    R(ctx, 97, 124, 586, 8, "#a2957c");
    drawProp(ctx, "tree", 77, 197, 1.2);
    drawProp(ctx, "tree", 703, 197, 1.17, { flip: true });
    drawProp(ctx, "monument", 390, 215, .86);
    R(ctx, 292, 52, 196, 30, "#9f342d");
    drawText(ctx, "百年校庆", 390, 68, 19, "#f1ddb2");
    drawProp(ctx, "flag", 147, 168, .8);
    drawProp(ctx, "flag", 635, 169, .79, { flip: true });
    R(ctx, 0, 152, W, 6, "rgba(67,59,49,.24)");
  }

  function backdrop2026(ctx, variant) {
    drawWall(ctx, "dark", 0, HY, "panel", { offset: 3 });
    drawPerspectiveFloor(ctx, "museum", HY, { seam: "rgba(73,91,105,.38)" });
    R(ctx, 0, 0, W, 12, "rgba(4,9,13,.42)");
    R(ctx, 0, 0, W, 70, "rgba(10,20,27,.36)");
    // Three changing archive panels.
    const xs = [84, 286, 488];
    const labels = ["海淀校园", variant>=2?"昌平校园":"辅仁旧址", "珠海校区"];
    xs.forEach((x, i) => {
      R(ctx, x, 28, 208, 83, "rgba(3,8,12,.46)");
      R(ctx, x + 7, 35, 194, 67, "rgba(26,38,46,.88)");
      R(ctx, x + 11, 39, 186, 59, i === 1 ? "rgba(91,56,44,.24)" : "rgba(60,82,92,.18)");
      R(ctx, x + 17, 47, 74, 39, i === 0 ? "#56646a" : i === 1 ? "#6d4d40" : "#4f5e58");
      R(ctx, x + 26, 54, 24, 20, i === 1 ? "#9d4d3f" : "#8ea2a4");
      R(ctx, x + 54, 57, 29, 3, "rgba(230,216,184,.7)");
      R(ctx, x + 54, 65, 22, 2, "rgba(190,206,202,.55)");
      const view = campusPanels[i===1&&variant>=2?3:i];
      if(view.complete && view.naturalWidth) ctx.drawImage(view, x+15, 43, 95, 53);
      drawText(ctx, labels[i], x + 152, 67, 9, "rgba(230,218,190,.75)");
      R(ctx, x + 7, 103, 194, 4, "#4c3524");
    });
    // Overhead track and three pools of light.
    R(ctx, 0, 10, W, 6, "#10191f");
    for (const x of [188, 390, 592]) {
      R(ctx, x - 8, 8, 16, 8, "#262f33");
      R(ctx, x - 5, 16, 10, 3, "#d4b26e");
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const g = ctx.createLinearGradient(x, 18, x, 220);
      g.addColorStop(0, "rgba(255,218,151,.18)");
      g.addColorStop(.55, "rgba(255,218,151,.055)");
      g.addColorStop(1, "rgba(255,218,151,0)");
      poly(ctx, [[x - 8, 18], [x + 8, 18], [x + 101, 230], [x - 101, 230]], g);
      ctx.restore();
    }
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const pool = ctx.createRadialGradient(390, 232, 8, 390, 232, 164);
    pool.addColorStop(0, "rgba(255,220,150,.19)");
    pool.addColorStop(.45, "rgba(255,213,126,.07)");
    pool.addColorStop(1, "rgba(255,213,126,0)");
    ctx.fillStyle = pool;
    ctx.fillRect(220, 154, 340, 126);
    ctx.restore();
  }

  function dust(ctx, count = 24, y0 = 36, y1 = 240, seed = 0, color = "255,231,180") {
    if (window.__muduoLowPerf) count = Math.ceil(count / 2);
    for (let i = 0; i < count; i++) {
      const x = (hash(i + seed) * W + Math.sin(T * .18 + i) * 9 + W) % W;
      const y = y0 + ((hash(i + seed + 31) * (y1 - y0) + T * (2.5 + i % 3)) % (y1 - y0));
      const a = .12 + hash(i + seed + 71) * .28;
      R(ctx, x, y, i % 4 === 0 ? 2 : 1, 1, `rgba(${color},${a})`);
    }
  }

  function steam(ctx, x, y, seed = 0, color = "220,220,205") {
    for (let i = 0; i < 8; i++) {
      const age = (T * .26 + i / 8 + seed) % 1;
      const px = x + Math.sin(age * 8 + seed * 3) * (5 + age * 15);
      const py = y - age * 64;
      const a = (1 - age) * .19;
      ellipse(ctx, px, py, 2 + age * 6, 1 + age * 3, `rgba(${color},${a})`);
    }
  }

  function lightFlicker(ctx, x, y, radius, color = "255,210,117", strength = .12) {
    const flicker = strength * (.84 + .16 * Math.sin(T * 8.7) + .05 * Math.sin(T * 19.1));
    const g = ctx.createRadialGradient(x, y, 2, x, y, radius);
    g.addColorStop(0, `rgba(${color},${flicker})`);
    g.addColorStop(.45, `rgba(${color},${flicker * .43})`);
    g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  function scene1902(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    const teacherFrame = Math.sin(T * 1.1) > .66 ? "point" : "idle_1";
    if (variant <= 2) {
      add(164, () => {
        drawChar(ctx, "teacher", teacherFrame, 379, 165, .98);
      });
    } else {
      add(215, () => drawChar(ctx, "student_female", "read", 394, 216, .98));
    }
    add(174, () => drawProp(ctx, "podium", 490, 175, .43));
    add(171, () => drawProp(ctx, "stool", 483, 173, .36));

    const baseRows = [
      { y: 181, xs: [141, 294, 447, 600], s: .68 },
      { y: 223, xs: [92, 249, 406, 563, 720], s: .84 },
      { y: 266, xs: [62, 219, 376, 533, 690], s: 1.02 }
    ];
    const rows = variant === 1
      ? baseRows
      : variant === 2
        ? [baseRows[0], { ...baseRows[2], xs: [122, 300, 478, 656] }]
        : [{ y: 238, xs: [126, 306, 486, 666], s: .88 }];
    rows.forEach((row, ri) => {
      row.xs.forEach((x, ci) => {
        const rowName = ["student_blue", "student_brown", "student_green", "student_female"][(ci + ri) % 4];
        add(row.y + 5, () => deskActor(ctx, rowName, idleFrame(ci * 2 + ri, true), x, row.y + 4, row.s));
        if ((ci + ri) % 3 === 0) {
          add(row.y + 7, () => drawProp(ctx, "paper", x + 18 * row.s, row.y - 21 * row.s, row.s * .23));
        }
      });
    });
    add(254, () => drawProp(ctx, "books", 585, 271, .3));
    add(258, () => drawProp(ctx, "inkstone", 218, 269, .24));
    add(258, () => drawProp(ctx, "cat", 721, 271, .48));
    if (variant >= 2) add(262, () => drawProp(ctx, "paper", 392, 270, .28));
    if (variant >= 3) add(260, () => drawProp(ctx, "clock", 640, 269, .46));
  }

  function scene1919(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    const crowd = [
      [135, 192, .63, "student_brown"], [196, 190, .64, "student_green"],
      [255, 193, .65, "student_blue"], [316, 190, .63, "student_female"],
      [470, 191, .64, "student_green"], [531, 193, .65, "student_blue"],
      [590, 190, .63, "student_brown"], [651, 194, .64, "student_blue"],
      [88, 232, .82, "student_blue"], [188, 233, .84, "student_female"],
      [292, 231, .82, "student_green"], [493, 233, .83, "student_brown"],
      [598, 232, .84, "student_blue"], [697, 234, .83, "student_green"],
      [46, 272, 1.02, "student_green"], [161, 276, 1.05, "student_blue"],
      [635, 274, 1.04, "student_female"], [748, 273, 1.02, "student_brown"]
    ];
    const visibleCrowd = variant === 1
      ? crowd
      : variant === 2
        ? crowd.filter((_, i) => i % 2 === 0)
        : crowd.slice(0, 6);
    visibleCrowd.forEach(([x, y, s, name], i) => {
      const displayName = i % 4 === 0 ? "student_1919" : name;
      const wander = i % 6 === 2;
      const ph = T * .22 + i * 2.1;
      const dx = wander ? Math.sin(ph) * 14 : 0;
      add(y, () => drawChar(ctx, displayName, wander ? walkFrame(i * 1.7) : idleFrame(i * 1.3, false), x + dx, y, s, { flip: wander && Math.cos(ph) < 0 }));
    });
    if (variant <= 2) {
      add(199, () => drawProp(ctx, "crate", 393, 199, .46));
      add(184, () => drawChar(ctx, "teacher", Math.sin(T * 1.4) > .3 ? "point" : "idle_1", 393, 183, 1.08));
    }
    if (variant === 1) {
      add(262, () => drawProp(ctx, "banner", 236 + Math.sin(T * 1.2) * 1.2, 262, .54));
      add(258, () => drawProp(ctx, "crate", 520, 258, .54));
      add(262, () => drawProp(ctx, "flag", 596 + Math.sin(T * 1.5 + 1) * 1.4, 264, .56));
    } else {
      add(270, () => drawProp(ctx, "cloth", 354, 273, .78));
      add(264, () => drawProp(ctx, "lantern", 622, 266, .62));
      add(268, () => drawProp(ctx, "paper", 262, 270, .32));
    }
    // A slow drift of handbills.
    for (let i = 0; i < 9; i++) {
      const x = (hash(i + 4) * W + T * (4 + i % 3) * .6) % W;
      const y = 72 + ((hash(i + 21) * 165 + T * (2.5 + i % 2)) % 150);
      R(ctx, x, y, 5, 3, "rgba(239,224,188,.55)");
    }
  }

  function scene1938(ctx, state, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    const alert = state.event1938 || (state.mode === "free" && state.day === 3 && !state.raidDone);
    if (variant <= 2) add(177, () => drawChar(ctx, "teacher", Math.sin(T * 1.6) > .25 ? "write" : "point", 391, 175, .93));
    add(180, () => drawProp(ctx, "stool", 467, 180, .34));
    const baseRows = [
      { y: 192, xs: [147, 290, 433, 576], s: .67 },
      { y: 228, xs: [102, 266, 430, 594, 719], s: .82 },
      { y: 270, xs: [70, 241, 412, 583], s: .98 }
    ];
    const rows = variant === 1
      ? baseRows
      : variant === 2
        ? baseRows.slice(0, 2)
        : [{ y: 232, xs: [188, 390, 592], s: .83 }];
    rows.forEach((row, ri) => {
      row.xs.forEach((x, ci) => {
        const name = (ci + ri) % 4 === 3 ? "worker_1938" : ["student_brown", "student_blue", "student_green"][(ci + ri) % 3];
        add(row.y + 4, () => deskActor(ctx, name, idleFrame(ci + ri * 3, true), x, row.y + 4, row.s, x, row.s * .54));
      });
    });
    if (variant === 1) add(259, () => drawChar(ctx, "student_blue", walkFrame(2), 318 + Math.sin(T * .75) * 38, 259, .92));
    add(251, () => drawProp(ctx, "crate", 275, 253, .52));
    add(251, () => drawProp(ctx, "books", 276, 246, .25));
    add(255, () => drawProp(ctx, "thermos", 716, 254, .48));
    if (variant >= 2) add(242, () => drawProp(ctx, "lantern", 626, 243, .58));
    if (variant >= 2) add(263, () => drawProp(ctx, "crate", 657, 265, .42));
    steam(ctx, 105, 170, .3, "221,220,210");
    steam(ctx, 106, 170, .75, "221,220,210");
    if (alert) {
      const glow = .07 + (.5 + .5 * Math.sin(T * 6)) * .08;
      const g = ctx.createRadialGradient(724, 42, 1, 724, 42, 75);
      g.addColorStop(0, `rgba(218,77,56,${glow})`);
      g.addColorStop(1, "rgba(218,77,56,0)");
      ctx.fillStyle = g;
      ctx.fillRect(640, 0, 140, 120);
      R(ctx, 713, 16, 22, 16, "rgba(41,18,16,.82)");
      R(ctx, 718, 20, 12, 7, Math.sin(T * 6) > 0 ? "#ef6a50" : "#a8352a");
    }
    dust(ctx, 20, 20, 146, 4, "236,225,198");
  }

  function scene1949(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    const crowd = [
      [172, 198, .68, "student_blue"], [238, 197, .67, "student_female"],
      [542, 198, .68, "student_brown"], [610, 196, .67, "student_green"],
      [121, 238, .86, "student_green"], [214, 239, .87, "student_blue"],
      [568, 239, .86, "student_female"], [662, 237, .85, "student_blue"],
      [55, 275, 1.05, "student_blue"], [184, 277, 1.08, "student_brown"],
      [621, 276, 1.06, "student_green"], [740, 274, 1.02, "student_female"]
    ];
    const visibleCrowd = variant === 1 ? crowd : variant === 2 ? crowd.filter((_, i) => i % 3 === 0) : crowd.slice(0, 4);
    visibleCrowd.forEach(([x, y, s, name], i) => {
      const displayName = i % 5 === 0 ? "cadre_1952" : name;
      add(y, () => drawChar(ctx, displayName, idleFrame(i * 1.7), x, y, s));
    });
    add(228, () => drawChar(ctx, "teacher", Math.sin(T * 1.1) > .4 ? "point" : "idle_2", 390, 228, 1.05));
    add(254, () => drawProp(ctx, "flag", 347 + Math.sin(T * 1.35) * 1.2, 254, .8));
    add(259, () => drawChar(ctx, "photographer_2002", "point", 474, 259, .94));
    add(255, () => drawProp(ctx, "crate", 286, 252, .52));
    add(255, () => drawProp(ctx, "books", 287, 246, .22));
    if (variant >= 2) add(264, () => drawProp(ctx, "cloth", 585, 270, .62));
    const flash = ((T + .3) % 3.7) < .12;
    if (flash) {
      const g = ctx.createRadialGradient(474, 223, 2, 474, 223, 70);
      g.addColorStop(0, "rgba(255,247,206,.78)");
      g.addColorStop(1, "rgba(255,247,206,0)");
      ctx.fillStyle = g;
      ctx.fillRect(395, 120, 164, 164);
    }
    dust(ctx, 25, 60, 190, 2, "255,234,188");
  }

  function scene1952(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    if (variant === 1) {
      add(208, () => drawProp(ctx, "cart", 438, 208, .67));
      add(237, () => drawChar(ctx, "qigong", "carry", 352, 237, 1.02));
      add(247, () => drawChar(ctx, "cadre_1952", "carry", 264, 247, .98));
      add(249, () => drawChar(ctx, "worker_1938", "carry", 472+Math.sin(T*.5)*10, 249, 1.01));
      add(257, () => drawChar(ctx, "student_green", walkFrame(3), 144 + Math.sin(T * .7) * 18, 257, .9));
    } else {
      add(236, () => drawChar(ctx, "qigong", "read", 392, 237, 1.04));
      add(250, () => drawChar(ctx, "student_female", idleFrame(8), 520, 251, .94));
      add(266, () => drawProp(ctx, "globe", 666, 269, .55));
    }
    add(257, () => drawProp(ctx, "crate", 588, 257, .47));
    add(254, () => drawProp(ctx, "crate", 164, 254, .45));
    add(252, () => drawProp(ctx, "books", 566, 246, .24));
    add(272, () => drawProp(ctx, "books", 310, 272, .25));
    add(270, () => drawProp(ctx, "thermos", 648, 270, .42));
    add(260, () => drawProp(ctx, "bench", 91, 260, .67));
    steam(ctx, 648, 224, .9, "224,222,208");
    // Leaves drifting under the trees.
    for (let i = 0; i < 15; i++) {
      const x = (hash(i + 11) * W + Math.sin(T * .35 + i) * 18 + T * 2) % W;
      const y = 88 + ((hash(i + 33) * 146 + T * (4 + i % 3)) % 150);
      R(ctx, x, y, 3, 2, i % 2 ? "rgba(132,151,84,.5)" : "rgba(181,154,77,.42)");
    }
  }

  function scene1971(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    add(206, () => drawProp(ctx, "lamp", 518, 208, .72));
    add(224, () => deskActor(ctx, "qigong", "write", 430, 225, 1.06, 447, .65, "write"));
    add(221, () => drawProp(ctx, "books", 505, 216, .23));
    add(218, () => drawProp(ctx, "paper", 472, 199, .16, {shadow:false}));
    add(225, () => drawProp(ctx, "inkstone", 463, 201, .14, {shadow:false}));
    if (variant === 1) {
      add(241, () => deskActor(ctx, "editor_1971", "read", 257, 242, .94, 257, .5, "read"));
    }
    add(259, () => drawProp(ctx, "books", 688, 252, .3));
    add(260, () => drawProp(ctx, "thermos", 570, 260, .36));
    add(258, () => drawProp(ctx, "cat", 626, 259, .52));
    add(265, () => drawProp(ctx, "books", 78, 268, .36));
    add(268, () => drawProp(ctx, "paper", 112, 269, .22));
    if (variant >= 2) add(252, () => drawProp(ctx, "lantern", 236, 254, .55));
    lightFlicker(ctx, 518, 146, 158, "255,201,103", .18);
    const flick = .7 + .16 * Math.sin(T * 8.1) + .08 * Math.sin(T * 18.7);
    ctx.save();
    ctx.globalAlpha = flick;
    R(ctx, 500, 112, 39, 8, "rgba(244,197,111,.32)");
    ctx.restore();
    steam(ctx, 566, 229, .15, "226,222,205");
    dust(ctx, 18, 35, 168, 8, "229,208,164");
  }

  function scene1991(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    add(242, () => deskActor(ctx, "qigong", "write", 382, 243, 1.12, 398, .68, "write"));
    add(235, () => drawProp(ctx, "scroll", 418, 208, .33));
    add(243, () => drawProp(ctx, "inkstone", 420, 218, .14, {shadow:false}));
    if (variant === 1) {
      add(247, () => deskActor(ctx, "student_female", idleFrame(2.5, true), 522, 248, .97, 532, .5));
      add(245, () => drawProp(ctx, "paper", 552, 224, .2));
    }
    add(254, () => drawProp(ctx, "suitcase", 675, 256, .57));
    add(263, () => drawProp(ctx, "books", 188, 264, .3));
    add(264, () => drawProp(ctx, "bowl", 291, 267, .36));
    add(214, () => {
      R(ctx, 108, 148, 26, 66, "#e9dcbf"); R(ctx, 108, 148, 26, 5, "#a8322a"); R(ctx, 108, 209, 26, 5, "#a8322a");
      drawText(ctx, "义", 121, 168, 12, "#4d3828"); drawText(ctx, "卖", 121, 188, 12, "#4d3828");
    });
    add(216, () => {
      R(ctx, 596, 150, 44, 32, "#5a3822"); R(ctx, 599, 153, 38, 26, "#e9dcbf");
      drawText(ctx, "励耘", 618, 166, 9, "#4d3828");
    });
    add(238, () => { R(ctx, 428, 228, 10, 6, "#5a3822"); R(ctx, 431, 222, 3, 7, "#3d2517"); });
    add(258, () => {
      drawProp(ctx, "crate", 96, 258, .5);
      R(ctx, 88, 238, 18, 3, "#17130f");
      drawText(ctx, "捐", 97, 248, 7, "#f1dfb6");
    });
    if (variant >= 2) add(258, () => drawProp(ctx, "scroll", 571, 265, .38));
    const giftGlint = .12 + .08 * (0.5 + 0.5 * Math.sin(T * 1.3));
    ellipse(ctx, 678, 218, 34, 18, `rgba(192,78,57,${giftGlint})`);
    // Sunlit dust and a brush-stroke glint.
    dust(ctx, 24, 36, 210, 6, "255,225,167");
    if (Math.sin(T * 1.4) > .2) {
      R(ctx, 393, 216, 3, 1, "rgba(69,47,29,.8)");
    }
  }

  function scene1996(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    if (variant <= 2) add(248, () => deskActor(ctx, "qigong", "write", 390, 249, 1.1, 390, .53, "write"));
    else add(248, () => drawProp(ctx, "desk", 390, 249, .53));
    add(248, () => drawProp(ctx, "desk", 326, 249, .53));
    add(248, () => drawProp(ctx, "desk", 454, 249, .53));
    // Main writing surface is drawn flat by deskActor; an upright scroll would hide the hands.
    add(250, () => drawProp(ctx, "inkstone", 412, 230, .12, {shadow:false}));
    // The writing sprite already contains a brush; do not draw a second one nearby.
    if (variant === 1) {
      add(252, () => deskActor(ctx, "student_female", idleFrame(2, true), 512, 253, 1.0, 512, .45));
      add(252, () => deskActor(ctx, "teacher", idleFrame(4, true), 268, 253, .98, 268, .45));
      add(240, () => drawProp(ctx, "chair", 510, 241, .56));
      add(240, () => drawProp(ctx, "chair", 268, 241, .55));
    }
    add(259, () => drawProp(ctx, "bench", 98, 259, .63));
    add(261, () => drawProp(ctx, "plant", 671, 262, .72));
    add(268, () => drawProp(ctx, "books", 592, 271, .25));
    // The seal is stamped every few seconds.
    const stamp = (T % 4.1) < .32;
    if (stamp) {
      R(ctx, 403, 228, 3, 3, "rgba(172,57,46,.88)");
      R(ctx, 404, 229, 1, 1, "rgba(239,225,196,.8)");
    }
    dust(ctx, 21, 30, 185, 3, "255,230,178");
  }

  function scene2002(ctx, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    const crowd = [
      [118, 218, .7, "student_blue"], [213, 216, .7, "student_female"],
      [553, 217, .71, "student_green"], [650, 218, .7, "student_brown"],
      [83, 253, .91, "student_green"], [186, 255, .93, "student_blue"],
      [546, 254, .92, "student_female"], [678, 254, .91, "student_blue"]
    ];
    const visibleCrowd = variant === 1 ? crowd : variant === 2 ? crowd.slice(0, 4) : crowd.slice(4, 6);
    visibleCrowd.forEach(([x, y, s, name], i) => {
      const wander = i % 4 === 1;
      const ph = T * .2 + i * 1.7;
      const dx = wander ? Math.sin(ph) * 10 : 0;
      add(y, () => drawChar(ctx, name, wander ? walkFrame(i * 2.1) : idleFrame(i * 2.3), x + dx, y, s, { flip: wander && Math.cos(ph) < 0 }));
    });
    add(231, () => drawChar(ctx, "teacher", Math.sin(T * 1.2) > .35 ? "point" : "idle_2", 334, 232, 1.06));
    add(247, () => drawChar(ctx, "photographer_2002", "point", 506, 248, 1.02));
    // Camera is part of the photographer sprite, aligned with both hands.
    add(261, () => drawProp(ctx, "cart", 227, 261, .65));
    add(264, () => drawProp(ctx, "books", 227, 253, .24));
    add(262, () => drawProp(ctx, "flag", 588 + Math.sin(T * 1.45) * 1.3, 263, .68));
    add(249, () => drawProp(ctx, "plant", 337, 249, .48));
    add(249, () => drawProp(ctx, "plant", 443, 249, .48));
    const flash = ((T + 1.1) % 3.2) < .11;
    if (flash) {
      const g = ctx.createRadialGradient(506, 210, 1, 506, 210, 74);
      g.addColorStop(0, "rgba(255,248,213,.82)");
      g.addColorStop(1, "rgba(255,248,213,0)");
      ctx.fillStyle = g;
      ctx.fillRect(382, 88, 192, 192);
    }
    for (let i = 0; i < (window.__muduoLowPerf ? 10 : 28); i++) {
      const x = (hash(i + 50) * W + Math.sin(T * .5 + i) * 16) % W;
      const y = 20 + ((hash(i + 80) * 180 + T * (10 + i % 5)) % 210);
      R(ctx, x, y, 2, 3, i % 3 === 0 ? "rgba(193,63,52,.6)" : i % 3 === 1 ? "rgba(235,196,98,.65)" : "rgba(230,223,191,.55)");
    }
    dust(ctx, 20, 40, 200, 9, "255,237,191");
  }

  function scene2026(ctx, state, world, variant) {
    const add = (y, fn) => world.push({ y, fn });
    const fusionDisplay = state.mode === 'free' && state.loadout && state.loadout.includes('y1952:common');
    if (fusionDisplay) {
      add(255, () => {
        R(ctx, 231, 190, 84, 60, "rgba(151,207,207,.10)");
        R(ctx, 231, 190, 84, 2, "#87b8bd");
        R(ctx, 231, 248, 84, 3, "#87b8bd");
        R(ctx, 231, 190, 2, 61, "#87b8bd");
        R(ctx, 313, 190, 2, 61, "#87b8bd");
        R(ctx, 235, 195, 1, 49, "rgba(207,242,241,.38)");
        drawProp(ctx, "books", 273, 244, .35);
        R(ctx, 246, 247, 55, 3, "#4c3524");
        R(ctx, 250, 251, 47, 10, "#d7c9a7");
        drawText(ctx, "辅仁 · 师大", 273, 256, 7, "#4d3828");
      });
    }
    // Central artifact case. The glass and its glint move subtly.
    add(252, () => {
      const sway = Math.sin(T * 1.15) * .35;
      drawProp(ctx, "case", 390 + sway, 252, 1.32);
      R(ctx,365,157,51,89,"#6e837b");
      drawProp(ctx,"bell",390+sway,242,.93,{shadow:false});
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const glint = ctx.createLinearGradient(330, 150, 440, 260);
      glint.addColorStop(0, "rgba(207,242,241,0)");
      glint.addColorStop(.45, `rgba(207,242,241,${.05 + .055 * (0.5 + 0.5 * Math.sin(T * .8))})`);
      glint.addColorStop(.58, "rgba(207,242,241,.015)");
      glint.addColorStop(1, "rgba(207,242,241,0)");
      poly(ctx, [[346, 156], [411, 156], [439, 252], [319, 252]], glint);
      ctx.restore();
      contactShadow(ctx, 390, 263, 150, .38);
    });
    add(262, () => drawProp(ctx, "bench", 682, 264, .82));
    add(253, () => drawProp(ctx, "plant", 738, 254, .84));
    add(255, () => drawChar(ctx, "visitor", idleFrame(3.2), 193, 255, 1.07));
    add(255, () => drawChar(ctx, "archivist", idleFrame(6.8), 608, 256, .96));
    add(244, () => drawProp(ctx, "label", 390, 265, .72));
    const filled = state.filledGroups || 0;
    if (filled >= 1) {
      const a = .08 + .05 * (0.5 + 0.5 * Math.sin(T * .6));
      ellipse(ctx, 188, 85, 70, 47, `rgba(214,176,106,${a})`);
    }
    if (filled >= 2) {
      ellipse(ctx, 390, 85, 70, 47, `rgba(178,96,78,${.08 + .04 * Math.sin(T * .55 + 1)})`);
    }
    if (filled >= 3) {
      ellipse(ctx, 592, 85, 70, 47, `rgba(146,190,172,${.08 + .04 * Math.sin(T * .62 + 2)})`);
      const pulse = .08 + .045 * Math.sin(T * 1.6);
      const g = ctx.createRadialGradient(390, 202, 4, 390, 202, 88);
      g.addColorStop(0, `rgba(255,222,145,${pulse + .055})`);
      g.addColorStop(1, "rgba(255,222,145,0)");
      ctx.fillStyle = g;
      ctx.fillRect(295, 116, 190, 164);
    }
    dust(ctx, 28, 26, 248, 12, "201,218,211");
  }

  function foreground(ctx, id) {
    const d1 = "rgba(12,8,6,.78)", d2 = "rgba(20,13,9,.6)";
    if (id === "y1902" || id === "y1996") { poly(ctx, [[0, H], [0, H - 46], [104, H]], d1); R(ctx, W - 26, 0, 26, 44, d2); }
    else if (id === "y1919") { poly(ctx, [[0, H], [0, H - 40], [86, H]], d1); poly(ctx, [[0, 0], [64, 0], [0, 52]], d2); }
    else if (id === "y1938") { R(ctx, 0, H - 14, W, 14, d1); R(ctx, W - 22, 0, 22, 60, d2); }
    else if (id === "y1949") { R(ctx, 0, 0, W, 12, d2); for (let x = 0; x < W; x += 18) R(ctx, x, 10, 10, 5, d1); }
    else if (id === "y1952") { poly(ctx, [[0, H], [0, H - 38], [120, H]], d1); poly(ctx, [[W, H], [W, H - 34], [W - 96, H]], d2); }
    else if (id === "y1971") { poly(ctx, [[0, 0], [86, 0], [0, 64]], d1); poly(ctx, [[W, H], [W, H - 40], [W - 110, H]], d2); }
    else if (id === "y1991") { poly(ctx, [[0, H], [0, H - 42], [96, H]], d1); R(ctx, W - 24, 0, 24, 40, d2); }
    else if (id === "y2002") { ellipse(ctx, 40, -6, 90, 44, "rgba(24,44,32,.7)"); ellipse(ctx, W - 30, -8, 84, 40, "rgba(24,44,32,.62)"); poly(ctx, [[0, H], [0, H - 26], [70, H]], d1); poly(ctx, [[W, H], [W, H - 24], [W - 64, H]], d1); }
    else { R(ctx, 0, H - 10, W, 10, d1); R(ctx, 0, H - 12, W, 2, "rgba(135,184,189,.35)"); }
  }

  function vignette(ctx) {
    const g = ctx.createRadialGradient(CX, H * .45, 120, CX, H * .45, 520);
    g.addColorStop(0, "rgba(8,7,6,0)");
    g.addColorStop(.72, "rgba(8,7,6,.035)");
    g.addColorStop(1, "rgba(6,6,6,.10)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const top = ctx.createLinearGradient(0, 0, 0, H);
    top.addColorStop(0, "rgba(0,0,0,.12)");
    top.addColorStop(.18, "rgba(0,0,0,0)");
    top.addColorStop(.82, "rgba(0,0,0,0)");
    top.addColorStop(1, "rgba(0,0,0,.06)");
    ctx.fillStyle = top;
    ctx.fillRect(0, 0, W, H);
  }

  function sceneGrade(ctx, id, variant = 1) {
    const grades = {
      y1902: { x: 126, y: 76, color: "151,193,205", strength: .09, shade: .18 },
      y1919: { x: 390, y: 30, color: "255,229,178", strength: .1, shade: .12 },
      y1938: { x: 92, y: 70, color: "255,198,119", strength: .11, shade: .2 },
      y1949: { x: 390, y: 62, color: "190,224,224", strength: .075, shade: .14 },
      y1952: { x: 390, y: 40, color: "239,229,183", strength: .07, shade: .12 },
      y1971: { x: 518, y: 130, color: "255,190,98", strength: .14, shade: .28 },
      y1991: { x: 670, y: 80, color: "255,221,160", strength: .1, shade: .14 },
      y1996: { x: 96, y: 82, color: "255,232,183", strength: .09, shade: .13 },
      y2002: { x: 560, y: 40, color: "255,232,171", strength: .08, shade: .1 },
      y2026: { x: 390, y: 112, color: "164,202,207", strength: .07, shade: .3 }
    };
    const base = grades[id] || grades.y2026;
    const p = variant === 2
      ? { ...base, color: "255,205,145", strength: base.strength + .035, shade: base.shade + .035 }
      : variant >= 3
        ? { ...base, color: "126,174,190", strength: Math.max(.04, base.strength - .015), shade: base.shade + .11 }
        : base;
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const glow = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, 420);
    glow.addColorStop(0, `rgba(${p.color},${p.strength})`);
    glow.addColorStop(.55, `rgba(${p.color},${p.strength * .32})`);
    glow.addColorStop(1, `rgba(${p.color},0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    const edge = ctx.createLinearGradient(0, 0, 0, H);
    edge.addColorStop(0, `rgba(7,10,11,${p.shade * .35})`);
    edge.addColorStop(.25, "rgba(7,10,11,0)");
    edge.addColorStop(.76, "rgba(7,10,11,0)");
    edge.addColorStop(1, `rgba(7,10,11,${p.shade * .8})`);
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, W, H);
  }

  // Twenty-seven authored, playable compositions. Raster illustrations remain covers.
  const scene27 = {};
  const P27 = (prop,x,y,scale=1) => ({prop,x,y,scale});
  const A27 = (label,prop,x,drawY,scale=1) => {
    const b=propBounds[prop]||{sw:40,sh:40};
    const projected=prop==='paper'||prop==='label'&&!['新的校牌','门里的新校牌'].includes(label),height=projected?17*scale:b.sh*scale;
    return {label,name:label,prop,x,y:Math.round(drawY-height*.5),drawY,scale,projected,r:Math.max(21,Math.min(38,Math.max(b.sw,b.sh)*scale*.42))};
  };
  const C27 = (role,action,x,y,scale=1,range=0) => ({role,action,x,y,scale,range});
  const D27 = (role,x,y,scale=1) => ({role,x,y,scale});
  function add27(era,view,title,setting,theme,props,actors,anchors,desks=[],detail={}) {
    const id=era+':'+view;
    scene27[id]={id,era,view,title,setting,theme,props,actors,desks,detail,anchors:anchors.map((a,i)=>({...a,id:'a'+(i+1)}))};
  }
  add27('y1902',1,'第一课 · 师范馆教室','classroom','day',
    [P27('bookshelf',64,197,.9),P27('globe',675,199,.7),P27('plant',731,229,.8),P27('teacher_desk',392,182,.9),P27('door',727,137,.95)],
    [C27('teacher','point',400,156,1.1),C27('student_brown','walk',590,250,1,25)],
    [A27('一页讲义','paper',390,151,.55),A27('课堂黑板','blackboard',390,105,1.15),A27('经史与新学','books',215,216,.55)],
    [D27('student_blue',214,250,1.05),D27('student_female',340,250,1.05),D27('student_green',477,250,1.05)]);
  add27('y1902',2,'放学以后 · 回廊留课','corridor','sunset',
    [P27('bench',211,226,1),P27('bookshelf',689,220,.76),P27('door',503,150,1.05),P27('plant',57,224,.9),P27('clock',685,61,.45)],
    [C27('teacher','read',382,214,1.12),C27('student_female','walk',576,251,1.03,48),C27('student_green','carry',126,238,1.04)],
    [A27('放学讲义','paper',226,198,.65),A27('回廊门扇','door',503,150,1.05),A27('明日课表','poster',619,124,.69)],[],{rail:true});
  add27('y1902',3,'熄灯以前 · 旧课桌','study','night',
    [P27('bookshelf',116,220,1.05),P27('bench',676,250,.8),P27('chair',555,248,.85),P27('thermos',666,252,.55),P27('clock',352,64,.5)],
    [C27('student_blue','read',465,224,1.1),C27('student_brown','walk',249,253,1,20)],
    [A27('桌肚里的旧讲义','paper',492,203,.65),A27('熄灯前的台灯','lamp',588,202,.82),A27('留给后来者的课桌','desk',512,245,1.4)],[],{window:'left',curtain:true});
  add27('y1919',1,'那一天 · 北京街头','street','day',
    [P27('cart',121,244,.9),P27('tree',719,218,1.25),P27('poster',98,133,.8),P27('bench',664,252,.7)],
    [C27('student_1919','walk',294,246,1.1,45),C27('student_female','carry',418,242,1.1),C27('student_brown','walk',547,254,1.07,31),C27('teacher','point',650,221,.94)],
    [A27('待写的标语','banner',214,177,.85),A27('学校旗帜','flag',432,183,.8),A27('递向同学的传单','paper',578,236,.65)],[],{gate:'center'});
  add27('y1919',2,'灯亮以后 · 校门守候','gate','night',
    [P27('bench',578,244,.96),P27('plant',713,227,.85),P27('poster',664,128,.8),P27('bamboo',55,229,.78)],
    [C27('student_1919','carry',421,244,1.12),C27('student_green','walk',299,250,1.03,27),C27('teacher','point',531,214,1)],
    [A27('抱回来的传单','paper',582,211,.72),A27('校门灯笼','lantern',324,130,.8),A27('尚未关上的校门','door',190,187,1.25)],[],{gate:'left',stars:true});
  add27('y1919',3,'散去以后 · 清晨操场','field','dawn',
    [P27('tree',86,215,1.15),P27('bench',647,242,.95),P27('flag',707,165,.7),P27('cart',549,246,.75)],
    [C27('student_1919','point',354,246,1.12),C27('student_female','walk',180,251,1.05,37),C27('student_green','read',634,224,1.03)],
    [A27('空白标语','banner',370,247,.62),A27('写给家里的信纸','paper',650,212,.65),A27('收拢纸页的箱子','crate',520,255,.65)],[],{tracks:true});
  add27('y1938',1,'一箱书 · 临时课堂','temple','day',
    [P27('blackboard',411,111,1.06),P27('stove',697,236,.82),P27('cabinet',79,224,.92),P27('lantern',92,117,.6)],
    [C27('teacher','write',402,166,1.07),C27('worker_1938','carry',541,253,1.07,17)],
    [A27('要留下的书箱','crate',164,250,.85),A27('维持课堂的米粮','bowl',665,229,.75),A27('今天的讲义','paper',440,217,.65)],
    [D27('student_blue',307,248,1.02),D27('student_brown',435,248,1.02)],{beams:true});
  add27('y1938',2,'七天 · 雨后守课','wet-court','rain',
    [P27('stove',93,226,.77),P27('cart',652,247,1.05),P27('bench',488,249,.85),P27('bamboo',721,218,.9)],
    [C27('worker_1938','carry',271,251,1.18,29),C27('student_female','point',451,249,1.1),C27('student_green','carry',616,229,1.02)],
    [A27('从泥里抬出的书箱','crate',336,258,.9),A27('照亮门槛的油灯','lantern',142,186,.7),A27('包裹书页的干布','cloth',493,221,.75)],[],{puddles:true});
  add27('y1938',3,'天亮以前 · 补书处','repair-room','dawn',
    [P27('bookshelf',76,223,1.04),P27('teacher_desk',430,249,1.65),P27('crate',652,237,.8),P27('books',610,230,.35),P27('lantern',144,114,.58),P27('chair',438,267,.9)],
    [C27('teacher','write',432,219,1.13),C27('worker_1938','walk',604,253,1.02,22)],
    [A27('摊平的受潮书页','paper',382,194,.77),A27('补书用的笔与线','brush',464,197,.72),A27('包住书脊的干布','cloth',541,210,.65)],[],{window:'right',repair:true});
  add27('y1949',1,'复名 · 把新校牌挂正','gate','day',
    [P27('tree',62,222,1.17),P27('bench',685,248,.85),P27('plant',720,220,.82)],
    [C27('student_green','point',287,249,1.12),C27('teacher','read',558,243,1.1),C27('visitor','walk',657,263,1.05,25)],
    [A27('新的校牌','label',390,95,1.1),A27('门前的木梯','ladder',455,228,1.05),A27('校牌上的红绸','cloth',260,216,.8)],[],{gate:'center',schoolSign:true});
  add27('y1949',2,'挂好以后 · 红绸庭院','courtyard','sunset',
    [P27('tree',702,220,1.16),P27('teacher_desk',267,242,1.05),P27('plant',73,234,.8),P27('radio',591,211,.55)],
    [C27('teacher','point',436,235,1.08),C27('student_blue','walk',561,253,1.05,31),C27('visitor','read',664,231,1.05)],
    [A27('风里的红绸','cloth',266,198,.83),A27('校门边的公告','poster',390,123,.85),A27('停留片刻的长椅','bench',595,248,1.04)],[],{building:'left'});
  add27('y1949',3,'风停下来 · 门里与门外','threshold','dawn',
    [P27('cabinet',77,240,.85),P27('tree',697,222,1.18),P27('bench',641,248,.75),P27('chair',214,254,.8)],
    [C27('teacher','read',293,237,1.08),C27('student_brown','walk',469,254,1.08,36)],
    [A27('门里的新校牌','label',179,93,.96),A27('课堂仍要用的书','books',213,226,.57),A27('门边的一盏灯','lantern',370,135,.7)],[],{threshold:true});
  add27('y1952',1,'两校合一 · 书的迁徙','transfer','day',
    [P27('tree',62,225,1.1),P27('bench',690,246,.9),P27('bookshelf',562,212,.8),P27('banner',390,91,.85)],
    [C27('cadre_1952','carry',437,245,1.12,25),C27('student_female','point',204,237,1.04),C27('student_green','carry',622,252,1.07)],
    [A27('文史书箱','crate',273,249,.78),A27('待辨认的另一箱书','crate',507,252,.78),A27('送书的推车','cart',128,254,.92)],[],{signs:true});
  add27('y1952',2,'书搬完以后 · 空出来的位置','archive','sunset',
    [P27('bookshelf',94,218,1.12),P27('bookshelf',277,218,1.12),P27('cabinet',699,236,1),P27('teacher_desk',486,249,1.03)],
    [C27('cadre_1952','read',427,226,1.12),C27('student_brown','walk',589,253,1.06,22)],
    [A27('空出一排的书架','bookshelf',277,218,1.12),A27('留下来的旧书签','label',489,209,.6),A27('新库房的书箱','crate',642,257,.82)],[],{emptyShelf:277});
  add27('y1952',3,'新课本发下来 · 同一首诗','classroom','day',
    [P27('bookshelf',697,210,.9),P27('globe',79,174,.62),P27('teacher_desk',278,181,.9),P27('door',729,138,.93)],
    [C27('teacher','point',281,165,1.08),C27('cadre_1952','walk',611,253,1.08,25)],
    [A27('新发的课本','books',367,217,.6),A27('新贴的课程表','poster',559,103,.75),A27('仍是那一首诗','blackboard',313,104,1.1)],
    [D27('student_blue',222,250,1.08),D27('student_female',370,250,1.08),D27('student_green',511,250,1.08)],{windows:'left'});
  add27('y1971',1,'一个字 · 校样对读','proof-room','day',
    [P27('bookshelf',90,224,1.05),P27('cabinet',704,243,.95),P27('lamp',606,207,.76),P27('clock',578,61,.53)],
    [C27('editor_1971','read',331,221,1.14),C27('qigong','write',490,222,1.16),C27('student_green','walk',203,256,1.04,18)],
    [A27('查对的原书','books',290,203,.67),A27('待订正的校样','paper',493,203,.75),A27('记录疑问的卡片','label',586,229,.63)],[],{worktable:true});
  add27('y1971',2,'灯灭以后 · 雨窗留字','rain-study','night',
    [P27('bookshelf',79,233,1),P27('desk',320,250,1.55),P27('chair',325,266,.85),P27('radio',467,243,.55),P27('cabinet',688,249,.82)],
    [C27('qigong','read',320,221,1.13),C27('editor_1971','walk',487,259,1.06,18)],
    [A27('白天没有查完的疑问','paper',337,205,.75),A27('还温热的台灯','lamp',236,204,.85),A27('雨声里的窗','window',600,135,1.06)],[],{window:'right',rain:true});
  add27('y1971',3,'天亮以前 · 最后一行','proof-dawn','dawn',
    [P27('bookshelf',88,222,1.08),P27('desk',521,248,1.6),P27('chair',521,264,.86),P27('thermos',698,251,.61),P27('clock',365,63,.53)],
    [C27('qigong','write',520,221,1.15),C27('editor_1971','carry',292,255,1.06,24)],
    [A27('最后一行批注','paper',539,201,.76),A27('核字的字书','books',447,203,.64),A27('收拢校样的纸夹','label',622,221,.64)],[],{window:'left'});
  add27('y1991',1,'励耘 · 留给后来的人','studio','day',
    [P27('bookshelf',84,223,1.02),P27('teacher_desk',422,244,1.44),P27('plant',713,234,.9),P27('scroll',664,120,.95),P27('chair',419,260,.86)],
    [C27('qigong','read',423,215,1.17),C27('student_blue','walk',251,253,1.08,22)],
    [A27('捐资记录','paper',420,189,.78),A27('为育人而作的画','frame',570,134,.95),A27('案边的小印','inkstone',502,202,.69)],[],{calligraphy:true});
  add27('y1991',2,'墨迹干了 · 画作归箱','packing','sunset',
    [P27('bookshelf',692,221,.96),P27('teacher_desk',313,232,1.35),P27('cart',592,258,1.12),P27('stool',96,250,.8),P27('bamboo',745,226,.7)],
    [C27('qigong','point',429,235,1.12),C27('student_brown','carry',512,255,1.08,24),C27('student_female','read',170,231,1.03)],
    [A27('需要卷起的画轴','scroll',299,188,.83),A27('写着励耘的签条','label',359,202,.65),A27('保护画作的书画箱','crate',642,257,.92)],[],{packing:true});
  add27('y1991',3,'送到下一位 · 校园递书','book-route','day',
    [P27('tree',46,224,1.2),P27('bench',371,244,.85),P27('bamboo',711,211,.8),P27('cart',256,253,.91)],
    [C27('student_blue','carry',189,250,1.16,49),C27('student_female','walk',477,253,1.05,25),C27('teacher','point',663,236,1.08)],
    [A27('要送出的书箱','crate',153,252,.9),A27('途中核对的送书条','paper',417,218,.7),A27('接收处的签收夹','label',633,221,.7)],[],{delivery:true});
  add27('y1996',1,'八个字 · 提笔之前','calligraphy','day',
    [P27('bookshelf',83,223,1),P27('teacher_desk',419,248,1.73),P27('chair',419,266,.88),P27('bamboo',715,228,.91),P27('scroll',654,111,.9)],
    [C27('qigong','write',420,219,1.17),C27('student_female','walk',240,253,1.06,22)],
    [A27('慢慢研开的墨','inkstone',351,195,.83),A27('提起的毛笔','brush',430,193,.86),A27('待写八字的白纸','paper',493,198,.96)],[],{ink:true});
  add27('y1996',2,'风干以后 · 纸上的八个字','drying','sunset',
    [P27('teacher_desk',311,243,1.42),P27('bamboo',695,234,.91),P27('stool',495,256,.74),P27('cabinet',83,231,.91)],
    [C27('qigong','read',429,220,1.13),C27('student_female','point',579,247,1.08),C27('student_green','walk',171,251,1.03,20)],
    [A27('需要压住的纸角','paper',292,196,.96),A27('守住纸面的镇纸','inkstone',360,204,.7),A27('风干后卷起的题字','scroll',583,154,.94)],[],{drying:true});
  add27('y1996',3,'风过纸面 · 把字留住','studio-wind','day',
    [P27('cabinet',68,234,.95),P27('desk',507,250,1.9),P27('chair',510,266,.9),P27('bamboo',715,224,.85),P27('scroll',243,126,.9)],
    [C27('qigong','point',377,237,1.1),C27('student_female','write',511,220,1.13),C27('student_green','walk',201,254,1.03,24)],
    [A27('掀起的纸角','paper',490,191,1.05),A27('压稳纸面的镇纸','inkstone',572,207,.73),A27('写好的八字题签','label',647,221,.7)],[],{wind:true});
  add27('y2002',1,'百年 · 同一片阳光','celebration','day',
    [P27('tree',56,224,1.2),P27('tree',736,218,1.14),P27('bench',95,252,.8),P27('plant',637,242,.8)],
    [C27('photographer_2002','point',249,255,1.15),C27('student_blue','walk',574,259,1.1,24),C27('visitor','idle',516,225,1.03),C27('student_female','idle',462,231,1.06)],
    [A27('定格相聚的相机','camera',198,214,.95),A27('镜头里的校训碑','monument',391,231,1.37),A27('百年校庆的旗帜','flag',660,185,.85)],[],{pennants:true});
  add27('y2002',2,'人群散去 · 碑前的一束花','quiet-garden','sunset',
    [P27('tree',699,220,1.22),P27('tree',66,228,1.14),P27('monument',299,235,1.42),P27('poster',154,127,.67)],
    [C27('visitor','read',364,256,1.12),C27('student_female','walk',625,260,1.08,24)],
    [A27('人群留下的一束花','plant',365,252,.8),A27('空下来的长椅','bench',577,252,1.13),A27('口袋里的合影','paper',589,220,.66)],[],{flowers:true});
  add27('y2002',3,'照片洗出来 · 画面的另一半','darkroom','night',
    [P27('cabinet',84,235,1.01),P27('teacher_desk',432,248,1.64),P27('chair',436,266,.85),P27('camera',675,236,.72),P27('clock',699,61,.55)],
    [C27('photographer_2002','write',433,219,1.15),C27('student_blue','walk',235,256,1.07,19)],
    [A27('刚洗出的照片','paper',436,194,.9),A27('挂起晾干的底片','cloth',520,112,.82),A27('留住这一刻的相框','frame',607,226,.85)],[],{photos:true});

  // Work surfaces share the exact sprite crop geometry with the seated wrists.
  const desk27=(id,index,x,y,scale)=>{const c=scene27[id];c.actors[index].desk={x,y,scale};c.actors[index].x=x;
    const top=y-propBounds.desk.sh*scale;for(const a of c.anchors)if(Math.abs(a.x-x)<88&&['paper','books','brush','inkstone','lamp'].includes(a.prop)){a.drawY=Math.round(top+5);a.y=Math.round(a.drawY-(a.projected?17*a.scale:propBounds[a.prop].sh*a.scale)*.5)}};
  for(const c of Object.values(scene27))if(c.setting!=='classroom')for(const p of c.props)if(p.prop==='teacher_desk'){p.prop='desk';p.scale=p.scale>1.4?p.scale:1.5}
  desk27('y1902:3',0,512,245,1.4);desk27('y1938:3',0,430,249,1.65);
  desk27('y1971:1',0,338,248,1.3);desk27('y1971:1',1,482,248,1.3);
  desk27('y1971:2',0,320,250,1.55);desk27('y1971:3',0,521,248,1.6);
  desk27('y1991:1',0,422,244,1.44);desk27('y1996:1',0,419,248,1.73);
  desk27('y1996:3',1,507,250,1.9);desk27('y2002:3',0,432,248,1.64);
  scene27['y1938:3'].props.push(P27('bench',564,248,.75));scene27['y1971:1'].props.push(P27('bench',596,245,.8));scene27['y1971:3'].props.push(P27('bench',653,251,.7));
  const layouts27 = Object.values(scene27);
  window.MuduoScene27={version:'27-authored-layouts-v1',count:layouts27.length,
    getLayout(era,view){const c=scene27[era+':'+view];return c?{id:c.id,era:c.era,view:c.view,title:c.title,setting:c.setting,anchors:c.anchors.map(a=>({...a}))}:null},
    layouts:layouts27.map(c=>({id:c.id,era:c.era,view:c.view,title:c.title,setting:c.setting,anchors:c.anchors.map(a=>({...a}))}))};

  function wallPanel27(ctx,x,y,w,h,material='plaster') {
    tileFill(ctx,material,x,y,w,h,2);R(ctx,x,y,w,5,'#d1af77');R(ctx,x,y+h-4,w,4,'#5c402e');
    for(let xx=x+7;xx<x+w;xx+=38){R(ctx,xx,y+8,1,h-17,'#7b634019');R(ctx,xx+2,y+8,1,h-17,'#fff2cc12')}
  }
  function pitchedRoof27(ctx,x,y,w,h=24,dark=false){
    const c=dark?'#384b4d':'#6c6250',edge=dark?'#263b41':'#514434';
    poly(ctx,[[x-12,y+h],[x+w*.18,y],[x+w*.82,y],[x+w+12,y+h]],c);
    for(let row=0;row<5;row++){const yy=y+5+row*4,inset=(h-(yy-y))*.7;line(ctx,x+inset,yy,x+w-inset,yy,dark?'#82918b44':'#c6b68a66')}
    R(ctx,x-14,y+h,w+28,4,edge);R(ctx,x-10,y+h+4,w+20,2,'#ad9363');
  }
  function building27(ctx,x,y,w,h,{roof=true,gate=false,night=false,label=''}={}){
    wallPanel27(ctx,x,y,w,h,'brick');R(ctx,x+4,y+6,w-8,h-12,night?'#797c6f':'#d5c6a2');
    for(let yy=y+11;yy<y+h-16;yy+=25)for(let xx=x+16;xx<x+w-15;xx+=39){R(ctx,xx,yy,21,17,'#594d3c');R(ctx,xx+3,yy+3,15,11,night?'#cfa76b':'#86a8a4');R(ctx,xx+10,yy+2,2,14,'#a1916f')}
    if(gate)drawDoorway(ctx,x+w*.35,y+h*.36,w*.3,h*.64);
    if(roof)pitchedRoof27(ctx,x-3,y-24,w+6,25,night);
    if(label){R(ctx,x+w*.2,y+6,w*.6,21,'#614b34');R(ctx,x+w*.2+3,y+9,w*.6-6,15,'#e9ddbc');drawText(ctx,label,x+w*.5,y+17,10,'#5a4b36')}
    R(ctx,x-9,y+h,w+18,6,'#988568');R(ctx,x-14,y+h+6,w+28,4,'#bdad8b');
  }
  function indoorBackdrop27(ctx,c){
    const night=c.theme==='night',dawn=c.theme==='dawn';
    const temple=['temple','temple-dawn'].includes(c.setting),darkroom=c.setting==='darkroom';
    const wall=temple?'whitewash':darkroom?'dark':c.setting==='archive'?'brick':'plaster';
    drawWall(ctx,wall,0,132,temple?'beam':'panel',{offset:c.view});
    drawPerspectiveFloor(ctx,temple?'stone':'wood',132,{seam:temple?'#725c4144':'#6c422348'});
    if(night)R(ctx,0,0,780,132,darkroom?'#432e3b88':'#28414c55');
    if(temple){
      R(ctx,0,8,780,14,'#543924');R(ctx,0,22,780,3,'#b68c57');
      for(const x of [22,754]){R(ctx,x,19,14,130,'#62472c');R(ctx,x+2,23,3,122,'#a7844f');R(ctx,x-4,145,22,5,'#463825')}
      for(let x=84;x<737;x+=130){R(ctx,x,27,9,12,'#a18154');R(ctx,x-8,36,25,5,'#684c2e')}
    }
    let windows=[];
    switch(c.setting){
      case'classroom': windows=c.detail.windows==='left'?[[30,18,125,78]]:[[30,18,121,78],[608,18,115,78]];break;
      case'study':windows=[[291,20,151,87]];break;
      case'temple': windows=[[48,35,125,70],[609,35,119,70]];break;
      case'temple-dawn':windows=[[490,26,221,83]];break;
      case'repair-room':windows=[[179,27,171,87]];break;
      case'archive':windows=[[418,19,149,76]];break;
      case'proof-room':windows=[[226,20,176,83]];break;
      case'rain-study':windows=[[510,19,184,103]];break;
      case'proof-dawn':windows=[[211,17,184,90]];break;
      case'studio':windows=[[216,18,156,84]];break;
      case'packing':windows=[[455,20,144,84]];break;
      case'dining':windows=[[167,21,166,86]];break;
      case'calligraphy':windows=[[205,20,169,82]];break;
      case'drying':windows=[[445,18,224,94]];break;
      case'darkroom':windows=[];break;
      case'studio-wind':windows=[[411,16,229,96]];break;
    }
    for(const [x,y,w,h]of windows){drawWindow(ctx,x,y,w,h,false,['study','dining'].includes(c.setting));
      if(night){R(ctx,x+1,y+1,w/2-5,h*.45-2,'#253d51');R(ctx,x+w/2+3,y+1,w/2-5,h*.45-2,'#2d485c');R(ctx,x+1,y+h*.46+7,w/2-5,h*.54-10,'#466474');R(ctx,x+w/2+3,y+h*.46+7,w/2-5,h*.54-10,'#37596c');R(ctx,x+22,y+16,4,4,'#dce1bf')}
      if(dawn){poly(ctx,[[x+3,y+h-1],[x+w-4,y+h-1],[x+w+127,280],[x-61,280]],'#f8d68c19')}
    }
    if(c.setting==='classroom'){
      for(let x=220;x<580;x+=12)R(ctx,x,128,9,2,'#cfae7b');R(ctx,190,126,402,6,'#644a2e');
    }
    if(c.setting==='proof-room'){
      drawProp(ctx,'desk',338,248,1.3);drawProp(ctx,'desk',482,248,1.3);R(ctx,269,193,282,4,'#bda36d');R(ctx,272,194,276,2,'#dfcea2');
      for(let x=300;x<515;x+=29)R(ctx,x,199,18,1,'#a5875b');
    }
    if(c.setting==='archive'){
      for(const x of [76,259]){R(ctx,x-24,128,48,72,'#744c2a');for(let y=134;y<198;y+=21){R(ctx,x-23,y,46,3,'#bc8b4d');R(ctx,x-20,y+3,40,13,'#392f2166')}}
    }
    if(c.setting==='drying'){
      R(ctx,144,45,3,93,'#6a4d32');R(ctx,141,44,270,4,'#563e2e');
      for(let i=0;i<4;i++){const x=164+i*57;R(ctx,x,48,42,64,'#e9dfc0');R(ctx,x+2,50,38,60,'#f3e9ca');R(ctx,x+15,53,12,2,'#78543b');for(let y=64;y<105;y+=9)R(ctx,x+8,y,25,1,'#7e765b44')}
    }
    if(c.setting==='packing'){
      for(let i=0;i<4;i++){R(ctx,28+i*5,159-i*3,104,53,'#684b36');R(ctx,32+i*5,163-i*3,96,44,'#c3ae7a');R(ctx,39+i*5,172-i*3,82,2,'#7b684a')}
    }
    if(c.setting==='repair-room'){
      for(let i=0;i<4;i++){R(ctx,319+i*17,182,61,7,'#d7c9a3');R(ctx,322+i*17,184,55,1,'#9c8e66')}line(ctx,449,192,477,197,'#b5ac8e',1);
      R(ctx,591,126,131,7,'#735438');R(ctx,596,133,5,106,'#927044');R(ctx,711,133,5,106,'#765236');
      R(ctx,600,237,117,7,'#9c8259');R(ctx,604,235,111,3,'#d1b98a');R(ctx,604,245,108,4,'#5d4b35');
      R(ctx,620,137,80,17,'#d4c398');drawText(ctx,'垫高 · 避潮',660,145,9,'#5c513a');
    }
    if(c.setting==='studio-wind'){drawDoorway(ctx,112,25,93,124);R(ctx,0,147,241,3,'#e8ce9866');poly(ctx,[[422,110],[634,109],[741,280],[340,280]],'#f4dfb01d')}
    if(c.setting==='darkroom'){
      R(ctx,38,14,704,6,'#1c2226');R(ctx,100,16,3,45,'#352f31');ellipse(ctx,102,66,15,5,'#c44e42');
      for(let i=0;i<5;i++){const x=184+i*82;R(ctx,x,38,55,52,'#211e24');R(ctx,x+4,42,47,44,'#c7bfa6');R(ctx,x+8,55,39,24,'#7a9793');R(ctx,x+12,62,31,17,'#beb494');R(ctx,x+21,50,7,30,'#565e58');R(ctx,x+25,35,6,9,'#8a765b')}
      line(ctx,165,35,635,35,'#a4987a',1);R(ctx,204,192,344,18,'#48444a');R(ctx,211,195,95,11,'#8b8580');R(ctx,323,195,97,11,'#776d72');R(ctx,438,195,100,11,'#a19886');
    }
    // Individually positioned paper borders and bookplates keep room walls lived-in.
    if(!darkroom){R(ctx,183,22,27,37,'#72533a');R(ctx,186,25,21,31,'#d4bf8f');R(ctx,193,31,7,1,'#9e7650');R(ctx,190,36,12,1,'#9e7650');R(ctx,190,42,12,1,'#9e7650')}
    R(ctx,0,274,780,6,'#4d392a');R(ctx,0,273,780,1,'#d7ae7655');
  }
  function corridorBackdrop27(ctx,c){
    drawSky(ctx,0,'campus',119);drawPerspectiveFloor(ctx,'stone',143,{seam:'#7d795e66'});
    wallPanel27(ctx,320,0,460,144,'plaster');R(ctx,323,0,15,147,'#734a2f');
    R(ctx,0,5,780,12,'#6e482d');R(ctx,0,17,780,3,'#bb965c');
    for(const x of [22,156,291]){R(ctx,x,17,10,131,'#785433');R(ctx,x+3,19,2,127,'#c0a06b');R(ctx,x-4,143,18,5,'#5e4931')}
    R(ctx,0,120,318,6,'#b79968');R(ctx,0,139,318,5,'#6d593b');
    for(let x=10;x<316;x+=29)R(ctx,x,124,4,18,'#86683e');
    R(ctx,340,142,440,7,'#c3a06d');
  }
  function outdoorBackdrop27(ctx,c){
    const night=c.theme==='night',dawn=c.theme==='dawn';drawSky(ctx,night?3:dawn?2:0,'campus',137);
    if(night){R(ctx,0,0,780,148,'#16374c9c');for(let i=0;i<25;i++)R(ctx,(i*97+37)%780,(i*17+11)%79,1+(i%3===0),1,'#e4ddbb');ellipse(ctx,639,34,10,10,'#e0dfb6')}
    if(c.theme==='sunset')R(ctx,0,0,780,143,'#e4b87d33');
    drawPerspectiveFloor(ctx,c.setting==='wet-court'?'stone':'pavement',145,{seam:'#73786744'});
    if(['street','gate'].includes(c.setting)){
      const x=c.detail.gate==='left'?91:286,w=c.detail.gate==='left'?198:208;
      wallPanel27(ctx,12,83,756,64,'brick');pitchedRoof27(ctx,0,69,780,17,night);
      building27(ctx,x,56,w,96,{gate:true,night,label:c.era==='y1919'?'北京高等师范学校':'北京师范大学'});
      if(c.setting==='street'){R(ctx,15,69,143,77,'#b79d72');pitchedRoof27(ctx,8,54,158,22);drawDoorway(ctx,49,94,47,54);R(ctx,27,80,119,16,'#756146');drawText(ctx,'书 · 茶',86,88,9,'#ecddb4')}
    }else if(c.setting==='field'){
      building27(ctx,217,68,355,74,{roof:true,label:'课堂 · 操场'});tileFill(ctx,'grass',0,149,780,78,0);
      for(let i=0;i<5;i++){ctx.strokeStyle=i===0?'#dfd5ad':'#d6c6a0';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(390,231,290+i*21,38+i*9,0,0,Math.PI*2);ctx.stroke()}
      R(ctx,110,138,4,50,'#6a674e');R(ctx,110,138,75,2,'#b5a884');
    }else if(c.setting==='wet-court'){
      building27(ctx,-13,56,283,92,{roof:true,gate:true,label:'临时课堂'});wallPanel27(ctx,286,83,476,65,'whitewash');pitchedRoof27(ctx,278,65,491,20);
      R(ctx,3,147,293,8,'#8d8064');R(ctx,10,155,284,7,'#aa9978');
      for(let i=0;i<7;i++)ellipse(ctx,320+(i*87)%390,171+(i*19)%89,19+i%3*8,3+i%2,'#788f8d88');
      for(let i=0;i<5;i++)R(ctx,300+i*39,153+i*17,29,8,'#b5ad91');
    }else if(c.setting==='courtyard'){
      building27(ctx,82,54,251,90,{gate:true,label:'北京师范大学'});building27(ctx,450,78,254,65,{roof:true});
      tileFill(ctx,'grass',334,145,111,65,2);R(ctx,342,149,94,5,'#c3b28d');
    }else if(c.setting==='transfer'){
      building27(ctx,151,67,214,77,{label:'辅仁 · 师大'});building27(ctx,424,54,210,90,{gate:true});
      for(let i=0;i<8;i++)R(ctx,313+i*21,160+i*10,27,3,'#cfbd8e66');
    }else if(c.setting==='book-route'){
      building27(ctx,66,66,212,78,{gate:true,label:'出发 · 书屋'});building27(ctx,507,46,232,98,{gate:true,label:'送达 · 课堂'});
      tileFill(ctx,'grass',290,147,190,65,2);for(let i=0;i<10;i++){const x=201+i*46,y=214+Math.sin(i*.6)*21;R(ctx,x,y,24,4,'#e4c99966')}
      R(ctx,336,149,120,5,'#d5c4a3');
    }else{
      // Three distinct garden arrangements: central ceremony, side court, and a grove.
      const side=c.setting==='quiet-garden';building27(ctx,side?382:147,76,side?274:486,65,{label:c.setting==='celebration'?'1902 — 2002':'学 为 人 师 · 行 为 世 范'});
      tileFill(ctx,'grass',0,146,128,69,0);tileFill(ctx,'grass',650,146,130,69,1);
      for(const x of [42,716]){drawProp(ctx,'tree',x,207,1.2);drawProp(ctx,'plant',x+28,230,.7)}
      if(c.setting==='motto-garden'){R(ctx,277,226,228,9,'#a3977e');R(ctx,286,218,210,8,'#c0b79b');R(ctx,303,214,176,4,'#ded3b2')}
      if(c.setting==='celebration'){for(let i=0;i<13;i++){const x=44+i*57,y=39+Math.sin(i*.55)*9;poly(ctx,[[x,y],[x+19,y+1],[x+9,y+18]],i%3===0?'#b5563f':i%3===1?'#d9ab52':'#789879')};line(ctx,30,39,751,41,'#74674d')}
      if(side){R(ctx,207,231,180,6,'#b8a98a');R(ctx,214,225,166,6,'#d3c6a5')}
    }
    R(ctx,0,274,780,6,'#6a6553');R(ctx,0,272,780,2,'#ccc49a55');
  }
  function thresholdBackdrop27(ctx,c){
    drawSky(ctx,2,'campus',139);drawPerspectiveFloor(ctx,'stone',143,{seam:'#7b796344'});
    building27(ctx,474,73,242,72,{label:'北京师范大学'});
    wallPanel27(ctx,0,0,344,150,'plaster');drawPerspectiveFloor(ctx,'wood',151,{seam:'#78552e55'});
    R(ctx,345,0,27,275,'#66492e');R(ctx,350,0,5,275,'#bf945b');R(ctx,362,0,5,275,'#443627');
    R(ctx,0,144,343,6,'#c5a06a');R(ctx,0,151,343,6,'#735738');
    poly(ctx,[[373,151],[780,145],[780,280],[386,280]],'#d5d0b029');
  }
  function background27(c){
    const key='27:'+c.id;if(backdropCache.has(key))return backdropCache.get(key);
    const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const g=canvas.getContext('2d');g.imageSmoothingEnabled=false;
    if(c.setting==='corridor')corridorBackdrop27(g,c);
    else if(c.setting==='threshold')thresholdBackdrop27(g,c);
    else if(['street','gate','field','wet-court','courtyard','transfer','book-route','motto-garden','celebration','quiet-garden'].includes(c.setting))outdoorBackdrop27(g,c);
    else indoorBackdrop27(g,c);
    backdropCache.set(key,canvas);return canvas;
  }
  function glow27(ctx,x,y,r,color,strength){
    const g=ctx.createRadialGradient(x,y,2,x,y,r);g.addColorStop(0,`rgba(${color},${strength})`);g.addColorStop(1,`rgba(${color},0)`);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  function weather27(ctx,c){
    if(c.detail.rain){
      ctx.save();ctx.beginPath();ctx.rect(511,20,182,101);ctx.clip();for(let i=0;i<28;i++){const x=509+(i*23+T*9)%186,y=8+(i*37+T*65)%129;line(ctx,x,y,x-4,y+13,'#c8e5e766')}ctx.restore();
    }
    if(c.detail.puddles){for(let i=0;i<7;i++){const x=320+(i*87)%390,y=171+(i*19)%89;ctx.strokeStyle='#c1d8d17a';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y,5+((T*4+i)%8),1+((T+i)%2),0,0,Math.PI*2);ctx.stroke()}}
    if(c.theme==='night'){
      const lamp=c.anchors.find(a=>a.prop==='lamp'||a.prop==='lantern')||{x:c.setting==='darkroom'?102:650,y:c.setting==='darkroom'?66:150};
      glow27(ctx,lamp.x,lamp.y,145,c.setting==='darkroom'?'231,99,83':'255,216,132',.15+.015*Math.sin(T*2));
    }
    if(c.detail.steam){for(let i=0;i<4;i++){const x=393+Math.sin(T*1.8+i)*6,y=181-((T*9+i*8)%29);R(ctx,x,y,2,5,'#f4e6c055')}}
    if(c.detail.wind){for(let i=0;i<5;i++){const x=410+((T*46+i*71)%277),y=83+(i*29)%122;line(ctx,x,y,x+20,y+Math.sin(T*2+i)*2,'#ebe4bf55')}R(ctx,489,169+Math.round(Math.sin(T*3)*2),12,2,'#f5e8bf')}
    if(c.setting==='field'||c.setting.includes('garden')||c.setting==='celebration'){
      for(let i=0;i<5;i++){const x=(T*12+i*163)%780,y=115+((T*7+i*29)%147);R(ctx,x,y,3,2,'#cca45b88');R(ctx,x+2,y-1,2,2,'#e3c77d66')}
    }
    if(c.setting==='darkroom')glow27(ctx,102,66,255,'211,77,65',.12);
  }
  function paint27(ctx,c,state){
    ctx.drawImage(background27(c),0,0);const world=[];const push=(y,fn)=>world.push({y,fn});
    const feedback=state.historyFeedback||{},step=Math.max(0,Math.min(3,Number(feedback.step)||0));
    for(const p of c.props)push(p.y,()=>drawProp(ctx,p.prop,p.x,p.y,p.scale));
    for(const d of c.desks)push(d.y,()=>deskActor(ctx,d.role,Math.sin(T*1.6+d.x)>.5?'write':'read',d.x,d.y,d.scale,d.x,d.scale*.8,'write'));
    for(const [i,a] of c.actors.entries()){
      const moving=a.range>0,x=a.x+(moving?Math.sin(T*.65+i)*a.range:0);
      const frame=a.action==='walk'?walkFrame(i):a.action==='sit'?idleFrame(i,true):a.action==='idle'?idleFrame(i):a.action;
      if(a.desk){const top=a.desk.y-propBounds.desk.sh*a.desk.scale,feet=top+2+14*a.scale;push(a.desk.y+.1,()=>{ctx.save();ctx.beginPath();ctx.rect(a.x-23*a.scale,0,46*a.scale,top+5);ctx.clip();drawChar(ctx,a.role,frame,a.x,feet,a.scale,{noShadow:true});ctx.restore()})}
      else push(a.y,()=>drawChar(ctx,a.role,frame,x,a.y,a.scale,{flip:moving&&Math.cos(T*.65+i)<0}));
    }
    for(const [i,a]of c.anchors.entries()){
      const done=step>i||feedback.completed;
      push(a.drawY,()=>{
        let y=a.drawY;
        if(a.prop==='cloth'||a.prop==='banner'||a.prop==='flag'||a.prop==='scroll')y+=Math.round(Math.sin(T*1.8+i)*1.2);
        if(a.projected){const w=(a.prop==='label'?59:75)*a.scale,h=17*a.scale;poly(ctx,[[a.x-w*.43,y-h],[a.x+w*.45,y-h+1],[a.x+w*.53,y],[a.x-w*.5,y]],'#ede1be');line(ctx,a.x-w*.35,y-h+4,a.x+w*.35,y-h+5,'#a69a7566');line(ctx,a.x-w*.35,y-h+8,a.x+w*.2,y-h+9,'#8e826361')}
        else drawProp(ctx,a.prop,a.x,y,a.scale);
        if(done&&['paper','books','label'].includes(a.prop)){
          R(ctx,a.x+4,a.y-3,8,8,'#a74c3680');drawText(ctx,'记',a.x+8,a.y+1,6,'#f5e5be');
        }
      });
    }
    world.sort((a,b)=>a.y-b.y);for(const item of world)item.fn();
    if(c.detail.emptyShelf){R(ctx,248,166,58,13,'#463521');R(ctx,249,180,56,2,'#ad8551');R(ctx,248,189,58,12,'#4c3b27');R(ctx,252,191,10,8,'#ab8c5a')}
    if(c.detail.motto){drawText(ctx,'学为人师',391,145,11,'#4e554d');drawText(ctx,'行为世范',391,160,11,'#4e554d')}
    if(c.detail.flowers||c.detail.motto){const x=c.detail.flowers?365:453,y=c.detail.flowers?231:239;for(let i=0;i<9;i++){R(ctx,x-11+(i*11)%25,y-12+(i*7)%16,4,4,i%3===0?'#f1c86a':i%3===1?'#dda582':'#f4dfaa')}}
    if(c.detail.ink&&step>0){drawText(ctx,step>1?'学为人师':'学',486,181,10,'#4b4238')}
    if(c.setting==='drying'&&step>1)drawText(ctx,'学为人师 · 行为世范',298,187,8,'#4b4238');
    if(c.detail.photos){const y=175;R(ctx,415,y,39,23,'#f0e1bf');R(ctx,419,y+3,31,17,'#73918b');R(ctx,427,y+6,15,11,'#cabca0');R(ctx,430,y+4,9,2,'#5f655b')}
    weather27(ctx,c);
    if(state.historyView){
      for(const [i,a]of c.anchors.entries()){
        const done=step>i||feedback.completed,chosen=feedback.selected===a.id;
        const mx=a.x+Math.min(25,a.r*.7),my=a.y-Math.min(25,a.r*.7);
        if(chosen)glow27(ctx,a.x,a.y,Math.max(30,a.r+8),'239,204,124',.25);
        R(ctx,mx-5,my-5,11,11,done?'#648368':'#9f4b38');R(ctx,mx-4,my-4,9,9,done?'#8fa16e':'#f1dab1');drawText(ctx,done?'✓':String(i+1),mx+.5,my+.5,7,done?'#f4edcc':'#7b4f36');
      }
      R(ctx,11,9,Math.min(285,c.title.length*13+19),22,'#fff0dacc');R(ctx,11,9,3,22,'#a04c39');drawText(ctx,c.title,22,20,12,'#61503b','left');
      if(feedback.completed){R(ctx,711,239,48,27,'#a64935');R(ctx,714,242,42,21,'#f0d6a4');drawText(ctx,'已记',735,252,12,'#9e4936')}
    }
    const night=c.theme==='night',shade=night?.08:.025;R(ctx,0,0,780,280,`rgba(19,32,38,${shade})`);
    vignette(ctx);window.__muduoActiveScene27={id:c.id,era:c.era,view:c.view,setting:c.setting,step,completed:!!feedback.completed};
  }


  function drawNew(ctx, id, state) {
    const sceneId = id === "intro" ? "y2026" : id;
    const variant = Math.max(1,Math.min(3,Number(state.historyView) || (state.mode === "free" ? state.eraVisits?.[sceneId] || 1 : 1)));
    const authored=state.historyView ? scene27[sceneId+":"+variant] : null;
    if(authored){paint27(ctx,authored,state);return;}
    window.__muduoActiveScene27=null;
    const stateKey = sceneId === "y2026" ? String(state.filledGroups || 0) : "";
    const backdrop = buildBackdrop(sceneId, state, stateKey, variant);
    ctx.save();
    if (variant >= 2) {
      const zoom = variant === 2 ? 1.02 : 1.04;
      ctx.translate(CX, H * .5);
      ctx.scale(zoom, zoom);
      ctx.translate(-CX + (variant === 2 ? -5 : 7), -H * .5 + 2);
    }
    ctx.drawImage(backdrop, 0, 0);
    const world = [];
    if (sceneId === "y1902") scene1902(ctx, world, variant);
    else if (sceneId === "y1919") scene1919(ctx, world, variant);
    else if (sceneId === "y1938") scene1938(ctx, state, world, variant);
    else if (sceneId === "y1949") scene1949(ctx, world, variant);
    else if (sceneId === "y1952") scene1952(ctx, world, variant);
    else if (sceneId === "y1971") scene1971(ctx, world, variant);
    else if (sceneId === "y1991") scene1991(ctx, world, variant);
    else if (sceneId === "y1996") scene1996(ctx, world, variant);
    else if (sceneId === "y2002") scene2002(ctx, world, variant);
    else scene2026(ctx, state, world, variant);
    // Native furniture zones enrich every room without painting over moving people.
    const dressing={
      y1902:[["bookshelf",27,207,.52],["plant",748,199,.45],["books",330,271,.25]],
      y1919:[["plant",38,208,.46],["bench",730,212,.48],["lantern",726,171,.40]],
      y1938:[["cabinet",35,226,.48],["stove",67,259,.45],["books",639,271,.24]],
      y1949:[["plant",41,206,.46],["bench",734,215,.48],["books",322,268,.24]],
      y1952:[["tree",34,225,.52],["plant",730,227,.46],["crate",546,276,.37]],
      y1971:[["bookshelf",58,232,.70],["teacher_desk",132,272,.52],["books",133,237,.25],["plant",737,249,.55]],
      y1991:[["bookshelf",53,229,.58],["plant",726,233,.54],["bench",670,276,.45]],
      y1996:[["bookshelf",31,226,.58],["books",98,239,.28],["plant",747,239,.54]],
      y2002:[["bench",39,226,.50],["plant",739,226,.50],["lantern",58,173,.40]],
      y2026:[["bookshelf",37,235,.68],["plant",718,209,.52],["books",680,248,.20]]
    };
    (dressing[sceneId]||[]).forEach(([name,x,y,scale])=>world.push({y,fn:()=>drawProp(ctx,name,x,y,scale)}));
    const ambientWalkers={y1902:["student_brown",292,277,.78],y1971:["editor_1971",321,269,.80],y1991:["student_blue",495,272,.80],y1996:["visitor",646,275,.82],y2026:["visitor",510,276,.86]};
    const walker=ambientWalkers[sceneId];if(walker){const [name,x,y,scale]=walker,phase=T*.65+variant;world.push({y,fn:()=>drawChar(ctx,name,walkFrame(1),x+Math.sin(phase)*22,y,scale,{flip:Math.cos(phase)<0})});}
    world.sort((a, b) => a.y - b.y);
    world.forEach(item => item.fn());
    foreground(ctx, sceneId);
    dust(ctx, 10, 30, 170, 23, id === "y2026" || id === "intro" ? "185,210,205" : "245,221,174");
    ctx.restore();
    sceneGrade(ctx, sceneId, variant);
    vignette(ctx);
  }

  window.drawScene = (id, state) => {
    T = state.t || 0;
    const cv = document.getElementById("scene");
    const ctx = cv.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (characterFailed) {
      R(ctx,0,0,W,H,"#1b2327");
      drawText(ctx,"素材暂时无法加载，请刷新页面重试",W/2,H/2,16,"#f3e8ce");
      return;
    }
    if (!ready) {
      R(ctx, 0, 0, W, H, "#1b2327");
      const pulse = .35 + .2 * Math.sin(T * 4);
      R(ctx, 360, 132, 60, 3, `rgba(232,180,90,${pulse})`);
      return;
    }
    if (cv.width !== W || cv.height !== H) {
      cv.width = W;
      cv.height = H;
    }
    drawNew(ctx, id, state);
  };

  window.__muduoArtVersion = "tileset-v3";
})();
