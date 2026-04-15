/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#070b14',
        'terminal-panel': '#0c1222',
        'terminal-accent': '#22d3ee',
        'terminal-accent-dim': '#67e8f9',
        'terminal-magenta': '#e879f9',
        'terminal-text': '#e2e8f0',
        'terminal-muted': '#94a3b8',
        'lanyard-bg': '#0f172a',
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