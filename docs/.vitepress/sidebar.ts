import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';
import type { DefaultTheme } from 'vitepress';

const categoryTitleMap: Record<string, string> = {
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

/**
 * Topic display order.
 * To add a new topic: create the .md file and add its slug here.
 * To reorder: just move lines around.
 */
const topicOrder: string[] = [
  // 基础篇
  'introduction',
  'recursive',
  'tree',
  // 数组技巧篇
  'sort',
  'two-pointers',
  'binary-search',
  'slide-window',
  'partial-sum',
  // 搜索与穷举篇
  'backtrack',
  'depth-first-search',
  'breadth-first-search',
  'graph',
  // 贪心与动态规划篇
  'greedy',
  'dynamic-programming-normal',
  'dynamic-programming-backpack',
  'dynamic-programming-subsequence',
  'dynamic-programming-state-machine',
  'dynamic-programming-interval',
  // 进阶数据结构篇
  'monotonic-stack'
];

function getCategoryTitle(name: string): string {
  return categoryTitleMap[name] || name;
}

/**
 * Extract the first `# heading` from a markdown file as its display title.
 * Falls back to the filename (without extension) if no heading is found.
 */
function extractTitleFromMd(filePath: string, fallback: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : fallback;
  } catch {
    return fallback;
  }
}

function getNumber(filename: string): number {
  return Number(filename.split('.')[0]);
}

function getMarkdownFiles(dir: string): string[] {
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'README.md' && f !== 'index.md')
    .sort((a, b) => getNumber(a) - getNumber(b));
}

function generateSidebarForList(docsRoot: string): DefaultTheme.SidebarItem[] {
  const listDir = join(docsRoot, 'docs', 'list');
  const categories = readdirSync(listDir).filter(f => statSync(join(listDir, f)).isDirectory());

  return categories.map(cat => {
    const catDir = join(listDir, cat);
    const files = getMarkdownFiles(catDir);
    return {
      text: getCategoryTitle(cat),
      collapsed: true,
      items: files.map(f => {
        const filePath = join(catDir, f);
        const slug = basename(f, '.md');
        return {
          text: extractTitleFromMd(filePath, slug),
          link: `/docs/list/${cat}/${slug}`
        };
      })
    };
  });
}

function generateSidebarForTopic(docsRoot: string): DefaultTheme.SidebarItem[] {
  const topicDir = join(docsRoot, 'docs', 'topic');

  return topicOrder
    .filter(slug => existsSync(join(topicDir, `${slug}.md`)))
    .map(slug => {
      const filePath = join(topicDir, `${slug}.md`);
      return {
        text: extractTitleFromMd(filePath, slug),
        link: `/docs/topic/${slug}`
      };
    });
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
