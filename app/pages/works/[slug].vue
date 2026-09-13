<script setup lang="ts">
import { getWorkBySlug, works } from '~/data/works'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const work = computed(() => getWorkBySlug(slug.value))

if (!work.value) {
  throw createError({ statusCode: 404, statusMessage: 'Work not found', fatal: true })
}

useSeoMeta({
  title: () => work.value?.title ?? 'Works',
  description: () => work.value?.summary,
  ogTitle: () => `${work.value?.title ?? 'Works'} | Portfolio`,
  ogDescription: () => work.value?.summary,
  ogType: 'article',
  ogImage: () => work.value?.thumbnail,
})

// 前後のプロジェクトへの導線
const siblings = computed(() => {
  const i = works.findIndex((w) => w.slug === slug.value)
  return {
    prev: i > 0 ? works[i - 1] : null,
    next: i >= 0 && i < works.length - 1 ? works[i + 1] : null,
  }
})
</script>

<template>
  <article v-if="work" class="container-page py-section-sm md:py-24">
    <NuxtLink to="/works" class="text-sm text-ink-soft transition-colors hover:text-ink">
      ← Works
    </NuxtLink>

    <header class="mt-10 max-w-3xl">
      <div class="mb-4 flex flex-wrap items-center gap-4 text-xs tracking-wide text-ink-soft">
        <span>{{ work.year }}</span>
        <span class="h-px w-6 bg-line" />
        <span>{{ work.role }}</span>
      </div>
      <h1 class="text-3xl leading-snug md:text-5xl">{{ work.title }}</h1>
      <p class="mt-6 text-lg text-ink-soft">{{ work.summary }}</p>
    </header>

    <div class="mt-12 grid gap-12 md:grid-cols-[1.6fr_1fr]">
      <div class="space-y-6 md:order-1">
        <p v-for="(para, i) in work.body" :key="i">{{ para }}</p>
      </div>

      <aside class="space-y-8 md:order-2">
        <div>
          <h2 class="section-label mb-3">Stack</h2>
          <ul class="flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-soft">
            <li v-for="tech in work.stack" :key="tech">{{ tech }}</li>
          </ul>
        </div>

        <div v-if="work.links.length">
          <h2 class="section-label mb-3">Links</h2>
          <ul class="space-y-2 text-sm">
            <li v-for="link in work.links" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="border-b border-ink pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {{ link.label }} ↗
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <nav class="mt-section-sm flex justify-between border-t border-line pt-8 text-sm">
      <NuxtLink
        v-if="siblings.prev"
        :to="`/works/${siblings.prev.slug}`"
        class="text-ink-soft transition-colors hover:text-ink"
      >
        ← {{ siblings.prev.title }}
      </NuxtLink>
      <span v-else />
      <NuxtLink
        v-if="siblings.next"
        :to="`/works/${siblings.next.slug}`"
        class="text-right text-ink-soft transition-colors hover:text-ink"
      >
        {{ siblings.next.title }} →
      </NuxtLink>
    </nav>
  </article>
</template>
