import { defineConfig } from 'vitest/config' // 'vite' эмес, 'vitest/config' колдонобуз
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})