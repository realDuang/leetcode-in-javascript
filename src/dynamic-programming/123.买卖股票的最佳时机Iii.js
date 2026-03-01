/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/description/
 *
 * algorithms
 * Hard (41.40%)
 * Likes:    312
 * Dislikes: 0
 * Total Accepted:    25.1K
 * Total Submissions: 60.1K
 * Testcase Example:  '[3,3,5,0,0,3,1,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 *
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 *
 * 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 *
 * 示例 1:
 *
 * 输入: [3,3,5,0,0,3,1,4]
 * 输出: 6
 * 解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
 * 随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
 *
 * 示例 2:
 *
 * 输入: [1,2,3,4,5]
 * 输出: 4
 * 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4
 * 。
 * 注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
 * 因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 *
 *
 * 示例 3:
 *
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
 *
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (!prices || prices.length <= 1) return 0;
  const length = prices.length;
  const k = 2;

  // const dp = Array(length)
  //   .fill(0)
  //   .map(x =>
  //     Array(k + 1)
  //       .fill(0)
  //       .map(x => Array(2).fill(0))
  //   );

  const dp = Array(length)
    .fill(0)
    .map(x => [
      [0, 0],
      [0, 0],
      [0, 0]
    ]);

  // 处理第一天操作的 base case
  for (let j = 0; j <= k; j++) {
    // 第一天不操作
    dp[0][j][0] = 0;
    // 第一天买入
    dp[0][j][1] = 0 - prices[0];
  }

  for (let i = 1; i < length; i++) {
    for (let j = 1; j <= k; j++) {
      // 当前不持有，那么若不操作，则最大利润与前一天相同，若卖出，则利润为前一天持有情况的利润加上当前卖出价格
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      // 当前持有，那么若不操作，则最大利润与前一天相同，若卖出，则利润为前一天不持有且可操作次数多一次的情况下的利润减去当前卖出价格
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }
  return dp[length - 1][k][0];
};
// @lc code=end

console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));
