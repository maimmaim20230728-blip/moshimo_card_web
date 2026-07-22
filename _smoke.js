'use strict';
/* もしもカード・そよぎ 起動スモークテスト(疑似DOM・外骨格v0.1)
   実在idだけ返す疑似DOMで audio.js + tap.js + i18n.js + app.js を起動し検証する。
   ・起動→ホーム表示・ja文言適用
   ・かきこみ→保存→localStorage反映
   ・みせる→保存内容がでか文字画面に出る→とじる
   ・en切替→タブ/見出しが英語化・documentElement.lang=en
   ・文字サイズ切替→body class変化
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
    className:'', value:'', placeholder:'', src:'', href:'', rows:0,
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

/* ---- タップ発火(pointerdown→pointerup) ---- */
function tap(elm){
  const d = { pointerId:1, isPrimary:true, clientX:0, clientY:0, preventDefault(){} };
  (elm._ev.pointerdown || []).forEach(h => h(d));
  (elm._ev.pointerup   || []).forEach(h => h({ pointerId:1, clientX:0, clientY:0 }));
}
function fire(elm, type){
  (elm._ev[type] || []).forEach(h => h({}));
}
function allText(node){
  let s = node.textContent || '';
  for(const c of node.children) s += ' ' + allText(c);
  return s;
}

/* ---- sandbox ---- */
const lsData = {};
const sandbox = {
  console,
  setTimeout, clearTimeout,
  Date, Math, JSON,
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
    body: makeEl('body')
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

for(const f of ['audio.js','tap.js','i18n.js','app.js']){
  vm.runInContext(fs.readFileSync(__dirname + '/' + f, 'utf8'), sandbox, { filename: f });
}

/* ---- 検証 ---- */
let ok = 0, ng = 0;
function check(name, cond){
  if(cond){ ok++; console.log('  OK ' + name); }
  else { ng++; console.error('  NG ' + name); }
}

console.log('[1] 起動・ホーム表示・ja文言');
check('ホームが表示されている', !created['scr-home'].classList.contains('hidden'));
check('かきこみは隠れている', created['scr-edit'].classList.contains('hidden'));
check('アプリ名がjaで出る', created['hd-title'].textContent === 'もしもカード・そよぎ');
check('タグラインが出る', created['home-hint'].textContent.includes('もしもの時は'));
check('からっぽ案内が出る', created['home-preview'].textContent.includes('からっぽ'));

console.log('[2] かきこみ→保存');
tap(created['tab-edit']);
check('かきこみ画面へ遷移', !created['scr-edit'].classList.contains('hidden'));
created['fld-allergy'].value = 'そばアレルギー';
created['fld-meds'].value = 'テストの薬 朝1じょう';
tap(created['btn-save']);
const saved = JSON.parse(lsData['moshimo.card.v1'] || 'null');
check('localStorageに保存される', !!saved && saved.fields.allergy === 'そばアレルギー');
check('ホーム件数が更新される', created['home-preview'].textContent.includes('2'));

console.log('[3] みせる画面');
tap(created['tab-card']);
tap(created['btn-show']);
check('みせるが開く', !created['scr-show'].classList.contains('hidden'));
const shown = allText(created['show-list']);
check('保存内容が表示される', shown.includes('そばアレルギー') && shown.includes('テストの薬'));
check('見出しが出る', created['show-head'].textContent.includes('もしもカード'));
tap(created['show-close']);
check('とじるで閉じる', created['scr-show'].classList.contains('hidden'));

console.log('[4] 言語切替(en)');
created['set-lang'].value = 'en';
fire(created['set-lang'], 'change');
check('タブが英語になる', created['tab-card'].textContent === 'Card');
check('html langがenになる', sandbox.document.documentElement.lang === 'en');
tap(created['btn-show']);
check('en表示でも保存内容が出る', allText(created['show-list']).includes('そばアレルギー'));
tap(created['show-close']);

console.log('[5] 文字サイズ切替');
tap(created['tab-set']);
tap(created['btn-fs']);
check('body classがfs1になる', sandbox.document.body.className === 'fs1');
tap(created['btn-fs']);
tap(created['btn-fs']);
check('3段階で一周してfs0に戻る', sandbox.document.body.className === 'fs0');

console.log('');
if(ng){ console.error('SMOKE NG: ' + ng + '件 失敗 / OK ' + ok + '件'); process.exit(1); }
console.log('SMOKE OK: 全' + ok + '件 合格');
