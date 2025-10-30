import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configure Vite Dev Server proxy
export default defineConfig({
  plugins: [react()],
 server: {
  proxy: {
    '/api': {
      target: 'http://backend:8000',
      changeOrigin: true,
    },
  },
},
})
