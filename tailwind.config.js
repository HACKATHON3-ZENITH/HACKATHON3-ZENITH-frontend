/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#0D5C4D', // Jungle Green
            hover: '#14876E',
            light: '#DCFCE7',
          },
          secondary: {
            DEFAULT: '#C49A28', // African Gold
            light: '#FEF3C7',
          },
        },
        gray: {
          100: '#F6F8FA',
          200: '#D0D7DE',
          600: '#57606A',
          900: '#1F2328',
        },
        success: '#1A7F37',
        error: '#CF222E',
        warning: '#9A6700',
        info: '#0969DA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      borderRadius: {
        'button': '4px',
        'input': '4px',
        'card': '8px',
        'pill': '9999px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '480px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}
