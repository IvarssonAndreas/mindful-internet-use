module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mui-blue': {
          DEFAULT: '#111d2b',
          light: '#0b1721',
          dark: '#0a111a',
          darkest: '#070b10',
          alpha: 'rgba(10,17,26,0.60)',
        },
        'mui-gold': {
          DEFAULT: '#c59867',
          light: '#d5a577',
          dark: '#ab8551',
          darkest: '#a27c42',
          alpha: 'rgba(196,151,102,0.2)',
        },
      },
      transformOrigin: {
        'bottom-center': 'bottom center',
      },
    },
  },
  plugins: [],
  variants: {},
  corePlugins: {
    preflight: true,
  },
}
