import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import apiTable from "vitepress-api-table";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LzElement",
  description: "开发组件库",
  base: '/lz-element/',
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始', link: '/get-started' },
      { text: '组件', link: '/components/button' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '开始', link: '/get-started' },
        ]
      },
      {
        text: '组件库',
        collapsed: false,
        items: [
          { text: 'Button', link: 'components/button' },
          { text: 'Collapse', link: 'components/collapse' },
          { text: 'Dropdown', link: 'components/dropdown' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lizheng487/lz-element' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview)
      md.use(componentPreview)
      md.use(apiTable)
    }
  }
})
