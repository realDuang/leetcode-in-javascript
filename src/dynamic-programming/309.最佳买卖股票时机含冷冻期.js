/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 *
 * algorithms
 * Medium (52.62%)
 * Likes:    265
 * Dislikes: 0
 * Total Accepted:    20.3K
 * Total Submissions: 38.1K
 * Testcase Example:  '[1,2,3,0,2]'
 *
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
 *
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 *
 *
 * 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 *
 *
 * 示例:
 *
 * 输入: [1,2,3,0,2]
 * 输出: 3
 * 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 *
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function(prices) {
  if (!prices || prices.length <= 1) return 0;

  const buy = [-prices[0], Math.max(-prices[0], -prices[1])];
  const sell = [0, Math.max(prices[1] - prices[0], 0)];

  for (let i = 2; i < prices.length; i++) {
    buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
  }

  return sell[prices.length - 1];
};
// @lc code=end

// 经典的多状态动态规划问题
// 可以分解为三种状态
// buy状态转移方程：buy[i] = max(cooldown[i-1] - prices[i], buy[i-1])
// cooldown状态转移方程：cooldown[i] = max(sell[i-1], cooldown[i-1])
// sell状态转移方程：sell[i] = max(buy[i-1] + prices[i], sell[i-1])

// var maxProfit = function(prices) {
//   if (!prices || prices.length <= 1) return 0;

//   const buy = [];
//   buy[0] = -prices[0];

//   const sell = [];
//   sell[0] = 0;

//   const cooldown = [];
//   cooldown[0] = 0;

//   for (let i = 1; i < prices.length; i++) {
//     buy[i] = Math.max(cooldown[i - 1] - prices[i], buy[i - 1]);
//     cooldown[i] = Math.max(sell[i - 1], cooldown[i - 1]);
//     sell[i] = Math.max(buy[i - 1] + prices[i], sell[i - 1]);
//   }
//   return Math.max(sell[prices.length - 1], cooldown[prices.length - 1]);
// };

// 由于cooldown状态并不会对最终的获利产生任何影响，因此可以将cooldown的状态归并进buy状态中。由于卖出后面一定需要跟一个cooldown状态，因此cooldown[i-1] = sell[i-2]

// buy状态转移方程：buy[i] = max(buy[i-1], sell[i-2] - prices[i])
// sell状态转移方程：sell[i] = max(sell[i-1], buy[i-1] + prices[i])

// 可以分解为两种状态
// 一个是当天执行买入操作所能获取的最大利润buy
// 1. 当天状态为buy时: 由于sell后有一天的cd，金额为：两天前sell操作后的剩余金额 - 当天货物价格
// 2. 当天状态不为buy(即为cd)时，金额等于一天前执行buy操作后的金额
// 两种情况取最大值

// 一个是当天执行卖出操作所能获取的最大利润sell
// 1. 当天状态为sell时: 金额为：一天前buy操作后的剩余金额 + 当天货物价格
// 2. 当天状态不为sell(即为cd)时，金额等于一天前执行sell操作后的金额
// 两种情况取最大值

// 由于该题状态转移方程只依赖dp[i-1]和dp[i-2]，因此也可以用两个临时变量存储，从而优化空间复杂度为O(1)，就不在此实现了。

console.log(maxProfit([1, 2, 3, 0, 2]));
