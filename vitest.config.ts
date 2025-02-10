import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      silent: true,
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['lcov', 'text', 'text-summary'],
        all: true,
        extension: [
          '.mjs',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.vue'
        ],
        include: ['src/**/*'],
        exclude: [
          ...configDefaults.coverage.exclude || [] as string[],
          'src/services/**/*',
          'src/types/**/*',
          'src/router/**/*',
          'src/main.ts'
        ]
      }
    },
    define: {
      env: {
        API_BASE_URL: 'https://'
      }
    }
  })
)
