<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

useHead({ title: 'Not Found' })
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteHeader />
    <main class="container-page flex flex-1 flex-col items-start justify-center py-24">
      <p class="section-label mb-6">{{ error.statusCode }}</p>
      <h1 class="text-3xl md:text-4xl">
        {{ error.statusCode === 404 ? 'ページが見つかりません' : 'エラーが発生しました' }}
      </h1>
      <button
        class="mt-10 border-b border-ink pb-1 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent"
        @click="clearError({ redirect: '/' })"
      >
        トップへ戻る
      </button>
    </main>
    <SiteFooter />
  </div>
</template>
