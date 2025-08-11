# LzElement「Alert 警告提示」需求文档
> 版本：v0.1  
> 作者：产品经理  
> 日期：2025-07-31  

---

## 1. 背景与目标
- **背景**  
  现有通用组件库在「多场景样式、可关闭行为、无障碍语义、低代码配置」方面粒度不足。  
- **目标**  
  为 **LzElement** 设计一款轻量、语义化、高度可配的 Alert 组件，满足 B 端控制台、移动端 Hybrid、低代码平台三端一致体验。

---

## 2. 需求范围（IN & OUT）

| IN | OUT |
|---|---|
| 四种语义类型、可关闭、图标插槽 | 全局消息总线（由 Toast 组件负责） |
| 主题 Token & 暗黑模式 | 富文本编辑器内置 |
| 无障碍 ARIA & 键盘交互 | 服务端渲染样式闪烁处理（由框架统一） |
| 低代码可视化配置 | 权限控制逻辑 |

---

## 3. 用户故事

| 角色 | 故事 | 验收标准 |
|---|---|---|
| 前端开发 | 一行代码切换主题色，无需覆盖样式 | 变量热更新 < 1 s |
| 设计师 | 在 Figma Token 插件修改品牌色，自动同步组件 | 误差 ΔE < 1 |
| 运营 | 低代码平台勾选「可关闭」即可生成页面 | 零代码 |
| 无障碍用户 | 读屏器朗读「警告：xxx」并可键盘关闭 | WCAG 2.2 AA |

---

## 4. 功能需求

### 4.1 语义类型
| 名称 | 场景 | 默认图标 | 色彩 Token |
|---|---|---|---|
| `info` | 普通消息 | InfoCircle | `--lz-alert-info-*` |
| `success` | 成功 | CheckCircle | `--lz-alert-success-*` |
| `warning` | 警告 | WarningTriangle | `--lz-alert-warning-*` |
| `error` | 错误 | XCircle | `--lz-alert-error-*` |

### 4.2 可关闭行为
- 属性：`closable: boolean`（默认 `false`）  
- 关闭后触发 `@close` 事件，支持动画折叠高度 `height 0.2s`

### 4.3 图标与插槽
| 插槽名 | 说明 |
|---|---|
| `icon` | 替换左侧图标 |
| `title` | 标题区域 |
| `default` | 正文 |
| `extra` | 右侧操作区（按钮、链接） |

### 4.4 主题 Token（CSS Variables）
```css
:root {
  --lz-alert-border-radius: 4px;
  --lz-alert-font-size: 14px;
  --lz-alert-icon-size: 16px;
  --lz-alert-padding-x: 12px;
  --lz-alert-padding-y: 8px;
}
```
暗黑模式自动映射 `--lz-dark-alert-*`。

### 4.5 无障碍
- 角色 `role="alert"` 或 `role="status"`（根据类型自动选择）  
- 关闭按钮 `aria-label="关闭"`  
- 键盘：`Tab` 聚焦关闭按钮，`Enter / Space` 触发

### 4.6 响应式
- 移动端自动增加上下内边距 `padding-y: 12px`  
- 可通过 `responsive: boolean` 关闭

---

## 5. API 草案（TypeScript）

```ts
export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  closable?: boolean;
  showIcon?: boolean;
  title?: string;
  responsive?: boolean;
  role?: 'alert' | 'status';
}
export interface AlertEmits {
  close: [evt: MouseEvent];
}
```

---

## 6. 非功能需求

| 维度 | 指标 |
|---|---|
| 性能 | 首次渲染 ≤ 20 ms |
| 包体 | ≤ 5 KB（gzip + treeshaking） |
| 浏览器 | Chrome ≥ 80, Safari ≥ 14 |
| 单测 | 覆盖率 ≥ 90% |
| 无障碍 | Lighthouse a11y ≥ 95 |

---

## 7. 低代码配置示例（JSON Schema）

```json
{
  "type": "object",
  "properties": {
    "type": { "type": "string", "enum": ["info","success","warning","error"], "default": "info" },
    "closable": { "type": "boolean", "default": false },
    "title": { "type": "string" },
    "content": { "type": "string" }
  },
  "required": ["content"]
}
```

---

## 8. 验收标准（DoD）

- [ ] 四种语义色 + 暗黑模式视觉走查通过  
- [ ] 关闭动画流畅，无回流闪烁  
- [ ] 键盘 & 读屏器测试通过  
- [ ] 低代码平台 5 min 内完成配置  
- [ ] Storybook 包含 RTL、暗黑、可关闭示例

---

## 9. 里程碑

| 阶段 | 日期 | 交付物 |
|---|---|---|
| PRD 评审 | 8-02 | 本文档冻结 |
| Alpha | 8-20 | 组件实现 + 单测 |
| Beta | 9-05 | 文档 & 设计插件 |
| 1.0 GA | 9-20 | 官网发布 |

---
