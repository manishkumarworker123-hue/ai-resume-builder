/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#b9d7fe',
          300: '#7cb7fd',
          400: '#3691fc',
          500: '#0c70f2',
          600: '#0052d6',
          700: '#0041ae',
          800: '#05378d',
          900: '#0a3071',
          950: '#071d47',
        },
        slate: {
          850: '#141e33',
          950: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 25px -5px rgba(12, 112, 242, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(147, 51, 234, 0.4)',
        'premium': '0 20px 40px -15px rgba(0,0,0,0.07), 0 0 10px rgba(0,0,0,0.03)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(12, 112, 242, 0.15) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
