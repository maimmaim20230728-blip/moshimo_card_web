'use strict';
/* もしもカード・そよぎ 本体(SPEC_V1・v0.2)
   ・端末内だけに保存(localStorage)・完全オフライン・匿名・広告なし
   ・「もしもの時は、これを見せてください。」= かきこみ→みせる の2動作が核
   ・click禁止: 操作は全て Tap.bind(tap.js)。select/file input だけはネイティブイベント
   ・カードは1枚(2026-07-23ヒロさん監修)。項目10・バックアップ・みせる演出はSPEC_V1参照 */
(function(){

const VER = '0.2.0';
const LS_CARD = 'moshimo.card.v1';
const LS_PREF = 'moshimo.pref.v1';

/* カード項目(保存キー・言語非依存)。表示名は i18n の edit.* と1:1 */
const FIELD_KEYS = ['name','blood','cond','meds','allergy','doctor','trouble','request','contact','free'];

/* せっていの選択肢(並びは i18n の set.themes 等と1:1) */
const LANGS  = ['ja','en'];
const THEMES = ['green','aqua','white','dark'];
const BGMS   = ['off','green','blue'];
const FXS    = ['plain','invert','blink','invertBlink'];
const ALERTS = ['none','chime','alarm','whistle'];

const $ = id => document.getElementById(id);

function loadJSON(key){
  try{ const s = localStorage.getItem(key); return s ? JSON.parse(s) : null; }
  catch(_){ return null; }
}
function saveJSON(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch(_){ return false; }
}

/* prefは常にホワイトリスト経由(バックアップ読み込みでも同じ道を通す) */
function sanitizePref(p){
  p = p || {};
  return {
    lang:  LANGS.indexOf(p.lang)   >= 0 ? p.lang  : 'ja',
    fs:    [0,1,2].indexOf(p.fs)   >= 0 ? p.fs    : 0,
    sound: (p.sound === undefined) ? true : !!p.sound,
    theme: THEMES.indexOf(p.theme) >= 0 ? p.theme : 'green',
    bgm:   BGMS.indexOf(p.bgm)     >= 0 ? p.bgm   : 'off',
    fx:    FXS.indexOf(p.fx)       >= 0 ? p.fx    : 'plain',
    alert: ALERTS.indexOf(p.alert) >= 0 ? p.alert : 'none',
    vol:   [0,1,2].indexOf(p.vol)  >= 0 ? p.vol   : 1
  };
}
let pref = sanitizePref(loadJSON(LS_PREF));
function savePref(){ saveJSON(LS_PREF, pref); }
function next(list, cur){ return list[(list.indexOf(cur) + 1) % list.length]; }

/* ---- i18n ---- */
function walk(obj, key){
  return key.split('.').reduce((a, c) => (a && a[c] !== undefined) ? a[c] : undefined, obj);
}
function T(key){
  const tbl = window.MOSHIMO_I18N;
  const v = walk(tbl[pref.lang] || tbl.ja, key);
  return (v === undefined) ? walk(tbl.ja, key) : v;
}

/* 静的要素id → i18nキー(疑似DOMスモークで機械検証できるよう明示マップ方式) */
const I18N_MAP = {
  'hd-title':'app.name', 'home-hint':'app.tagline', 'btn-show':'home.show',
  'lbl-name':'edit.name', 'lbl-blood':'edit.blood', 'lbl-cond':'edit.cond',
  'lbl-meds':'edit.meds', 'lbl-allergy':'edit.allergy', 'lbl-doctor':'edit.doctor',
  'lbl-trouble':'edit.trouble', 'lbl-request':'edit.request',
  'lbl-contact':'edit.contact', 'lbl-free':'edit.free',
  'btn-save':'edit.save',
  'show-head':'show.head', 'show-close':'show.close',
  'show-rot':'show.rot', 'show-mute':'show.mute',
  'set-h-normal':'set.hNormal', 'set-h-show':'set.hShow', 'set-h-backup':'set.hBackup',
  'lbl-fs':'set.fs', 'lbl-lang':'set.lang', 'lbl-theme':'set.theme',
  'lbl-bgm':'set.bgm', 'lbl-sound':'set.sound',
  'lbl-fx':'set.fx', 'lbl-alert':'set.alert', 'lbl-vol':'set.vol',
  'bk-hint':'set.bkHint', 'bk-export':'set.bkExport', 'bk-import':'set.bkImport',
  'paper-note':'set.paperNote', 'about-credit':'set.credit',
  'tab-card':'tab.card', 'tab-edit':'tab.edit', 'tab-set':'tab.set'
};

function applyI18n(){
  for(const id in I18N_MAP){
    const el = $(id);
    if(el) el.textContent = T(I18N_MAP[id]);
  }
  document.documentElement.lang = pref.lang;
  $('btn-fs').textContent    = T('set.fsSizes')[pref.fs];
  $('btn-theme').textContent = T('set.themes')[THEMES.indexOf(pref.theme)];
  $('btn-bgm').textContent   = T('set.bgms')[BGMS.indexOf(pref.bgm)];
  $('btn-sound').textContent = pref.sound ? T('set.on') : T('set.off');
  $('btn-fx').textContent    = T('set.fxs')[FXS.indexOf(pref.fx)];
  $('btn-alert').textContent = T('set.alerts')[ALERTS.indexOf(pref.alert)];
  $('btn-vol').textContent   = T('set.vols')[pref.vol];
  $('about-ver').textContent = 'v' + VER;
  renderHome();
}

/* ---- 見た目/音の反映 ---- */
function applyTheme(){ document.body.setAttribute('data-theme', pref.theme); }
function applySoundPrefs(){
  Sound.setEnabled(pref.sound);
  if(pref.bgm !== 'off') Sound.setBgmMode(pref.bgm);
  Sound.setBgmEnabled(pref.bgm !== 'off');
}
function applyAll(){
  document.body.className = 'fs' + pref.fs;
  applyTheme();
  applySoundPrefs();
  $('set-lang').value = pref.lang;
  fillEditForm();
  applyI18n();
}

/* ---- 画面切替 ---- */
const SCREENS = { 'scr-home':'tab-card', 'scr-edit':'tab-edit', 'scr-set':'tab-set' };
function showScreen(id){
  for(const s in SCREENS){
    $(s).classList.toggle('hidden', s !== id);
    $(SCREENS[s]).classList.toggle('active', s === id);
  }
  if(id === 'scr-edit') fillEditForm();
}

/* ---- ホーム ---- */
function renderHome(){
  const card = loadJSON(LS_CARD);
  const n = card ? FIELD_KEYS.filter(k => card.fields[k]).length : 0;
  $('home-preview').textContent = n
    ? T('home.filled').replace('{n}', String(n))
    : T('home.empty');
}

/* ---- かきこみ ---- */
function fillEditForm(){
  const card = loadJSON(LS_CARD);
  FIELD_KEYS.forEach(k => {
    $('fld-' + k).value = (card && card.fields[k]) || '';
  });
}
function saveCard(){
  const fields = {};
  FIELD_KEYS.forEach(k => { fields[k] = ($('fld-' + k).value || '').trim(); });
  if(saveJSON(LS_CARD, { v:1, fields, updated: Date.now() })){
    toast(T('edit.saved'));
  } else {
    toast(T('edit.saveFail'));
  }
  renderHome();
}

/* ---- みせる(全画面・でか文字・演出/音/wakeLock) ---- */
let showing = false;
let wakeLock = null;

function acquireWake(){
  try{
    if(navigator.wakeLock && navigator.wakeLock.request){
      navigator.wakeLock.request('screen').then(l => {
        wakeLock = l;
        if(!showing){ try{ l.release(); }catch(_){} wakeLock = null; }
      }).catch(() => { wakeLock = null; });
    }
  }catch(_){ wakeLock = null; }
}
function releaseWake(){
  try{ if(wakeLock) wakeLock.release(); }catch(_){}
  wakeLock = null;
}

function buildShow(){
  const card = loadJSON(LS_CARD);
  const list = $('show-list');
  list.textContent = '';
  const hasAny = card && FIELD_KEYS.some(k => card.fields[k]);
  if(!hasAny){
    const d = document.createElement('div');
    d.className = 'show-empty';
    d.textContent = T('show.empty');
    list.appendChild(d);
    return;
  }
  FIELD_KEYS.forEach(k => {
    const v = card.fields[k];
    if(!v) return;
    const block = document.createElement('div');
    block.className = 'show-block';
    const label = document.createElement('div');
    label.className = 'show-label';
    label.textContent = T('edit.' + k);
    const value = document.createElement('div');
    value.className = 'show-value';
    value.textContent = v;
    block.appendChild(label);
    block.appendChild(value);
    list.appendChild(block);
  });
}

function openShow(){
  buildShow();
  const s = $('scr-show');
  s.classList.remove('hidden');
  s.classList.remove('landscape');
  s.classList.toggle('fx-invert', pref.fx === 'invert' || pref.fx === 'invertBlink');
  s.classList.toggle('fx-blink',  pref.fx === 'blink'  || pref.fx === 'invertBlink');
  showing = true;
  Sound.pauseBgm();                     // 緊急表示中はBGMを止める
  if(pref.alert !== 'none'){
    Sound.startAlert(pref.alert, pref.vol);
    $('show-mute').classList.remove('hidden');
  } else {
    $('show-mute').classList.add('hidden');
  }
  acquireWake();                        // スリープ防止
}
function closeShow(){
  showing = false;
  $('scr-show').classList.add('hidden');
  Sound.stopAlert();
  releaseWake();
  Sound.resumeBgm();
}

/* ---- 機種変更(バックアップ)・おうち介護記録の方式流用 ---- */
function exportBackup(){
  const data = { app:'moshimo_card', ver:1, card: loadJSON(LS_CARD), prefs: pref };
  const blob = new Blob([JSON.stringify(data)], { type:'application/json' });
  const a = document.createElement('a');
  const d = new Date();
  a.href = URL.createObjectURL(blob);
  a.download = 'moshimo-backup-' + d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  toast(T('set.exported'));
}
function importBackup(e){
  const f = e.target.files && e.target.files[0];
  if(!f) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      const d = JSON.parse(r.result);
      if(d.app !== 'moshimo_card') throw new Error('different app');
      if(d.card && d.card.fields) saveJSON(LS_CARD, d.card);
      pref = sanitizePref(d.prefs);
      savePref();
      applyAll();
      toast(T('set.imported'));
    }catch(err){ toast(T('set.importFail')); }
  };
  r.readAsText(f);
  e.target.value = '';
}

/* ---- トースト ---- */
let toastTimer = 0;
function toast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---- 初期化 ---- */
function init(){
  Tap.bind($('tab-card'), () => showScreen('scr-home'));
  Tap.bind($('tab-edit'), () => showScreen('scr-edit'));
  Tap.bind($('tab-set'),  () => showScreen('scr-set'));

  Tap.bind($('btn-show'), openShow);
  Tap.bind($('show-close'), closeShow);
  Tap.bind($('show-rot'), () => $('scr-show').classList.toggle('landscape'));
  Tap.bind($('show-mute'), () => { Sound.stopAlert(); $('show-mute').classList.add('hidden'); });
  Tap.bind($('btn-save'), saveCard);

  Tap.bind($('btn-fs'), () => {
    pref.fs = (pref.fs + 1) % 3;
    document.body.className = 'fs' + pref.fs;
    savePref(); applyI18n();
  });
  Tap.bind($('btn-theme'), () => {
    pref.theme = next(THEMES, pref.theme);
    applyTheme(); savePref(); applyI18n();
  });
  Tap.bind($('btn-bgm'), () => {
    pref.bgm = next(BGMS, pref.bgm);
    applySoundPrefs(); savePref(); applyI18n();
  });
  Tap.bind($('btn-sound'), () => {
    pref.sound = !pref.sound;
    Sound.setEnabled(pref.sound);
    savePref(); applyI18n();
  });
  Tap.bind($('btn-fx'), () => {
    pref.fx = next(FXS, pref.fx);
    savePref(); applyI18n();
  });
  Tap.bind($('btn-alert'), () => {
    pref.alert = next(ALERTS, pref.alert);
    savePref(); applyI18n();
  });
  Tap.bind($('btn-vol'), () => {
    pref.vol = (pref.vol + 1) % 3;
    savePref(); applyI18n();
  });

  $('set-lang').addEventListener('change', () => {
    pref.lang = $('set-lang').value;
    savePref(); applyI18n();
  });

  Tap.bind($('bk-export'), exportBackup);
  Tap.bind($('bk-import'), () => $('bk-file').click());
  $('bk-file').addEventListener('change', importBackup);

  /* タブ切替等でwakeLockが切れたら、みせる表示中に戻ったとき取り直す */
  if(document.addEventListener){
    document.addEventListener('visibilitychange', () => {
      if(showing && !wakeLock && document.visibilityState === 'visible') acquireWake();
    });
  }

  applyAll();
  showScreen('scr-home');

  if(typeof navigator !== 'undefined' && 'serviceWorker' in navigator &&
     /^https?:/.test(location.protocol)){
    try{ navigator.serviceWorker.register('sw.js'); }catch(_){}
  }
}

init();

})();
