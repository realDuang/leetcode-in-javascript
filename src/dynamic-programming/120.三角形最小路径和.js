/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 *
 * https://leetcode-cn.com/problems/triangle/description/
 *
 * algorithms
 * Medium (64.02%)
 * Likes:    355
 * Dislikes: 0
 * Total Accepted:    49.7K
 * Total Submissions: 77.4K
 * Testcase Example:  '[[2],[3,4],[6,5,7],[4,1,8,3]]'
 *
 * 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
 *
 * 例如，给定三角形：
 *
 * [
 * ⁠    [2],
 * ⁠   [3,4],
 * ⁠  [6,5,7],
 * ⁠ [4,1,8,3]
 * ]
 *
 *
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 *
 * 说明：
 *
 * 如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题，那么你的算法会很加分。
 *
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
