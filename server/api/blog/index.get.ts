import { BLOG_ENDPOINT, microcmsClient } from '../../utils/microcms'

/**
 * ブログ記事の一覧。GET /api/blog?limit=20
 * microCMS 未設定なら空リストを返す（/blog は「準備中」表示になる）。
 */
export default defineEventHandler(async (event) => {
  const empty = { contents: [], totalCount: 0, offset: 0, limit: 0 }

  const client = microcmsClient()
  if (!client) return empty

  const q = getQuery(event)
  const limit = Math.min(Number(q.limit) || 20, 100)

  try {
    return await client.getList({
      endpoint: BLOG_ENDPOINT,
      queries: {
        limit,
        orders: '-publishedAt',
        fields: 'id,title,slug,eyecatch,tags,publishedAt',
      },
    })
  } catch (e) {
    console.error('[api/blog] microCMS getList failed:', (e as Error).message)
    return empty
  }
})
