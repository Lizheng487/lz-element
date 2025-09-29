---
search: false
next:
  link: /components/button
  text: Button 按钮
---

# LzElement 开发组件库

## 安装

```bash
npm i lz-element --save
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import LzElement from "lz-element";
// 引入样式
import "lz-element/dist/index.css";

import App from "./App.vue";
// 全局使用
createApp(App).use(LzElement).mount("#app");
```

```vue
<template>
  <lz-button>我是 Button</lz-button>
</template>
```

**单个导入**

LzElement 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <lz-button>我是 Button</lz-button>
</template>
<script>
import { LzButton } from " lz-element";
export default {
  components: { LzButton },
};
</script>
```


## 亮点

```html
- Vite + Vitest + Vitepress 工具链
- monorepo 分包管理
- github actions 实现 CI/CD 自动化部署
- Ai辅助：使用大模型Ai辅助完成需求分析，设计思路，快速实现组件，提升开发效率。
- npm 包,发布“开箱即用” 的 npm 包  " lz-element "
```
