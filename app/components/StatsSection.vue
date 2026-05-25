<template>
  <section class="stats-section">
    <div class="stats-inner">

      <!-- Top rule -->
      <div class="rule" />

      <!-- Stats row -->
      <div ref="rowEl" class="stats-row">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-item"
        >
          <!-- Number -->
          <div class="stat-number">
            <span ref="numberEls" class="stat-value">0</span>
            <span class="stat-suffix">{{ stat.suffix }}</span>
          </div>

          <!-- Label + sub -->
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-sub">{{ stat.sub }}</div>

          <!-- Divider (all except last) -->
          <div v-if="i < stats.length - 1" class="stat-divider" />
        </div>
      </div>

      <!-- Bottom rule -->
      <div class="rule" />

    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const rowEl     = ref<HTMLElement | null>(null)
const numberEls = ref<HTMLElement[]>([])

const stats = [
  { value: 10, suffix: '+',   label: 'Projects Shipped',  sub: 'Web · IoT · AI'         },
  { value: 5,  suffix: '.0★', label: 'Client Rating',     sub: 'Mostaql Freelance'       },
  { value: 2,  suffix: 'yrs', label: 'Building Systems',  sub: 'Full-Stack & IoT'        },
  { value: 4,  suffix: '',    label: 'Industries Served',  sub: 'Gov · Commerce · Health · Env' },
]

function animateStats() {
  if (!rowEl.value) return

  gsap.fromTo(
    rowEl.value.querySelectorAll('.stat-item'),
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
  )

  numberEls.value.forEach((el, i) => {
    const stat = stats[i]
    if (!stat || !el) return
    const counter = { val: 0 }
    gsap.to(counter, {
      val     : stat.value,
      duration: 1.4,
      delay   : i * 0.12,
      ease    : 'power2.out',
      onUpdate()  { el.textContent = Math.round(counter.val).toString() },
      onComplete(){ el.textContent = stat.value.toString() },
    })
  })
}

onMounted(() => {
  if (!rowEl.value) return

  gsap.set(rowEl.value.querySelectorAll('.stat-item'), { opacity: 0, y: 24 })

  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animateStats()
        io.disconnect()
      }
    },
    { rootMargin: '0px 0px -15% 0px', threshold: 0 },
  )
  io.observe(rowEl.value)
})
</script>

<style scoped>
.stats-section {
  padding: 0 0;
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

@media (min-width: 640px)  { .stats-inner { padding: 0 2rem; } }
@media (min-width: 768px)  { .stats-inner { padding: 0 3rem; } }
@media (min-width: 1024px) { .stats-inner { padding: 0 5rem; } }

.rule {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,255,255,0.07) 20%,
    rgba(125,211,252,0.12) 50%,
    rgba(255,255,255,0.07) 80%,
    transparent 100%
  );
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  padding: 2.5rem 0;
  position: relative;
}

@media (min-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(4, 1fr);
    padding: 3rem 0;
  }
}

.stat-item {
  position: relative;
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

@media (max-width: 767px) {
  .stat-item:nth-child(odd)  { border-right: 1px solid rgba(255,255,255,0.05); }
  .stat-item:nth-child(1),
  .stat-item:nth-child(2)    { border-bottom: 1px solid rgba(255,255,255,0.05); }
}

.stat-number {
  display: flex;
  align-items: baseline;
  gap: 2px;
  line-height: 1;
}

.stat-value {
  font-family: var(--font-main, ui-sans-serif), sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #fff;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.stat-suffix {
  font-size: clamp(0.95rem, 1.8vw, 1.3rem);
  font-weight: 700;
  color: var(--accent-blue, #7DD3FC);
  letter-spacing: -0.02em;
  line-height: 1;
  padding-bottom: 2px;
}

.stat-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  margin-top: 0.45rem;
}

.stat-sub {
  font-size: 0.7rem;
  color: var(--text-secondary, #94A3B8);
  letter-spacing: 0.02em;
}

.stat-divider {
  display: none;
}

@media (min-width: 768px) {
  .stat-divider {
    display: block;
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: rgba(255,255,255,0.06);
  }
}
</style>
