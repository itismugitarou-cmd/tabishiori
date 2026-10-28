// src/ から公開用の docs/ とプレビュー用の artifact.html を作る
//   node tools/build.mjs
// docs/ には 日本語版(/)と英語版(/en/)それぞれの トップ・都道府県ページ・市区町村ごとのモデルコースページ と、
// 両方をまとめた sitemap.xml(hreflang つき)を出力する
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const BASE = 'https://itismugitarou-cmd.github.io/tabishiori/';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const write = (f, s) => { const p = path.join(root, f); fs.mkdirSync(path.dirname(p), {recursive: true}); fs.writeFileSync(p, s); };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

const head = read('src/head.html');
const BODY = {ja: read('src/body.html'), en: read('src/body.en.html')};
const SRC = {ja: ['src/munis.js', 'src/data.js', 'src/affiliate.js', 'src/app.js'], en: ['src/munis.js', 'src/data.js', 'src/affiliate.js', 'src/en.js', 'src/app.js']};
const JS = {ja: SRC.ja.map(read).join('\n'), en: SRC.en.map(read).join('\n')};

// プレビュー用: すべてインライン
write('artifact.html', `${head}${BODY.ja}<script>\n${JS.ja}</script>\n`);

// データを読み込む(app.js は DOM が要るので読まない)。英語版は en.js が訳を当てた状態のデータ
const load = files => {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(files.filter(f => !f.endsWith('app.js')).map(read).join('\n') + ';globalThis.MUNIS=MUNIS;globalThis.DESTS=DESTS;globalThis.PREFS=PREFS;globalThis.PREFS_EN=typeof PREFS_EN!=="undefined"?PREFS_EN:null;globalThis.CAT_EN=typeof CAT_EN!=="undefined"?CAT_EN:null;', ctx);
  return ctx;
};
const D = {ja: load(SRC.ja), en: load(SRC.en)};
// 英訳の抜けや順番ずれを防ぐ: スポット数が日本語版と同じか確かめる
D.ja.DESTS.forEach((d, i) => { const e = D.en.DESTS[i]; if (e.spots.length !== d.spots.length || e.spots.some(s => /[\u3040-\u30ff\u4e00-\u9fff]/.test(s.name + s.tip))) throw new Error('en.js: spots of ' + d.id + ' are out of sync'); });
const {PREFS, PREFS_EN, CAT_EN} = D.en;
const km = (a, b) => { const r = x => x * Math.PI / 180; const x = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
const prefNo = p => String(PREFS.indexOf(p) + 1).padStart(2, '0');
const prefEn = p => PREFS_EN[PREFS.indexOf(p)];
const prefEnFull = p => p === '北海道' ? 'Hokkaido' : p === '東京都' ? 'Tokyo' : `${prefEn(p)} Prefecture`;
const TOKYO = {lat: 35.681, lng: 139.767}, OSAKA = {lat: 34.702, lng: 135.495};

// 共通部品
const style = head.match(/<style>([\s\S]*?)<\/style>/)[1];
const fontLinks = head.match(/<link[^>]*>/g);
const fontCss = fontLinks.find(l => l.includes('rel="stylesheet"')).match(/href="([^"]+)"/)[1];
// フォントは描画を止めないように後から読み込む(表示速度の改善)
const fontTags = `${fontLinks.filter(l => l.includes('preconnect')).join('\n')}
<link rel="preload" as="style" href="${fontCss}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${fontCss}"></noscript>`;
write('docs/assets/style.css', style);
write('docs/assets/app.js', JS.ja);
write('docs/assets/app.en.js', JS.en);
write('docs/.nojekyll', '');
for (const f of ['icon.svg', 'og.png']) fs.copyFileSync(path.join(root, 'src', f), path.join(root, 'docs/assets', f));

const SITE = {ja: 'たびしおり', en: 'Tabishiori'};
const urlOf = (lang, file) => BASE + (lang === 'en' ? 'en/' : '') + file.replace(/index\.html$/, '');
const sitemap = [];

function page(lang, {file, title, desc, preset, top = '', seo = '', planner = true, jsonld = []}) {
  const en = lang === 'en';
  const out = (en ? 'en/' : '') + file;
  const depth = out.split('/').length - 1;
  const pre = depth ? '../'.repeat(depth) : './';
  const home = en ? (depth === 1 ? './' : '../') : pre;
  const url = urlOf(lang, file), ja = urlOf('ja', file), enUrl = urlOf('en', file);
  const other = en ? ja : enUrl;
  let b = BODY[lang]
    .replace('<!--LOGO_OPEN-->', `<a href="${home}" style="text-decoration:none">`).replace('<!--LOGO_CLOSE-->', '</a>')
    .replace('<!--LANG-->', `<a class="lang" href="${other}" hreflang="${en ? 'ja' : 'en'}" lang="${en ? 'ja' : 'en'}">${en ? '日本語' : 'English'}</a>`)
    .replace('<!--FOOTLINKS-->', ` <a href="${home}privacy.html">${en ? 'Privacy policy' : 'プライバシーポリシー'}</a>`)
    .replace('<!--SEO-->', seo ? `<section class="wrap seo">${seo}</section>` : '');
  if (file === 'index.html') b = b.replace(/<div class="tagline">([\s\S]*?)<\/div>/, '<h1 class="tagline">$1</h1>');
  if (top) b = b.replace('<main class="wrap layout">', `<div class="wrap" style="padding-top:20px">${top}</div>\n<main class="wrap layout">`);
  if (!planner) b = b.replace(/<main class="wrap layout">[\s\S]*?<\/main>/, '');
  const ld = jsonld.map(j => `<script type="application/ld+json">${JSON.stringify({'@context': 'https://schema.org', ...j}).replace(/</g, '\\u003c')}</script>`).join('\n');
  write('docs/' + out, `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ja" href="${ja}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${SITE[lang]}">
<meta property="og:locale" content="${en ? 'en_US' : 'ja_JP'}">
<meta property="og:locale:alternate" content="${en ? 'ja_JP' : 'en_US'}">
<meta property="og:image" content="${BASE}assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#24407c">${out === 'index.html' ? '\n<meta name="google-site-verification" content="4kcysmogNbSzovXMaNiryw_1RdM1XnSdOJ55uu395NM">' : ''}
<link rel="icon" href="${pre}assets/icon.svg" type="image/svg+xml">
${fontTags}
<link rel="stylesheet" href="${pre}assets/style.css">
${ld}
</head>
<body>
${b}
${planner ? `${preset ? `<script>window.PRESET=${JSON.stringify(preset)};</script>\n` : ''}<script src="${pre}assets/app${en ? '.en' : ''}.js" defer></script>` : ''}
</body>
</html>
`);
  if (!en) sitemap.push(file);
  return url;
}
const crumbs = (lang, items) => ({'@type': 'BreadcrumbList', itemListElement: items.map(([name, file], i) => ({'@type': 'ListItem', position: i + 1, name, ...(file != null ? {item: urlOf(lang, file)} : {})}))});

const muniFile = m => `course/${m.code}.html`;

function build(lang) {
  const en = lang === 'en';
  const {MUNIS, DESTS} = D[lang];
  const curatedFor = m => DESTS.find(d => d.muni === '東京23区' ? (m.pref === '東京都' && /^131\d\d$/.test(m.code)) : m.name.startsWith(d.muni)) || null;
  const curatedMain = d => d.muni === '東京23区' ? null : MUNIS.find(m => m.name === d.muni);
  const destFile = d => d.muni === '東京23区' ? 'course/tokyo.html' : muniFile(curatedMain(d));
  const mName = m => en ? m.en : m.name;
  const pName = p => en ? prefEn(p) : p;
  const T = en ? {
    top: 'Home', site: 'Tabishiori',
    popular: 'Destinations with curated spots', byPref: 'Browse by prefecture', findDest: 'Find your destination',
    prefTitle: p => `${prefEn(p)} Itinerary Ideas by City & Town | Tabishiori`,
    prefDesc: p => `Plan a trip to ${prefEnFull(p)}, Japan. Pick a city, town or village and get a free itinerary mixing famous sights with hidden gems.`,
    prefH1: p => `${prefEnFull(p)} itineraries`,
    prefLead: 'Pick a city, town or village to get an itinerary that mixes famous sights with hidden gems.',
    courseH1: l => `${l} itinerary: things to do & hidden gems`,
    courseLead: l => `Choose where you start and how many days, and we'll build three itineraries for ${l} that mix famous sights with hidden gems.`,
    famous: l => `Must-see spots in ${l}`, hidden: l => `Hidden gems in ${l}`, food: 'Local food to try', stay: 'Where to stay',
    spot: s => `<li><b>${esc(s.name)}</b> (${esc(CAT_EN[s.cat] || s.cat)}, about ${s.hours} hr): ${esc(s.tip)}</li>`,
    sub: (full, d, f) => `<p>For ${esc(full)} we use the curated spots for ${esc(d.name)}. See the <a href="../${f}">${esc(d.name)} itinerary</a> for details.</p>`,
    near: l => `Places near ${l}`, more: p => `See more places in ${prefEnFull(p)}`
  } : {
    top: 'トップ', site: 'たびしおり',
    popular: 'おすすめスポット登録済みの行き先', byPref: '都道府県から探す', findDest: '行き先から探す',
    prefTitle: p => `${p}の観光モデルコース|市区町村から探す - たびしおり`,
    prefDesc: p => `${p}の市区町村ごとに、定番スポットと穴場をまぜた観光モデルコースを自動で作れます。`,
    prefH1: p => `${p}の観光モデルコース`,
    prefLead: '行き先の市区町村を選ぶと、定番と穴場をまぜた旅程表を自動で作ります。',
    courseH1: l => `${l}の観光モデルコース`,
    courseLead: l => `出発地と日数を選ぶと、${l}の定番スポットと穴場をまぜた旅程表を3パターン作ります。`,
    famous: l => `${l}の定番スポット`, hidden: l => `${l}の穴場スポット`, food: '名物グルメ', stay: '泊まるエリア',
    spot: s => `<li><b>${esc(s.name)}</b>(${esc(s.cat)}・滞在約${s.hours}時間):${esc(s.tip)}</li>`,
    sub: (full, d, f) => `<p>${esc(full)}は${esc(d.name)}のおすすめスポットを使ってプランを作ります。詳しくは<a href="../${f}">${esc(d.name)}の観光モデルコース</a>へ。</p>`,
    near: l => `${l}の近くの市区町村`, more: p => `${p}のほかの市区町村を見る`
  };
  const popular = `<div><h3>${T.popular}</h3><ul class="linkgrid">${DESTS.map(d => `<li><a href="PRE${destFile(d)}">${esc(d.name)}</a></li>`).join('')}</ul></div>`;
  const prefLinks = `<div><h3>${T.byPref}</h3><ul class="linkgrid">${PREFS.map(p => `<li><a href="PREpref/${prefNo(p)}.html">${esc(pName(p))}</a></li>`).join('')}</ul></div>`;

  // トップ
  const intro = en ? `<div><h2>How Tabishiori works</h2><p>Tabishiori is a free trip planner for Japan. Enter where you start, where you want to go and how many days you have, and it builds three day-by-day itineraries: one with the classic highlights, one with hidden gems, and one in between. It covers all ${MUNIS.filter(m => !m.code.includes('P')).length.toLocaleString('en-US')} cities, towns and villages in Japan, with hand-picked spots for popular destinations like Tokyo, Kyoto and Osaka. Each plan includes estimated travel time and budget, a weather forecast, a packing list and links to find a place to stay.</p></div>` : '';
  page(lang, {file: 'index.html',
    title: en ? 'Tabishiori | Free Japan Itinerary Planner: Famous Sights & Hidden Gems' : 'たびしおり|定番と穴場をまぜた旅行プランを自動作成',
    desc: en ? 'Free Japan trip planner. Enter where you start, where you go and how many days, and get three itineraries mixing famous sights with hidden gems, for any city, town or village in Japan.'
      : '出発地・行き先・日数と好みを入れるだけで、有名スポットと穴場をまぜた旅程表を3パターン自動で作る旅行プランナー。全国の市区町村に対応。',
    seo: `${intro}<h2>${T.findDest}</h2>${popular}${prefLinks}`.replaceAll('PRE', './'),
    jsonld: [{'@type': 'WebSite', name: T.site, alternateName: en ? 'たびしおり' : 'Tabishiori', url: urlOf(lang, ''), inLanguage: lang},
      {'@type': 'WebApplication', name: T.site, url: urlOf(lang, ''), applicationCategory: 'TravelApplication', operatingSystem: 'Any', inLanguage: lang,
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'JPY'}}]});

  // 都道府県ページ
  for (const p of PREFS) {
    const ms = MUNIS.filter(m => m.pref === p);
    const list = ms.map(m => `<li><a href="../${muniFile(m)}">${esc(mName(m))}</a></li>`).join('');
    const file = `pref/${prefNo(p)}.html`;
    page(lang, {file, planner: false, title: T.prefTitle(p), desc: T.prefDesc(p),
      seo: `<div class="crumbs"><a href="../">${T.top}</a> › ${esc(pName(p))}</div><h1 class="logo" style="font-size:28px">${esc(T.prefH1(p))}</h1>
      <p>${T.prefLead}</p><ul class="linkgrid">${list}</ul>${popular.replaceAll('PRE', '../')}`,
      jsonld: [crumbs(lang, [[T.top, ''], [pName(p), null]])]});
  }

  // 市区町村ページ
  const spotList = ss => `<ul class="spotlist">${ss.map(T.spot).join('')}</ul>`;
  const realMunis = MUNIS.filter(x => !x.code.includes('P'));
  function coursePage(file, m, d, label, toCode) {
    const full = d && !m ? label : en ? (m.en === m.prefEn ? `${m.en}, ${m.prefEn}` : `${m.en}, ${prefEnFull(m.pref)}`) : `${m.pref}${m.gun}${m.name}`;
    const isMain = d && (!m || m.name === d.muni);
    const near = m ? realMunis.filter(x => x !== m).map(x => [km(m, x), x]).sort((a, b) => a[0] - b[0]).slice(0, 10).map(x => x[1]) : [];
    const top = `<div class="crumbs"><a href="../">${T.top}</a>${m ? ` › <a href="../pref/${prefNo(m.pref)}.html">${esc(pName(m.pref))}</a>` : ''} › ${esc(label)}</div>
    <h1 class="logo" style="font-size:clamp(24px,4vw,32px)">${esc(T.courseH1(label))}</h1>
    <p class="lead" style="margin:4px 0 0">${isMain ? esc(d.lead) + ' ' : ''}${esc(T.courseLead(label))}</p>`;
    let seo = '';
    if (isMain) {
      seo += `<h2>${esc(T.famous(label))}</h2>${spotList(d.spots.filter(s => s.kind === 'f'))}
      <h2>${esc(T.hidden(label))}</h2>${spotList(d.spots.filter(s => s.kind === 'h'))}
      <div><h3>${T.food}</h3><p>${d.foods.map(esc).join(en ? ', ' : '、')}</p></div><div><h3>${T.stay}</h3><p>${esc(d.stay)}</p></div>`;
    } else if (d) {
      seo += T.sub(full, d, destFile(d));
    } else if (en) {
      const kind = {City: 'a city', Town: 'a town', Village: 'a village', Ward: 'a ward'}[m.enType] || 'a municipality';
      const parent = m.enType === 'Ward' && /^13/.test(m.code) ? 'Tokyo' : m.enType === 'Ward' ? `${m.en.replace(/ \S+ Ward$/, '')}, ${prefEnFull(m.pref)}` : prefEnFull(m.pref);
      seo += `<h2>Planning a trip to ${esc(m.en)}</h2><p>${esc(m.en)} (${esc(m.name)}) is ${kind} in ${esc(parent)}, Japan, about ${Math.round(km(m, TOKYO))} km from Tokyo and ${Math.round(km(m, OSAKA))} km from Osaka as the crow flies. Tabishiori gathers the shrines and temples, castle ruins, parks, museums and markets in and around ${esc(m.en)}, marks the well-known places as "classic" and the lesser-known ones as "hidden gems", and fits them into a day-by-day itinerary. Visiting times and opening hours are estimates, so please check official information before you go.</p>`;
    } else {
      seo += `<h2>${esc(full)}の旅のプランについて</h2><p>${esc(full)}とその周辺にある神社仏閣、城跡、公園、美術館、市場などの見どころを集めて、よく知られた場所を「定番」、知る人ぞ知る場所を「穴場」として旅程に組み込みます。東京からは直線で約${Math.round(km(m, TOKYO))}km、大阪からは約${Math.round(km(m, OSAKA))}kmです。所要時間や営業時間は目安なので、お出かけ前に公式情報をご確認ください。</p>`;
    }
    if (near.length) seo += `<div><h3>${esc(T.near(label))}</h3><ul class="linkgrid">${near.map(x => `<li><a href="../${muniFile(x)}">${esc(mName(x))}</a></li>`).join('')}</ul></div>`;
    if (m) seo += `<p><a href="../pref/${prefNo(m.pref)}.html">${esc(T.more(m.pref))}</a></p>`;
    const where = m ? {lat: m.lat, lng: m.lng} : {lat: d.lat, lng: d.lng};
    const dest = {'@type': 'TouristDestination', name: en ? full : (m ? m.name : label), url: urlOf(lang, file), inLanguage: lang,
      geo: {'@type': 'GeoCoordinates', latitude: where.lat, longitude: where.lng},
      containedInPlace: {'@type': 'AdministrativeArea', name: m ? (en ? prefEnFull(m.pref) : m.pref) : (en ? 'Tokyo' : '東京都')}};
    if (isMain) dest.includesAttraction = d.spots.map(s => ({'@type': 'TouristAttraction', name: s.name}));
    const title = en
      ? `${m && m.en !== m.prefEn ? `${m.en}, ${m.prefEn}` : label} Itinerary: Things to Do & Hidden Gems | Tabishiori`
      : `${label}${m ? `(${m.pref})` : ''}の観光モデルコース|定番と穴場の旅程表 - たびしおり`;
    const desc = en
      ? `Free ${full} itinerary planner. Mix famous sights and hidden gems into a day trip, 2-day or 3-day plan, with travel time, budget and weather.`
      : `${full}の観光モデルコースを自動作成。有名スポットと穴場をまぜた日帰り・1泊2日・2泊3日の旅程表を、出発地や好みに合わせて作れます。`;
    page(lang, {file, top, seo, title, desc,
      preset: {to: m ? m.name : d.name, toCode, nights: d ? 2 : 1},
      jsonld: [crumbs(lang, [[T.top, ''], ...(m ? [[pName(m.pref), `pref/${prefNo(m.pref)}.html`]] : []), [label, null]]), dest]});
  }
  const tokyo = DESTS.find(d => d.id === 'tokyo');
  coursePage('course/tokyo.html', null, tokyo, tokyo.name, '');
  for (const m of MUNIS) coursePage(muniFile(m), m, curatedFor(m), mName(m), m.code);

  // プライバシーポリシー
  page(lang, en ? {file: 'privacy.html', planner: false, title: 'Privacy Policy | Tabishiori', desc: 'Privacy policy for Tabishiori',
    seo: `<h1 class="logo" style="font-size:26px">Privacy policy</h1>
  <div><h3>Data you enter</h3><p>Your trip settings, saved plans and packing checklist are stored only in your browser (localStorage) and are never sent to our servers.</p></div>
  <div><h3>Third-party services</h3><p>We use Open-Meteo for weather forecasts and the Wikipedia API for information about sights. The location and place names of your destination are sent to these services.</p></div>
  <div><h3>Advertising</h3><p>This site takes part in affiliate programs such as Rakuten Affiliate and the Booking.com Affiliate Partner Programme. If you book or buy through these links, we may receive a commission. These links are marked "PR".</p></div>
  <div><h3>Disclaimer</h3><p>Times, prices and opening information are estimates. Please check official information from each facility and transport operator.</p></div>`}
  : {file: 'privacy.html', planner: false, title: 'プライバシーポリシー - たびしおり', desc: 'たびしおりのプライバシーポリシー',
    seo: `<h1 class="logo" style="font-size:26px">プライバシーポリシー</h1>
  <div><h3>アクセス情報と保存データ</h3><p>入力した旅の条件・保存したプラン・持ち物チェックは、お使いのブラウザ内(localStorage)にだけ保存され、運営者のサーバーには送信されません。</p></div>
  <div><h3>外部サービス</h3><p>天気予報の取得に Open-Meteo、見どころ情報の取得に Wikipedia の API を利用しており、行き先の位置情報や地名がそれぞれのサービスに送信されます。</p></div>
  <div><h3>広告について</h3><p>当サイトは、楽天アフィリエイト、Booking.com アフィリエイトパートナープログラムなどのアフィリエイトプログラムに参加しています。リンク先で予約・購入が行われた場合、運営者が紹介料を受け取ることがあります。これらのリンクには「PR」と表示しています。</p></div>
  <div><h3>免責事項</h3><p>掲載している所要時間・料金・営業情報は目安です。正確な情報は各施設・交通機関の公式情報をご確認ください。</p></div>`});
}
build('ja');
build('en');

// sitemap: 日英それぞれの URL に、もう一方の言語版を hreflang で添える
const alt = f => `<xhtml:link rel="alternate" hreflang="ja" href="${urlOf('ja', f)}"/><xhtml:link rel="alternate" hreflang="en" href="${urlOf('en', f)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${urlOf('en', f)}"/>`;
write('docs/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.flatMap(f => ['ja', 'en'].map(l => `<url><loc>${urlOf(l, f)}</loc>${alt(f)}</url>`)).join('\n')}
</urlset>
`);
write('docs/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${BASE}sitemap.xml\n`);
console.log(`built ${sitemap.length * 2} pages (${sitemap.length} ja + ${sitemap.length} en)`);
