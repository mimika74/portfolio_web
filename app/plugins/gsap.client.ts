import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * GSAP + ScrollTrigger を全ページで使えるように登録する。
 * 旧プロジェクトでは各コンポーネントが個別に import + registerPlugin しており
 * 重複していたため、ここ一箇所に集約する（概要書 5.）。
 * `.client` サフィックスによりクライアント側でのみ実行される。
 */
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
