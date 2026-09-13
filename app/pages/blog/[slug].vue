<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: post, error } = await useBlogPost(slug)

if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: () => post.value?.title ?? 'Blog',
  ogTitle: () => `${post.value?.title ?? 'Blog'} | Portfolio`,
  ogType: 'article',
  ogImage: () => post.value?.eyecatch?.url,
})
</script>

<template>
  <article v-if="post" class="container-page py-section-sm md:py-24">
    <NuxtLink to="/blog" class="text-sm text-ink-soft transition-colors hover:text-ink">
      ← Blog
    </NuxtLink>

    <header class="mx-auto mt-10 max-w-2xl">
      <time class="text-xs tracking-wide text-ink-soft">
        {{ formatDate(post.publishedAt) }}
      </time>
      <h1 class="mt-4 text-3xl leading-snug md:text-4xl">{{ post.title }}</h1>
      <ul
        v-if="post.tags?.length"
        class="mt-4 flex flex-wrap gap-x-3 text-xs text-ink-soft"
      >
        <li v-for="tag in post.tags" :key="tag">#{{ tag }}</li>
      </ul>
    </header>

    <NuxtImg
      v-if="post.eyecatch"
      :src="post.eyecatch.url"
      :width="post.eyecatch.width"
      :height="post.eyecatch.height"
      sizes="100vw md:768px"
      class="mx-auto mt-12 w-full max-w-3xl"
      alt=""
    />

    <!-- microCMS リッチエディタの HTML をそのまま描画する -->
    <div
      class="prose-blog mx-auto mt-12 max-w-2xl"
      v-html="post.content"
    />
  </article>
</template>

<style scoped>
.prose-blog :deep(h2) {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
.prose-blog :deep(h3) {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.prose-blog :deep(p) {
  margin-block: 1.25rem;
}
.prose-blog :deep(a) {
  color: var(--color-accent);
  border-bottom: 1px solid var(--color-line);
}
.prose-blog :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin-block: 1.25rem;
}
.prose-blog :deep(img) {
  margin-block: 2rem;
}
.prose-blog :deep(pre) {
  background: var(--color-ink);
  color: var(--color-paper);
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
  margin-block: 1.5rem;
}
</style>
