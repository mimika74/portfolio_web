<script setup lang="ts">
useSeoMeta({
  title: 'Contact',
  description: 'お仕事のご相談・ご質問はこちらのフォームから。',
  ogTitle: 'Contact | Portfolio',
  ogDescription: 'お仕事のご相談・ご質問はこちらのフォームから。',
})

const endpoint = useRuntimeConfig().public.formspreeEndpoint
const configured = computed(() => Boolean(endpoint))

// _gotcha は Formspree のハニーポット。人間には隠し、埋まっていたら送信せず成功扱いにする。
const form = reactive({ name: '', email: '', message: '', _gotcha: '' })
const state = ref<'idle' | 'sending' | 'done' | 'error'>('idle')

async function submit() {
  if (!configured.value || state.value === 'sending') return

  if (form._gotcha) {
    // bot とみなして黙って完了扱い
    state.value = 'done'
    return
  }

  state.value = 'sending'
  try {
    await $fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    })
    state.value = 'done'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <section class="container-page py-section-sm md:py-24">
    <div class="mx-auto max-w-xl">
      <SectionLabel class="mb-8">Contact</SectionLabel>
      <h1 class="text-3xl md:text-4xl">お問い合わせ</h1>
      <p class="mt-6 text-ink-soft">
        お仕事のご相談・ご質問など、下記フォームからお気軽にどうぞ。
      </p>

      <p
        v-if="!configured"
        class="mt-10 border border-line bg-paper-dim/50 p-4 text-sm text-ink-soft"
      >
        フォームは準備中です。Formspree のエンドポイントを
        <code class="text-ink">.env</code>（<code class="text-ink">NUXT_PUBLIC_FORMSPREE_ENDPOINT</code>）
        に設定すると有効になります。
      </p>

      <form v-else class="mt-12 space-y-8" @submit.prevent="submit">
        <div>
          <label for="name" class="mb-2 block text-sm">お名前</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            required
            autocomplete="name"
            class="w-full border-b border-line bg-transparent py-2 outline-none transition-colors focus:border-ink"
          />
        </div>

        <div>
          <label for="email" class="mb-2 block text-sm">メールアドレス</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            required
            autocomplete="email"
            class="w-full border-b border-line bg-transparent py-2 outline-none transition-colors focus:border-ink"
          />
        </div>

        <div>
          <label for="message" class="mb-2 block text-sm">内容</label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            required
            rows="6"
            class="w-full resize-y border-b border-line bg-transparent py-2 outline-none transition-colors focus:border-ink"
          />
        </div>

        <!-- ハニーポット（人間には見えない） -->
        <div class="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            この欄は空のままにしてください
            <input v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
          </label>
        </div>

        <button
          type="submit"
          :disabled="state === 'sending'"
          class="border-b border-ink pb-1 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {{ state === 'sending' ? '送信中…' : '送信する' }}
        </button>

        <p aria-live="polite" role="status">
          <span v-if="state === 'done'" class="text-sm text-accent">
            送信しました。ありがとうございます。追ってご連絡します。
          </span>
          <span v-else-if="state === 'error'" class="text-sm text-red-700">
            送信に失敗しました。時間をおいて再度お試しください。
          </span>
        </p>
      </form>
    </div>
  </section>
</template>
