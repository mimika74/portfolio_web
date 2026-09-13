<script setup lang="ts">
const root = useTemplateRef<HTMLElement>('root')
const { $gsap } = useNuxtApp()
let ctx: ReturnType<typeof $gsap.context> | null = null
let safety: ReturnType<typeof setTimeout> | null = null

// ヒーローだけはスクロールではなく初回表示のイントロ。
// 概要書 4. のとおり「控えめ」に、autoAlpha + y のみ。
onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = Array.from(
    root.value.querySelectorAll<HTMLElement>('[data-hero]'),
  )

  ctx = $gsap.context(() => {
    $gsap.set(items, { autoAlpha: 0, y: 28 })
    $gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.1,
    })
  }, root.value)

  // rAF が絞られてトゥイーンが進まない環境でも中身が読めるよう保険をかける
  safety = setTimeout(() => {
    for (const node of items) {
      if (Number(getComputedStyle(node).opacity) < 1) {
        $gsap.set(node, { autoAlpha: 1, y: 0 })
      }
    }
  }, 1800)
})

onBeforeUnmount(() => {
  if (safety) clearTimeout(safety)
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    ref="root"
    class="container-page relative flex min-h-[78vh] flex-col justify-center overflow-hidden py-24"
  >
    <!--
      星座の装飾。
      モバイル: テキストの背後に薄く敷く（本文は z-10 で前面、可読性を確保）。
      lg 以上: 右側 45% に通常の濃さで並べる。
    -->
    <HeroConstellation
      class="pointer-events-none absolute left-1/2 top-[46%] w-[94%] max-w-md -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.1] lg:left-auto lg:right-0 lg:top-1/2 lg:w-[44%] lg:max-w-none lg:translate-x-0 lg:opacity-70"
    />

    <div class="relative z-10">
      <SectionLabel data-hero class="mb-8">Portfolio</SectionLabel>

      <h1 data-hero class="max-w-4xl text-[1.75rem] leading-[1.7] sm:text-4xl sm:leading-[1.5] md:text-6xl md:leading-[1.4]">
        散らばった実績を、<br />
        ひとつの静かな場所に。
      </h1>

      <p data-hero class="mt-10 max-w-xl text-ink-soft">
        GitHub 上に点在する開発の記録を集約し、
        余白とタイポグラフィで丁寧に見せるための個人サイトです。
      </p>

      <div data-hero class="mt-14 flex flex-wrap gap-8">
        <NuxtLink
          to="/works"
          class="border-b border-ink pb-1 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent"
        >
          実績を見る
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="border-b border-line pb-1 text-sm tracking-wide text-ink-soft transition-colors hover:border-accent hover:text-accent"
        >
          お問い合わせ
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
