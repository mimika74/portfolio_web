import { createHash } from 'node:crypto'
import type { H3Event } from 'h3'

// Firebase Hosting は CDN キャッシュ効率化のため、リクエストの Cookie を
// `__session` という名前のもの以外すべて剥がして関数/Cloud Run に渡す
// （App Hosting も含め、Firebase Hosting が前段にある構成すべてに共通の制約）。
// そのためゲートの Cookie 名は独自名ではなくこれを使う。Vercel 等の他ホスティングでも
// 普通の Cookie として問題なく動く。
export const GATE_COOKIE = '__session'

/** 合言葉から Cookie に入れるトークン（生キーは Cookie に置かない） */
export function gateToken(key: string): string {
  return createHash('sha256').update(`portfolio-gate:${key}`).digest('hex')
}

export function setGateCookie(event: H3Event, key: string): void {
  // secure は「実際に HTTPS か」で決める（x-forwarded-proto を見る）。
  // dev 判定にすると、ローカルで build/preview したとき http://localhost に
  // secure Cookie が保存されずリダイレクトループになる。
  const isHttps = getRequestProtocol(event) === 'https'
  setCookie(event, GATE_COOKIE, gateToken(key), {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30日
  })
}
