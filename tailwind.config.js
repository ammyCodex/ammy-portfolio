/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#0A0A0A',
        'terminal-accent': '#880808',
        'terminal-text': '#FFF9E5',
        'lanyard-bg': '#1B3C53',
      },
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'typewriter': 'typewriter 2s steps(40) 1s forwards',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}