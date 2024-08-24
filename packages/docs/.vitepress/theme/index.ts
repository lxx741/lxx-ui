import DefaultTheme from 'vitepress/theme'
import { type App } from 'vue'
import LxxUI, { zhCn } from 'lxx-ui'
import { ElementPlusContainer } from '@vitepress-preview/component'
import '@vitepress-preview/component/style.css'
import 'lxx-ui/dist/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', ElementPlusContainer)
    app.use(LxxUI, { locale: zhCn })
  },
}
