import type { Work } from '~/types/work'

/**
 * 開発実績データ（コード管理）。
 * 個人開発のプロジェクトに絞っている（関わった案件は職務経歴書に記載）。
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
      'GCP / Firebase へのデプロイとトラブルシューティングの記録をドキュメント化し、運用しながら改善を重ねている。',
    ],
    year: '2025',
    role: '設計 / 実装 / デプロイ',
    stack: ['Laravel', 'React', 'Vite', 'TypeScript', 'SQLite', 'GCP', 'Firebase'],
    links: [
      { label: 'GitHub', href: 'https://github.com/mimika74/job-manager-app' },
      { label: '公開サイト', href: 'https://job-manager-app-507111.web.app/' },
    ],
    repo: 'job-manager-app',
    featured: true,
  },
  {
    slug: 'mymemo',
    title: 'mymemo',
    summary:
      '日々の出費を写真付きで記録し、後からカレンダーで振り返れる家計メモアプリ。細かい予算管理より「何に使って何を得たか」を思い出せることを重視した設計。',
    body: [
      '一般的な家計簿アプリの「項目別に細かく記録し、予算に対して調整する」手間を避け、支出と一緒に写真を残してカレンダー・リスト・アルバムで振り返れる、日記に近い使い心地を目指した。',
      '2021年に Ruby on Rails で開発を開始（当時はクラウドIDE上での学習も兼ねた実装）。Devise による認証、画像アップロード、ページネーションなど基本機能を一通り実装。',
      '2026年にインフラを刷新。Docker 化した上で AWS EC2 + RDS(MySQL) 上で稼働させ、Nginx + Let’s Encrypt で SSL、Route 53 で独自ドメインを運用する構成に移行した。',
    ],
    year: '2021–2026',
    role: '設計 / 実装 / 運用',
    stack: ['Ruby on Rails', 'MySQL', 'Docker', 'AWS', 'Nginx'],
    links: [
      { label: 'GitHub', href: 'https://github.com/mimika74/mymemo' },
      { label: '公開サイト', href: 'https://mymemorry.com' },
    ],
    repo: 'mymemo',
    featured: true,
  },
  {
    slug: 'portfolio-web',
    title: 'ポートフォリオサイト（本サイト）',
    summary:
      'GitHub 上に散らばった開発実績を、ひとつの静かな場所にまとめるための個人ポートフォリオ。このサイト自体もその実績のひとつ。',
    body: [
      '余白とタイポグラフィを主役にしたエディトリアルなトーンを基本に、Nuxt 4 / TypeScript / Tailwind CSS v4 で構築。',
      'GSAP ScrollTrigger による控えめなフェードイン、見出し脇で回転する放射状のワンポイント装飾、実績が星座として集まっていく様子を描いたヒーローの装飾など、細部のアニメーションにもこだわった。',
      'Blog/News は microCMS と連携し、公開前は簡易的な閲覧制限ゲートで守れるようにしている。ホスティングは Firebase。',
    ],
    year: '2026',
    role: '設計 / 実装 / デプロイ',
    stack: ['Nuxt 4', 'TypeScript', 'Tailwind CSS', 'GSAP', 'microCMS', 'Firebase'],
    links: [{ label: 'GitHub', href: 'https://github.com/mimika74/portfolio_web' }],
    repo: 'portfolio_web',
    featured: true,
  },
]

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug)
}

export const featuredWorks = works.filter((w) => w.featured)
