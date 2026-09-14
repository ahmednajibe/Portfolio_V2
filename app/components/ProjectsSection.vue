<template>
  <section id="projects" class="py-24 md:py-32 border-t border-white/5">
    <div class="section-container">

      <!-- ── Header ─────────────────────────────────────────── -->
      <header ref="headerEl" class="max-w-3xl">
        <p class="section-tag">Selected Work</p>
        <h2 class="section-title">
          Systems for<br />
          <span class="text-text-secondary font-normal">real work.</span>
        </h2>
        <p class="mt-6 text-sm md:text-base leading-relaxed text-text-secondary/75 max-w-xl">
          Selected platforms and automation tools I've built for organisations
          and teams. Each one shipped to real users — not a demo.
        </p>
      </header>

      <!-- ── Primary rows ───────────────────────────────────── -->
      <div class="mt-16 md:mt-24 flex flex-col gap-24 md:gap-36">
        <ProjectRow
          v-for="project in primaryProjects"
          :key="project.slug"
          :project="project"
          @play="openVideo"
        />
      </div>

      <!-- ── Secondary work ─────────────────────────────────── -->
      <div class="mt-28 md:mt-40">
        <div ref="secondaryHeadEl" class="flex items-baseline gap-4 mb-2">
          <h3 class="text-lg md:text-xl font-black tracking-tight text-text-primary">
            Also shipped
          </h3>
          <span class="flex-1 h-px bg-white/8" />
          <span class="font-mono text-[10px] tracking-[0.18em] text-text-tertiary">
            {{ String(secondaryProjects.length).padStart(2, '0') }}
          </span>
        </div>

        <ul ref="secondaryListEl" class="secondary-list">
          <li v-for="item in secondaryProjects" :key="item.title" class="sitem">
            <component
              :is="item.href ? 'a' : (item.videoId ? 'button' : 'div')"
              v-bind="item.href ? { href: item.href, target: '_blank', rel: 'noopener' } : {}"
              class="sitem-inner"
              :class="{ 'sitem-inner--static': !item.href && !item.videoId }"
              @click="item.videoId ? openVideoById(item.videoId, item.title) : undefined"
            >
              <span class="sitem-title">{{ item.title }}</span>
              <span class="sitem-blurb">{{ item.blurb }}</span>
              <span class="sitem-stack">{{ item.stack }}</span>
              <span class="sitem-year">{{ item.year }}</span>
              <span class="sitem-marker" aria-hidden="true">
                <svg v-if="item.videoId" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg v-else-if="item.href" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </component>
          </li>
        </ul>

        <div class="mt-12">
          <a
            href="https://mostaql.com/u/lectara/portfolio"
            target="_blank"
            rel="noopener"
            class="btn-ghost inline-flex"
          >
            Freelance profile
            <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </a>
        </div>
      </div>

      <VideoModal v-model="videoModalOpen" :video-id="activeVideoId" :title="activeVideoTitle" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
import type { Project, SecondaryProject } from '~/types/project'

const { revealBlur, revealFadeUp, revealStagger, STAGGER, Y, DUR } = useAnimation()

const headerEl = ref<HTMLElement | null>(null)
const secondaryHeadEl = ref<HTMLElement | null>(null)
const secondaryListEl = ref<HTMLElement | null>(null)

const videoModalOpen = ref(false)
const activeVideoId = ref('')
const activeVideoTitle = ref('')

function openVideo(project: Project) {
  if (!project.videoId) return
  activeVideoId.value = project.videoId
  activeVideoTitle.value = project.title
  videoModalOpen.value = true
}

function openVideoById(id: string, title: string) {
  activeVideoId.value = id
  activeVideoTitle.value = title
  videoModalOpen.value = true
}

/* ─────────────────────────────────────────────────────────────
   PRIMARY PROJECTS
   Every figure below is verified against PORTFOLIO-MASTER.md.
   Do not add a number here that is not backed by a commit count,
   a file count, or a package manifest.
   ───────────────────────────────────────────────────────────── */
const primaryProjects: Project[] = [
  {
    slug: 'ncmh',
    index: '01',
    title: 'NCMH Platform',
    subtitle: 'Saudi government health platform, rebuilt',
    summary:
      'A public health platform serving citizens and clinicians — a modernised content platform, healthcare atlas, and certificate verification system. I audited the legacy monolith, made the case to leadership for a full rebuild, then delivered it solo as an API and a single-page app.',
    spec: {
      role: 'Sole developer. Proposed the rebuild.',
      capabilities: 'Content · Atlas · Certificate verification',
      stack: 'Laravel 10 · Vue 3 · TypeScript',
      status: 'Live',
    },
    variant: 'wide',
    image: '/images/ncmh/atlas.png',
    imageBg: 'linear-gradient(135deg, #06281c 0%, #0d2033 55%, #0f0f13 100%)',
    monogram: 'NC',
    domain: 'ncmh.org.sa',
    origin: '4d',
    links: [{ href: 'https://ncmh.org.sa/', type: 'live' }],
  },
  {
    slug: '4d-careers',
    index: '02',
    title: '4D Careers',
    subtitle: 'AI-powered recruitment platform',
    summary:
      'Connects applicants, AI screening, and interviews in one place. Applicants upload a CV and the form fills itself. HR gets AI-ranked candidates, weighted scoring, and interview scheduling with calendar invites.',
    spec: {
      role: 'Sole developer, end to end',
      capabilities: 'CV auto-fill · AI ranking · Interview scheduling',
      stack: 'Next.js 16 · React 19 · PostgreSQL',
      status: 'Live',
    },
    variant: 'split',
    image: '/images/careers/ai-analysis.png',
    imageBg: 'linear-gradient(135deg, #0a1b3d 0%, #10231c 55%, #0f0f13 100%)',
    monogram: '4C',
    domain: 'career.4d.sa',
    origin: '4d',
    links: [{ href: 'https://career.4d.sa/', type: 'live' }],
  },
  {
    slug: 'client-portal',
    index: '03',
    title: '4D Dashboard',
    subtitle: 'White-label multi-tenant SaaS',
    summary:
      'One platform for multiple client companies. Each tenant gets its own dashboards, maps, and an integrated AI assistant. Onboarding a new tenant is one record in an admin panel, not a code change — each tenant brokers its own upstream API through encrypted credentials.',
    spec: {
      role: 'Full stack. External AI service not mine.',
      capabilities: 'Tenant dashboards · MapLibre · AI assistant',
      stack: 'React · Laravel · Filament · MapLibre',
      status: 'Live, login gated',
    },
    variant: 'immersive',
    image: '/images/dashboard/call-center-tv.png',
    imageBg: 'linear-gradient(120deg, #123060 0%, #0d3b2e 60%, #0f0f13 100%)',
    monogram: 'CP',
    domain: 'dashboard.4d.sa',
    origin: '4d',
    links: [{ href: 'https://dashboard.4d.sa/', type: 'live', label: 'View login' }],
  },
  {
    slug: 'tasknodebot',
    index: '04',
    title: 'TaskNodeBot',
    subtitle: 'Telegram task management for organisations',
    summary:
      'Manages team tasks inside Telegram. Three-tier roles, a reviewed task lifecycle with revision loops, cloud file attachments, and scheduled reminder and unreachable-user detection jobs.',
    spec: {
      role: 'Sole developer. Built as a product.',
      capabilities: 'Roles · Review workflow · Reminders · Exports',
      stack: 'Python · SQLAlchemy · PostgreSQL · R2',
      status: 'Source not published',
    },
    variant: 'split-reverse',
    image: '/images/tasknodebot/screenshot.png',
    imageBg: 'linear-gradient(135deg, #101c33 0%, #0d2a24 55%, #0f0f13 100%)',
    monogram: 'TN',
    domain: null,
    origin: 'freelance',
    links: [],
  },
]

/* ─────────────────────────────────────────────────────────────
   SECONDARY WORK
   One line each. No case studies, no invented metrics.
   ───────────────────────────────────────────────────────────── */
const secondaryProjects: SecondaryProject[] = [
  {
    title: '4D Employees Portal',
    blurb: 'HR hub with a Microsoft Teams tab, silent SSO and a native bot on existing infrastructure',
    stack: 'Laravel · MS Teams · MySQL',
    year: '2026',
    href: 'https://employees-portal.4d.sa/login',
  },
  {
    title: 'FatoorahBot',
    blurb: 'Invoice photos become structured, editable data with line-item correction and Excel export',
    stack: 'Python · aiogram · Gemini',
    year: '2026',
    videoId: 'o6PM1_FsaN0',
  },
  {
    title: 'OrgManager',
    blurb: 'Three-role employee management system with onboarding flows and PDF reporting',
    stack: 'Vue 3 · TypeScript · Frappe',
    year: '2025',
    videoId: 'mjsfGUEgGUc',
  },
  {
    title: 'Bareeq',
    blurb: 'Handmade art storefront with cash-on-delivery checkout and an inventory dashboard',
    stack: 'Flask · MySQL',
    year: '2024',
    videoId: 'ijH0xg44d-g',
  },
  {
    title: 'Polluscan',
    blurb: 'Graduation project — pollution monitoring with a five-level government role hierarchy and a hardware sensor prototype',
    stack: 'Flask · MySQL · Chart.js',
    year: '2024',
    videoId: 'bIxIA4zmvHs',
  },
]

onMounted(() => {
  revealBlur(headerEl.value)
  revealFadeUp(secondaryHeadEl.value)
  if (secondaryListEl.value) {
    revealStagger(secondaryListEl.value.querySelectorAll('.sitem'), {
      stagger: STAGGER.sm,
      y: Y.sm,
      duration: DUR.sm,
    })
  }
})
</script>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   SECONDARY LIST
   A divided list, not cards. Hairline between rows only.
   ───────────────────────────────────────────────────────────── */
.secondary-list {
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.sitem {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sitem-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.35rem;
  width: 100%;
  padding: 1.15rem 0;
  text-align: left;
  text-decoration: none;
  background: none;
  border: none;
  transition: padding 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.sitem-inner:not(.sitem-inner--static):hover {
  padding-left: 0.6rem;
}

.sitem-title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  transition: color 0.3s ease;
}
.sitem-inner:not(.sitem-inner--static):hover .sitem-title {
  color: #34D399;
}

.sitem-blurb {
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(229, 231, 235, 0.5);
  max-width: 62ch;
}

.sitem-stack,
.sitem-year {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-tertiary, #5b6575);
}

.sitem-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--text-tertiary, #5b6575);
  opacity: 0;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.sitem-inner:hover .sitem-marker,
.sitem-inner:focus-visible .sitem-marker {
  opacity: 1;
  color: #34D399;
}
@media (hover: none) {
  .sitem-marker {
    opacity: 1;
  }
}

/* Desktop: one scannable line per item. */
@media (min-width: 768px) {
  .sitem-inner {
    grid-template-columns: minmax(0, 15rem) minmax(0, 1fr) minmax(0, 11rem) 3.5rem 24px;
    align-items: center;
    gap: 1.5rem;
    padding: 1.35rem 0;
  }
  .sitem-year {
    text-align: right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sitem-inner,
  .sitem-title,
  .sitem-marker {
    transition: none;
  }
  .sitem-inner:not(.sitem-inner--static):hover {
    padding-left: 0;
  }
  .sitem-marker {
    opacity: 1;
  }
}
</style>
