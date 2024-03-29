import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@dashboard/Users': path.resolve(__dirname, 'src/views/dashboard/Users.jsx'),
      '@dashboard/Statistics': path.resolve(__dirname, 'src/views/dashboard/Statistics.jsx'),
      '@createProduct/CreateProduct': path.resolve(__dirname, 'src/views/createProduct/CreateProduct.jsx'),
      '@dashboard/productList': path.resolve(__dirname, 'src/views/dashboard/productList'),
    },
  },  
  build: {
    chunkSizeWarningLimit: 2000, // Ajusta el límite de advertencia de tamaño del fragmento
    // Otras configuraciones...
  },
});
