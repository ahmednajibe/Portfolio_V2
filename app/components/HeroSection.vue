<template>
  <section ref="heroSection" id="hero" class="relative min-h-screen flex items-center overflow-hidden bg-[#060608]">
    <!-- subtle radial glow -->
    <div ref="glowEl" class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(125,211,252,0.04) 0%, transparent 70%)" />

    <!-- WebGL-grade particle field -->
    <HeroParticles />

    <div class="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-20 pt-20 pb-28">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-around gap-12 lg:gap-20">

        <!-- LEFT: Text -->
        <div ref="textCol" class="lg:max-w-[55%]">

          <!-- "this is" handwritten -->
          <div ref="tagline" class="mb-2">
            <span class="font-hand text-accent-blue text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none">
              this is
            </span>
          </div>

          <!-- BIG NAME -->
          <h1 class="font-satoshi font-black leading-[0.92] tracking-[-0.03em] text-white mb-4">
            <span ref="word1" class="block text-[clamp(3.2rem,10vw,8rem)] uppercase">Ahmed</span>
            <span ref="word2" class="block text-[clamp(3.2rem,10vw,8rem)] uppercase text-white/90">Najiebe</span>
          </h1>

          <!-- "Full Stack Developer" handwritten -->
          <div ref="word3" class="mb-8">
            <span class="font-hand text-accent-green text-[clamp(1.4rem,2.8vw,2.2rem)]">
              Full Stack Developer &amp; Systems Thinker
            </span>
          </div>

          <!-- Badges -->
          <div ref="desc" class="flex flex-wrap items-center gap-3 mb-10">
            <span class="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">
              <span class="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span class="text-text-primary">Available</span>
            </span>
            <span class="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text-secondary">
              Cairo, EG · UTC+03:00
            </span>
            <span class="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text-secondary">
              Currently @&nbsp;<span class="text-text-primary">4D · SA</span>
            </span>
          </div>

          <!-- CTA -->
          <div ref="cta" class="flex flex-wrap items-center gap-4">
            <a href="#projects" class="btn-primary">Selected Work →</a>
            <a href="#contact" class="btn-ghost">Get In Touch</a>
          </div>

          <!-- Socials -->
          <div ref="socials" class="flex items-center gap-5 mt-10">
            <a href="https://github.com/ahmednajibe" target="_blank" rel="noopener" class="text-text-secondary hover:text-white transition-colors cursor-none text-xs tracking-widest uppercase">GitHub</a>
            <span class="w-px h-3 bg-white/10" />
            <a href="https://linkedin.com/in/ahmed-m-najibe" target="_blank" rel="noopener" class="text-text-secondary hover:text-white transition-colors cursor-none text-xs tracking-widest uppercase">LinkedIn</a>
            <span class="w-px h-3 bg-white/10" />
            <a href="https://mostaql.com/u/lectara" target="_blank" rel="noopener" class="text-text-secondary hover:text-white transition-colors cursor-none text-xs tracking-widest uppercase">Mostaql</a>
          </div>
        </div>

        <!-- RIGHT: Photo -->
        <div ref="photoEl" class="relative flex-shrink-0 flex justify-center lg:justify-start">
          <!-- Floating annotation -->
          <div class="absolute -top-6 left-8 lg:-top-6 lg:-left-10 z-10 pointer-events-none select-none">
            <span class="font-hand text-accent-green text-lg lg:text-xl rotate-[-6deg] inline-block">that's me ↓</span>
          </div>

          <!-- Photo card — slightly tilted -->
          <div class="photo-card relative w-[220px] sm:w-[260px] lg:w-[300px] xl:w-[340px]">
            <!-- Shadow card behind -->
            <div class="absolute inset-0 translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4 bg-white/5 rounded-[6px] border border-white/5" />
            <!-- Main card -->
            <div class="relative rounded-[6px] overflow-hidden border border-white/10 aspect-[3/4] bg-surface">
              <NuxtImg
                src="/images/my pic.png"
                alt="Ahmed Najiebe"
                class="w-full h-full object-cover object-top"
                format="webp"
                quality="90"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <!-- Rating badges floating -->
            <div class="hidden min-[380px]:block absolute -left-8 lg:-left-10 top-1/3 bg-[#111] border border-white/10 rounded-[4px] px-2.5 py-1.5 text-xs lg:text-sm font-bold text-white">
              5.0 ⭐
            </div>
            <div class="hidden min-[380px]:block absolute -right-4 lg:-right-6 bottom-1/4 bg-[#111] border border-white/10 rounded-[4px] px-2.5 py-1.5 text-xs lg:text-sm font-bold text-white">
              +{{ projectCount }} projects
            </div>

            <!-- Available badge on photo -->
            <div class="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-[4px] px-3 py-2 text-xs">
              <div class="flex items-center justify-between gap-2">
                <span class="text-text-secondary">Freelance rating</span>
                <span class="text-accent-green font-semibold">5.0 / 5.0 ★</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <span class="text-[10px] tracking-[0.2em] uppercase text-white">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-white to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { heroSetInitialStates, heroAnimateIn } from '~/composables/useAnimation'

const heroSection = ref<HTMLElement | null>(null)
const glowEl      = ref<HTMLElement | null>(null)
const textCol     = ref<HTMLElement | null>(null)
const tagline     = ref<HTMLElement | null>(null)
const word1       = ref<HTMLElement | null>(null)
const word2       = ref<HTMLElement | null>(null)
const word3       = ref<HTMLElement | null>(null)
const desc        = ref<HTMLElement | null>(null)
const cta         = ref<HTMLElement | null>(null)
const socials     = ref<HTMLElement | null>(null)
const photoEl     = ref<HTMLElement | null>(null)

let cleanupParallax: (() => void) | null = null

function setupParallax() {
  if (!heroSection.value) return
  if (!window.matchMedia('(hover: hover)').matches) return

  const layers = [
    { el: glowEl.value,   xF:  18, yF:  10, dur: 1.4 },
    { el: textCol.value,  xF:   6, yF:   0, dur: 1.0 },
    { el: photoEl.value,  xF: -22, yF: -14, dur: 0.9 },
  ].filter(l => l.el)

  const qts = layers.map(({ el, xF, yF, dur }) => ({
    xTo: gsap.quickTo(el!, 'x', { duration: dur, ease: 'power3.out' }),
    yTo: gsap.quickTo(el!, 'y', { duration: dur, ease: 'power3.out' }),
    xF, yF,
  }))

  function onMove(e: MouseEvent) {
    const rect = heroSection.value!.getBoundingClientRect()
    const nx = (e.clientX - rect.left)  / rect.width  - 0.5
    const ny = (e.clientY - rect.top)   / rect.height - 0.5
    for (const { xTo, yTo, xF, yF } of qts) {
      xTo(nx * xF * 2)
      yTo(ny * yF * 2)
    }
  }

  function onLeave() {
    for (const { xTo, yTo } of qts) { xTo(0); yTo(0) }
  }

  heroSection.value.addEventListener('mousemove', onMove, { passive: true })
  heroSection.value.addEventListener('mouseleave', onLeave)

  cleanupParallax = () => {
    heroSection.value?.removeEventListener('mousemove', onMove)
    heroSection.value?.removeEventListener('mouseleave', onLeave)
  }
}

const projectCount = 5

const props = defineProps<{ loaderDone: boolean }>()
const { loaderDone } = toRefs(props)

watch(loaderDone, (val) => { if (val) animateIn() })

function animateIn() {
  heroAnimateIn({
    tagline : tagline.value,
    word1   : word1.value,
    word2   : word2.value,
    word3   : word3.value,
    desc    : desc.value,
    cta     : cta.value,
    socials : socials.value,
    photo   : photoEl.value,
  })
  setTimeout(setupParallax, 2200)
}

onMounted(() => {
  heroSetInitialStates({
    tagline : tagline.value,
    word1   : word1.value,
    word2   : word2.value,
    word3   : word3.value,
    desc    : desc.value,
    cta     : cta.value,
    socials : socials.value,
    photo   : photoEl.value,
  })
  if (loaderDone.value) animateIn()
})

onUnmounted(() => cleanupParallax?.())
</script>

<style scoped>
.bg-gradient-radial {
  background:
    radial-gradient(ellipse 80% 50% at 20% 30%, rgba(125, 211, 252, 0.05) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 70%, rgba(52, 211, 153, 0.04) 0%, transparent 60%);
}
.photo-card {
  transform: rotate(2deg);
  transition: transform 0.5s ease;
}
.photo-card:hover {
  transform: rotate(0deg);
}
</style>
