# たびしおり

出発地・行き先・泊数と好み(ペース、興味、予算)を入れると、定番と穴場をまぜた旅程表を3パターン作る旅行プランナー。サーバー不要の静的サイト(GitHub Pages: main の `/docs`)。

公開URL: https://itismugitarou-cmd.github.io/tabishiori/

## 構成
- `src/` … 編集するのはここ
  - `head.html` / `body.html` … 見た目とフォーム
  - `app.js` … プラン生成と画面
  - `data.js` … 13都市のおすすめスポット(手書き)
  - `munis.js` … 全国1,914の市区町村と代表座標(`tools/build_munis.py` で生成。元データは geolonia/japanese-addresses)
  - `affiliate.js` … 予約リンクの設定。**アフィリエイトIDはここに入れる**
- `node tools/build.mjs` … `docs/` を作り直す(トップ、都道府県47ページ、市区町村ごとのモデルコースページ、sitemap.xml、robots.txt、プライバシーポリシー)と、プレビュー用の `artifact.html`

登録外の市区町村は、ブラウザから Wikipedia の位置検索と閲覧数で「定番」「穴場」を判定する(小さな町は隣の市町村まで広げる)。天気予報は Open-Meteo。

## 公開後にやること
- Google Search Console にサイトを登録し、`sitemap.xml` を送信する
- 楽天アフィリエイト・Booking.com のIDを `src/affiliate.js` に入れて `node tools/build.mjs`
