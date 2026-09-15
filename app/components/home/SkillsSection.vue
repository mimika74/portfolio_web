<script setup lang="ts">
const groups = [
  {
    title: '言語',
    items: ['TypeScript', 'JavaScript', 'HTML/CSS', 'Python', 'Ruby', 'PHP', 'VBA'],
  },
  {
    title: 'フレームワーク',
    items: ['Nuxt 3 / Vue 3', 'React / Vite', 'Laravel', 'FastAPI', 'Ruby on Rails', 'GAS', 'GSAP'],
  },
  {
    title: 'インフラ / クラウド',
    items: ['GCP', 'Firebase Hosting', 'Docker', 'AWS', 'NAS', 'Tailscale', 'DUO'],
  },
  {
    title: 'ツール・その他',
    items: ['Git / GitHub', 'microCMS', 'REST API 設計', 'Looker Studio'],
  },
]
</script>

<template>
  <section id="skills" class="border-t border-line/60 bg-paper-dim/40">
    <div class="container-page py-section-sm md:py-section">
      <AppReveal targets="[data-fade]" :stagger="0.1">
        <SectionLabel data-fade class="mb-10">02 — Skills</SectionLabel>

        <div class="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="group in groups" :key="group.title" data-fade>
            <h3 class="mb-5 text-lg">{{ group.title }}</h3>
            <ul class="space-y-2 text-ink-soft">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </AppReveal>
    </div>
  </section>
</template>
