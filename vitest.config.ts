import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./config/vitest/vitest.setup.js', './config/vitest/vitest.env.js'],
    coverage: {
      reporter: ['json-summary', 'text', 'lcov'],
      lines: 99,
      functions: 97,
      branches: 92,
      statements: 99,
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
})
