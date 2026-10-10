import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F6FA',
          100: '#EAEBF4',
          200: '#D5D7E9',
          300: '#B2B6D6',
          400: '#898FBE',
          500: '#656BA6',
          600: '#4D538E',
          700: '#3A3F71',
          800: '#2A2E55',
          900: '#14172C', // Deep refined ink navy
          950: '#0B0C18',
        },
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Purposeful warm coral
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        surface: {
          light: '#FBFBFA', // Warm linen off-white
          card: '#FFFFFF',
          dark: '#111114',
          darkCard: '#18181D',
          border: '#E8E8E6',
          darkBorder: '#292930'
        }
      },
      borderRadius: {
        'card': '16px',
        'button': '10px',
        'input': '12px',
        'badge': '9999px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.025em',
        'display': '-0.035em',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 6px 16px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 16px 28px -4px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.07), 0 2px 6px -2px rgba(0, 0, 0, 0.03)',
        'modal': '0 25px 60px -15px rgba(0, 0, 0, 0.18)',
        'nav': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};
export default config;
