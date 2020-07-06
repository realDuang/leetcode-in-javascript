const sortFn = (a, b) => {
  // ex: 'blog/array/169.majorityElement'
  const numberA = Number(a.split('/')[2].split('.')[0]);
  const numberB = Number(b.split('/')[2].split('.')[0]);
  return numberA - numberB;
};

const getConfig = require('vuepress-bar');
const barConfig = getConfig(`${__dirname}/..`);

function changeTitleInBar(sidebar, titleMap) {
  if (!Array.isArray(sidebar)) return sidebar;
  return sidebar.map(bar => {
    if (bar.title && titleMap[bar.title]) {
      bar.title = titleMap[bar.title];
    }
    if (Array.isArray(bar.children)) {
      if (bar.children[0] && typeof bar.children[0] === 'string') {
        bar.children.sort(sortFn);
      } else {
        changeTitleInBar(bar.children, titleMap);
      }
    }
    return bar;
  });
}

const titleMap = {
  List: '📖 题库列表',
  Home: '首页',
  Array: '数组',
  Backtracking: '回溯法',
  'Binary Search': '二分查找',
  'Bit Manipulation': '位运算',
  'Depth First-Search': '深度优先查找',
  'Divide and-Conquer': '分治法',
  'Dynamic Programming': '动态规划',
  Greedy: '贪心法',
  'Hash Table': '哈希表',
  Heap: '堆',
  'Linked List': '链表',
  Math: '数学',
  'Sliding Window': '滑动窗口',
  Stack: '栈',
  String: '字符串',
  Tree: '树',
  'Two Pointers': '双指针',
  Unknown: '未分类'
};

let customSidebar = {};
if (Array.isArray(barConfig.sidebar)) {
  customSidebar = changeTitleInBar(barConfig.sidebar, titleMap);
} else {
  // 若存在nav，sidebar返回Object
  Object.entries(barConfig.sidebar).forEach(([key, value]) => {
    customSidebar[key] = changeTitleInBar(value, titleMap);
  });
}

module.exports = {
  base: '/leetcode-in-javascript/',
  title: 'Leetcode-in-JavaScript',
  description: '使用 JavaScript 的 Leetcode 题解仓库',
  themeConfig: {
    repo: 'https://github.com/duang-repo/leetcode-in-javascript',
    repoLabel: 'GitHub',
    nav: [{ text: 'Home', link: '/' }, ...barConfig.nav],
    sidebar: customSidebar
  }
};
