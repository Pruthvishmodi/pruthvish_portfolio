import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': 'var(--primary-gradient)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        background2: 'hsl(var(--background2))',
        border: 'hsla(var(--border))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        ternary: {
          DEFAULT: 'hsl(var(--ternary))',
          foreground: 'hsl(var(--ternary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'var(--font-ibmPlexSans)', 'sans-serif'],
        merriweather: ['var(--font-merriweather)'],
        ibmPlexSans: ['var(--font-ibmPlexSans)'],
      },
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '1.2' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        heading1: [
          'clamp(1.75rem, 1.3351rem + 2.0747vw, 3rem)',
          { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        heading2: [
          'clamp(1.75rem, 1.584rem + 0.8299vw, 2.25rem)',
          { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        heading3: [
          'clamp(1.25rem, 1.084rem + 0.8299vw, 1.75rem)',
          { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        heading4: [
          'clamp(1rem, 0.917rem + 0.4149vw, 1.25rem)',
          { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
      },
    },
  },
}

export default config
