import type { BlogPost, MicroCMSListResponse } from '~/types/blog'

/**
 * Blog/News の取得。microCMS へは server/api/blog/* 経由でのみアクセスする
 * （APIキーはサーバー専用。クライアントには結果だけ渡る）。
 * 概要書 8. で引き継ぐ「一覧取得・詳細取得」の呼び出し口をここに集約。
 */

const EMPTY: MicroCMSListResponse<BlogPost> = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
}

/** 接続情報が揃っているか（/blog の表示分岐に使う） */
export function useMicrocmsReady(): boolean {
  return useRuntimeConfig().public.microcmsReady === true
}

/** 記事一覧 */
export function useBlogList(limit = 50) {
  return useFetch<MicroCMSListResponse<BlogPost>>('/api/blog', {
    key: `blog-list-${limit}`,
    query: { limit },
    default: () => EMPTY,
  })
}

/** トップページの最新記事プレビュー */
export function useBlogPreview(limit = 3) {
  return useFetch<MicroCMSListResponse<BlogPost>>('/api/blog', {
    key: `blog-preview-${limit}`,
    query: { limit },
    default: () => EMPTY,
  })
}

/** 記事詳細（slug 指定） */
export function useBlogPost(slug: MaybeRefOrGetter<string>) {
  return useFetch<BlogPost>(() => `/api/blog/${toValue(slug)}`, {
    key: () => `blog-post-${toValue(slug)}`,
  })
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
