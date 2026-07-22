/* もしもカード・そよぎ 多言語テーブル(外骨格 v0.1)
   ・window.MOSHIMO_I18N = { ja, en, ... }。キー構造は全言語で完全一致させる
   ・いまは ja(正)+ en(下書き)の2言語だけ。最終的に他アプリと同じ12言語体制へ
     (進め方はおうち介護記録と同じ: en複製の仮値を置き、Fableが言語ごとに差し替え。
      未翻訳検出の _check_i18n.js は本実装時に導入する)
   ・クレジット(set.credit)は全言語で「そよぎ / SOYOGI」の名前を必ず残す
   ・{n} などは app.js が実値に差し替えるプレースホルダ(訳文でも記号のまま残す)
   ・🔴文言は仮置き。ヒロさん(現場専門家)監修で確定する */
(function(){
'use strict';

/* ============ ja(正) ============ */
var ja = {
  app: {
    name:'もしもカード・そよぎ',
    tagline:'もしもの時は、これを見せてください。'
  },
  tab: { card:'カード', edit:'かきこみ', set:'せってい' },
  home: {
    show:'🆘 これを みせる',
    empty:'まだカードは からっぽです。「かきこみ」から つくれます。',
    filled:'かいてあること: {n}こ'
  },
  edit: {
    name:'なまえ(かかなくてもOK)',
    cond:'びょうき・しょうがい',
    meds:'のんでいる くすり',
    allergy:'アレルギー',
    trouble:'にがてなこと・こまること',
    request:'おねがいしたい こと',
    contact:'きんきゅう れんらくさき',
    save:'ほぞんする',
    saved:'ほぞんしました ✓',
    saveFail:'ほぞんできませんでした'
  },
  show: {
    head:'これは わたしの「もしもカード」です。よんでください。',
    close:'とじる',
    empty:'まだ なにも かかれていません'
  },
  set: {
    fs:'もじの大きさ',
    fsSizes:['ふつう','大きい','とても大きい'],
    lang:'ことば / Language',
    sound:'タップ音',
    on:'ON', off:'OFF',
    credit:'介護と支援の相談どころ「そよぎ」/ SOYOGI'
  }
};

/* ============ en(下書き) ============ */
var en = {
  app: {
    name:'MOSHIMO Card / Soyogi',
    tagline:'In an emergency, please show this card.'
  },
  tab: { card:'Card', edit:'Write', set:'Settings' },
  home: {
    show:'🆘 Show this card',
    empty:'The card is still empty. You can fill it in on the "Write" tab.',
    filled:'Filled items: {n}'
  },
  edit: {
    name:'Name (optional)',
    cond:'Conditions / disabilities',
    meds:'Medicines I take',
    allergy:'Allergies',
    trouble:'Things I struggle with',
    request:'What I would like you to do',
    contact:'Emergency contact',
    save:'Save',
    saved:'Saved ✓',
    saveFail:'Could not save'
  },
  show: {
    head:'This is my MOSHIMO Card. Please read it.',
    close:'Close',
    empty:'Nothing is written yet'
  },
  set: {
    fs:'Text size',
    fsSizes:['Normal','Large','Extra large'],
    lang:'ことば / Language',
    sound:'Tap sound',
    on:'ON', off:'OFF',
    credit:'Soyogi / SOYOGI'
  }
};

window.MOSHIMO_I18N = { ja: ja, en: en };

})();
