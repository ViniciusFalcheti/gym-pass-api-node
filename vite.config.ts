import { defineConfig } from 'vitest/config'
// import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
    // plugins: [tsConfigPaths()],
    resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
      },
    test: {
      environmentMatchGlobs: [
        ['src/http/controllers/**', 'prisma']
      ]
    }
})