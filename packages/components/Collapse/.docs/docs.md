> 已将组件库名称统一替换为 **LzElement**；以下文档可直接复制使用。  

# LzElement「Collapse 折叠面板」需求文档  
> 版本：v0.1  
> 作者：产品经理  
> 日期：2025-07-30  

---

## 1. 背景与目标
- **背景**  
  市面上 Collapse 组件在「移动体验、嵌套层级、低代码配置」方面仍有痛点。  
- **目标**  
  打造 LzElement 多端一致的折叠面板，支持：  
  1. 任意层级嵌套  
  2. 手势 / 键盘 / 屏幕阅读器完整体验  
  3. 低代码平台「零代码」配置  

---

## 2. 需求范围（IN & OUT）

| IN | OUT |
|---|---|
| 折叠/展开动画、手风琴、嵌套 | 与业务数据耦合的搜索过滤 |
| 自定义标题、图标、禁用 | 复杂布局（Tab 内嵌 Collapse，由外层容器处理） |
| 主题 Token & 暗黑模式 | IE 11 兼容 |
| 无障碍 & 手势 | SSR 动画细节 |

---

## 3. 用户故事

| 角色 | 故事 | 验收标准 |
|---|---|---|
| 移动端用户 | 单指滑动即可展开/收起 | 手势区域 ≥ 44×44 px |
| 低代码运营 | 拖拽面板并在右侧面板勾选「手风琴」即可生效 | 无需手写代码 |
| 设计师 | 在 Figma 切换暗黑模式，组件自动跟随 | Token 同步 < 1 s |
| 无障碍用户 | 纯键盘可达，读屏器朗读当前状态 | WCAG 2.2 AA |

---

## 4. 功能需求

### 4.1 基础能力
| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modelValue` | `string \| string[]` | `[]` | 受控展开项 |
| `accordion` | `boolean` | `false` | 手风琴模式 |
| `nestable` | `boolean` | `true` | 允许任意层级嵌套 |
| `collapsible` | `boolean` | `true` | 是否可折叠（只读模式可设为 false） |

### 4.2 动画
- 高度过渡 `height 0.3s cubic-bezier(0.4, 0, 0.2, 1)`  
- 支持关闭动画：`animated=false`

### 4.3 手势与键盘
- 手势：左滑收起 / 右滑展开（移动端）  
- 键盘：↑/↓ 切换面板，Space/Enter 展开/收起  
- 屏幕阅读器：`aria-expanded`、`aria-controls`

### 4.4 主题 Token（LzElement Variables）
```css
:root {
  --lz-collapse-header-bg: #ffffff;
  --lz-collapse-header-color: #262626;
  --lz-collapse-border-radius: 6px;
  --lz-collapse-duration: 300ms;
}
```
暗黑模式自动映射至 `--dark` 前缀。

### 4.5 面板项属性
| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name`* | `string \| number` | - | 唯一键 |
| `title` | `string \| VNode` | '' | 标题 |
| `disabled` | `boolean` | `false` | 禁用 |
| `icon` | `string \| Component` | - | 自定义图标 |
| `extra` | `string \| VNode` | - | 右侧操作区 |

### 4.6 事件
| 事件 | 参数 | 说明 |
|---|---|---|
| `change` | `(activeNames: string[] \| string)` | 展开改变 |
| `expand` | `(name: string)` | 单个展开 |
| `collapse` | `(name: string)` | 单个收起 |

---

## 5. 非功能需求

| 维度 | 指标 |
|---|---|
| 性能 | 首次渲染 < 50 ms，嵌套 5 级不卡顿 |
| 包体 | ES 模块 ≤ 8 KB（gzip） |
| 浏览器 | Chrome ≥ 80, Safari ≥ 14, Edge ≥ 88 |
| 单测 | 覆盖率 ≥ 90% |
| 无障碍 | Lighthouse a11y ≥ 95 |

---

## 6. 低代码配置示例（JSON Schema）

```json
{
  "type": "object",
  "properties": {
    "accordion": { "type": "boolean", "default": false },
    "panels": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "disabled": { "type": "boolean" }
        },
        "required": ["title"]
      }
    }
  }
}
```

---

## 7. 验收标准（DoD）

- [ ] 支持 5 级嵌套无性能问题  
- [ ] 移动端手势 & 桌面键盘均通过人机测试  
- [ ] 暗黑模式切换无闪烁  
- [ ] 低代码 Demo 可在 5 min 内完成配置  
- [ ] Storybook 示例包含 RTL、暗黑、禁用、嵌套四种场景  

---

## 8. 里程碑

| 阶段 | 日期 | 交付物 |
|---|---|---|
| PRD 评审 | 8-02 | 本文档冻结 |
| Alpha | 8-25 | 功能 + 单测完成 |
| Beta | 9-10 | 文档 & 低代码插件 |
| 1.0 GA | 9-30 | 官网发布 |

---
