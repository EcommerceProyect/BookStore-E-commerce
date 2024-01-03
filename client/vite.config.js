import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
  host: true,
  strictPort: true,
  port: 8000,
  },
  resolve: {
    alias: {
      '@': '/src', 
      '@filters': path.resolve(__dirname, 'src/components/cards/filters'),
    },
  },
})
