import { URL, fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const yourResolver = (name: string) => {
  if (name === 'FormItem' || name === 'Checkbox' || name === 'Submit' || name === 'Form')
    return { name, as: name, from: '@formily/element-plus/esm' }

  if (name === 'createForm')
    return { name, as: name, from: '@formily/core/esm' }
  if (name === 'createSchemaField')
    return { name, as: name, from: '@formily/vue/esm' }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        yourResolver,
        ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        yourResolver,
        ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
