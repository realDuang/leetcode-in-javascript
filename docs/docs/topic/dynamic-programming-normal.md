# 动态规划：入门与线性/坐标模型

动态规划最容易让人误解的地方，是把它当成一堆题型结论去背。

其实 DP 真正训练的是两件事：

1. 能不能把原问题拆成更小的子问题。
2. 能不能让这些子问题按某种顺序复用答案。

如果暴力递归里出现了**重复计算**，就应该开始怀疑：这题是不是可以改写成动态规划。

这一篇先解决最基础也最常见的两大类：

1. **线性 DP**：状态沿着数组下标、时间、台阶编号向前推进。
2. **坐标 DP**：状态定义在二维网格、矩阵、三角形等坐标系上。

## 解题决策树

```text
拿到一道“最优值 / 方案数”问题
│
├─ 暴力递归是否有重复子问题？
│  └─ 是 → 可以考虑动态规划
│
├─ 状态只和前面几个位置有关？
│  └─ 是 → 线性 DP ............................ → 见「一」
│
├─ 状态定义在网格 / 矩阵 / 三角形坐标上？
│  └─ 是 → 坐标 DP ............................ → 见「二」
│
└─ 状态不是一条线也不是二维坐标？
   └─ 继续判断：背包 / 双序列 / 状态机 / 区间划分
```

## 一、线性 DP

**判断关键词**：第 `i` 项、前 `i` 项、走到第 `i` 阶、到第 `i` 天、以 `i` 结尾、前缀最优值。

线性 DP 的核心是：

1. 状态通常写成 `dp[i]`。
2. `dp[i]` 只依赖前面有限个状态，或者依赖前缀中的某些最优值。
3. 计算顺序通常是从左到右。

### 1.1 最朴素模板

```ts
function linearDp(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(0);

  // base case
  dp[0] = initialValue(nums[0]);

  for (let i = 1; i < n; i++) {
    dp[i] = transition(dp, nums, i);
  }

  return dp[n - 1];
}
```

真正要填的只有 3 个位置：

1. `dp[i]` 表示什么。
2. `dp[i]` 怎么从更小状态转移来。
3. base case 是什么。

### 1.2 常见状态定义方式

#### A. `dp[i]` 表示“到达位置 i 的最优值 / 方案数”

这类题最像递推。

```ts
function climbStairs(n: number): number {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

题型参考：

| 题目 | 状态含义 |
| ---- | -------- |
| `[70] 爬楼梯` | `dp[i]` = 到达第 `i` 阶的方法数。 |
| `[91] 解码方法` | `dp[i]` = 前 `i` 个字符的解码方案数。 |
| `[343] 整数拆分` | `dp[i]` = 整数 `i` 拆分后的最大乘积。 |

#### B. `dp[i]` 表示“以 i 结尾的最优值”

这类状态常用于“必须选到当前位置”的问题。

```ts
function maxSubArray(nums: number[]): number {
  const dp = Array(nums.length).fill(0);
  dp[0] = nums[0];
  let ans = dp[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    ans = Math.max(ans, dp[i]);
  }

  return ans;
}
```

题型参考：

| 题目 | 状态含义 |
| ---- | -------- |
| `[53] 最大子数组和` | `dp[i]` = 以 `i` 结尾的最大子数组和。 |
| `[152] 乘积最大子数组` | 同时维护以 `i` 结尾的最大积和最小积。 |
| `[413] 等差数列划分` | `dp[i]` = 以 `i` 结尾的等差子数组数量。 |

#### C. `dp[i]` 表示“前 i 个位置的最优值”

当当前位置可以选或不选时，这种定义很常见。

```ts
function rob(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n + 1).fill(0);
  dp[1] = nums[0];

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }

  return dp[n];
}
```

题型参考：

| 题目 | 状态含义 |
| ---- | -------- |
| `[198] 打家劫舍` | `dp[i]` = 前 `i` 间房能偷到的最大值。 |
| `[740] 删除并获得点数` | 先聚合数值，再转成打家劫舍模型。 |
| `[139] 单词拆分` | `dp[i]` = 前 `i` 个字符是否可拆分。 |

## 二、坐标 DP

**判断关键词**：网格、矩阵、三角形、从左上到右下、路径数、路径最值。

坐标 DP 的核心是：

1. 状态通常写成 `dp[i][j]`。
2. `dp[i][j]` 表示到某个格子时的最优值 / 方案数。
3. 转移只来自固定方向，例如上、左、左上。

### 2.1 通用模板

```ts
function gridDp(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // base case
  dp[0][0] = initialValue(grid[0][0]);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      dp[i][j] = transition(dp, grid, i, j);
    }
  }

  return dp[m - 1][n - 1];
}
```

### 2.2 两类最常见坐标状态

#### A. 方案数型

```ts
function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}
```

题型参考：

| 题目 | 状态含义 |
| ---- | -------- |
| `[62] 不同路径` | `dp[i][j]` = 到 `(i, j)` 的路径数。 |
| `[63] 不同路径 II` | 遇到障碍时路径数为 `0`。 |
| `[576] 出界的路径数` | 需要引入步数维度。 |

#### B. 最优值型

```ts
function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  dp[0][0] = grid[0][0];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;

      const fromUp = i > 0 ? dp[i - 1][j] : Number.MAX_SAFE_INTEGER;
      const fromLeft = j > 0 ? dp[i][j - 1] : Number.MAX_SAFE_INTEGER;
      dp[i][j] = Math.min(fromUp, fromLeft) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}
```

题型参考：

| 题目 | 状态含义 |
| ---- | -------- |
| `[64] 最小路径和` | `dp[i][j]` = 到 `(i, j)` 的最小路径和。 |
| `[120] 三角形最小路径和` | 每个点只依赖上一层相邻位置。 |
| `[221] 最大正方形` | `dp[i][j]` = 以 `(i, j)` 为右下角的最大正方形边长。 |
| `[174] 地下城游戏` | 也可反向定义状态，从终点倒推所需最小血量。 |

## 三、从递归到 DP 的统一视角

很多 DP 题直接看递推式会很抽象，但先写成递归就清楚了。

统一思路可以这样走：

1. 先写暴力递归，确认子问题是什么。
2. 看同一个子问题是否会被反复计算。
3. 有重复子问题就加 `memo`，得到记忆化搜索。
4. 再把递归调用顺序翻译成迭代顺序，得到自底向上的 DP。

也就是说：

- 递归是“你怎么想”。
- DP 表是“你怎么高效地算”。

## 四、空间压缩怎么判断

线性 / 坐标 DP 经常能做空间压缩，判断方法很简单：

1. `dp[i]` 只依赖前几个固定位置，例如 `i - 1`、`i - 2`。
2. 或者 `dp[i][j]` 只依赖上一行和当前行左边。

如果某些旧状态后面再也不会被访问，就可以压缩。

### 4.1 线性 DP 压缩

```ts
function climbStairs(n: number): number {
  let prev2 = 1;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }

  return prev1;
}
```

### 4.2 坐标 DP 压缩

```ts
function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array(n).fill(0);

  dp[0] = grid[0][0];
  for (let j = 1; j < n; j++) {
    dp[j] = dp[j - 1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    dp[0] += grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }
  }

  return dp[n - 1];
}
```

## 易错点清单

1. `dp[i]` 的含义没定义清楚，就直接写转移式。
2. base case 漏掉，导致后面全错。
3. 把“以 `i` 结尾”与“前 `i` 个元素”两种状态混在一起。
4. 坐标 DP 没处理边界，导致 `i - 1`、`j - 1` 越界。
5. 明明只依赖上一层，却没想到做空间压缩。

## 总结：解题速查表

| 题目特征 | 优先 DP 模型 | 关键状态 |
| ---- | ---- | ---- |
| 台阶、天数、数组前缀 | 线性 DP | `dp[i]` |
| 以当前位置结尾的最值 | 线性 DP | `dp[i]` = 以 `i` 结尾 |
| 网格路径数 / 路径最值 | 坐标 DP | `dp[i][j]` |
| 三角形 / 矩阵局部依赖 | 坐标 DP | `dp[i][j]` |
| 先能写递归、但重复计算很多 | 记忆化搜索 -> DP | 子问题缓存 |
