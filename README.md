# Portfolio

GitHub 上に散らばった開発実績を、1 つの URL にまとめて伝える個人ポートフォリオサイト。
「余白を活かした上質なブランドサイト」のトーンを、個人ポートフォリオとして現実的な規模に落とし込む。
公開URL:https://portfolio-web--portfolio-web-55389.asia-east1.hosted.app/gate?redirect=/

## 技術スタック

| 項目 | 選定 |
|---|---|
| フレームワーク | Nuxt（`nuxi` 最新版が生成する系統。本リポジトリは Nuxt 4 系で初期化） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4（`@tailwindcss/vite`） |
| アニメーション | GSAP + ScrollTrigger |
| フォント | `@nuxt/fonts`（Google Fonts / Zen Old Mincho・Zen Kaku Gothic New） |
| 画像 | `@nuxt/image`（遅延読み込み標準） |
| CMS | microCMS（Blog/News のみ。`server/api/blog/*` で microcms-js-sdk を直接利用） |
| フォーム | Formspree（軽量メール送信） |
| ホスティング | Firebase（App Hosting） |

> 概要書では「Nuxt 3 最新版」と指定されているが、`nuxi@latest` が生成する現行安定版は
> Nuxt 4 系（`app/` を srcDir とする構成）。指定の意図＝「最新版で作り直す」に沿って
> Nuxt 4 系で初期化している。Nuxt 3 系に固定したい場合は `package.json` の
> `nuxt` を `^3` に落として再インストールする。

## ディレクトリ構成

```
app/
  app.vue                     NuxtLayout + NuxtPage のみ
  error.vue                   404 / エラーページ
  assets/css/main.css         Tailwind エントリ + テーマトークン（色・フォント・余白）
  layouts/default.vue         Header / Footer + <slot>
  components/
    common/                   SiteHeader / SiteFooter / AppReveal（フェード用ラッパー）
    home/                     トップの各セクション（Hero / About / Skills / WorksPreview / NewsPreview）
    works/                    WorkCard
  composables/
    useScrollFadeIn.ts        GSAP ScrollTrigger の共通フェードイン（コピペ排除）
    useBlog.ts                microCMS 用の定数・ヘルパー
  data/works.ts               実績データ（コード管理）
  types/                      work.ts / blog.ts
  pages/
    index.vue
    works/index.vue  works/[slug].vue
    blog/index.vue   blog/[slug].vue
    contact.vue
  plugins/gsap.client.ts      GSAP + ScrollTrigger をクライアントで一度だけ登録
```

## セットアップ

```bash
npm install
cp .env.example .env   # 値は任意。空でもビルド・起動は可能
npm run dev            # http://localhost:3000
```

### 環境変数（`.env`）

| 変数 | 用途 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン |
| `MICROCMS_API_KEY` | microCMS のコンテンツ API キー |
| `NUXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree のフォーム URL |

未設定時は `/blog` と `/contact` が「準備中」表示にフォールバックする。

## microCMS スキーマ（`blogs` API / リスト形式）

| フィールド ID | 型 |
|---|---|
| `title` | テキスト |
| `slug` | テキスト |
| `content` | リッチエディタ |
| `eyecatch` | 画像 |
| `tags` | 複数選択 |
| `publishedAt` | 日時（microCMS 標準の公開日時を利用） |

## デプロイ（Firebase App Hosting）

詳細手順は [DEPLOY.md](DEPLOY.md) を参照。要点だけ：

1. GitHub（`mimika74/portfolio_web`）に push 済み
2. Firebase コンソール → Build → App Hosting で GitHub 連携し Import（Blaze プラン必須）
3. 環境変数 / シークレットを登録して Deploy
4. 独自ドメインは Firebase Hosting 側で追加

> Firebase Hosting は `__session` という名前の Cookie 以外を CDN で剥がすため、
> 閲覧制限ゲート（[docs/access-gate.md](docs/access-gate.md)）の Cookie 名は
> 最初から `__session` にしてある。

## 旧プロジェクトから引き継いだ方針

- GSAP ScrollTrigger の `autoAlpha` + `y` パターンは `composables/useScrollFadeIn.ts` に一本化（各所へコピペしない）
- microCMS は記事系のみに限定利用。Works はコード管理
- シークレットは `.env` に隔離
