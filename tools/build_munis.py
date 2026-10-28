# geolonia/japanese-addresses の latest.csv(町丁目ごとの緯度経度)から、
# 市区町村ごとの代表点(町丁目の中央値)を出して src/munis.js を作る
import csv, sys, json, statistics, unicodedata
from collections import defaultdict, OrderedDict

def hira(s):
    s = unicodedata.normalize('NFKC', s).replace(' ', '')
    return ''.join(chr(ord(c) - 0x60) if 'ァ' <= c <= 'ヶ' else c for c in s)

src = sys.argv[1]
prefs, cities = [], OrderedDict()
with open(src, encoding='utf-8') as f:
    for r in csv.DictReader(f):
        if not r['緯度']:
            continue
        p = r['都道府県名']
        if p not in prefs:
            prefs.append(p)
        key = r['市区町村コード']
        c = cities.setdefault(key, {'pref': prefs.index(p), 'name': r['市区町村名'], 'kana': hira(r['市区町村名カナ']), 'pts': []})
        c['pts'].append((float(r['緯度']), float(r['経度'])))

# 政令市の区は「〇〇市」としてもまとめる
parents = OrderedDict()
for code, c in cities.items():
    n = c['name']
    i = n.find('市')
    if 0 < i < len(n) - 1 and n.endswith('区'):
        pn = n[:i + 1]
        kn = c['kana']
        ki = kn.find('し')
        pk = hira(pn)
        par = parents.setdefault((c['pref'], pn), {'pref': c['pref'], 'name': pn, 'kana': '', 'pts': [], 'code': code[:2] + 'P' + code[2:4]})
        par['pts'] += c['pts']
        if not par['kana']:
            par['kana'] = kn
        par.setdefault('wards', []).append(kn)

def kana_parent(par):
    # 区名の読みの共通部分 = 市の読み
    ks = par['wards']
    pre = ks[0]
    for k in ks[1:]:
        while not k.startswith(pre):
            pre = pre[:-1]
    return pre.rstrip('く') if pre.endswith('しく') else pre

out = []
for (pi, pn), par in parents.items():
    out.append([par['code'], par['pref'], pn, kana_parent(par), round(statistics.median(p[0] for p in par['pts']), 4), round(statistics.median(p[1] for p in par['pts']), 4)])
for code, c in cities.items():
    n, k, gun = c['name'], c['kana'], ''
    if '郡' in n[1:-1] and n[-1] in '町村':
        i = n.index('郡'); gun, n = n[:i + 1], n[i + 1:]
        if 'ぐん' in k: k = k[k.index('ぐん') + 2:]
    c['name'], c['kana'], c['gun'] = n, k, gun
    out.append([code, c['pref'], c['name'], c['kana'], round(statistics.median(p[0] for p in c['pts']), 4), round(statistics.median(p[1] for p in c['pts']), 4)] + ([c['gun']] if c['gun'] else []))
out.sort(key=lambda x: (x[1], x[0].replace('P', '0')))
with open(sys.argv[2], 'w', encoding='utf-8') as f:
    f.write('// 全国の市区町村: [コード, 都道府県番号, 名前, よみ, 緯度, 経度, 郡](出典: geolonia/japanese-addresses、町丁目の中央値)\n')
    f.write('const PREFS = ' + json.dumps(prefs, ensure_ascii=False) + ';\n')
    f.write('const MUNIS = [\n' + ',\n'.join(json.dumps(o, ensure_ascii=False, separators=(',', ':')) for o in out) + '\n].map(([code,pref,name,kana,lat,lng,gun])=>({code,pref:PREFS[pref],name,kana,lat,lng,gun:gun||""}));\n')
print(len(out), 'munis', len(prefs), 'prefs')
