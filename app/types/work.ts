/**
 * Works（開発実績）の型。
 * 概要書 2. の方針どおり、更新頻度の低い実績情報はコード管理とする。
 * データ本体は app/data/works.ts。
 */
export interface WorkLink {
  label: string
  href: string
}

export interface Work {
  /** URL 用スラッグ（/works/[slug]） */
  slug: string
  title: string
  /** 一覧・OGP 用の短い説明（1〜2文） */
  summary: string
  /** 詳細ページ本文（段落配列。Markdown は使わずプレーンに保つ） */
  body: string[]
  /** 実施年（"2024" など） */
  year: string
  /** 担当領域 */
  role: string
  /** 使用技術タグ */
  stack: string[]
  /** GitHub / デモなどの外部リンク */
  links: WorkLink[]
  /** カード・ヒーローに使うサムネイル（/public 配下 or 外部URL）。未指定可 */
  thumbnail?: string
  /** トップページ Featured Works に抜粋するか */
  featured?: boolean
  /**
   * 対応する GitHub リポジトリ名（owner なしの name のみ）。
   * 指定すると「その他のリポジトリ」自動一覧から重複除外される。
   */
  repo?: string
}
