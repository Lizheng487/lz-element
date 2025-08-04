import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lz-Element",
  description: "开发组件库",
  base: '/lz-element/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始', link: '/start' },
      { text: '组件', link: '/components/button' }
    ],

    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '开始', link: '/start' },
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
  }
})
