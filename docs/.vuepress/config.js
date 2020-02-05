const sortFn = key => (a, b) => {
  const numberA = Number(a[key].split('[')[1].split(']')[0]);
  const numberB = Number(b[key].split('[')[1].split(']')[0]);
  return numberA - numberB;
};

module.exports = {
  base: '/leetcode-archive/',
  title: 'Leetcode-in-JS',
  description: '使用JS的leetcode题解仓库',
  themeConfig: {
    repo: 'https://github.com/kelekexiao123/leetcode-archive',
    repoLabel: 'GitHub',
    nav: [{ text: 'Home', link: '/' }],
  },
  plugins: {
    'vuepress-plugin-auto-sidebar': {
      sort: sortFn,
      titleMap: {
        blog: '📖 题库列表',
      },
    },
  },
};
