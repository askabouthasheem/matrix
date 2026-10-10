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
          50: '#F5F4FF',
          100: '#EBE9FE',
          200: '#D7D3FE',
          300: '#B5ACFC',
          400: '#8D7BFA',
          500: '#6346F6',
          600: '#4F28ED',
          700: '#3D15D9',
          800: '#2C10B3',
          900: '#1E1B4B', // Primary Navy / Deep Indigo
          950: '#0F0C2E',
        },
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Warm Coral / Amber
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        surface: {
          light: '#FAFAF9', // Off-white warm gray
          card: '#FFFFFF',
          dark: '#121216',
          darkCard: '#1C1C24',
          border: '#E7E5E4',
          darkBorder: '#2E2E3A'
        }
      },
      borderRadius: {
        'card': '16px',
        'button': '10px',
        'input': '10px',
        'badge': '20px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 50px -10px rgba(0, 0, 0, 0.15)',
        'nav': '0 -2px 15px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
