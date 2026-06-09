import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://otruyenapi.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cdn-api': {
        target: 'https://sv1.otruyencdn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-api/, '/v1/api'),
      },
    },
  },
})
