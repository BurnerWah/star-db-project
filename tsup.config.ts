import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: 'server',
  entry: ['server/server.ts'],
  outDir: 'dist/server',
  tsconfig: 'tsconfig.server.json',
  format: 'esm',
  sourcemap: true,
  clean: true,
  target: 'node20',
  treeshake: !options.watch,
  onSuccess:
    options.watch ?
      'DOTENV_CONFIG_PATH=.env.server node dist/server/server.js'
    : undefined,
  ignoreWatch: ['dist', 'src', 'documentation', 'public'],
}))
