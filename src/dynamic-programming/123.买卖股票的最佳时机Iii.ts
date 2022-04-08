/*
 * @lc app=leetcode.cn id=123 lang=typescript
 *
 * [123] 买卖股票的最佳时机 III
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/description/
 *
 * algorithms
 * Hard (55.34%)
 * Likes:    1078
 * Dislikes: 0
 * Total Accepted:    168K
 * Total Submissions: 302.8K
 * Testcase Example:  '[3,3,5,0,0,3,1,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 *
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 *
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：prices = [3,3,5,0,0,3,1,4]
 * 输出：6
 * 解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
 * 随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
 *
 * 示例 2：
 *
 *
 * 输入：prices = [1,2,3,4,5]
 * 输出：4
 * 解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4
 * 。
 * 注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
 * 因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 *
 *
 * 示例 3：
 *
 *
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
 *
 * 示例 4：
 *
 *
 * 输入：prices = [1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  const len = prices.length;
  const cnt = 2;
  // 三维dp数组，分别对应三个变量：
  // i: 第几天
  // j：最大交易次数
  // k：当天是否持有股票
  const dp = Array(len)
    .fill(0)
    .map(x =>
      Array(cnt + 1)
        .fill(0)
        .map(x => Array(2).fill(0))
    );

  // base case
  // 存在可交易次数时，第0天时未持有股票，收益为0；
  // 若决定持有股票，则当天进行买入，收益为 -prices[0]
  for (let i = 1; i <= cnt; i++) {
    dp[0][i][0] = 0;
    dp[0][i][1] = -prices[0];
  }

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= cnt; j++) {
      // 若当天选择不持有股票，则最大利润为下列两种情况之一的较大值：
      // 前一天时已经未持有股票。利润保持一致。
      // 前一天持有，今天卖出，利润加上当天卖出价格
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);

      // 若当天选择持有，则最大利润为下列两种情况之一的较大值：
      // 前一天已经持有股票，今天继续持有。利润保持一致。
      // 前一天未持有股票，今天买入，则交易次数-1，利润减少当天买入价格
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }

  // 最后一天一定是未持有股票时收益最大
  return dp[len - 1][cnt][0];
}
// @lc code=end

(() => {
  const prices = [3, 3, 5, 0, 0, 3, 1, 4];
  console.log(maxProfit(prices));
})();
