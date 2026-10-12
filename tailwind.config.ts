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
          900: '#0F111A', // Tailored obsidian ink
          950: '#08090E',
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
          light: '#FAFAF8', // Warm bone off-white
          card: '#FFFFFF',
          dark: '#101114',
          darkCard: '#16171D',
          border: '#E8E8E5',
          darkBorder: '#282930'
        }
      },
      borderRadius: {
        'card': '18px',
        'button': '12px',
        'input': '14px',
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
        'eyebrow': '0.08em',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(15, 17, 23, 0.03), 0 1px 3px 0 rgba(15, 17, 23, 0.02)',
        'tactile': '0 1px 2px 0 rgba(15, 17, 23, 0.04), 0 2px 6px -1px rgba(15, 17, 23, 0.03)',
        'card': '0 1px 3px 0 rgba(15, 17, 23, 0.03), 0 4px 14px -2px rgba(15, 17, 23, 0.03)',
        'card-hover': '0 4px 12px -2px rgba(15, 17, 23, 0.04), 0 20px 32px -6px rgba(15, 17, 23, 0.07)',
        'premium': '0 2px 4px 0 rgba(15, 17, 23, 0.02), 0 8px 24px -4px rgba(15, 17, 23, 0.05)',
        'premium-hover': '0 4px 8px 0 rgba(15, 17, 23, 0.03), 0 18px 38px -6px rgba(15, 17, 23, 0.09)',
        'search': '0 8px 32px -4px rgba(15, 17, 23, 0.08), 0 1px 3px rgba(15, 17, 23, 0.03)',
        'button-primary': '0 1px 2px 0 rgba(0, 0, 0, 0.12), 0 4px 14px 0 rgba(0, 0, 0, 0.16)',
        'elevated': '0 12px 36px -10px rgba(15, 17, 23, 0.08), 0 2px 6px -2px rgba(15, 17, 23, 0.03)',
        'modal': '0 25px 60px -15px rgba(0, 0, 0, 0.2)',
        'nav': '0 1px 2px 0 rgba(15, 17, 23, 0.03)',
      }
    },
  },
  plugins: [],
};
export default config;
