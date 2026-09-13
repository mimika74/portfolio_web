import { onBeforeUnmount, onMounted, unref, type MaybeRef } from 'vue'

export interface ScrollFadeInOptions {
  /** 対象要素そのものではなく、配下の子要素を個別にフェードさせたいときのセレクタ */
  targets?: string
  /** 移動量(px)。概要書の指定どおり控えめに（既定 24） */
  y?: number
  /** 再生時間(秒) */
  duration?: number
  /** 複数要素をずらして出すときの間隔(秒) */
  stagger?: number
  /** ScrollTrigger の start（既定 'top 85%'） */
  start?: string
}

/**
 * スクロール連動の「控えめな」フェードイン。
 * 旧プロジェクトで各所にコピペされていた
 *   gsap.from('.class', { scrollTrigger: ..., autoAlpha: 0, y: 30 })
 * のパターンを、この共通コンポーザブルに一本化する（概要書 5. / 8.）。
 *
 * 使い方:
 *   const root = useTemplateRef<HTMLElement>('root')
 *   useScrollFadeIn(root)                               // root 自体をフェード
 *   useScrollFadeIn(root, { targets: '[data-fade]', stagger: 0.12 })
 *
 * 設計方針:
 * - フェードはあくまで演出。初期状態を CSS で隠さず、
 *   SSR / JS 無効 / prefers-reduced-motion では「見えている」を正とする。
 * - クライアントかつモーション許可時のみ、onMounted で一旦隠して出す。
 * - requestAnimationFrame が絞られる環境（非表示タブ等）でトゥイーンが
 *   進まなくても、ScrollTrigger の onEnter（スクロール駆動で rAF に依存しない）を
 *   起点にした保険で、最終的に必ず可視へ戻す。
 */
export function useScrollFadeIn(
  el: MaybeRef<HTMLElement | null | undefined>,
  options: ScrollFadeInOptions = {},
) {
  const { targets, y = 24, duration = 0.9, stagger = 0.1, start = 'top 85%' } = options

  const { $gsap } = useNuxtApp()
  let ctx: ReturnType<typeof $gsap.context> | null = null
  let safety: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    const root = unref(el)
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = (targets ? Array.from(root.querySelectorAll(targets)) : [root]) as HTMLElement[]
    if (nodes.length === 0) return

    const ensureVisible = () => {
      const last = nodes[nodes.length - 1]
      if (last && Number(getComputedStyle(last).opacity) < 1) {
        $gsap.set(nodes, { autoAlpha: 1, y: 0 })
      }
    }

    ctx = $gsap.context(() => {
      $gsap.set(nodes, { autoAlpha: 0, y })
      $gsap.to(nodes, {
        autoAlpha: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
          onEnter: () => {
            if (safety) clearTimeout(safety)
            safety = setTimeout(ensureVisible, duration * 1000 + 400)
          },
        },
      })
    }, root)
  })

  onBeforeUnmount(() => {
    if (safety) clearTimeout(safety)
    ctx?.revert()
    ctx = null
  })
}
