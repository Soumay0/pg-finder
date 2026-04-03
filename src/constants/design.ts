// Design System - Colors, Spacing, Typography
export const COLORS = {
  // Primary Gradients
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  
  // Solid Colors
  bg: {
    dark: '#0f172a',
    darker: '#020617',
    light: '#f8fafc',
    card: '#1e293b',
  },
  
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    muted: '#94a3b8',
  },
  
  border: '#334155',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

export const BORDER_RADIUS = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
};

export const TRANSITIONS = {
  fast: '150ms ease-in-out',
  default: '300ms ease-in-out',
  slow: '500ms ease-in-out',
};

export const ANIMATIONS = {
  fadeIn: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
  slideUp: '@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }',
  scaleIn: '@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }',
};
