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
      title: 'Ahmed Najiebe - Full-Stack Engineer',
      meta: [
        { name: 'description', content: 'Full-stack engineer building production systems for government and enterprise clients. Laravel, Vue, Next.js, Django.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
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
