import { createClient } from 'microcms-js-sdk'

/**
 * microCMS クライアント（サーバー専用）。
 * .env の MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定なら null を返し、
 * 呼び出し側は「準備中」フォールバックに回す。
 */
let client: ReturnType<typeof createClient> | null = null

export function microcmsClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY
  if (!serviceDomain || !apiKey) return null
  if (!client) client = createClient({ serviceDomain, apiKey })
  return client
}

export const BLOG_ENDPOINT = 'blogs'
