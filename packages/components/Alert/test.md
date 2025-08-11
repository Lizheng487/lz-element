// Alert.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Alert from '@/components/Alert.vue'

describe('LzElement Alert Component', () => {
  /* ---------- 4.1 semantic type ---------- */
  it('renders info type by default', () => {
    const wrapper = mount(() => <Alert content="demo" />)
    expect(wrapper.classes()).toContain('lz-alert--info')
  })

  it('applies success type class and icon', () => {
    const wrapper = mount(() => <Alert type="success" content="ok" />)
    expect(wrapper.classes()).toContain('lz-alert--success')
    expect(wrapper.findComponent({ name: 'CheckCircle' }).exists()).toBe(true)
  })

  it('applies warning type class and icon', () => {
    const wrapper = mount(() => <Alert type="warning" content="warn" />)
    expect(wrapper.classes()).toContain('lz-alert--warning')
    expect(wrapper.findComponent({ name: 'WarningTriangle' }).exists()).toBe(true)
  })

  it('applies error type class and icon', () => {
    const wrapper = mount(() => <Alert type="error" content="error" />)
    expect(wrapper.classes()).toContain('lz-alert--error')
    expect(wrapper.findComponent({ name: 'XCircle' }).exists()).toBe(true)
  })

  /* ---------- 4.2 closable behavior ---------- */
  it('shows close button when closable is true', () => {
    const wrapper = mount(() => <Alert closable content="msg" />)
    expect(wrapper.find('.lz-alert__close').exists()).toBe(true)
  })

  it('emits close event with MouseEvent when closed', async () => {
    const wrapper = mount(() => <Alert closable content="msg" />)
    await wrapper.find('.lz-alert__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('close')![0][0]).toBeInstanceOf(MouseEvent)
  })

  it('removes element after close animation', async () => {
    const wrapper = mount(() => <Alert closable content="msg" />)
    wrapper.find('.lz-alert__close').trigger('click')
    await nextTick()
    expect(wrapper.find('.lz-alert').exists()).toBe(false)
  })

  /* ---------- 4.3 icon & slots ---------- */
  it('replaces default icon via icon slot', () => {
    const CustomIcon = () => <span class="custom-icon" />
    const wrapper = mount(() => (
      <Alert content="msg" v-slots={{ icon: () => <CustomIcon /> }} />
    ))
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('renders title slot when provided', () => {
    const Title = () => <h3 class="custom-title">Title</h3>
    const wrapper = mount(() => (
      <Alert content="msg" v-slots={{ title: () => <Title /> }} />
    ))
    expect(wrapper.find('.custom-title').text()).toBe('Title')
  })

  it('renders extra slot on the right', () => {
    const Extra = () => <button class="extra-btn">Action</button>
    const wrapper = mount(() => (
      <Alert content="msg" v-slots={{ extra: () => <Extra /> }} />
    ))
    expect(wrapper.find('.extra-btn').exists()).toBe(true)
  })

  /* ---------- 4.4 theme token ---------- */
  it('uses CSS variables for border-radius', () => {
    const wrapper = mount(() => <Alert content="msg" />)
    const el = wrapper.element
    expect(
      getComputedStyle(el).getPropertyValue('--lz-alert-border-radius')
    ).toBe('4px')
  })

  /* ---------- 4.5 a11y ---------- */
  it('sets role alert for error type', () => {
    const wrapper = mount(() => <Alert type="error" content="err" />)
    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('sets role status for info type', () => {
    const wrapper = mount(() => <Alert type="info" content="info" />)
    expect(wrapper.attributes('role')).toBe('status')
  })

  it('sets aria-label on close button', () => {
    const wrapper = mount(() => <Alert closable content="msg" />)
    expect(wrapper.find('.lz-alert__close').attributes('aria-label')).toBe(
      '关闭'
    )
  })

  it('closes alert via keyboard Enter on close button', async () => {
    const wrapper = mount(() => <Alert closable content="msg" />)
    const closeBtn = wrapper.find('.lz-alert__close')
    closeBtn.element.focus()
    await closeBtn.trigger('keydown', { code: 'Enter' })
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('closes alert via keyboard Space on close button', async () => {
    const wrapper = mount(() => <Alert closable content="msg" />)
    const closeBtn = wrapper.find('.lz-alert__close')
    closeBtn.element.focus()
    await closeBtn.trigger('keydown', { code: 'Space' })
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  /* ---------- 4.6 responsive ---------- */
  it('adds responsive padding on mobile', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 1 })
    const wrapper = mount(() => <Alert responsive content="msg" />)
    expect(wrapper.classes()).toContain('lz-alert--responsive')
  })

  it('skips responsive padding when responsive is false', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 1 })
    const wrapper = mount(() => <Alert responsive={false} content="msg" />)
    expect(wrapper.classes()).not.toContain('lz-alert--responsive')
  })

  /* ---------- showIcon ---------- */
  it('hides icon when showIcon is false', () => {
    const wrapper = mount(() => <Alert showIcon={false} content="msg" />)
    expect(wrapper.find('.lz-alert__icon').exists()).toBe(false)
  })

  it('shows icon by default', () => {
    const wrapper = mount(() => <Alert content="msg" />)
    expect(wrapper.find('.lz-alert__icon').exists()).toBe(true)
  })
})