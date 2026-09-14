// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  image: {
    quality: 85,
    format: ['webp'],
  },

  app: {
    head: {
      title: 'Ahmed Najiebe — Full-Stack Engineer | Laravel, Vue, React, Python',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'Ahmed Najiebe is a full-stack engineer building production platforms for government, enterprise, and freelance clients. Laravel, Vue 3, React, Next.js, Python, Django. Based in Cairo, working remotely for Saudi Arabian clients. Shipped NCMH (government health platform), 4D Careers (AI recruitment), 4D Dashboard (multi-tenant SaaS), and TaskNodeBot (Telegram task management).',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Ahmed Najiebe' },
        { name: 'keywords', content: 'Ahmed Najiebe, full-stack engineer, Laravel developer, Vue developer, React developer, Python Django, Next.js, TypeScript, PostgreSQL, MySQL, multi-tenant SaaS, AI integration, Telegram bot, government platform, recruitment platform, Cairo, Egypt, remote developer, Saudi Arabia' },

        // Open Graph — what shows when someone shares the link
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: 'Ahmed Najiebe — Full-Stack Engineer' },
        {
          property: 'og:description',
          content:
            'Full-stack engineer building production platforms for government and enterprise. Laravel, Vue, React, Python, Django. Shipped NCMH, 4D Careers, 4D Dashboard, TaskNodeBot.',
        },
        { property: 'og:url', content: 'https://ahmednajibe.com' },
        { property: 'og:image', content: 'https://ahmednajibe.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ahmed Najiebe — Full-Stack Engineer' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Ahmed Najiebe — Portfolio' },

        // Twitter cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ahmed Najiebe — Full-Stack Engineer' },
        {
          name: 'twitter:description',
          content:
            'Full-stack engineer building production platforms for government and enterprise. Laravel, Vue, React, Python, Django.',
        },
        { name: 'twitter:image', content: 'https://ahmednajibe.com/og-image.jpg' },

        // Let AI crawlers know this site is meant for them
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      ],
      link: [
        { rel: 'canonical', href: 'https://ahmednajibe.com' },
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap'
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=JetBrains+Mono:wght@400;500;700&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    exposeConfig: true,
  },

  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger'],
    },
  },
})
