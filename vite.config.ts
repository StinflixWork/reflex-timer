import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '@icons': path.resolve(process.cwd(), 'src/assets/icons'),
        '@images': path.resolve(process.cwd(), 'src/assets/images')
      }
    }
  }
})
