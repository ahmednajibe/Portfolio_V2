
<template>
  <article
    ref="rowEl"
    class="prow group"
    :class="[`prow--${project.variant}`, { 'prow--has-image': !!project.image }]"
  >
    <!-- ── Visual ─────────────────────────────────────────────── -->
    <div class="prow-visual">
      <div ref="visualEl" class="prow-frame" :style="{ background: project.imageBg }">
        <NuxtImg
          v-if="project.image"
          :src="project.image"
          :alt="`${project.title} interface`"
          class="prow-photo"
          format="webp"
          quality="85"
          loading="lazy"
          decoding="async"
        />

        <!-- Placeholder panel. Typographic and intentional, not a broken-image box. -->
        <div v-else class="prow-placeholder">
          <span class="prow-grid" aria-hidden="true" />
          <span class="prow-monogram" aria-hidden="true">{{ project.monogram }}</span>
          <span v-if="project.domain" class="prow-domain">{{ project.domain }}</span>
          <span v-else-if="project.confidential" class="prow-domain">Private deployment</span>
        </div>

        <div class="prow-scrim" aria-hidden="true" />

        <button
          v-if="project.videoId"
          class="prow-play"
          :aria-label="`Watch ${project.title} demo`"
          @click="emit('play', project)"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ── Copy ───────────────────────────────────────────────── -->
    <div ref="copyEl" class="prow-copy">
      <div class="prow-head">
        <span class="prow-index">{{ project.index }}</span>
        <span class="prow-rule" aria-hidden="true" />
        <span v-if="project.confidential" class="prow-flag">Restricted</span>
      </div>

      <h3 class="prow-title">{{ project.title }}</h3>
      <p class="prow-subtitle">{{ project.subtitle }}</p>
      <p class="prow-summary">{{ project.summary }}</p>

      <!-- The spec block: the credibility engine of this whole section. -->
      <dl class="prow-spec">
        <div class="prow-spec-row">
          <dt>Role</dt>
          <dd>{{ project.spec.role }}</dd>
        </div>
        <div v-if="project.spec.capabilities || project.spec.scale" class="prow-spec-row">
          <dt>{{ project.spec.capabilities ? 'Features' : 'Scale' }}</dt>
          <dd>{{ project.spec.capabilities || project.spec.scale }}</dd>
        </div>
        <div class="prow-spec-row">
          <dt>Stack</dt>
          <dd>{{ project.spec.stack }}</dd>
        </div>
        <div class="prow-spec-row">
          <dt>Status</dt>
          <dd>
            <span v-if="isLive" class="prow-live">{{ project.spec.status }}</span>
            <span v-else>{{ project.spec.status }}</span>
          </dd>
        </div>
      </dl>

      <div v-if="primaryLink || project.videoId" class="prow-actions">
        <a
          v-if="primaryLink"
          :href="primaryLink.href"
          target="_blank"
          rel="noopener"
          class="prow-cta"
        >
          {{ primaryLink.label ?? 'View live site' }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="prow-cta-icon">
            <path d="M7 17L17 7M17 7H9M17 7v8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>

        <button v-if="project.videoId" class="prow-cta prow-cta--ghost" @click="emit('play', project)">
          Watch demo
        </button>
      </div>

      <p v-else-if="project.confidential" class="prow-note">
        Built for an internal network. Walkthrough available on request.
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
import type { Project } from '~/types/project'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{ play: [project: Project] }>()

const { revealScale, revealStagger, DUR, Y, STAGGER } = useAnimation()

const rowEl = ref<HTMLElement | null>(null)
const visualEl = ref<HTMLElement | null>(null)
const copyEl = ref<HTMLElement | null>(null)

const primaryLink = computed(() =>
  props.project.links.find(l => l.type === 'live')
  ?? props.project.links.find(l => l.type === 'repo')
  ?? null,
)

const isLive = computed(() => /^live/i.test(props.project.spec.status))

onMounted(() => {
  // One motivated reveal per row: the visual settles, the copy staggers in.
  revealScale(visualEl.value, { scale: 0.96, duration: DUR.xl })
  if (copyEl.value) {
    revealStagger(Array.from(copyEl.value.children) as HTMLElement[], {
      stagger: STAGGER.sm,
      y: Y.md,
      duration: DUR.sm,
      delay: 0.1,
    })
  }
})
</script>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   BASE ROW
   Mobile first: everything is a single column stack.
   ───────────────────────────────────────────────────────────── */
.prow {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
  align-items: center;
}

/* ── Visual ── */
.prow-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  aspect-ratio: 16 / 10;
  transition: border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.prow:hover .prow-frame {
  border-color: rgba(255, 255, 255, 0.16);
}

.prow-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0.82;
  transform: scale(1.01);
  transition:
    opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.prow:hover .prow-photo {
  opacity: 1;
  transform: scale(1.04);
}

.prow-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(6, 6, 8, 0.72), transparent 55%);
}

/* ── Placeholder panel ── */
.prow-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
}
.prow-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 78%);
}
.prow-monogram {
  position: relative;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: rgba(255, 255, 255, 0.09);
  user-select: none;
}
.prow-domain {
  position: relative;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(52, 211, 153, 0.55);
}

/* ── Play button ── */
.prow-play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #060608;
  background: rgba(52, 211, 153, 0.92);
  border: none;
  transform: translate(-50%, -50%) scale(0.85);
  opacity: 0;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
  z-index: 2;
}
.prow:hover .prow-play,
.prow-play:focus-visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
@media (hover: none) {
  .prow-play {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
.prow-cta {
  min-height: 44px;
}

/* ─────────────────────────────────────────────────────────────
   COPY
   ───────────────────────────────────────────────────────────── */
.prow-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.1rem;
}
.prow-index {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #34D399;
}
.prow-rule {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}
.prow-flag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(229, 231, 235, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  padding: 0.2rem 0.5rem;
}

.prow-title {
  font-size: clamp(1.75rem, 3.6vw, 2.75rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: var(--text-primary);
}
.prow-subtitle {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #34D399;
}
.prow-summary {
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(229, 231, 235, 0.62);
  max-width: 54ch;
}

/* ── Spec block ── */
.prow-spec {
  margin-top: 1.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.prow-spec-row {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 1rem;
  align-items: baseline;
  padding: 0.62rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.prow-spec-row dt {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-tertiary, #5b6575);
}
.prow-spec-row dd {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  line-height: 1.55;
  color: rgba(229, 231, 235, 0.78);
}
.prow-live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #34D399;
}
.prow-live::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: #34D399;
}

/* ── Actions ── */
.prow-actions {
  margin-top: 1.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}
.prow-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  padding: 0.6rem 1.15rem;
  border-radius: 9999px;
  background: #E5E7EB;
  color: #060608;
  border: 1px solid #E5E7EB;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.prow-cta:hover {
  background: transparent;
  color: #E5E7EB;
}
.prow-cta:active {
  transform: scale(0.98);
}
.prow-cta-icon {
  width: 13px;
  height: 13px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.prow-cta:hover .prow-cta-icon {
  transform: translate(2px, -2px);
}

.prow-cta--ghost {
  background: transparent;
  color: rgba(229, 231, 235, 0.7);
  border-color: rgba(255, 255, 255, 0.15);
}
.prow-cta--ghost:hover {
  background: transparent;
  color: #E5E7EB;
  border-color: rgba(255, 255, 255, 0.4);
}

.prow-note {
  margin-top: 1.6rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px;
  line-height: 1.6;
  letter-spacing: 0.04em;
  color: var(--text-tertiary, #5b6575);
  max-width: 40ch;
}

/* ─────────────────────────────────────────────────────────────
   LAYOUT FAMILIES
   Four distinct compositions so no two rows repeat a pattern.
   All of them collapse to the single-column base below 900px.
   ───────────────────────────────────────────────────────────── */
@media (min-width: 900px) {

  /* 1. WIDE — full-width visual, copy beneath in a narrow measure. */
  .prow--wide {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .prow--wide .prow-frame {
    aspect-ratio: 21 / 9;
  }
  .prow--wide .prow-copy {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    column-gap: 4rem;
    align-items: start;
  }
  .prow--wide .prow-head,
  .prow--wide .prow-title,
  .prow--wide .prow-subtitle,
  .prow--wide .prow-summary {
    grid-column: 1;
  }
  .prow--wide .prow-spec {
    grid-column: 2;
    grid-row: 1 / span 5;
    margin-top: 0.35rem;
    border-top: none;
  }
  .prow--wide .prow-actions,
  .prow--wide .prow-note {
    grid-column: 1;
  }

  /* 2. SPLIT — copy left, visual right bleeding past the container edge. */
  .prow--split {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 3.5rem;
  }
  .prow--split .prow-copy {
    grid-column: 1;
    grid-row: 1;
  }
  .prow--split .prow-visual {
    grid-column: 2;
    grid-row: 1;
    margin-right: -3vw;
  }
  .prow--split .prow-frame {
    aspect-ratio: 4 / 3;
  }

  /* 3. IMMERSIVE — visual as the backdrop, copy overlaid in a contained column. */
  .prow--immersive {
    position: relative;
    grid-template-columns: 1fr;
    gap: 0;
    min-height: 30rem;
  }
  .prow--immersive .prow-visual {
    position: absolute;
    inset: 0;
  }
  .prow--immersive .prow-frame {
    aspect-ratio: auto;
    height: 100%;
  }
  .prow--immersive .prow-scrim {
    background: linear-gradient(
      100deg,
      rgba(6, 6, 8, 0.96) 0%,
      rgba(6, 6, 8, 0.88) 38%,
      rgba(6, 6, 8, 0.45) 72%,
      rgba(6, 6, 8, 0.25) 100%
    );
  }
  .prow--immersive .prow-copy {
    position: relative;
    z-index: 1;
    max-width: 34rem;
    padding: 3.25rem 0 3.25rem 3.25rem;
  }

  /* 4. SPLIT-REVERSE — visual left, copy right, smaller scale. */
  .prow--split-reverse {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
    gap: 3.5rem;
  }
  .prow--split-reverse .prow-visual {
    order: 1;
    margin-left: -3vw;
  }
  .prow--split-reverse .prow-copy {
    order: 2;
  }
  .prow--split-reverse .prow-frame {
    aspect-ratio: 4 / 3;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .prow-photo,
  .prow-frame,
  .prow-play,
  .prow-cta,
  .prow-cta-icon {
    transition: none;
  }
  .prow:hover .prow-photo {
    transform: scale(1.01);
  }
  .prow-play {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
