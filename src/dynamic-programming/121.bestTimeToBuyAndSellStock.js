/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0];
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    res = Math.max(res, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return res;
};
// @lc code=end

// 状态转移方程：dp[i] = nums[i] - min
console.log(maxProfit([7, 5, 3, 6, 4]));
