import type { AlertType } from './types'

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { withInstall } from '@lxx-ui/utils'
import { LxxAlert } from './index'

import Alert from './Alert.vue'
import LxxIcon from '../Icon/Icon.vue'

describe('Alert.vue', () => {
  const title = 'Test Alert' as const
  const desc = 'This is a test description' as const
  it('是否使用默认值渲染', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ['LxxIcon'],
      },
    })
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(desc)

    // close icon
    const iconElement = wrapper.findComponent(LxxIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('xmark')

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ))

    expect(wrapper2.text()).toContain(title)
    expect(wrapper2.text()).toContain(desc)
  })

  it.each([
    ['info', 'circle-info'],
    ['success', 'check-circle'],
    ['warning', 'circle-exclamation'],
    ['danger', 'circle-xmark'],
    ['error', 'circle-xmark'],
    ['non-compliance', 'circle-info'], // 不符合 type 定义的
  ])('是否符合类型的图标', (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ['LxxIcon'],
      },
    })

    const iconElement = wrapper.findComponent(LxxIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe(iconName)
  })

  it('是否触发点击关闭图标', () => {
    const onClose = vi.fn()

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ['LxxIcon'],
      },
    })
    wrapper.findComponent(LxxIcon).trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('是否允许自定义内容插槽', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test title',
      },
      slots: {
        default: desc,
        title,
      },
    })
    expect(wrapper.text()).toContain(desc)
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).not.toContain('test title')
  })

  it('是否支持文本居中', () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true,
      },
    })
    //class
    const rootNode = wrapper.find('.lxx-alert')
    expect(rootNode.classes()).toContain('text-center')
  })

  it('是否正常隐藏关闭图标', () => {
    const wrapper = mount(Alert, {
      props: { closable: false },
    })
    expect(wrapper.find('.lxx-alert__close').exists()).toBe(false)
  })

  it('是否正常隐藏显示alert', async () => {
    const wrapper = mount(Alert, {
      props: { title, closable: false },
    })
    await wrapper.vm.close()
    expect(wrapper.find('.lxx-alert').attributes().style).toBe('display: none;')
    await wrapper.vm.open()
    expect(wrapper.find('.lxx-alert').attributes().style).toBe('')
  })
})

describe('Alert/index', () => {
  it('是否作为插件导出', () => {
    expect(LxxAlert.install).toBeDefined()
  })
  it('是否导出组件', () => {
    expect(LxxAlert).toBe(Alert)
  })

  // 可选
  it('是否为增强组件，即是否为插件，即组件是否有install属性', () => {
    const enhancedAlert = withInstall(Alert)
    expect(enhancedAlert).toBe(LxxAlert)
  })

  // 可选
  it('是否为增强组件，即是否为插件，即组件是否有install属性', () => {
    const enhancedAlert = withInstall(Alert)
    expect(enhancedAlert).toHaveProperty('install')
  })
})
