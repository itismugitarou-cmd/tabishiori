// English version: loaded only on /en/ pages, after munis.js / data.js / affiliate.js and before app.js.
// It translates the data in place (spot names, tips, labels) and adds English names to every municipality.

// ---------- Municipality names in English (romanized from the kana reading) ----------
const PREFS_EN = ["Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima", "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu", "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama", "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka", "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa"];
const prefEn = p => PREFS_EN[PREFS.indexOf(p)] || p;
const prefEnFull = p => p === '北海道' ? 'Hokkaido' : p === '東京都' ? 'Tokyo' : `${prefEn(p)} Prefecture`;

const KANA = {'きゃ':'kya','きゅ':'kyu','きょ':'kyo','しゃ':'sha','しゅ':'shu','しょ':'sho','ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo','ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','みゃ':'mya','みゅ':'myu','みょ':'myo','りゃ':'rya','りゅ':'ryu','りょ':'ryo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo','じゃ':'ja','じゅ':'ju','じょ':'jo','ぢゃ':'ja','ぢゅ':'ju','ぢょ':'jo','びゃ':'bya','びゅ':'byu','びょ':'byo','ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to','な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no','は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ま':'ma','み':'mi','む':'mu','め':'me','も':'mo','や':'ya','ゆ':'yu','よ':'yo','ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','ゐ':'i','ゑ':'e','を':'o','ん':'n',
'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo','だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo','ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po','ゔ':'vu','ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o','ゃ':'ya','ゅ':'yu','ょ':'yo','ー':''};
// Simplified Hepburn without macrons (とうきょう → Tokyo, おおさか → Osaka)
function romaji(k) {
  let out = '';
  for (let i = 0; i < k.length; i++) {
    if (k[i] === 'っ') { const nx = KANA[k.slice(i + 1, i + 3)] || KANA[k[i + 1]] || ''; out += nx.startsWith('ch') ? 't' : nx[0] || ''; continue; }
    if ('ゃゅょ'.includes(k[i + 1] || '-') && KANA[k.slice(i, i + 2)]) { out += KANA[k.slice(i, i + 2)]; i++; continue; }
    out += KANA[k[i]] ?? k[i];
  }
  out = out.replace(/ou/g, 'o').replace(/oo/g, 'o').replace(/uu/g, 'u');
  return out.charAt(0).toUpperCase() + out.slice(1);
}
const KANA_TAIL = {'市': ['し'], '区': ['く'], '町': ['ちょう', 'まち'], '村': ['そん', 'むら']};
const TYPE_EN = {'市': 'City', '区': 'Ward', '町': 'Town', '村': 'Village'};
const NAME_FIX = {'江差町': 'Esashi (Hiyama)', '枝幸町': 'Esashi (Soya)'};
const stripTail = (name, kana) => { const t = (KANA_TAIL[name.slice(-1)] || []).find(t => kana.endsWith(t)); return t ? kana.slice(0, -t.length) : kana; };
{
  const cityKana = new Map(MUNIS.filter(m => m.code.includes('P')).map(m => [m.pref + m.name, m.kana]));
  for (const m of MUNIS) {
    m.enType = TYPE_EN[m.name.slice(-1)] || '';
    const ward = m.name.match(/^(.+?市)(.+区)$/);
    if (ward && cityKana.has(m.pref + ward[1])) {
      const ck = cityKana.get(m.pref + ward[1]);
      m.en = `${romaji(stripTail(ward[1], ck))} ${romaji(stripTail(m.name, m.kana.slice(ck.length)))} Ward`;
    } else m.en = NAME_FIX[m.name] || romaji(stripTail(m.name, m.kana));
    m.prefEn = prefEn(m.pref);
  }
  // 同じ県に同じ読みの町村がある場合(木曽町と木祖村など)は種別を添えて区別する
  const seen = new Map();
  MUNIS.forEach(m => { const k = m.pref + m.en; seen.set(k, (seen.get(k) || 0) + 1); });
  MUNIS.forEach(m => { if (seen.get(m.pref + m.en) > 1 && !m.code.includes('P')) m.en += ' ' + m.enType; m.romaji = m.en.toLowerCase().replace(/[^a-z]/g, ''); });
}

// ---------- Categories, interests, pace, plan types, budget ----------
const CAT_EN = {'寺社': 'Temple & shrine', '歴史': 'History', '美術館': 'Art', '博物館': 'Museum', '温泉': 'Hot spring', 'グルメ': 'Food', '自然': 'Nature', '絶景': 'Scenic view', '街歩き': 'Strolling', '買い物': 'Shopping', '体験': 'Hands-on', '遊び': 'Fun'};
const INTERESTS_EN = {history: 'History & temples', nature: 'Nature & views', food: 'Food', art: 'Art & museums', town: 'Strolling & shopping', relax: 'Hot springs & activities'};
INTERESTS.forEach(i => { i.label = INTERESTS_EN[i.id]; });
Object.assign(PACE.slow, {label: 'Relaxed'}); Object.assign(PACE.normal, {label: 'Moderate'}); Object.assign(PACE.many, {label: 'Packed'});
Object.assign(VARIANTS[0], {label: 'Classic Highlights', desc: 'For first-timers. Covers all the famous sights.'});
Object.assign(VARIANTS[1], {label: 'Best of Both', desc: 'Half famous sights, half hidden gems.'});
Object.assign(VARIANTS[2], {label: 'Off the Beaten Path', desc: 'Skip the crowds and go one page past the guidebook.'});
Object.assign(BUDGET.low, {label: 'Budget'}); Object.assign(BUDGET.mid, {label: 'Standard'}); Object.assign(BUDGET.high, {label: 'Splurge'});

// ---------- Curated destinations ----------
// spots: [name, area, tip] in the same order as data.js
const DESTS_EN = {
tokyo: {name: "Tokyo", gift: "ningyo-yaki cakes or Tokyo Banana",
lead: "From old-town Asakusa to cutting-edge Shibuya, every neighborhood has its own face. Step a little off the map and you find a ravine and a used-book district.",
stay: "Asakusa or Ueno for old-town sightseeing; Shinjuku or Shibuya for shopping and nightlife.",
foods: ["Monjayaki (Tsukishima)", "Edomae sushi", "Tendon tempura bowl (Asakusa)", "Fukagawa-meshi clam rice (Kiyosumi-Shirakawa)"],
spots: [
["Senso-ji Temple & Nakamise Street", "Asakusa", "Come around 8 am for fewer people and better photos."],
["Kappabashi Kitchen Town", "Asakusa", "A street of kitchenware and plastic food sample shops. Fun even just to browse."],
["Kuramae craft workshops", "Asakusa", "Small studios where you can make your own leather goods or notebooks."],
["Tokyo Skytree", "Oshiage", "Buy timed tickets for the Tembo Deck in advance to skip the line."],
["Shibamata Taishakuten Temple", "Shibamata", "The temple's carved wooden gallery is stunning. Try kusa-dango on the approach street."],
["Yanaka Ginza & Yanesen walk", "Ueno", "Famous for the view from the Yuyake Dandan steps and alleys full of cats."],
["Ueno Park & Tokyo National Museum", "Ueno", "A full day of things to do, even when it rains."],
["Kyu-Furukawa Gardens", "Ueno", "A Western mansion, a rose garden and a Japanese garden all in one."],
["Jimbocho used-book district", "Jimbocho", "Browse the old bookshops, then have curry at a long-running local spot."],
["Kiyosumi Garden & Kiyosumi-Shirakawa cafes", "Kiyosumi-Shirakawa", "A stroll garden where you hop across stepping stones on the pond."],
["Tsukiji Outer Market", "Tsukiji", "Liveliest from morning to noon. Graze your way through breakfast."],
["teamLab Planets", "Toyosu", "Some rooms have you walk through water, so wear clothes you can roll up."],
["Tokyo Tower", "Shiba", "Frame it with Zojo-ji Temple for the classic shot."],
["Meiji Jingu Shrine", "Harajuku", "A deep forest in the middle of the city. Lovely in the early morning."],
["Shibuya Crossing & SHIBUYA SKY", "Shibuya", "Book SHIBUYA SKY early if you want the sunset slot."],
["Meguro Parasitological Museum", "Meguro", "One of the world's few museums devoted to parasites. Free entry."],
["Shimokitazawa vintage & record shops", "Shimokitazawa", "A subculture neighborhood packed with small theaters and live music venues."],
["Todoroki Valley", "Setagaya", "The only ravine in Tokyo's 23 wards, a short walk from the station."],
["Shinjuku Gyoen National Garden", "Shinjuku", "Seasonal flowers and wide lawns for a slow afternoon."],
["Omoide Yokocho & Golden Gai", "Shinjuku", "Drop in for a drink at night in tiny bars packed side by side."],
["Mt. Takao", "Takao", "Take the cable car and even beginners can reach the top easily."]]},

kyoto: {name: "Kyoto", gift: "yatsuhashi sweets or Kyoto pickles",
lead: "Japan's capital for a thousand years. Visit the famous temples early in the morning. Go a little further and quiet moss gardens and mountain shrines await.",
stay: "Stay around Kyoto Station, or around Shijo-Kawaramachi and Gion where you can walk to the sights.",
foods: ["Yudofu (simmered tofu)", "Obanzai home-style dishes", "Nishin soba (herring soba)", "Matcha sweets"],
spots: [
["Kiyomizu-dera Temple", "Higashiyama", "Walk down Ninenzaka and Sannenzaka to Yasaka Pagoda."],
["Gion Shirakawa & Hanamikoji", "Higashiyama", "Beautiful at dusk with lanterns on the stone paths. Please respect maiko and don't chase them for photos."],
["Rokudo Chinno-ji Temple", "Higashiyama", "A mysterious temple with a well said to lead to the underworld."],
["Tofuku-ji Temple", "Higashiyama", "The autumn leaves from Tsutenkyo Bridge are among Kyoto's best. Quiet and lovely in spring green too."],
["Fushimi Inari Taisha", "Fushimi", "The further you climb through the torii gates, the fewer people. The view opens up at Yotsutsuji."],
["Fushimi sake breweries", "Fushimi", "Taste sake at the Gekkeikan Okura Museum and ride a Jikkokubune boat."],
["Nishiki Market", "Nakagyo", "Snack your way through pickles, rolled omelet and yuba."],
["Nijo Castle", "Nakagyo", "Listen for the squeaky 'nightingale floors' of Ninomaru Palace."],
["Kyoto Railway Museum", "Shimogyo", "The SL Steam train ride on a real steam locomotive is a favorite."],
["Ginkaku-ji & the Philosopher's Path", "Sakyo", "Follow the canal path all the way to Nanzen-ji."],
["Shimogamo Shrine & Tadasu no Mori", "Sakyo", "A cool path through old-growth forest. Birthplace of mitarashi dango."],
["Keibunsha bookshop in Ichijoji", "Sakyo", "A famous, beautifully curated bookshop. The area is a ramen hotspot."],
["Sanzen-in Temple, Ohara", "Ohara", "Adorable little stone Jizo statues in a moss garden. About 1 hour by bus."],
["Kifune Shrine", "Kibune", "Known for fortune slips that appear on water. Riverside dining platforms in summer."],
["Kinkaku-ji (Golden Pavilion)", "Kita", "Sunny mornings make the gold shine brightest on the pond."],
["Funaoka Onsen", "Kita", "A public bath registered as a cultural property. Don't miss the carved panels in the changing room."],
["Arashiyama Bamboo Grove & Togetsukyo Bridge", "Arashiyama", "The bamboo grove is quiet early in the morning. Pair it with the Sagano Romantic Train."],
["Gio-ji Temple", "Arashiyama", "A small nunnery with a beautiful carpet of moss."],
["Adashino Nenbutsu-ji Temple", "Arashiyama", "About 8,000 stone Buddhas and stupas. Walk the old Saga-Toriimoto street too."]]},

osaka: {name: "Osaka", gift: "butaman pork buns or awa-okoshi crackers",
lead: "The city where you eat until you drop. Beyond Dotonbori and Osaka Castle, enjoy its local side: row-house cafes and Japan's longest shopping street.",
stay: "Namba or Shinsaibashi for street food; around Umeda for easy access.",
foods: ["Takoyaki", "Okonomiyaki", "Kushikatsu (Shinsekai)", "Kitsune udon"],
spots: [
["Umeda Sky Building Floating Garden", "Umeda", "Best from sunset into the night view."],
["Nakazakicho alley cafes", "Umeda", "Old row houses turned into little shops and cafes."],
["Tenjinbashisuji Shopping Street", "Tenma", "Japan's longest shopping street. The Tenma Market area is full of cheap, tasty spots."],
["Osaka Museum of Housing and Living", "Tenma", "A life-size reproduction of an Edo-period street. You can try on a kimono too."],
["Osaka Castle", "Osaka Castle", "Besides the exhibits in the keep, the view from Nishinomaru Garden is great."],
["Nakanoshima modern architecture walk", "Nakanoshima", "Retro buildings like the Central Public Hall and Nakanoshima Library."],
["Dotonbori", "Namba", "Snap a photo with the Glico sign and compare takoyaki stalls."],
["Kuromon Market", "Namba", "Osaka's kitchen. Graze on fresh seafood."],
["Tsutenkaku & Shinsekai", "Shinsekai", "Remember: no double-dipping in the kushikatsu sauce."],
["Sumiyoshi Taisha Shrine", "Sumiyoshi", "Famous for its steep arched bridge. Head shrine of all Sumiyoshi shrines in Japan."],
["Kaiyukan Aquarium", "Bay Area", "You could watch the whale shark tank for hours."],
["Universal Studios Japan", "Bay Area", "Plan on a full day. Consider an Express Pass."],
["Expo '70 Commemorative Park & Tower of the Sun", "Suita", "Tours inside the Tower of the Sun require advance booking."],
["Tsuruhashi Koreatown", "Tsuruhashi", "Yakiniku smoke and Korean grocery shops line the streets."]]},

nara: {name: "Nara", gift: "Nara-zuke pickles or deer souvenirs",
lead: "The ancient capital of deer and the Great Buddha. Nara Park alone has enough to fill a whole day.",
stay: "Stay between Kintetsu-Nara Station and Naramachi to walk the quiet park in the early morning.",
foods: ["Kakinoha-zushi (persimmon-leaf sushi)", "Chagayu (tea rice porridge)", "Kuzumochi", "Nara-zuke pickles"],
spots: [
["Todai-ji Great Buddha Hall", "Nara Park", "Crawling through the hole in the pillar is said to bring good health."],
["The deer of Nara Park", "Nara Park", "Bow to the deer before giving them a shika-senbei cracker."],
["Kasuga Taisha Shrine", "Nara Park", "The approach lined with about 3,000 stone lanterns is magical."],
["Kofuku-ji National Treasure Museum", "Nara Park", "Home of the famous Ashura statue."],
["Mt. Wakakusa", "Nara Park", "A panoramic view of Nara from the top, especially at sunset."],
["Isuien & Yoshikien Gardens", "Nara Park", "Quiet Japanese gardens that borrow Todai-ji's great roof as scenery."],
["Todai-ji Nigatsu-do Hall", "Nara Park", "The sunset from its veranda is superb. Free to visit."],
["Naramachi old town", "Naramachi", "Townhouse cafes and red 'migawari-zaru' charms hanging from the eaves."],
["Gango-ji Temple", "Naramachi", "A World Heritage temple whose roof still has tiles from the Asuka period."],
["Toshodai-ji & Yakushi-ji Temples", "Nishinokyo", "Walk between two World Heritage temples in Nishinokyo."],
["Horyu-ji Temple", "Ikaruga", "The world's oldest wooden buildings. Stroll the Ikaruga countryside too."]]},

kanazawa: {name: "Kanazawa", gift: "gold-leaf sweets or Kaga roasted tea",
lead: "The castle town of the powerful Kaga domain. Teahouse districts, gardens and contemporary art are packed close enough to walk.",
stay: "Around Kanazawa Station, or Korinbo and Katamachi for both sights and dining.",
foods: ["Seafood bowl (Omicho Market)", "Jibuni duck stew", "Kanazawa oden", "Hanton rice"],
spots: [
["Higashi Chaya District", "Higashiyama", "Try gold-leaf soft serve and rest in a townhouse cafe."],
["Kazuemachi Chaya District", "Higashiyama", "A small teahouse district along the Asano River. Lovely lit up at night."],
["Omicho Market", "Omicho", "Go from morning to noon for seafood bowls."],
["Kenroku-en Garden", "Kenroku-en", "Opens early. Take your photo at the Kotoji stone lantern."],
["Kanazawa Castle Park", "Kenroku-en", "Right next to Kenroku-en, so visit both together."],
["21st Century Museum of Contemporary Art", "Korinbo", "'The Swimming Pool' is popular, so go early."],
["D.T. Suzuki Museum", "Korinbo", "A contemplative space where you sit by the Water Mirror Garden."],
["Oyama Shrine", "Korinbo", "A gate mixing Japanese and Western styles, with stained glass."],
["Ishikawa Prefectural Library", "Korinbo", "A dramatic circular atrium dubbed the 'colosseum of books'."],
["Nagamachi Samurai District", "Nagamachi", "Earthen-walled lanes and the Nomura family garden."],
["Myoryu-ji (Ninja Temple)", "Teramachi", "Hidden stairs and trapdoors. Reserve by phone."],
["Nishi Chaya District", "Teramachi", "Quieter and smaller than Higashi. Home to an old amanatto sweet shop."]]},

sapporo: {name: "Sapporo", gift: "Shiroi Koibito cookies or butter sandwiches",
lead: "The northern capital of food and night views. Otaru and Jozankei Onsen are easy day trips from the city.",
stay: "Odori to Susukino is convenient for both sightseeing and dining.",
foods: ["Miso ramen", "Soup curry", "Jingisukan (grilled lamb)", "Seafood bowl"],
spots: [
["Hokkaido University campus", "Sapporo Station", "Ginkgo and poplar avenues that turn gold in autumn."],
["Sapporo Clock Tower", "Odori", "Smaller than you'd think, but the exhibits inside are good."],
["Odori Park & Sapporo TV Tower", "Odori", "Grab grilled corn from a cart as a snack."],
["Nijo Market", "Odori", "Have a seafood bowl for breakfast."],
["Sapporo Shiryokan", "Odori", "The stately stone former Court of Appeals. Free."],
["Susukino at night", "Susukino", "Try the local custom of ending the night with a parfait."],
["Nakajima Park & Hoheikan", "Nakajima Park", "A white-and-blue Western mansion by the pond."],
["Hokkaido Jingu Shrine & Maruyama Park", "Maruyama", "Try the 'Hangan-sama' rice cake at the teahouse in the grounds."],
["Mt. Moiwa Ropeway", "Mt. Moiwa", "One of Japan's top three night views. Go after dark."],
["Shiroi Koibito Park", "Nishi Ward", "Sweets-making workshops need a reservation."],
["Moerenuma Park", "Higashi Ward", "A whole park designed as a work of art by Isamu Noguchi."],
["Jozankei Onsen", "Jozankei", "About an hour by bus from central Sapporo. Day bathing available."],
["Otaru Canal & Sakaimachi Street", "Otaru", "About 40 minutes by train from Sapporo. Glass workshops and a music box museum."]]},

fukuoka: {name: "Fukuoka", gift: "mentaiko or Hakata Torimon sweets",
lead: "A city of yatai food stalls and the sea. The airport is close to downtown, and Dazaifu, Itoshima and Nokonoshima are easy side trips.",
stay: "Around Hakata Station, or Nakasu and Tenjin to hop between food stalls.",
foods: ["Hakata ramen", "Motsunabe (offal hot pot)", "Mizutaki chicken hot pot", "Mentaiko (spicy cod roe)"],
spots: [
["Kushida Shrine", "Hakata", "A giant Hakata Gion Yamakasa festival float is on display all year."],
["Canal City Hakata", "Hakata", "Fountain shows every 30 minutes."],
["Nakasu yatai food stalls", "Nakasu", "Stalls open in the evening. Hop between a few, Hakata style."],
["Yanagibashi Rengo Market", "Nakasu", "Hakata's kitchen. Eat breakfast alongside the locals."],
["Fukuoka City Red Brick Culture Center", "Tenjin", "A Meiji-era building by architect Tatsuno Kingo. Free."],
["Ohori Park", "Ohori", "About 2 km around the pond, with castle ruins in Maizuru Park next door."],
["Fukuoka Tower & Momochi Beach", "Momochi", "Most beautiful at sunset."],
["Hakozaki-gu Shrine", "Higashi Ward", "One of Japan's three great Hachiman shrines. The approach leads to the sea."],
["Nokonoshima Island", "Nokonoshima", "About 10 minutes by ferry. An island covered in seasonal flower fields."],
["Sakurai Futamigaura, Itoshima", "Itoshima", "Wedded rocks and a white torii in the sea, with many seaside cafes nearby."],
["Dazaifu Tenmangu Shrine", "Dazaifu", "Get umegae-mochi fresh off the grill on the approach."],
["Kyushu National Museum", "Dazaifu", "Connected to the shrine by a rainbow-lit tunnel."],
["Reclining Buddha at Nanzoin Temple", "Sasaguri", "A 41-meter bronze reclining Buddha. Overwhelming in person."]]},

okinawa: {name: "Okinawa", gift: "chinsuko cookies or purple sweet potato tarts",
lead: "Blue seas and Ryukyu culture. The sights are spread out along the long island, so a rental car makes things much easier.",
stay: "Stay in Naha first, then at a resort in Onna or Motobu to cut down on driving.",
foods: ["Okinawa soba", "Goya champuru", "Taco rice", "Rafute (braised pork belly)"],
note: "Times on Okinawa Island assume you get around by rental car.",
spots: [
["Kokusai-dori Street", "Naha", "Wander the market streets behind it and on to Tsuboya Yachimun pottery street."],
["Sakaemachi Market", "Naha", "A retro Showa-era market that turns into cheap drinking spots at night."],
["Shuri Castle Park", "Shuri", "The restoration work is open to view, a sight you can only see now."],
["Shuri Kinjo-cho stone-paved road", "Shuri", "Stone paving from the Ryukyu Kingdom and a giant akagi tree."],
["Sefa-utaki", "South", "The Ryukyu Kingdom's most sacred site. Kudaka Island is visible past the triangular rock."],
["Nirai Kanai Bridge", "South", "A scenic drive with a sweeping curve down toward the sea."],
["Yachimun no Sato pottery village", "Central", "Yomitan's pottery village with climbing kilns and workshops."],
["Hamahiga Island", "Central", "An island of myths across the Kaichu Road, with quiet beaches."],
["Cape Manzamo", "Onna", "A cliff shaped like an elephant's trunk. Famous for sunsets."],
["Okinawa Churaumi Aquarium", "North", "Time your visit to the feeding show at the huge Kuroshio Sea tank."],
["Bise Fukugi Tree Road", "North", "Right by Churaumi Aquarium. A path of dappled sunlight."],
["Kouri Island", "North", "Drive across the Kouri Bridge over emerald water."],
["Daisekirinzan", "Yanbaru", "A sacred site of strange rock formations at the island's northern tip, with trekking trails."]]},

hiroshima: {name: "Hiroshima", gift: "momiji manju or oyster products",
lead: "A city that prays for peace, and the islands of the Seto Inland Sea. Add Miyajima, Onomichi or Rabbit Island for a deeper trip.",
stay: "Hiroshima Station to Kamiyacho is a convenient base. Stay a night on Miyajima to see the great torii at night.",
foods: ["Hiroshima-style okonomiyaki", "Oysters", "Anago-meshi eel rice (Miyajima)", "Onomichi ramen"],
spots: [
["Atomic Bomb Dome & Peace Memorial Park", "Peace Park", "A volunteer guide's explanation adds a lot of depth."],
["Hiroshima Peace Memorial Museum", "Peace Park", "Allow plenty of time. It's less crowded outside the midday rush."],
["Orizuru Tower", "Peace Park", "The rooftop deck looks down on the Atomic Bomb Dome."],
["Shukkeien Garden", "Downtown", "A feudal lord's garden in the city. Walk slowly around the pond."],
["Hiroshima Castle", "Downtown", "Learn how Hiroshima grew as a castle town."],
["Okonomimura", "Downtown", "Floor after floor of Hiroshima okonomiyaki counters in one building."],
["Itsukushima Shrine", "Miyajima", "At high tide the shrine seems to float; at low tide you can walk to the torii."],
["Mt. Misen", "Miyajima", "Ropeway plus a hike to the summit for views of the island-dotted sea."],
["Yamato Museum", "Kure", "The 1/10 scale battleship Yamato is breathtaking. Try Kure's navy food too."],
["Okunoshima (Rabbit Island)", "Okunoshima", "An island of rabbits and wartime ruins. Ferry from Tadanoumi Port."],
["Onomichi: Senko-ji Temple & hillside town", "Onomichi", "Ride the ropeway up, then walk down the Cat Alley."],
["Tomonoura", "Tomonoura", "An Edo-period port town with a stone lantern lighthouse and old streets."]]},

hakone: {name: "Hakone", gift: "yosegi marquetry crafts or onsen manju",
lead: "A mountain resort of hot springs and art museums. The loop by mountain train, cable car, ropeway and pirate ship is half the fun.",
stay: "Yumoto is close to the station; Gora and Sengokuhara have more quiet inns.",
foods: ["Black eggs (kuro-tamago)", "Yuba rice bowl", "Hakone soba", "Tofu dishes"],
spots: [
["Hakone-Yumoto onsen town", "Yumoto", "Snack on onsen manju along the shopping street by the station."],
["Yosegi marquetry workshop in Hatajuku", "Hatajuku", "Make a coaster with traditional yosegi wood inlay."],
["Old Tokaido stone road & Amazake-chaya", "Hatajuku", "Walk an Edo-period stone road and rest at a thatched teahouse."],
["Hakone Open-Air Museum", "Miyanoshita", "Soak your feet in a foot bath while looking at sculpture."],
["Gora Park", "Gora", "A French-style garden around a fountain, with craft workshops."],
["Owakudani", "Owakudani", "Each famous black egg is said to add seven years to your life."],
["Pola Museum of Art", "Sengokuhara", "The forest walking trail is lovely too."],
["Sengokuhara Pampas Grass Field", "Sengokuhara", "A sea of gold in autumn, best around October."],
["Hakone Glass Forest Museum", "Sengokuhara", "A garden glittering with Venetian glass."],
["500 Rakan statues at Chomei-ji", "Sengokuhara", "Expressive Buddhist statues scattered through the forest."],
["Lake Ashi pirate ship", "Lake Ashi", "On a clear day Mt. Fuji is right there."],
["Hakone Shrine", "Lake Ashi", "Expect a line to photograph the Torii of Peace on the lake."]]},

kamakura: {name: "Kamakura", gift: "Hato Sable cookies or Kamakura craft beer",
lead: "An ancient capital with temples tucked into its valleys. Ride the Enoden to seaside towns. Quiet temples hide just behind the Great Buddha.",
stay: "Most people day-trip, but staying near Kamakura Station or Enoshima lets you enjoy quiet mornings and evenings.",
foods: ["Shirasu-don (whitebait bowl)", "Kamakura vegetables", "Hato Sable cookies", "Shojin ryori (temple food)"],
spots: [
["Meigetsu-in Temple", "Kita-Kamakura", "The hydrangea temple. The garden behind the round window opens only in certain seasons."],
["Tsurugaoka Hachimangu Shrine", "Kamakura Station", "Walk the raised Dankazura path to the main shrine."],
["Komachi-dori Street", "Kamakura Station", "Street food and Kamakura souvenirs."],
["Zeniarai Benzaiten Shrine", "Kamakura Station", "Wash your money in the cave spring and it's said to multiply."],
["Kakuon-ji Temple", "Nikaido", "Hidden deep in a valley, a glimpse of untouched Kamakura."],
["Hokoku-ji bamboo garden", "Jomyoji", "Sip matcha while gazing at the bamboo grove."],
["Kotoku-in Great Buddha", "Hase", "On some days you can go inside the Buddha."],
["Hase-dera Temple", "Hase", "The lookout gives a view over Yuigahama Beach."],
["Goryo Shrine & the Enoden", "Gokurakuji", "A famous photo spot where the Enoden train passes the torii."],
["Gokuraku-ji Temple", "Gokurakuji", "A thatched gate, and the retro Gokurakuji Station nearby."],
["Inamuragasaki", "Inamuragasaki", "On clear evenings Mt. Fuji and Enoshima line up at sunset."],
["Enoshima Island", "Enoshima", "Caves, the Sea Candle lighthouse and shirasu bowls."]]},

sendai: {name: "Sendai", gift: "sasa-kamaboko fish cakes or Hagi no Tsuki sweets",
lead: "The City of Trees. Sites linked to Date Masamune, Matsushima (one of Japan's three great views) and gorge hot springs are all within a day trip.",
stay: "Sendai Station to Kokubuncho is convenient. Akiu or Sakunami Onsen make for a treat.",
foods: ["Gyutan (grilled beef tongue)", "Zunda mochi", "Sasa-kamaboko", "Seri nabe hot pot"],
spots: [
["Jozenji-dori & Sendai Mediatheque", "Downtown", "A zelkova avenue and a library-gallery designed by Toyo Ito."],
["Sendai Asaichi Market", "Downtown", "A small market near the station. Freshly fried croquettes are a hit."],
["Zuihoden", "Aobayama", "Date Masamune's mausoleum, with brilliantly colored decoration."],
["Sendai Castle ruins", "Aobayama", "The Date Masamune statue and a sweeping view of the city."],
["Rinno-ji Temple", "Kitayama", "A temple tied to the Date family, with a beautiful pond garden."],
["Osaki Hachimangu Shrine", "Hachiman", "A National Treasure hall in black lacquer and vivid colors."],
["Shiogama Shrine", "Shiogama", "The top shrine of old Mutsu Province. Famous sushi shops line its gate town."],
["Matsushima", "Matsushima", "Take a sightseeing cruise and visit Zuigan-ji and Godaido. Try the oysters."],
["Sakunami Onsen", "Sakunami", "Riverside open-air baths along the Hirose River."],
["Akiu Onsen", "Akiu", "Sendai's mountain retreat. Many inns offer day bathing."],
["Akiu Great Falls", "Akiu", "One of Japan's top 100 waterfalls. You can walk down near the basin."]]},

nagasaki: {name: "Nagasaki", gift: "castella cake or kakuni buns",
lead: "A city of slopes, harbors and foreign influence. Western mansions, Chinese temples and a world-class night view, all on a loop by streetcar.",
stay: "Around Nagasaki Station, or Hamamachi and Shianbashi with good streetcar access.",
foods: ["Champon noodles", "Sara udon", "Turkish rice", "Castella cake"],
spots: [
["Peace Park & Atomic Bomb Museum", "Peace Park", "Pause quietly before the Peace Statue."],
["Meganebashi Bridge & heart stone", "Downtown", "Look for the heart-shaped stone hidden in the river wall."],
["Kofuku-ji Temple", "Downtown", "Japan's oldest Chinese-style temple, with a vermilion gate."],
["Kameyama Shachu Memorial Museum", "Downtown", "Sakamoto Ryoma's base, up a hillside."],
["Dejima", "Downtown", "Restored Edo-period buildings of the old Dutch trading post."],
["Nagasaki Shinchi Chinatown", "Chinatown", "Snack on kakuni manju pork buns."],
["Oura Cathedral & Glover Garden", "Minamiyamate", "Western mansions looking down on the harbor."],
["Dutch Slope & Higashiyamate", "Minamiyamate", "Meiji-era Western houses along a cobbled slope."],
["Mt. Inasa night view", "Mt. Inasa", "One of the world's new top three night views. Take the slope car up."],
["Shitsu village & Endo Shusaku Museum", "Sotome", "A hidden Christian village and sunsets over the sea."],
["Gunkanjima (Battleship Island) cruise", "Hashima", "Landing may be canceled depending on sea conditions."]]}
};
DESTS.forEach(d => {
  const e = DESTS_EN[d.id];
  if (e.spots.length !== d.spots.length) throw new Error(`DESTS_EN.${d.id}: ${e.spots.length} spots, data.js has ${d.spots.length}`);
  d.nameJa = d.name;
  Object.assign(d, {name: e.name, lead: e.lead, stay: e.stay, foods: e.foods, gift: e.gift, note: e.note});
  d.aliases.push(e.name.toLowerCase());
  d.spots.forEach((s, i) => { [s.name, s.area, s.tip] = e.spots[i]; });
});

// ---------- Booking links: Booking.com first for international visitors ----------
const HOTEL_PROVIDERS_EN = [
  {label: 'Booking.com', url: kw => `https://www.booking.com/searchresults.en-gb.html?ss=${encodeURIComponent(kw.en)}${AFFILIATE.booking ? '&aid=' + AFFILIATE.booking : ''}`},
  {label: 'Rakuten Travel', url: kw => HOTEL_PROVIDERS[0].url(kw.ja)}
];
const CAR_PROVIDERS_EN = [
  {label: 'Rakuten Travel Car Rental (Japanese)', url: () => CAR_PROVIDERS[0].url()}
];

// ---------- UI text ----------
const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MSG_EN = {
  lang: 'en',
  locale: 'en-US',
  hours: (hh, mm) => [hh ? `${hh} hr` : '', mm || !hh ? `${mm} min` : ''].filter(Boolean).join(' '),
  muniLabel: m => `${m.en} (${m.prefEn})`,
  picked: (m, cur) => `${m.en}, ${m.prefEn}${cur ? ' · curated spots available' : ''}`,
  suggSub: m => `${m.name} · ${m.prefEn}`,
  suggCurated: 'Curated',
  modes: {local: 'Local', plane: 'Flight', train: 'Train', shinkansen: 'Shinkansen / express'},
  wikiLang: 'en',
  wikiTipDefault: 'See the Wikipedia article for details.',
  wikiLead: where => `We picked the sights in and around ${where} and sorted them into "classic" and "hidden gem" by Wikipedia page views.`,
  wikiStay: name => `Staying near central ${name} or its main station makes getting around easy.`,
  defaultFood: 'a local diner',
  depart: n => `Leave ${n}`,
  departSub: (l, h) => `About ${h} by ${l.toLowerCase()} (rough estimate incl. transfers)`,
  arrive: n => `Arrive in ${n}`,
  arriveSub: 'Drop big bags at your hotel or a coin locker and travel light',
  lunch: f => `Lunch: ${f}`,
  lunchSub: 'Popular places are easier before noon or after 1:30 pm',
  free: 'Free time',
  freeSub: 'Revisit a favorite place or relax at a cafe or your inn. Use "Add a spot" to fill the time.',
  gifts: 'Souvenir shopping',
  giftsSub: g => g ? `${g.charAt(0).toUpperCase() + g.slice(1)} are popular picks` : 'Try the souvenir shops at the station or airport',
  leave: n => `Leave ${n}`,
  leaveSub: (l, h) => `About ${h} by ${l.toLowerCase()}`,
  home: n => `Arrive back in ${n}`,
  homeSub: 'Welcome home!',
  dinner: f => `Dinner: ${f}`,
  stay: (n, i) => `Overnight in ${n} (night ${i})`,
  localTransport: 'Local transport',
  rentalShare: 'Rental car (shared)',
  wx: {0: 'Clear', 1: 'Sunny', 2: 'Partly cloudy', 3: 'Cloudy', 45: 'Fog', 48: 'Fog', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Sleet', 67: 'Sleet', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow', 80: 'Showers', 81: 'Showers', 82: 'Heavy showers', 85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'},
  dayLabel: d => `${WEEK_EN[d.getDay()]}, ${MONTH_EN[d.getMonth()]} ${d.getDate()}`,
  wxTitle: 'Local weather',
  wxTitleFirst: 'Local weather (day 1)',
  wxLoading: 'Loading…',
  wxOut: 'Forecasts appear about 2 weeks before your trip',
  wxFailed: "Couldn't load the forecast right now",
  wxRange: 'Outside the forecast range',
  wxDay: (w, max, min, pop) => `<b>${w}</b> ${max}° / ${min}°C · rain ${pop}%`,
  wxRainy: n => `${n} day${n > 1 ? 's' : ''} with a high chance of rain`,
  wxFine: 'No major bad weather expected',
  wxRedo: 'Rebuild in rainy-day mode',
  pack: {base: ['Wallet, passport and IC transit card', 'Phone charger and power bank', 'Comfortable walking shoes', 'Any regular medication'],
    clothes: n => `Clothes (${n} night${n > 1 ? 's' : ''})`, toiletries: 'Toiletries and skincare',
    coldNorth: 'Warm winter coat and non-slip shoes', cold: 'Coat and gloves', sun: ['Sunscreen and a hat', 'Cooling wipes'], mild: 'A light jacket',
    umbrella: 'Folding umbrella', swim: 'Swimsuit and rash guard', towel: 'Small towel for the hot springs', goshuin: 'Goshuin stamp book (if you collect them)',
    license: 'International Driving Permit (for the rental car)', bag: 'Reusable bag for souvenirs'},
  dur: n => n ? `${n + 1} days, ${n} night${n > 1 ? 's' : ''}` : 'Day trip',
  hiddenRate: p => `Hidden gems ${p}%`,
  ratio: (f, h) => `Classic ${f}% · Hidden ${h}%`,
  hidden: 'Hidden gem', classic: 'Classic',
  stamp: 'Gem',
  stayAbout: h => `About ${h}`,
  free0: 'Free',
  fromYen: y => `From ${y}`,
  rainOk: 'Rain-friendly',
  areaLabel: a => `${a} area`,
  map: 'Map',
  swap: 'Swap',
  remove: 'Remove',
  dayNo: n => `Day ${n}`,
  addSpot: 'Add a spot',
  route: "See the day's route on a map",
  people: n => `${n} ${n > 1 ? 'people' : 'person'}`,
  trTitle: 'Getting there (one way)',
  trValue: (l, h) => `${l}, about ${h}`,
  trLocal: 'Starting locally',
  trSub: (k, y) => `About ${k} km straight-line · around ${y}`,
  trLocalSub: 'Planned with no travel time',
  budget: 'Budget (per person)',
  breakdown: 'See breakdown',
  bMove: 'Round-trip transport', bStay: n => `Lodging (${n} night${n === 1 ? '' : 's'})`, bMeal: 'Meals', bFees: 'Admission fees', bTotal: n => `Total for ${n}`,
  planTypes: 'Plan types',
  shuffle: 'Try another combination',
  save: 'Save this plan',
  copyText: 'Copy as text',
  copyLink: 'Copy share link',
  legend: '<span class="tag-f">Classic</span>Famous sights <span class="stamp">Gem</span>Hidden gems <span class="rain" style="color:var(--matcha);font-weight:700">Rain-friendly</span>Good indoors',
  bookTitle: n => `Find a place to stay in ${n}`,
  carHint: 'The sights are spread out, so a rental car makes this destination easier to explore.',
  eatTitle: n => `What to eat in ${n}`,
  eatNone: 'Look for places with lines of locals, or the diner at a roadside station (michi-no-eki).',
  packTitle: 'Packing checklist',
  savedTitle: 'Saved plans',
  open: 'Open', del: 'Delete',
  savedNone: 'Press "Save this plan" to keep it in this browser and open it later.',
  textHead: (n, dur, v, from) => `[${n}, ${dur}] ${v} (from ${from})`,
  textDay: (n, l) => `■ Day ${n} ${l}`,
  textFooter: 'Made with Tabishiori (itismugitarou-cmd.github.io/tabishiori/en/)',
  copyFail: "Couldn't copy",
  noSwap: 'No more places to swap in',
  noAdd: 'No more places to add',
  added: n => `Added ${n}`,
  needTo: 'Please enter a destination.',
  searching: q => `Looking for things to do in "${q}"…`,
  fetchFail: q => `We couldn't load sights for "${q}" right now. Check your connection and try again.`,
  notFound: q => `We couldn't find sights for "${q}". Pick a municipality from the suggestions or try a larger town nearby.`,
  jaWikiNotice: 'English Wikipedia has few articles about this area, so spot names and descriptions come from Japanese Wikipedia.',
  wikiNotice: 'This plan was built automatically from Wikipedia. Please double-check opening hours and travel times.',
  fromUnknown: q => `We couldn't locate the starting point "${q}", so the plan has no travel time.`,
  nightsOpt: n => n ? `${n + 1} days` : 'Day trip',
  destHint: 'Search any city, town or village in Japan (English or Japanese). Curated destinations: ',
  dfltFrom: 'Chiyoda',
  copied: 'Copied',
  linkCopied: 'Share link copied',
  saved: 'Saved',
  noDate: 'no date',
  savedTitleFmt: (n, dur, v, l) => `${n} ${dur} · ${v} (${l})`
};
