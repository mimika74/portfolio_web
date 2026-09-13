<script setup lang="ts">
const nav = [
  { label: 'Works', to: '/works' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between md:h-20">
      <NuxtLink to="/" class="font-serif text-lg tracking-wide">
        Portfolio
      </NuxtLink>

      <nav class="hidden items-center gap-10 md:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-sm tracking-wide text-ink-soft transition-colors hover:text-ink"
          active-class="text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <button
        class="relative h-8 w-8 md:hidden"
        :aria-expanded="open"
        aria-label="メニューを開閉"
        @click="open = !open"
      >
        <span
          class="absolute left-1 right-1 top-2.5 h-px bg-ink transition-transform"
          :class="open && 'translate-y-[5px] rotate-45'"
        />
        <span
          class="absolute left-1 right-1 bottom-2.5 h-px bg-ink transition-transform"
          :class="open && '-translate-y-[5px] -rotate-45'"
        />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="open" class="border-t border-line/70 md:hidden">
        <div class="container-page flex flex-col py-4">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="py-3 text-sm tracking-wide text-ink-soft"
            active-class="text-ink"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
