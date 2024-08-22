import { isString } from 'lodash-es'

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? createLxxUIError(scope, msg!) : scope
    console.warn(err)
  }
}

class LxxUIError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'LxxUIError'
  }
}

function createLxxUIError(scope: string, msg: string) {
  return new LxxUIError(`[${scope}]:${msg}`)
}
