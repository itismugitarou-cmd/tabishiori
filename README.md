# たびしおり

出発地・行き先・泊数と好み(ペース、興味、予算)を入れると、定番と穴場をまぜた旅程表を3パターン作る旅行プランナー。サーバー不要の静的サイト(GitHub Pages: main の `/docs`)。

公開URL: https://itismugitarou-cmd.github.io/tabishiori/ (英語版: https://itismugitarou-cmd.github.io/tabishiori/en/)

## 構成
- `src/` … 編集するのはここ
  - `head.html` / `body.html` … 見た目とフォーム(英語版のフォームは `body.en.html`)
  - `app.js` … プラン生成と画面
  - `data.js` … 13都市のおすすめスポット(手書き)
  - `munis.js` … 全国1,914の市区町村と代表座標(`tools/build_munis.py` で生成。元データは geolonia/japanese-addresses)
  - `en.js` … 英語版の文言と訳。13都市のスポットの英訳、市区町村の英語名(よみがなからローマ字に変換)。英語ページでだけ読み込む
  - `icon.svg` / `og.png` … ファビコンとSNS共有用の画像
  - `affiliate.js` … 予約リンクの設定。**アフィリエイトIDはここに入れる**
- `node tools/build.mjs` … `docs/` を作り直す(日本語版と `docs/en/` の英語版それぞれのトップ、都道府県47ページ、市区町村ごとのモデルコースページ、プライバシーポリシー。日英を hreflang で結んだ sitemap.xml と robots.txt)と、プレビュー用の `artifact.html`
- `data.js` のスポットを足したり変えたりしたら、`en.js` の `DESTS_EN` にも同じ順番で英訳を足す(数がずれるとビルドが止まる)

登録外の市区町村は、ブラウザから Wikipedia の位置検索と閲覧数で「定番」「穴場」を判定する(小さな町は隣の市町村まで広げる)。天気予報は Open-Meteo。

## 公開後にやること
- Google Search Console にサイトを登録し、`sitemap.xml` を送信する
- 楽天アフィリエイト・Booking.com のIDを `src/affiliate.js` に入れて `node tools/build.mjs`
