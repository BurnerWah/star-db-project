import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['server/server.ts'],
  outDir: 'dist/server',
  tsconfig: 'tsconfig.server.json',
  splitting: true,
  format: 'esm',
  sourcemap: true,
  clean: true,
  target: 'node20',
  onSuccess: options.watch ? 'node dist/server/server.js' : undefined,
  ignoreWatch: ['dist', 'src', 'documentation', 'public'],
}))
