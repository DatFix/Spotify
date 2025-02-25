import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./", // Đảm bảo đường dẫn đúng khi deploy
  plugins: [react()],
});

