// 予約リンクの設定。アフィリエイトIDを入れると、そのまま収益リンクになる(空のままでも普通の検索リンクとして動く)
//   rakuten: 楽天アフィリエイトの「アフィリエイトID」(例 '1a2b3c4d.5e6f7a8b.1a2b3c4d.5e6f7a8b')
//   booking: Booking.com アフィリエイトパートナーの aid(数字)
const AFFILIATE = {
  rakuten: '58e6d169.c6e4fe6f.58e6d16a.fa742637',
  booking: ''
};

const rakutenWrap = url => AFFILIATE.rakuten
  ? `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE.rakuten}/?pc=${encodeURIComponent(url)}&m=${encodeURIComponent(url)}`
  : url;

// 宿をさがすリンク。keyword は「京都」「岐阜県高山市」のような地名
const HOTEL_PROVIDERS = [
  {label: '楽天トラベル', url: kw => rakutenWrap(`https://kw.travel.rakuten.co.jp/keyword/Search.do?charset=utf-8&f_query=${encodeURIComponent(kw)}`)},
  {label: 'Booking.com', url: kw => `https://www.booking.com/searchresults.ja.html?ss=${encodeURIComponent(kw)}${AFFILIATE.booking ? '&aid=' + AFFILIATE.booking : ''}`}
];
const CAR_PROVIDERS = [
  {label: '楽天トラベル レンタカー', url: () => rakutenWrap('https://travel.rakuten.co.jp/cars/')}
];
