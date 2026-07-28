/**
 * DC Stores — Android Design Tokens
 * Extracted from the web design system, adapted for native Android.
 * Every value in this file is the single source of truth.
 */

// ─── Colors ─────────────────────────────────────────────
export const colors = {
  // Canvas & surfaces
  canvas: '#FAF8F5',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F8FAFC',

  // Brand — obsidian
  obsidian: '#0F1219',
  obsidianMid: '#1A202C',
  obsidianDeep: '#07090D',

  // Brand — champagne gold
  gold: '#D4AF37',
  goldDeep: '#B8860B',
  goldSoft: '#F4E8C1',
  goldTint: '#FAF6ED',

  // Text
  textPrimary: '#0F1219',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textOnDark: '#FFFFFF',
  textOnGold: '#0F1219',

  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderGold: 'rgba(212, 175, 55, 0.2)',
  borderGoldStrong: 'rgba(212, 175, 55, 0.35)',

  // Semantic
  success: '#22C55E',
  successBg: '#F0FDF4',
  error: '#EF4444',
  errorBg: '#FEF2F2',
  info: '#3B82F6',
  infoBg: '#EFF6FF',
  warning: '#F59E0B',

  // Overlays
  overlay: 'rgba(15, 18, 25, 0.5)',
  overlayLight: 'rgba(15, 18, 25, 0.03)',
} as const;

// ─── Spacing (8pt grid) ─────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 56,
  '6xl': 64,
} as const;

// ─── Typography ─────────────────────────────────────────
export const typography = {
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600' as const,
  },
  captionBold: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800' as const,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  smallBold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodyBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700' as const,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800' as const,
  },
  headline: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900' as const,
  },
  display: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900' as const,
  },
} as const;

// ─── Border Radius ──────────────────────────────────────
export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

// ─── Shadows / Elevation ────────────────────────────────
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  low: {
    shadowColor: '#0F1219',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#0F1219',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  high: {
    shadowColor: '#0F1219',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  gold: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
} as const;

// ─── Animation Timings ──────────────────────────────────
export const timing = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

// ─── Touch Target ───────────────────────────────────────
export const minTouchTarget = 48;
