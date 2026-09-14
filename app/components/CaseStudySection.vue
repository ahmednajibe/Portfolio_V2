<template>
  <section id="case-study" class="py-20 md:py-28 border-t border-white/5">
    <div class="section-container">

      <!-- ── Header ─────────────────────────────────────────── -->
      <header ref="headerEl" class="max-w-3xl">
        <p class="section-tag">Case Study</p>
        <h2 class="section-title">
          One page returned 500.<br />
          <span class="text-text-secondary font-normal">Nothing in any log.</span>
        </h2>
        <p class="mt-6 text-sm md:text-base leading-relaxed text-text-secondary/75 max-w-xl">
          A production bug on
          <a href="https://ncmh.org.sa/" target="_blank" rel="noopener" class="text-text-primary underline decoration-white/20 underline-offset-4 hover:decoration-accent-green transition-colors">ncmh.org.sa</a>
          that no amount of application debugging could explain — because the application was never the problem.
        </p>
      </header>

      <!-- ── Investigation ──────────────────────────────────── -->
      <ol ref="stagesEl" class="stages">
        <li v-for="stage in stages" :key="stage.n" class="stage">
          <div class="stage-rail" aria-hidden="true">
            <span class="stage-n">{{ stage.n }}</span>
            <span class="stage-line" />
          </div>
          <div class="stage-body">
            <h3 class="stage-label">{{ stage.label }}</h3>
            <p class="stage-text">{{ stage.text }}</p>
          </div>
        </li>
      </ol>

      <!-- ── Takeaway ───────────────────────────────────────── -->
      <blockquote ref="takeawayEl" class="takeaway">
        <p>
          Most bugs live in your code. Some live in the infrastructure nobody told you about.
          Knowing which one you're looking at — before you start rewriting things — is the
          difference between an afternoon and a week.
        </p>
      </blockquote>

      <!-- ── Platform context ───────────────────────────────── -->
      <div ref="contextEl" class="mt-20 md:mt-28">
        <div class="flex items-baseline gap-4 mb-6">
          <h3 class="text-lg md:text-xl font-black tracking-tight text-text-primary">
            The platform it happened on
          </h3>
          <span class="flex-1 h-px bg-white/8" />
        </div>

        <p class="text-sm md:text-base leading-relaxed text-text-secondary/75 max-w-2xl mb-10">
          A Saudi government mental-health platform I rebuilt from a legacy monolith into a
          versioned Laravel REST API powering a Vue 3 + TypeScript single-page app. I audited
          the old codebase, made the case to leadership for a full rebuild, and delivered it solo.
        </p>

        <dl class="facts">
          <div v-for="fact in facts" :key="fact.label" class="fact">
            <dt class="fact-label">{{ fact.label }}</dt>
            <dd class="fact-value">{{ fact.value }}</dd>
          </div>
        </dl>

        <!-- Screens -->
        <div class="mt-12 grid gap-5 md:grid-cols-2">
          <figure v-for="shot in shots" :key="shot.src" class="shot">
            <div class="shot-frame">
              <NuxtImg
                :src="shot.src"
                :alt="shot.alt"
                class="w-full h-auto block"
                format="webp"
                quality="82"
                sizes="sm:100vw md:50vw"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption class="shot-caption">{{ shot.caption }}</figcaption>
          </figure>
        </div>

        <div class="mt-12">
          <a href="https://ncmh.org.sa/" target="_blank" rel="noopener" class="btn-ghost inline-flex">
            Visit the live platform
            <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
const { revealBlur, revealFadeUp, revealStagger, STAGGER, Y, DUR } = useAnimation()

const headerEl   = ref<HTMLElement | null>(null)
const stagesEl   = ref<HTMLElement | null>(null)
const takeawayEl = ref<HTMLElement | null>(null)
const contextEl  = ref<HTMLElement | null>(null)

/*
  The investigation, told in the order it actually happened.

  Deliberately sanitised for public publication: the real facility licence
  number is a live client record and is not reproduced here, and the
  residual-exposure notes from the internal write-up are omitted. The
  diagnostic process is the point — the specific data adds nothing for a
  reader and creates real risk for a live government platform.
*/
const stages = [
  {
    n: '01',
    label: 'The symptom',
    text: 'A single page of the healthcare-facilities Atlas returned HTTP 500 in production. Every other page worked. There was nothing in any log — not Laravel, not PHP, not Apache.',
  },
  {
    n: '02',
    label: 'The contradiction',
    text: 'A HEAD request to the failing URL returned 200. A GET to the same URL returned 500. Running the identical query under artisan tinker produced a clean result. The application was not the thing failing.',
  },
  {
    n: '03',
    label: 'The method',
    text: 'If the response body was the trigger, the body would tell me. I bisected the JSON over HTTP — removing fields, re-requesting, narrowing — until a single field flipped the response from 200 to 500.',
  },
  {
    n: '04',
    label: 'The root cause',
    text: 'A network-level WAF appliance sitting in front of the server inspects response bodies. One facility record held a sixteen-digit licence number that happened to satisfy the Luhn checksum, so the appliance\'s credit-card DLP signature concluded the API was leaking a payment card and swapped in its own block page. Only that one Atlas page broke, because it was the only page containing that record.',
  },
  {
    n: '05',
    label: 'The fix',
    text: 'I removed the licence number from public API responses. Nothing in the frontend consumed it, and it should never have been exposed publicly in the first place — so the correct fix and the minimal fix were the same change.',
  },
  {
    n: '06',
    label: 'The handover',
    text: 'I documented the failure mode and the proper long-term remedy — a targeted WAF signature exemption rather than shaping payloads around it — in the repository\'s engineering notes, so the next person to hit it does not lose a day to it.',
  },
]

/* Every figure verified against the repository. See the private master reference. */
const facts = [
  { label: 'Role',        value: 'Sole developer' },
  { label: 'SPA views',   value: '68' },
  { label: 'API',         value: '90+ endpoints' },
  { label: 'Data models', value: '62 Eloquent' },
  { label: 'Stack',       value: 'Laravel 10 · Vue 3 · TS' },
  { label: 'Status',      value: 'Live' },
]

const shots = [
  {
    src: '/images/ncmh/verify-certificates.png',
    alt: 'NCMH certificate verification page, where a citizen can look up and validate a training certificate',
    caption: 'Public certificate verification — QR and lookup based.',
  },
  {
    src: '/images/ncmh/flipbook.png',
    alt: 'NCMH PDF flipbook reader rendering a publication as a page-turning book',
    caption: 'PDF flipbook reader for platform publications.',
  },
]

onMounted(() => {
  revealBlur(headerEl.value)
  if (stagesEl.value) {
    revealStagger(stagesEl.value.querySelectorAll('.stage'), {
      stagger: STAGGER.md,
      y: Y.sm,
      duration: DUR.md,
    })
  }
  revealFadeUp(takeawayEl.value, { y: Y.sm, duration: DUR.md })
  revealFadeUp(contextEl.value, { y: Y.sm, duration: DUR.md })
})
</script>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   INVESTIGATION TIMELINE
   A numbered rail, not cards. The number column is the spine.
   ───────────────────────────────────────────────────────────── */
.stages {
  list-style: none;
  margin-top: 4rem;
  max-width: 46rem;
}

@media (min-width: 768px) {
  .stages { margin-top: 6rem; }
}

.stage {
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .stage {
    grid-template-columns: 3.5rem 1fr;
    gap: 2rem;
  }
}

.stage-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.stage-n {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #34D399;
  line-height: 1;
  padding-top: 0.35rem;
}

.stage-line {
  flex: 1;
  width: 1px;
  background: linear-gradient(
    to bottom,
    rgba(52, 211, 153, 0.28) 0%,
    rgba(255, 255, 255, 0.06) 45%,
    transparent 100%
  );
}

/* Last stage has nothing to connect to. */
.stage:last-child .stage-line { display: none; }

.stage-body { padding-bottom: 2.75rem; }
.stage:last-child .stage-body { padding-bottom: 0; }

.stage-label {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.stage-text {
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(229, 231, 235, 0.62);
  max-width: 60ch;
}

@media (min-width: 768px) {
  .stage-label { font-size: 1.05rem; }
  .stage-text  { font-size: 0.925rem; }
}

/* ─────────────────────────────────────────────────────────────
   TAKEAWAY
   ───────────────────────────────────────────────────────────── */
.takeaway {
  margin-top: 3.5rem;
  max-width: 44rem;
  border-left: 2px solid rgba(52, 211, 153, 0.35);
  padding: 0.25rem 0 0.25rem 1.5rem;
}

.takeaway p {
  font-size: 1rem;
  line-height: 1.65;
  letter-spacing: -0.01em;
  color: rgba(229, 231, 235, 0.88);
}

@media (min-width: 768px) {
  .takeaway { padding-left: 2rem; }
  .takeaway p { font-size: 1.15rem; }
}

/* ─────────────────────────────────────────────────────────────
   FACTS
   ───────────────────────────────────────────────────────────── */
.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

@media (min-width: 640px) { .facts { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .facts { grid-template-columns: repeat(6, minmax(0, 1fr)); } }

.fact {
  background: #0f0f13;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.fact-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-tertiary, #5b6575);
}

.fact-value {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  line-height: 1.35;
}

/* ─────────────────────────────────────────────────────────────
   SCREENS
   Natural height — these are real screenshots and must not crop.
   ───────────────────────────────────────────────────────────── */
.shot-frame {
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  overflow: hidden;
  background: #0f0f13;
}

.shot-caption {
  margin-top: 0.7rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(229, 231, 235, 0.45);
}
</style>
