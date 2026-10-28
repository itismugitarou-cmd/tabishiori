// src/ から公開用の docs/ とプレビュー用の artifact.html を作る
//   node tools/build.mjs
// docs/ には トップ・都道府県ページ・市区町村ごとのモデルコースページ・sitemap.xml を出力する
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const BASE = 'https://itismugitarou-cmd.github.io/tabishiori/';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const write = (f, s) => { const p = path.join(root, f); fs.mkdirSync(path.dirname(p), {recursive: true}); fs.writeFileSync(p, s); };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

const head = read('src/head.html'), body = read('src/body.html');
const js = ['src/munis.js', 'src/data.js', 'src/affiliate.js', 'src/app.js'].map(read).join('\n');

// プレビュー用: すべてインライン
write('artifact.html', `${head}${body}<script>\n${js}</script>\n`);

// データを読み込む(app.js は DOM が要るので読まない)
const ctx = {};
vm.createContext(ctx);
vm.runInContext(read('src/munis.js') + read('src/data.js') + ';globalThis.MUNIS=MUNIS;globalThis.DESTS=DESTS;globalThis.PREFS=PREFS;', ctx);
const {MUNIS, DESTS, PREFS} = ctx;
const curatedFor = m => DESTS.find(d => d.muni === '東京23区' ? (m.pref === '東京都' && /^131\d\d$/.test(m.code)) : m.name.startsWith(d.muni)) || null;
const km = (a, b) => { const r = x => x * Math.PI / 180; const x = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
const prefNo = p => String(PREFS.indexOf(p) + 1).padStart(2, '0');

// 共通部品
const style = head.match(/<style>([\s\S]*?)<\/style>/)[1];
const fontLinks = head.match(/<link[^>]*>/g).join('\n');
write('docs/assets/style.css', style);
write('docs/assets/app.js', js);
write('docs/.nojekyll', '');

function page({file, title, desc, preset, top = '', seo = '', planner = true}) {
  const depth = file.split('/').length - 1;
  const pre = depth ? '../'.repeat(depth) : './';
  const url = BASE + file.replace(/index\.html$/, '');
  let b = body
    .replace('<!--LOGO_OPEN-->', `<a href="${pre}" style="text-decoration:none">`).replace('<!--LOGO_CLOSE-->', '</a>')
    .replace('<!--FOOTLINKS-->', ` <a href="${pre}privacy.html">プライバシーポリシー</a>`)
    .replace('<!--SEO-->', seo ? `<section class="wrap seo">${seo}</section>` : '');
  if (top) b = b.replace('<main class="wrap layout">', `<div class="wrap" style="padding-top:20px">${top}</div>\n<main class="wrap layout">`);
  if (!planner) b = b.replace(/<main class="wrap layout">[\s\S]*?<\/main>/, '');
  write('docs/' + file, `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="たびしおり">
${fontLinks}
<link rel="stylesheet" href="${pre}assets/style.css">
</head>
<body>
${b}
${planner ? `${preset ? `<script>window.PRESET=${JSON.stringify(preset)};</script>\n` : ''}<script src="${pre}assets/app.js"></script>` : ''}
</body>
</html>
`);
  return url;
}

const urls = [];
const muniFile = m => `course/${m.code}.html`;
const curatedMain = d => d.muni === '東京23区' ? null : MUNIS.find(m => m.name === d.muni);
const destFile = d => d.muni === '東京23区' ? 'course/tokyo.html' : muniFile(curatedMain(d));
const popular = `<div><h3>おすすめスポット登録済みの行き先</h3><ul class="linkgrid">${DESTS.map(d => `<li><a href="PRE${destFile(d)}">${esc(d.name)}</a></li>`).join('')}</ul></div>`;
const prefLinks = `<div><h3>都道府県から探す</h3><ul class="linkgrid">${PREFS.map(p => `<li><a href="PREpref/${prefNo(p)}.html">${esc(p)}</a></li>`).join('')}</ul></div>`;

// トップ
urls.push(page({file: 'index.html', title: 'たびしおり|定番と穴場をまぜた旅行プランを自動作成',
  desc: '出発地・行き先・日数と好みを入れるだけで、有名スポットと穴場をまぜた旅程表を3パターン自動で作る旅行プランナー。全国の市区町村に対応。',
  seo: `<h2>行き先から探す</h2>${popular}${prefLinks}`.replaceAll('PRE', './')}));

// 都道府県ページ
for (const p of PREFS) {
  const ms = MUNIS.filter(m => m.pref === p);
  const list = ms.map(m => `<li><a href="../${muniFile(m)}">${esc(m.name)}</a></li>`).join('');
  urls.push(page({file: `pref/${prefNo(p)}.html`, planner: false, title: `${p}の観光モデルコース|市区町村から探す - たびしおり`,
    desc: `${p}の市区町村ごとに、定番スポットと穴場をまぜた観光モデルコースを自動で作れます。`,
    seo: `<div class="crumbs"><a href="../">トップ</a> › ${esc(p)}</div><h1 class="logo" style="font-size:28px">${esc(p)}の観光モデルコース</h1>
      <p>行き先の市区町村を選ぶと、定番と穴場をまぜた旅程表を自動で作ります。</p><ul class="linkgrid">${list}</ul>${popular.replaceAll('PRE', '../')}`}));
}

// 市区町村ページ
const spotList = ss => `<ul class="spotlist">${ss.map(s => `<li><b>${esc(s.name)}</b>(${esc(s.cat)}・滞在約${s.hours}時間):${esc(s.tip)}</li>`).join('')}</ul>`;
function coursePage(file, m, d, label, toCode) {
  const full = d && !m ? label : `${m.pref}${m.gun}${m.name}`;
  const isMain = d && (!m || m.name === d.muni);
  const near = m ? MUNIS.filter(x => x !== m && !x.code.includes('P')).map(x => [km(m, x), x]).sort((a, b) => a[0] - b[0]).slice(0, 10).map(x => x[1]) : [];
  const top = `<div class="crumbs"><a href="../">トップ</a>${m ? ` › <a href="../pref/${prefNo(m.pref)}.html">${esc(m.pref)}</a>` : ''} › ${esc(label)}</div>
    <h1 class="logo" style="font-size:clamp(24px,4vw,32px)">${esc(label)}の観光モデルコース</h1>
    <p class="lead" style="margin:4px 0 0">${isMain ? esc(d.lead) + ' ' : ''}出発地と日数を選ぶと、${esc(label)}の定番スポットと穴場をまぜた旅程表を3パターン作ります。</p>`;
  let seo = '';
  if (isMain) {
    seo += `<h2>${esc(label)}の定番スポット</h2>${spotList(d.spots.filter(s => s.kind === 'f'))}
      <h2>${esc(label)}の穴場スポット</h2>${spotList(d.spots.filter(s => s.kind === 'h'))}
      <div><h3>名物グルメ</h3><p>${d.foods.map(esc).join('、')}</p></div><div><h3>泊まるエリア</h3><p>${esc(d.stay)}</p></div>`;
  } else if (d) {
    seo += `<p>${esc(full)}は${esc(d.name)}のおすすめスポットを使ってプランを作ります。詳しくは<a href="../${destFile(d)}">${esc(d.name)}の観光モデルコース</a>へ。</p>`;
  } else {
    seo += `<h2>${esc(full)}の旅のプランについて</h2><p>${esc(full)}とその周辺にある神社仏閣、城跡、公園、美術館、市場などの見どころを集めて、よく知られた場所を「定番」、知る人ぞ知る場所を「穴場」として旅程に組み込みます。所要時間や営業時間は目安なので、お出かけ前に公式情報をご確認ください。</p>`;
  }
  if (near.length) seo += `<div><h3>${esc(m.name)}の近くの市区町村</h3><ul class="linkgrid">${near.map(x => `<li><a href="../${muniFile(x)}">${esc(x.name)}</a></li>`).join('')}</ul></div>`;
  if (m) seo += `<p><a href="../pref/${prefNo(m.pref)}.html">${esc(m.pref)}のほかの市区町村を見る</a></p>`;
  return page({file, top, seo, title: `${label}${m ? `(${m.pref})` : ''}の観光モデルコース|定番と穴場の旅程表 - たびしおり`,
    desc: `${full}の観光モデルコースを自動作成。有名スポットと穴場をまぜた日帰り・1泊2日・2泊3日の旅程表を、出発地や好みに合わせて作れます。`,
    preset: {to: m ? m.name : d.name, toCode, nights: d ? 2 : 1}});
}
const tokyo = DESTS.find(d => d.id === 'tokyo');
urls.push(coursePage('course/tokyo.html', null, tokyo, '東京', ''));
for (const m of MUNIS) urls.push(coursePage(muniFile(m), m, curatedFor(m), m.name, m.code));

// プライバシーポリシー
urls.push(page({file: 'privacy.html', planner: false, title: 'プライバシーポリシー - たびしおり', desc: 'たびしおりのプライバシーポリシー',
  seo: `<h1 class="logo" style="font-size:26px">プライバシーポリシー</h1>
  <div><h3>アクセス情報と保存データ</h3><p>入力した旅の条件・保存したプラン・持ち物チェックは、お使いのブラウザ内(localStorage)にだけ保存され、運営者のサーバーには送信されません。</p></div>
  <div><h3>外部サービス</h3><p>天気予報の取得に Open-Meteo、見どころ情報の取得に Wikipedia の API を利用しており、行き先の位置情報や地名がそれぞれのサービスに送信されます。</p></div>
  <div><h3>広告について</h3><p>当サイトは、楽天アフィリエイト、Booking.com アフィリエイトパートナープログラムなどのアフィリエイトプログラムに参加しています。リンク先で予約・購入が行われた場合、運営者が紹介料を受け取ることがあります。これらのリンクには「PR」と表示しています。</p></div>
  <div><h3>免責事項</h3><p>掲載している所要時間・料金・営業情報は目安です。正確な情報は各施設・交通機関の公式情報をご確認ください。</p></div>`}));

write('docs/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('docs/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${BASE}sitemap.xml\n`);
console.log(`built ${urls.length} pages`);
