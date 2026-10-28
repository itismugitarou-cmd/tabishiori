#!/bin/sh
# src/ から 2つの出力を作る: artifact.html(プレビュー用) と docs/index.html(GitHub Pages用)
cd "$(dirname "$0")"
mkdir -p docs
{ cat src/head.html; cat src/body.html; printf '<script>\n'; cat src/munis.js src/data.js src/app.js; printf '</script>\n'; } > artifact.html
{ printf '<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  cat src/head.html; printf '</head>\n<body>\n'; cat src/body.html; printf '<script>\n'; cat src/munis.js src/data.js src/app.js; printf '</script>\n</body>\n</html>\n'; } > docs/index.html
