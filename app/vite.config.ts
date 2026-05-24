import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites under /<repo>/, so set base accordingly.
// In dev (`npm run dev`), base is '/' so the asset paths still resolve.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/cvs-account-wiki/' : '/',
}))
