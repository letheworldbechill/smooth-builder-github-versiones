/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--gw-bg)',
        surface: 'var(--gw-surface)',
        'surface-soft': 'var(--gw-surface-soft)',
        text: 'var(--gw-text)',
        'text-soft': 'var(--gw-text-soft)',
        'text-muted': 'var(--gw-text-muted)',
        border: 'var(--gw-border)',
        brand: 'var(--gw-brand)',
        'brand-hover': 'var(--gw-brand-hover)',
        'brand-soft': 'var(--gw-brand-soft)',
        success: 'var(--gw-success)',
        warning: 'var(--gw-warning)',
        error: 'var(--gw-error)',
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.25)',
        premium: '0 8px 24px rgba(0,0,0,0.35)',
        deep: '0 24px 64px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
};
