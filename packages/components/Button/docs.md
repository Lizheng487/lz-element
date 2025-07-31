# 自研组件库「Aurora UI」Button 组件需求文档

> 版本：v0.1  
> 日期：2025-07-30  
> 作者：产品经理  

---

## 1. 背景与目标

- **背景**  
  现有 Element、Ant Design Vue 等通用组件库虽功能丰富，但在「品牌主题深度定制、移动端体验、低代码集成」上仍有不足。  
- **目标**  
  打造一款「设计即代码」的轻量级 Vue3 组件库 Aurora UI，其中 Button 作为核心原子组件，需同时满足：  
  1. 设计系统无缝接入  
  2. 一次开发，多端适配（桌面 & 移动）  
  3. 低代码平台可配置  

---

## 2. 需求范围（IN & OUT）

| IN | OUT |
|---|---|
| 按钮视觉形态（类型、尺寸、状态） | 业务级逻辑（权限、埋点） |
| 主题 Token 体系 | 动画细节（由 Motion 子包独立提供） |
| 无障碍 & 国际化 | 旧版浏览器兼容（< Chrome 80） |
| 移动端触控优化 | 微信小程序组件 |

---

## 3. 用户故事

| 角色 | 故事 | 验收标准 |
|---|---|---|
| UI 设计师 | 通过 Figma 插件一键发布主题 Token | Token 同步到组件库 < 5s |
| 前端开发 | 在 Vite 项目内一行代码切换主题 | 不重新打包即可生效 |
| 产品经理 | 在低代码平台拖拽按钮并配置「节流」 | 平台仅暴露可配置属性 |
| 终端用户（移动） | 在 iOS Safari 点击按钮无延迟 | 响应延迟 < 100ms |

---

## 4. 功能需求

### 4.1 基础形态
| 维度 | 枚举值 | 默认 |
|---|---|---|
| type | `primary` / `secondary` / `success` / `warning` / `danger` / `link` | `secondary` |
| size | `xl` / `lg` / `md` / `sm` / `xs` | `md` |
| shape | `default` / `pill` / `circle` / `square` | `default` |
| variant | `fill` / `outline` / `ghost` / `light` | `fill` |

### 4.2 状态
- loading（加载）
- disabled（禁用）
- active（激活，用于按钮组）
- focus-visible（键盘焦点环）

### 4.3 图标
- 支持本地 SVG 组件、远程 SVG URL、iconfont class 三种方式
- 图标可位于 `left / right / only`

### 4.4 主题 Token（CSS Variables）
```css
:root {
  --aurora-button-primary-bg: #0052d9;
  --aurora-button-primary-color: #ffffff;
  --aurora-button-border-radius: 6px;
  --aurora-button-font-weight: 500;
}
```
- 需支持 HSL 动态计算，保证深色模式自动反转

### 4.5 交互增强
| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| throttle | Number | 0 | 节流时长(ms) |
| debounce | Number | 0 | 防抖时长(ms) |
| autofocus | Boolean | false |  |
| native-type | String | 'button' | button / submit / reset |

### 4.6 无障碍
- 遵循 WAI-ARIA 1.2  
- 必传 `aria-label`（空值时开发环境 warning）
- 键盘：Space / Enter 触发；焦点环高对比

### 4.7 响应式
- 在触摸设备自动将 `min-height / min-width` 提升至 44px  
- 提供 `responsive` 布尔开关，默认 `true`

---

## 5. 非功能需求

| 维度 | 要求 |
|---|---|
| 性能 | 首次加载 < 20 KB (gzip)，Tree-Shaking 友好 |
| 浏览器 | Chrome ≥ 80, Edge ≥ 88, Safari ≥ 14 |
| 框架 | Vue 3.x 原生 Composition API |
| 样式 | 纯 CSS Variables，无预处理器依赖 |
| 单测 | 覆盖率 ≥ 90% (lines, branches) |
| 文档 | Storybook + Markdown 双视图 |

---

## 6. API 草案（TypeScript）

```ts
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  shape?: 'default' | 'pill' | 'circle' | 'square';
  variant?: 'fill' | 'outline' | 'ghost' | 'light';
  loading?: boolean;
  disabled?: boolean;
  icon?: string | Component;
  iconPosition?: 'left' | 'right' | 'only';
  throttle?: number;
  debounce?: number;
  autofocus?: boolean;
  nativeType?: 'button' | 'submit' | 'reset';
  responsive?: boolean;
  'aria-label'?: string;
}
```

---

## 7. 验收标准（DoD）

- [ ] 所有功能需求通过单元测试 & e2e  
- [ ] 文档包含示例、Token 表、无障碍说明  
- [ ] 设计师 Figma 插件可导出 Token JSON 与组件库 100% 对齐  
- [ ] 在低代码平台 Demo 中拖拽可用，属性面板仅显示可配置项  
- [ ] Lighthouse Accessibility 得分 ≥ 95  

---

## 8. 里程碑

| 阶段 | 日期 | 交付物 |
|---|---|---|
| PRD 评审 | 8-02 | 本文档冻结 |
| Alpha 版 | 8-20 | 组件实现 + 单测 |
| Beta 版 | 9-05 | 文档 & 设计工具插件 |
| 1.0 GA | 9-20 | 官网 & 低代码集成示例 |

---

## 9. 风险与假设

| 风险 | 应对 |
|---|---|
| Token 动态切换性能瓶颈 | 使用 MutationObserver 监听 `<html>` 变量变化 |
| 设计师不更新 Figma 插件 | 提供 CI 脚本强制版本校验 |
| 低代码平台属性爆炸 | 仅暴露 `type, size, disabled, throttle` 4 项 |

---