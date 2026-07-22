'use strict';
/* 音まわり: タップの手応え音だけ(外骨格 v0.1)
   ・緊急時に見せる道具なので BGM は入れない方針(おうち介護記録との違い)
   ・Web Audio で生成(音源ファイル無し = 軽量・完全オフライン)
   ・tap.js が Sound.tap() を参照する(音はこの1本に集約) */
const Sound = (() => {
  let ctx = null;
  let enabled = true;

  function ensure(){
    if(!ctx){
      try{ ctx = new (window.AudioContext || window.webkitAudioContext)(); }catch(_){ ctx = null; }
    }
    if(ctx && ctx.state === 'suspended'){ try{ ctx.resume(); }catch(_){} }
  }

  function tap(){
    if(!enabled) return;
    ensure();
    if(!ctx) return;
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

  function setEnabled(v){ enabled = !!v; }
  function isEnabled(){ return enabled; }

  return { tap, setEnabled, isEnabled };
})();
