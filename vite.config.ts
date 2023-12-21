import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
