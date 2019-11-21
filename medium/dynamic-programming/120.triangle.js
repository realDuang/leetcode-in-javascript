/*
 * @lc app=leetcode id=120 lang=javascript
 *
 * [120] Triangle
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  const len = triangle.length;
  const dp = new Array(len).fill(0).map(x => new Array(len).fill(0));
  dp[len - 1] = triangle[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
    }
  }
  return dp[0][0];
};
// @lc code=end

// 状态转移方程：dp[i][j] = min(dp[i+1][j], dp[i+1][j+1]) + triangle[i][j]
// 注意要从下往上求极值，题目可以转化为：最后一行元素到当前元素的最小路径和。可以看出每一个点的最小路径只与下一排的相邻两个值有关。
const arr = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
console.log(minimumTotal(arr));
