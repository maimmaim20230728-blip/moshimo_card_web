'use strict';
/* もしもカード・そよぎ 本体(SPEC_V1・v0.2)
   ・端末内だけに保存(localStorage)・完全オフライン・匿名・広告なし
   ・「もしもの時は、これを見せてください。」= かきこみ→みせる の2動作が核
   ・click禁止: 操作は全て Tap.bind(tap.js)。select/file input だけはネイティブイベント
   ・カードは1枚(2026-07-23ヒロさん監修)。項目10・バックアップ・みせる演出はSPEC_V1参照 */
(function(){

const VER = '1.11';
const LS_CARD = 'moshimo.card.v1';
const LS_PREF = 'moshimo.pref.v1';

/* カード項目(保存キー・言語非依存)。表示名は i18n の edit.* と1:1 */
const FIELD_KEYS = ['name','blood','cond','meds','allergy','doctor','trouble','request','contact','free'];

/* せっていの選択肢(並びは i18n の set.themes 等と1:1) */
const LANGS  = ['ja','en','de','fr','es','it','pt','nl','sv','ko','zh','ar'];
const RTL_LANGS = ['ar'];
const THEMES = ['green','aqua','white','dark'];
const BGMS   = ['off','green','blue'];
const FXS    = ['plain','invert','blink','invertBlink'];
const ALERTS = ['none','chime','alarm','whistle'];
const VOL_LEVELS = 4;    // ちいさい / ふつう / おおきい / 爆音(災害用)
const BOOM_VOL = 3;      // 爆音(災害用)

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
    bgm:   BGMS.indexOf(p.bgm)     >= 0 ? p.bgm   : 'green',
    fx:    FXS.indexOf(p.fx)       >= 0 ? p.fx    : 'plain',
    alert: ALERTS.indexOf(p.alert) >= 0 ? p.alert : 'none',
    vol:   (Number.isInteger(p.vol) && p.vol >= 0 && p.vol < VOL_LEVELS) ? p.vol : 1
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
  'edit-hint':'edit.allOptional',
  'lbl-name':'edit.name', 'lbl-blood':'edit.blood', 'lbl-cond':'edit.cond',
  'lbl-meds':'edit.meds', 'lbl-allergy':'edit.allergy', 'lbl-doctor':'edit.doctor',
  'lbl-trouble':'edit.trouble', 'lbl-request':'edit.request',
  'lbl-contact':'edit.contact', 'lbl-free':'edit.free',
  'btn-save':'edit.save',
  'show-head':'show.head', 'show-close':'show.close',
  'show-rot':'show.rot',
  'set-h-normal':'set.hNormal', 'set-h-show':'set.hShow', 'set-h-backup':'set.hBackup',
  'lbl-fs':'set.fs', 'lbl-lang':'set.lang', 'lbl-theme':'set.theme',
  'lbl-bgm':'set.bgm', 'lbl-sound':'set.sound',
  'lbl-fx':'set.fx', 'lbl-alert':'set.alert', 'lbl-vol':'set.vol', 'boom-hint':'set.boomHint',
  'bk-hint':'set.bkHint', 'bk-export':'set.bkExport', 'bk-import':'set.bkImport',
  'paper-note':'set.paperNote', 'link-privacy':'set.privacy', 'about-credit':'set.credit',
  'tab-card':'tab.card', 'tab-edit':'tab.edit', 'tab-set':'tab.set',
  'lbl-guide':'guide.title', 'btn-guide':'guide.again'   // はじめての つかいかた を もう一度(せっていの行・2026-09-30)
};

function applyI18n(){
  for(const id in I18N_MAP){
    const el = $(id);
    if(el) el.textContent = T(I18N_MAP[id]);
  }
  document.documentElement.lang = pref.lang;
  document.documentElement.dir = (RTL_LANGS.indexOf(pref.lang) >= 0) ? 'rtl' : 'ltr';
  $('btn-fs').textContent    = T('set.fsSizes')[pref.fs];
  $('btn-theme').textContent = T('set.themes')[THEMES.indexOf(pref.theme)];
  $('btn-bgm').textContent   = T('set.bgms')[BGMS.indexOf(pref.bgm)];
  $('btn-sound').textContent = pref.sound ? T('set.on') : T('set.off');
  $('btn-fx').textContent    = T('set.fxs')[FXS.indexOf(pref.fx)];
  $('btn-alert').textContent = T('set.alerts')[ALERTS.indexOf(pref.alert)];
  $('btn-vol').textContent   = T('set.vols')[pref.vol];
  /* 爆音を選んだときだけ、耳の近くで鳴らさない・本体音量も上げる、の注意を出す */
  if($('boom-hint')) $('boom-hint').classList.toggle('hidden', pref.vol !== BOOM_VOL);
  $('about-ver').textContent = 'v' + VER;
  updateSoundBtn();
  renderHome();
  if(guideOv) guideOv._draw();   // はじめての つかいかた も訳し直す(いまのページのまま)
  applyBarSpace();   // 文字サイズ・言語でタブの高さが変わるので測り直す
}

/* ---- 下タブの実寸を余白に反映(セーフエリア対応) ----
   Android15+(targetSdk36)はエッジtoエッジ強制で、WebViewがナビゲーションバーの下まで描かれる。
   タブの高さは文字サイズ・言語・端末の下部インセットで変わるため、固定値ではなく実測してCSSに渡す */
function applyBarSpace(){
  const st = document.documentElement && document.documentElement.style;
  if(!st || !st.setProperty) return;
  const bar = $('tabbar');
  if(!bar || !bar.getBoundingClientRect) return;
  const h = Math.ceil(bar.getBoundingClientRect().height);
  if(h > 0) st.setProperty('--tabbar-h', h + 'px');
}
/* タブバーの実寸が変わった瞬間に測り直す。フォントの読み込み・画面回転・文字サイズ変更の
   どれで変わっても取りこぼさないよう、イベント頼みではなく箱そのものを見張る
   (ResizeObserver 非対応環境は init の load/resize/orientationchange で代替) */
function watchBarSpace(){
  const bar = $('tabbar');
  if(!bar || typeof ResizeObserver === 'undefined') return false;
  try{ new ResizeObserver(applyBarSpace).observe(bar); return true; }
  catch(_){ return false; }
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
  if(id === 'scr-home') renderHome();
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
function collectCard(){
  const fields = {};
  FIELD_KEYS.forEach(k => { fields[k] = ($('fld-' + k).value || '').trim(); });
  return fields;
}
function persistCard(){
  return saveJSON(LS_CARD, { v:1, fields: collectCard(), updated: Date.now() });
}
/* 自動保存: 入力のたびに静かに保存(押し忘れで消えるのを防ぐ)。トーストは出さない */
function autoSaveCard(){ persistCard(); }
/* 「ほぞんする」ボタン=明示保存。自動保存済みでも「保存できた」実感のため残す */
function saveCard(){
  if(persistCard()) toast(T('edit.saved'));
  else toast(T('edit.saveFail'));
  renderHome();
}

/* ---- みせる(全画面・でか文字・演出/音/wakeLock) ---- */
let showing = false;
let soundPlaying = false;
let wakeLock = null;
/* おとなし設定でも緊急時にその場で鳴らせるようにする既定音(せってい未設定時) */
const DEFAULT_ALERT = 'alarm';

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

/* 緊急連絡先の文字列から電話番号を1つ取り出す(見つからなければnull) */
function extractPhone(text){
  const m = String(text).match(/\+?\d[\d\-().\s]{5,}\d/);
  return m ? m[0].replace(/[^\d+]/g, '') : null;
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
    // 緊急連絡先に電話番号があれば、そのまま発信できるボタンを添える
    if(k === 'contact'){
      const tel = extractPhone(v);
      if(tel){
        const a = document.createElement('a');
        a.className = 'call-btn';
        a.href = 'tel:' + tel;
        a.textContent = T('show.call');
        block.appendChild(a);
      }
    }
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
  if(pref.alert !== 'none'){
    Sound.pauseBgm();                   // 緊急音優先: よびだし音の間は穏やかなBGMを止める(重ならない)
    Sound.startAlert(pref.alert, pref.vol);   // せっていで音を選んでいれば自動で鳴らす
    soundPlaying = true;
  } else {
    soundPlaying = false;               // よびだし音=ならさない → 穏やかなBGMは継続でよい
  }
  updateSoundBtn();
  acquireWake();                        // スリープ防止
}
function closeShow(){
  showing = false;
  soundPlaying = false;
  $('scr-show').classList.add('hidden');
  Sound.stopAlert();
  releaseWake();
  Sound.resumeBgm();
}
/* みせる画面の音トグル: 事前設定が「ならさない」でも、その場で鳴らし始められる */
function toggleShowSound(){
  if(soundPlaying){
    Sound.stopAlert();
    soundPlaying = false;
    Sound.resumeBgm();                  // 緊急音を止めたら穏やかなBGMを戻す
  } else {
    const kind = (pref.alert !== 'none') ? pref.alert : DEFAULT_ALERT;
    Sound.pauseBgm();                   // 緊急音優先: 鳴らす前にBGMを止める(重ならない)
    Sound.startAlert(kind, pref.vol);
    soundPlaying = true;
  }
  updateSoundBtn();
}
function updateSoundBtn(){
  const btn = $('show-sound');
  if(btn) btn.textContent = soundPlaying ? T('show.stop') : T('show.play');
}

/* ---- Play版(Capacitor)だけで使う部品(2026-09-30・キットの templates/app.js と同じ考え方) ----
   🔴 プラグインはネイティブが入れる Capacitor.Plugins.X を使う(registerPlugin は @capacitor/core の関数で WebView には無い)。
   Web版(ブラウザ)では isNativeApp() が false なので、どれも動かない */
function isNativeApp(){
  try{ const c = window.Capacitor; return !!(c && typeof c.isNativePlatform === 'function' && c.isNativePlatform()); }catch(_){ return false; }
}
function nativePlugin(name, fn){
  try{
    const c = window.Capacitor;
    if(typeof c.isPluginAvailable === 'function' && !c.isPluginAvailable(name)) return null;
    const p = c.Plugins && c.Plugins[name];
    return (p && typeof p[fn] === 'function') ? p : null;
  }catch(_){ return null; }
}

/* Play版のファイル保存: Capacitor 8 の WebView には DownloadListener が無く、<a download> では何も保存されない
   (なのに「かきだしました」と出ていた)。端末の一時フォルダ(CACHE)に書いてから Android の共有の画面を出し、保存先は利用者が選ぶ。
   done('ok')=送り先を選べた / done('quiet')=共有の画面を閉じた(何も出さない) / done('fail')=書けない・共有できない・プラグインが無い */
function shareQuiet(err){
  const m = String((err && (err.message || err.errorMessage)) || err || '');
  return !!err && (err.name === 'AbortError' || /cancel|in progress/i.test(m));
}
function nativeSaveFile(name, data, label, done){
  const fsp = nativePlugin('Filesystem', 'writeFile'), shp = nativePlugin('Share', 'share');
  if(!fsp || !shp){ done('fail'); return; }
  let w;
  try{ w = fsp.writeFile({ path:name, data:data, directory:'CACHE', encoding:'utf8' }); }catch(_){ done('fail'); return; }
  if(!w || typeof w.then !== 'function'){ done('fail'); return; }
  w.then(r => {
    if(!r || !r.uri){ done('fail'); return; }
    let s;
    try{ s = shp.share({ title:name, files:[r.uri], dialogTitle:label }); }catch(err){ done(shareQuiet(err) ? 'quiet' : 'fail'); return; }
    if(s && typeof s.then === 'function') s.then(() => done('ok'), err => done(shareQuiet(err) ? 'quiet' : 'fail'));
    else done('ok');
  }, () => done('fail'));
}

/* ---- Android の戻るボタン(Play版だけ・2026-09-30) ----
   @capacitor/app が無いと、戻るでアプリごと後ろに下がっていた(Android 11 以前は閉じる)。
   押したときの順: ①みせる(全画面)が出ていれば「とじる」と同じ(音も止まる)
                  ②かきこみ・せってい → カード(下のタブ「カード」と同じ)
                  ③カード → アプリを後ろに下げる(minimizeApp。中身はそのまま)
   かきこみは入れたらすぐ保存される(自動保存)ので、離れる前の確かめは出さない。けす・送る窓はこのアプリに無い。
   Web版(ブラウザ)は何も変えない(戻るはブラウザのまま) */
function minimizeApp(){
  const ap = nativePlugin('App', 'minimizeApp');
  try{ if(ap){ const p = ap.minimizeApp(); if(p && p.catch) p.catch(() => {}); } }catch(_){}
}
function currentScreen(){
  for(const s in SCREENS){ if($(s) && !$(s).classList.contains('hidden')) return s; }
  return 'scr-home';
}
function onBack(){
  if(showing){ closeShow(); return; }
  if(guideOv){ guideOv._back(); return; }   // はじめての つかいかた(下の節): 2ページ目から=まえ / 1ページ目=初回は後ろに下げる・せっていから開いたときは閉じる
  if(currentScreen() !== 'scr-home'){ showScreen('scr-home'); return; }
  minimizeApp();
}
function watchBack(){
  if(!isNativeApp()) return;
  const ap = nativePlugin('App', 'addListener');
  if(!ap) return;
  try{ ap.addListener('backButton', () => onBack()); }catch(_){}
}

/* ---- はじめての つかいかた(初回の案内・2026-09-30) ----
   ヒロさん「ひとつずつ・そよぎ みたいなタイプのアプリは、必ず最初に使い方の丁寧な説明を出してほしい。10代の情報室のように」。
   キットの templates/app.js openGuide と同じ動きを、このアプリの作りに合わせて入れた:
   ・初回起動で必ず出す(最後まで読むまで、開くたびに出る)。全画面(下のタブ・ヘッダーより上)。文言は i18n の guide.*
   ・1ページずつ「つぎ」「まえ」。閉じるのは最後のページの「はじめる」だけ(× は置かない)
   ・戻るボタン(Play版・onBack): 2ページ目から=まえのページ / 1ページ目=初回なら後ろに下げる(閉じない)、せっていから開いたときは閉じる
   ・読み終えたら moshimo.guide.v1 = true。せっていの「つかいかた」の「もういちど 見る」で開き直せる(隠れた入口は無い)
   ・1ページ目に ことば(ヘッダーの 🌐 と同じ12言語)。案内がヘッダーを覆うため。選ぶと案内も その言葉に変わる
   ・🆘 カードに書いてあれば、案内のどのページにも「🆘 これを みせる」を出す(みせるは案内の上に出る。とじると案内の同じページに戻る)。
     前からの利用者には更新のあと1回だけ案内が出るので、もしもの ときに 案内がカードを見せる じゃまを しないように
   ・BGM は今までどおり(最初のタップで始まる。起動しただけでは鳴らない) */
const LS_GUIDE = 'moshimo.guide.v1';
const RTL_CHARS = new RegExp('[' + String.fromCharCode(0x590) + '-' + String.fromCharCode(0x8FF) + ']');
let guideOv = null;
function guideDone(){ return loadJSON(LS_GUIDE) === true; }
function cardFilled(){
  const c = loadJSON(LS_CARD);
  return !!(c && c.fields && FIELD_KEYS.some(k => c.fields[k]));
}
function gEl(tag, cls, txt){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(txt != null) e.textContent = txt;
  return e;
}
function openGuide(first){
  if(guideOv) return;                          // すでに開いていれば開かない(二重に出さない)
  let bodies = T('guide.bodies');
  if(!Array.isArray(bodies) || !bodies.length) return;
  let i = 0;
  const ov = gEl('div', 'guide-ov');
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  const box = gEl('div', 'guide-box');
  const top = gEl('div', 'guide-top');
  const ttl = gEl('p', 'guide-title');
  const step = gEl('p', 'guide-step');
  top.appendChild(ttl); top.appendChild(step);
  box.appendChild(top);
  let sos = null;
  if(cardFilled()){
    sos = gEl('button', 'guide-sos');
    sos.type = 'button';
    Tap.bind(sos, openShow);
    box.appendChild(sos);
  }
  let langRow = null, langLbl = null, langSel = null;
  const src = $('set-lang');
  if(src && src.options && src.options.length){
    langRow = gEl('div', 'guide-lang');
    langLbl = gEl('span', 'guide-lang-lbl');
    langSel = document.createElement('select');
    langSel.setAttribute('aria-label', 'Language 言語');
    for(let o = 0; o < src.options.length; o++){
      const op = document.createElement('option');
      op.value = src.options[o].value; op.textContent = src.options[o].textContent;
      langSel.appendChild(op);
    }
    langSel.addEventListener('change', () => {
      pref.lang = langSel.value; savePref();
      $('set-lang').value = pref.lang;
      applyI18n();                               // 案内も draw() で訳し直す
    });
    langRow.appendChild(langLbl); langRow.appendChild(langSel);
    box.appendChild(langRow);
  }
  const h = gEl('h2', 'guide-h');
  const p = gEl('p', 'guide-p');
  const dots = gEl('div', 'guide-dots');
  dots.setAttribute('aria-hidden', 'true');
  box.appendChild(h); box.appendChild(p); box.appendChild(dots);
  const row = gEl('div', 'guide-row');
  const prevB = gEl('button', 'guide-btn guide-prev');
  const nextB = gEl('button', 'guide-btn guide-next');
  prevB.type = 'button'; nextB.type = 'button';
  row.appendChild(prevB); row.appendChild(nextB);
  ov.appendChild(box); ov.appendChild(row);
  function draw(){
    const heads = T('guide.heads');
    bodies = T('guide.bodies');                  // ことばを変えたときも、いまのページのまま訳し直す
    const n = bodies.length;
    if(i > n - 1) i = n - 1;
    ov.setAttribute('aria-label', T('guide.title'));
    ttl.textContent = T('guide.title');
    step.textContent = String(T('guide.step')).replace('{n}', i + 1).replace('{m}', n);
    step.setAttribute('dir', RTL_CHARS.test(step.textContent) ? 'rtl' : 'ltr');   // 「1 / 6」は ar でも左から(「6 / 1」にしない)
    if(sos) sos.textContent = T('home.show');
    if(langRow){
      langRow.style.display = (i === 0) ? '' : 'none';
      langLbl.textContent = T('set.lang');
      langSel.value = pref.lang;
    }
    h.textContent = (Array.isArray(heads) && heads[i]) ? heads[i] : '';
    p.textContent = bodies[i];
    dots.textContent = '';
    for(let k = 0; k < n; k++) dots.appendChild(gEl('span', 'guide-dot' + (k === i ? ' on' : '')));
    prevB.textContent = T('guide.prev');
    prevB.style.visibility = (i === 0) ? 'hidden' : 'visible';   // 「つぎ」の位置を変えない
    nextB.textContent = (i === n - 1) ? T('guide.start') : T('guide.next');
    ov.scrollTop = 0;
  }
  function close(){
    if(ov.parentNode) ov.parentNode.removeChild(ov);
    guideOv = null;
    saveJSON(LS_GUIDE, true);
  }
  ov._draw = draw;
  ov._back = () => {
    if(i > 0){ i--; draw(); return; }
    if(first) minimizeApp(); else close();       // 初回は「はじめる」でしか閉じない(10代の情報室と同じ)
  };
  Tap.bind(prevB, () => { if(i > 0){ i--; draw(); } });
  Tap.bind(nextB, () => { if(i < bodies.length - 1){ i++; draw(); } else close(); });
  draw();
  guideOv = ov;
  document.body.appendChild(ov);
  try{ nextB.focus(); }catch(_){}
}

/* ---- 機種変更(バックアップ)・おうち介護記録の方式流用 ---- */
function exportBackup(){
  const data = { app:'moshimo_card', ver:1, card: loadJSON(LS_CARD), prefs: pref };
  const d = new Date();
  const fname = 'moshimo-backup-' + d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '.json';
  /* Play版(2026-09-30): 一時フォルダに書いて共有の画面へ。選べたら「かきだしました」・閉じたら何も出さない・書けなければ「ほぞんできませんでした」 */
  if(isNativeApp()){
    nativeSaveFile(fname, JSON.stringify(data), T('set.bkExport'), r => {
      if(r === 'ok') toast(T('set.exported'));
      else if(r === 'fail') toast(T('edit.saveFail'));
    });
    return;
  }
  const blob = new Blob([JSON.stringify(data)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fname;
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
  Tap.bind($('show-sound'), toggleShowSound);
  Tap.bind($('btn-save'), saveCard);

  /* 自動保存: 各こうもくは入力した瞬間に保存される(「ほぞんする」の押し忘れで消えない) */
  FIELD_KEYS.forEach(k => {
    $('fld-' + k).addEventListener('input', autoSaveCard);
  });

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
    pref.vol = (pref.vol + 1) % VOL_LEVELS;   // ちいさい→ふつう→おおきい→爆音(災害用)
    savePref(); applyI18n();
  });

  $('set-lang').addEventListener('change', () => {
    pref.lang = $('set-lang').value;
    savePref(); applyI18n();
  });

  Tap.bind($('bk-export'), exportBackup);
  Tap.bind($('bk-import'), () => $('bk-file').click());
  $('bk-file').addEventListener('change', importBackup);
  if($('btn-guide')) Tap.bind($('btn-guide'), () => openGuide(false));   // はじめての つかいかた を もう一度

  /* タブ切替等でwakeLockが切れたら、みせる表示中に戻ったとき取り直す */
  if(document.addEventListener){
    document.addEventListener('visibilitychange', () => {
      if(showing && !wakeLock && document.visibilityState === 'visible') acquireWake();
    });
  }

  applyAll();
  showScreen('scr-home');
  if(!guideDone()) openGuide(true);     // はじめての つかいかた(読み終えるまで毎回・2026-09-30)

  watchBack();                          // Android の戻るボタン(Play版だけ)
  applyBarSpace();
  watchBarSpace();
  /* 保険: ResizeObserver 非対応や、フォント読み込み後・画面回転後のズレを拾う */
  if(typeof window !== 'undefined' && window.addEventListener){
    window.addEventListener('load', applyBarSpace);
    window.addEventListener('resize', applyBarSpace);
    window.addEventListener('orientationchange', applyBarSpace);
  }

  if(typeof navigator !== 'undefined' && 'serviceWorker' in navigator &&
     /^https?:/.test(location.protocol)){
    try{ navigator.serviceWorker.register('sw.js'); }catch(_){}
  }
}

init();

})();
