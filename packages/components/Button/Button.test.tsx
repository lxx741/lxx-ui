import { describe, it, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Icon from '../Icon/Icon.vue'

describe('按钮', () => {
  it('是否能正确显示type类名', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      })
      expect(wrapper.classes()).toContain(`lxx-button--${type}`)
    })
  })

  it('是否能正确显示size类名', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      })
      expect(wrapper.classes()).toContain(`lxx-button--${size}`)
    })
  })

  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading'],
  ])('是否能正确的显示%s对应的类名', (prop, className) => {
    const wrapper = mount(Button, {
      props: { [prop]: true },
      global: {
        stubs: ['LxxIcon'],
      },
    })
    expect(wrapper.classes()).toContain(className)
  })

  it('是否能正确显示原生类型', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })

  it.each([
    ['withoutThrottle', false],
    ['withThrottle', true],
  ])('是否能正确处理节流时的点击事件 %s', async (_, useThrottle) => {
    const clickSpy = vi.fn()
    const wrapper = mount(() => (
      <Button
        onClick={clickSpy}
        {...{
          useThrottle,
          throttleDuration: 400,
        }}
      />
    ))

    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    expect(clickSpy).toBeCalledTimes(useThrottle ? 1 : 3)
  })

  it('是否能根据传递的tag属性正确的显示元素标签', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  it('是否能正常触发点击事件', async () => {
    const wrapper = mount(Button, {})
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  it('是否能正常显示加载中的图标并且加载中不能点击', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      global: {
        stubs: ['LxxIcon'],
      },
    })
    const iconElement = wrapper.findComponent(Icon)

    expect(wrapper.find('.loading-icon').exists()).toBe(true)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  const onClick = vi.fn()
  test('按钮的基本测试', async () => {
    const wrapper = mount(() => (
      <Button type='primary' {...{ onClick }}>
        button content
      </Button>
    ))
    expect(wrapper.classes()).toContain('lxx-button--primary')
    expect(wrapper.get('button').text()).toBe('button content')
    await wrapper.get('button').trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('测试禁用状态下的按钮', async () => {
    const wrapper = mount(() => (
      <Button disabled {...{ onClick }}>
        disabled button
      </Button>
    ))

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()
    await wrapper.get('button').trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('测试加载状态中的按钮', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading button',
      },
      global: {
        stubs: ['LxxIcon'],
      },
    })

    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
  })

  test('测试带图标的按钮', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon button',
      },
      global: {
        stubs: ['LxxIcon'],
      },
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
})

describe('按钮组', () => {
  test('按钮组基本测试', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    expect(wrapper.classes()).toContain('lxx-button-group')
  })

  test('按钮组尺寸测试', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`lxx-button--${size}`)
    })
  })

  test('按钮组类型测试', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`lxx-button--${type}`)
    })
  })

  test('按钮组禁用测试', () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-disabled`)
  })
})
