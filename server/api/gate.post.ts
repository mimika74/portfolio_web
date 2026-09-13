import { setGateCookie } from '../utils/gate'

/**
 * /gate のフォーム送信先。合言葉が合えば Cookie を発行して元のページへ戻す。
 * ネイティブ form POST（application/x-www-form-urlencoded）を想定。
 */
export default defineEventHandler(async (event) => {
  const key = useRuntimeConfig(event).siteAccessKey

  const raw = await readBody(event).catch(() => null)
  const params: Record<string, unknown> =
    typeof raw === 'string' ? Object.fromEntries(new URLSearchParams(raw)) : (raw ?? {})

  const provided = typeof params.key === 'string' ? params.key : ''
  let redirect = typeof params.redirect === 'string' ? params.redirect : '/'
  // オープンリダイレクト対策: 自サイト内の絶対パスのみ許可
  if (!redirect.startsWith('/') || redirect.startsWith('//')) redirect = '/'

  if (key && provided === key) {
    setGateCookie(event, key)
    return sendRedirect(event, redirect, 302)
  }

  return sendRedirect(
    event,
    `/gate?e=1&redirect=${encodeURIComponent(redirect)}`,
    302,
  )
})
