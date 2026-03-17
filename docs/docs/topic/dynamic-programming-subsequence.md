# 动态规划：序列与双序列模型

这一类 DP 的共同点不是“都和字符串有关”，而是：

1. 题目关注的是**相对顺序**。
2. 允许跳过元素，但不能打乱顺序。
3. 状态通常围绕“前缀”和“结尾位置”来定义。

所以这一章最核心的不是背题，而是先分清楚：

1. 你是在处理**单序列**，还是**双序列**？
2. 你要的是“以 `i` 结尾的最优值”，还是“两段前缀的最优值”？

## 先分清：子序列、子串、子数组

这是这一类题最常见的误区。

1. **子数组 / 子串**：必须连续。
2. **子序列**：可以跳过元素，但顺序不能变。

一旦题目允许“删除一些元素但保持相对顺序”，就该优先想到子序列 DP。

## 解题决策树

```text
拿到一道和序列顺序相关的最优值问题
│
├─ 只涉及一个数组 / 字符串？
│  └─ 是 → 单序列 DP .......................... → 见「一」
│
├─ 涉及两个数组 / 两个字符串对齐比较？
│  └─ 是 → 双序列 DP .......................... → 见「二」
│
├─ 题目涉及增删改、匹配、对齐？
│  └─ 是 → 通常是双序列前缀 DP ................. → 见「二」
│
└─ 状态更像区间 `[i, j]` 的关系？
   └─ 是 → 更接近区间 DP ....................... → 见「区间与划分模型」
```

## 一、单序列 DP

**判断关键词**：最长递增子序列、以 `i` 结尾、前面选哪个接到当前元素后面。

这类题最典型的状态定义是：

```text
dp[i] = 以 nums[i] 结尾的最优值
```

### 通用模板

```ts
function sequenceDp(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(1);
  let ans = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (canTransition(nums, j, i)) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    ans = Math.max(ans, dp[i]);
  }

  return ans;
}
```

`canTransition(nums, j, i)` 表示：`j` 能不能接到 `i` 前面。

### 典型题型

| 题目 | 状态定义 |
| ---- | -------- |
| `[300] 最长递增子序列` | `dp[i]` = 以 `nums[i]` 结尾的 LIS 长度。 |
| `[673] 最长递增子序列的个数` | 同时维护长度和个数。 |
| `[354] 俄罗斯套娃信封问题` | 排序后转成 LIS。 |
| `[392] 判断子序列` | 也可用双指针，但若扩展到多查询可用预处理 / DP。 |

### 易错点

1. `dp[i]` 表示的是“以 `i` 结尾”，不是“前 `i` 个里的全局最优”。
2. 答案通常是 `max(dp[i])`，而不是直接返回 `dp[n - 1]`。
3. 有些题要先排序，才能转成标准单序列 DP。

## 二、双序列 DP

**判断关键词**：两个字符串、两个数组、最长公共、编辑距离、删除操作、交错匹配。

这一类最经典的定义是：

```text
dp[i][j] = s 的前 i 个字符与 t 的前 j 个字符的最优结果
```

这里的“最优结果”可以是：

1. 最长公共子序列长度。
2. 最少编辑次数。
3. 是否能够匹配。
4. 最小删除代价。

### 2.1 最通用模板

```ts
function doubleSequenceDp(s: string, t: string): number {
  const m = s.length;
  const n = t.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = matchTransition(dp, i, j);
      } else {
        dp[i][j] = mismatchTransition(dp, i, j);
      }
    }
  }

  return dp[m][n];
}
```

### 2.2 三种最常见转移思路

#### A. 相等就继承，不等就取更优

这是 LCS 系列。

```ts
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

题型参考：

| 题目 | 关键思路 |
| ---- | -------- |
| `[1143] 最长公共子序列` | 相等取左上加一，不等取上/左最大值。 |
| `[583] 两个字符串的删除操作` | 可转成 LCS，再由长度反推删除次数。 |
| `[712] 两个字符串的最小 ASCII 删除和` | 把“长度最大”改成“代价最小”。 |

#### B. 枚举操作：删、改、插

这是编辑距离系列。

```ts
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        ) + 1;
      }
    }
  }

  return dp[m][n];
}
```

题型参考：

| 题目 | 关键思路 |
| ---- | -------- |
| `[72] 编辑距离` | 不等时考虑删、插、改三种操作。 |
| `[583] 两个字符串的删除操作` | 也可直接从编辑操作角度做。 |

#### C. 前缀是否可匹配

这是匹配型 DP，答案是布尔值。

```ts
function isInterleave(s1: string, s2: string, s3: string): boolean {
  const m = s1.length;
  const n = s2.length;
  if (m + n !== s3.length) return false;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i > 0 && s1[i - 1] === s3[i + j - 1]) {
        dp[i][j] = dp[i][j] || dp[i - 1][j];
      }
      if (j > 0 && s2[j - 1] === s3[i + j - 1]) {
        dp[i][j] = dp[i][j] || dp[i][j - 1];
      }
    }
  }

  return dp[m][n];
}
```

题型参考：

| 题目 | 关键思路 |
| ---- | -------- |
| `[97] 交错字符串` | `dp[i][j]` 表示两个前缀能否交错组成目标前缀。 |
| `[10] 正则表达式匹配` | 带模式规则的双序列匹配。 |
| `[44] 通配符匹配` | 同样是前缀匹配 DP。 |

## 三、这类题真正的统一视角

序列 DP 看起来花样很多，但底层只有两个问题：

1. 当前字符 / 元素要不要参与答案？
2. 参与时，它和谁建立关系？

所以你经常会看到下面两种结构：

1. **枚举前驱**：`j -> i`
   典型是 LIS。
2. **比较两个前缀末尾**：`s[i - 1]` 和 `t[j - 1]`
   典型是 LCS、编辑距离、字符串匹配。

看懂这一点，很多题只是把“最大值”换成“最小值”、“长度”换成“布尔值”或“代价”。

## 四、空间压缩提示

双序列 DP 有时可以压缩成一维，但前提是：

1. 当前状态只依赖上一行和当前行左边。
2. 你能处理好左上角旧值的暂存。

如果题目刚开始还没完全想清楚，优先写二维版本，等状态关系稳定后再压缩。

## 易错点清单

1. 没分清子序列和子串，导致状态定义一开始就错。
2. 单序列 DP 直接返回 `dp[n - 1]`，漏掉全局最优。
3. 双序列 DP 忘了多开一行一列，base case 很难写。
4. 编辑距离类题漏掉初始化 `dp[i][0]` 和 `dp[0][j]`。
5. 明明是区间 `[i, j]` 的关系，却误塞进双序列模型。

## 总结：解题速查表

| 题目特征 | 优先 DP 模型 | 核心状态 |
| ---- | ---- | ---- |
| 一个序列，枚举前驱接到当前位置 | 单序列 DP | `dp[i]` |
| 两个序列求最长公共关系 | 双序列 DP | `dp[i][j]` |
| 两个序列求最少操作数 | 双序列 DP | `dp[i][j]` |
| 字符串是否匹配 / 是否能交错组成 | 双序列 DP | `dp[i][j]` = boolean |
| 回文、划分、更像处理区间 | 区间 / 划分 DP | `dp[i][j]` |
