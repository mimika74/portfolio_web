<script setup lang="ts">
// microCMS 未接続でも /api/blog は空リストを返すのでトップページは壊れない。
const { data: list } = await useBlogPreview(3)

const posts = computed(() => list.value?.contents ?? [])
</script>

<template>
  <section id="news" class="border-t border-line/60">
    <div class="container-page py-section-sm md:py-section">
      <AppReveal targets="[data-fade]" :stagger="0.1">
        <div data-fade class="mb-10 flex items-baseline justify-between">
          <SectionLabel>04 — Journal</SectionLabel>
          <NuxtLink
            to="/blog"
            class="text-sm text-ink-soft transition-colors hover:text-ink"
          >
            記事一覧 →
          </NuxtLink>
        </div>

        <ul v-if="posts.length" data-fade class="divide-y divide-line">
          <li v-for="post in posts" :key="post.id">
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="group flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:gap-8"
            >
              <time class="shrink-0 text-xs tracking-wide text-ink-soft">
                {{ formatDate(post.publishedAt) }}
              </time>
              <span class="transition-colors group-hover:text-accent">
                {{ post.title }}
              </span>
            </NuxtLink>
          </li>
        </ul>

        <p v-else data-fade class="text-ink-soft">
          記事は準備中です。microCMS の接続後にここへ最新の投稿が表示されます。
        </p>
      </AppReveal>
    </div>
  </section>
</template>
