/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // P3 Enhanced primary colors using Display P3 color space
        primary: {
          50: 'color(display-p3 0.941 0.976 1)',
          100: 'color(display-p3 0.878 0.949 0.996)',
          200: 'color(display-p3 0.729 0.902 0.992)',
          300: 'color(display-p3 0.490 0.827 0.988)',
          400: 'color(display-p3 0.220 0.741 0.973)',
          500: 'color(display-p3 0.055 0.647 0.914)',
          600: 'color(display-p3 0.008 0.518 0.780)',
          700: 'color(display-p3 0.014 0.412 0.631)',
          800: 'color(display-p3 0.027 0.349 0.522)',
          900: 'color(display-p3 0.047 0.294 0.431)',
        },
        // P3 Enhanced secondary colors with wider gamut grays
        secondary: {
          50: 'color(display-p3 0.973 0.980 0.988)',
          100: 'color(display-p3 0.945 0.957 0.973)',
          200: 'color(display-p3 0.886 0.910 0.941)',
          300: 'color(display-p3 0.796 0.835 0.882)',
          400: 'color(display-p3 0.580 0.639 0.722)',
          500: 'color(display-p3 0.392 0.455 0.545)',
          600: 'color(display-p3 0.278 0.337 0.412)',
          700: 'color(display-p3 0.200 0.255 0.333)',
          800: 'color(display-p3 0.118 0.161 0.231)',
          900: 'color(display-p3 0.059 0.090 0.165)',
        },
        // P3 Enhanced success colors with vivid greens
        success: {
          50: 'color(display-p3 0.941 0.992 0.980)',
          100: 'color(display-p3 0.800 0.984 0.945)',
          200: 'color(display-p3 0.600 0.965 0.894)',
          300: 'color(display-p3 0.369 0.918 0.831)',
          400: 'color(display-p3 0.176 0.831 0.749)',
          500: 'color(display-p3 0.078 0.722 0.651)',
          600: 'color(display-p3 0.051 0.580 0.533)',
          700: 'color(display-p3 0.059 0.463 0.431)',
          800: 'color(display-p3 0.067 0.369 0.349)',
          900: 'color(display-p3 0.075 0.306 0.290)',
        },
        // P3 Enhanced warning colors with vibrant oranges
        warning: {
          50: 'color(display-p3 1 0.969 0.929)',
          100: 'color(display-p3 1 0.929 0.835)',
          200: 'color(display-p3 0.996 0.843 0.667)',
          300: 'color(display-p3 0.992 0.729 0.455)',
          400: 'color(display-p3 0.984 0.573 0.235)',
          500: 'color(display-p3 0.976 0.451 0.086)',
          600: 'color(display-p3 0.918 0.345 0.047)',
          700: 'color(display-p3 0.761 0.255 0.047)',
          800: 'color(display-p3 0.604 0.204 0.071)',
          900: 'color(display-p3 0.486 0.176 0.071)',
        },
        // P3 Enhanced danger colors with vivid reds
        danger: {
          50: 'color(display-p3 0.992 0.949 0.973)',
          100: 'color(display-p3 0.988 0.906 0.953)',
          200: 'color(display-p3 0.984 0.812 0.910)',
          300: 'color(display-p3 0.976 0.659 0.831)',
          400: 'color(display-p3 0.957 0.447 0.714)',
          500: 'color(display-p3 0.925 0.286 0.600)',
          600: 'color(display-p3 0.859 0.153 0.467)',
          700: 'color(display-p3 0.745 0.094 0.365)',
          800: 'color(display-p3 0.616 0.090 0.302)',
          900: 'color(display-p3 0.514 0.094 0.263)',
        },
        // P3 Enhanced blue with wider color gamut
        blue: {
          25: 'color(display-p3 0.941 0.976 1)',
          50: 'color(display-p3 0.878 0.949 0.996)',
          100: 'color(display-p3 0.729 0.902 0.992)',
          200: 'color(display-p3 0.490 0.827 0.988)',
          300: 'color(display-p3 0.220 0.741 0.973)',
          400: 'color(display-p3 0.055 0.647 0.914)',
          500: 'color(display-p3 0.008 0.518 0.780)',
          600: 'color(display-p3 0.014 0.412 0.631)',
          700: 'color(display-p3 0.027 0.349 0.522)',
          800: 'color(display-p3 0.047 0.294 0.431)',
          900: 'color(display-p3 0.031 0.184 0.286)',
          950: 'color(display-p3 0.031 0.184 0.286)',
        },
        // P3 Enhanced amber with vibrant yellows
        amber: {
          25: 'color(display-p3 1 0.984 0.922)',
          50: 'color(display-p3 0.996 0.953 0.780)',
          100: 'color(display-p3 0.992 0.906 0.541)',
          200: 'color(display-p3 0.988 0.827 0.302)',
          300: 'color(display-p3 0.984 0.749 0.141)',
          400: 'color(display-p3 0.965 0.620 0.043)',
          500: 'color(display-p3 0.851 0.467 0.024)',
          600: 'color(display-p3 0.706 0.325 0.035)',
          700: 'color(display-p3 0.573 0.251 0.055)',
          800: 'color(display-p3 0.471 0.208 0.059)',
          900: 'color(display-p3 0.271 0.102 0.012)',
          950: 'color(display-p3 0.271 0.102 0.012)',
        },
        // P3 Enhanced red with vivid color reproduction
        red: {
          25: 'color(display-p3 0.996 0.996 0.996)',
          50: 'color(display-p3 0.996 0.949 0.949)',
          100: 'color(display-p3 0.996 0.886 0.886)',
          200: 'color(display-p3 0.996 0.792 0.792)',
          300: 'color(display-p3 0.988 0.647 0.647)',
          400: 'color(display-p3 0.973 0.443 0.443)',
          500: 'color(display-p3 0.937 0.267 0.267)',
          600: 'color(display-p3 0.863 0.149 0.149)',
          700: 'color(display-p3 0.725 0.110 0.110)',
          800: 'color(display-p3 0.600 0.106 0.106)',
          900: 'color(display-p3 0.498 0.114 0.114)',
          950: 'color(display-p3 0.271 0.039 0.039)',
        },
        // P3 Enhanced orange with vibrant saturation
        orange: {
          25: 'color(display-p3 1 0.969 0.929)',
          50: 'color(display-p3 1 0.969 0.929)',
          100: 'color(display-p3 1 0.929 0.835)',
          200: 'color(display-p3 0.996 0.843 0.667)',
          300: 'color(display-p3 0.992 0.729 0.455)',
          400: 'color(display-p3 0.984 0.573 0.235)',
          500: 'color(display-p3 0.976 0.451 0.086)',
          600: 'color(display-p3 0.918 0.345 0.047)',
          700: 'color(display-p3 0.761 0.255 0.047)',
          800: 'color(display-p3 0.604 0.204 0.071)',
          900: 'color(display-p3 0.486 0.176 0.071)',
          950: 'color(display-p3 0.263 0.078 0.027)',
        },
        // P3 Enhanced gray with better neutrals
        gray: {
          25: 'color(display-p3 0.988 0.988 0.992)',
          50: 'color(display-p3 0.976 0.980 0.984)',
          100: 'color(display-p3 0.953 0.961 0.965)',
          200: 'color(display-p3 0.898 0.906 0.922)',
          300: 'color(display-p3 0.820 0.835 0.859)',
          400: 'color(display-p3 0.612 0.639 0.686)',
          500: 'color(display-p3 0.420 0.447 0.502)',
          600: 'color(display-p3 0.294 0.337 0.388)',
          700: 'color(display-p3 0.216 0.255 0.318)',
          800: 'color(display-p3 0.122 0.161 0.216)',
          900: 'color(display-p3 0.067 0.102 0.153)',
          950: 'color(display-p3 0.012 0.027 0.071)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
} 