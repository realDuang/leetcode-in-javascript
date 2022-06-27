import getConfig from 'vuepress-bar';

const { nav, sidebar } = getConfig(`${__dirname}/..`, {
  maxLevel: 3
});

const sortFn = (a: string, b: string) => {
  // ex: 'docs/list/array/15.3sum', 'docs/topic/1.backtrack'
  const pathA = a.split('/');
  const pathB = b.split('/');
  const numberA = Number(pathA[pathA.length - 1].split('.')[0]);
  const numberB = Number(pathB[pathB.length - 1].split('.')[0]);
  return numberA - numberB;
};

const titleMap = {
  Docs: '题库',
  List: '📖 题解',
  Topic: '📖 专题',
  Array: '数组',
  Backtracking: '回溯法',
  'Binary Search': '二分查找',
  'Bit Manipulation': '位运算',
  'Breadth First-Search': '广度优先搜索',
  'Depth First-Search': '深度优先搜索',
  'Divide and-Conquer': '分治法',
  'Dynamic Programming': '动态规划',
  Design: '设计题',
  Graph: '图',
  Greedy: '贪心法',
  'Hash Table': '哈希表',
  Heap: '堆',
  'Linked List': '链表',
  Math: '数学',
  'Sliding Window': '滑动窗口',
  Sort: '排序',
  Stack: '栈',
  String: '字符串',
  Tree: '树',
  Trie: '查找树',
  'Two Pointers': '双指针',
  Unknown: '未分类'
};

function changeTitleInBar(sidebar) {
  if (!Array.isArray(sidebar)) {
    return sidebar;
  }

  return sidebar.map(bar => {
    if (bar.title && titleMap[bar.title]) {
      bar.title = titleMap[bar.title];
    }

    if (Array.isArray(bar.children)) {
      if (bar.children[0] && typeof bar.children[0] === 'string') {
        bar.children.sort(sortFn);
      } else {
        changeTitleInBar(bar.children);
      }
    }
    return bar;
  });
}

let customSidebar;
if (Array.isArray(sidebar)) {
  customSidebar = changeTitleInBar(sidebar);
} else {
  // 若存在nav，sidebar返回Object
  Object.entries(sidebar).forEach(([key, value]) => {
    customSidebar[key] = changeTitleInBar(value);
  });
}

module.exports = {
  base: '/leetcode-in-javascript/',
  title: 'Leetcode-in-JavaScript',
  description: '使用 JavaScript 的 Leetcode 题解仓库',
  themeConfig: {
    repo: 'https://github.com/realduang/leetcode-in-javascript',
    repoLabel: 'GitHub',
    nav: [
      { text: '首页', link: '/' },
      { text: '📖 题解', link: '/docs/list/array/1.two-sum' },
      { text: '📖 专题', link: '/docs/topic/0.introduction' },
      ...nav
    ],
    sidebar: sidebar
  }
};
