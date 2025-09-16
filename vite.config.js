import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), eslint()],
   server: {
      port: 5173,
      proxy: {
         '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
         },
      },
   },
})
