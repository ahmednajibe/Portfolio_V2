<template>
  <section id="projects" class="py-20 md:py-28 border-t border-white/5">
    <div class="section-container">

      <!-- Header -->
      <div ref="headerEl" class="mb-10 md:mb-12">
        <p class="section-tag">Selected Work</p>
        <h2 class="section-title">Projects that<br /><span class="text-text-secondary font-normal">made an impact.</span></h2>
      </div>

      <!-- Controls: Search + Filter -->
      <div ref="controlsEl" class="mb-8 space-y-4">

        <!-- Search -->
        <div class="search-wrap">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchQuery"
            class="search-input"
            placeholder="Search by title or technology..."
            type="text"
          />
          <button v-if="searchQuery" class="search-clear cursor-none" @click="searchQuery = ''">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Tech filter chips -->
        <div class="filter-row">
          <button
            v-for="tech in allTechs"
            :key="tech"
            class="filter-chip cursor-none"
            :class="{ active: activeFilter === tech }"
            @click="activeFilter = tech"
          >{{ tech }}</button>
        </div>
      </div>

      <!-- Grid -->
      <div ref="cardsEl" class="projects-grid">
        <TransitionGroup name="card">
          <div
            v-for="project in filteredProjects"
            :key="project.title"
            class="pcard group"
          >
            <!-- Image -->
            <div class="pcard-img" :style="{ background: project.imageBg }">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-6xl opacity-8">{{ project.icon }}</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0c1120]/80 via-transparent to-transparent pointer-events-none" />

              <!-- Badge -->
              <div v-if="project.badge" class="absolute top-3 left-3">
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-sm" :class="project.badgeClass">{{ project.badge }}</span>
              </div>

              <!-- Tech pills overlay -->
              <div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                <span
                  v-for="(tech, i) in project.tech.slice(0, 2)"
                  :key="tech"
                  class="tech-pill"
                >{{ tech }}</span>
                <span v-if="project.tech.length > 2" class="tech-pill tech-pill-more">+{{ project.tech.length - 2 }}</span>
              </div>

              <!-- Video play button -->
              <button
                v-if="project.videoId"
                class="play-btn cursor-none"
                @click="openVideo(project)"
              >
                <svg class="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="pcard-body">
              <!-- Title row -->
              <div class="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 class="text-text-primary font-black text-base tracking-tight leading-tight">{{ project.title }}</h3>
                  <p class="text-accent-blue text-xs mt-0.5">{{ project.subtitle }}</p>
                </div>
                <div class="flex gap-1.5 flex-shrink-0">
                  <template v-for="link in project.links" :key="link.href ?? link.type">
                    <a
                      v-if="link.type !== 'youtube'"
                      :href="link.href"
                      target="_blank" rel="noopener"
                      class="w-7 h-7 rounded-sm border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/30 transition-all cursor-none"
                    >
                      <svg v-if="link.type === 'star'" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  </template>
                  <span v-if="project.date" class="text-[10px] text-text-secondary/60 self-center ml-1">{{ project.date }}</span>
                </div>
              </div>

              <!-- Case Study -->
              <div class="cs-block mb-3">
                <div class="cs-row"><span class="cs-label cs-problem">Problem</span><span class="cs-text">{{ project.caseStudy.problem }}</span></div>
                <div class="cs-row"><span class="cs-label cs-solution">Solution</span><span class="cs-text">{{ project.caseStudy.solution }}</span></div>
                <div class="cs-row"><span class="cs-label cs-impact">Impact</span><span class="cs-text">{{ project.caseStudy.impact }}</span></div>
              </div>

              <!-- Awards -->
              <div v-if="project.awards" class="flex flex-wrap gap-1.5 mb-3">
                <span v-for="a in project.awards" :key="a.label" class="text-[10px] px-1.5 py-0.5 rounded-sm font-medium" :class="a.class">{{ a.label }}</span>
              </div>

              <!-- Testimonial -->
              <div v-if="project.testimonial" class="border-l-2 border-accent-blue/25 pl-2.5 mt-auto">
                <p class="text-text-secondary text-[11px] italic leading-relaxed line-clamp-2">"{{ project.testimonial.text }}"</p>
                <p class="text-accent-blue text-[10px] mt-0.5">— {{ project.testimonial.author }}</p>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-if="filteredProjects.length === 0" class="col-span-full py-20 text-center">
          <p class="text-text-secondary text-sm">No projects match "{{ searchQuery }}"</p>
          <button class="mt-4 text-accent-blue text-xs underline cursor-none" @click="searchQuery = ''; activeFilter = 'All'">Clear filters</button>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mt-12 text-center">
        <a href="https://mostaql.com/u/lectara/portfolio" target="_blank" rel="noopener" class="btn-ghost inline-flex">
          More on Mostaql
          <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>

      <VideoModal v-model="videoModalOpen" :video-id="activeVideoId" :title="activeVideoTitle" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
const { revealBlur, revealFadeUp, revealStagger, STAGGER, Y, DUR } = useAnimation()

const headerEl        = ref<HTMLElement | null>(null)
const cardsEl         = ref<HTMLElement | null>(null)
const controlsEl      = ref<HTMLElement | null>(null)
const videoModalOpen  = ref(false)
const activeVideoId   = ref('')
const activeVideoTitle = ref('')
const searchQuery     = ref('')
const activeFilter    = ref('All')

const allTechs = computed(() => {
  const set = new Set<string>(['All'])
  projects.forEach(p => p.tech.forEach(t => set.add(t)))
  return [...set]
})

const filteredProjects = computed(() => {
  return projects.filter(p => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.tech.some(t => t.toLowerCase().includes(q))
    const matchesFilter = activeFilter.value === 'All' || p.tech.includes(activeFilter.value)
    return matchesSearch && matchesFilter
  })
})

function openVideo(project: { title: string; videoId?: string }) {
  if (!project.videoId) return
  activeVideoId.value    = project.videoId
  activeVideoTitle.value = project.title
  videoModalOpen.value   = true
}

const projects = [
  {
    title: 'FatoorahBot',
    subtitle: 'AI-Powered Invoice Management Bot',
    icon: '🤖',
    image: '/images/telegram%20bot/fatoorahbot_cover_1768157167373.png',
    imageBg: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
    badge: 'Freelance · 5.0 ★',
    badgeClass: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20',
    caseStudy: {
      problem : 'Arabic SMB owners tracked invoices manually — slow, error-prone, no structure.',
      solution: 'Telegram bot using Google Gemini AI to OCR invoice photos, detect duplicates, and export to Excel.',
      impact  : 'Zero manual data entry · invoice processed in under 10 seconds · 5.0 ★ client satisfaction.',
    },
    tech: ['Python', 'aiogram 3', 'Google Gemini AI', 'SQLite'],
    date: 'Jan 2026',
    videoId: 'o6PM1_FsaN0',
    links: [
      { href: 'https://www.youtube.com/shorts/o6PM1_FsaN0', type: 'youtube' },
      { href: 'https://mostaql.com/u/lectara/reviews/9471579', type: 'star' },
    ],
    testimonial: {
      text: 'Very professional, patient with changes, always seeks client satisfaction, fast response and delivery.',
      author: 'Abdullah A.'
    },
    awards: null,
  },
  {
    title: 'Polluscan',
    subtitle: 'Smart National Air Quality System',
    icon: '🌍',
    image: '/images/polluscan/Screenshot%202026-01-01%20021037.png',
    imageBg: 'linear-gradient(135deg, #050816 0%, #0d1f35 100%)',
    badge: '🏆 National Finalist',
    badgeClass: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
    caseStudy: {
      problem : 'Industrial emissions monitored via paper-based, fragmented, non-real-time reporting.',
      solution: 'National platform with 5-tier RBAC, automated penalty engine, and live sensor dashboards.',
      impact  : 'Egypt National Startup Finalist · 847 active sensors · compliance engine running in production.',
    },
    tech: ['Flask', 'MySQL', 'JavaScript', 'Real-time Charts'],
    date: 'Jun 2024',
    videoId: 'bIxIA4zmvHs',
    links: [
      { href: 'https://www.youtube.com/watch?v=bIxIA4zmvHs', type: 'youtube' },
    ],
    testimonial: null,
    awards: [
      { label: '🥇 Egypt National Startup Finals', class: 'bg-yellow-500/10 text-yellow-400' },
      { label: '🥈 Zagazig University Finalist', class: 'bg-gray-400/10 text-gray-300' },
    ],
  },
  {
    title: 'Bareeq',
    subtitle: 'Handmade Art E-Commerce Platform',
    icon: '🎨',
    image: '/images/bareeq/Screenshot%202026-01-01%20015711.png',
    imageBg: 'linear-gradient(135deg, #111827 0%, #1a0f1f 100%)',
    badge: 'Freelance',
    badgeClass: 'bg-white/5 text-text-secondary border border-white/10',
    caseStudy: {
      problem : 'Handmade art sellers had no digital storefront, taking orders via WhatsApp with no tracking.',
      solution: 'Full B2C store with 3 product categories, COD checkout, and admin inventory dashboard.',
      impact  : 'Replaced WhatsApp orders entirely · live within 3 weeks · admin manages stock in real time.',
    },
    tech: ['Flask', 'MySQL', 'HTML/CSS/JS', 'COD Payment'],
    date: 'May 2024',
    videoId: 'ijH0xg44d-g',
    links: [
      { href: 'https://youtu.be/ijH0xg44d-g', type: 'youtube' },
    ],
    testimonial: null,
    awards: null,
  },
  {
    title: 'OrgManager',
    subtitle: 'Employee Management System',
    icon: '🏢',
    image: '/images/employee%20mng/Screenshot%202025-12-31%20224443.png',
    imageBg: 'linear-gradient(135deg, #0a1628 0%, #111827 100%)',
    badge: 'Freelance',
    badgeClass: 'bg-white/5 text-text-secondary border border-white/10',
    caseStudy: {
      problem : 'HR processes managed through spreadsheets — no role visibility, audit trail, or reporting.',
      solution: '3-role system (Admin/Supervisor/Employee) with onboarding flows, analytics, and PDF exports.',
      impact  : 'Replaced 4 manual Excel workflows · real-time validation · PDF reports auto-generated.',
    },
    tech: ['Vue.js 3', 'TypeScript', 'Frappe', 'MariaDB'],
    date: 'Dec 2025',
    videoId: 'mjsfGUEgGUc',
    links: [
      { href: 'https://www.youtube.com/watch?v=mjsfGUEgGUc', type: 'youtube' },
    ],
    testimonial: null,
    awards: null,
  },
  {
    title: 'VVIP Logistics System',
    subtitle: 'Government Enterprise Platform',
    icon: '🔒',
    image: null,
    imageBg: 'linear-gradient(135deg, #050816 0%, #0f1a2e 100%)',
    badge: 'Confidential',
    badgeClass: 'bg-red-500/10 text-red-400 border border-red-500/20',
    caseStudy: {
      problem : 'Government logistics coordinated via manual Word/Excel across 6 independent entities.',
      solution: 'Centralized WebSocket platform with real-time sync and 3-tier role-based access control.',
      impact  : '75% reduction in processing time · 6 entities unified · zero manual document handoffs.',
    },
    tech: ['Django', 'React.js', 'WebSockets', 'RBAC'],
    date: null,
    videoId: undefined,
    links: [],
    testimonial: null,
    awards: null,
  },
]

onMounted(() => {
  revealBlur(headerEl.value)
  revealFadeUp(controlsEl.value, { delay: 0.15 })
  if (cardsEl.value) {
    const cards = cardsEl.value.querySelectorAll('.pcard')
    revealStagger(cards, { stagger: STAGGER.md, y: Y.md, duration: DUR.md })
  }
})
</script>

<style scoped>
/* ── Grid ── */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 640px)  { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }

/* ── Card ── */
.pcard {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s ease,
              transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1),
              box-shadow 0.3s ease;
  will-change: transform;
}
.pcard:hover {
  border-color: rgba(255,255,255,0.16);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(125,211,252,0.06);
}

.pcard-img {
  position: relative;
  height: 210px;
  overflow: hidden;
  flex-shrink: 0;
}

.pcard-body {
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* ── Play button ── */
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(125, 211, 252, 0.15);
  border: 1px solid rgba(125, 211, 252, 0.35);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7DD3FC;
  transition: transform 0.3s cubic-bezier(0.34, 1.5, 0.64, 1), background 0.2s ease;
  z-index: 10;
}
.pcard:hover .play-btn { transform: translate(-50%, -50%) scale(1); }
.play-btn:hover { background: rgba(125, 211, 252, 0.25); }

/* ── Tech pills on image ── */
.tech-pill {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.85);
  white-space: nowrap;
}
.tech-pill-more {
  background: rgba(125, 211, 252, 0.15);
  border-color: rgba(125, 211, 252, 0.3);
  color: #7DD3FC;
}

/* ── Search ── */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 0 1rem;
  transition: border-color 0.2s ease;
  max-width: 520px;
}
.search-wrap:focus-within {
  border-color: rgba(125, 211, 252, 0.3);
}
.search-icon {
  width: 15px;
  height: 15px;
  color: rgba(255,255,255,0.3);
  flex-shrink: 0;
  margin-right: 0.6rem;
}
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.82rem;
  padding: 0.65rem 0;
  font-family: inherit;
}
.search-input::placeholder { color: rgba(255,255,255,0.25); }
.search-clear {
  color: rgba(255,255,255,0.3);
  padding: 4px;
  transition: color 0.2s ease;
}
.search-clear:hover { color: rgba(255,255,255,0.7); }

/* ── Filter chips ── */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.filter-chip {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.3rem 0.8rem;
  border-radius: 2px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.4);
  transition: all 0.18s ease;
}
.filter-chip:hover {
  border-color: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.75);
}
.filter-chip.active {
  border-color: rgba(125, 211, 252, 0.4);
  background: rgba(125, 211, 252, 0.08);
  color: #7DD3FC;
}

/* ── Card Transition ── */
.card-enter-active, .card-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.card-enter-from, .card-leave-to { opacity: 0; transform: scale(0.96); }

/* ── Case Study ── */
.cs-block {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 3px;
  overflow: hidden;
}

.cs-row {
  display: grid;
  grid-template-columns: 68px 1fr;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-left: 2px solid transparent;
  transition: background 0.2s ease;
}
.cs-row:hover { background: rgba(255,255,255,0.02); }

.cs-row:not(:last-child) {
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

.cs-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: ui-monospace, monospace;
  flex-shrink: 0;
  padding-top: 1px;
}

.cs-problem  { color: #f87171; }
.cs-solution { color: #7DD3FC; }
.cs-impact   { color: #34D399; }

.cs-row:has(.cs-problem)  { border-left-color: rgba(248, 113, 113, 0.3); }
.cs-row:has(.cs-solution) { border-left-color: rgba(125, 211, 252, 0.3); }
.cs-row:has(.cs-impact)   { border-left-color: rgba(52,  211, 153, 0.3); }

.cs-text {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;
}
</style>
