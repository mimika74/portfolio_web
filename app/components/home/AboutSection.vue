<template>
  <section id="about" class="container-page py-section-sm md:py-section">
    <AppReveal targets="[data-fade]" :stagger="0.12">
      <SectionLabel data-fade class="mb-10">01 — About</SectionLabel>

      <div class="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <h2 data-fade class="text-2xl md:text-3xl">
          つくることと、<br />直すこと。
        </h2>

        <div class="space-y-6 text-ink-soft">
          <p data-fade>
            Web アプリケーションを中心に、設計から実装、デプロイ、運用改善までを
            ひととおり自分の手で回してきました。
          </p>
          <p data-fade>
            システムを利用し続けるほどユーザーが今までの積み重ねを
            実感できるようなシステムを提案します。過去のプロジェクトでの反省を
            次の設計に持ち込むことを大切にしています。
          </p>
        </div>
      </div>
    </AppReveal>
  </section>
</template>
