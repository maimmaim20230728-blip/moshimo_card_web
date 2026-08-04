'use strict';
/* 音まわり: タップ音 + 生成BGM(2パターン) + 緊急よびだし音(チャイム/アラーム/ホイッスル・音量4段階)
   ・BGMはWeb Audioでその場で生成(音源ファイル無し = 軽量・完全オフライン)。おうち介護記録の方式を流用
   ・green(みどり・あたたかい音色) / blue(あお・澄んだ音色)。ブラウザの自動再生制限があるため最初のタップで自然に始まる
   ・よびだし音は「みせる」表示中だけループ。周囲に気づいてもらうための音(チャイム=ひかえめ/アラーム=はっきり)
   ・てんかん・光過敏への配慮は表示側(style.css)で。音側は音量4段階で環境に合わせる
   ・いちばん上の「爆音(災害用)」だけは倍音を足して遠くまで届かせる(下の boomOut を参照)
   ・tap.js が Sound.tap() を参照する(音はこの1本に集約) */
const Sound = (() => {
  let ctx = null;
  let enabled = true;          // タップ音
  let bgmEnabled = false;      // BGM(既定なし)
  let mode = 'green';
  let playing = false;
  let master = null, filter = null;
  let timer = 0, nextBar = 0, chordIdx = 0;

  const PATTERNS = {
    green: {      // みどり: あたたかく、ゆったり(ハ長調ペンタ系)
      bar: 4.6, vol: 0.042, lp: 750, type: 'triangle',
      chords: [[131, 196, 262], [110, 165, 220], [175, 220, 262], [98, 196, 294]],
      scale: [523, 587, 659, 784, 880]
    },
    blue: {       // あお: 澄んで、静かに(ト長調ペンタ系)
      bar: 5.2, vol: 0.038, lp: 620, type: 'sine',
      chords: [[98, 196, 247], [82.4, 165, 247], [131, 196, 330], [147, 196, 294]],
      scale: [587, 659, 784, 880, 988]
    }
  };

  function ensure(){
    if(!ctx){
      try{ ctx = new (window.AudioContext || window.webkitAudioContext)(); }catch(_){ ctx = null; }
    }
    if(ctx && ctx.state === 'suspended'){ try{ ctx.resume(); }catch(_){} }
  }

  function click(){
    try{
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 830;
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.09);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.1);
    }catch(_){}
  }

  /* ---- BGM(おうち介護記録の方式流用) ---- */
  function scheduleBar(t){
    const p = PATTERNS[mode];
    const chord = p.chords[chordIdx % p.chords.length];
    chordIdx++;
    // パッド(和音・ゆっくり膨らんでゆっくり消える)
    chord.forEach(f => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = p.type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(p.vol, t + p.bar * 0.35);
      g.gain.linearRampToValueAtTime(0.0001, t + p.bar * 1.35);
      o.connect(g); g.connect(filter);
      o.start(t); o.stop(t + p.bar * 1.4);
    });
    // まばらな単音(1〜2音・オルゴールのように)
    const n = 1 + (Math.random() < 0.5 ? 1 : 0);
    for(let i = 0; i < n; i++){
      const nt = t + p.bar * (0.15 + Math.random() * 0.7);
      const f = p.scale[Math.floor(Math.random() * p.scale.length)];
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, nt);
      g.gain.linearRampToValueAtTime(p.vol * 0.55, nt + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, nt + 2.2);
      o.connect(g); g.connect(filter);
      o.start(nt); o.stop(nt + 2.3);
    }
  }

  function startBgm(){
    if(alertOn) return;                     // 緊急よびだし音を最優先(BGMと絶対に重ねない)
    ensure();
    if(!ctx || playing) return;
    if(ctx.state === 'suspended') return;   // まだ操作前→次のタップで始まる
    master = ctx.createGain(); master.gain.value = 1;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = PATTERNS[mode].lp;
    filter.connect(master); master.connect(ctx.destination);
    playing = true; chordIdx = 0;
    nextBar = ctx.currentTime + 0.1;
    scheduleBar(nextBar); nextBar += PATTERNS[mode].bar;
    timer = setInterval(() => {
      if(!playing || !ctx) return;
      if(ctx.currentTime > nextBar - 1.2){
        scheduleBar(nextBar);
        nextBar += PATTERNS[mode].bar;
      }
    }, 400);
  }

  function stopBgm(){
    if(!playing) return;
    playing = false;
    clearInterval(timer);
    if(master && ctx){
      try{
        master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
        const m = master;
        setTimeout(() => { try{ m.disconnect(); }catch(_){} }, 1600);
      }catch(_){}
    }
    master = null; filter = null;
  }

  function maybeStartBgm(){ if(bgmEnabled && !alertOn && !playing) startBgm(); }

  /* ---- 緊急よびだし音(みせる表示中ループ) ---- */
  let alertTimer = 0, alertOn = false;
  const ALERT_GAIN = [0.4, 1, 2.2, 9];   // おとのおおきさ4段階の倍率(3=爆音・災害用)
  const BOOM_LEVEL = 3;

  /* ---- 爆音(災害用)の出口 ----
     🔴 倍率を上げるだけでは遠くへ届かない。スマホの小さなスピーカーは低い音がほとんど鳴らず、
     人の耳も 2〜4kHz が一番よく聞こえるため。そこで波形をやわらかくつぶして(ソフトクリップ)
     倍音を足し、音の力をその「よく聞こえる帯域」へ移す。
     ・tanhカーブは出口が必ず 1.0 未満に収まる = 耳ざわりな「バリッ」という破綻音にならない
     ・仕上げに保険のリミッター(音量は削らない設定)を通し、0.95 に落として出す
       (タップ音と重なっても割れないように少しだけ余裕を残す)
     ・ふつう〜おおきい(0〜2)はこの出口を通さない = 今までの音は一切変えない */
  let boomIn = null, boomCtx = null;
  function boomOut(){
    if(boomIn && boomCtx === ctx) return boomIn;
    const shaper = ctx.createWaveShaper();
    const n = 2048, curve = new Float32Array(n);
    for(let i = 0; i < n; i++){
      const x = (i / (n - 1)) * 2 - 1;
      curve[i] = Math.tanh(x * 3.2);
    }
    shaper.curve = curve;
    shaper.oversample = '4x';                     // 折り返しノイズを抑える(汚い高音にしない)
    const lim = ctx.createDynamicsCompressor();   // 念のための頭打ち
    lim.threshold.value = -1; lim.knee.value = 0; lim.ratio.value = 20;
    lim.attack.value = 0.001; lim.release.value = 0.05;
    const out = ctx.createGain(); out.gain.value = 0.95;
    shaper.connect(lim); lim.connect(out); out.connect(ctx.destination);
    boomIn = shaper; boomCtx = ctx;
    return boomIn;
  }

  function chimeBurst(volMult, out){
    try{
      const t = ctx.currentTime;
      [[660, 0], [524, 0.28]].forEach(([f, dt]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + dt);
        g.gain.linearRampToValueAtTime(0.11 * volMult, t + dt + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0008, t + dt + 0.55);
        o.connect(g); g.connect(out);
        o.start(t + dt); o.stop(t + dt + 0.6);
      });
    }catch(_){}
  }
  function alarmBurst(volMult, out){
    try{
      const t = ctx.currentTime;
      for(let i = 0; i < 3; i++){
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'square'; o.frequency.value = 880;
        const st = t + i * 0.16;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.linearRampToValueAtTime(0.09 * volMult, st + 0.015);
        g.gain.setValueAtTime(0.09 * volMult, st + 0.09);
        g.gain.exponentialRampToValueAtTime(0.0008, st + 0.12);
        o.connect(g); g.connect(out);
        o.start(st); o.stop(st + 0.13);
      }
    }catch(_){}
  }
  /* ホイッスル: 防災笛(呼子笛)の「ピーッ ピーッ」。高音+コロ玉のふるえ(約25Hzのビブラート) */
  function whistleBurst(volMult, out){
    try{
      const t = ctx.currentTime;
      [0, 0.5].forEach(dt => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'triangle'; o.frequency.value = 2500;
        const lfo = ctx.createOscillator(), lg = ctx.createGain();
        lfo.type = 'sine'; lfo.frequency.value = 25; lg.gain.value = 150;
        lfo.connect(lg); lg.connect(o.frequency);
        const st = t + dt;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.linearRampToValueAtTime(0.07 * volMult, st + 0.02);
        g.gain.setValueAtTime(0.07 * volMult, st + 0.3);
        g.gain.exponentialRampToValueAtTime(0.0008, st + 0.38);
        o.connect(g); g.connect(out);
        o.start(st); o.stop(st + 0.4);
        lfo.start(st); lfo.stop(st + 0.4);
      });
    }catch(_){}
  }

  const ALERT_KINDS = {
    chime:   { burst: chimeBurst,   span: 2400 },
    alarm:   { burst: alarmBurst,   span: 1300 },
    whistle: { burst: whistleBurst, span: 1800 }
  };

  function startAlert(kind, volLevel){
    stopAlert();
    const def = ALERT_KINDS[kind];
    if(!def) return;
    ensure();
    if(!ctx) return;
    stopBgm();                 // みせる表示中はBGMを止める
    alertOn = true;
    const lv = (volLevel >= 0 && volLevel < ALERT_GAIN.length) ? volLevel : 1;
    const volMult = ALERT_GAIN[lv];
    /* 爆音のときだけ「よく聞こえる帯域へ移す出口」を通す(0〜2は今までどおり素通し) */
    const out = (lv === BOOM_LEVEL) ? boomOut() : ctx.destination;
    def.burst(volMult, out);
    alertTimer = setInterval(() => { if(ctx && ctx.state !== 'suspended') def.burst(volMult, out); }, def.span);
  }
  function stopAlert(){
    if(alertTimer){ clearInterval(alertTimer); alertTimer = 0; }
    alertOn = false;
  }

  function tap(){
    ensure();
    if(enabled && ctx) click();
    maybeStartBgm();          // 最初のタップ = ブラウザが音を許可する瞬間
  }

  return {
    tap,
    setEnabled(v){ enabled = !!v; },
    get enabled(){ return enabled; },
    setBgmEnabled(v){ bgmEnabled = !!v; if(bgmEnabled) maybeStartBgm(); else stopBgm(); },
    get bgmEnabled(){ return bgmEnabled; },
    get bgmPlaying(){ return playing; },
    setBgmMode(m){
      if(!PATTERNS[m] || mode === m) return;
      mode = m;
      if(playing){ stopBgm(); maybeStartBgm(); }
    },
    startAlert, stopAlert,
    get alertOn(){ return alertOn; },
    pauseBgm(){ stopBgm(); },
    resumeBgm(){ maybeStartBgm(); }
  };
})();
