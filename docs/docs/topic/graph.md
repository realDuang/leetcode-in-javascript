# 图论算法

DFS 专题和 BFS 专题聚焦于网格上的搜索问题。本章进入**图论**领域——处理以邻接表/邻接矩阵表示的图结构，解决环检测、拓扑排序、二分图判定、带权最短路径等经典图论问题。

图可以看作树的泛化：树是无环连通图，图则允许环、多连通分量、带权边。从遍历角度，图上 DFS 与树上 DFS 的核心差异在于需要处理"重复访问"和"环路"。

## 前置知识

### 图的两种表示

| 表示方式 | 数据结构 | 适用场景 |
| -------- | -------- | -------- |
| **邻接表** | `graph[u]` 存储 u 的所有邻居 | 稀疏图（边少），遍历邻居 O(度数) |
| **邻接矩阵** | `matrix[u][v]` 存储 u→v 的边权 | 稠密图，O(1) 查询边是否存在 |

```ts
// 邻接表（无权有向图）
const graph: number[][] = Array.from({ length: n }, () => []);
for (const [from, to] of edges) {
  graph[from].push(to);
  // 无向图：graph[to].push(from);
}

// 邻接表（有权图）
const graph: { to: number; weight: number }[][] = Array.from({ length: n }, () => []);
for (const [from, to, w] of edges) {
  graph[from].push({ to, weight: w });
}
```

### 两个标记数组：visited 与 onPath

图上 DFS 通常需要两个独立的布尔数组，理解它们的区别至关重要：

| 标记数组 | 含义 | 生命周期 | 用途 |
| -------- | ---- | -------- | ---- |
| **visited** | 该节点是否**曾经被访问过** | 一旦设 true 不会改回 false | 避免重复遍历 |
| **onPath** | 该节点是否**在当前递归路径上** | 进入时设 true，退出时设回 false | 检测环 |

`visited` 用于多起点遍历时跳过已处理的节点，类似网格 DFS 的"淹没"标记。`onPath` 类似回溯中的撤销选择——如果再次遇到 `onPath` 为 true 的节点，说明从该节点出发走了一圈又回来了，存在环。

---

## 解题决策树

```
拿到一道图论题
│
├─ 图是 DAG，需要穷举所有路径？
│  └─ DFS + 路径回溯 ...................... → 见「一」
│
├─ 需要判断图中是否有环？
│  └─ DFS + onPath 标记 ................... → 见「二」
│
├─ 需要对依赖关系排序（拓扑排序）？
│  └─ DFS 后序反转 / BFS 入度法 ........... → 见「三」
│
├─ 需要判断二分图 / 两组划分？
│  └─ DFS/BFS 双色染色 .................... → 见「四」
│
└─ 图带权，求最短路径？
   └─ Dijkstra（优先队列 BFS） ............ → 见「五」
```

---

## 一、DAG 遍历：所有路径

**判断关键词**：所有可能路径、有向无环图、从起点到终点。

**适用场景**：在 DAG 中穷举从起点到终点的所有路径。

DAG 无环，所以不需要 visited 数组（不会重复访问同一节点）。遍历方式与回溯相似——维护 path 记录当前路径，递归所有邻居，退出时撤销选择。

```ts
const res: number[][] = [];

function dfs(graph: number[][], node: number, path: number[]) {
  path.push(node);

  if (node === target) {
    res.push([...path]);
    path.pop();
    return;
  }

  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, path);
  }

  path.pop();
}
```

题型参考（框架微调）：

| 题目 | 在 DAG 遍历框架上的微调点 |
| ---- | ------------------------- |
| `[797] 所有可能的路径` | 标准框架，起点为 0，终点为 n-1。 |

## 二、环检测

**判断关键词**：是否有环、能否完成所有课程、依赖循环。

**适用场景**：判断有向图中是否存在环。

核心思路：DFS 遍历时维护 `onPath` 数组标记当前递归路径上的节点。如果递归到一个 `onPath` 为 true 的节点，说明回到了当前路径上的某个祖先——存在环。同时用 `visited` 避免从多个起点重复遍历同一子图。

```ts
const visited: boolean[] = Array(n).fill(false);
const onPath: boolean[] = Array(n).fill(false);
let hasCycle = false;

function dfs(node: number) {
  if (onPath[node]) { hasCycle = true; return; }
  if (visited[node]) return;

  visited[node] = true;
  onPath[node] = true;

  for (const neighbor of graph[node]) {
    dfs(neighbor);
  }

  onPath[node] = false; // 离开当前路径（类似回溯）
}

// 从每个节点启动（处理非连通图）
for (let i = 0; i < n; i++) dfs(i);
```

题型参考（框架微调）：

| 题目 | 在环检测框架上的微调点 |
| ---- | ---------------------- |
| `[207] 课程表` | 标准环检测，有环则无法完成所有课程。 |

## 三、拓扑排序

**判断关键词**：课程顺序、依赖排序、先修后修、任务调度。

**适用场景**：对有向无环图（DAG）中的节点排出一个线性顺序，使得每条边 u→v 中 u 都排在 v 前面。有环图无法拓扑排序。

有两种实现方式，各有优势：

### 方式一：DFS 后序反转

拓扑排序 = DFS 后序遍历结果的反转。直觉：后序位置意味着"当前节点的所有后继都已处理完"，反转后就变成"当前节点排在所有后继之前"。

```ts
const res: number[] = [];
const visited: boolean[] = Array(n).fill(false);

function dfs(node: number) {
  if (visited[node]) return;
  visited[node] = true;

  for (const neighbor of graph[node]) {
    dfs(neighbor);
  }

  res.push(node); // 后序位置记录
}

for (let i = 0; i < n; i++) dfs(i);
res.reverse(); // 反转得到拓扑排序
```

### 方式二：BFS 入度法（Kahn 算法）

维护每个节点的入度，从入度为 0 的节点（无前置依赖）开始 BFS。每弹出一个节点，将其邻居的入度减 1，入度变为 0 的节点入队。最终如果所有节点都被处理过，则无环且结果即为拓扑序。

```ts
const indegree: number[] = Array(n).fill(0);
for (const [from, to] of edges) indegree[to]++;

const queue: number[] = [];
for (let i = 0; i < n; i++) {
  if (indegree[i] === 0) queue.push(i);
}

const res: number[] = [];
while (queue.length) {
  const node = queue.shift()!;
  res.push(node);

  for (const neighbor of graph[node]) {
    if (--indegree[neighbor] === 0) queue.push(neighbor);
  }
}
// res.length === n 说明无环，res 即为拓扑排序
```

题型参考（框架微调）：

| 题目 | 在拓扑排序框架上的微调点 |
| ---- | ------------------------ |
| `[210] 课程表 II` | 标准拓扑排序，输出课程学习顺序。 |

## 四、二分图判定

**判断关键词**：二分图、两组划分、交替染色。

**适用场景**：判断一个图能否将节点分成两组，使得每条边的两个端点分属不同组。

核心思路：用 DFS 对图进行**双色染色**。从任意未着色节点出发，染为颜色 A，所有邻居染为颜色 B，邻居的邻居再染 A……如果某一步发现邻居已被染了相同颜色，则不是二分图。

```ts
const color: number[] = Array(n).fill(0); // 0=未染色, 1=红, -1=蓝

function dfs(node: number, c: number): boolean {
  color[node] = c;

  for (const neighbor of graph[node]) {
    if (color[neighbor] === c) return false;     // 同色相邻 → 不是二分图
    if (color[neighbor] === 0 && !dfs(neighbor, -c)) return false;
  }

  return true;
}

// 处理非连通图
let isBipartite = true;
for (let i = 0; i < n; i++) {
  if (color[i] === 0 && !dfs(i, 1)) {
    isBipartite = false;
    break;
  }
}
```

题型参考（框架微调）：

| 题目 | 在二分图框架上的微调点 |
| ---- | ---------------------- |
| `[785] 判断二分图` | 标准双色染色，直接判断。 |
| `[886] 可能的二分法` | 将"不喜欢"关系建图，判断是否可二分。本质相同。 |

## 五、有权图最短路径：Dijkstra

**判断关键词**：加权图、最短路径、网络延迟、非负权重。

**适用场景**：求加权图中，从单一起点到所有其他节点的最短路径。要求边权非负。

**与 BFS 章节中无权最短路径的关系**：无权图中每步代价相同，普通 BFS 的"第一次到达 = 最短"天然成立。但边权不均匀时，先到达不等于最短，必须用**优先队列（最小堆）**替换普通队列，每次取出"当前距离最小"的节点扩展——这就是 Dijkstra 算法。

```ts
function dijkstra(graph: { to: number; weight: number }[][], start: number, n: number): number[] {
  const dist: number[] = Array(n).fill(Infinity);
  dist[start] = 0;

  // 优先队列：[距离, 节点]
  const pq: [number, number][] = [[0, start]];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // 简易实现，生产环境应使用堆
    const [d, u] = pq.shift()!;

    if (d > dist[u]) continue; // 已有更优路径，跳过

    for (const { to: v, weight: w } of graph[u]) {
      const newDist = dist[u] + w;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        pq.push([newDist, v]);
      }
    }
  }

  return dist;
}
```

题型参考（框架微调）：

| 题目 | 在 Dijkstra 框架上的微调点 |
| ---- | -------------------------- |
| `[743] 网络延迟时间` | 标准 Dijkstra，求所有节点最短距离后取最大值。 |

---

## 总结：解题速查表

| 题型 | 核心策略 | 典型题目 |
| ---- | -------- | -------- |
| DAG 所有路径 | DFS + 路径回溯 | `[797]` |
| 环检测 | DFS + `onPath` 标记 | `[207]` |
| 拓扑排序 | DFS 后序反转 / BFS 入度法 | `[210]` |
| 二分图判定 | DFS 双色染色 | `[785] [886]` |
| 有权最短路径 | Dijkstra（优先队列 BFS） | `[743]` |
