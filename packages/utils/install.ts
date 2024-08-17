import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

// 定义单文件组件为插件类型
// 即把单文件组件当成是一个插件，可被安装使用
type SFCWithInstall<T> = T & Plugin

// 把传入的所有组件当成插件进行安装
export function makeInstaller(components: Plugin[]) {
  const install = (app: App) =>
    each(components, (c) => {
      app.use(c)
    })

  return install
}

// 将传入的组件转换成插件
// 即给组件添加install方法
// 当使用app.use(component)时会自动调用组件的install方法
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || 'UnnamedComponent'
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}
