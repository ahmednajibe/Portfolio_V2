<template>
  <section id="polluscan" class="py-20 md:py-28 border-t border-white/5">
    <div class="section-container">
      <div ref="headerEl" class="mb-10 md:mb-12">
        <p class="section-tag">Command Center</p>
        <h2 class="section-title mb-3">
          Polluscan<span class="text-accent-green">.</span>
        </h2>
        <p class="text-text-secondary text-lg max-w-2xl">
          National Air Quality Intelligence System — monitoring industrial emissions across Egypt.
          <span class="text-yellow-400 font-medium">🥇 Egypt National Startup Finals</span>
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div ref="monitorEl" class="lg:col-span-2 bg-surface border border-white/5 rounded-[4px] p-6 relative overflow-hidden">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span class="text-text-secondary text-xs uppercase tracking-widest">Live Monitor</span>
            </div>
            <span class="text-text-secondary text-xs font-mono">{{ currentTime }}</span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div v-for="metric in metrics" :key="metric.label" class="metric-card">
              <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">{{ metric.label }}</div>
              <div class="metric-value" :class="metric.color">{{ metric.value }}</div>
              <div class="text-xs mt-1" :class="metric.trend > 0 ? 'text-red-400' : 'text-accent-green'">
                {{ metric.trend > 0 ? '↑' : '↓' }} {{ Math.abs(metric.trend) }}%
              </div>
            </div>
          </div>

          <div class="h-24 relative">
            <svg class="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#34D399" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#34D399" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path :d="wavePath" fill="url(#waveGrad)" />
              <path :d="wavePathLine" fill="none" stroke="#34D399" stroke-width="1.5" />
              <path :d="wavePath2" fill="none" stroke="rgba(125,211,252,0.3)" stroke-width="1" />
            </svg>
          </div>
        </div>

        <div ref="sidebarEl" class="space-y-4">
          <div class="bg-surface border border-white/5 rounded-[4px] p-5">
            <p class="text-text-secondary text-xs uppercase tracking-widest mb-4">System Architecture</p>
            <div class="space-y-3">
              <div v-for="feat in features" :key="feat" class="flex items-start gap-2 text-sm text-text-secondary">
                <span class="text-accent-green mt-0.5 flex-shrink-0">›</span>
                <span>{{ feat }}</span>
              </div>
            </div>
          </div>

          <div class="bg-surface border border-accent-green/10 rounded-[4px] p-5">
            <p class="text-text-secondary text-xs uppercase tracking-widest mb-3">Stack</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in ['Flask', 'MySQL', 'JavaScript', 'Chart.js', 'WebSockets']" :key="t" class="tech-badge text-accent-green border-accent-green/20 bg-accent-green/5">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8 rounded-[4px] overflow-hidden border border-white/5 relative">
        <NuxtImg
          src="/images/polluscan/Screenshot 2026-01-01 021037.png"
          alt="Polluscan Dashboard"
          class="w-full object-cover object-top opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-none"
          format="webp"
          quality="85"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <button class="btn-ghost inline-flex" @click="videoOpen = true">
        Watch Demo
        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      </button>

      <VideoModal v-model="videoOpen" video-id="bIxIA4zmvHs" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
const { revealBlur, revealScale, revealFadeUp, STAGGER, Y, DUR } = useAnimation()

const videoOpen = ref(false)

const headerEl  = ref<HTMLElement | null>(null)
const monitorEl = ref<HTMLElement | null>(null)
const sidebarEl = ref<HTMLElement | null>(null)
const currentTime = ref('')
const metricsRaw = ref([
  { label: 'Air Quality Index', num: 142, suffix: '', color: 'text-yellow-400', trend: 2.3, min: 80, max: 200 },
  { label: 'Active Sensors', num: 847, suffix: '', color: 'text-accent-green', trend: -1.1, min: 800, max: 900 },
  { label: 'Violations Today', num: 12, suffix: '', color: 'text-red-400', trend: 8.5, min: 5, max: 30 },
  { label: 'Compliance Rate', num: 91, suffix: '%', color: 'text-accent-blue', trend: -0.4, min: 80, max: 99 },
])

const metrics = computed(() => metricsRaw.value.map(m => ({ ...m, value: `${m.num}${m.suffix}` })))

const features = [
  '5-tier RBAC (National → Factory level)',
  'Automated compliance engine + penalties',
  'Real-time emission tracking',
  'Decentralized regional admin',
  'Predictive violation alerts',
]

const wavePath = ref('')
const wavePathLine = ref('')
const wavePath2 = ref('')

function generateWave(offset: number, amplitude = 20, frequency = 0.03): string {
  const points = []
  for (let x = 0; x <= 400; x += 5) {
    const y = 40 + amplitude * Math.sin(x * frequency + offset) + (amplitude * 0.5) * Math.sin(x * frequency * 2.1 + offset * 1.3)
    points.push(`${x},${y}`)
  }
  return `M0,80 L0,${40 + amplitude * Math.sin(offset)} ` + points.map((p, i) => (i === 0 ? `L${p}` : `L${p}`)).join(' ') + ` L400,80 Z`
}

function generateWaveLine(offset: number, amplitude = 20, frequency = 0.03): string {
  const points = []
  for (let x = 0; x <= 400; x += 5) {
    const y = 40 + amplitude * Math.sin(x * frequency + offset) + (amplitude * 0.5) * Math.sin(x * frequency * 2.1 + offset * 1.3)
    points.push(`${x},${y}`)
  }
  return `M` + points.join(' L')
}

let animFrame: number
let t = 0

function animate() {
  t += 0.015
  wavePath.value = generateWave(t)
  wavePathLine.value = generateWaveLine(t)
  wavePath2.value = generateWaveLine(t * 0.7 + 1.2, 12, 0.025)
  animFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  revealBlur(headerEl.value)
  revealScale(monitorEl.value, { delay: 0.08, duration: DUR.xl })
  revealFadeUp(sidebarEl.value, { delay: 0.15, y: Y.sm })
  animate()
  setInterval(() => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('en-US', { hour12: false })

    metricsRaw.value = metricsRaw.value.map(m => {
      const delta = Math.floor((Math.random() - 0.48) * 3)
      const newNum = Math.min(m.max, Math.max(m.min, m.num + delta))
      return { ...m, num: newNum }
    })
  }, 2000)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
})
</script>
