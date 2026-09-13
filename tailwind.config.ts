import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.vue',
    './app/layouts/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        // Mono carries all metadata, metrics and spec blocks.
        // This is the "engineer" signal in the type system.
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'bg-primary': '#060608',
        'bg-secondary': '#0e0e12',
        'surface': '#0f0f13',
        'surface-raised': '#16161c',
        'text-primary': '#E5E7EB',
        'text-secondary': '#94A3B8',
        'text-tertiary': '#5b6575',

        // SINGLE ACCENT. Differentiation comes from opacity and weight, not hue.
        'accent': '#34D399',

        // Deprecated aliases, both resolve to the single accent so the colour
        // lock applies everywhere without touching 86 call sites.
        // Prefer `accent` in new markup.
        'accent-blue': '#34D399',
        'accent-green': '#34D399',
      },
      borderRadius: {
        // Locked shape scale: containers 4px, interactive pills only.
        'container': '4px',
        'inner': '3px',
      },
      transitionTimingFunction: {
        'entrance': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'exit': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(2%, -2%)' },
          '50%': { transform: 'translate(-3%, 1%)' },
          '60%': { transform: 'translate(1%, -4%)' },
          '70%': { transform: 'translate(-2%, 3%)' },
          '80%': { transform: 'translate(3%, -1%)' },
          '90%': { transform: 'translate(-1%, 2%)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
