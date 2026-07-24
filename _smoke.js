'use strict';
/* もしもカード・そよぎ 起動スモークテスト(疑似DOM・SPEC_V1)
   実在idだけ返す疑似DOMで audio.js + tap.js + i18n.js + app.js を起動し検証する。
   ・起動→ホーム表示・ja文言適用
   ・かきこみ(10項目)→保存→localStorage反映
   ・みせる: 表示内容/めだちかた(ふつう/はんてん/はんてん+てんめつ)/よこむき/おとをとめる
   ・せってい: いろ4テーマ・BGM・言語切替(en)・文字サイズ
   ・機種変更: かきだす(Blob内容)・よみこむ(正常/別アプリ拒否)
   使い方: node _smoke.js  */
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));

/* ---- 疑似DOM要素 ---- */
function makeEl(tag){
  const node = {
    tagName:(tag || 'div').toUpperCase(),
    children:[], style:{}, dataset:{}, _ev:{}, _attr:{},
    className:'', value:'', placeholder:'', src:'', href:'', download:'', rows:0,
    type:'', hidden:false, disabled:false, lang:'', dir:'',
    appendChild(c){ this.children.push(c); return c; },
    setAttribute(k, v){ this._attr[k] = v; },
    getAttribute(k){ return (k in this._attr) ? this._attr[k] : null; },
    addEventListener(t, h){ (this._ev[t] = this._ev[t] || []).push(h); },
    removeEventListener(){},
    focus(){}, click(){}, scrollIntoView(){}, scrollTo(){}, remove(){},
    classList:{
      _s:new Set(),
      add(...c){ c.forEach(x => this._s.add(x)); },
      remove(...c){ c.forEach(x => this._s.delete(x)); },
      toggle(c, f){ if(f === undefined) f = !this._s.has(c); if(f) this._s.add(c); else this._s.delete(c); return f; },
      contains(c){ return this._s.has(c); }
    },
    querySelector(){ return makeEl(); },
    querySelectorAll(){ return []; }
  };
  let _text = '';
  Object.defineProperty(node, 'textContent', {
    get(){ return _text; },
    set(v){ _text = (v == null ? '' : String(v)); node.children.length = 0; }
  });
  return node;
}

const created = {};
function byId(id){
  if(!ids.has(id)) return null;
  if(!created[id]) created[id] = makeEl();
  return created[id];
}

/* ---- イベント発火 ---- */
function tap(elm){
  const d = { pointerId:1, isPrimary:true, clientX:0, clientY:0, preventDefault(){} };
  (elm._ev.pointerdown || []).forEach(h => h(d));
  (elm._ev.pointerup   || []).forEach(h => h({ pointerId:1, clientX:0, clientY:0 }));
}
function fire(elm, type, ev){
  (elm._ev[type] || []).forEach(h => h(ev || {}));
}
function allText(node){
  let s = node.textContent || '';
  for(const c of node.children) s += ' ' + allText(c);
  return s;
}
function findTel(node){
  if(node.href && String(node.href).indexOf('tel:') === 0) return node.href;
  for(const c of node.children){ const r = findTel(c); if(r) return r; }
  return null;
}

/* ---- sandbox ---- */
const lsData = {};
const sandbox = {
  console,
  setTimeout, clearTimeout, setInterval, clearInterval,
  Date, Math, JSON, String,
  localStorage: {
    getItem: k => (k in lsData) ? lsData[k] : null,
    setItem: (k, v) => { lsData[k] = String(v); },
    removeItem: k => { delete lsData[k]; }
  },
  navigator: {},
  location: { protocol: 'file:' },
  document: {
    getElementById: byId,
    createElement: makeEl,
    documentElement: makeEl('html'),
    body: makeEl('body'),
    addEventListener(){},
    visibilityState: 'visible'
  },
  URL: { createObjectURL(){ return 'blob:mock'; }, revokeObjectURL(){} },
  FileReader: function(){
    this.readAsText = function(f){ this.result = f._text; if(this.onload) this.onload(); };
  }
};
sandbox.Blob = function(parts, opts){ this.parts = parts; this.opts = opts; sandbox.__lastBlob = this; };
sandbox.window = sandbox;
vm.createContext(sandbox);

for(const f of ['audio.js','tap.js','i18n.js','app.js']){
  vm.runInContext(fs.readFileSync(__dirname + '/' + f, 'utf8'), sandbox, { filename: f });
}
/* vm内トップレベルconst(Sound等)はsandboxのプロパティにならないため、コンテキスト内で評価する */
const evalCtx = code => vm.runInContext(code, sandbox);

/* ---- 検証 ---- */
let ok = 0, ng = 0;
function check(name, cond){
  if(cond){ ok++; console.log('  OK ' + name); }
  else { ng++; console.error('  NG ' + name); }
}
const showEl = () => created['scr-show'];

console.log('[1] 起動・ホーム表示・ja文言');
check('ホームが表示されている', !created['scr-home'].classList.contains('hidden'));
check('かきこみは隠れている', created['scr-edit'].classList.contains('hidden'));
check('アプリ名がjaで出る', created['hd-title'].textContent === 'もしもカード・そよぎ');
check('タグラインが出る', created['home-hint'].textContent.includes('もしもの時は'));
check('からっぽ案内が出る', created['home-preview'].textContent.includes('からっぽ'));
check('既定テーマはみどり', sandbox.document.body.getAttribute('data-theme') === 'green');

console.log('[2] かきこみ(10項目)→保存');
tap(created['tab-edit']);
check('かきこみ画面へ遷移', !created['scr-edit'].classList.contains('hidden'));
check('血液型/かかりつけ/自由欄がある', !!created['fld-blood'] && !!created['fld-doctor'] && !!created['fld-free']);
check('なまえラベルは注記なし(全体案内に統一)', created['lbl-name'].textContent === 'なまえ');
check('全項目が任意という案内が出る', (created['edit-hint'].textContent || '').includes('ひつような ところだけ'));
created['fld-allergy'].value = 'そばアレルギー';
created['fld-blood'].value = 'A型';
created['fld-free'].value = 'じゆうきにゅうテスト';
created['fld-contact'].value = 'はは 090-1234-5678';
tap(created['btn-save']);
const saved = JSON.parse(lsData['moshimo.card.v1'] || 'null');
check('localStorageに保存される', !!saved && saved.fields.allergy === 'そばアレルギー');
check('血液型も保存される', saved.fields.blood === 'A型');
check('ホーム件数が更新される', created['home-preview'].textContent.includes('4'));
/* 自動保存: 「ほぞんする」を押さなくても入力しただけで保存される(押し忘れ消失の防止) */
created['fld-cond'].value = 'じどうほぞんテスト';
fire(created['fld-cond'], 'input');
check('自動保存: 保存ボタンなしでも即保存', JSON.parse(lsData['moshimo.card.v1']).fields.cond === 'じどうほぞんテスト');
/* タブ移動→戻っても保存済みが復元される(消えない) */
tap(created['tab-set']); tap(created['tab-edit']);
check('タブ往復で入力が消えない', created['fld-cond'].value === 'じどうほぞんテスト');

console.log('[3] みせる(既定=ふつう・おとなし)');
tap(created['tab-card']);
tap(created['btn-show']);
check('みせるが開く', !showEl().classList.contains('hidden'));
check('ふつう=反転していない', !showEl().classList.contains('fx-invert'));
check('てんめつもしていない', !showEl().classList.contains('fx-blink'));
check('おとなし=「ならす」ボタンが出ている', created['show-sound'].textContent === '🔔 おとを ならす');
const shown = allText(created['show-list']);
check('保存内容が表示される', shown.includes('そばアレルギー') && shown.includes('A型') && shown.includes('じゆうきにゅうテスト'));
check('緊急連絡先が発信ボタン(tel:)になる', findTel(created['show-list']) === 'tel:09012345678');
tap(created['show-close']);
check('とじるで閉じる', showEl().classList.contains('hidden'));

console.log('[4] めだちかた(色を反転/点滅/両方)とよこむき');
tap(created['tab-set']);
tap(created['btn-fx']);                               // ふつう→いろを はんてん
check('めだちかたボタンが「いろを はんてん」', created['btn-fx'].textContent === 'いろを はんてん');
tap(created['tab-card']); tap(created['btn-show']);
check('反転クラスが付く', showEl().classList.contains('fx-invert'));
check('点滅はまだ付かない', !showEl().classList.contains('fx-blink'));
tap(created['show-rot']);
check('よこむきクラスが付く', showEl().classList.contains('landscape'));
tap(created['show-rot']);
check('よこむき解除', !showEl().classList.contains('landscape'));
tap(created['show-close']);
tap(created['tab-set']); tap(created['btn-fx']);      // いろを はんてん→てんめつ
check('めだちかたボタンが「てんめつ」', created['btn-fx'].textContent === 'てんめつ');
tap(created['tab-card']); tap(created['btn-show']);
check('点滅だけ=反転しない', showEl().classList.contains('fx-blink') && !showEl().classList.contains('fx-invert'));
tap(created['show-close']);
tap(created['tab-set']); tap(created['btn-fx']);      // 点滅→色を反転+点滅
tap(created['tab-card']); tap(created['btn-show']);
check('色を反転+点滅で両クラス', showEl().classList.contains('fx-invert') && showEl().classList.contains('fx-blink'));
check('開き直しでよこむきリセット', !showEl().classList.contains('landscape'));
tap(created['show-close']);

console.log('[5] いろ・BGM(既定=みどりの音で初期ON)');
tap(created['tab-set']);
tap(created['btn-theme']);
check('テーマがみずいろに', sandbox.document.body.getAttribute('data-theme') === 'aqua');
check('いろボタン表示も更新', created['btn-theme'].textContent === 'みずいろ');
check('BGM既定は「みどりの音」(初期ON)', created['btn-bgm'].textContent === 'みどりの音');
check('BGM既定で有効(穏やかなBGMが最初からON)', evalCtx('Sound.bgmEnabled') === true);
tap(created['btn-bgm']);
check('1回で「あおの音」(まだ有効)', created['btn-bgm'].textContent === 'あおの音' && evalCtx('Sound.bgmEnabled') === true);
tap(created['btn-bgm']);
check('2回で「なし」(BGM無効)', created['btn-bgm'].textContent === 'なし' && evalCtx('Sound.bgmEnabled') === false);
tap(created['btn-bgm']);
check('3回で「みどりの音」に戻る(初期ONと同じ)', created['btn-bgm'].textContent === 'みどりの音' && evalCtx('Sound.bgmEnabled') === true);

console.log('[6] みせるおと: 設定音の自動再生+おとなしでも鳴らせる');
tap(created['btn-alert']);                            // ならさない→チャイム
check('おとボタンが「チャイム」', created['btn-alert'].textContent === 'チャイム');
tap(created['btn-vol']);
check('おおきさが「おおきい」', created['btn-vol'].textContent === 'おおきい');
tap(created['tab-card']); tap(created['btn-show']);
check('チャイム設定→「とめる」状態で開く', created['show-sound'].textContent === '🔇 おとを とめる');
tap(created['show-sound']);
check('押すと「ならす」に切替(止まる)', created['show-sound'].textContent === '🔔 おとを ならす');
tap(created['show-sound']);
check('もう一度で「とめる」に戻る(また鳴る)', created['show-sound'].textContent === '🔇 おとを とめる');
tap(created['show-close']);
/* おとを「ならさない」に戻し、みせる画面からその場で鳴らせるか(後から鳴らせない問題の修正) */
tap(created['tab-set']);
tap(created['btn-alert']); tap(created['btn-alert']); tap(created['btn-alert']); // →アラーム→ホイッスル→ならさない
check('おとを「ならさない」に戻す', created['btn-alert'].textContent === 'ならさない');
tap(created['tab-card']); tap(created['btn-show']);
check('おとなしでも「ならす」ボタンがある', created['show-sound'].textContent === '🔔 おとを ならす');
tap(created['show-sound']);
check('おとなしでもその場で鳴らせる=「とめる」表示に', created['show-sound'].textContent === '🔇 おとを とめる');
tap(created['show-close']);
check('とじたら音は止まる', evalCtx('Sound.alertOn') === false);

console.log('[7] 言語切替(en)');
created['set-lang'].value = 'en';
fire(created['set-lang'], 'change');
check('タブが英語になる', created['tab-card'].textContent === 'Card');
check('html langがenになる', sandbox.document.documentElement.lang === 'en');
check('血液型ラベルも英語に', created['lbl-blood'].textContent === 'Blood type');
created['set-lang'].value = 'ja';
fire(created['set-lang'], 'change');
check('jaに戻せる', created['tab-card'].textContent === 'カード');

console.log('[8] きしゅへんこう: かきだす');
tap(created['tab-set']);
tap(created['bk-export']);
const blobJson = sandbox.__lastBlob ? JSON.parse(sandbox.__lastBlob.parts.join('')) : null;
check('Blobにアプリ名が入る', !!blobJson && blobJson.app === 'moshimo_card');
check('Blobにカード内容が入る', !!blobJson && blobJson.card.fields.allergy === 'そばアレルギー');
check('かきだしトースト', created['toast'].textContent.includes('かきだしました'));

console.log('[9] きしゅへんこう: よみこむ');
const good = JSON.stringify({ app:'moshimo_card', ver:1,
  card:{ v:1, fields:{ name:'いんぽーとたろう', blood:'', cond:'', meds:'', allergy:'', doctor:'', trouble:'', request:'', contact:'', free:'' }, updated: 1 },
  prefs:{ lang:'ja', fs:0, sound:true, theme:'dark', bgm:'off', fx:'plain', alert:'none', vol:1 } });
fire(created['bk-file'], 'change', { target:{ files:[{ _text: good }], value:'' } });
const imported = JSON.parse(lsData['moshimo.card.v1']);
check('カードが差し替わる', imported.fields.name === 'いんぽーとたろう');
check('テーマ設定も反映(くろ)', sandbox.document.body.getAttribute('data-theme') === 'dark');
check('よみこみトースト', created['toast'].textContent.includes('よみこみました'));
fire(created['bk-file'], 'change', { target:{ files:[{ _text: JSON.stringify({ app:'other_app' }) }], value:'' } });
check('別アプリのファイルは拒否', created['toast'].textContent.includes('よみこめませんでした'));
check('拒否時はカード無変更', JSON.parse(lsData['moshimo.card.v1']).fields.name === 'いんぽーとたろう');

console.log('[10] 文字サイズ切替');
tap(created['btn-fs']);
check('body classがfs1になる', sandbox.document.body.className === 'fs1');
tap(created['btn-fs']); tap(created['btn-fs']);
check('3段階で一周してfs0に戻る', sandbox.document.body.className === 'fs0');

console.log('[11] アラーム優先: 緊急よびだし音とBGMは重ならない');
/* Soundのpause/resume/alertの呼び出しを記録し、みせる画面の排他制御を検証する */
evalCtx('window.__snd=[];["pauseBgm","resumeBgm","startAlert","stopAlert"].forEach(function(m){var _o=Sound[m];Sound[m]=function(){window.__snd.push(m);return _o.apply(Sound,arguments);};});');
tap(created['btn-bgm']);                              // なし→みどりの音(穏やかなBGMを初期ON相当に戻す)
check('準備: 穏やかなBGMをみどりに戻す', created['btn-bgm'].textContent === 'みどりの音' && evalCtx('Sound.bgmEnabled') === true);
/* (a) よびだし音=ならさない: みせるを開いてもBGMは止めない(穏やかなBGMは継続) */
evalCtx('window.__snd.length=0;');
tap(created['tab-card']); tap(created['btn-show']);
check('ならさない時: BGMを止めない(継続)', evalCtx('window.__snd.indexOf("pauseBgm") < 0'));
check('ならさない時: よびだし音は鳴らさない', evalCtx('window.__snd.indexOf("startAlert") < 0'));
tap(created['show-close']);
/* (b) よびだし音=アラーム: みせるでBGMを止めてから鳴らす(緊急音を最優先・重ならない) */
tap(created['tab-set']);
tap(created['btn-alert']); tap(created['btn-alert']); // ならさない→チャイム→アラーム
check('準備: よびだし音をアラームに', created['btn-alert'].textContent === 'アラーム');
evalCtx('window.__snd.length=0;');
tap(created['tab-card']); tap(created['btn-show']);
check('アラーム時: BGMを止めてから鳴らす(重ならない)',
  evalCtx('window.__snd.length===2 && window.__snd[0]==="pauseBgm" && window.__snd[1]==="startAlert"'));
/* とじる: 緊急音を止めてからBGMを再開する */
evalCtx('window.__snd.length=0;');
tap(created['show-close']);
check('とじる時: 緊急音を止めてからBGM再開',
  evalCtx('window.__snd.length===2 && window.__snd[0]==="stopAlert" && window.__snd[1]==="resumeBgm"'));

console.log('');
if(ng){ console.error('SMOKE NG: ' + ng + '件 失敗 / OK ' + ok + '件'); process.exit(1); }
console.log('SMOKE OK: 全' + ok + '件 合格');
