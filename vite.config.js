import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,   // Abre el navegador automáticamente al arrancar
    port: 5173,   // Puerto fijo — nunca cambia aunque esté ocupado, lanza error claro
    strictPort: true, // Si el puerto está ocupado, falla con mensaje claro en vez de cambiar silenciosamente
  }
})
