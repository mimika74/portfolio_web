/**
 * Blog / News の型（microCMS 連携）。
 * 概要書 6. のスキーマ案に対応。旧プロジェクトの types/news.ts を参考に、
 * フィールド構成はシンプルに再設計している。
 */

/** microCMS が全コンテンツに自動付与するフィールド */
export interface MicroCMSContentBase {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export interface MicroCMSImage {
  url: string
  width: number
  height: number
}

export interface BlogPost extends MicroCMSContentBase {
  title: string
  /** URL 用スラッグ（/blog/[slug]）。microCMS 側で必須テキストフィールドにする */
  slug: string
  /** リッチエディタ本文（HTML 文字列） */
  content: string
  /** アイキャッチ画像 */
  eyecatch?: MicroCMSImage
  /** 使用技術タグなど（複数選択） */
  tags: string[]
}

/** microCMS リストレスポンスの共通形 */
export interface MicroCMSListResponse<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}
