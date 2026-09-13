<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
  description: 'つくる過程のメモ。使用技術や制作の記録。',
  ogTitle: 'Blog | Portfolio',
  ogDescription: 'つくる過程のメモ。使用技術や制作の記録。',
})

const ready = useMicrocmsReady()
const { data: list, error } = await useBlogList(100)

const posts = computed(() => list.value?.contents ?? [])
</script>

<template>
  <section class="container-page py-section-sm md:py-24">
    <SectionLabel class="mb-8">Blog / News</SectionLabel>
    <h1 class="max-w-2xl text-3xl md:text-4xl">つくる過程のメモ</h1>

    <div class="mt-16">
      <p
        v-if="!ready"
        class="text-ink-soft"
      >
        現在準備中です。microCMS でスキーマ（<code class="text-ink">blogs</code>）を作成し、
        <code class="text-ink">.env</code> に接続情報を設定すると記事が表示されます。
      </p>

      <p v-else-if="error" class="text-ink-soft">
        記事の読み込みに失敗しました。時間をおいて再度お試しください。
      </p>

      <p v-else-if="!posts.length" class="text-ink-soft">まだ記事がありません。</p>

      <ul v-else class="divide-y divide-line border-t border-line">
        <li v-for="post in posts" :key="post.id">
          <NuxtLink
            :to="`/blog/${post.slug}`"
            class="group flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10"
          >
            <time class="shrink-0 text-xs tracking-wide text-ink-soft">
              {{ formatDate(post.publishedAt) }}
            </time>
            <div>
              <h2 class="text-lg transition-colors group-hover:text-accent">
                {{ post.title }}
              </h2>
              <ul
                v-if="post.tags?.length"
                class="mt-2 flex flex-wrap gap-x-3 text-xs text-ink-soft"
              >
                <li v-for="tag in post.tags" :key="tag">#{{ tag }}</li>
              </ul>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
