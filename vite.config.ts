import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// 일반 GitHub Pages 레포(supervisor-515.github.io/diary/) 기준 base입니다.
// username.github.io 루트 Pages로 옮길 경우 base를 '/'로 바꾸면 됩니다.
export default defineConfig({
  base: '/diary/',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
