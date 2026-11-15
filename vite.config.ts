import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
// import vueDevTools from 'vite-plugin-vue-devtools'

// RESUME_CONTENT=content.plain.ts 时用指定文件替换 App.vue 里的 ../content，方便预览不同版本
const contentFile = process.env.RESUME_CONTENT

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    contentFile && {
      name: 'resume-content-switch',
      enforce: 'pre',
      resolveId(source: string, importer?: string) {
        if (source === '../content' && importer?.includes('/src/App.vue')) {
          return fileURLToPath(new URL(`./${contentFile}`, import.meta.url))
        }
      }
    },
    vue(),
    vueJsx()
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
