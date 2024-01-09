import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), mode === 'production' && imagetools()],
  build: {
    outDir: 'dist/client',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
}))
