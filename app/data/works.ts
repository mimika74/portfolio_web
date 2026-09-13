import type { Work } from '~/types/work'

/**
 * 開発実績データ（コード管理）。
 * 概要書 7. ステップ5 のとおり、まずはハードコードで用意する。
 * 内容はプレースホルダー。実際の GitHub リポジトリ情報に差し替えていく。
 */
export const works: Work[] = [
  {
    slug: 'job-manager-app',
    title: '求人管理アプリ',
    summary:
      '転職活動中の応募求人を一元管理する個人用 Web アプリ。登録・一覧・選考ステータス管理・メモ機能を提供する。',
    body: [
      'Laravel（API）と React（Vite）を分離した構成で、SQLite を用いた軽量な個人ツールとして構築した。',
      '選考ステータスの色分け、編集モード（GET 詳細 → PUT 更新）、削除機能、エラーハンドリングを段階的に実装。',
      'GCP へのデプロイとトラブルシューティングの記録をドキュメント化し、運用しながら改善を重ねている。',
    ],
    year: '2025',
    role: '設計 / 実装 / デプロイ',
    stack: ['Laravel', 'React', 'Vite', 'TypeScript', 'SQLite', 'GCP'],
    links: [
      { label: 'GitHub', href: 'https://github.com/mimika74/job-manager-app' },
    ],
    repo: 'job-manager-app',
    featured: true,
  },
  {
    slug: 'corporate-site-nuxt',
    title: 'コーポレートサイト（Nuxt3 + microCMS）',
    summary:
      'Nuxt3 / microCMS / Firebase で構築した企業サイト。GSAP ScrollTrigger によるスクロール演出を実装した。',
    body: [
      'Vuetify ベースの一枚岩構造で着手したが、独自の世界観を出しにくく再設計が必要と判断した案件。',
      'GSAP ScrollTrigger のフェードイン／パララックス実装と、microCMS SDK での記事取得の運用ノウハウを得た。',
      'この反省を踏まえ、当ポートフォリオでは Tailwind + セクション分割 + 共通コンポーザブルの構成に移行している。',
    ],
    year: '2023',
    role: 'フロントエンド実装',
    stack: ['Nuxt 3', 'microCMS', 'Firebase', 'GSAP', 'Vuetify'],
    links: [],
    featured: true,
  },
  {
    slug: 'trading-tools',
    title: '相場分析・バックテストツール群',
    summary:
      'Python による相場データの取得・可視化・戦略バックテストのスクリプト群。検証サイクルを高速化する。',
    body: [
      'ヒストリカルデータの取り込みからエントリー条件の検証、資金推移の可視化までを一連のスクリプトで回せるようにした。',
      'ナンピン・トレーリングストップなど複数ロジックを差し替え可能な形で整理している。',
    ],
    year: '2025',
    role: '個人開発',
    stack: ['Python', 'pandas', 'Plotly'],
    links: [],
    featured: false,
  },
]

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug)
}

export const featuredWorks = works.filter((w) => w.featured)
