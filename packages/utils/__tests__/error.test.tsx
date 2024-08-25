import { describe, expect, it, vi } from 'vitest'
import { debugWarn } from '../error'

describe('error', () => {
  it('debugWarn should work', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => vi.fn)
    debugWarn('scope', 'message')
    debugWarn(new SyntaxError('custom error'))
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [LxxUIError: [scope]:message],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `)
  })
})
