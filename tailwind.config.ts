import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        blush: '#fff1f5',
        rosebud: '#e98eaa',
        berry: '#8f405f',
        inkrose: '#60374a',
      },
      boxShadow: {
        soft: '0 18px 55px rgba(157, 78, 109, .12)',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
