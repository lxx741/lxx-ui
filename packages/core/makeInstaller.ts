import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'
// import {
//   provideGlobalConfig,
//   type ConfigProviderProps,
// } from '@lxx-ui/components'

export function makeInstaller(componets: Plugin[]) {
  // const installer = (app: App, opts?: ConfigProviderProps) => {
  //   each(componets, (c) => app.use(c))
  //   if (opts) provideGlobalConfig(opts, app, true)
  // }
  const installer = (app: App) => {
    each(componets, (c) => app.use(c))
  }

  return installer as Plugin
}

export default makeInstaller
