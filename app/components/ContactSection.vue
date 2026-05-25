<template>
  <section id="contact" class="py-28 border-t border-white/5">

    <div class="section-container">
      <div ref="headerEl" class="max-w-2xl mx-auto text-center mb-16">
        <p class="section-tag">Contact</p>
        <h2 class="section-title mb-4">
          Let's build something<br />
          <span class="font-hand text-accent-blue text-glow-blue">unforgettable.</span>
        </h2>
        <p class="text-text-secondary text-lg leading-relaxed">
          Available for full-time roles, freelance projects, and teaching opportunities.
          I respond within 24 hours.
        </p>
      </div>

      <div ref="itemsEl" class="grid sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10">
        <a v-for="item in contacts" :key="item.label" :href="item.href" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener' : undefined" class="contact-item group">
          <div class="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:bg-accent-blue/5 transition-all flex-shrink-0">
            <component :is="item.icon" class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <p class="text-text-secondary text-xs uppercase tracking-wider mb-0.5">{{ item.label }}</p>
            <p class="text-text-primary text-sm font-medium truncate">{{ item.value }}</p>
          </div>
        </a>
      </div>

      <div ref="ctaEl" class="text-center">
        <a href="mailto:ahmed.m.najibe@gmail.com" class="btn-primary inline-flex text-base px-8 py-4">
          Send a Message
          <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useAnimation } from '~/composables/useAnimation'

const { revealBlur, revealStagger, revealFadeUp, STAGGER, Y, DUR } = useAnimation()
const headerEl = ref<HTMLElement | null>(null)
const itemsEl  = ref<HTMLElement | null>(null)
const ctaEl    = ref<HTMLElement | null>(null)

onMounted(() => {
  revealBlur(headerEl.value)
  revealFadeUp(itemsEl.value,  { delay: 0.08, y: Y.sm, duration: DUR.sm })
  revealFadeUp(ctaEl.value,    { delay: 0.18, y: Y.sm, duration: DUR.sm })
})

function SvgIcon(path: string) {
  return defineComponent({
    render: () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: path })
    ])
  })
}

const contacts = [
  {
    label: 'Email',
    value: 'ahmed.m.najibe@gmail.com',
    href: 'mailto:ahmed.m.najibe@gmail.com',
    external: false,
    icon: SvgIcon('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'),
  },
  {
    label: 'Phone',
    value: '+20 155 501 3655',
    href: 'tel:+201555013655',
    external: false,
    icon: SvgIcon('M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'),
  },
  {
    label: 'LinkedIn',
    value: 'ahmed-m-najibe',
    href: 'https://linkedin.com/in/ahmed-m-najibe',
    external: true,
    icon: SvgIcon('M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z'),
  },
  {
    label: 'GitHub',
    value: 'ahmednajibe',
    href: 'https://github.com/ahmednajibe',
    external: true,
    icon: SvgIcon('M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22'),
  },
  {
    label: 'Mostaql',
    value: 'lectara',
    href: 'https://mostaql.com/u/lectara',
    external: true,
    icon: SvgIcon('M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'),
  },
]
</script>
