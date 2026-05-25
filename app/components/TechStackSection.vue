<template>
  <section id="stack" class="border-t border-white/5 py-24 md:py-32">
    <div class="section-container">

      <!-- Heading -->
      <div ref="headingEl" class="mb-12 md:mb-16">
        <p class="font-hand leading-none mb-1" style="font-size: clamp(1.5rem, 3.5vw, 2.5rem); color: var(--accent-blue); opacity: 0.9;">My Tech</p>
        <h2 class="font-black text-white m-0 leading-none" style="font-size: clamp(3.5rem, 8vw, 9rem); letter-spacing: -0.03em;">Stack</h2>
      </div>

      <!-- Content row: grid left + socials right -->
      <div class="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-10">

        <!-- Responsive Grid -->
        <div class="relative w-full" ref="gridEl">
          <!-- Border overlay -->
          <div class="tech-grid-border" />

          <!-- Grid -->
          <div class="tech-grid">
            <div
              v-for="(tech, i) in techs"
              :key="tech.name"
              class="group cell cursor-none"
            >
              <img :src="tech.logo" :alt="tech.name" class="logo-img" loading="lazy" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <!-- Social links sidebar -->
        <div ref="socialsEl" class="flex flex-row lg:flex-col items-center justify-start gap-3 lg:gap-4 lg:pt-4 shrink-0 relative z-30">
          <div class="hidden lg:block w-px h-10 bg-gradient-to-b from-white/40 to-transparent mb-1" />
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link cursor-none"
          >
            <component :is="social.icon" />
            <span class="social-tooltip">{{ social.label }}</span>
          </a>
          <div class="hidden lg:block w-px h-10 bg-gradient-to-t from-white/40 to-transparent mt-1" />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useAnimation } from '~/composables/useAnimation'
const { revealBlur, revealFadeUp, revealStagger, STAGGER, Y, DUR } = useAnimation()

const headingEl  = ref<HTMLElement | null>(null)
const gridEl     = ref<HTMLElement | null>(null)
const socialsEl  = ref<HTMLElement | null>(null)

onMounted(() => {
  revealBlur(headingEl.value)
  revealFadeUp(socialsEl.value, { delay: 0.2, y: Y.sm })
  if (gridEl.value) {
    const cells = gridEl.value.querySelectorAll('.cell')
    revealStagger(cells, { stagger: STAGGER.sm, y: Y.sm, duration: DUR.sm, delay: 0.1 })
  }
})

const IconGithub = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: 24, height: 24 }, [
  h('path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }),
  h('path', { d: 'M9 18c-4.51 2-5-2-7-2' }),
])
const IconLinkedin = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: 24, height: 24 }, [
  h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
  h('rect', { width: '4', height: '12', x: '2', y: '9' }),
  h('circle', { cx: '4', cy: '4', r: '2' }),
])
const IconInstagram = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: 24, height: 24 }, [
  h('rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5' }),
  h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
  h('line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5' }),
])

const socials = [
  { label: 'GitHub',    href: 'https://github.com/ahmednajibe',                      icon: IconGithub },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/ahmed-najiebe',               icon: IconLinkedin },
  { label: 'Instagram', href: 'https://instagram.com/ahmed_dhshan_',                 icon: IconInstagram },
]

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const techs = [
  { name: 'Vue.js',      logo: `${D}/vuejs/vuejs-original.svg` },
  { name: 'Nuxt',        logo: `${D}/nuxtjs/nuxtjs-original.svg` },
  { name: 'React',       logo: `${D}/react/react-original.svg` },
  { name: 'TypeScript',  logo: `${D}/typescript/typescript-original.svg` },
  { name: 'TailwindCSS', logo: `${D}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Python',      logo: `${D}/python/python-original.svg` },
  { name: 'Django',      logo: `${D}/django/django-plain.svg` },
  { name: 'PostgreSQL',  logo: `${D}/postgresql/postgresql-original.svg` },
  { name: 'Git',         logo: `${D}/git/git-original.svg` },
  { name: 'GitHub',      logo: `${D}/github/github-original.svg` },
]
</script>

<style scoped>
/* Responsive tech grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px dashed rgba(255,255,255,0.18);
  width: 100%;
}
@media (min-width: 480px) {
  .tech-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 768px) {
  .tech-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 1024px) {
  .tech-grid { grid-template-columns: repeat(5, 1fr); }
}

.tech-grid-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Cell */
.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 12px;
  min-height: 100px;
  border-right: 1px dashed rgba(255,255,255,0.14);
  border-bottom: 1px dashed rgba(255,255,255,0.14);
  transition: background 0.3s ease;
}
.cell:nth-child(2n) { border-right: none; }
@media (min-width: 480px) {
  .cell { min-height: 110px; }
  .cell:nth-child(2n) { border-right: 1px dashed rgba(255,255,255,0.14); }
  .cell:nth-child(3n) { border-right: none; }
}
@media (min-width: 768px) {
  .cell { min-height: 120px; }
  .cell:nth-child(3n) { border-right: 1px dashed rgba(255,255,255,0.14); }
  .cell:nth-child(4n) { border-right: none; }
}
@media (min-width: 1024px) {
  .cell { min-height: 140px; padding: 16px; }
  .cell:nth-child(4n) { border-right: 1px dashed rgba(255,255,255,0.14); }
  .cell:nth-child(5n) { border-right: none; }
}
.cell:hover {
  background: rgba(255, 255, 255, 0.03);
}

/* Icon */
.logo-img {
  width: clamp(48px, 10vw, 88px);
  height: clamp(48px, 10vw, 88px);
  object-fit: contain;
  object-position: center;
  opacity: 0.6;
  filter: grayscale(100%);
  display: block;
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
}
.group:hover .logo-img {
  opacity: 1;
  filter: grayscale(0%) drop-shadow(0 0 10px rgba(255,255,255,0.3)) drop-shadow(0 0 20px rgba(59,130,246,0.2));
  transform: scale(1.05);
}

/* Tech name label */
.tech-name {
  font-size: 0.65rem;
  color: rgba(148, 163, 184, 0.5);
  letter-spacing: 0.05em;
  text-align: center;
  transition: color 0.3s ease;
}
.group:hover .tech-name {
  color: rgba(148, 163, 184, 0.9);
}

/* Social links */
.social-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  color: rgba(107, 114, 128, 0.9);
  transition: color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}
.social-link svg {
  width: 28px;
  height: 28px;
  transition: color 0.3s;
}
.social-link:hover {
  color: #fff;
  transform: translateY(-2px);
}

/* Tooltip — appears ABOVE on mobile, LEFT on desktop */
.social-tooltip {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  background: #e5e7eb;
  color: #060608;
  transition: opacity 0.2s ease;
  z-index: 50;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
}
@media (min-width: 1024px) {
  .social-tooltip {
    bottom: auto;
    left: auto;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    margin-right: 12px;
  }
}
.social-link:hover .social-tooltip {
  opacity: 1;
}
</style>
