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
    /* セーフエリア検査用: 下タブの実測に使う(疑似DOMでは高さ50px固定) */
    getBoundingClientRect(){ return { width:0, height:50, top:0, left:0, right:0, bottom:50 }; },
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
/* はじめての つかいかた(2026-09-30)は読み終えた扱いで始める(案内そのものは store/_back_check.js で本物のChromeで試す) */
lsData['moshimo.guide.v1'] = 'true';
/* セーフエリア検査用の記録: CSS変数の書き込み・windowイベント登録・ResizeObserverの監視先 */
const setProps = {};
const winEvents = {};
let roTarget = null;
const docEl = makeEl('html');
docEl.style.setProperty = (k, v) => { setProps[k] = v; };
const sandbox = {
  console,
  setTimeout, clearTimeout, setInterval, clearInterval,
  Date, Math, JSON, String,
  addEventListener(t, h){ (winEvents[t] = winEvents[t] || []).push(h); },
  ResizeObserver: function(cb){
    this.cb = cb;
    this.observe = el => { roTarget = el; };
    this.disconnect = () => {};
  },
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
    documentElement: docEl,
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

/* 発信ボタン: 番号が複数ある連絡先は、番号ごとに別のボタン(改行をまたいでつながない)・番号が無ければ出さない */
function findTels(node, acc){
  acc = acc || [];
  if(node.href && String(node.href).indexOf('tel:') === 0) acc.push(node.href);
  for(const c of node.children) findTels(c, acc);
  return acc;
}
const savedCard = lsData['moshimo.card.v1'];
function showWithContact(text){
  const card = JSON.parse(savedCard); card.fields.contact = text;
  lsData['moshimo.card.v1'] = JSON.stringify(card);
  tap(created['tab-card']); tap(created['btn-show']);
  const r = findTels(created['show-list']);
  tap(created['show-close']);
  return r;
}
check('連絡先に番号が2つ(改行)=ボタンも2つ(つなげた番号に発信しない)', JSON.stringify(showWithContact('はは 090-1111-2222\nちち 080-3333-4444')) === JSON.stringify(['tel:09011112222', 'tel:08033334444']));
check('郵便番号と内線は番号にしない', JSON.stringify(showWithContact('〒123-4567\n03-1234-5678(内線123)')) === JSON.stringify(['tel:0312345678']));
check('番号が無ければ発信ボタンを出さない', showWithContact('はは 70歳').length === 0);
lsData['moshimo.card.v1'] = savedCard;

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
/* 爆音(災害用): 4段目として増設・注意書きは爆音のときだけ出す */
check('おおきい では 爆音の注意書きを出さない', created['boom-hint'].classList.contains('hidden'));
tap(created['btn-vol']);
check('4段目が「爆音(災害用)」', created['btn-vol'].textContent === '爆音(災害用)');
check('爆音を選ぶと注意書きが出る', !created['boom-hint'].classList.contains('hidden'));
check('注意書きに「みみの ちかく」と「音量」が入る',
  created['boom-hint'].textContent.indexOf('みみの ちかく') >= 0 &&
  created['boom-hint'].textContent.indexOf('音量') >= 0);
check('爆音は保存される(pref.vol=3)', JSON.parse(lsData['moshimo.pref.v1']).vol === 3);
tap(created['btn-vol']);
check('5回目で「ちいさい」に一周', created['btn-vol'].textContent === 'ちいさい');
check('一周したら注意書きは消える', created['boom-hint'].classList.contains('hidden'));
tap(created['btn-vol']); tap(created['btn-vol']);   // ちいさい→ふつう→おおきい に戻す
check('「おおきい」に戻して以降の検査に影響させない', created['btn-vol'].textContent === 'おおきい');
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

/* ---- [v1.7] セーフエリア(上のステータスバー/下のナビゲーションバー) ----
   Android15+(targetSdk36)はエッジtoエッジ強制で、WebViewが画面の上端・下端まで描かれる。
   固定余白のままだと本文の末尾が下タブに隠れ、「とじる」がナビゲーションバーに食い込む。
   実機がないと目視できない箇所なので、CSSとJSの両方が消えていないことを機械で見張る。 */
console.log('[12] セーフエリア(ステータスバー/ナビゲーションバー)');
const cssFlat = fs.readFileSync(__dirname + '/style.css', 'utf8').replace(/\s+/g, '');
check('--tabbar-h のフォールバックに env(safe-area-inset-bottom) が入る',
  /--tabbar-h:calc\(84px\+env\(safe-area-inset-bottom\)\)/.test(cssFlat));
check('body の下余白が max(CSS下限, 実測+10px)(本文の末尾が下タブに隠れない)',
  /body\{[^}]*padding-bottom:max\(calc\(84px\+env\(safe-area-inset-bottom\)\),calc\(var\(--tabbar-h\)\+10px\)\)/.test(cssFlat));
check('固定値の padding-bottom:84px が残っていない', !/padding-bottom:84px/.test(cssFlat));
check('header#hd の上余白に env(safe-area-inset-top)(時計・電池と重ならない)',
  /header#hd\{[^}]*padding:calc\(24px\+env\(safe-area-inset-top\)\)/.test(cssFlat));
check('header#hd の min-height も env(safe-area-inset-top) の分だけ伸びる',
  /header#hd\{[^}]*min-height:calc\(120px\+env\(safe-area-inset-top\)\)/.test(cssFlat));
check('#tabbar 自身の下余白に env(safe-area-inset-bottom) が残っている',
  /#tabbar\{[^}]*padding-bottom:env\(safe-area-inset-bottom\)/.test(cssFlat));
check('「とじる」がナビゲーションバーに食い込まない',
  /\.close-btn\{[^}]*bottom:calc\(16px\+env\(safe-area-inset-bottom\)\)/.test(cssFlat));
check('みせる画面の中身の上余白に env(safe-area-inset-top)',
  /#show-rotate\{[^}]*padding:calc\(20px\+env\(safe-area-inset-top\)\)/.test(cssFlat));
check('みせる画面の中身の下余白に env(safe-area-inset-bottom)(最後まで読める)',
  /#show-rotate\{[^}]*calc\(120px\+env\(safe-area-inset-bottom\)\)/.test(cssFlat));
check('トーストの位置も max(CSS下限, 実測+12px)(タブに重ならない)',
  /\.toast\{[^}]*bottom:max\(calc\(96px\+env\(safe-area-inset-bottom\)\),calc\(var\(--tabbar-h\)\+12px\)\)/.test(cssFlat));

/* JS側: タブバーの実寸を測って --tabbar-h に書き戻しているか(固定値では言語・文字サイズで足りない) */
check('起動時にタブバーの実測高さが --tabbar-h に入る(疑似DOMは50px)', setProps['--tabbar-h'] === '50px');
check('ResizeObserver でタブバーの箱そのものを見張っている', roTarget === created['tabbar']);
check('load/resize/orientationchange でも測り直す(ResizeObserver非対応の保険)',
  !!winEvents.load && !!winEvents.resize && !!winEvents.orientationchange);
setProps['--tabbar-h'] = '';
tap(created['btn-fs']);
check('文字サイズを変えたら測り直す', setProps['--tabbar-h'] === '50px');
tap(created['btn-fs']); tap(created['btn-fs']);   // fs0 に戻す
delete docEl.style.setProperty;
let okNoSet = true;
try{ winEvents.resize[0](); }catch(e){ okNoSet = false; console.log('    ' + e.message); }
check('setProperty が無い環境でも例外を出さない(安全側に無視)', okNoSet);
docEl.style.setProperty = (k, v) => { setProps[k] = v; };

/* ---- 点検の第2便(2026-10-30) ---- */
console.log('[13] みせる画面: このカードを書いた日・外国語のときは見出しに日本語も/保存できないときの知らせ/トーストを読み上げに');
{
  const I = sandbox.window.MOSHIMO_I18N;
  const base = JSON.parse(lsData['moshimo.card.v1']);
  const c13 = JSON.parse(JSON.stringify(base)); c13.updated = new Date(2026, 9, 30, 12, 0, 0).getTime();
  lsData['moshimo.card.v1'] = JSON.stringify(c13);
  tap(created['tab-card']); tap(created['btn-show']);
  check('書いた日(ja)がいちばん下に出る', allText(created['show-list']).indexOf('このカードを 書いた日: 2026年10月30日') >= 0);
  check('ja のときは見出しに日本語を重ねない', created['show-head'].children.length === 0 && created['show-head'].textContent === I.ja.show.head);
  tap(created['show-close']);
  created['set-lang'].value = 'en'; fire(created['set-lang'], 'change');
  const hj = created['show-head'].children[0];
  check('en のとき見出しに日本語も添える(lang=ja)', created['show-head'].textContent.indexOf(I.en.show.head) === 0 && !!hj && hj.textContent === I.ja.show.head && hj.getAttribute('lang') === 'ja');
  tap(created['tab-card']); tap(created['btn-show']);
  const ISO = new RegExp('[' + String.fromCharCode(0x2066) + '-' + String.fromCharCode(0x2069) + ']', 'g');   // 日付を囲む LRI…PDI
  check('書いた日(en)は 2026-10-30(LRI…PDI で囲む)', allText(created['show-list']).indexOf('Date this card was written: ' + String.fromCharCode(0x2066) + '2026-10-30' + String.fromCharCode(0x2069)) >= 0
    && allText(created['show-list']).replace(ISO, '').indexOf('Date this card was written: 2026-10-30') >= 0);
  tap(created['show-close']);
  created['set-lang'].value = 'ar'; fire(created['set-lang'], 'change');
  check('ar でも日本語の見出しが1つだけ', created['show-head'].children.length === 1 && created['show-head'].children[0].textContent === I.ja.show.head);
  created['set-lang'].value = 'ja'; fire(created['set-lang'], 'change');
  check('ja に戻すと日本語の添えは消える', created['show-head'].children.length === 0);
  const c0 = JSON.parse(JSON.stringify(base)); delete c0.updated;
  lsData['moshimo.card.v1'] = JSON.stringify(c0);
  tap(created['tab-card']); tap(created['btn-show']);
  check('書いた日の無いカードでは出さない', allText(created['show-list']).indexOf('書いた日') < 0);
  tap(created['show-close']);
  check('12言語に show.written({d} 入り)がある', ['ja','en','de','fr','es','it','pt','nl','sv','ko','zh','ar'].every(l => typeof I[l].show.written === 'string' && I[l].show.written.indexOf('{d}') >= 0 && !/[—―–]/.test(I[l].show.written)));
  lsData['moshimo.card.v1'] = JSON.stringify(base);
  /* 自動保存が失敗したら1回だけ知らせる */
  tap(created['tab-edit']);
  const realSet = sandbox.localStorage.setItem;
  sandbox.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  created['toast'].textContent = '';
  created['fld-free'].value = 'いっぱい1'; fire(created['fld-free'], 'input');
  const t1 = created['toast'].textContent;
  created['toast'].textContent = '';
  created['fld-free'].value = 'いっぱい2'; fire(created['fld-free'], 'input');
  const t2 = created['toast'].textContent;
  sandbox.localStorage.setItem = realSet;
  check('自動保存の失敗: 「ほぞんできませんでした」を1回だけ', t1 === I.ja.edit.saveFail && t2 === '');
  created['fld-free'].value = 'もどった'; fire(created['fld-free'], 'input');
  check('保存できたら知らせは出さず保存される', created['toast'].textContent === '' && JSON.parse(lsData['moshimo.card.v1']).fields.free === 'もどった');
  /* よみこむ: カードを書けなければ「よみこみました」を出さない */
  sandbox.localStorage.setItem = (k, v) => { if(k === 'moshimo.card.v1') throw new Error('QuotaExceededError'); return realSet(k, v); };
  const before = lsData['moshimo.card.v1'];
  fire(created['bk-file'], 'change', { target:{ files:[{ _text: good }], value:'' } });
  sandbox.localStorage.setItem = realSet;
  check('よみこむ: 書けなければ「よみこめませんでした」・カードはそのまま', created['toast'].textContent.indexOf('よみこめませんでした') >= 0 && lsData['moshimo.card.v1'] === before);
  check('トーストは読み上げに伝わる(role=status・aria-live=polite)', /<div id="toast" class="toast" role="status" aria-live="polite"><\/div>/.test(fs.readFileSync(__dirname + '/index.html', 'utf8')));
  if(fs.existsSync(__dirname + '/package.json')) check('package.json の version が app.js の VER と合う', JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8')).version.replace(/\.0$/, '') === (fs.readFileSync(__dirname + '/app.js', 'utf8').match(/VER = '([^']+)'/) || [])[1]);
  tap(created['tab-card']);
}

console.log('');
if(ng){ console.error('SMOKE NG: ' + ng + '件 失敗 / OK ' + ok + '件'); process.exit(1); }
console.log('SMOKE OK: 全' + ok + '件 合格');
