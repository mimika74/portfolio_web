import { BLOG_ENDPOINT, microcmsClient } from '../../utils/microcms'

/**
 * ブログ記事の詳細。GET /api/blog/:slug
 * slug でフィルタして 1 件返す。無ければ 404。
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const client = microcmsClient()

  if (!client || !slug) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const res = await client.getList({
    endpoint: BLOG_ENDPOINT,
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  })

  const post = res.contents?.[0]
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }
  return post
})
