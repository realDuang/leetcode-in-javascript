import { defineConfig } from 'vitepress';
import { generateSidebar } from './sidebar';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsRoot = resolve(__dirname, '..');

const sidebar = generateSidebar(docsRoot);

export default defineConfig({
  title: 'Leetcode-in-JavaScript',
  description: '使用 JavaScript 的 Leetcode 题解仓库',
  lang: 'zh-CN',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '📖 题解', link: '/docs/list/array/1.two-sum' },
      { text: '📖 专题', link: '/docs/topic/0.introduction' }
    ],

    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/realduang/leetcode-in-javascript' }],

    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'MIT LICENSE',
      copyright: 'Copyright © 2019-present by Duang'
    }
  }
});
