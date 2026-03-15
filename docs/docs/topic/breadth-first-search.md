# BFS：最短路径与状态空间搜索

二叉树章节中已经介绍了树上的 BFS（层序遍历）。本章聚焦 BFS 在**网格**和**抽象状态图**上的应用。BFS 的核心优势只有一条：**在无权图（每步代价相同）中，第一次到达某个节点时的路径一定是最短的**。所有"最短路径 / 最少步数"类问题，都应该优先考虑 BFS。

与 DFS 的选择策略：

- 需要**最短路径 / 最少步数** → BFS（按层扩散，首次到达即最优）
- 需要**穷举所有方案 / 路径** → DFS / 回溯（深入到底再回溯）
- 需要**搜索连通区域** → DFS 通常更简洁（递归天然适合标记连通分量）

## 前置知识

### 网格/图 BFS 框架

与树上 BFS 的区别：树天然无环且方向单一（父→子），不需要 visited；网格和图可能从多个方向重复到达同一节点，必须用 visited 避免重复入队。

```ts
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function bfs(grid: number[][], startR: number, startC: number): number {
  const queue: [number, number][] = [[startR, startC]];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[startR][startC] = true;
  let step = 0;

  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const [r, c] = queue.shift()!;
      if (isTarget(r, c)) return step;

      for (const [dr, dc] of directions) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        if (visited[nr][nc] || grid[nr][nc] === obstacle) continue;

        visited[nr][nc] = true; // 关键：入队时标记
        queue.push([nr, nc]);
      }
    }
    step++;
  }
  return -1;
}
```

### visited 标记时机：入队时而非出队时

这是 BFS 最容易出错的细节。**必须在入队时标记 visited**——如果在出队时才标记，同一个节点可能被多个邻居同时入队，导致重复处理和队列膨胀。

```
入队时标记（正确）：A 的邻居 X 入队时立即标记 → B 发现 X 已标记 → 不重复入队
出队时标记（错误）：A 的邻居 X 入队 → B 也把 X 入队 → X 被处理两次
```

---

## 解题决策树

```
拿到一道 BFS 题（非树结构）
│
├─ 在网格上求最短路径 / 最少步数？
│  └─ 标准网格 BFS ........................ → 见「一」
│
├─ 多个起点同时扩散 / 求每个格子到最近源的距离？
│  └─ 多源 BFS ........................... → 见「二」
│
└─ 节点不是物理坐标，而是抽象状态（字符串、数组等）？
   └─ 状态空间 BFS ....................... → 见「三」
```

---

## 一、网格最短路径

**判断关键词**：最短路径、最少步数、网格中从 A 到 B。

**适用场景**：在二维网格中求从起点到终点的最短路径长度。

直接套用前置知识中的网格 BFS 框架。关注点只在方向数组（四向 / 八向）和障碍物判定的调整。

题型参考（框架微调）：

| 题目 | 在网格 BFS 框架上的微调点 |
| ---- | ------------------------- |
| `[1091] 二进制矩阵中的最短路径` | 八方向移动（directions 从 4 个扩展到 8 个），起点终点在对角。 |
| `[529] 扫雷游戏` | BFS 展开空白格，遇到数字格停止扩展但更新显示值。 |

## 二、多源 BFS

**判断关键词**：所有 X 到最近 Y 的距离、同时从多个源点出发、距离场。

**适用场景**：需要计算网格中每个格子到最近目标的距离，或从多个起点同时向外扩散。

如果对每个格子单独做一次 BFS 求最近距离，复杂度是 O(M²N²)。**多源 BFS** 的技巧：一次性将所有源点入队作为第 0 层，然后正常 BFS 扩散。每个格子只被访问一次，复杂度降为 O(MN)。

直觉上可以想象为"同时从所有源点向外丢石子，水波同时扩散，每个格子被第一个到达的水波决定距离"。

```ts
const queue: [number, number][] = [];
const dist = Array.from({ length: rows }, () => Array(cols).fill(-1));

// 所有源点同时入队
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (isSource(grid[r][c])) {
      queue.push([r, c]);
      dist[r][c] = 0;
    }
  }
}

// 标准 BFS 扩散
while (queue.length) {
  const [r, c] = queue.shift()!;
  for (const [dr, dc] of directions) {
    const nr = r + dr, nc = c + dc;
    if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
    if (dist[nr][nc] !== -1) continue;

    dist[nr][nc] = dist[r][c] + 1;
    queue.push([nr, nc]);
  }
}
```

题型参考（框架微调）：

| 题目 | 在多源 BFS 框架上的微调点 |
| ---- | ------------------------- |
| `[542] 01 矩阵` | 所有 0 格作为源点入队，求每个 1 格到最近 0 格的距离。 |
| `[1162] 地图分析` | 所有陆地作为源点入队，求离陆地最远的海洋格的距离。 |

## 三、抽象状态空间 BFS

**判断关键词**：最少操作次数、状态转换、每步变换一个字符/位置。

**适用场景**：节点不是物理坐标，而是抽象状态（字符串、数组排列等），每次操作产生新状态，求从初始状态到目标状态的最少操作次数。

关键洞察：**把每个状态看作图中的一个节点，每次合法操作就是一条边**，问题就转化为标准的无权图最短路径——直接套 BFS。与网格 BFS 的唯一区别是"邻居"的生成方式：网格用方向数组，状态空间用"所有合法的一步操作"。

```ts
function bfs(start: string, target: string): number {
  const queue: string[] = [start];
  const visited = new Set<string>([start]);
  let step = 0;

  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const curr = queue.shift()!;
      if (curr === target) return step;

      for (const next of getNeighbors(curr)) {
        if (visited.has(next)) continue;
        visited.add(next);
        queue.push(next);
      }
    }
    step++;
  }
  return -1;
}
```

每道题的差异全部体现在 `getNeighbors` 的实现上——如何从当前状态生成所有合法的下一步状态：

题型参考（框架微调）：

| 题目 | 在状态空间 BFS 框架上的微调点 |
| ---- | ----------------------------- |
| `[127] 单词接龙` | 状态 = 单词字符串，邻居 = 改变一个字母后仍在词典中的单词。 |
| `[752] 打开转盘锁` | 状态 = 4 位数字串，邻居 = 任意一位 ±1，需排除死亡数字。 |
| `[773] 滑动谜题` | 状态 = 棋盘序列化字符串，邻居 = 空格与相邻格交换后的状态。 |

---

## 总结：解题速查表

| 题型 | 核心策略 | 典型题目 |
| ---- | -------- | -------- |
| 网格最短路径 | 标准 BFS + 方向数组 | `[1091] [529]` |
| 多源 BFS | 所有源点同时入队，一次扩散 | `[542] [1162]` |
| 抽象状态空间 | 状态当节点，操作当边 | `[127] [752] [773]` |
