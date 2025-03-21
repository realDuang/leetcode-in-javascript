/*
 * @lc app=leetcode.cn id=188 lang=typescript
 *
 * [188] 买卖股票的最佳时机 IV
 *
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/
 *
 * algorithms
 * Hard (50.97%)
 * Likes:    1256
 * Dislikes: 0
 * Total Accepted:    313K
 * Total Submissions: 598K
 * Testcase Example:  '2\n[2,4,1]'
 *
 * 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
 *
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。
 *
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：k = 2, prices = [2,4,1]
 * 输出：2
 * 解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
 *
 * 示例 2：
 *
 *
 * 输入：k = 2, prices = [3,2,6,5,0,3]
 * 输出：7
 * 解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
 * ⁠    随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 =
 * 3 。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= 100
 * 1 <= prices.length <= 1000
 * 0 <= prices[i] <= 1000
 *
 *
 */

// @lc code=start
function maxProfit(k: number, prices: number[]): number {
  const len = prices.length;

  // 设 dp[j][l] 为 买入次数为 j 次，当天是否持有股票 l ，所能获取的最大利润
  // 当天执行买入时，j + 1，最多可以买 k 次
  const dp = Array(k + 1)
    .fill(0)
    .map(() => Array(2).fill(0));

  // 初始化第 0 天
  // 此时没有股票，若不交易，收益为 0
  // 若当天进行交易买入股票，收益为-prices[0]，买入次数 +1
  for (let j = 0; j < k; j++) {
    // dp[j + 1][0] = 0;
    dp[j + 1][1] = -prices[0];
  }

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= k; j++) {
      // 如果当天选择不持有股票，则有两种情况
      // 如果之前有买股票，卖掉之前持有的股票获取收益，如果没有买，则不操作
      dp[j][0] = Math.max(dp[j][0], dp[j][1] + prices[i]);

      // 如果当天选择持有股票
      // 如果之前已经持有，则不操作，否则买入当天股票，买入次数扣除，利润扣除
      dp[j][1] = Math.max(dp[j][1], dp[j - 1][0] - prices[i]);
    }
    // console.log(dp);
  }

  // 最终一定是卖出手中股票收益最大
  return dp[k][0];
}
// @lc code=end

(() => {
  const prices = [3, 2, 6, 5, 0, 3];
  console.log(maxProfit(2, prices));
})();
