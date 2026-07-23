/* もしもカード・そよぎ 多言語テーブル(SPEC_V1)
   ・window.MOSHIMO_I18N = { ja, en, ... }。キー構造は全言語で完全一致させる(_check.jsが機械検証)
   ・いまは ja(正)+ en(下書き)の2言語。最終的に他アプリと同じ12言語体制へ
     (進め方はおうち介護記録と同じ: en複製の仮値を置き、Fableが言語ごとに差し替える)
   ・クレジット(set.credit)は全言語で「そよぎ / SOYOGI」の名前を必ず残す
   ・{n} などは app.js が実値に差し替えるプレースホルダ(訳文でも記号のまま残す)
   ・配列(fsSizes等)は選択肢の並び。全言語で要素数を揃える
   ・🔴文言はヒロさん監修済みの項目構成(SPEC_V1)に基づく。表現の微調整は監修つづきで */
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
    blood:'血液型',
    cond:'びょうき・しょうがい',
    meds:'のんでいる くすり',
    allergy:'アレルギー',
    doctor:'かかりつけ(びょういん・くすりや)',
    trouble:'にがてなこと・こまること',
    request:'おねがいしたい こと',
    contact:'きんきゅう れんらくさき',
    free:'じゆうに かくところ',
    save:'ほぞんする',
    saved:'ほぞんしました ✓',
    saveFail:'ほぞんできませんでした'
  },
  show: {
    head:'これは わたしの「もしもカード」です。読んでください。',
    close:'とじる',
    empty:'まだ なにも かかれていません',
    rot:'⟳ よこむき',
    play:'🔔 おとを ならす',
    stop:'🔇 おとを とめる'
  },
  set: {
    hNormal:'ふだんの せってい',
    hShow:'みせるときの せってい',
    hBackup:'きしゅへんこう(バックアップ)',
    fs:'もじの大きさ',
    fsSizes:['ふつう','大きい','とても大きい'],
    lang:'ことば / Language',
    theme:'いろ',
    themes:['みどり','みずいろ','しろ','くろ'],
    bgm:'BGM',
    bgms:['なし','みどりの音','あおの音'],
    sound:'タップ音',
    on:'ON', off:'OFF',
    fx:'めだちかた',
    fxs:['ふつう','いろを はんてん','てんめつ','いろを はんてん+てんめつ'],
    alert:'おと',
    alerts:['ならさない','チャイム','アラーム','ホイッスル'],
    vol:'おとの おおきさ',
    vols:['ちいさい','ふつう','おおきい'],
    bkHint:'あたらしい スマホに うつるときは、「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。',
    bkExport:'かきだす',
    bkImport:'よみこむ',
    exported:'かきだしました ✓',
    imported:'よみこみました ✓',
    importFail:'よみこめませんでした',
    paperNote:'お住まいの ちいきの 紙のヘルプカード・ヘルプマークと あわせて つかえます。',
    credit:'アプリ開発：介護と支援の相談どころ そよぎ'
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
    blood:'Blood type',
    cond:'Conditions / disabilities',
    meds:'Medicines I take',
    allergy:'Allergies',
    doctor:'My doctor / pharmacy',
    trouble:'Things I struggle with',
    request:'What I would like you to do',
    contact:'Emergency contact',
    free:'Anything else',
    save:'Save',
    saved:'Saved ✓',
    saveFail:'Could not save'
  },
  show: {
    head:'This is my MOSHIMO Card. Please read it.',
    close:'Close',
    empty:'Nothing is written yet',
    rot:'⟳ Rotate',
    play:'🔔 Play sound',
    stop:'🔇 Stop sound'
  },
  set: {
    hNormal:'Everyday settings',
    hShow:'Settings for showing',
    hBackup:'Phone change (backup)',
    fs:'Text size',
    fsSizes:['Normal','Large','Extra large'],
    lang:'ことば / Language',
    theme:'Color',
    themes:['Green','Aqua','White','Black'],
    bgm:'Music',
    bgms:['Off','Green tone','Blue tone'],
    sound:'Tap sound',
    on:'ON', off:'OFF',
    fx:'Attention style',
    fxs:['Normal','Inverted colors','Flashing','Inverted + flashing'],
    alert:'Sound',
    alerts:['Silent','Chime','Alarm','Whistle'],
    vol:'Volume',
    vols:['Soft','Normal','Loud'],
    bkHint:'When moving to a new phone, tap "Export" to save a file, then tap "Import" on the new phone.',
    bkExport:'Export',
    bkImport:'Import',
    exported:'Exported ✓',
    imported:'Imported ✓',
    importFail:'Could not import',
    paperNote:'You can use this together with the paper help card or help mark of your local area.',
    credit:'App development: Soyogi / SOYOGI'
  }
};

window.MOSHIMO_I18N = { ja: ja, en: en };

})();
