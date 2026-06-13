import { defineConfig } from 'vitepress';
import { generateSidebar } from './sidebar';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsRoot = resolve(__dirname, '..');

const sidebar = generateSidebar(docsRoot);

export default defineConfig({
  title: 'LeetCode 通关手册',
  description: '框架通解 · 举一反三 —— LeetCode 题解与算法专题笔记',
  lang: 'zh-CN',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '📖 题解', link: '/docs/list/array/1.two-sum' },
      { text: '📖 专题', link: '/docs/topic/introduction' }
    ],

    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/realduang/leetcode-in-javascript' }],

    outline: {
      level: [2, 3],
      label: '章节导航'
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'MIT LICENSE',
      copyright: 'Copyright © 2019-present by Duang'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题'
  },

  markdown: {
    headers: {
      level: [2, 3]
    }
  }
});
