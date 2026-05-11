/**
 * Matches GearGrid web tokens (admin_layout.css & customer base_customer.html.twig).
 */
export const colors = {
  primary: '#6C63FF',
  primaryHover: '#5b54d6',
  secondary: '#ff6584',
  success: '#4ade80',
  danger: '#ff4d4f',
  warning: '#fbbf24',
  bgBase: '#0B1120',
  /** Glass card surface */
  bgCard: 'rgba(17, 24, 39, 0.92)',
  bgInput: 'rgba(255, 255, 255, 0.03)',
  bgInputFocused: 'rgba(255, 255, 255, 0.06)',
  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassBorderHover: 'rgba(255, 255, 255, 0.15)',
  placeholder: '#64748b',
  glowPurple: 'rgba(108, 99, 255, 0.12)',
  glowPink: 'rgba(255, 101, 132, 0.08)',
  dangerMutedBg: 'rgba(220, 53, 69, 0.1)',
  dangerMutedBorder: 'rgba(220, 53, 69, 0.3)',
};

export const radii = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const spacing = {
  screen: 24,
};

/** Heading style aligned with web Oswald usage (system font + weight). */
export const typography = {
  brandTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
    color: colors.textMain,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '800' as const,
    letterSpacing: 0.5,
    color: colors.textMain,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  body: {
    fontSize: 16,
    color: colors.textMain,
  },
};
