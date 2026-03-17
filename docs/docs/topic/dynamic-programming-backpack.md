# 动态规划：背包模型

背包问题之所以重要，不是因为题目里真的有“背包”，而是因为它把动态规划里最经典的一类决策抽象得非常清楚：

1. 每个物品有代价，例如体积、重量、花费、字符数。
2. 每个物品会带来收益，例如价值、可行性、方案数。
3. 对每个物品，你都要做“选 / 不选 / 选几次”的决策。

一旦题目出现这种“有限资源下做选择”的结构，就要想到背包模型。

## 解题决策树

```text
拿到一道“选或不选”的优化/计数题
│
├─ 每个物品最多只能选一次？
│  └─ 是 → 0-1 背包 .......................... → 见「一」
│
├─ 每个物品可以重复选无限次？
│  └─ 是 → 完全背包 .......................... → 见「二」
│
├─ 物品有多个维度的容量约束？
│  └─ 是 → 多维背包 .......................... → 见「三」
│
└─ 题目问的是“能否 / 最值 / 方案数”？
   └─ 是 → 同一个背包框架，改 dp 含义即可
```

## 一、0-1 背包

**判断关键词**：每个元素只能用一次、选或不选、分割子集、目标和、容量上限。

### 1.1 标准状态定义

最经典的定义是：

```text
dp[i][j] = 前 i 个物品里，容量为 j 时的最优结果
```

其中“最优结果”可以是：

1. 最大价值。
2. 是否可达。
3. 方案数。

### 1.2 二维模板

```ts
function zeroOneKnapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const weight = weights[i - 1];
    const value = values[i - 1];

    for (let j = 0; j <= capacity; j++) {
      dp[i][j] = dp[i - 1][j];

      if (j >= weight) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - weight] + value);
      }
    }
  }

  return dp[n][capacity];
}
```

转移逻辑只有两种：

1. 不选第 `i` 个物品：`dp[i - 1][j]`
2. 选第 `i` 个物品：`dp[i - 1][j - weight] + value`

### 1.3 一维压缩模板

0-1 背包压缩后，容量必须**倒序遍历**：

```ts
function zeroOneKnapsack(weights: number[], values: number[], capacity: number): number {
  const dp = Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    for (let j = capacity; j >= weight; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight] + value);
    }
  }

  return dp[capacity];
}
```

为什么必须倒序？
因为每个物品只能使用一次，倒序可以保证本轮更新时拿到的还是“上一层”的状态，而不是当前物品已经更新过的结果。

### 1.4 常见变体

#### A. 可行性判断

```ts
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
}
```

#### B. 方案数统计

当题目问“有多少种选法”，状态就改成计数。

题型参考（框架微调）：

| 题目 | 背包解释 |
| ---- | -------- |
| `[416] 分割等和子集` | 是否能恰好装满 `sum / 2`。 |
| `[494] 目标和` | 转化为选若干数使其和等于某个目标。 |
| `[1049] 最后一块石头的重量 II` | 本质是尽量装满一半总和。 |
| `[1230] 抛掷硬币` | 也可看成计数 / 概率型 DP。 |

## 二、完全背包

**判断关键词**：每种物品可重复使用、无限个硬币、完全平方数、组合总数。

完全背包和 0-1 背包唯一的本质区别是：

1. 0-1 背包：每个物品只能选一次。
2. 完全背包：每个物品可以选无数次。

这会直接影响转移式和遍历方向。

### 2.1 一维模板

```ts
function completeKnapsack(weights: number[], values: number[], capacity: number): number {
  const dp = Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    for (let j = weight; j <= capacity; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight] + value);
    }
  }

  return dp[capacity];
}
```

这里容量要**正序遍历**。
因为同一个物品可以重复使用，所以 `dp[j]` 可以基于当前轮已经更新过的 `dp[j - weight]`。

### 2.2 常见问题类型

#### A. 求最少个数

```ts
function coinChange(coins: number[], amount: number): number {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let j = coin; j <= amount; j++) {
      dp[j] = Math.min(dp[j], dp[j - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

#### B. 求组合数

```ts
function change(amount: number, coins: number[]): number {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let j = coin; j <= amount; j++) {
      dp[j] += dp[j - coin];
    }
  }

  return dp[amount];
}
```

题型参考（框架微调）：

| 题目 | 背包解释 |
| ---- | -------- |
| `[322] 零钱兑换` | 每种硬币无限个，求最少硬币数。 |
| `[518] 零钱兑换 II` | 每种硬币无限个，求组合数。 |
| `[279] 完全平方数` | 物品变成平方数，求最少数量。 |
| `[377] 组合总和 IV` | 也是完全背包，但要注意顺序是否算不同方案。 |
| `[1449] 数位成本和为目标值的最大数字` | 容量是成本，价值是构造结果的优先级。 |

## 三、多维背包

**判断关键词**：有两个及以上容量限制，例如 0 和 1 的数量、人数和利润。

这类题只是把“容量”从一维扩展到二维或三维，本质没变。

### 通用模板

```ts
function multiKnapsack(items: Array<[number, number]>, m: number, n: number): number {
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (const [costA, costB] of items) {
    for (let i = m; i >= costA; i--) {
      for (let j = n; j >= costB; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - costA][j - costB] + 1);
      }
    }
  }

  return dp[m][n];
}
```

题型参考（框架微调）：

| 题目 | 背包解释 |
| ---- | -------- |
| `[474] 一和零` | 两维容量分别是 `0` 和 `1` 的数量。 |
| `[879] 盈利计划` | 需要同时约束人数和利润。 |

## 四、背包题最关键的 4 个判断

拿到一道题时，先问自己这 4 个问题：

1. 物品是什么？
例如数字、硬币、字符串、项目。

2. 容量是什么？
例如和、体积、金额、字符数、人数。

3. 每个物品能选几次？

- 只能一次：0-1 背包
- 无限次：完全背包

4. `dp[j]` 存的是什么？

- 最大值
- 最小值
- 是否可达
- 方案数

这 4 个问题一旦答出来，转移式通常就不难了。

## 五、遍历顺序速记

| 模型 | 容量遍历方向 | 原因 |
| ---- | ------------ | ---- |
| 0-1 背包 | 倒序 | 防止同一物品被重复使用 |
| 完全背包 | 正序 | 允许同一物品重复使用 |
| 多维 0-1 背包 | 每一维都倒序 | 本质仍然是“每个物品只用一次” |

## 易错点清单

1. 没想清楚“物品能不能重复用”，导致遍历方向写反。
2. `dp[j]` 的含义是最值还是方案数，没定义清楚。
3. 组合数与排列数混淆，循环顺序写错。
4. 0-1 背包做一维压缩时，误用了正序遍历。
5. 看到“选或不选”却没意识到题目本质是背包。

## 总结：解题速查表

| 题目特征 | 优先 DP 模型 | 核心状态 |
| ---- | ---- | ---- |
| 每个元素只能选一次 | 0-1 背包 | `dp[j]` / `dp[i][j]` |
| 每个元素可以重复用 | 完全背包 | `dp[j]` |
| 有多个容量约束 | 多维背包 | `dp[i][j]` / `dp[i][j][k]` |
| 问能否达到某个目标 | 背包可达性 | `dp[j]` = boolean |
| 问有多少种方案 | 背包计数 | `dp[j]` = count |
