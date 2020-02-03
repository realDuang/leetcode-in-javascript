module.exports = {
  base: '/leetcode-archive/', //站点的基础路径
  title: 'Leetcode-in-JS',
  description: '使用JS的leetcode题解仓库',
  themeConfig: {
    repo: 'https://github.com/kelekexiao123/leetcode-archive',
    repoLabel: 'GitHub',
    nav: [{ text: 'Home', link: '/' }],
  },
  plugins: {
    'vuepress-plugin-auto-sidebar': {
      titleMap: {
        blog: '📖 题库列表',
      },
    },
  },
};
