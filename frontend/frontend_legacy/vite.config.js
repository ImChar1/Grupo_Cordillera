import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // O el plugin de react que tengas mapeado arriba

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Forzamos a que mantenga tu puerto actual
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // El puerto de tu Spring Boot / API Gateway
        changeOrigin: true,
        secure: false,
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  }
})