/* もしもカード・そよぎ 多言語テーブル(SPEC_V1・12言語)
   ・window.MOSHIMO_I18N = { ja, en, de, fr, es, it, pt, nl, sv, ko, zh, ar }
   ・キー構造は全言語で完全一致(_check.js が ja を正としてキー構造・配列要素数を機械照合)
   ・ja(正)+ en(下書き)は手書き。de〜ar の10言語は Workflow(翻訳→ネイティブ検証)で生成(2026-07-23)
   ・クレジット(set.credit)は全言語で「Soyogi / SOYOGI」の名前を必ず残す
   ・{n} は app.js が実値に差し替えるプレースホルダ(訳文でも記号のまま残す)
   ・set.lang は言語切替ラベルなので全言語 'ことば / Language' 固定
   ・配列(fsSizes等)は選択肢の並び。全言語で要素数を揃える
   ・ar は RTL。app.js が ar のとき document.dir='rtl' にする
   ・edit.allOptional=かきこみ画面の全体案内(どの項目も任意)。show.call=緊急連絡先の発信ボタン(2026-07-23追加) */
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
    allOptional:'ぜんぶ 書かなくても だいじょうぶです。ひつような ところだけ 書いてください。',
    name:'なまえ',
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
    stop:'🔇 おとを とめる',
    call:'📞 でんわする'
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
    vols:['ちいさい','ふつう','おおきい','爆音(災害用)'],
    boomHint:'爆音は 災害の ときに とおくの 人に 気づいてもらう ための おとです。みみの ちかくで ならさないで ください。スマホ本体の 音量も 大きくしてください。',
    bkHint:'あたらしい スマホに うつるときは、「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。',
    bkExport:'かきだす',
    bkImport:'よみこむ',
    exported:'かきだしました ✓',
    imported:'よみこみました ✓',
    importFail:'よみこめませんでした',
    paperNote:'お住まいの ちいきの 紙のヘルプカード・ヘルプマークと あわせて つかえます。',
    privacy:'プライバシーポリシー',
    credit:'アプリ開発：介護と支援の相談どころ そよぎ'
  },
  /* はじめての つかいかた(app.js openGuide・初回に必ず出す・2026-09-30)。heads と bodies は同じ数。
     ボタン名・画面名は その言語の画面の文字と同じにする(画面の文言を変えたら ここも)。隠れた入口は無い=せっていから もう一度 見られる */
  "guide": {
    "title": "つかいかた",
    "step": "{n} / {m}",
    "start": "はじめる",
    "again": "もういちど 見る",
    "prev": "まえ",
    "next": "つぎ",
    "heads": [
      "もしもカード・そよぎ へ ようこそ",
      "まず「かきこみ」で カードを つくる",
      "「🆘 これを みせる」で 見せる",
      "おとと めだちかた",
      "書いた ことは この 端末の 中だけ",
      "見やすく する・もう一度 見る"
    ],
    "bodies": [
      "この アプリは、もしもの ときに まわりの 人に 見せる カードです。\nびょうき・のんでいる くすり・アレルギー・きんきゅう れんらくさき などを 書いておけます。\nことばで 説明できない ときも、画面を 見せれば つたわります。",
      "下の「かきこみ」を おして、なまえ・血液型・のんでいる くすり・きんきゅう れんらくさき などを 書きます。\nぜんぶ 書かなくても だいじょうぶです。ひつような ところだけ 書いてください。\n書いた ことは すぐに ほぞんされます。「ほぞんする」を おすと「ほぞんしました ✓」と 出ます。",
      "もしもの ときは、「カード」の 画面で「🆘 これを みせる」を おします。書いた ことが 大きな 字で 画面いっぱいに 出ます。\n「きんきゅう れんらくさき」に 電話ばんごうが あれば「📞 でんわする」が 出て、そのまま 電話を かけられます。\n「⟳ よこむき」で 横に できます。見せ おわったら「とじる」を おします。",
      "見せる 画面で「🔔 おとを ならす」を おすと、まわりの 人に 気づいて もらう ための おとが 鳴ります。「🔇 おとを とめる」で 止まります。\n「せってい」の「みせるときの せってい」で、「めだちかた」(ふつう・いろを はんてん・てんめつ・いろを はんてん+てんめつ)、見せた ときに 鳴らす「おと」、「おとの おおきさ」を えらべます。\n「爆音(災害用)」は、みみの ちかくで 鳴らさないで ください。",
      "書いた ことは この 端末の 中だけに ほぞんされ、どこにも 送られません。登録も いりません。\nスマホを かえる ときは、「せってい」の「かきだす」で ファイルを のこし、あたらしい スマホで「よみこむ」を おします。",
      "「せってい」の「ふだんの せってい」で、「もじの大きさ」(ふつう・大きい・とても大きい)、「いろ」(みどり・みずいろ・しろ・くろ)、「BGM」、「タップ音」を かえられます。\nことばは 右上の 🌐 で えらべます。\nこの 案内は「せってい」の「つかいかた」の「もういちど 見る」で、いつでも もう一度 見られます。"
    ]
  }
};

/* ============ en ============ */
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
    allOptional:"You don't need to fill in everything. Just write the parts that matter for you.",
    name:'Name',
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
    stop:'🔇 Stop sound',
    call:'📞 Call'
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
    vols:['Soft','Normal','Loud','Max (disaster)'],
    boomHint:'The maximum level is meant to reach people far away in a disaster. Do not sound it close to anyone\'s ears. Also turn up the phone\'s own volume.',
    bkHint:'When moving to a new phone, tap "Export" to save a file, then tap "Import" on the new phone.',
    bkExport:'Export',
    bkImport:'Import',
    exported:'Exported ✓',
    imported:'Imported ✓',
    importFail:'Could not import',
    paperNote:'You can use this together with the paper help card or help mark of your local area.',
    privacy:'Privacy Policy',
    credit:'App development: Soyogi / SOYOGI'
  },
  "guide": {
    "title": "How to use",
    "step": "{n} / {m}",
    "start": "Start",
    "again": "Show again",
    "prev": "Previous",
    "next": "Next",
    "heads": [
      "Welcome to MOSHIMO Card / Soyogi",
      "First, make your card in \"Write\"",
      "Show it with \"🆘 Show this card\"",
      "Sound and attention style",
      "What you write stays on this device",
      "Make it easier to see, and see this again"
    ],
    "bodies": [
      "This app is a card you show to the people around you in an emergency.\nYou can write down your conditions, the medicines you take, allergies, an emergency contact and more.\nEven when you cannot explain in words, showing the screen gets the message across.",
      "Tap \"Write\" at the bottom and fill in things like your name, blood type, the medicines you take and an emergency contact.\nYou don't need to fill in everything. Just write the parts that matter for you.\nWhat you write is saved right away. When you tap \"Save\", \"Saved ✓\" appears.",
      "In an emergency, tap \"🆘 Show this card\" on the \"Card\" screen. What you wrote appears in large letters across the whole screen.\nIf the \"Emergency contact\" includes a phone number, \"📞 Call\" appears so you can call right away.\n\"⟳ Rotate\" turns the view sideways. When you are done, tap \"Close\".",
      "On the showing screen, tap \"🔔 Play sound\" to sound an alert so people nearby notice you. \"🔇 Stop sound\" stops it.\nIn \"Settings\", under \"Settings for showing\", you can choose the \"Attention style\" (Normal, Inverted colors, Flashing, Inverted + flashing), the \"Sound\" played when showing, and the \"Volume\".\nDo not play \"Max (disaster)\" close to anyone's ears.",
      "Everything you write is stored only on this device. Nothing is sent anywhere, and no sign-up is needed.\nWhen you change phones, tap \"Export\" in \"Settings\" to save a file, then tap \"Import\" on the new phone.",
      "Under \"Everyday settings\" in \"Settings\", you can change the \"Text size\" (Normal, Large, Extra large), \"Color\" (Green, Aqua, White, Black), \"Music\" and \"Tap sound\".\nChoose the language with 🌐 at the top right.\nYou can see this guide again at any time with \"Show again\" next to \"How to use\" in \"Settings\"."
    ]
  }
};

/* ============ de ============ */
var de = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "Bitte zeigen Sie im Notfall diese Karte." },
  "tab": { "card": "Karte", "edit": "Eintragen", "set": "Einstellungen" },
  "home": {
    "show": "🆘 Diese Karte zeigen",
    "empty": "Die Karte ist noch leer. Sie können sie im Bereich „Eintragen“ ausfüllen.",
    "filled": "Ausgefüllte Angaben: {n}"
  },
  "edit": {
    "allOptional": "Sie müssen nicht alles ausfüllen. Schreiben Sie nur, was für Sie wichtig ist.",
    "name": "Name",
    "blood": "Blutgruppe",
    "cond": "Krankheiten / Behinderungen",
    "meds": "Medikamente, die ich nehme",
    "allergy": "Allergien",
    "doctor": "Mein Arzt / meine Apotheke",
    "trouble": "Was mir schwerfällt",
    "request": "Worum ich Sie bitte",
    "contact": "Notfallkontakt",
    "free": "Sonstiges",
    "save": "Speichern",
    "saved": "Gespeichert ✓",
    "saveFail": "Speichern fehlgeschlagen"
  },
  "show": {
    "head": "Das ist meine MOSHIMO-Karte. Bitte lesen Sie sie.",
    "close": "Schließen",
    "empty": "Es ist noch nichts eingetragen",
    "rot": "⟳ Drehen",
    "play": "🔔 Ton abspielen",
    "stop": "🔇 Ton stoppen",
    "call": "📞 Anrufen"
  },
  "set": {
    "hNormal": "Alltägliche Einstellungen",
    "hShow": "Einstellungen zum Zeigen",
    "hBackup": "Handywechsel (Sicherung)",
    "fs": "Schriftgröße",
    "fsSizes": ["Normal", "Groß", "Sehr groß"],
    "lang": "ことば / Language",
    "theme": "Farbe",
    "themes": ["Grün", "Hellblau", "Weiß", "Schwarz"],
    "bgm": "Musik",
    "bgms": ["Aus", "Grüner Klang", "Blauer Klang"],
    "sound": "Tippton",
    "on": "AN", "off": "AUS",
    "fx": "Auffälligkeit",
    "fxs": ["Normal", "Farben umkehren", "Blinken", "Farben umkehren + Blinken"],
    "alert": "Ton",
    "alerts": ["Stumm", "Glocke", "Alarm", "Pfeife"],
    "vol": "Lautstärke",
    "vols": ["Leise", "Normal", "Laut", "Maximal (Katastrophe)"],
    "boomHint": "Die höchste Stufe soll bei einer Katastrophe weit entfernte Menschen erreichen. Lassen Sie sie nicht direkt am Ohr ertönen. Stellen Sie auch die Lautstärke des Handys hoch.",
    "bkHint": "Wenn Sie auf ein neues Handy wechseln, tippen Sie auf „Exportieren“, um eine Datei zu speichern, und tippen Sie dann auf dem neuen Handy auf „Importieren“.",
    "bkExport": "Exportieren",
    "bkImport": "Importieren",
    "exported": "Exportiert ✓",
    "imported": "Importiert ✓",
    "importFail": "Import fehlgeschlagen",
    "paperNote": "Sie können diese Karte zusammen mit der gedruckten Hilfekarte oder dem Hilfe-Symbol Ihrer Region verwenden.",
    "privacy": "Datenschutzerklärung",
    "credit": "App-Entwicklung: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Anleitung",
    "step": "{n} / {m}",
    "start": "Loslegen",
    "again": "Noch einmal ansehen",
    "prev": "Vorherige",
    "next": "Weiter",
    "heads": [
      "Willkommen bei MOSHIMO Card / Soyogi",
      "Zuerst die Karte unter „Eintragen“ anlegen",
      "Mit „🆘 Diese Karte zeigen“ zeigen",
      "Ton und Auffälligkeit",
      "Ihre Angaben bleiben auf diesem Gerät",
      "Besser lesbar machen und erneut ansehen"
    ],
    "bodies": [
      "Diese App ist eine Karte, die Sie im Notfall den Menschen um Sie herum zeigen.\nSie können Krankheiten, Ihre Medikamente, Allergien, einen Notfallkontakt und mehr eintragen.\nAuch wenn Sie etwas nicht mit Worten erklären können, genügt es, den Bildschirm zu zeigen.",
      "Tippen Sie unten auf „Eintragen“ und tragen Sie zum Beispiel Name, Blutgruppe, Ihre Medikamente und einen Notfallkontakt ein.\nSie müssen nicht alles ausfüllen. Schreiben Sie nur, was für Sie wichtig ist.\nWas Sie schreiben, wird sofort gespeichert. Wenn Sie auf „Speichern“ tippen, erscheint „Gespeichert ✓“.",
      "Im Notfall tippen Sie im Bereich „Karte“ auf „🆘 Diese Karte zeigen“. Ihre Angaben erscheinen in großer Schrift auf dem ganzen Bildschirm.\nSteht beim „Notfallkontakt“ eine Telefonnummer, erscheint „📞 Anrufen“, und Sie können direkt anrufen.\nMit „⟳ Drehen“ wird die Ansicht quer. Wenn Sie fertig sind, tippen Sie auf „Schließen“.",
      "Auf dem Zeige-Bildschirm tippen Sie auf „🔔 Ton abspielen“, damit Menschen in der Nähe auf Sie aufmerksam werden. „🔇 Ton stoppen“ beendet ihn.\nIn den „Einstellungen“ unter „Einstellungen zum Zeigen“ wählen Sie die „Auffälligkeit“ (Normal, Farben umkehren, Blinken, Farben umkehren + Blinken), den „Ton“ beim Zeigen und die „Lautstärke“.\nLassen Sie „Maximal (Katastrophe)“ nicht direkt am Ohr ertönen.",
      "Alles, was Sie schreiben, wird nur auf diesem Gerät gespeichert. Nichts wird gesendet, und eine Anmeldung ist nicht nötig.\nBeim Handywechsel tippen Sie in den „Einstellungen“ auf „Exportieren“, um eine Datei zu speichern, und auf dem neuen Handy auf „Importieren“.",
      "Unter „Alltägliche Einstellungen“ in den „Einstellungen“ ändern Sie „Schriftgröße“ (Normal, Groß, Sehr groß), „Farbe“ (Grün, Hellblau, Weiß, Schwarz), „Musik“ und „Tippton“.\nDie Sprache wählen Sie oben rechts mit 🌐.\nDiese Anleitung können Sie jederzeit mit „Noch einmal ansehen“ bei „Anleitung“ in den „Einstellungen“ erneut ansehen."
    ]
  }
};

/* ============ fr ============ */
var fr = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "En cas d'urgence, veuillez montrer cette carte." },
  "tab": { "card": "Carte", "edit": "Écrire", "set": "Réglages" },
  "home": {
    "show": "🆘 Montrer cette carte",
    "empty": "La carte est encore vide. Vous pouvez la remplir dans l'onglet « Écrire ».",
    "filled": "Éléments remplis : {n}"
  },
  "edit": {
    "allOptional": "Vous n'avez pas besoin de tout remplir. Notez seulement ce qui compte pour vous.",
    "name": "Nom",
    "blood": "Groupe sanguin",
    "cond": "Maladies / handicaps",
    "meds": "Médicaments que je prends",
    "allergy": "Allergies",
    "doctor": "Mon médecin / ma pharmacie",
    "trouble": "Ce qui me pose problème",
    "request": "Ce que j'aimerais que vous fassiez",
    "contact": "Contact d'urgence",
    "free": "Autres informations",
    "save": "Enregistrer",
    "saved": "Enregistré ✓",
    "saveFail": "Échec de l'enregistrement"
  },
  "show": {
    "head": "Ceci est ma carte MOSHIMO. Veuillez la lire.",
    "close": "Fermer",
    "empty": "Rien n'a encore été écrit",
    "rot": "⟳ Pivoter",
    "play": "🔔 Émettre un son",
    "stop": "🔇 Arrêter le son",
    "call": "📞 Appeler"
  },
  "set": {
    "hNormal": "Réglages habituels",
    "hShow": "Réglages pour montrer la carte",
    "hBackup": "Changement de téléphone (sauvegarde)",
    "fs": "Taille du texte",
    "fsSizes": ["Normale", "Grande", "Très grande"],
    "lang": "ことば / Language",
    "theme": "Couleur",
    "themes": ["Vert", "Bleu clair", "Blanc", "Noir"],
    "bgm": "Musique",
    "bgms": ["Aucune", "Son vert", "Son bleu"],
    "sound": "Son au toucher",
    "on": "ON", "off": "OFF",
    "fx": "Mise en évidence",
    "fxs": ["Normal", "Couleurs inversées", "Clignotement", "Couleurs inversées + clignotement"],
    "alert": "Son",
    "alerts": ["Silencieux", "Carillon", "Alarme", "Sifflet"],
    "vol": "Volume",
    "vols": ["Faible", "Normal", "Fort", "Maximum (catastrophe)"],
    "boomHint": "Le niveau maximum sert à alerter des personnes éloignées lors d'une catastrophe. Ne le faites pas retentir près des oreilles. Augmentez aussi le volume du téléphone.",
    "bkHint": "Pour passer à un nouveau téléphone, appuyez sur « Exporter » pour enregistrer un fichier, puis appuyez sur « Importer » sur le nouveau téléphone.",
    "bkExport": "Exporter",
    "bkImport": "Importer",
    "exported": "Exporté ✓",
    "imported": "Importé ✓",
    "importFail": "Échec de l'importation",
    "paperNote": "Vous pouvez l'utiliser avec la carte d'aide ou le pictogramme d'aide en papier de votre région.",
    "privacy": "Politique de confidentialité",
    "credit": "Développement de l'application : Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Mode d'emploi",
    "step": "{n} / {m}",
    "start": "Commencer",
    "again": "Revoir",
    "prev": "Précédent",
    "next": "Suivant",
    "heads": [
      "Bienvenue dans MOSHIMO Card / Soyogi",
      "D'abord, créez la carte dans « Écrire »",
      "Montrer avec « 🆘 Montrer cette carte »",
      "Son et mise en évidence",
      "Ce que vous écrivez reste sur cet appareil",
      "Mieux voir et revoir ce guide"
    ],
    "bodies": [
      "Cette application est une carte à montrer aux personnes autour de vous en cas d'urgence.\nVous pouvez y noter vos maladies, les médicaments que vous prenez, vos allergies, un contact d'urgence, etc.\nMême quand vous ne pouvez pas expliquer avec des mots, il suffit de montrer l'écran.",
      "Appuyez sur « Écrire » en bas et notez par exemple votre nom, votre groupe sanguin, vos médicaments et un contact d'urgence.\nVous n'avez pas besoin de tout remplir. Notez seulement ce qui compte pour vous.\nCe que vous écrivez est enregistré tout de suite. Si vous appuyez sur « Enregistrer », « Enregistré ✓ » s'affiche.",
      "En cas d'urgence, appuyez sur « 🆘 Montrer cette carte » dans l'écran « Carte ». Ce que vous avez écrit s'affiche en grands caractères sur tout l'écran.\nSi le « Contact d'urgence » contient un numéro de téléphone, « 📞 Appeler » apparaît et vous pouvez appeler directement.\n« ⟳ Pivoter » met l'affichage à l'horizontale. Quand vous avez fini, appuyez sur « Fermer ».",
      "Sur l'écran affiché, appuyez sur « 🔔 Émettre un son » pour que les personnes proches vous remarquent. « 🔇 Arrêter le son » l'arrête.\nDans « Réglages », sous « Réglages pour montrer la carte », vous choisissez la « Mise en évidence » (Normal, Couleurs inversées, Clignotement, Couleurs inversées + clignotement), le « Son » joué quand vous montrez la carte et le « Volume ».\nNe faites pas retentir « Maximum (catastrophe) » près des oreilles.",
      "Tout ce que vous écrivez est enregistré uniquement sur cet appareil. Rien n'est envoyé, et aucune inscription n'est nécessaire.\nPour changer de téléphone, appuyez sur « Exporter » dans « Réglages » pour enregistrer un fichier, puis sur « Importer » sur le nouveau téléphone.",
      "Dans « Réglages », sous « Réglages habituels », vous pouvez changer la « Taille du texte » (Normale, Grande, Très grande), la « Couleur » (Vert, Bleu clair, Blanc, Noir), la « Musique » et le « Son au toucher ».\nChoisissez la langue avec 🌐 en haut à droite.\nVous pouvez revoir ce guide à tout moment avec « Revoir », à la ligne « Mode d'emploi » des « Réglages »."
    ]
  }
};

/* ============ es ============ */
var es = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "En una emergencia, por favor muestre esta tarjeta." },
  "tab": { "card": "Tarjeta", "edit": "Escribir", "set": "Ajustes" },
  "home": {
    "show": "🆘 Mostrar esta tarjeta",
    "empty": "La tarjeta aún está vacía. Puede rellenarla en la pestaña «Escribir».",
    "filled": "Elementos rellenados: {n}"
  },
  "edit": {
    "allOptional": "No hace falta rellenarlo todo. Escriba solo lo que le importe.",
    "name": "Nombre",
    "blood": "Grupo sanguíneo",
    "cond": "Enfermedades / discapacidades",
    "meds": "Medicamentos que tomo",
    "allergy": "Alergias",
    "doctor": "Mi médico habitual / farmacia",
    "trouble": "Cosas que me cuestan",
    "request": "Lo que le pido que haga",
    "contact": "Contacto de emergencia",
    "free": "Otra información",
    "save": "Guardar",
    "saved": "Guardado ✓",
    "saveFail": "No se pudo guardar"
  },
  "show": {
    "head": "Esta es mi tarjeta MOSHIMO. Por favor, léala.",
    "close": "Cerrar",
    "empty": "Aún no hay nada escrito",
    "rot": "⟳ Girar",
    "play": "🔔 Reproducir sonido",
    "stop": "🔇 Detener sonido",
    "call": "📞 Llamar"
  },
  "set": {
    "hNormal": "Ajustes habituales",
    "hShow": "Ajustes para mostrar",
    "hBackup": "Cambio de teléfono (copia de seguridad)",
    "fs": "Tamaño del texto",
    "fsSizes": ["Normal", "Grande", "Muy grande"],
    "lang": "ことば / Language",
    "theme": "Color",
    "themes": ["Verde", "Celeste", "Blanco", "Negro"],
    "bgm": "Música",
    "bgms": ["Ninguna", "Tono verde", "Tono azul"],
    "sound": "Sonido al tocar",
    "on": "ON", "off": "OFF",
    "fx": "Forma de destacar",
    "fxs": ["Normal", "Colores invertidos", "Parpadeo", "Invertidos + parpadeo"],
    "alert": "Sonido",
    "alerts": ["Silencio", "Timbre", "Alarma", "Silbato"],
    "vol": "Volumen",
    "vols": ["Bajo", "Normal", "Alto", "Máximo (catástrofe)"],
    "boomHint": "El nivel máximo sirve para que le oigan personas lejanas en una catástrofe. No lo haga sonar cerca de los oídos. Suba también el volumen del teléfono.",
    "bkHint": "Al cambiar a un teléfono nuevo, toque «Exportar» para guardar un archivo y luego toque «Importar» en el teléfono nuevo.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "No se pudo importar",
    "paperNote": "Puede usarla junto con la tarjeta de ayuda o el distintivo de ayuda en papel de su localidad.",
    "privacy": "Política de privacidad",
    "credit": "Desarrollo de la app: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Cómo se usa",
    "step": "{n} / {m}",
    "start": "Empezar",
    "again": "Ver de nuevo",
    "prev": "Anterior",
    "next": "Siguiente",
    "heads": [
      "Le damos la bienvenida a MOSHIMO Card / Soyogi",
      "Primero, cree la tarjeta en «Escribir»",
      "Mostrar con «🆘 Mostrar esta tarjeta»",
      "Sonido y forma de destacar",
      "Lo que escribe se queda en este dispositivo",
      "Verlo mejor y volver a ver esta guía"
    ],
    "bodies": [
      "Esta app es una tarjeta para mostrar a las personas de su alrededor en una emergencia.\nPuede anotar sus enfermedades, los medicamentos que toma, alergias, un contacto de emergencia y más.\nAunque no pueda explicarlo con palabras, basta con mostrar la pantalla.",
      "Toque «Escribir» abajo y anote, por ejemplo, su nombre, su grupo sanguíneo, los medicamentos que toma y un contacto de emergencia.\nNo hace falta rellenarlo todo. Escriba solo lo que le importe.\nLo que escribe se guarda al momento. Al tocar «Guardar», aparece «Guardado ✓».",
      "En una emergencia, toque «🆘 Mostrar esta tarjeta» en la pantalla «Tarjeta». Lo que escribió aparece en letras grandes en toda la pantalla.\nSi el «Contacto de emergencia» tiene un número de teléfono, aparece «📞 Llamar» y puede llamar directamente.\n«⟳ Girar» pone la vista en horizontal. Cuando termine, toque «Cerrar».",
      "En la pantalla que muestra, toque «🔔 Reproducir sonido» para que las personas cercanas se den cuenta. «🔇 Detener sonido» lo para.\nEn «Ajustes», dentro de «Ajustes para mostrar», puede elegir la «Forma de destacar» (Normal, Colores invertidos, Parpadeo, Invertidos + parpadeo), el «Sonido» al mostrar y el «Volumen».\nNo haga sonar «Máximo (catástrofe)» cerca de los oídos.",
      "Todo lo que escribe se guarda solo en este dispositivo. No se envía nada y no hace falta registrarse.\nAl cambiar de teléfono, toque «Exportar» en «Ajustes» para guardar un archivo y luego «Importar» en el teléfono nuevo.",
      "En «Ajustes», dentro de «Ajustes habituales», puede cambiar el «Tamaño del texto» (Normal, Grande, Muy grande), el «Color» (Verde, Celeste, Blanco, Negro), la «Música» y el «Sonido al tocar».\nElija el idioma con 🌐 arriba a la derecha.\nPuede volver a ver esta guía cuando quiera con «Ver de nuevo», junto a «Cómo se usa» en «Ajustes»."
    ]
  }
};

/* ============ it ============ */
var it = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "In caso di emergenza, mostra questa scheda." },
  "tab": { "card": "Scheda", "edit": "Compila", "set": "Impostazioni" },
  "home": {
    "show": "🆘 Mostra questa scheda",
    "empty": "La scheda è ancora vuota. Puoi compilarla nella sezione \"Compila\".",
    "filled": "Voci compilate: {n}"
  },
  "edit": {
    "allOptional": "Non devi compilare tutto. Scrivi solo ciò che conta per te.",
    "name": "Nome",
    "blood": "Gruppo sanguigno",
    "cond": "Malattie / disabilità",
    "meds": "Farmaci che assumo",
    "allergy": "Allergie",
    "doctor": "Il mio medico / la mia farmacia",
    "trouble": "Cose che mi risultano difficili",
    "request": "Cosa vorrei che faceste",
    "contact": "Contatto di emergenza",
    "free": "Note libere",
    "save": "Salva",
    "saved": "Salvato ✓",
    "saveFail": "Impossibile salvare"
  },
  "show": {
    "head": "Questa è la mia MOSHIMO Card. Vi prego di leggerla.",
    "close": "Chiudi",
    "empty": "Non è ancora stato scritto nulla",
    "rot": "⟳ Ruota",
    "play": "🔔 Riproduci il suono",
    "stop": "🔇 Ferma il suono",
    "call": "📞 Chiama"
  },
  "set": {
    "hNormal": "Impostazioni abituali",
    "hShow": "Impostazioni per mostrare la scheda",
    "hBackup": "Cambio telefono (backup)",
    "fs": "Dimensione del testo",
    "fsSizes": ["Normale", "Grande", "Molto grande"],
    "lang": "ことば / Language",
    "theme": "Colore",
    "themes": ["Verde", "Azzurro", "Bianco", "Nero"],
    "bgm": "Musica",
    "bgms": ["Nessuna", "Tono verde", "Tono blu"],
    "sound": "Suono del tocco",
    "on": "ON", "off": "OFF",
    "fx": "Modalità di risalto",
    "fxs": ["Normale", "Colori invertiti", "Lampeggiante", "Colori invertiti + lampeggio"],
    "alert": "Suono",
    "alerts": ["Silenzioso", "Campanello", "Allarme", "Fischietto"],
    "vol": "Volume",
    "vols": ["Basso", "Normale", "Alto", "Massimo (catastrofe)"],
    "boomHint": "Il livello massimo serve a farsi sentire da persone lontane durante una catastrofe. Non farlo suonare vicino alle orecchie. Alza anche il volume del telefono.",
    "bkHint": "Quando passi a un nuovo telefono, tocca \"Esporta\" per salvare un file, poi tocca \"Importa\" sul nuovo telefono.",
    "bkExport": "Esporta",
    "bkImport": "Importa",
    "exported": "Esportato ✓",
    "imported": "Importato ✓",
    "importFail": "Impossibile importare",
    "paperNote": "Puoi usarla insieme alla scheda o al contrassegno cartaceo di assistenza della tua zona.",
    "privacy": "Informativa sulla privacy",
    "credit": "Sviluppo dell'app: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Come si usa",
    "step": "{n} / {m}",
    "start": "Inizia",
    "again": "Rivedi",
    "prev": "Prima",
    "next": "Avanti",
    "heads": [
      "Ti diamo il benvenuto in MOSHIMO Card / Soyogi",
      "Per prima cosa, crea la scheda in \"Compila\"",
      "Mostrala con \"🆘 Mostra questa scheda\"",
      "Suono e modalità di risalto",
      "Ciò che scrivi resta su questo dispositivo",
      "Vedere meglio e rivedere questa guida"
    ],
    "bodies": [
      "Questa app è una scheda da mostrare alle persone intorno a te in caso di emergenza.\nPuoi annotare malattie, farmaci che assumi, allergie, un contatto di emergenza e altro.\nAnche quando non riesci a spiegarlo a parole, basta mostrare lo schermo.",
      "Tocca \"Compila\" in basso e scrivi, per esempio, nome, gruppo sanguigno, i farmaci che assumi e un contatto di emergenza.\nNon devi compilare tutto. Scrivi solo ciò che conta per te.\nQuello che scrivi viene salvato subito. Toccando \"Salva\" appare \"Salvato ✓\".",
      "In caso di emergenza, tocca \"🆘 Mostra questa scheda\" nella schermata \"Scheda\". Ciò che hai scritto appare a caratteri grandi su tutto lo schermo.\nSe nel \"Contatto di emergenza\" c'è un numero di telefono, appare \"📞 Chiama\" e puoi chiamare subito.\n\"⟳ Ruota\" mette la vista in orizzontale. Quando hai finito, tocca \"Chiudi\".",
      "Nella schermata che mostri, tocca \"🔔 Riproduci il suono\" perché le persone vicine ti notino. \"🔇 Ferma il suono\" lo interrompe.\nIn \"Impostazioni\", sotto \"Impostazioni per mostrare la scheda\", scegli la \"Modalità di risalto\" (Normale, Colori invertiti, Lampeggiante, Colori invertiti + lampeggio), il \"Suono\" quando mostri la scheda e il \"Volume\".\nNon far suonare \"Massimo (catastrofe)\" vicino alle orecchie.",
      "Tutto ciò che scrivi viene salvato solo su questo dispositivo. Non viene inviato nulla e non serve registrarsi.\nQuando cambi telefono, tocca \"Esporta\" in \"Impostazioni\" per salvare un file, poi \"Importa\" sul nuovo telefono.",
      "In \"Impostazioni\", sotto \"Impostazioni abituali\", puoi cambiare \"Dimensione del testo\" (Normale, Grande, Molto grande), \"Colore\" (Verde, Azzurro, Bianco, Nero), \"Musica\" e \"Suono del tocco\".\nScegli la lingua con 🌐 in alto a destra.\nPuoi rivedere questa guida in qualsiasi momento con \"Rivedi\", accanto a \"Come si usa\" in \"Impostazioni\"."
    ]
  }
};

/* ============ pt ============ */
var pt = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "Em caso de emergência, mostre este cartão, por favor." },
  "tab": { "card": "Cartão", "edit": "Preencher", "set": "Ajustes" },
  "home": {
    "show": "🆘 Mostrar este cartão",
    "empty": "O cartão ainda está vazio. Pode criá-lo em «Preencher».",
    "filled": "Itens preenchidos: {n}"
  },
  "edit": {
    "allOptional": "Não precisa preencher tudo. Escreva apenas o que for importante para você.",
    "name": "Nome",
    "blood": "Tipo sanguíneo",
    "cond": "Doenças / deficiências",
    "meds": "Medicamentos que tomo",
    "allergy": "Alergias",
    "doctor": "Médico / farmácia habitual",
    "trouble": "Coisas que me são difíceis",
    "request": "O que gostaria de pedir",
    "contact": "Contato de emergência",
    "free": "Outras informações",
    "save": "Salvar",
    "saved": "Salvo ✓",
    "saveFail": "Não foi possível salvar"
  },
  "show": {
    "head": "Este é o meu Cartão MOSHIMO. Por favor, leia.",
    "close": "Fechar",
    "empty": "Ainda não há nada escrito",
    "rot": "⟳ Girar",
    "play": "🔔 Tocar som",
    "stop": "🔇 Parar som",
    "call": "📞 Ligar"
  },
  "set": {
    "hNormal": "Ajustes do dia a dia",
    "hShow": "Ajustes para mostrar o cartão",
    "hBackup": "Troca de telefone (backup)",
    "fs": "Tamanho do texto",
    "fsSizes": ["Normal", "Grande", "Muito grande"],
    "lang": "ことば / Language",
    "theme": "Cor",
    "themes": ["Verde", "Azul-claro", "Branco", "Preto"],
    "bgm": "Música",
    "bgms": ["Nenhuma", "Som verde", "Som azul"],
    "sound": "Som do toque",
    "on": "Ligado", "off": "Desligado",
    "fx": "Modo de destaque",
    "fxs": ["Normal", "Cores invertidas", "Intermitente", "Invertidas + intermitente"],
    "alert": "Som",
    "alerts": ["Sem som", "Sino", "Alarme", "Apito"],
    "vol": "Volume",
    "vols": ["Baixo", "Normal", "Alto", "Máximo (catástrofe)"],
    "boomHint": "O nível máximo serve para alcançar pessoas distantes em uma catástrofe. Não o toque perto dos ouvidos. Aumente também o volume do telefone.",
    "bkHint": "Ao mudar para um telefone novo, toque em «Exportar» para salvar um arquivo e, depois, toque em «Importar» no telefone novo.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "Não foi possível importar",
    "paperNote": "Pode usar isto junto com o cartão de ajuda em papel ou o símbolo de ajuda da sua região.",
    "privacy": "Política de Privacidade",
    "credit": "Desenvolvimento do app: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Como usar",
    "step": "{n} / {m}",
    "start": "Começar",
    "again": "Ver de novo",
    "prev": "Anterior",
    "next": "Próximo",
    "heads": [
      "Boas-vindas ao MOSHIMO Card / Soyogi",
      "Primeiro, crie o cartão em «Preencher»",
      "Mostrar com «🆘 Mostrar este cartão»",
      "Som e modo de destaque",
      "O que você escreve fica neste aparelho",
      "Ver melhor e rever este guia"
    ],
    "bodies": [
      "Este app é um cartão para mostrar às pessoas ao seu redor em uma emergência.\nVocê pode anotar doenças, os medicamentos que toma, alergias, um contato de emergência e mais.\nMesmo quando não conseguir explicar com palavras, basta mostrar a tela.",
      "Toque em «Preencher» embaixo e escreva, por exemplo, seu nome, tipo sanguíneo, os medicamentos que toma e um contato de emergência.\nNão precisa preencher tudo. Escreva apenas o que for importante para você.\nO que você escreve é salvo na hora. Ao tocar em «Salvar», aparece «Salvo ✓».",
      "Em uma emergência, toque em «🆘 Mostrar este cartão» na tela «Cartão». O que você escreveu aparece em letras grandes na tela inteira.\nSe o «Contato de emergência» tiver um número de telefone, aparece «📞 Ligar» e você pode ligar direto.\n«⟳ Girar» deixa a tela na horizontal. Quando terminar, toque em «Fechar».",
      "Na tela que você mostra, toque em «🔔 Tocar som» para que as pessoas por perto percebam. «🔇 Parar som» faz parar.\nEm «Ajustes», na parte «Ajustes para mostrar o cartão», você escolhe o «Modo de destaque» (Normal, Cores invertidas, Intermitente, Invertidas + intermitente), o «Som» ao mostrar e o «Volume».\nNão toque «Máximo (catástrofe)» perto dos ouvidos.",
      "Tudo o que você escreve fica salvo apenas neste aparelho. Nada é enviado e não é preciso cadastro.\nAo trocar de telefone, toque em «Exportar» em «Ajustes» para salvar um arquivo e depois em «Importar» no telefone novo.",
      "Em «Ajustes», na parte «Ajustes do dia a dia», você pode mudar o «Tamanho do texto» (Normal, Grande, Muito grande), a «Cor» (Verde, Azul-claro, Branco, Preto), a «Música» e o «Som do toque».\nEscolha o idioma com 🌐 no canto superior direito.\nVocê pode ver este guia de novo a qualquer momento com «Ver de novo», ao lado de «Como usar» em «Ajustes»."
    ]
  }
};

/* ============ nl ============ */
var nl = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "Laat deze kaart zien in geval van nood." },
  "tab": { "card": "Kaart", "edit": "Invullen", "set": "Instellingen" },
  "home": {
    "show": "🆘 Laat deze kaart zien",
    "empty": "De kaart is nog leeg. Je kunt hem invullen op het tabblad \"Invullen\".",
    "filled": "Ingevulde onderdelen: {n}"
  },
  "edit": {
    "allOptional": "Je hoeft niet alles in te vullen. Schrijf alleen wat voor jou belangrijk is.",
    "name": "Naam",
    "blood": "Bloedgroep",
    "cond": "Ziektes / beperkingen",
    "meds": "Medicijnen die ik gebruik",
    "allergy": "Allergieën",
    "doctor": "Mijn arts / apotheek",
    "trouble": "Waar ik moeite mee heb",
    "request": "Wat ik graag wil vragen",
    "contact": "Contactpersoon voor noodgevallen",
    "free": "Verder nog iets",
    "save": "Opslaan",
    "saved": "Opgeslagen ✓",
    "saveFail": "Opslaan mislukt"
  },
  "show": {
    "head": "Dit is mijn MOSHIMO Card. Lees dit alstublieft.",
    "close": "Sluiten",
    "empty": "Er is nog niets ingevuld",
    "rot": "⟳ Draaien",
    "play": "🔔 Geluid afspelen",
    "stop": "🔇 Geluid stoppen",
    "call": "📞 Bellen"
  },
  "set": {
    "hNormal": "Gewone instellingen",
    "hShow": "Instellingen voor het tonen",
    "hBackup": "Nieuwe telefoon (back-up)",
    "fs": "Tekstgrootte",
    "fsSizes": ["Normaal", "Groot", "Extra groot"],
    "lang": "ことば / Language",
    "theme": "Kleur",
    "themes": ["Groen", "Lichtblauw", "Wit", "Zwart"],
    "bgm": "Muziek",
    "bgms": ["Uit", "Groene klank", "Blauwe klank"],
    "sound": "Tikgeluid",
    "on": "AAN", "off": "UIT",
    "fx": "Opvallen",
    "fxs": ["Normaal", "Kleuren omkeren", "Knipperen", "Kleuren omkeren + knipperen"],
    "alert": "Geluid",
    "alerts": ["Geen geluid", "Belletje", "Alarm", "Fluitje"],
    "vol": "Volume",
    "vols": ["Zacht", "Normaal", "Hard", "Maximaal (ramp)"],
    "boomHint": "Het hoogste niveau is bedoeld om bij een ramp mensen ver weg te bereiken. Laat het niet vlak bij de oren klinken. Zet ook het volume van de telefoon hoog.",
    "bkHint": "Als je overstapt naar een nieuwe telefoon, tik dan op \"Exporteren\" om een bestand op te slaan. Tik daarna op de nieuwe telefoon op \"Importeren\".",
    "bkExport": "Exporteren",
    "bkImport": "Importeren",
    "exported": "Geëxporteerd ✓",
    "imported": "Geïmporteerd ✓",
    "importFail": "Importeren mislukt",
    "paperNote": "Je kunt dit samen gebruiken met de papieren hulpkaart of het hulpteken uit jouw regio.",
    "privacy": "Privacybeleid",
    "credit": "App-ontwikkeling: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Zo werkt het",
    "step": "{n} / {m}",
    "start": "Beginnen",
    "again": "Nog eens bekijken",
    "prev": "Vorige",
    "next": "Volgende",
    "heads": [
      "Welkom bij MOSHIMO Card / Soyogi",
      "Maak eerst je kaart bij \"Invullen\"",
      "Laten zien met \"🆘 Laat deze kaart zien\"",
      "Geluid en opvallen",
      "Wat je schrijft, blijft op dit apparaat",
      "Beter leesbaar maken en opnieuw bekijken"
    ],
    "bodies": [
      "Deze app is een kaart die je in geval van nood aan de mensen om je heen laat zien.\nJe kunt ziektes, medicijnen die je gebruikt, allergieën, een contactpersoon voor noodgevallen en meer invullen.\nOok als je het niet met woorden kunt uitleggen, is het scherm laten zien genoeg.",
      "Tik onderaan op \"Invullen\" en vul bijvoorbeeld je naam, bloedgroep, je medicijnen en een contactpersoon voor noodgevallen in.\nJe hoeft niet alles in te vullen. Schrijf alleen wat voor jou belangrijk is.\nWat je schrijft, wordt meteen opgeslagen. Als je op \"Opslaan\" tikt, verschijnt \"Opgeslagen ✓\".",
      "Tik in geval van nood op \"🆘 Laat deze kaart zien\" in het scherm \"Kaart\". Wat je hebt geschreven, verschijnt in grote letters over het hele scherm.\nStaat er bij \"Contactpersoon voor noodgevallen\" een telefoonnummer, dan verschijnt \"📞 Bellen\" en kun je direct bellen.\nMet \"⟳ Draaien\" zet je het beeld dwars. Ben je klaar, tik dan op \"Sluiten\".",
      "Tik op het getoonde scherm op \"🔔 Geluid afspelen\", zodat mensen in de buurt je opmerken. \"🔇 Geluid stoppen\" zet het uit.\nBij \"Instellingen\", onder \"Instellingen voor het tonen\", kies je \"Opvallen\" (Normaal, Kleuren omkeren, Knipperen, Kleuren omkeren + knipperen), het \"Geluid\" bij het tonen en het \"Volume\".\nLaat \"Maximaal (ramp)\" niet vlak bij iemands oren klinken.",
      "Alles wat je schrijft, wordt alleen op dit apparaat opgeslagen. Er wordt niets verzonden en je hoeft je niet te registreren.\nBij een nieuwe telefoon tik je bij \"Instellingen\" op \"Exporteren\" om een bestand op te slaan, en daarna op de nieuwe telefoon op \"Importeren\".",
      "Bij \"Instellingen\", onder \"Gewone instellingen\", kun je \"Tekstgrootte\" (Normaal, Groot, Extra groot), \"Kleur\" (Groen, Lichtblauw, Wit, Zwart), \"Muziek\" en \"Tikgeluid\" wijzigen.\nKies de taal met 🌐 rechtsboven.\nDeze uitleg kun je altijd opnieuw bekijken met \"Nog eens bekijken\" bij \"Zo werkt het\" in \"Instellingen\"."
    ]
  }
};

/* ============ sv ============ */
var sv = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "Om något händer, visa det här kortet." },
  "tab": { "card": "Kort", "edit": "Skriv", "set": "Inställningar" },
  "home": {
    "show": "🆘 Visa det här kortet",
    "empty": "Kortet är fortfarande tomt. Du kan fylla i det under fliken \"Skriv\".",
    "filled": "Ifyllda uppgifter: {n}"
  },
  "edit": {
    "allOptional": "Du behöver inte fylla i allt. Skriv bara det som är viktigt för dig.",
    "name": "Namn",
    "blood": "Blodgrupp",
    "cond": "Sjukdomar / funktionsnedsättningar",
    "meds": "Läkemedel jag tar",
    "allergy": "Allergier",
    "doctor": "Min läkare / mitt apotek",
    "trouble": "Saker jag har svårt för",
    "request": "Vad jag vill be dig om",
    "contact": "Kontakt vid nödfall",
    "free": "Övrigt",
    "save": "Spara",
    "saved": "Sparat ✓",
    "saveFail": "Det gick inte att spara"
  },
  "show": {
    "head": "Det här är mitt MOSHIMO Card. Läs det, tack.",
    "close": "Stäng",
    "empty": "Inget är skrivet än",
    "rot": "⟳ Vrid",
    "play": "🔔 Spela ljud",
    "stop": "🔇 Stoppa ljud",
    "call": "📞 Ring"
  },
  "set": {
    "hNormal": "Vanliga inställningar",
    "hShow": "Inställningar för att visa",
    "hBackup": "Byta telefon (säkerhetskopia)",
    "fs": "Textstorlek",
    "fsSizes": ["Normal", "Stor", "Mycket stor"],
    "lang": "ことば / Language",
    "theme": "Färg",
    "themes": ["Grön", "Ljusblå", "Vit", "Svart"],
    "bgm": "Musik",
    "bgms": ["Av", "Grön ton", "Blå ton"],
    "sound": "Tryckljud",
    "on": "PÅ", "off": "AV",
    "fx": "Synlighet",
    "fxs": ["Normal", "Omvända färger", "Blinkande", "Omvända färger + blinkande"],
    "alert": "Ljud",
    "alerts": ["Tyst", "Klockspel", "Alarm", "Visselpipa"],
    "vol": "Volym",
    "vols": ["Låg", "Normal", "Hög", "Maximalt (katastrof)"],
    "boomHint": "Den högsta nivån är till för att nå personer långt bort vid en katastrof. Låt den inte ljuda nära öronen. Höj även telefonens egen volym.",
    "bkHint": "När du byter till en ny telefon: tryck på \"Exportera\" för att spara en fil, och tryck sedan på \"Importera\" på den nya telefonen.",
    "bkExport": "Exportera",
    "bkImport": "Importera",
    "exported": "Exporterat ✓",
    "imported": "Importerat ✓",
    "importFail": "Det gick inte att importera",
    "paperNote": "Du kan använda den tillsammans med ett hjälpkort eller en hjälpmärkning i pappersform från din kommun.",
    "privacy": "Integritetspolicy",
    "credit": "Apputveckling: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "Så används appen",
    "step": "{n} / {m}",
    "start": "Börja",
    "again": "Visa igen",
    "prev": "Föregående",
    "next": "Nästa",
    "heads": [
      "Välkommen till MOSHIMO Card / Soyogi",
      "Gör först ditt kort under \"Skriv\"",
      "Visa med \"🆘 Visa det här kortet\"",
      "Ljud och synlighet",
      "Det du skriver stannar på den här enheten",
      "Gör det lättare att se och visa igen"
    ],
    "bodies": [
      "Den här appen är ett kort som du visar för personer omkring dig om något händer.\nDu kan skriva in sjukdomar, läkemedel du tar, allergier, en kontakt vid nödfall och mer.\nÄven när du inte kan förklara med ord räcker det att visa skärmen.",
      "Tryck på \"Skriv\" längst ner och fyll i till exempel namn, blodgrupp, dina läkemedel och en kontakt vid nödfall.\nDu behöver inte fylla i allt. Skriv bara det som är viktigt för dig.\nDet du skriver sparas direkt. När du trycker på \"Spara\" visas \"Sparat ✓\".",
      "Om något händer trycker du på \"🆘 Visa det här kortet\" på skärmen \"Kort\". Det du har skrivit visas med stor text över hela skärmen.\nOm det finns ett telefonnummer under \"Kontakt vid nödfall\" visas \"📞 Ring\", så att du kan ringa direkt.\n\"⟳ Vrid\" vänder bilden på tvären. När du är klar trycker du på \"Stäng\".",
      "På skärmen du visar trycker du på \"🔔 Spela ljud\" så att personer i närheten märker dig. \"🔇 Stoppa ljud\" stänger av det.\nUnder \"Inställningar\", i delen \"Inställningar för att visa\", väljer du \"Synlighet\" (Normal, Omvända färger, Blinkande, Omvända färger + blinkande), vilket \"Ljud\" som spelas när du visar kortet och \"Volym\".\nSpela inte \"Maximalt (katastrof)\" nära någons öron.",
      "Allt du skriver sparas bara på den här enheten. Inget skickas någonstans och ingen registrering behövs.\nNär du byter telefon trycker du på \"Exportera\" under \"Inställningar\" för att spara en fil, och sedan på \"Importera\" på den nya telefonen.",
      "Under \"Inställningar\", i delen \"Vanliga inställningar\", kan du ändra \"Textstorlek\" (Normal, Stor, Mycket stor), \"Färg\" (Grön, Ljusblå, Vit, Svart), \"Musik\" och \"Tryckljud\".\nVälj språk med 🌐 uppe till höger.\nDen här guiden kan du se igen när som helst med \"Visa igen\" vid \"Så används appen\" under \"Inställningar\"."
    ]
  }
};

/* ============ ko ============ */
var ko = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "위급할 때는 이것을 보여 주세요." },
  "tab": { "card": "카드", "edit": "작성", "set": "설정" },
  "home": {
    "show": "🆘 이것을 보여 주기",
    "empty": "아직 카드가 비어 있어요. \"작성\"에서 만들 수 있어요.",
    "filled": "적힌 항목: {n}개"
  },
  "edit": {
    "allOptional": "모두 적지 않아도 괜찮아요. 필요한 것만 적어 주세요.",
    "name": "이름",
    "blood": "혈액형",
    "cond": "질병 · 장애",
    "meds": "복용 중인 약",
    "allergy": "알레르기",
    "doctor": "단골 병원 · 약국",
    "trouble": "힘든 것 · 곤란한 것",
    "request": "부탁하고 싶은 것",
    "contact": "긴급 연락처",
    "free": "자유롭게 적는 곳",
    "save": "저장하기",
    "saved": "저장했어요 ✓",
    "saveFail": "저장하지 못했어요"
  },
  "show": {
    "head": "이것은 저의 \"모시모 카드\"입니다. 읽어 주세요.",
    "close": "닫기",
    "empty": "아직 아무것도 적혀 있지 않아요",
    "rot": "⟳ 가로 보기",
    "play": "🔔 소리 내기",
    "stop": "🔇 소리 멈추기",
    "call": "📞 전화하기"
  },
  "set": {
    "hNormal": "평소 설정",
    "hShow": "보여 줄 때 설정",
    "hBackup": "기기 변경 (백업)",
    "fs": "글자 크기",
    "fsSizes": ["보통", "크게", "아주 크게"],
    "lang": "ことば / Language",
    "theme": "색",
    "themes": ["초록", "하늘색", "흰색", "검정"],
    "bgm": "배경 음악",
    "bgms": ["없음", "초록 소리", "파랑 소리"],
    "sound": "탭 소리",
    "on": "ON", "off": "OFF",
    "fx": "눈에 띄는 방식",
    "fxs": ["보통", "색 반전", "깜빡임", "색 반전+깜빡임"],
    "alert": "소리",
    "alerts": ["안 울림", "차임", "알람", "호루라기"],
    "vol": "소리 크기",
    "vols": ["작게", "보통", "크게", "최대 (재난용)"],
    "boomHint": "최대 음량은 재난 때 멀리 있는 사람이 알아차리도록 하기 위한 소리입니다. 귀 가까이에서 울리지 마세요. 휴대전화 자체의 음량도 크게 해 주세요.",
    "bkHint": "새 스마트폰으로 옮길 때는 \"내보내기\"로 파일을 저장하고, 새 스마트폰에서 \"불러오기\"를 눌러 주세요.",
    "bkExport": "내보내기",
    "bkImport": "불러오기",
    "exported": "내보냈어요 ✓",
    "imported": "불러왔어요 ✓",
    "importFail": "불러오지 못했어요",
    "paperNote": "사시는 지역의 종이 도움 카드 · 도움 마크와 함께 사용할 수 있어요.",
    "privacy": "개인정보 처리방침",
    "credit": "앱 개발: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "사용 방법",
    "step": "{n} / {m}",
    "start": "시작하기",
    "again": "다시 보기",
    "prev": "이전",
    "next": "다음",
    "heads": [
      "MOSHIMO Card / Soyogi에 오신 것을 환영해요",
      "먼저 \"작성\"에서 카드를 만들어요",
      "\"🆘 이것을 보여 주기\"로 보여 줘요",
      "소리와 눈에 띄는 방식",
      "적은 내용은 이 기기 안에만 있어요",
      "보기 쉽게 하기 · 다시 보기"
    ],
    "bodies": [
      "이 앱은 위급할 때 주변 사람에게 보여 주는 카드예요.\n질병, 복용 중인 약, 알레르기, 긴급 연락처 등을 적어 둘 수 있어요.\n말로 설명하기 어려울 때도 화면을 보여 주면 전해져요.",
      "아래의 \"작성\"을 누르고 이름, 혈액형, 복용 중인 약, 긴급 연락처 등을 적어요.\n모두 적지 않아도 괜찮아요. 필요한 것만 적어 주세요.\n적은 내용은 바로 저장돼요. \"저장하기\"를 누르면 \"저장했어요 ✓\"가 나와요.",
      "위급할 때는 \"카드\" 화면에서 \"🆘 이것을 보여 주기\"를 눌러요. 적은 내용이 화면 가득 큰 글자로 나와요.\n\"긴급 연락처\"에 전화번호가 있으면 \"📞 전화하기\"가 나와서 바로 전화를 걸 수 있어요.\n\"⟳ 가로 보기\"로 화면을 가로로 볼 수 있어요. 다 보여 주었으면 \"닫기\"를 눌러요.",
      "보여 주는 화면에서 \"🔔 소리 내기\"를 누르면 주변 사람이 알아차리도록 소리가 나요. \"🔇 소리 멈추기\"로 멈춰요.\n\"설정\"의 \"보여 줄 때 설정\"에서 \"눈에 띄는 방식\"(보통, 색 반전, 깜빡임, 색 반전+깜빡임), 보여 줄 때 울릴 \"소리\", \"소리 크기\"를 고를 수 있어요.\n\"최대 (재난용)\"은 귀 가까이에서 울리지 마세요.",
      "적은 내용은 모두 이 기기 안에만 저장되고, 어디에도 보내지지 않아요. 가입도 필요 없어요.\n스마트폰을 바꿀 때는 \"설정\"의 \"내보내기\"로 파일을 저장하고, 새 스마트폰에서 \"불러오기\"를 눌러요.",
      "\"설정\"의 \"평소 설정\"에서 \"글자 크기\"(보통, 크게, 아주 크게), \"색\"(초록, 하늘색, 흰색, 검정), \"배경 음악\", \"탭 소리\"를 바꿀 수 있어요.\n언어는 오른쪽 위의 🌐에서 고를 수 있어요.\n이 안내는 \"설정\"의 \"사용 방법\" 옆 \"다시 보기\"로 언제든지 다시 볼 수 있어요."
    ]
  }
};

/* ============ zh(简体中文) ============ */
var zh = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "遇到紧急情况时，请出示这张卡片。" },
  "tab": { "card": "卡片", "edit": "填写", "set": "设置" },
  "home": {
    "show": "🆘 出示这张卡片",
    "empty": "卡片还是空的。可以在“填写”里创建。",
    "filled": "已填写的内容：{n} 项"
  },
  "edit": {
    "allOptional": "不必全部填写。只写对您重要的部分就好。",
    "name": "姓名",
    "blood": "血型",
    "cond": "疾病、残障",
    "meds": "正在服用的药",
    "allergy": "过敏",
    "doctor": "常去的医院、药店",
    "trouble": "不擅长的事、感到困扰的事",
    "request": "想拜托的事",
    "contact": "紧急联系人",
    "free": "自由填写",
    "save": "保存",
    "saved": "已保存 ✓",
    "saveFail": "无法保存"
  },
  "show": {
    "head": "这是我的“紧急卡片”。请读一读。",
    "close": "关闭",
    "empty": "还没有写任何内容",
    "rot": "⟳ 横向",
    "play": "🔔 播放声音",
    "stop": "🔇 停止声音",
    "call": "📞 拨打电话"
  },
  "set": {
    "hNormal": "平时的设置",
    "hShow": "出示时的设置",
    "hBackup": "更换手机（备份）",
    "fs": "文字大小",
    "fsSizes": ["普通", "大", "非常大"],
    "lang": "ことば / Language",
    "theme": "颜色",
    "themes": ["绿色", "水蓝色", "白色", "黑色"],
    "bgm": "背景音乐",
    "bgms": ["无", "绿之音", "蓝之音"],
    "sound": "点按音",
    "on": "开", "off": "关",
    "fx": "醒目方式",
    "fxs": ["普通", "反转颜色", "闪烁", "反转颜色+闪烁"],
    "alert": "声音",
    "alerts": ["不响", "门铃声", "警报声", "哨声"],
    "vol": "声音大小",
    "vols": ["小", "普通", "大", "最大音量(灾害用)"],
    "boomHint": "最大音量是为了在灾害时让远处的人察觉。请不要在耳边鸣响。也请把手机本身的音量调大。",
    "bkHint": "换新手机时，请用“导出”保存文件，然后在新手机上按“导入”。",
    "bkExport": "导出",
    "bkImport": "导入",
    "exported": "已导出 ✓",
    "imported": "已导入 ✓",
    "importFail": "无法导入",
    "paperNote": "可以和您所在地区发放的纸质帮助卡、帮助标志一起使用。",
    "privacy": "隐私政策",
    "credit": "应用开发：护理与支援咨询处 Soyogi / SOYOGI"
  },
  "guide": {
    "title": "使用方法",
    "step": "{n} / {m}",
    "start": "开始",
    "again": "再看一次",
    "prev": "上一步",
    "next": "下一步",
    "heads": [
      "欢迎使用 MOSHIMO Card / Soyogi",
      "先在“填写”里制作卡片",
      "用“🆘 出示这张卡片”出示",
      "声音和醒目方式",
      "写下的内容只保存在这台设备里",
      "调整显示方式・再看一次"
    ],
    "bodies": [
      "这个应用是一张在紧急时刻出示给周围人看的卡片。\n可以写下疾病、正在服用的药、过敏、紧急联系人等。\n即使无法用语言说明，只要出示画面就能传达。",
      "点按下方的“填写”，写下姓名、血型、正在服用的药、紧急联系人等。\n不必全部填写。只写对您重要的部分就好。\n写下的内容会立即保存。点按“保存”后会显示“已保存 ✓”。",
      "遇到紧急情况时，在“卡片”画面点按“🆘 出示这张卡片”。写下的内容会以大字显示在整个画面上。\n如果“紧急联系人”里有电话号码，会出现“📞 拨打电话”，可以直接打电话。\n“⟳ 横向”可以把画面横过来。出示完毕后点按“关闭”。",
      "在出示的画面上点按“🔔 播放声音”，就会发出让周围人注意到的声音。点按“🔇 停止声音”即可停止。\n在“设置”的“出示时的设置”中，可以选择“醒目方式”（普通、反转颜色、闪烁、反转颜色+闪烁）、出示时播放的“声音”和“声音大小”。\n请不要在耳边播放“最大音量(灾害用)”。",
      "写下的内容只保存在这台设备里，不会发送到任何地方，也不需要注册。\n更换手机时，请在“设置”中点按“导出”保存文件，再在新手机上点按“导入”。",
      "在“设置”的“平时的设置”中，可以更改“文字大小”（普通、大、非常大）、“颜色”（绿色、水蓝色、白色、黑色）、“背景音乐”和“点按音”。\n语言可以用右上角的 🌐 选择。\n在“设置”中“使用方法”一行点按“再看一次”，随时可以再次查看本说明。"
    ]
  }
};

/* ============ ar(العربية・RTL) ============ */
var ar = {
  "app": { "name": "MOSHIMO Card / Soyogi", "tagline": "عند الطوارئ، من فضلك أظهر هذه البطاقة." },
  "tab": { "card": "البطاقة", "edit": "الكتابة", "set": "الإعدادات" },
  "home": {
    "show": "🆘 أظهر هذه البطاقة",
    "empty": "البطاقة ما زالت فارغة. يمكنك تعبئتها من تبويب «الكتابة».",
    "filled": "العناصر المكتوبة: {n}"
  },
  "edit": {
    "allOptional": "لا حاجة لتعبئة كل شيء. اكتب فقط ما يهمّك.",
    "name": "الاسم",
    "blood": "فصيلة الدم",
    "cond": "الأمراض / الإعاقات",
    "meds": "الأدوية التي أتناولها",
    "allergy": "الحساسية",
    "doctor": "الطبيب والصيدلية المعتادان",
    "trouble": "الأمور الصعبة عليّ",
    "request": "ما أرجو منك فعله",
    "contact": "جهة الاتصال في الطوارئ",
    "free": "كتابة حرة",
    "save": "حفظ",
    "saved": "تم الحفظ ✓",
    "saveFail": "تعذّر الحفظ"
  },
  "show": {
    "head": "هذه هي بطاقتي «MOSHIMO Card». أرجو قراءتها.",
    "close": "إغلاق",
    "empty": "لم تُكتب أي معلومات بعد",
    "rot": "⟳ تدوير",
    "play": "🔔 تشغيل الصوت",
    "stop": "🔇 إيقاف الصوت",
    "call": "📞 اتصال"
  },
  "set": {
    "hNormal": "الإعدادات اليومية",
    "hShow": "إعدادات العرض",
    "hBackup": "تغيير الهاتف (نسخة احتياطية)",
    "fs": "حجم الخط",
    "fsSizes": ["عادي", "كبير", "كبير جدًا"],
    "lang": "ことば / Language",
    "theme": "اللون",
    "themes": ["أخضر", "سماوي", "أبيض", "أسود"],
    "bgm": "الموسيقى",
    "bgms": ["بدون", "نغمة خضراء", "نغمة زرقاء"],
    "sound": "صوت اللمس",
    "on": "تشغيل", "off": "إيقاف",
    "fx": "طريقة لفت الانتباه",
    "fxs": ["عادي", "ألوان معكوسة", "وميض", "ألوان معكوسة + وميض"],
    "alert": "الصوت",
    "alerts": ["بلا صوت", "جرس", "إنذار", "صافرة"],
    "vol": "مستوى الصوت",
    "vols": ["منخفض", "عادي", "مرتفع", "أقصى (للكوارث)"],
    "boomHint": "أعلى مستوى مخصص لتنبيه من هم بعيدون أثناء الكوارث. لا تشغّله قرب الأذن. ارفع أيضًا مستوى صوت الهاتف نفسه.",
    "bkHint": "عند الانتقال إلى هاتف جديد، اضغط «تصدير» لحفظ ملف، ثم اضغط «استيراد» في الهاتف الجديد.",
    "bkExport": "تصدير",
    "bkImport": "استيراد",
    "exported": "تم التصدير ✓",
    "imported": "تم الاستيراد ✓",
    "importFail": "تعذّر الاستيراد",
    "paperNote": "يمكنك استخدامها مع بطاقة المساعدة الورقية أو شارة المساعدة الخاصة بمنطقتك.",
    "privacy": "سياسة الخصوصية",
    "credit": "تطوير التطبيق: Soyogi / SOYOGI"
  },
  "guide": {
    "title": "طريقة الاستخدام",
    "step": "{n} / {m}",
    "start": "ابدأ",
    "again": "عرض مرة أخرى",
    "prev": "السابق",
    "next": "التالي",
    "heads": [
      "مرحبًا بك في MOSHIMO Card / Soyogi",
      "أولًا، أنشئ بطاقتك من «الكتابة»",
      "أظهرها بزر «🆘 أظهر هذه البطاقة»",
      "الصوت وطريقة لفت الانتباه",
      "ما تكتبه يبقى على هذا الجهاز",
      "اجعل العرض أوضح، وشاهد الدليل مرة أخرى"
    ],
    "bodies": [
      "هذا التطبيق بطاقة تُظهرها لمن حولك عند الطوارئ.\nيمكنك أن تكتب فيها الأمراض والأدوية التي تتناولها والحساسية وجهة الاتصال في الطوارئ وغير ذلك.\nحتى إن لم تستطع الشرح بالكلام، يكفي أن تُظهر الشاشة.",
      "اضغط «الكتابة» في الأسفل واكتب مثلًا اسمك وفصيلة دمك والأدوية التي تتناولها وجهة الاتصال في الطوارئ.\nلا حاجة لتعبئة كل شيء. اكتب فقط ما يهمّك.\nما تكتبه يُحفظ فورًا. عند الضغط على «حفظ» تظهر «تم الحفظ ✓».",
      "عند الطوارئ اضغط «🆘 أظهر هذه البطاقة» في شاشة «البطاقة». يظهر ما كتبته بخط كبير على الشاشة كلها.\nإذا كان في «جهة الاتصال في الطوارئ» رقم هاتف، يظهر زر «📞 اتصال» لتتصل مباشرة.\nزر «⟳ تدوير» يجعل العرض أفقيًا. عند الانتهاء اضغط «إغلاق».",
      "في شاشة العرض اضغط «🔔 تشغيل الصوت» ليصدر صوت ينبّه من حولك، وزر «🔇 إيقاف الصوت» يوقفه.\nفي «الإعدادات» ضمن «إعدادات العرض» تختار «طريقة لفت الانتباه» (عادي، ألوان معكوسة، وميض، ألوان معكوسة + وميض)، و«الصوت» الذي يُشغَّل عند العرض، و«مستوى الصوت».\nلا تشغّل «أقصى (للكوارث)» قرب أذن أحد.",
      "كل ما تكتبه يُحفظ على هذا الجهاز فقط، ولا يُرسل إلى أي مكان، ولا حاجة للتسجيل.\nعند تغيير الهاتف اضغط «تصدير» في «الإعدادات» لحفظ ملف، ثم اضغط «استيراد» في الهاتف الجديد.",
      "في «الإعدادات» ضمن «الإعدادات اليومية» يمكنك تغيير «حجم الخط» (عادي، كبير، كبير جدًا) و«اللون» (أخضر، سماوي، أبيض، أسود) و«الموسيقى» و«صوت اللمس».\nاختر اللغة من 🌐 في أعلى الشاشة.\nيمكنك مشاهدة هذا الدليل مرة أخرى في أي وقت بزر «عرض مرة أخرى» بجانب «طريقة الاستخدام» في «الإعدادات»."
    ]
  }
};

window.MOSHIMO_I18N = { ja:ja, en:en, de:de, fr:fr, es:es, it:it, pt:pt, nl:nl, sv:sv, ko:ko, zh:zh, ar:ar };

})();
