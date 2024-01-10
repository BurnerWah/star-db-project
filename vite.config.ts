import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), imagetools()],
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: 'dist/client',
    cssMinify: 'lightningcss',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
