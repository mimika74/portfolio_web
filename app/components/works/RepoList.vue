<script setup lang="ts">
const { data: repos } = useGithubRepos()

const items = computed(() => (repos.value ?? []).slice(0, 12))

function formatMonth(value: string): string {
  return new Date(value).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' })
}
</script>

<template>
  <section v-if="items.length" class="mt-24">
    <SectionLabel class="mb-4">その他のリポジトリ</SectionLabel>
    <p class="mb-8 max-w-xl text-sm text-ink-soft">
      GitHub の公開リポジトリから自動で表示しています（更新の新しい順）。
    </p>

    <ul class="divide-y divide-line border-t border-line">
      <li v-for="repo in items" :key="repo.id">
        <a
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8"
        >
          <div class="md:max-w-2xl">
            <span class="text-sm transition-colors group-hover:text-accent">
              {{ repo.name }}
            </span>
            <p v-if="repo.description" class="mt-1 text-sm text-ink-soft">
              {{ repo.description }}
            </p>
          </div>

          <div class="flex shrink-0 items-center gap-4 text-xs text-ink-soft">
            <span v-if="repo.language">{{ repo.language }}</span>
            <span v-if="repo.stargazers_count">★ {{ repo.stargazers_count }}</span>
            <span>{{ formatMonth(repo.pushed_at) }}</span>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>
