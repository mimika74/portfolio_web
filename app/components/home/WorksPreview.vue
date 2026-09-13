<script setup lang="ts">
import { featuredWorks } from '~/data/works'
</script>

<template>
  <section id="works" class="container-page py-section-sm md:py-section">
    <AppReveal targets="[data-fade]" :stagger="0.1">
      <div data-fade class="mb-10 flex items-baseline justify-between">
        <SectionLabel>03 — Selected Works</SectionLabel>
        <NuxtLink
          to="/works"
          class="text-sm text-ink-soft transition-colors hover:text-ink"
        >
          すべて見る →
        </NuxtLink>
      </div>

      <div data-fade>
        <WorkCard v-for="work in featuredWorks" :key="work.slug" :work="work" />
      </div>
    </AppReveal>
  </section>
</template>
