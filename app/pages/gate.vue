<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'このサイトは準備中です',
  robots: 'noindex, nofollow',
})

const route = useRoute()

const redirect = computed(() => {
  const r = route.query.redirect
  return typeof r === 'string' && r.startsWith('/') ? r : '/'
})
const hasError = computed(() => route.query.e === '1')
</script>

<template>
  <main class="flex min-h-dvh items-center justify-center bg-paper px-6 text-ink">
    <div class="w-full max-w-sm">
      <SparkMark :size="24" class="text-accent" />

      <h1 class="mt-6 font-serif text-xl tracking-wide">このサイトは準備中です</h1>
      <p class="mt-3 text-sm text-ink-soft">
        閲覧にはアクセスキーが必要です。
      </p>

      <form method="post" action="/api/gate" class="mt-10 space-y-5">
        <input type="hidden" name="redirect" :value="redirect" />
        <input
          name="key"
          type="password"
          required
          autofocus
          autocomplete="off"
          placeholder="アクセスキー"
          class="w-full border-b border-line bg-transparent py-2 outline-none transition-colors focus:border-ink"
        />
        <button
          type="submit"
          class="border-b border-ink pb-1 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent"
        >
          開く
        </button>
        <p v-if="hasError" class="text-sm text-red-700">
          アクセスキーが違います。
        </p>
      </form>
    </div>
  </main>
</template>
