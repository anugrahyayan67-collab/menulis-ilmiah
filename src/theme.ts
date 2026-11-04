import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/outfit/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/source-serif-4/400-italic.css';
import '@fontsource/source-serif-4/600-italic.css';
import '@fontsource/source-serif-4/400.css';

export const W = 1920;
export const H = 1080;

// Gaya "Studio Tulis": latar terang bersih, tinta biru tua, aksen biru, merah koreksi, stabilo kuning.
export const C = {
  bg: '#f3f5fa',
  bg2: '#e9edf5',
  paper: '#ffffff',
  ink: '#16213e',
  muted: '#5b6478',
  faint: '#d6dce8',
  rule: '#c3cde0',
  gold: '#b86e00', // aksen kata kunci (terbaca di latar terang)
  hilite: '#ffd84d', // stabilo
  amber: '#e07a00',
  cyan: '#0b8f9c',
  blue: '#2f62f0',
  violet: '#6d4fe0',
  mint: '#139a63',
  red: '#e0393e', // koreksi
  pink: '#cf3f93',
};

export const FONT = {
  sans: 'Outfit, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  serif: '"Source Serif 4", Georgia, serif',
};

// Warna aksen tipis per suasana (garis atas & bentuk latar).
export const MOOD_TINT: Record<string, string> = {
  mystery: '#6d4fe0',
  title: '#2f62f0',
  wonder: '#0b8f9c',
  build: '#2f62f0',
  quantum: '#6d4fe0',
  tension: '#e0393e',
  bright: '#e07a00',
  resolve: '#139a63',
  outro: '#2f62f0',
};
