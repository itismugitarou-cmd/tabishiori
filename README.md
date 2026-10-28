# たびしおり

出発地・行き先・泊数と好み(ペース、興味、予算)を入れると、定番と穴場をまぜた旅程表を3パターン作る旅行プランナー。サーバー不要の静的サイト。

- `src/` … 編集するのはここ(head.html / body.html / data.js / app.js)
- `sh build.sh` … `docs/index.html`(GitHub Pages 用)と `artifact.html`(プレビュー用)を作る
- 行き先・出発地は全国1,914の市区町村から検索(`src/munis.js`、`python3 tools/build_munis.py latest.csv src/munis.js` で再生成。元データは geolonia/japanese-addresses)
- 13都市は手書きのおすすめスポット(`src/data.js`)、それ以外の市区町村は Wikipedia の位置検索と閲覧数で定番/穴場を判定(小さな町は隣の市町村まで広げる)
- 天気予報は Open-Meteo(APIキー不要)

## 公開(GitHub Pages)
Settings → Pages → Branch: `main` / フォルダ: `/docs` を選んで保存。
