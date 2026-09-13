<script setup lang="ts">
import type { Work } from '~/types/work'

defineProps<{ work: Work }>()
</script>

<template>
  <NuxtLink
    :to="`/works/${work.slug}`"
    class="group block border-t border-line py-8 transition-colors hover:border-ink"
  >
    <div class="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
      <div class="md:max-w-2xl">
        <div class="mb-3 flex items-center gap-4 text-xs tracking-wide text-ink-soft">
          <span>{{ work.year }}</span>
          <span class="h-px w-6 bg-line" />
          <span>{{ work.role }}</span>
        </div>

        <h3 class="text-xl transition-colors group-hover:text-accent md:text-2xl">
          {{ work.title }}
        </h3>

        <p class="mt-3 text-ink-soft">{{ work.summary }}</p>

        <ul class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
          <li v-for="tech in work.stack" :key="tech">{{ tech }}</li>
        </ul>
      </div>

      <span
        class="shrink-0 text-sm text-ink-soft transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </div>
  </NuxtLink>
</template>
