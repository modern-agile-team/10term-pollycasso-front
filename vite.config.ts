import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import imagemin from '@vheemstra/vite-plugin-imagemin';
import imageminSvgo from 'imagemin-svgo';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      plugins: {
        svg: imageminSvgo(),
      },
      include: ['**/*.{jpg,jpeg,png,svg}'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
