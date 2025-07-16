import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: '#fff0ce',
        blue: '#087392',
        dark: '#383838',
        turquoise: '#83b4b3',
        red: '#d55534',
      },
      fontFamily: {
        vintage: ['"Cinzel"', 'serif'],
        cozy: ['"Quicksand"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0, 0, 0, 0.1)',
        accent: '0 4px 6px rgba(255, 240, 206, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
