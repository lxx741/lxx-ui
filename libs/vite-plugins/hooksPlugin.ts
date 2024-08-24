import { each, isFunction } from 'lodash-es'
import shell from 'shelljs'
// 自定义vite插件，在构建前后做一些额外的事
export default function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[]
  beforeBuild?: Function
  afterBuild?: Function
}) {
  return {
    name: 'hooks-plugin',
    buildStart() {
      each(rmFiles, (fName) => shell.rm('-rf', fName))
      isFunction(beforeBuild) && beforeBuild()
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild()
    },
  }
}
