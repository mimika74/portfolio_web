<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'GitHub', href: 'https://github.com/mimika74' },
]
</script>

<template>
  <footer class="mt-section-sm border-t border-line/70">
    <div class="container-page flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
      <p class="font-serif text-sm tracking-wide">Portfolio</p>

      <ul class="flex gap-6">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-ink-soft transition-colors hover:text-ink"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <p class="text-xs tracking-wide text-ink-soft">© {{ year }} All rights reserved.</p>
    </div>
  </footer>
</template>
