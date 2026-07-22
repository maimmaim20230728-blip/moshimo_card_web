'use strict';
/* もしもカード・そよぎ 本体(外骨格 v0.1)
   ・端末内だけに保存(localStorage)・完全オフライン・匿名・広告なし
   ・「もしもの時は、これを見せてください。」= かきこみ→みせる の2動作が核
   ・click禁止: 操作は全て Tap.bind(tap.js)。select だけはネイティブchange
   ・項目の中身と文言はヒロさん監修前提の仮置き(DESIGN.md参照) */
(function(){

const VER = '0.1.0';
const LS_CARD = 'moshimo.card.v1';
const LS_PREF = 'moshimo.pref.v1';

/* カード項目(保存キー)。表示名は i18n の edit.* と1:1 */
const FIELD_KEYS = ['name','cond','meds','allergy','trouble','request','contact'];

const $ = id => document.getElementById(id);

function loadJSON(key){
  try{ const s = localStorage.getItem(key); return s ? JSON.parse(s) : null; }
  catch(_){ return null; }
}
function saveJSON(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch(_){ return false; }
}

let pref = loadJSON(LS_PREF) || { lang:'ja', fs:0, sound:true };

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
  'lbl-name':'edit.name', 'lbl-cond':'edit.cond', 'lbl-meds':'edit.meds',
  'lbl-allergy':'edit.allergy', 'lbl-trouble':'edit.trouble',
  'lbl-request':'edit.request', 'lbl-contact':'edit.contact',
  'btn-save':'edit.save',
  'show-head':'show.head', 'show-close':'show.close',
  'lbl-fs':'set.fs', 'lbl-lang':'set.lang', 'lbl-sound':'set.sound',
  'about-credit':'set.credit',
  'tab-card':'tab.card', 'tab-edit':'tab.edit', 'tab-set':'tab.set'
};

function applyI18n(){
  for(const id in I18N_MAP){
    const el = $(id);
    if(el) el.textContent = T(I18N_MAP[id]);
  }
  document.documentElement.lang = pref.lang;
  $('btn-fs').textContent = T('set.fsSizes')[pref.fs];
  $('btn-sound').textContent = pref.sound ? T('set.on') : T('set.off');
  $('about-ver').textContent = 'v' + VER;
  renderHome();
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

/* ---- みせる(全画面・でか文字) ---- */
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

/* ---- トースト ---- */
let toastTimer = 0;
function toast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---- せってい ---- */
function savePref(){ saveJSON(LS_PREF, pref); }

/* ---- 初期化 ---- */
function init(){
  Sound.setEnabled(pref.sound);
  document.body.className = 'fs' + pref.fs;
  $('set-lang').value = pref.lang;

  Tap.bind($('tab-card'), () => showScreen('scr-home'));
  Tap.bind($('tab-edit'), () => showScreen('scr-edit'));
  Tap.bind($('tab-set'),  () => showScreen('scr-set'));

  Tap.bind($('btn-show'), () => { buildShow(); $('scr-show').classList.remove('hidden'); });
  Tap.bind($('show-close'), () => $('scr-show').classList.add('hidden'));
  Tap.bind($('btn-save'), saveCard);

  Tap.bind($('btn-fs'), () => {
    pref.fs = (pref.fs + 1) % 3;
    document.body.className = 'fs' + pref.fs;
    savePref(); applyI18n();
  });
  Tap.bind($('btn-sound'), () => {
    pref.sound = !pref.sound;
    Sound.setEnabled(pref.sound);
    savePref(); applyI18n();
  });
  $('set-lang').addEventListener('change', () => {
    pref.lang = $('set-lang').value;
    savePref(); applyI18n();
  });

  fillEditForm();
  applyI18n();
  showScreen('scr-home');

  if(typeof navigator !== 'undefined' && 'serviceWorker' in navigator &&
     /^https?:/.test(location.protocol)){
    try{ navigator.serviceWorker.register('sw.js'); }catch(_){}
  }
}

init();

})();
