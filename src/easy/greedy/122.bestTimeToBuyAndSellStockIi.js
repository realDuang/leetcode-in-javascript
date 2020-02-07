/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let buy = prices[0];
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > buy) {
      res += prices[i] - buy;
    }
    buy = prices[i];
  }
  return res;
};
// @lc code=end

// 贪婪法，每一个上升的部分都将差值计入
console.log(maxProfit([7, 1, 5, 3, 6, 4]));
