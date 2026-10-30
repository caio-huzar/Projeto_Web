import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pessoas': 'http://localhost:3000',
      '/cargos': 'http://localhost:3000',
    },
  },
})
