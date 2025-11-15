/**
 * MINDTRX Constants and Configuration
 */

export const APP_NAME = 'MINDTRX';
export const APP_VERSION = 'v2';
export const APP_FULL_NAME = 'MINDTRX - Inner Mind Integration Inventory';

export const SCORE_CUTOFF = 26;
export const COMM_MAX_RAW = 70;
export const TRUST_MAX_RAW = 65;
export const NORMALIZED_MAX = 50;

export const SCALE_LABELS = [
  'Rarely/Never true',
  'Seldom true',
  'Sometimes true', 
  'Often true',
  'Very true / Always true'
];

export const QUADRANT_COLORS = {
  'Disengaged Mind': 'rgba(255, 100, 100, 0.1)',
  'Skeptical Explorer': 'rgba(100, 150, 255, 0.1)',
  'Faithful Seeker': 'rgba(255, 200, 100, 0.1)',
  'Integrated Alchemist': 'rgba(100, 255, 150, 0.1)',
} as const;

export const THEME_CONFIG = {
  dark: {
    name: 'Dark Futuristic',
    background: '#0a0015',
    primary: '#8a2be2',
    accent: '#00ffff',
    hasAnimation: true,
  },
  bright: {
    name: 'Bright High-Contrast',
    background: '#ffffff',
    primary: '#7c3aed',
    accent: '#8a2be2',
    hasAnimation: false,
  },
} as const;

export const STORAGE_KEYS = {
  CURRENT_QUIZ: 'mindtrx_current_quiz',
  RESULTS: 'mindtrx_results',
  THEME: 'mindtrx-theme',
} as const;

