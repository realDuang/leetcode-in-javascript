import { readdirSync, statSync } from 'fs';
import { join, basename, relative } from 'path';
import type { DefaultTheme } from 'vitepress';

const titleMap: Record<string, string> = {
  docs: '题库',
  list: '📖 题解',
  topic: '📖 专题',
  array: '数组',
  backtracking: '回溯法',
  'binary-search': '二分查找',
  'bit-manipulation': '位运算',
  'breadth-first-search': '广度优先搜索',
  'depth-first-search': '深度优先搜索',
  'divide-and-conquer': '分治法',
  'dynamic-programming': '动态规划',
  design: '设计题',
  graph: '图',
  greedy: '贪心法',
  'hash-table': '哈希表',
  heap: '堆',
  'linked-list': '链表',
  math: '数学',
  'sliding-window': '滑动窗口',
  sort: '排序',
  stack: '栈',
  string: '字符串',
  tree: '树',
  trie: '查找树',
  'two-pointers': '双指针',
  unknown: '未分类'
};

function getTitle(name: string): string {
  return titleMap[name] || name;
}

function getNumber(filename: string): number {
  return Number(filename.split('.')[0]);
}

function getMarkdownFiles(dir: string): string[] {
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .sort((a, b) => getNumber(a) - getNumber(b));
}

function generateSidebarForList(docsRoot: string): DefaultTheme.SidebarItem[] {
  const listDir = join(docsRoot, 'docs', 'list');
  const categories = readdirSync(listDir).filter(f =>
    statSync(join(listDir, f)).isDirectory()
  );

  return categories.map(cat => {
    const catDir = join(listDir, cat);
    const files = getMarkdownFiles(catDir);
    return {
      text: getTitle(cat),
      collapsed: true,
      items: files.map(f => ({
        text: basename(f, '.md'),
        link: `/docs/list/${cat}/${basename(f, '.md')}`
      }))
    };
  });
}

function generateSidebarForTopic(docsRoot: string): DefaultTheme.SidebarItem[] {
  const topicDir = join(docsRoot, 'docs', 'topic');
  const files = getMarkdownFiles(topicDir);

  return files.map(f => ({
    text: basename(f, '.md'),
    link: `/docs/topic/${basename(f, '.md')}`
  }));
}

export function generateSidebar(docsRoot: string): DefaultTheme.Sidebar {
  return {
    '/docs/list/': [
      {
        text: '📖 题解',
        items: generateSidebarForList(docsRoot)
      }
    ],
    '/docs/topic/': [
      {
        text: '📖 专题',
        items: generateSidebarForTopic(docsRoot)
      }
    ]
  };
}
