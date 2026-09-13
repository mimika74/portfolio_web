import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
  ],

  // 本番のドメイン。デプロイ先の環境変数 NUXT_PUBLIC_SITE_URL で上書きする。
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Portfolio',
  },

  // sitemap.xml。静的ルート（/ /works /blog /contact）を自動収録。
  // 動的な /works/[slug]・/blog/[slug] は一覧ページからのクロールで到達可能。
  sitemap: {
    // 明示的に載せたいURL（動的分を足す場合はここへ）
    urls: ['/works', '/blog'],
  },

  // GitHub の公開リポジトリ取得を SSR し、1 時間 SWR キャッシュする。
  // Cloud Functions/Cloud Run 系ホスティングではインスタンスがよく入れ替わるため
  // キャッシュの効きは環境依存（効かなくても機能自体は壊れない）。
  routeRules: {
    '/works': { swr: 3600 },
  },

  // ディレクトリでの分類は残しつつ、コンポーネント名はパス接頭辞なしで参照する
  // （<AppReveal> / <SiteHeader> / <HeroSection> など）。概要書 5. のフォルダ分割方針。
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ja' },
      title: 'Portfolio',
      titleTemplate: (title) => (title === 'Portfolio' ? title : `${title} | Portfolio`),
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'GitHub 上に散らばった開発実績を一つにまとめた個人ポートフォリオサイト。',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Portfolio' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // Google Fonts — 明朝系1書体 + ゴシック系1書体に絞る（デザイン方針 4.）
  // @nuxt/fonts が self-host + 最適化まで面倒を見る
  fonts: {
    families: [
      { name: 'Zen Old Mincho', provider: 'google', weights: [400, 700] },
      { name: 'Zen Kaku Gothic New', provider: 'google', weights: [400, 500, 700] },
    ],
  },

  image: {
    // @nuxt/image。<NuxtImg> / <NuxtPicture> は既定で loading="lazy"
    quality: 80,
    format: ['webp'],
  },

  // microCMS は server/api/blog/* で microcms-js-sdk を直接呼ぶ。
  // APIキー（MICROCMS_API_KEY）は完全にサーバー専用で、クライアントには
  // /api/blog のレスポンスだけが渡る。

  runtimeConfig: {
    // 公開前の閲覧制限ゲートの合言葉。空ならゲート無効（ローカル開発・公開後）。
    // サーバー専用（public に置かない）。デプロイ先の環境変数 SITE_ACCESS_KEY で設定。
    siteAccessKey: process.env.SITE_ACCESS_KEY || '',
    public: {
      // お問い合わせフォームの送信先（Formspree のフォーム ID を含む URL）
      formspreeEndpoint: process.env.NUXT_PUBLIC_FORMSPREE_ENDPOINT ?? '',
      // microCMS の接続情報が揃っているか。/blog の表示分岐に使う（鍵そのものは公開しない）
      microcmsReady: Boolean(process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY),
      // 「その他のリポジトリ」帯で一覧する GitHub ユーザー名
      githubUser: process.env.NUXT_PUBLIC_GITHUB_USER || 'mimika74',
    },
  },
})
