# もしもカード・そよぎ (web公開側)

もしもの時に見せる、緊急時の意思表示カード。
タグライン「もしもの時は、これを見せてください。」

- この repo は **Vercel 公開 + Farcaster Mini App 用(public)**
- 開発の正本は private の `moshimo_card` (Play/Capacitor側)。変更はまず本体側で行い、共通ファイル(style.css / app.js / i18n.js / tap.js / audio.js / manifest.json / sw.js / icons)をこちらへ手動同期する
- 🔴 **index.html だけは同期しない**。こちらの index.html には fc:miniapp / fc:frame メタと esm.sh の SDK 読み込みがあり、Play側には絶対に入れない(審査対策)。本体側で index.html を変えたら、こちらへは差分を手で移す

## TODO

- icons/fc-card-3x2.png (Farcaster埋め込みカード 3:2) 未作成。それまで OG/fc の imageUrl はリンク切れ
- .well-known/farcaster.json の accountAssociation が未署名(空)。Vercel 公開後にヒロさんが既存7本と同じ手順で署名する
- URL は https://moshimo-card-web.vercel.app/ を仮置き。Vercel のプロジェクト名確定後、index.html と farcaster.json の URL を一括置換する

## 開発

```
node serve.js   … http://localhost:3081
node _smoke.js  … 疑似DOMスモーク
node _check.js  … 禁句・整合チェック
```
