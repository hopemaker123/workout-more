/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core System Colors
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // slate-700
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // gray-100
        ring: 'var(--color-ring)', // blue-900
        
        // Card System
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-700
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-700
        },
        
        // Muted System
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        
        // Brand Primary
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-900
          foreground: 'var(--color-primary-foreground)' // white
        },
        
        // Brand Secondary
        secondary: {
          DEFAULT: 'var(--color-secondary)', // blue-400
          foreground: 'var(--color-secondary-foreground)' // white
        },
        
        // Accent & Opportunity
        accent: {
          DEFAULT: 'var(--color-accent)', // orange-400
          foreground: 'var(--color-accent-foreground)' // white
        },
        
        // Status Colors
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-600
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        
        // Surface & Typography
        surface: 'var(--color-surface)', // gray-100
        'text-primary': 'var(--color-text-primary)', // slate-700
        'text-secondary': 'var(--color-text-secondary)', // gray-500
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      
      fontSize: {
        'hero': ['clamp(2rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'value-prop': ['clamp(1.25rem, 4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-large': ['1.125rem', { lineHeight: '1.7' }],
        'responsive': ['clamp(1rem, 2.5vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      
      spacing: {
        'xs': 'var(--spacing-xs)', // 8px
        'sm': 'var(--spacing-sm)', // 12px
        'base': 'var(--spacing-base)', // 16px
        'lg': 'var(--spacing-lg)', // 24px
        'xl': 'var(--spacing-xl)', // 32px
        '2xl': 'var(--spacing-2xl)', // 48px
        '3xl': 'var(--spacing-3xl)', // 64px
        '4xl': 'var(--spacing-4xl)', // 96px
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
      },
      
      borderRadius: {
        'sm': 'var(--radius-sm)', // 4px
        'base': 'var(--radius-base)', // 8px
        'lg': 'var(--radius-lg)', // 12px
        'xl': 'var(--radius-xl)', // 16px
      },
      
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'base': 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'professional': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      
      animation: {
        'convergence': 'convergence 2s ease-in-out infinite alternate',
        'opportunity-pulse': 'opportunity-pulse 3s ease-in-out infinite',
        'professional-slide': 'professional-slide 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      
      keyframes: {
        convergence: {
          '0%': { transform: 'translateX(-2px) scale(1)' },
          '100%': { transform: 'translateX(2px) scale(1.02)' }
        },
        'opportunity-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        'professional-slide': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      
      transitionTimingFunction: {
        'professional': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'convergence': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '400ms',
      },
      
      backdropBlur: {
        'professional': '8px',
      },
      
      zIndex: {
        'header': '50',
        'sidebar': '40',
        'modal': '100',
        'tooltip': '110',
      },
      
      maxWidth: {
        'professional': '1280px',
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      gridTemplateColumns: {
        'convergence': 'repeat(auto-fit, minmax(300px, 1fr))',
        'professional': 'repeat(auto-fit, minmax(280px, 1fr))',
        'opportunity': '1fr 2fr 1fr',
      },
      
      aspectRatio: {
        'professional': '16 / 10',
        'card': '4 / 3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}