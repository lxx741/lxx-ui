import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // 将 @ 指向 src 目录
      // '@components': '/src/components', // 指向 src/components 目录
      // 你可以定义更多的别名
    },
  },
})
