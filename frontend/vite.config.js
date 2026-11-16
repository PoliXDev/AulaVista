import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // El 5173 lo usa otro proyecto en esta máquina. Puerto fijo para que
    // coincida con CORS_ALLOWED_ORIGINS y no salte a uno no autorizado.
    port: 5180,
    strictPort: true,
  },
})
