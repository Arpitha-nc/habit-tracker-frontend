export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f141a',
        surfaceLow: '#141a21',
        surfaceHigh: '#20262f',

        primary: '#81ecff',
        secondary: '#2ff801',
        tertiary: '#d277ff',

        textMain: '#f1f3fc',
        textSubtle: '#8892a0',
      },

      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },

      boxShadow: {
        glow: '0 0 25px rgba(129,236,255,0.45)',
        neon: '0 0 30px rgba(129,236,255,0.9)',
      },

      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },

      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
};
