// 画面の文言。英語ページでは en.js の MSG_EN に差し替わる
const MSG_JA = {
  lang: 'ja',
  locale: 'ja-JP',
  hours: (hh, mm) => (hh ? hh + '時間' : '') + (mm ? mm + '分' : (hh ? '' : '0分')),
  muniLabel: m => `${m.name}(${m.pref}${m.gun})`,
  picked: (m, cur) => `${m.pref}${m.gun}${m.name}${cur ? '・おすすめスポット登録済み' : ''}`,
  suggSub: m => m.pref + m.gun,
  suggCurated: 'おすすめあり',
  modes: {local: '現地', plane: '飛行機', train: '電車', shinkansen: '新幹線・特急'},
  wikiLang: 'ja',
  wikiTipDefault: '詳しくはWikipediaの記事で',
  wikiLead: where => `${where}とその周辺の見どころを、Wikipediaの閲覧数をもとに「定番」と「穴場」に分けて組み立てました。`,
  wikiStay: name => `${name}の中心部や主要駅の近くに泊まると動きやすいです。`,
  defaultFood: '地元の食堂',
  depart: n => `${n}を出発`,
  departSub: (l, h) => `${l}で約${h}(乗り換え・待ち時間込みの目安)`,
  arrive: n => `${n}に到着`,
  arriveSub: '大きな荷物はホテルかコインロッカーに預けて身軽に',
  lunch: f => `昼ごはん:${f}`,
  lunchSub: '人気店は11時台か13時半以降が入りやすい',
  free: '自由時間',
  freeSub: '気に入った場所をもう一度訪ねたり、カフェや宿でのんびり。「スポットを1つ足す」で予定を足せます',
  gifts: 'おみやげ選び',
  giftsSub: g => g ? `${g}が定番です` : '駅や空港のおみやげ売り場で',
  leave: n => `${n}を出発`,
  leaveSub: (l, h) => `${l}で約${h}`,
  home: n => `${n}に到着`,
  homeSub: 'おつかれさまでした',
  dinner: f => `夜ごはん:${f}`,
  stay: (n, i) => `${n}泊(${i}泊目)`,
  localTransport: '現地の交通',
  rentalShare: 'レンタカー(割り勘)',
  wx: {0: '快晴', 1: '晴れ', 2: '晴れ時々くもり', 3: 'くもり', 45: '霧', 48: '霧', 51: '霧雨', 53: '霧雨', 55: '霧雨', 61: '小雨', 63: '雨', 65: '大雨', 66: 'みぞれ', 67: 'みぞれ', 71: '小雪', 73: '雪', 75: '大雪', 77: '雪', 80: 'にわか雨', 81: 'にわか雨', 82: '強いにわか雨', 85: 'にわか雪', 86: 'にわか雪', 95: '雷雨', 96: '雷雨', 99: '雷雨'},
  dayLabel: d => `${d.getMonth() + 1}/${d.getDate()}(${'日月火水木金土'[d.getDay()]})`,
  wxTitle: '現地の天気',
  wxTitleFirst: '現地の天気(初日)',
  wxLoading: '取得中…',
  wxOut: '予報は出発の約2週間前から表示します',
  wxFailed: 'いまは天気予報を取得できませんでした',
  wxRange: '予報の範囲外です',
  wxDay: (w, max, min, pop) => `<b>${w}</b> ${max}° / ${min}° ・降水 ${pop}%`,
  wxRainy: n => `雨の可能性が高い日が${n}日あります`,
  wxFine: '大きな崩れはなさそうです',
  wxRedo: '雨の日モードで作り直す',
  pack: {base: ['財布・身分証・交通系ICカード', 'スマホの充電器とモバイルバッテリー', '歩きやすい靴', '常備薬'],
    clothes: n => `着替え(${n}泊分)`, toiletries: '洗面用具・スキンケア',
    coldNorth: 'しっかりした防寒着・滑りにくい靴', cold: 'コート・手袋', sun: ['日焼け止め・帽子', '汗ふきシート'], mild: '羽織れる上着',
    umbrella: '折りたたみ傘', swim: '水着・ラッシュガード', towel: '温泉用の小さいタオル', goshuin: '御朱印帳(集めている人は)',
    license: '運転免許証(レンタカー用)', bag: 'エコバッグ(おみやげ用)'},
  dur: n => n ? `${n}泊${n + 1}日` : '日帰り',
  hiddenRate: p => `穴場率${p}%`,
  ratio: (f, h) => `定番 ${f}% ・ 穴場 ${h}%`,
  hidden: '穴場', classic: '定番',
  stamp: '穴場',
  stayAbout: h => `滞在 約${h}`,
  free0: '無料〜',
  fromYen: y => `${y}〜`,
  rainOk: '雨でもOK',
  areaLabel: a => `${a}エリア`,
  map: '地図',
  swap: 'ほかの場所にする',
  remove: '外す',
  dayNo: n => `${n}日目`,
  addSpot: 'スポットを1つ足す',
  route: 'この日のルートを地図で見る',
  people: n => `${n}人`,
  trTitle: '移動(片道の目安)',
  trValue: (l, h) => `${l} 約${h}`,
  trLocal: '現地出発',
  trSub: (k, y) => `直線で約${k}km・${y}前後`,
  trLocalSub: '移動時間なしで組みました',
  budget: '予算(1人あたり)',
  breakdown: '内訳を見る',
  bMove: '往復の交通費', bStay: n => `宿泊(${n}泊)`, bMeal: '食事', bFees: '拝観・入場料', bTotal: n => `${n}の合計`,
  planTypes: 'プランの種類',
  shuffle: '別の組み合わせにする',
  save: 'このプランを保存',
  copyText: 'テキストでコピー',
  copyLink: '共有リンクをコピー',
  legend: '<span class="tag-f">定番</span>有名な観光地 <span class="stamp">穴場</span>知る人ぞ知る場所 <span class="rain" style="color:var(--matcha);font-weight:700">雨でもOK</span>屋内で楽しめる',
  bookTitle: n => `${n}の宿をさがす`,
  carHint: '見どころが離れているので、レンタカーがあると回りやすい行き先です。',
  eatTitle: n => `${n}で食べたいもの`,
  eatNone: '地元の人が並ぶ店や、道の駅の食堂を探してみてください。',
  packTitle: '持ち物チェックリスト',
  savedTitle: '保存したプラン',
  open: '開く', del: '削除',
  savedNone: '「このプランを保存」を押すと、このブラウザに保存されて後から開けます。',
  textHead: (n, dur, v, from) => `【${n} ${dur}】${v}(${from}発)`,
  textDay: (n, l) => `■ ${n}日目 ${l}`,
  textFooter: 'たびしおりで作成',
  copyFail: 'コピーできませんでした',
  noSwap: '入れ替えられる場所がもうありません',
  noAdd: '追加できる場所がもうありません',
  added: n => `${n}を追加しました`,
  needTo: '行き先を入れてください。',
  searching: q => `「${q}」の見どころを探しています…`,
  fetchFail: q => `いまは「${q}」の見どころを取りに行けませんでした。通信状況を確かめてもう一度お試しください。このプレビュー画面では外部への通信が止められているため、おすすめスポット登録済みの行き先だけ動きます。`,
  notFound: q => `「${q}」の見どころが見つかりませんでした。候補から市区町村を選び直すか、近くの大きな町で試してください。`,
  wikiNotice: 'この行き先はWikipediaの情報から自動で組み立てたプランです。所要時間や営業情報は特に注意して確認してください。',
  fromUnknown: q => `出発地「${q}」の場所がわからなかったため、移動時間を入れずに組みました。`,
  nightsOpt: n => n ? `${n}泊${n + 1}日` : '日帰り',
  destHint: '全国の市区町村から検索できます(ひらがなもOK)。おすすめスポット登録済み:',
  dfltFrom: '千代田区',
  copied: 'コピーしました',
  linkCopied: '共有リンクをコピーしました',
  saved: '保存しました',
  noDate: '日付なし',
  savedTitleFmt: (n, dur, v, l) => `${n} ${dur}・${v}(${l})`
};
const T = typeof MSG_EN === 'undefined' ? MSG_JA : MSG_EN;
const isEn = T.lang === 'en';
const catLabel = c => isEn ? CAT_EN[c] || c : c;
const muniName = m => isEn ? m.en : m.name;

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yen = n => '¥' + (Math.round(n / 100) * 100).toLocaleString(T.locale);
const fmtT = h => { const m = Math.round(h * 60 / 5) * 5; return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };
const fmtH = h => { const m = Math.round(h * 60 / 10) * 10; return T.hours(Math.floor(m / 60), m % 60); };
// 英語版は保存プランのスポット名が違うので、保存先を分ける
const store = {
  key: k => 'tabishiori.' + (isEn ? 'en.' : '') + k,
  get(k, d) { try { const v = localStorage.getItem(this.key(k)); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(this.key(k), JSON.stringify(v)); } catch {} }
};

function rng(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  let a = h >>> 0;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const newSeed = () => Math.random().toString(36).slice(2, 8);

function km(a, b) {
  const R = 6371, r = x => x * Math.PI / 180;
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

const norm = s => String(s || '').trim().toLowerCase().replace(/[\s ]/g, '');
function findDest(q) {
  q = norm(q); if (!q) return null;
  let best = null, bestLen = 0;
  for (const d of DESTS) for (const a of d.aliases) {
    const al = a.toLowerCase();
    if ((q.includes(al) || (q.length >= 2 && al.startsWith(q))) && al.length > bestLen) { best = d; bestLen = al.length; }
  }
  return best;
}
function findPlace(q) {
  q = norm(q); if (!q) return null;
  let best = null, bestLen = 0;
  for (const p of PLACES) for (const a of p.aliases) {
    if (q.includes(a.toLowerCase()) && a.length > bestLen) { best = p; bestLen = a.length; }
  }
  if (best) return best;
  const d = findDest(q);
  return d ? {name: d.name, lat: d.lat, lng: d.lng} : null;
}

// ---------- 市区町村の検索 ----------
const toHira = t => t.normalize('NFKC').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const muniByCode = new Map(MUNIS.map(m => [m.code, m]));
const muniLabel = T.muniLabel;
function curatedFor(m) {
  if (!m) return null;
  return DESTS.find(d => d.muni === '東京23区' ? (m.pref === '東京都' && /^131\d\d$/.test(m.code)) : m.name.startsWith(d.muni)) || null;
}
function searchMunis(q, limit = 8) {
  q = toHira(norm(q));
  if (!q) return [];
  const bare = q.replace(/(都|道|府|県)$/, '');
  const res = [];
  for (const m of MUNIS) {
    const full = m.pref + m.gun + m.name;
    let sc = -1;
    if (isEn && m.romaji === q) sc = 100;
    else if (isEn && m.romaji.startsWith(q)) sc = 80;
    else if (m.name === q || m.name.replace(/(市|区|町|村)$/, '') === q) sc = 100;
    else if (m.name.startsWith(q)) sc = 80;
    else if (m.kana.startsWith(q)) sc = 70;
    else if (full.startsWith(q) || (q.length > 3 && full.includes(q))) sc = 60;
    else if (m.pref.replace(/(都|道|府|県)$/, '') === bare) sc = 30;
    else if (q.length >= 2 && (m.name.includes(q) || m.kana.includes(q))) sc = 40;
    if (sc < 0) continue;
    if (curatedFor(m)) sc += 6;
    if (m.code.includes('P')) sc += 4;
    if (m.name.endsWith('市')) sc += 3;
    // 英語では同じ読みの町が多いので、人の多い市を先に出す
    if (isEn && m.name.endsWith('区') && /^13/.test(m.code)) sc += 2;
    res.push([sc - m.name.length * 0.1, m]);
  }
  return res.sort((a, b) => b[0] - a[0]).slice(0, limit).map(x => x[1]);
}
function resolveMuni(input) {
  const code = input.dataset.code;
  if (code && muniByCode.has(code)) return muniByCode.get(code);
  const v = norm(input.value);
  if (!v) return null;
  const hit = searchMunis(v, 1)[0];
  if (!hit) return null;
  const hv = toHira(v);
  return (hit.name.startsWith(hv) || hit.kana.startsWith(hv) || (isEn && hit.romaji.startsWith(hv.replace(/[^a-z]/g, '')) && /[a-z]/.test(hv)) || (hit.pref + hit.gun + hit.name).startsWith(hv)) ? hit : null;
}

function setupCombo(input) {
  const list = document.createElement('ul');
  list.className = 'sugg'; list.setAttribute('role', 'listbox'); list.id = input.id + '-list'; list.hidden = true;
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-controls', list.id); input.setAttribute('aria-expanded', 'false');
  const wrap = document.createElement('div');
  wrap.className = 'combo';
  input.replaceWith(wrap); wrap.append(input, list);
  const picked = document.getElementById(input.id + 'Picked');
  let items = [], idx = -1;
  const showPicked = () => {
    const m = input.dataset.code && muniByCode.get(input.dataset.code);
    if (picked) picked.textContent = m ? T.picked(m, curatedFor(m)) : '';
  };
  const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); idx = -1; };
  const choose = m => { input.value = muniName(m); input.dataset.code = m.code; close(); showPicked(); };
  const draw = () => {
    list.innerHTML = items.map((m, i) => `<li role="option" id="${list.id}-${i}" aria-selected="${i === idx}" data-i="${i}"><b>${esc(muniName(m))}</b><span>${esc(T.suggSub(m))}</span>${curatedFor(m) ? `<em>${T.suggCurated}</em>` : ''}</li>`).join('');
    input.setAttribute('aria-activedescendant', idx >= 0 ? `${list.id}-${idx}` : '');
  };
  input.addEventListener('input', () => {
    delete input.dataset.code; showPicked();
    items = searchMunis(input.value); idx = -1;
    if (!items.length) { close(); return; }
    draw(); list.hidden = false; input.setAttribute('aria-expanded', 'true');
  });
  input.addEventListener('keydown', e => {
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { idx = Math.min(items.length - 1, idx + 1); draw(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { idx = Math.max(0, idx - 1); draw(); e.preventDefault(); }
    else if (e.key === 'Enter') { choose(items[Math.max(0, idx)]); e.preventDefault(); }
    else if (e.key === 'Escape') close();
  });
  list.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); choose(items[+li.dataset.i]); } });
  input.addEventListener('blur', () => setTimeout(close, 120));
  input.showPicked = showPicked;
}

// 北海道・沖縄は海を渡るので、距離に関係なく飛行機になりやすい
const isHokkaido = p => p.lat > 41.3 && p.lng > 139.4;
const isOkinawa = p => p.lat < 27.6;
function transport(o, d) {
  const dist = km(o, d), road = dist * 1.25;
  if (dist < 15) return {mode: 'local', label: T.modes.local, hours: 0, cost: 0, km: dist};
  const plane = (isOkinawa(o) !== isOkinawa(d)) || ((isHokkaido(o) !== isHokkaido(d)) && dist > 450) || dist > 900;
  if (plane) return {mode: 'plane', label: T.modes.plane, hours: dist / 650 + 2.3, cost: 14000 + dist * 11, km: dist};
  if (dist < 110) return {mode: 'train', label: T.modes.train, hours: road / 45 + 0.3, cost: Math.max(500, road * 22), km: dist};
  return {mode: 'shinkansen', label: T.modes.shinkansen, hours: road / 175 + 0.6, cost: road * 30, km: dist};
}

// ---------- Wikipedia から行き先を組み立てる(登録外の行き先用) ----------
// 言語ごとの記事名の判定。英語版で記事が足りない町は日本語版 Wikipedia に切り替える
const WIKI = {en: {skip: /(Station|School|University|College|Hospital|Post Office|Line$|Road|Route|Expressway|Interchange|Junction|Office|City Hall|Town Hall|Incident|Bank|Company|Corporation|Factory|Building|Apartment|Center$|Centre$|Airport|Port$|Harbor|Broadcast|Newspaper|Hotel|District$|Prefecture|Dam$|Power)/, cls: [
  [/(Shrine|Jinja|Jingu|Taisha|Temple|-ji\b|-in\b|Cathedral|Church|Hachiman|Inari|Tenmangu|-gu\b)/i, '寺社', 1],
  [/(Castle|Ruins|Residence|House$|Jinya|Kofun|Tumulus|Site$|Juku|Barrier|Samurai)/i, '歴史', 1],
  [/(Art Museum|Museum of Art|Gallery|\bArt\b)/i, '美術館', 1.5],
  [/(Museum|Memorial|Aquarium|Zoo|Science|Planetarium|Folk Village)/i, '博物館', 1.5],
  [/(Onsen|Hot Spring|\bSpa\b)/i, '温泉', 1.5],
  [/(Market|Yokocho|Shopping Street|Brewery|Distillery|Winery|Farm|Michi-no-eki)/i, 'グルメ', 1],
  [/(Garden|Park|Mount\b|Mt\.|Mountain|-yama\b|-dake\b|Falls|Waterfall|Gorge|Valley|Lake|Pond|Cape|Beach|Coast|Island|Plateau|Marsh|Wetland|Forest|River)/i, '自然', 1.5],
  [/(Cave|Rice Terraces|Pass$|Observatory|Lookout|\bSki\b|Botanical)/i, '絶景', 1.5],
  [/(Kannon|Fudo|Jizo|Daishi|Buddha)/i, '寺社', 0.75],
  [/(Street|Townscape|Old Town|Highway|Kaido|Tower|Lighthouse|Preservation)/i, '街歩き', 1]
]}, ja: {skip: /(駅|学校|大学|病院|郵便局|線$|道路|交差点|役所|役場|インターチェンジ|ジャンクション|団地|高速|国道|号線|事件|株式会社|銀行|公民館|消防|警察|変電|発電|工場|ビル$|マンション|センター$|停留所|空港$|港$|放送|新聞|ホテル)/, cls: [
  [/(神社|神宮|大社|寺|院$|八幡|稲荷|天満宮|御嶽|教会|天主堂)/, '寺社', 1],
  [/(城|跡$|屋敷|陣屋|古墳|遺跡|宿場|番所)/, '歴史', 1],
  [/(美術館|ギャラリー)/, '美術館', 1.5],
  [/(博物館|資料館|記念館|科学館|水族館|動物園|文学館)/, '博物館', 1.5],
  [/(温泉|湯$)/, '温泉', 1.5],
  [/(市場|横丁|商店街|朝市)/, 'グルメ', 1],
  [/(庭園|公園|山$|岳$|滝|渓谷|峡|湖|池$|岬|浜$|海岸|島$|高原|湿原|森$|川$)/, '自然', 1.5],
  [/(道の駅|酒造|醸造|ワイナリー|蒸溜所|牧場|農園|果樹園)/, 'グルメ', 1],
  [/(鍾乳洞|洞窟|棚田|ダム$|峠$|展望台|海水浴場|キャンプ場|スキー場|植物園|自然公園)/, '絶景', 1.5],
  [/(観音|不動|地蔵|大師)/, '寺社', 0.75],
  [/(通り$|町並み|街並み|街道|坂$|橋$|タワー|灯台|古民家|宿場町)/, '街歩き', 1]
]}};
async function wikiGet(params, lang = T.wikiLang) {
  const r = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&format=json&origin=*` + params);
  if (!r.ok) throw new Error('wiki');
  return r.json();
}
async function wikiCoords(q) {
  const j = await wikiGet(`&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=1&prop=coordinates`);
  const p = Object.values(j.query?.pages || {})[0];
  if (!p?.coordinates) return null;
  return {name: q, lat: p.coordinates[0].lat, lng: p.coordinates[0].lon};
}
async function wikiDest(q, muni, lang = T.wikiLang) {
  const c = muni || await wikiCoords(q);
  if (!c) return null;
  const pages = new Map();
  const grab = async pt => {
    const j = await wikiGet(`&generator=geosearch&ggscoord=${pt.lat}|${pt.lng}&ggsradius=10000&ggslimit=50&prop=pageviews|coordinates&colimit=max&pvipdays=30`, lang);
    Object.values(j.query?.pages || {}).forEach(p => pages.set(p.pageid, p));
  };
  await grab(c);
  let spots = collectSpots([...pages.values()], lang);
  // 小さな町は見どころが少ないので、となりの市町村まで範囲を広げる
  if (muni && spots.length < 14) {
    const near = MUNIS.filter(x => x !== muni && !x.code.includes('P')).map(x => [km(muni, x), x]).filter(([d]) => d > 4 && d < 22).sort((a, b) => a[0] - b[0]);
    for (const [, n] of near.slice(0, 3)) { await grab(n); spots = collectSpots([...pages.values()], lang); if (spots.length >= 14) break; }
  }
  if (spots.length < 4) return null;
  spots.sort((a, b) => b.views - a.views);
  spots = spots.slice(0, 50);
  const cut = Math.max(2, Math.round(spots.length * 0.35));
  spots.forEach((s, i) => { s.kind = i < cut ? 'f' : 'h'; });
  await addExtracts(spots, lang);
  spots.sort((a, b) => (b.lat - a.lat) || (a.lng - b.lng));
  const name = muni ? muniName(muni) : q;
  const where = muni ? (isEn ? `${muni.en}, ${prefEnFull(muni.pref)}` : `${muni.pref}${muni.gun}${muni.name}`) : q;
  return {id: 'wiki:' + (muni ? muni.code : q), name, nameJa: muni ? muni.name : q, pref: muni?.pref || '', aliases: [name], lat: c.lat, lng: c.lng, wiki: true,
    lead: T.wikiLead(where), stay: T.wikiStay(name), foods: [], spots};
}
async function addExtracts(spots, lang) {
  for (let i = 0; i < spots.length; i += 20) {
    const batch = spots.slice(i, i + 20);
    try {
      const j = await wikiGet(`&prop=extracts&exintro=1&explaintext=1&exsentences=1&exlimit=20&pageids=${batch.map(s => s.pageid).join('|')}`, lang);
      const pages = j.query?.pages || {};
      batch.forEach(s => {
        let t = (pages[s.pageid]?.extract || '').replace(/[((][^))]*[))]/g, '').replace(/\s+/g, ' ').replace(/ ([,.])/g, '$1').trim();
        const max = lang === 'en' ? 180 : 80;
        if (t) s.tip = t.length > max ? t.slice(0, max - 2) + '…' : t;
      });
    } catch {}
  }
}
function collectSpots(pages, lang) {
  const {skip, cls} = WIKI[lang];
  const spots = [];
  for (const p of pages) {
    const t = p.title;
    if (skip.test(t) || !p.coordinates) continue;
    const cl = cls.find(([re]) => re.test(t));
    if (!cl) continue;
    const views = Object.values(p.pageviews || {}).reduce((s, v) => s + (v || 0), 0);
    const lat = p.coordinates[0].lat, lng = p.coordinates[0].lon;
    spots.push({name: t, cat: cl[1], hours: cl[2], indoor: ['美術館', '博物館', '温泉'].includes(cl[1]), cost: 0, views, lat, lng,
      area: `${Math.round(lat / 0.025)}_${Math.round(lng / 0.025)}`,
      pageid: p.pageid, tip: T.wikiTipDefault, wiki: `https://${lang}.wikipedia.org/wiki/` + encodeURIComponent(t.replace(/ /g, '_'))});
  }
  return spots;
}

// ---------- プラン生成 ----------
function areaOrder(dest) {
  const order = [];
  dest.spots.forEach(s => { if (!order.includes(s.area)) order.push(s.area); });
  return order;
}

function dayWindow(params, tr, d, nDays) {
  const P = PACE[params.pace];
  let start = P.start, end = P.end;
  if (tr.hours > 0 && d === 0) start = Math.max(start, P.depart + tr.hours + 0.5);
  if (tr.hours > 0 && d === nDays - 1) end = Math.min(end, Math.min(18, 21.5 - tr.hours) - 0.75);
  return {start, end};
}

// 2つのスポットの離れ具合。座標があれば約3kmを1、なければエリアの並び順の差
function apart(a, b, order) {
  if (a.lat && b.lat) return km(a, b) / 3;
  return Math.abs(order.indexOf(a.area) - order.indexOf(b.area));
}
function scoreSpot(s, ctx) {
  let v = ctx.R() * 2;
  if (ctx.params.interests.length && ctx.interestCats.has(s.cat)) v += 2.5;
  if (s.kind === ctx.wantKind) v += 4;
  if (ctx.params.rain) v += s.indoor ? 3 : -1.5;
  if (ctx.last) {
    const diff = apart(s, ctx.last, ctx.order);
    v += diff < 0.5 ? 5 : diff <= 1 ? 2 : -2.5 * diff;
  } else if (ctx.visitedAreas.has(s.area)) v -= 1.5;
  return v;
}

function buildPlan(dest, params, tr, variant, seed) {
  const R = rng(seed + '|' + variant + '|' + dest.id);
  const P = PACE[params.pace];
  const target = VARIANTS[variant].famous;
  const nDays = params.nights + 1;
  const order = areaOrder(dest);
  const interestCats = new Set(INTERESTS.filter(i => params.interests.includes(i.id)).flatMap(i => i.cats));
  const used = new Set(), visitedAreas = new Set();
  let fCount = 0, total = 0;
  const days = [];
  for (let d = 0; d < nDays; d++) {
    const {start, end} = dayWindow(params, tr, d, nDays);
    let cap = end - start - (start < 13.5 && end > 12.5 ? 1 : 0);
    const spots = [];
    let last = null;
    while (spots.length < P.max && cap >= 0.5) {
      const room = spots.length ? cap - P.gap : cap;
      const wantKind = total === 0 ? (target >= 0.5 ? 'f' : 'h') : (fCount / total < target ? 'f' : 'h');
      const cands = dest.spots.filter(s => !used.has(s.name) && !s.night && s.hours <= room + 0.01);
      if (!cands.length) break;
      const ctx = {R, params, interestCats, wantKind, last, order, visitedAreas};
      let best = null, bestV = -1e9;
      for (const s of cands) { const v = scoreSpot(s, ctx); if (v > bestV) { bestV = v; best = s; } }
      // 近くに行ける場所が残っていなければ、遠くへ飛ばずにその日は切り上げる
      if (last && spots.length >= 2 && apart(best, last, order) > (dest.wiki ? 4 : 2)) break;
      spots.push(best); used.add(best.name);
      cap -= best.hours + (spots.length > 1 ? P.gap : 0);
      last = best;
      total++; if (best.kind === 'f') fCount++;
    }
    spots.forEach(s => visitedAreas.add(s.area));
    let night = null;
    if (d < nDays - 1 || tr.hours === 0) {
      const nc = dest.spots.filter(s => s.night && !used.has(s.name));
      const chance = params.pace === 'slow' ? 0.35 : 0.75;
      if (nc.length && R() < chance) {
        nc.sort((a, b) => ((b.kind === (target >= 0.5 ? 'f' : 'h')) - (a.kind === (target >= 0.5 ? 'f' : 'h'))) || (R() - 0.5));
        night = nc[0]; used.add(night.name);
      }
    }
    days.push({spots, night});
  }
  return {variant, days};
}

function hiddenRatio(plan) {
  const all = plan.days.flatMap(d => [...d.spots, ...(d.night ? [d.night] : [])]);
  return all.length ? all.filter(s => s.kind === 'h').length / all.length : 0;
}

// 1日のタイムラインを組み立てる
function schedule(state, plan, d) {
  const {params, dest, tr, from} = state;
  const P = PACE[params.pace];
  const nDays = params.nights + 1;
  const day = plan.days[d];
  const {start} = dayWindow(params, tr, d, nDays);
  const foods = dest.foods.length ? dest.foods : [T.defaultFood];
  const food = k => foods[(d * 2 + k + plan.variant) % foods.length];
  const items = [];
  if (d === 0 && tr.hours > 0) {
    items.push({t: P.depart, type: 'move', title: T.depart(from.name), sub: T.departSub(tr.label, fmtH(tr.hours))});
    items.push({t: P.depart + tr.hours, type: 'move', title: T.arrive(dest.name), sub: T.arriveSub});
  }
  let t = start, lunch = false;
  day.spots.forEach((s, i) => {
    if (i > 0) t += P.gap;
    if (!lunch && t >= 11.5 && t < 14.5) { items.push({t, type: 'meal', title: T.lunch(food(0)), sub: T.lunchSub}); t += 1; lunch = true; t += 0.15; }
    items.push({t, type: 'spot', s, i});
    t += s.hours;
  });
  if (!day.spots.length) {
    items.push({t, type: 'meal', title: T.free, sub: T.freeSub});
    t += d === nDays - 1 && tr.hours > 0 ? Math.max(0.5, 11 - t) : 2;
  }
  if (!lunch && t >= 11.5 && t < 14.5 && start < 14) { items.push({t: t + 0.2, type: 'meal', title: T.lunch(food(0))}); t += 1.2; }
  const last = d === nDays - 1;
  if (last && tr.hours > 0) {
    const leave = Math.max(t + 0.5, start + 0.5);
    items.push({t: leave - 0.4, type: 'meal', title: T.gifts, sub: T.giftsSub(dest.gift)});
    items.push({t: leave, type: 'move', title: T.leave(dest.name), sub: T.leaveSub(tr.label, fmtH(tr.hours))});
    items.push({t: leave + tr.hours, type: 'move', title: T.home(from.name), sub: T.homeSub});
  } else {
    const dinner = Math.max(t + 0.5, 18);
    items.push({t: dinner, type: 'meal', title: T.dinner(food(1))});
    if (day.night) items.push({t: dinner + 1.3, type: 'spot', s: day.night, i: -1});
    if (!last) items.push({t: day.night ? dinner + 1.3 + day.night.hours + 0.4 : dinner + 1.5, type: 'stay', title: T.stay(dest.name, d + 1), sub: dest.stay});
  }
  return items;
}

// ---------- 画面 ----------
let state = null;
let weather = null;

function readParams() {
  const pace = document.querySelector('input[name=pace]:checked')?.value || 'normal';
  const style = +(document.querySelector('input[name=style]:checked')?.value || 1);
  return {
    from: $('#from').value.trim(), to: $('#to').value.trim(), fromCode: $('#from').dataset.code || '', toCode: $('#to').dataset.code || '', date: $('#date').value,
    nights: +$('#nights').value, pace, style,
    interests: [...document.querySelectorAll('#interests input:checked')].map(i => i.value),
    budget: $('#budget').value, people: Math.max(1, +$('#people').value || 1), rain: $('#rain').checked
  };
}
function writeParams(p) {
  for (const k of ['from', 'to']) {
    const el = $('#' + k);
    if (p[k] != null) el.value = p[k];
    if (p[k + 'Code'] && muniByCode.has(p[k + 'Code'])) { el.dataset.code = p[k + 'Code']; if (isEn) el.value = muniName(muniByCode.get(p[k + 'Code'])); } else delete el.dataset.code;
    el.showPicked?.();
  }
  if (p.date) $('#date').value = p.date;
  if (p.nights != null) $('#nights').value = p.nights;
  if (p.pace) { const el = document.querySelector(`input[name=pace][value=${p.pace}]`); if (el) el.checked = true; }
  if (p.style != null) { const el = document.querySelector(`input[name=style][value="${p.style}"]`); if (el) el.checked = true; }
  if (p.interests) document.querySelectorAll('#interests input').forEach(i => { i.checked = p.interests.includes(i.value); });
  if (p.budget) $('#budget').value = p.budget;
  if (p.people) $('#people').value = p.people;
  $('#rain').checked = !!p.rain;
}

function budgetOf(st, plan) {
  const {params, tr, dest} = st;
  const B = BUDGET[params.budget];
  const nDays = params.nights + 1;
  const okinawaCar = dest.id === 'okinawa';
  const move = tr.cost * 2;
  const stay = params.nights * B.stay;
  const meal = nDays * B.meal;
  const fees = plan.days.flatMap(d => [...d.spots, ...(d.night ? [d.night] : [])]).reduce((s, x) => s + (x.cost || 0), 0);
  const local = okinawaCar ? nDays * 7000 / Math.min(params.people, 4) : nDays * 1000;
  return {move, stay, meal, fees, local, total: move + stay + meal + fees + local, localLabel: okinawaCar ? T.rentalShare : T.localTransport};
}

const WX = T.wx;
function addDays(iso, n) { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return d; }
function dayLabel(iso, n) {
  if (!iso) return '';
  return T.dayLabel(addDays(iso, n));
}
function isoOf(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

async function loadWeather(st) {
  weather = null;
  const {dest, params} = st;
  if (!params.date) return;
  const startD = addDays(params.date, 0), endD = addDays(params.date, params.nights);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const limit = new Date(today); limit.setDate(limit.getDate() + 15);
  if (endD < today || startD > limit) { weather = {out: true}; renderWeather(); return; }
  const s = isoOf(startD < today ? today : startD), e = isoOf(endD > limit ? limit : endD);
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&start_date=${s}&end_date=${e}`);
    const j = await r.json();
    if (st !== state) return;
    const map = {};
    (j.daily?.time || []).forEach((t, i) => { map[t] = {code: j.daily.weather_code[i], max: j.daily.temperature_2m_max[i], min: j.daily.temperature_2m_min[i], pop: j.daily.precipitation_probability_max[i]}; });
    weather = {map};
  } catch { weather = {failed: true}; }
  renderWeather();
}
function renderWeather() {
  const el = $('#wxFact');
  if (!el || !state) return;
  const {params} = state;
  if (!weather) { el.innerHTML = `<div class="k">${T.wxTitle}</div><div class="v">${T.wxLoading}</div>`; return; }
  if (weather.out) { el.innerHTML = `<div class="k">${T.wxTitle}</div><div class="v">—</div><div class="s">${T.wxOut}</div>`; return; }
  if (weather.failed) { el.innerHTML = `<div class="k">${T.wxTitle}</div><div class="v">—</div><div class="s">${T.wxFailed}</div>`; return; }
  let rainy = 0, shown = 0, first = null;
  for (let n = 0; n <= params.nights; n++) {
    const w = weather.map[isoOf(addDays(params.date, n))];
    const slot = document.querySelector(`[data-wx="${n}"]`);
    if (!w) continue;
    shown++; if (w.pop >= 50) rainy++; if (!first) first = w;
    if (slot) slot.innerHTML = T.wxDay(WX[w.code] || '—', Math.round(w.max), Math.round(w.min), w.pop ?? '—');
  }
  if (!first) { el.innerHTML = `<div class="k">${T.wxTitle}</div><div class="v">—</div><div class="s">${T.wxRange}</div>`; return; }
  el.innerHTML = `<div class="k">${T.wxTitleFirst}</div><div class="v">${WX[first.code] || '—'} ${Math.round(first.max)}°</div>
    <div class="s">${rainy ? T.wxRainy(rainy) : T.wxFine}</div>
    ${rainy && !params.rain ? `<button class="btn" type="button" id="toRain" style="margin-top:6px">${T.wxRedo}</button>` : ''}`;
  $('#toRain')?.addEventListener('click', () => { $('#rain').checked = true; generate(); });
}

function packingList(st) {
  const {params, dest} = st;
  const m = params.date ? addDays(params.date, 0).getMonth() + 1 : new Date().getMonth() + 1;
  const K = T.pack;
  const list = [...K.base];
  if (params.nights > 0) list.push(K.clothes(params.nights), K.toiletries);
  if ([12, 1, 2].includes(m)) list.push(dest.lat > 40 ? K.coldNorth : K.cold);
  else if ([6, 7, 8, 9].includes(m)) list.push(...K.sun);
  else list.push(K.mild);
  if (params.rain || [6, 7].includes(m)) list.push(K.umbrella);
  if (dest.id === 'okinawa' && m >= 4 && m <= 10) list.push(K.swim);
  const plan = st.plans[st.active];
  if (plan.days.some(d => d.spots.some(s => s.cat === '温泉'))) list.push(K.towel);
  if (plan.days.some(d => d.spots.some(s => s.cat === '寺社'))) list.push(K.goshuin);
  if (dest.id === 'okinawa') list.push(K.license);
  list.push(K.bag);
  return list;
}

function mapsLink(s, dest) {
  const q = s.lat ? `${s.lat},${s.lng}` : `${s.name} ${dest.wiki ? '' : dest.name}${isEn ? ' Japan' : ''}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
function routeLink(day, dest) {
  const pts = day.spots.map(s => s.lat ? `${s.lat},${s.lng}` : `${s.name} ${dest.wiki ? '' : dest.name}${isEn ? ' Japan' : ''}`);
  if (pts.length < 2) return null;
  const [o, ...rest] = pts; const dst = rest.pop();
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(o)}&destination=${encodeURIComponent(dst)}${rest.length ? '&waypoints=' + encodeURIComponent(rest.join('|')) : ''}&travelmode=transit`;
}

const hotelKeyword = dest => isEn
  ? {en: [dest.name, dest.pref ? prefEn(dest.pref) : '', 'Japan'].filter(Boolean).join(', '), ja: dest.wiki ? dest.pref + (dest.nameJa || '') : dest.nameJa}
  : (dest.wiki && dest.pref ? dest.pref + dest.name : dest.name);
const hotelProviders = isEn ? HOTEL_PROVIDERS_EN : HOTEL_PROVIDERS;
const carProviders = isEn ? CAR_PROVIDERS_EN : CAR_PROVIDERS;
const needsCar = dest => dest.id === 'okinawa' || !!dest.wiki;
const prLinks = (providers, arg, cls = '') => providers.map(p => `<a class="${cls}" href="${esc(p.url(arg))}" target="_blank" rel="noopener sponsored">${esc(p.label)}</a>`).join('');

function render() {
  const st = state, {params, dest, tr, from} = st;
  const plan = st.plans[st.active];
  const nDays = params.nights + 1;
  const b = budgetOf(st, plan);
  const pp = b.total;
  const durLabel = T.dur(params.nights);
  const tabs = st.plans.map((p, i) => {
    const hr = hiddenRatio(p);
    return `<button type="button" class="tab" role="tab" aria-selected="${i === st.active}" data-tab="${i}">
      <b>${VARIANTS[i].label}</b><small>${VARIANTS[i].desc}</small>
      <span class="meter" aria-label="${T.hiddenRate(Math.round(hr * 100))}"><i style="width:${Math.round(hr * 100)}%;margin-left:auto"></i></span>
      <small>${T.ratio(100 - Math.round(hr * 100), Math.round(hr * 100))}</small></button>`;
  }).join('');

  const days = plan.days.map((day, d) => {
    const items = schedule(st, plan, d);
    const lis = items.map(it => {
      if (it.type === 'spot') {
        const s = it.s;
        const badge = s.kind === 'h' ? `<span class="stamp">${T.stamp}</span>` : `<span class="tag-f">${T.classic}</span>`;
        return `<li class="spot ${s.kind}"><time>${fmtT(it.t)}</time><span class="dot"></span><div class="ev"><div class="spotcard">
          <div class="ttl">${badge}<span class="name">${esc(s.name)}</span></div>
          <div class="meta"><span>${esc(catLabel(s.cat))}</span><span>${T.stayAbout(fmtH(s.hours))}</span>${s.cost ? `<span>${T.fromYen(yen(s.cost))}</span>` : `<span>${T.free0}</span>`}${s.indoor ? `<span class="rain">${T.rainOk}</span>` : ''}${s.area && !dest.wiki ? `<span>${esc(T.areaLabel(s.area))}</span>` : ''}</div>
          <p>${esc(s.tip)}</p>
          <div class="sacts"><a href="${mapsLink(s, dest)}" target="_blank" rel="noopener">${T.map}</a>${s.wiki ? `<a href="${s.wiki}" target="_blank" rel="noopener">Wikipedia</a>` : ''}
          <button type="button" data-swap="${d}:${it.i}">${T.swap}</button><button type="button" data-del="${d}:${it.i}">${T.remove}</button></div>
        </div></div></li>`;
      }
      const book = it.type === 'stay' ? `<div class="sacts"><span class="pr">PR</span>${prLinks(hotelProviders, hotelKeyword(dest))}</div>` : '';
      return `<li class="${it.type}"><time>${fmtT(it.t)}</time><span class="dot"></span><div class="ev"><div class="t">${esc(it.title)}</div>${it.sub ? `<div class="sub">${esc(it.sub)}</div>` : ''}${book}</div></li>`;
    }).join('');
    const rl = routeLink(day, dest);
    return `<article class="day"><div class="day-h"><h3><span class="no">${T.dayNo(d + 1)}</span>${dayLabel(params.date, d)}</h3><span class="wx" data-wx="${d}"></span></div>
      <ol class="tl">${lis}</ol>
      <div class="day-f"><button type="button" class="btn" data-add="${d}">${T.addSpot}</button>${rl ? `<a class="btn" href="${rl}" target="_blank" rel="noopener">${T.route}</a>` : ''}</div></article>`;
  }).join('');

  const pack = packingList(st);
  const checked = store.get('pack', {});
  const saved = store.get('saved', []);

  $('#result').innerHTML = `
    <div class="dest-head">
      <div class="route">${esc(from.name)} → ${esc(dest.name)}</div>
      <h2 class="plan-title">${esc(dest.name)} ${durLabel}<small>${PACE[params.pace].label}${isEn ? ' · ' : '・'}${T.people(params.people)}</small></h2>
      <p class="lead">${esc(dest.lead)}</p>
    </div>
    ${st.notice ? `<div class="notice">${st.notice}</div>` : ''}
    ${dest.note ? `<div class="notice">${esc(dest.note)}</div>` : ''}
    <div class="facts">
      <div class="fact"><div class="k">${T.trTitle}</div><div class="v">${tr.hours ? T.trValue(tr.label, fmtH(tr.hours)) : T.trLocal}</div><div class="s">${tr.hours ? T.trSub(Math.round(tr.km), yen(tr.cost)) : T.trLocalSub}</div></div>
      <div class="fact"><div class="k">${T.budget}</div><div class="v">${yen(pp)}</div>
        <details><summary>${T.breakdown}</summary><dl>
        <dt>${T.bMove}</dt><dd>${yen(b.move)}</dd><dt>${T.bStay(params.nights)}</dt><dd>${yen(b.stay)}</dd>
        <dt>${T.bMeal}</dt><dd>${yen(b.meal)}</dd><dt>${T.bFees}</dt><dd>${yen(b.fees)}</dd><dt>${b.localLabel}</dt><dd>${yen(b.local)}</dd>
        <dt><b>${T.bTotal(T.people(params.people))}</b></dt><dd><b>${yen(pp * params.people)}</b></dd></dl></details></div>
      <div class="fact" id="wxFact"></div>
    </div>
    <div class="tabs" role="tablist" aria-label="${T.planTypes}">${tabs}</div>
    <div class="toolbar">
      <button type="button" class="btn" id="shuffle">${T.shuffle}</button>
      <button type="button" class="btn" id="save">${T.save}</button>
      <button type="button" class="btn" id="copyText">${T.copyText}</button>
      ${/^https?:/.test(location.protocol) ? `<button type="button" class="btn" id="copyLink">${T.copyLink}</button>` : ''}
      <span class="toast" id="toast" role="status"></span>
    </div>
    <div class="legendrow">${T.legend}</div>
    ${days}
    <div class="book">
      <div class="book-h"><h4>${esc(T.bookTitle(dest.name))}</h4><span class="pr">PR</span></div>
      <p>${esc(dest.stay)}</p>
      <div class="book-links">${prLinks(hotelProviders, hotelKeyword(dest), 'btn-book')}${needsCar(dest) ? prLinks(carProviders, null, 'btn-book alt') : ''}</div>
      ${needsCar(dest) ? `<p class="hint" style="margin:0">${T.carHint}</p>` : ''}
    </div>
    <div class="extras">
      <div class="box"><h4>${esc(T.eatTitle(dest.name))}</h4>${dest.foods.length ? `<ul>${dest.foods.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : `<p class="hint" style="margin:0">${T.eatNone}</p>`}</div>
      <div class="box"><h4>${T.packTitle}</h4><ul class="pack">${pack.map((p, i) => `<li><label><input type="checkbox" id="pk${i}" data-pack="${esc(p)}" ${checked[p] ? 'checked' : ''}><span>${esc(p)}</span></label></li>`).join('')}</ul></div>
      <div class="box" style="grid-column:1/-1"><h4>${T.savedTitle}</h4>${saved.length ? `<ul class="saved">${saved.map((s, i) => `<li><span>${esc(s.title)}</span><span style="display:flex;gap:6px;flex:none"><button type="button" class="btn" data-open="${i}">${T.open}</button><button type="button" class="btn" data-rm="${i}">${T.del}</button></span></li>`).join('')}</ul>` : `<p class="hint" style="margin:0">${T.savedNone}</p>`}</div>
    </div>`;
  renderWeather();
}

function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; clearTimeout(toast.h); toast.h = setTimeout(() => { t.textContent = ''; }, 2500);
}

function planText() {
  const {params, dest, from} = state;
  const plan = state.plans[state.active];
  const lines = [T.textHead(dest.name, T.dur(params.nights), VARIANTS[plan.variant].label, from.name)];
  plan.days.forEach((_, d) => {
    lines.push('', T.textDay(d + 1, dayLabel(params.date, d)));
    schedule(state, plan, d).forEach(it => {
      lines.push(`${fmtT(it.t).padStart(5)} ${it.type === 'spot' ? `[${it.s.kind === 'h' ? T.hidden : T.classic}] ` + it.s.name : it.title}`);
    });
  });
  lines.push('', T.textFooter);
  return lines.join('\n');
}
async function copy(text, ok) {
  try { await navigator.clipboard.writeText(text); toast(ok); }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast(ok); } catch { toast(T.copyFail); }
    ta.remove();
  }
}

function swapSpot(d, i) {
  const plan = state.plans[state.active];
  const day = plan.days[d];
  const cur = i < 0 ? day.night : day.spots[i];
  const used = new Set(plan.days.flatMap(x => [...x.spots, ...(x.night ? [x.night] : [])]).map(s => s.name));
  const order = areaOrder(state.dest);
  const R = rng(newSeed());
  const cands = state.dest.spots.filter(s => !used.has(s.name) && s.night === cur.night && s.hours <= cur.hours + 1);
  if (!cands.length) { toast(T.noSwap); return; }
  const near = i > 0 ? day.spots[i - 1].area : cur.area;
  const scored = cands.map(s => {
    const diff = Math.abs(order.indexOf(s.area) - order.indexOf(near));
    return [s, (s.kind === cur.kind ? 3 : 0) + (diff === 0 ? 3 : diff === 1 ? 1.5 : -diff * 0.5) + (state.params.rain && s.indoor ? 2 : 0) + R() * 2.5];
  }).sort((a, b) => b[1] - a[1]);
  const pick = scored[0][0];
  if (i < 0) day.night = pick; else day.spots[i] = pick;
  render();
}
function addSpot(d) {
  const plan = state.plans[state.active];
  const day = plan.days[d];
  const used = new Set(plan.days.flatMap(x => [...x.spots, ...(x.night ? [x.night] : [])]).map(s => s.name));
  const order = areaOrder(state.dest);
  const last = day.spots[day.spots.length - 1];
  const want = hiddenRatio(plan) > 1 - VARIANTS[plan.variant].famous ? 'f' : 'h';
  const R = rng(newSeed());
  const cands = state.dest.spots.filter(s => !used.has(s.name) && !s.night && s.hours <= 2.5);
  if (!cands.length) { toast(T.noAdd); return; }
  cands.sort((a, b) => {
    const f = s => (last ? -Math.abs(order.indexOf(s.area) - order.indexOf(last.area)) * 1.5 : 0) + (s.kind === want ? 2 : 0) + R();
    return f(b) - f(a);
  });
  day.spots.push(cands[0]);
  render();
  toast(T.added(cands[0].name));
}

function paramsToQuery(p, seed) {
  const q = new URLSearchParams({f: p.from, fc: p.fromCode, t: p.to, tc: p.toCode, d: p.date, n: p.nights, p: p.pace, v: p.style, i: p.interests.join(','), b: p.budget, m: p.people, r: p.rain ? 1 : 0, s: seed});
  return q.toString();
}
function queryToParams() {
  const q = new URLSearchParams(location.search);
  if (!q.get('t')) return null;
  return {from: q.get('f') || '', fromCode: q.get('fc') || '', to: q.get('t'), toCode: q.get('tc') || '', date: q.get('d') || '', nights: +(q.get('n') || 1), pace: q.get('p') || 'normal', style: +(q.get('v') || 1),
    interests: (q.get('i') || '').split(',').filter(Boolean), budget: q.get('b') || 'mid', people: +(q.get('m') || 2), rain: q.get('r') === '1', seed: q.get('s')};
}

async function generate(seed) {
  const params = readParams();
  const res = $('#result');
  if (!params.to) { res.innerHTML = `<div class="notice">${T.needTo}</div>`; return; }
  let notice = '';
  const toM = resolveMuni($('#to'));
  let dest = toM ? curatedFor(toM) : findDest(params.to);
  if (!dest) {
    res.innerHTML = `<div class="loading">${T.searching(esc(toM ? muniLabel(toM) : params.to))}</div>`;
    let failed = false;
    try {
      dest = await wikiDest(params.to, toM);
      if (!dest && isEn && toM) { dest = await wikiDest(params.to, toM, 'ja'); if (dest) notice = T.jaWikiNotice + ' '; }
    } catch { dest = null; failed = true; }
    if (!dest) {
      res.innerHTML = `<div class="notice">${failed
        ? T.fetchFail(esc(params.to))
        : T.notFound(esc(params.to))}
        <br><br>${DESTS.map(d => `<button type="button" class="btn" data-pick="${esc(d.name)}">${esc(d.name)}</button>`).join(' ')}</div>`;
      return;
    }
    notice += T.wikiNotice;
  }
  const fromM = resolveMuni($('#from'));
  let from = fromM ? {name: muniName(fromM), lat: fromM.lat, lng: fromM.lng} : findPlace(params.from);
  if (!from && params.from) { try { from = await wikiCoords(params.from); } catch {} }
  if (!from) {
    from = {name: params.from || dest.name, lat: dest.lat, lng: dest.lng};
    if (params.from) notice += (notice ? '<br>' : '') + T.fromUnknown(esc(params.from));
  }
  const tr = transport(from, dest);
  seed = seed || newSeed();
  const plans = VARIANTS.map((_, v) => buildPlan(dest, params, tr, v, seed));
  state = {params, dest, tr, from, plans, active: params.style, seed, notice};
  render();
  loadWeather(state);
  store.set('last', params);
}

function init() {
  $('#nights').innerHTML = Array.from({length: 7}, (_, n) => `<option value="${n}">${T.nightsOpt(n)}</option>`).join('');
  $('#nights').value = 2;
  $('#interests').innerHTML = INTERESTS.map(i => `<label><input type="checkbox" id="in-${i.id}" value="${i.id}"><span>${i.label}</span></label>`).join('');
  setupCombo($('#from')); setupCombo($('#to'));
  $('#destHint').innerHTML = T.destHint + DESTS.map(d => `<button type="button" data-pick="${d.name}">${d.name}</button>`).join(isEn ? ', ' : '・');
  const dflt = new Date(); dflt.setDate(dflt.getDate() + 10);
  $('#date').value = isoOf(dflt);

  const fromQuery = queryToParams();
  const preset = window.PRESET;
  const last = store.get('last', null);
  if (fromQuery) writeParams(fromQuery);
  else if (preset) writeParams({from: last?.from || T.dfltFrom, fromCode: last ? last.fromCode : '13101', interests: [], ...preset});
  else if (last) writeParams({...last, date: last.date && new Date(last.date) >= new Date(isoOf(new Date())) ? last.date : isoOf(dflt)});
  else writeParams({from: T.dfltFrom, fromCode: '13101', to: isEn ? 'Kyoto' : '京都市', toCode: '26P10', nights: 2, interests: ['history', 'food']});

  $('#tripForm').addEventListener('submit', e => { e.preventDefault(); generate(); });
  document.addEventListener('click', e => {
    const el = e.target.closest('button,[data-pick]');
    if (!el) return;
    if (el.dataset.pick) {
      const d = DESTS.find(x => x.name === el.dataset.pick);
      const m = MUNIS.find(x => d.muni === '東京23区' ? x.code === '13101' : x.name === d.muni);
      writeParams({...readParams(), to: d.name, toCode: m && d.muni !== '東京23区' ? m.code : ''});
      generate(); return;
    }
    if (!state) return;
    if (el.dataset.tab != null) { state.active = +el.dataset.tab; render(); return; }
    if (el.dataset.swap) { const [d, i] = el.dataset.swap.split(':').map(Number); swapSpot(d, i); return; }
    if (el.dataset.del) {
      const [d, i] = el.dataset.del.split(':').map(Number);
      const day = state.plans[state.active].days[d];
      if (i < 0) day.night = null; else day.spots.splice(i, 1);
      render(); return;
    }
    if (el.dataset.add) { addSpot(+el.dataset.add); return; }
    if (el.dataset.open != null) {
      const s = store.get('saved', [])[+el.dataset.open];
      if (!s) return;
      writeParams(s.params);
      const dest = s.dest || findDest(s.params.to);
      const byName = new Map(dest.spots.map(x => [x.name, x]));
      const days = s.days.map(d => ({spots: d.spots.map(n => byName.get(n)).filter(Boolean), night: d.night ? byName.get(d.night) || null : null}));
      const plans = VARIANTS.map((_, v) => buildPlan(dest, s.params, s.tr, v, s.seed));
      plans[s.variant] = {variant: s.variant, days};
      state = {params: s.params, dest, tr: s.tr, from: s.from, plans, active: s.variant, seed: s.seed, notice: ''};
      render(); loadWeather(state); window.scrollTo({top: 0, behavior: 'smooth'}); return;
    }
    if (el.dataset.rm != null) { const list = store.get('saved', []); list.splice(+el.dataset.rm, 1); store.set('saved', list); render(); return; }
    switch (el.id) {
      case 'shuffle': generate(newSeed()); break;
      case 'copyText': copy(planText(), T.copied); break;
      case 'copyLink': copy(location.origin + location.pathname + '?' + paramsToQuery(state.params, state.seed), T.linkCopied); break;
      case 'save': {
        const plan = state.plans[state.active];
        const list = store.get('saved', []);
        const {params, dest, from, tr} = state;
        list.unshift({title: T.savedTitleFmt(dest.name, T.dur(params.nights), VARIANTS[plan.variant].label, dayLabel(params.date, 0) || T.noDate),
          params, seed: state.seed, variant: plan.variant, from, tr, dest: dest.wiki ? dest : null,
          days: plan.days.map(d => ({spots: d.spots.map(s => s.name), night: d.night?.name || null}))});
        store.set('saved', list.slice(0, 20));
        render(); toast(T.saved); break;
      }
    }
  });
  document.addEventListener('change', e => {
    if (e.target.dataset?.pack != null) { const c = store.get('pack', {}); c[e.target.dataset.pack] = e.target.checked; store.set('pack', c); }
  });
  generate(fromQuery?.seed);
}
init();
