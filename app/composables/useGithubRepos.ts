import { works } from '~/data/works'

/**
 * GitHub の公開リポジトリ一覧を取得する。
 * Works ページ下部の「その他のリポジトリ」帯で使う（手書き Works ＝ app/data/works.ts が主、
 * こちらは網羅用の従）。
 *
 * - 認証なしの公開 API（IP あたり 60 req/h）。SSR で取得し、本番は routeRules の swr でキャッシュ。
 * - 失敗（レート制限・オフライン等）しても error に入るだけでページは壊れない。空配列で表示側が畳む。
 * - fork / archive、および works.ts で repo 指定済みのものは除外。
 */
export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  topics: string[]
  fork: boolean
  archived: boolean
}

export function useGithubRepos() {
  const user = useRuntimeConfig().public.githubUser as string
  const excluded = new Set(
    works.map((w) => w.repo).filter((r): r is string => Boolean(r)),
  )

  return useFetch<GithubRepo[]>(`https://api.github.com/users/${user}/repos`, {
    key: `github-repos-${user}`,
    query: { sort: 'pushed', per_page: 100 },
    headers: { Accept: 'application/vnd.github+json' },
    server: true,
    default: () => [],
    transform: (repos) =>
      (repos ?? [])
        .filter((r) => !r.fork && !r.archived && !excluded.has(r.name))
        .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at)),
  })
}
