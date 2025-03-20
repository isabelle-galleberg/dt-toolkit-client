import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Required for GitHub Pages
  plugins: [react()],
  define: {
    'process.env': process.env,
    __WS_TOKEN__: JSON.stringify(process.env.VITE_POSTHOG_WS_TOKEN),
  },
});
