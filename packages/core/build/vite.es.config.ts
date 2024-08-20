import { defineConfig } from 'vite' // 导入配置的定义函数
import { resolve } from 'path' // 导入解析路径的方法
import { readdirSync, readdir } from 'fs' // 导入读取目录的方法
import { delay, defer, filter, map } from 'lodash-es' // 导入工具函数
import { visualizer } from 'rollup-plugin-visualizer' // 可视化分析依赖的模块

import vue from '@vitejs/plugin-vue' // 导入在vite中使用的vue插件
import dts from 'vite-plugin-dts' // 导入生成类型文件的插件
import shell from 'shelljs' // 脚本执行工具
import { hooksPlugin as hooks } from '@lxx-ui/vite-plugins' // 导入自定义的钩子函数
import terser from '@rollup/plugin-terser' // 压缩插件

const TRY_MOVE_STYLES_DELAY = 800 as const // 常量，延迟移动样式文件

const isProd = process.env.NODE_ENV === 'production' // 常量，是否是生产环境
const isDev = process.env.NODE_ENV === 'development' // 常量，是否是开发环境
const isTest = process.env.NODE_ENV === 'test' // 常量，是否是测试环境

// 获取给定目录下的目录集合
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}
// 移动目录
function moveStyles() {
  readdir('./dist/es/theme', (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    defer(() => shell.mv('./dist/es/theme', './dist'))
  })
}

// 配置选项
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: 'dist/stats.es.html',
    }),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    hooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'ToyElement',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          if (
            assetInfo.type === 'asset' &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return 'theme/[name].[ext]'
          }
          return assetInfo.name as string
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks'
          }
          if (
            id.includes('/packages/utils') ||
            id.includes('plugin-vue:export-helper')
          ) {
            return 'utils'
          }
          for (const dirName of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName
            }
          }
        },
      },
    },
  },
})
