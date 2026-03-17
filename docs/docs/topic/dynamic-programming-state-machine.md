# 动态规划：状态机模型

状态机 DP 的核心，不是“股票题很多”，而是：

1. 每一步都处在某个**离散状态**里。
2. 下一步只能从有限的几个旧状态转移过来。
3. 题目本质是“随着时间推进，状态如何演化”。

这类题最典型的是股票问题，但远不止股票。

## 解题决策树

```text
拿到一道按时间推进的最优值问题
│
├─ 每一天/每一步都有若干离散状态？
│  └─ 是 → 状态机 DP .......................... → 见「一」
│
├─ 状态之间的转移规则固定？
│  └─ 是 → 用“阶段 × 状态”建模 ................ → 见「二」
│
└─ 题目出现“持有 / 不持有 / 冷冻 / 已完成 k 次交易”？
   └─ 几乎就是标准状态机 DP .................... → 见「三」
```

## 一、什么是状态机 DP

和普通线性 DP 相比，状态机 DP 只是多了一层“当前处于什么状态”的维度。

普通线性 DP 常写成：

```text
dp[i] = 第 i 步的最优值
```

状态机 DP 更常写成：

```text
dp[i][state] = 第 i 步结束后，处于 state 状态时的最优值
```

其中 `state` 可能表示：

1. 是否持有股票。
2. 是否处于冷冻期。
3. 已经完成了几次交易。
4. 当前阶段处于哪种动作后状态。

## 二、通用建模步骤

拿到题后，不要急着写方程，先做这 3 步：

1. 列出所有状态。
2. 画出状态转移边。
3. 再写 `dp[i][state]`。

### 通用模板

```ts
function stateMachine(nums: number[]): number {
  const n = nums.length;
  const dp = Array.from({ length: n }, () => Array(STATE_COUNT).fill(-Infinity));

  // base case
  initDay0(dp, nums[0]);

  for (let i = 1; i < n; i++) {
    for (let state = 0; state < STATE_COUNT; state++) {
      dp[i][state] = transition(dp, nums, i, state);
    }
  }

  return collectAnswer(dp[n - 1]);
}
```

这类题真正的难点不在代码，而在于：

1. 状态有没有漏。
2. 转移有没有重复或非法。

## 三、股票问题是最标准的状态机 DP

### 3.1 只允许交易一次

最简单的状态只有两种：

1. `hold`：手里持有股票。
2. `sold`：手里不持有股票。

```ts
function maxProfit(prices: number[]): number {
  const n = prices.length;
  const dp = Array.from({ length: n }, () => Array(2).fill(0));

  dp[0][0] = -prices[0];
  dp[0][1] = 0;

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
  }

  return dp[n - 1][1];
}
```

题型参考：

| 题目 | 状态说明 |
| ---- | -------- |
| `[121] 买卖股票的最佳时机` | 一次交易，状态最简单。 |

### 3.2 允许无限次交易

这时状态还是“持有 / 不持有”，但买卖不再只限一次。

```ts
function maxProfit(prices: number[]): number {
  const n = prices.length;
  const dp = Array.from({ length: n }, () => Array(2).fill(0));

  dp[0][0] = -prices[0];
  dp[0][1] = 0;

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
  }

  return dp[n - 1][1];
}
```

### 3.3 限制最多 k 次交易

这类题要再多一维“已经完成了多少次交易”。

```text
dp[i][k][0/1]
```

其中：

1. `i` 表示天数。
2. `k` 表示最多还能做几次交易，或已经做了几次交易。
3. `0/1` 表示不持有 / 持有。

题型参考：

| 题目 | 状态说明 |
| ---- | -------- |
| `[123] 买卖股票的最佳时机 III` | 最多 2 次交易。 |
| `[188] 买卖股票的最佳时机 IV` | 最多 `k` 次交易。 |

### 3.4 带冷冻期 / 手续费

这类题不是换模型，而是在状态转移里补限制。

题型参考：

| 题目 | 状态说明 |
| ---- | -------- |
| `[309] 最佳买卖股票时机含冷冻期` | 卖出后下一天不能买。 |
| `[714] 买卖股票的最佳时机含手续费` | 转移时扣手续费。 |

## 四、除了股票，还能怎么识别状态机 DP

只要题目有这种味道，也可以往状态机上靠：

1. 每一步只能做少数几种动作。
2. 某些动作之后会进入不同阶段。
3. 阶段之间有明确的合法转移。

例如：

1. 是否持有某种资源。
2. 当前是否可操作。
3. 已完成多少轮阶段切换。

这类题和普通线性 DP 的区别在于：

- 线性 DP 更像“一个序列上的递推”。
- 状态机 DP 更像“时间线上多个状态之间的切换”。

## 五、空间压缩

如果 `dp[i][state]` 只依赖 `dp[i - 1][...]`，就可以压缩成常数变量。

```ts
function maxProfit(prices: number[]): number {
  let hold = -prices[0];
  let sold = 0;

  for (let i = 1; i < prices.length; i++) {
    const prevHold = hold;
    const prevSold = sold;

    hold = Math.max(prevHold, prevSold - prices[i]);
    sold = Math.max(prevSold, prevHold + prices[i]);
  }

  return sold;
}
```

## 易错点清单

1. 状态没有列全，导致某些转移根本写不出来。
2. base case 没初始化成合法值，非法状态却默认成 `0`。
3. “交易次数”到底是在买入时消耗还是卖出时消耗，没有统一。
4. 明明是状态切换问题，却硬塞成普通一维 DP，结果方程越写越乱。
5. 压缩空间时直接覆盖旧值，丢失了上一轮状态。

## 总结：解题速查表

| 题目特征 | 优先 DP 模型 | 核心状态 |
| ---- | ---- | ---- |
| 每一步只有有限个离散状态 | 状态机 DP | `dp[i][state]` |
| 股票持有 / 不持有 | 状态机 DP | `dp[i][0/1]` |
| 交易次数受限 | 状态机 DP | `dp[i][k][0/1]` |
| 有冷冻期、手续费、阶段限制 | 状态机 DP | 状态转移规则变化 |
