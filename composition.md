# 構成

## プラットフォーム
- Web（ブラウザ）のみで動くサービス
- ユースケース
  - Google検索から
  - Twitter調べる

## 技術
### フロントエンド
- Next.js(React)
  - 対抗馬：Nuxt(Vue)
- TypeScriptとの相性がReactのほうが良いためNextを使う
- SSR x SPA
  - SEO
  - OGImageとか出したいかもな〜
- 状態管理
  - React Hooks
- 実行環境
  - CloudRun x Firebase Hosting
  - 自前テンプレートを活用する

### バックエンド
- Firestore, Authentication, Functions, Storage
- Annict
  - アニメのマスターデータ
  - https://developers.annict.jp/graphql-api/
- 検索エンジン
  - Algolia
  - 対抗馬：Elasticsearch
- Amazon PA-API
