// Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Component', () => {
  /* ---------- 4.1 基础形态 ---------- */
  it('renders secondary/md/fill/default by default', () => {
    const wrapper = mount(() => <Button />)
    expect(wrapper.classes()).toContain('lz-button--secondary')
    expect(wrapper.classes()).toContain('lz-button--md')
    expect(wrapper.classes()).toContain('lz-button--fill')
    expect(wrapper.classes()).toContain('lz-button--default')
  })

  it('applies correct type class', () => {
    const wrapper = mount(() => <Button type="danger" />)
    expect(wrapper.classes()).toContain('lz-button--danger')
  })

  it('applies correct size class', () => {
    const wrapper = mount(() => <Button size="small" />)
    expect(wrapper.classes()).toContain('lz-button--small')
  })

  // it('applies correct shape class', () => {
  //   const wrapper = mount(() => <Button shape="circle" />)
  //   expect(wrapper.classes()).toContain('lz-button--circle')
  // })

  // it('applies correct variant class', () => {
  //   const wrapper = mount(() => <Button variant="ghost" />)
  //   expect(wrapper.classes()).toContain('lz-button--ghost')
  // })

  /* ---------- 4.2 状态 ---------- */
  it('adds loading state and disables interaction', () => {
    const wrapper = mount(() => <Button loading />)
    expect(wrapper.find('.lz-button__loading').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('adds disabled state', () => {
    const wrapper = mount(() => <Button disabled />)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  // it('adds active state', () => {
  //   const wrapper = mount(() => <Button active />)
  //   expect(wrapper.classes()).toContain('lz-button--active')
  // })

  it('shows focus-visible ring on keyboard focus', async () => {
    const wrapper = mount(() => <Button />)
    await wrapper.trigger('focus')
    expect(wrapper.classes()).toContain('lz-button--focus-visible')
  })

  /* ---------- 4.3 图标 ---------- */
  // it('renders icon on the left by default', () => {
  //   const Icon = () => <svg data-test="icon" />
  //   const wrapper = mount(() => <Button icon={<Icon />} />)
  //   expect(wrapper.findComponent(Icon).exists()).toBe(true)
  //   expect(wrapper.find('.lz-button__icon--left').exists()).toBe(true)
  // })

  // it('renders icon on the right', () => {
  //   const Icon = () => <svg data-test="icon" />
  //   const wrapper = mount(() => <Button icon={<Icon />} iconPosition="right" />)
  //   expect(wrapper.find('.lz-button__icon--right').exists()).toBe(true)
  // })

  // it('renders icon only', () => {
  //   const Icon = () => <svg data-test="icon" />
  //   const wrapper = mount(() => <Button icon={<Icon />} iconPosition="only" />)
  //   expect(wrapper.text()).toBe('')
  //   expect(wrapper.find('.lz-button__icon--only').exists()).toBe(true)
  // })

  /* ---------- 4.4 主题 Token ---------- */
  it('inherits CSS variables for primary background', () => {
    const wrapper = mount(() => <Button type="primary" />)
    const bg = getComputedStyle(wrapper.element).getPropertyValue(
      '--lz-button-primary-bg'
    )
    expect(bg).toBe('#0052d9')
  })

  /* ---------- 4.5 交互增强 ---------- */
  // it('applies throttle on click', async () => {
  //   const fn = vi.fn()
  //   const wrapper = mount(() => <Button onClick={fn} throttle={200} />)
  //   wrapper.trigger('click')
  //   wrapper.trigger('click')
  //   expect(fn).toHaveBeenCalledTimes(1)
  // })

  // it('applies debounce on click', async () => {
  //   vi.useFakeTimers()
  //   const fn = vi.fn()
  //   const wrapper = mount(() => <Button onClick={fn} debounce={200} />)
  //   wrapper.trigger('click')
  //   vi.advanceTimersByTime(200)
  //   expect(fn).toHaveBeenCalledOnce()
  // })

  // it('sets autofocus', () => {
  //   const wrapper = mount(() => <Button autofocus />)
  //   expect(document.activeElement).toBe(wrapper.element)
  // })

  it('sets native-type to submit', () => {
    const wrapper = mount(() => <Button nativeType="submit" />)
    expect(wrapper.attributes('type')).toBe('submit')
  })

  /* ---------- 4.6 无障碍 ---------- */
  it('warns when aria-label is missing in dev mode', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(() => <Button />)
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('aria-label')
    )
    spy.mockRestore()
  })

  it('sets aria-label correctly', () => {
    const wrapper = mount(() => <Button aria-label="submit form" />)
    expect(wrapper.attributes('aria-label')).toBe('submit form')
  })

  it('fires click on Space key', async () => {
    const fn = vi.fn()
    const wrapper = mount(() => <Button onClick={fn} />)
    await wrapper.trigger('keydown', { code: 'Space' })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('fires click on Enter key', async () => {
    const fn = vi.fn()
    const wrapper = mount(() => <Button onClick={fn} />)
    await wrapper.trigger('keydown', { code: 'Enter' })
    expect(fn).toHaveBeenCalledOnce()
  })

  /* ---------- 4.7 响应式 ---------- */
  // it('increases min dimensions on touch device when responsive=true', () => {
  //   Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 1 })
  //   const wrapper = mount(() => <Button responsive />)
  //   expect(wrapper.classes()).toContain('lz-button--touch')
  // })

  // it('skips responsive sizing when responsive=false', () => {
  //   Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 1 })
  //   const wrapper = mount(() => <Button responsive={false} />)
  //   expect(wrapper.classes()).not.toContain('lz-button--touch')
  // })
})