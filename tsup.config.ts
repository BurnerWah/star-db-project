import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['server/server.ts'],
  outDir: 'out',
  splitting: true,
  format: 'esm',
  sourcemap: true,
  clean: true,
  target: 'node20',
})
