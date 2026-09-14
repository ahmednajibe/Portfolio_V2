<template>
  <div>
    <!--
      SEO / AI-crawler fallback.
      The portfolio uses an intro loader and panel-based navigation, which
      means a crawler that doesn't execute JS sees an empty page. This
      noscript block gives every AI crawler and search engine the full
      text content — who Ahmed is, what he built, and how to reach him.
    -->
    <noscript>
      <div style="padding:2rem;max-width:800px;margin:0 auto;font-family:system-ui,sans-serif;color:#e5e7eb;background:#060608;">
        <h1>Ahmed Najiebe — Full-Stack Engineer</h1>
        <p>Full-stack engineer building production platforms for government, enterprise, and freelance clients. Specializes in Laravel, Vue/React, Python/Django, and real-time systems. Based in Cairo, Egypt, working remotely for Saudi Arabian clients.</p>

        <h2>Selected Projects</h2>
        <h3>NCMH Platform — ncmh.org.sa</h3>
        <p>Saudi government public health platform. Modernized content platform, healthcare atlas with interactive maps, and certificate verification system. Rebuilt solo from legacy monolith to Laravel API + Vue 3 SPA. 68 views, 62 models, 90+ API endpoints. Live at ncmh.org.sa.</p>

        <h3>4D Careers — career.4d.sa</h3>
        <p>AI-powered recruitment platform. Applicants upload a CV and the form auto-fills via OpenAI parsing. HR gets AI-ranked candidates with weighted scoring across 6 criteria, and interview scheduling with calendar invites. Built solo end-to-end with Next.js, React, PostgreSQL. Live at career.4d.sa.</p>

        <h3>4D Dashboard — dashboard.4d.sa</h3>
        <p>White-label multi-tenant SaaS for multiple client companies. Each tenant gets its own dashboards, maps (MapLibre), and an integrated AI assistant. Onboarding a new tenant is one admin record, not a code change. Built with React, Laravel, Filament. Live at dashboard.4d.sa.</p>

        <h3>TaskNodeBot</h3>
        <p>Telegram bot for team task management. Three-tier roles, reviewed task lifecycle with revision loops, cloud file attachments, scheduled reminders, and unreachable-user detection. Built solo as a product with Python, SQLAlchemy, PostgreSQL, Cloudflare R2.</p>

        <h2>Also Shipped</h2>
        <ul>
          <li><strong>4D Employees Portal</strong> — HR hub with Microsoft Teams integration, silent SSO, and a native bot. Laravel + MS Teams + MySQL.</li>
          <li><strong>FatoorahBot</strong> — Invoice photo to structured editable data with line-item correction and Excel export. Python + aiogram + Gemini.</li>
          <li><strong>OrgManager</strong> — Three-role employee management with onboarding flows and PDF reporting. Vue 3 + TypeScript + Frappe.</li>
          <li><strong>Bareeq</strong> — Handmade art storefront with cash-on-delivery checkout and inventory dashboard. Flask + MySQL.</li>
          <li><strong>Polluscan</strong> — Graduation project. Pollution monitoring platform with a five-level government role hierarchy and a hardware sensor prototype. Flask + MySQL + Chart.js.</li>
        </ul>

        <h2>Case Study: Debugging a 500 With No Logs</h2>
        <p>A single page of the NCMH healthcare-facilities Atlas returned HTTP 500 in production with nothing in any log — not Laravel, not PHP, not Apache. HEAD returned 200 while GET returned 500, and the same query ran clean under artisan tinker, which ruled out the application. I bisected the JSON response field by field over HTTP until one field flipped the status. Root cause: a network-level WAF appliance in front of the server inspects response bodies, and one facility record held a sixteen-digit licence number that satisfied the Luhn checksum — so the appliance's credit-card DLP signature concluded the API was leaking a payment card and substituted its own block page. Fixed by removing the field from public API responses, where it never belonged, and documented the proper long-term remedy (a targeted WAF signature exemption) in the repository's engineering notes. Demonstrates production debugging, infrastructure reasoning, security judgment, and documentation discipline.</p>

        <h2>Experience</h2>
        <ul>
          <li><strong>Full Stack Developer, 4D (Saudi Arabia)</strong> — Feb 2026 to present. Building AI-powered dashboards, government platforms, and recruitment systems with React, PHP, Python, PostgreSQL.</li>
          <li><strong>Teaching Assistant, Ain Shams Academy</strong> — Dec 2025 to Mar 2026. Taught SQL database design and Data Science to 20+ students.</li>
          <li><strong>IT Branch Lead, Egyptian Armed Forces</strong> — Oct 2024 to Dec 2025. Military service leading a 5-person technical team, managing 3 internal projects with Django and React.</li>
          <li><strong>Course Instructor, Oraby Academy</strong> — Aug 2023 to Sep 2024. Taught Python and OOP to 6-7 student groups.</li>
        </ul>

        <h2>Skills</h2>
        <p>Laravel, Vue.js, React, Next.js, Nuxt, TypeScript, Python, Django, PostgreSQL, MySQL, Tailwind CSS, REST API design, multi-tenant SaaS architecture, RBAC, WebSockets, Telegram bot development, AI integration, CV parsing, real-time systems.</p>

        <h2>Contact</h2>
        <p>Email: ahmed.m.najibe@gmail.com<br/>
        GitHub: github.com/ahmednajibe<br/>
        LinkedIn: linkedin.com/in/ahmed-m-najibe<br/>
        Mostaql: mostaql.com/u/lectara<br/>
        Location: Cairo, Egypt (UTC+03:00) — working remotely</p>
      </div>
    </noscript>

    <IntroLoader @done="onLoaderDone" />

    <template v-if="loaderDone">
      <!-- Hero panel -->
      <div data-panel="hero" class="page-panel">
        <HeroSection :loaderDone="loaderDone" />
      </div>

      <!-- About panel -->
      <div data-panel="about" class="page-panel">
        <div class="panel-inner">
          <AboutSection />
          <StatsSection />
        </div>
      </div>

      <!-- Projects panel -->
      <div data-panel="projects" class="page-panel">
        <div class="panel-inner">
          <ProjectsSection />
        </div>
      </div>

      <!-- Experience panel -->
      <div data-panel="experience" class="page-panel">
        <div class="panel-inner">
          <ExperienceSection />
        </div>
      </div>

      <!-- Stack panel -->
      <div data-panel="stack" class="page-panel">
        <div class="panel-inner">
          <TechStackSection />
        </div>
      </div>

      <!-- Case study panel -->
      <div data-panel="case-study" class="page-panel">
        <div class="panel-inner">
          <CaseStudySection />
        </div>
      </div>

      <!-- Contact panel -->
      <div data-panel="contact" class="page-panel">
        <div class="panel-inner">
          <ContactSection />
          <TheFooter />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { currentPage, PAGE_IDS } from '~/composables/usePageNav'
import HeroSection from '~/components/HeroSection.vue'

const AboutSection      = defineAsyncComponent(() => import('~/components/AboutSection.vue'))
const StatsSection      = defineAsyncComponent(() => import('~/components/StatsSection.vue'))
const ProjectsSection   = defineAsyncComponent(() => import('~/components/ProjectsSection.vue'))
const CaseStudySection  = defineAsyncComponent(() => import('~/components/CaseStudySection.vue'))
const TechStackSection  = defineAsyncComponent(() => import('~/components/TechStackSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('~/components/ExperienceSection.vue'))
const ContactSection    = defineAsyncComponent(() => import('~/components/ContactSection.vue'))
const TheFooter         = defineAsyncComponent(() => import('~/components/TheFooter.vue'))

const loaderDone = ref(false)

function onLoaderDone() {
  loaderDone.value = true
  nextTick(() => {
    // Determine which panel to show from URL hash
    const hash = window.location.hash.slice(1)
    const target = PAGE_IDS.includes(hash)
      ? hash
      : 'hero'

    currentPage.value = target

    // Hide all panels except the target
    document.querySelectorAll('[data-panel]').forEach(el => {
      const panel = el as HTMLElement
      if (panel.dataset.panel !== target) panel.style.display = 'none'
    })
  })
}

useHead({ title: 'Ahmed Najiebe — Digital Systems Engineer' })
</script>

<style scoped>
.page-panel {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  contain: layout style paint;
}

.panel-inner {
  min-height: 100vh;
  padding-bottom: 6rem;
}
</style>
