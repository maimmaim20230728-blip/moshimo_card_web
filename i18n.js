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
  }
};

window.MOSHIMO_I18N = { ja:ja, en:en, de:de, fr:fr, es:es, it:it, pt:pt, nl:nl, sv:sv, ko:ko, zh:zh, ar:ar };

})();
