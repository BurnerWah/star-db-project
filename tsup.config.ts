import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['server/server.ts'],
  outDir: 'dist/server',
  splitting: true,
  format: 'esm',
  sourcemap: true,
  clean: true,
  target: 'node20',
})
