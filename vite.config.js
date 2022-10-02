import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default {
  base: './',
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [
        (name) => {
          // where `name` is always CapitalCase
          if (name.startsWith('Nut')) return { name: name.slice(3), from: '@nutui/nutui' }
        },
      ],
    }),
    createStyleImportPlugin({
      resolves: [
        {
          libraryName: '@nutui/nutui',
          libraryNameChangeCase: 'pascalCase',
          resolveStyle: (name) => `@nutui/nutui/dist/packages/${name.toLowerCase()}/index.scss`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 配置 nutui 全局 scss 变量
        additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    // can fix: Unrestricted file system access to
    fs: {
      // 可以为项目根目录的上一级提供服务
      allow: ['..'],
    },
  },
}
