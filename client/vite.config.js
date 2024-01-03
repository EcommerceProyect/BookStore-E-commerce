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
      '/src/views/dashboard/Users.jsx': path.resolve(__dirname, 'src/views/dashboard/Users.jsx'),
      '/src/views/dashboard/Statistics.jsx': path.resolve(__dirname, 'src/views/dashboard/Statistics.jsx'),
      '/src/views/createProduct/CreateProduct.jsx': path.resolve(__dirname, 'src/views/createProduct/CreateProduct.jsx'),
    },
  },
})
