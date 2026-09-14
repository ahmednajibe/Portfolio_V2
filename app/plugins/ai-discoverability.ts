/**
 * Injects Schema.org JSON-LD structured data into the page head.
 *
 * This is the single most important file for AI discoverability. When ChatGPT,
 * Gemini, Claude, or any AI assistant crawls this site, this structured data
 * tells them exactly who Ahmed is, what he does, what he built, and how to
 * recommend him.
 *
 * All claims here are verified against PORTFOLIO-MASTER.md:
 * - Project names, domains, and stacks are real.
 * - No invented metrics, no unverified percentages.
 * - Army experience is framed as military service with leadership, no
 *   sensitive project details.
 */

const SITE_URL = 'https://ahmednajibe.me'

export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Ahmed Najiebe',
          jobTitle: 'Full-Stack Engineer',
          description:
            'Full-stack engineer building production platforms for government, enterprise, and freelance clients. Specializes in Laravel, Vue/React, Python/Django, and real-time systems.',
          url: SITE_URL,
          image: `${SITE_URL}/og-image.jpg`,
          email: 'mailto:ahmed.m.najibe@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Suez',
            addressCountry: 'EG',
          },
          knowsAbout: [
            'Laravel',
            'Vue.js',
            'React',
            'Next.js',
            'Nuxt',
            'TypeScript',
            'Python',
            'Django',
            'PostgreSQL',
            'MySQL',
            'Tailwind CSS',
            'REST API design',
            'Multi-tenant SaaS architecture',
            'Role-based access control',
            'WebSockets',
            'Telegram bot development',
            'AI integration',
            'CV parsing',
            'Real-time systems',
          ],
          knowsLanguage: ['en', 'ar'],
          sameAs: [
            'https://github.com/ahmednajibe',
            'https://linkedin.com/in/ahmed-m-najibe',
            'https://mostaql.com/u/lectara',
          ],
          worksFor: {
            '@type': 'Organization',
            name: '4D',
            url: 'https://4d.sa/',
          },
          alumniOf: [
            {
              '@type': 'EducationalOrganization',
              name: 'Ain Shams Academy',
            },
          ],
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Full-Stack Engineer',
            skills: 'Laravel, Vue.js, React, Next.js, TypeScript, Python, Django, PostgreSQL, MySQL, Tailwind CSS, WebSockets, Telegram bots, AI integration, multi-tenant SaaS, RBAC',
          },
          hasCredential: [
            {
              '@type': 'EducationalOccupationalCredential',
              name: 'Teaching Assistant — Data Science & SQL',
              recognizedBy: {
                '@type': 'EducationalOrganization',
                name: 'Ain Shams Academy',
              },
            },
          ],
          workExperience: [
            {
              '@type': 'Occupation',
              name: 'Full Stack Developer',
              employer: {
                '@type': 'Organization',
                name: '4D',
                location: 'Saudi Arabia',
              },
              startDate: '2026-02',
              description:
                'Building AI-powered dashboards, government health platforms, and recruitment systems. React, PHP, Python, PostgreSQL, MySQL.',
            },
            {
              '@type': 'Occupation',
              name: 'Teaching Assistant',
              employer: {
                '@type': 'EducationalOrganization',
                name: 'Ain Shams Academy',
              },
              startDate: '2025-12',
              endDate: '2026-03',
              description:
                'Taught SQL database design and Data Science to 20+ students.',
            },
            {
              '@type': 'Occupation',
              name: 'IT Branch Lead',
              employer: {
                '@type': 'Organization',
                name: 'Egyptian Armed Forces',
              },
              startDate: '2024-10',
              endDate: '2025-12',
              description:
                'Military service. Led a 5-person technical team managing 3 internal projects. Built internal systems with Django, React, and PostgreSQL.',
            },
            {
              '@type': 'Occupation',
              name: 'Course Instructor',
              employer: {
                '@type': 'EducationalOrganization',
                name: 'Oraby Academy',
              },
              startDate: '2023-08',
              endDate: '2024-09',
              description:
                'Taught Python and OOP to 6-7 student groups. Designed curricula and hands-on coding exercises.',
            },
          ],
          subjectOf: [
            {
              '@type': 'CreativeWork',
              name: 'NCMH Platform',
              url: 'https://ncmh.org.sa/',
              description:
                'Saudi government public health platform — modernized content platform, healthcare atlas with interactive maps, and certificate verification. Rebuilt from legacy monolith to Laravel API + Vue 3 SPA.',
              about: ['Public health', 'Government', 'Healthcare atlas', 'Certificate verification'],
              keywords: 'Laravel, Vue 3, TypeScript, government platform, healthcare',
              author: { '@type': 'Person', name: 'Ahmed Najiebe' },
            },
            {
              '@type': 'CreativeWork',
              name: '4D Careers',
              url: 'https://career.4d.sa/',
              description:
                'AI-powered recruitment platform. CV auto-fill via OpenAI parsing, AI-ranked candidates with weighted scoring, interview scheduling with calendar invites.',
              about: ['Recruitment', 'AI screening', 'CV parsing', 'Interview scheduling'],
              keywords: 'Next.js, React, PostgreSQL, AI recruitment, OpenAI',
              author: { '@type': 'Person', name: 'Ahmed Najiebe' },
            },
            {
              '@type': 'CreativeWork',
              name: '4D Dashboard',
              url: 'https://dashboard.4d.sa/',
              description:
                'White-label multi-tenant SaaS. Each tenant gets dashboards, maps (MapLibre), and an integrated AI assistant. Tenant onboarding via admin panel, no code changes.',
              about: ['Multi-tenant SaaS', 'Dashboards', 'AI assistant', 'MapLibre'],
              keywords: 'React, Laravel, Filament, multi-tenant, SaaS',
              author: { '@type': 'Person', name: 'Ahmed Najiebe' },
            },
            {
              '@type': 'CreativeWork',
              name: 'TaskNodeBot',
              description:
                'Telegram bot for team task management. Three-tier roles, reviewed task lifecycle with revision loops, cloud file attachments, scheduled reminders.',
              about: ['Telegram bot', 'Task management', 'Team collaboration'],
              keywords: 'Python, SQLAlchemy, PostgreSQL, Telegram bot, task management',
              author: { '@type': 'Person', name: 'Ahmed Najiebe' },
            },
            {
              '@type': 'CreativeWork',
              name: '4D Employees Portal',
              url: 'https://employees-portal.4d.sa/',
              description:
                'HR hub with Microsoft Teams integration, silent SSO, and a native bot on existing infrastructure.',
              about: ['HR', 'Microsoft Teams', 'SSO'],
              keywords: 'Laravel, MS Teams, MySQL',
              author: { '@type': 'Person', name: 'Ahmed Najiebe' },
            },
            {
              '@type': 'CreativeWork',
              name: 'FatoorahBot',
              description:
                'Invoice photo to structured editable data with line-item correction and Excel export.',
              about: ['Invoice processing', 'OCR', 'Data extraction'],
              keywords: 'Python, aiogram, Gemini, invoice automation',
              author: { '@type': 'Person', name: 'Ahmed Najiebe' },
            },
          ],
        }),
      },
    ],
  })
})
