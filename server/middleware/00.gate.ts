import { GATE_COOKIE, gateToken, setGateCookie } from '../utils/gate'

/**
 * 公開前の閲覧制限ゲート。
 * runtimeConfig.siteAccessKey（= 環境変数 SITE_ACCESS_KEY）が空なら何もしない。
 * 設定されている場合、正しい Cookie が無いリクエストは /gate へ 302。
 *
 * job-manager-app の EnsureAccessKey ミドルウェアと同じ思想の Nuxt 版。
 * 「見せ終わったら SITE_ACCESS_KEY を空にして再デプロイ」で即解除できる。
 */
const ALLOW_PREFIXES = [
  '/api/gate',
  '/gate',
  '/_nuxt/',
  '/_fonts/',
  '/__nuxt',
  '/favicon',
  '/apple-touch-icon',
]
const ALLOW_EXACT = ['/robots.txt', '/sitemap.xml', '/sitemap_index.xml']

export default defineEventHandler((event) => {
  const key = useRuntimeConfig(event).siteAccessKey
  if (!key) return

  const url = getRequestURL(event)
  const path = url.pathname

  if (ALLOW_PREFIXES.some((p) => path.startsWith(p)) || ALLOW_EXACT.includes(path)) return

  const expected = gateToken(key)

  // 共有リンク用: ?key=... が正しければ Cookie を発行してクエリを落とす
  const qKey = getQuery(event).key
  if (typeof qKey === 'string' && qKey === key) {
    setGateCookie(event, key)
    url.searchParams.delete('key')
    return sendRedirect(event, path + (url.search ? url.search : ''), 302)
  }

  if (getCookie(event, GATE_COOKIE) === expected) return

  setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  return sendRedirect(
    event,
    `/gate?redirect=${encodeURIComponent(path + url.search)}`,
    302,
  )
})
