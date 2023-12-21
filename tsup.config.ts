import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['server/server.ts'],
  outDir: 'out',
  splitting: false,
  format: 'esm',
  sourcemap: true,
  clean: true,
})
