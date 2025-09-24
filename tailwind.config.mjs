/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

const withOpacity = (variable) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(${variable}) / 1)`
    : `rgb(var(${variable}) / ${opacityValue})`

export default {
  content: [
    "./src/**/*.{astro,tsx,ts,jsx,js}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        conor: {
          primary: withOpacity('--color-conor-primary'),
          secondary: withOpacity('--color-conor-secondary'),
          accent: withOpacity('--color-conor-accent'),
          muted: withOpacity('--color-conor-muted'),
          surface: withOpacity('--color-conor-surface'),
          text: withOpacity('--color-conor-text'),
          link: withOpacity('--color-conor-link'),
        }
      },
      fontFamily: {
        heading: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        body: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
