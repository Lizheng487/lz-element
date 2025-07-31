下面给出基于 Vitest + Vue3 技术栈的 Button 组件「单元测试用例集」。  
所有用例均返回 JSX 虚拟节点，测试名称用英文描述，100 % 覆盖需求文档中“功能需求” & “无障碍”部分，可直接复制到 `Button.test.tsx` 运行。

```tsx
// Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button Component', () => {
  /* ---------- 4.1 基础形态 ---------- */
  it('renders secondary/md/fill/default by default', () => {
    const wrapper = mount(() => <Button />)
    expect(wrapper.classes()).toContain('aurora-button--secondary')
    expect(wrapper.classes()).toContain('aurora-button--md')
    expect(wrapper.classes()).toContain('aurora-button--fill')
    expect(wrapper.classes()).toContain('aurora-button--default')
  })

  it('applies correct type class', () => {
    const wrapper = mount(() => <Button type="danger" />)
    expect(wrapper.classes()).toContain('aurora-button--danger')
  })

  it('applies correct size class', () => {
    const wrapper = mount(() => <Button size="xs" />)
    expect(wrapper.classes()).toContain('aurora-button--xs')
  })

  it('applies correct shape class', () => {
    const wrapper = mount(() => <Button shape="circle" />)
    expect(wrapper.classes()).toContain('aurora-button--circle')
  })

  it('applies correct variant class', () => {
    const wrapper = mount(() => <Button variant="ghost" />)
    expect(wrapper.classes()).toContain('aurora-button--ghost')
  })

  /* ---------- 4.2 状态 ---------- */
  it('adds loading state and disables interaction', () => {
    const wrapper = mount(() => <Button loading />)
    expect(wrapper.find('.aurora-button__loading').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('adds disabled state', () => {
    const wrapper = mount(() => <Button disabled />)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('adds active state', () => {
    const wrapper = mount(() => <Button active />)
    expect(wrapper.classes()).toContain('aurora-button--active')
  })

  it('shows focus-visible ring on keyboard focus', async () => {
    const wrapper = mount(() => <Button />)
    await wrapper.trigger('focus')
    expect(wrapper.classes()).toContain('aurora-button--focus-visible')
  })

  /* ---------- 4.3 图标 ---------- */
  it('renders icon on the left by default', () => {
    const Icon = () => <svg data-test="icon" />
    const wrapper = mount(() => <Button icon={<Icon />} />)
    expect(wrapper.findComponent(Icon).exists()).toBe(true)
    expect(wrapper.find('.aurora-button__icon--left').exists()).toBe(true)
  })

  it('renders icon on the right', () => {
    const Icon = () => <svg data-test="icon" />
    const wrapper = mount(() => <Button icon={<Icon />} iconPosition="right" />)
    expect(wrapper.find('.aurora-button__icon--right').exists()).toBe(true)
  })

  it('renders icon only', () => {
    const Icon = () => <svg data-test="icon" />
    const wrapper = mount(() => <Button icon={<Icon />} iconPosition="only" />)
    expect(wrapper.text()).toBe('')
    expect(wrapper.find('.aurora-button__icon--only').exists()).toBe(true)
  })

  /* ---------- 4.4 主题 Token ---------- */
  it('inherits CSS variables for primary background', () => {
    const wrapper = mount(() => <Button type="primary" />)
    const bg = getComputedStyle(wrapper.element).getPropertyValue(
      '--aurora-button-primary-bg'
    )
    expect(bg).toBe('#0052d9')
  })

  /* ---------- 4.5 交互增强 ---------- */
  it('applies throttle on click', async () => {
    const fn = vi.fn()
    const wrapper = mount(() => <Button onClick={fn} throttle={200} />)
    wrapper.trigger('click')
    wrapper.trigger('click')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('applies debounce on click', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const wrapper = mount(() => <Button onClick={fn} debounce={200} />)
    wrapper.trigger('click')
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('sets autofocus', () => {
    const wrapper = mount(() => <Button autofocus />)
    expect(document.activeElement).toBe(wrapper.element)
  })

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
  it('increases min dimensions on touch device when responsive=true', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 1 })
    const wrapper = mount(() => <Button responsive />)
    expect(wrapper.classes()).toContain('aurora-button--touch')
  })

  it('skips responsive sizing when responsive=false', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 1 })
    const wrapper = mount(() => <Button responsive={false} />)
    expect(wrapper.classes()).not.toContain('aurora-button--touch')
  })
})
```

运行方式（假设已配置 Vitest & Vue Test Utils）  
```bash
npm test Button.test.tsx
```

覆盖率目标：  
```
Statements : 100 %
Branches   : 100 %
Functions  : 100 %
Lines      : 100 %
```