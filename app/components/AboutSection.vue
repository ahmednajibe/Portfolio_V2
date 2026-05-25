<template>
  <section id="about" class="py-20 md:py-28 border-t border-white/5">
    <div class="section-container">

      <!-- Header -->
      <div ref="header" class="mb-16">
        <p class="section-tag">About me</p>
        <h2 class="section-title">
          I build things<br />
          <span class="font-hand text-accent-green" style="font-size: clamp(2rem,5vw,4.5rem); font-weight: 400;">
            that actually matter.
          </span>
        </h2>
      </div>

      <!-- Two col: statement + bio -->
      <div ref="body" class="grid md:grid-cols-[1fr_380px] gap-10 md:gap-16 items-start mb-20">
        <p class="text-text-secondary text-lg md:text-xl leading-relaxed">
          Full Stack Developer building enterprise platforms, government systems, and environmental intelligence.
          Currently at <span class="text-white font-medium">4D · Saudi Arabia</span>. Previously led IT operations for the
          <span class="text-white font-medium">Egyptian Armed Forces</span> and taught programming to 50+ students.
          <br /><br />
          I care deeply about clean architecture, real-time systems, and building software that lasts.
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div v-for="s in stats" :key="s.label" class="border border-white/10 rounded-[4px] p-5">
            <div class="text-3xl font-black text-white mb-1" :class="s.color">{{ s.value }}</div>
            <div class="text-text-secondary text-sm leading-snug">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <!-- Traits row -->
      <div ref="traitsEl" class="flex flex-wrap gap-2 border-t border-white/5 pt-8">
        <span class="text-text-secondary text-sm mr-4 self-center">Approach →</span>
        <span v-for="tag in traits" :key="tag" class="tech-badge">{{ tag }}</span>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
const { revealBlur, revealFadeUp, revealStagger, DUR, Y, STAGGER } = useAnimation()

const header   = ref<HTMLElement | null>(null)
const body     = ref<HTMLElement | null>(null)
const traitsEl = ref<HTMLElement | null>(null)

const stats = [
  { value: '1.5+', label: 'Years in production', color: 'text-accent-blue' },
  { value: '50+',  label: 'Students taught',      color: 'text-accent-green' },
  { value: '5',    label: 'Major projects shipped', color: '' },
  { value: '5.0 ★', label: 'Freelance rating',    color: 'text-accent-blue' },
]

const traits = [
  'System Design', 'RBAC', 'Real-time Systems', 'API-First',
  'Clean Code', 'Performance', 'AI Integration', 'DX Focus',
]

onMounted(() => {
  // Header: blur reveal — slightly more dramatic than a plain fadeUp
  revealBlur(header.value)
  // Body text + stats: standard fade-up, slightly delayed
  revealFadeUp(body.value, { delay: 0.08, y: Y.md })
  // Traits: tight stagger, smallest y offset
  if (traitsEl.value) {
    const tags = traitsEl.value.querySelectorAll('.tech-badge')
    revealStagger(tags, { stagger: STAGGER.sm, y: Y.sm, duration: DUR.sm, delay: 0.12 })
  }
})
</script>
