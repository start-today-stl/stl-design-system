// Tailwind CSS Preset for STL Design System
// 사용처에서 이 preset을 import해서 사용

import { colors, radius } from './tokens'

export const stlPreset = {
  theme: {
    extend: {
      colors: {
        // Primary (Blue) - Action 버튼
        primary: {
          ...colors.primary,
          foreground: colors.white,
        },
        // Danger (Red) - Negative 버튼
        danger: {
          ...colors.danger,
          foreground: colors.white,
        },
        // Gray - Basic 버튼
        gray: colors.gray,
        // Semantic (Green)
        semantic: colors.semantic,
        // Legacy/Semantic mappings
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: colors.danger[300],
          foreground: colors.white,
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        white: colors.white,
        black: colors.black,
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'stl-gothic': ['STLgothicR', 'Pretendard', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.5', letterSpacing: '-0.12px' }],
        sm: ['14px', { lineHeight: '1.5', letterSpacing: '-0.14px' }],
      },
    },
  },
}

export default stlPreset
