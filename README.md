# LeetCode in JavaScript / TypeScript

> **框架通解 · 举一反三 · 真正学会解题，而不是背题。**

LeetCode 题解仓库，收录 **300+ 道题目**的 JavaScript / TypeScript 解法，按数据结构与算法分类整理。

但这个仓库**不只是题解集合**——更重要的是配套的 **[专题文档站](https://realduang.github.io/leetcode-in-javascript)**，它系统梳理了各类经典题型的**解题框架与通用模板**，帮你从"这道题怎么做"升级为"这类题怎么解"。

## 🌟 为什么要看专题文档？

刷 LeetCode 最常见的困境：题做了几百道，换一道还是不会。根本原因是 **只在记忆解法，没有掌握框架**。

本仓库的专题文档正是为了解决这个问题——每一篇专题都在提炼一类题型的 **核心思维模型和代码框架**，让你拿到一道新题时能够：

1. **识别题型** → 这是哪类问题？
2. **套用框架** → 这类问题的通用解法结构是什么？
3. **灵活变通** → 这道题在框架基础上需要做什么调整？

## 📖 专题目录

以下 15 篇专题覆盖了 LeetCode 最核心的算法知识体系，建议按顺序阅读：

| #   | 专题                                                                                                                              | 关键内容                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 0   | [前言](https://realduang.github.io/leetcode-in-javascript/docs/topic/0.introduction.html)                                         | 写给工程师的算法学习观：提炼思想，拓展视野，而非做题家 |
| 1   | [重新认识递归](https://realduang.github.io/leetcode-in-javascript/docs/topic/1.recursive.html)                                    | 递归的本质、思维方式与代码模板——一切高级算法的基石     |
| 2   | [二叉树遍历算法](https://realduang.github.io/leetcode-in-javascript/docs/topic/2.tree.html)                                       | 前/中/后序遍历框架，理解"遍历"与"分解问题"两种思路     |
| 3   | [二叉搜索树](https://realduang.github.io/leetcode-in-javascript/docs/topic/3.binary-search-tree.html)                             | BST 的性质利用、增删查改操作框架                       |
| 4   | [排序算法](https://realduang.github.io/leetcode-in-javascript/docs/topic/4.sort.html)                                             | 经典排序算法对比与实现，理解分治与交换的思想           |
| 5   | [双指针问题](https://realduang.github.io/leetcode-in-javascript/docs/topic/5.two-pointers.html)                                   | 快慢指针、左右指针、滑动窗口——线性结构问题的利器       |
| 6   | [二分搜索专题](https://realduang.github.io/leetcode-in-javascript/docs/topic/6.binary-search.html)                                | 统一二分搜索框架，彻底搞定边界问题                     |
| 7   | [回溯问题](https://realduang.github.io/leetcode-in-javascript/docs/topic/7.backtrack.html)                                        | 排列/组合/子集的通用回溯框架，一套模板解决一类问题     |
| 8   | [深度优先搜索 (DFS)](https://realduang.github.io/leetcode-in-javascript/docs/topic/8.depth-first-search.html)                     | 岛屿问题、连通分量、FloodFill 的 DFS 通解              |
| 9   | [广度优先搜索 (BFS)](https://realduang.github.io/leetcode-in-javascript/docs/topic/9.breadth-first-search.html)                   | 最短路径、层序遍历的 BFS 框架与变体                    |
| 10  | [动态规划 - 问题推导](https://realduang.github.io/leetcode-in-javascript/docs/topic/10.dynamic-programming-normal.html)           | DP 的思维推导过程：状态定义 → 转移方程 → 边界处理      |
| 11  | [动态规划 - 背包问题](https://realduang.github.io/leetcode-in-javascript/docs/topic/11.dynamic-programming-backpack.html)         | 0-1 背包、完全背包的通用框架与空间优化                 |
| 12  | [动态规划 - 子序列问题](https://realduang.github.io/leetcode-in-javascript/docs/topic/12.%20dynamic-programming-subsequence.html) | LCS、LIS 等经典子序列 DP 模型                          |
| 13  | [图遍历算法](https://realduang.github.io/leetcode-in-javascript/docs/topic/13.graph.html)                                         | 图的表示、遍历、环检测与拓扑排序                       |
| 14  | [单调栈算法](https://realduang.github.io/leetcode-in-javascript/docs/topic/14.monotonic-stack.html)                               | 单调栈框架：下一个更大元素、柱状图等问题的通解         |

> 📌 **推荐学习路径**：递归 → 二叉树 → 回溯 → DFS/BFS → 动态规划 → 其他专题

## 📂 题解分类

所有题解按算法/数据结构分为 **22 个类别**，每道题都有完整的思路注释：

<table>
<tr>
<td>

| 分类     | 题数 |
| -------- | ---- |
| 动态规划 | 71   |
| 二叉树   | 38   |
| 双指针   | 22   |
| 回溯     | 20   |
| 数组     | 19   |
| 二分查找 | 18   |
| 链表     | 14   |
| 数学     | 14   |
| DFS      | 13   |

</td>
<td>

| 分类     | 题数 |
| -------- | ---- |
| 栈       | 12   |
| BFS      | 11   |
| 哈希表   | 11   |
| 滑动窗口 | 10   |
| 贪心     | 9    |
| 字符串   | 8    |
| 图       | 6    |
| 堆       | 4    |
| 其他     | 13   |

</td>
</tr>
</table>

## 🛠️ 开发环境

- **Node.js** >= 20
- **pnpm** >= 9

## 📋 常用命令

```bash
pnpm dev          # 本地启动文档站
pnpm build        # 构建文档站
pnpm typecheck    # TypeScript 类型检查
pnpm lint         # ESLint 检查
pnpm format       # Prettier 格式化
pnpm check        # 完整基础检查 (typecheck + lint + format:check)
```

## 🤝 参与贡献

如发现题解有误或有更优解法，欢迎提 [Issue](https://github.com/realDuang/leetcode-in-javascript/issues) 或 [Pull Request](https://github.com/realDuang/leetcode-in-javascript/pulls)，不胜感激。

## 📄 License

[MIT](./LICENSE) © Duang
