/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 *
 * https://leetcode-cn.com/problems/unique-paths-ii/description/
 *
 * algorithms
 * Medium (32.58%)
 * Likes:    261
 * Dislikes: 0
 * Total Accepted:    51.7K
 * Total Submissions: 158.1K
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 *
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 *
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 *
 *
 *
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 *
 * 说明：m 和 n 的值均不超过 100。
 *
 * 示例 1:
 *
 * 输入:
 * [
 * [0,0,0],
 * [0,1,0],
 * [0,0,0]
 * ]
 * 输出: 2
 * 解释:
 * 3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) break;
    dp[j] = 1;
  }
  for (let i = 1; i < m; i++) {
    let left = 0;
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        left = 0;
        dp[j] = 0;
      } else {
        left = dp[j] + left;
        dp[j] = left;
      }
    }
  }
  return dp[n - 1];
};
// @lc code=end

// 这题比62题的难点在于多了一个障碍物的概念，有障碍物的地点不能走，自然其右或是其下的格子的情况不能加上障碍物格，其他的解题思路不变。

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ])
);
