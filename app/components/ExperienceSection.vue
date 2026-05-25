<template>
  <section id="experience" class="py-20 md:py-28 border-t border-white/5">
    <div class="section-container">
      <div ref="sectionHeader" class="mb-12 md:mb-16">
        <p class="section-tag">Journey</p>
        <h2 class="section-title">Experience<br /><span class="text-text-secondary font-normal">& Education.</span></h2>
      </div>

      <div ref="timelineEl" class="relative md:pl-12">
        <div class="timeline-line hidden md:block" />

        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="timeline-item-wrap relative mb-12 last:mb-0"
        >
          <div class="absolute -left-8 md:-left-12 top-1 w-3 h-3 -translate-x-1/2 rounded-full border-2 hidden md:flex items-center justify-center" :class="item.current ? 'border-accent-blue bg-accent-blue/20' : 'border-white/20 bg-bg-primary'">
            <span v-if="item.current" class="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          </div>

          <div class="bg-surface/60 border border-white/5 rounded-[4px] p-6 hover:border-white/10 transition-colors">
            <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 class="text-text-primary font-bold text-lg leading-tight">{{ item.role }}</h3>
                <p class="text-accent-blue text-sm mt-0.5">
                  <a v-if="item.companyHref" :href="item.companyHref" target="_blank" rel="noopener" class="hover:text-accent-blue/80 transition-colors cursor-none">{{ item.company }}</a>
                  <span v-else>{{ item.company }}</span>
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-text-secondary text-xs font-mono">{{ item.period }}</span>
                <span v-if="item.current" class="text-xs px-2 py-0.5 bg-accent-blue/10 text-accent-blue border border-accent-blue/20 rounded-sm">Current</span>
              </div>
            </div>

            <ul class="space-y-2">
              <li v-for="point in item.points" :key="point" class="flex items-start gap-2 text-text-secondary text-sm">
                <span class="text-accent-green mt-1 flex-shrink-0 text-xs">›</span>
                <span>{{ point }}</span>
              </li>
            </ul>

            <div v-if="item.tech" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              <span v-for="t in item.tech" :key="t" class="tech-badge">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <div ref="educationEl" class="mt-16 p-6 bg-surface/40 border border-white/5 rounded-[4px]">
        <p class="text-text-secondary text-xs uppercase tracking-widest mb-4">Education</p>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 class="text-text-primary font-bold">Bachelor of Computer Science</h3>
            <p class="text-text-secondary text-sm">Faculty of Computers and Information, Suez University</p>
          </div>
          <span class="text-text-secondary text-sm font-mono">2020 – 2024</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="tech-badge">Cisco Cybersecurity</span>
          <span class="tech-badge">Python Data Structures</span>
          <span class="tech-badge">Web Development Challenger</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAnimation } from '~/composables/useAnimation'
const { revealBlur, revealFadeUp, revealStagger, STAGGER, Y, DUR } = useAnimation()

const sectionHeader = ref<HTMLElement | null>(null)
const timelineEl    = ref<HTMLElement | null>(null)
const educationEl   = ref<HTMLElement | null>(null)

onMounted(() => {
  revealBlur(sectionHeader.value)
  if (timelineEl.value) {
    const items = timelineEl.value.querySelectorAll('.timeline-item-wrap')
    // Timeline items are big — use STAGGER.lg for a more measured cadence
    revealStagger(items, { stagger: STAGGER.lg, y: Y.md, duration: DUR.md })
  }
  revealFadeUp(educationEl.value, { y: Y.sm, duration: DUR.sm })
})

const timeline = [
  {
    role: 'Full Stack Developer (Remote)',
    company: '4D — Saudi Arabia',
    companyHref: 'https://4d.sa/',
    period: 'Feb 2026 – Present',
    current: true,
    points: [
      'Developed AI-powered dashboard from scratch with interactive charts and analytics using React, PHP, and Python.',
      'Enhanced performance and UI/UX for NCMH.org.sa and employees portal.',
      'Integrated AI agents and CV analyzers with API management, database migrations (PostgreSQL & MySQL).',
    ],
    tech: ['React', 'PHP', 'Python', 'PostgreSQL', 'MySQL', 'Material-UI'],
  },
  {
    role: 'Teaching Assistant (Data Science & SQL)',
    company: 'Ain Shams Academy',
    companyHref: null,
    period: 'Dec 2025 – Mar 2026',
    current: false,
    points: [
      'Teaching SQL database design and management to 20+ students.',
      'Assisted in Data Science modules — 85% average student satisfaction.',
      'Led 8 hands-on sessions on hardware troubleshooting and system diagnostics.',
    ],
    tech: ['SQL', 'Data Science', 'Python'],
  },
  {
    role: 'IT Branch Lead & Full Stack Developer',
    company: 'Egyptian Armed Forces',
    companyHref: null,
    period: 'Oct 2024 – Dec 2025',
    current: false,
    points: [
      'Directed IT operations and supervised a 5-person technical team managing 3 major projects.',
      'Engineered a centralized VVIP Logistics System — reduced admin processing time by 75%.',
      'Implemented 3-tier RBAC and WebSockets for real-time sync across 6 government entities.',
    ],
    tech: ['Django', 'React.js', 'WebSockets', 'PostgreSQL', 'RBAC'],
  },
  {
    role: 'Course Instructor (Python & OOP)',
    company: 'Oraby Academy',
    companyHref: null,
    period: 'Aug 2023 – Sep 2024',
    current: false,
    points: [
      'Designed and delivered 5 structured curricula for Python and OOP across 6-7 student groups.',
      'Achieved 90% course completion rate through engaging teaching methods.',
      'Created hands-on coding exercises and end-of-course projects.',
    ],
    tech: ['Python', 'OOP', 'Teaching'],
  },
]
</script>
