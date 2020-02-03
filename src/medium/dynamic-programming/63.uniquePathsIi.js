/*
 * @lc app=leetcode id=63 lang=javascript
 *
 * [63] Unique Paths II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
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
    [0, 0, 0],
  ])
);
