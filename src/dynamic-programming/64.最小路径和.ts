/*
 * @lc app=leetcode.cn id=64 lang=typescript
 *
 * [64] 最小路径和
 *
 * https://leetcode.cn/problems/minimum-path-sum/description/
 *
 * algorithms
 * Medium (69.19%)
 * Likes:    1245
 * Dislikes: 0
 * Total Accepted:    361.8K
 * Total Submissions: 522.9K
 * Testcase Example:  '[[1,3,1],[1,5,1],[4,2,1]]'
 *
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 *
 * 说明：每次只能向下或者向右移动一步。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[1,2,3],[4,5,6]]
 * 输出：12
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1
 * 0
 *
 *
 */

// @lc code=start
function minPathSum(grid: number[][]): number {
  const rowLen = grid.length;
  const colLen = grid[0].length;

  const dp: number[] = Array(colLen).fill(0);

  // base case，先初始化好第一行的情况，当路径终点为 grid[0][j] 时，只会有从左侧过来的路径这一种可能
  dp[0] = grid[0][0];
  for (let j = 1; j < colLen; j++) {
    dp[j] = dp[j - 1] + grid[0][j];
  }

  for (let i = 1; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      // 数组越界，当路径终点为 grid[i][0] 时，只会有从上方下来的路径这一种可能
      if (j === 0) {
        dp[j] = dp[j] + grid[i][j];
        continue;
      }
      dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
    }
  }
  return dp[colLen - 1];
}
// @lc code=end

// function minPathSum(grid: number[][]): number {
//   const rowLen = grid.length;
//   const colLen = grid[0].length;

//   const dp: number[][] = Array(rowLen)
//     .fill(0)
//     .map(x => Array(colLen).fill(0));

//   const res = backtrack(0, 0);
//   return res;

//   function backtrack(row: number, col: number): number {
//     // 越界，返回非法值，由于本题求最小值，因此设置为MAX_VALUE
//     if (row >= rowLen || col >= colLen) return Number.MAX_VALUE;
//     // 当前节点值
//     const val = grid[row][col];

//     // 递归终止条件，当路径起点为右下角时，最短路径就是和就是自身
//     if (row === rowLen - 1 && col === colLen - 1) return val;

//     // 先查memo，看是否已经计算过
//     if (dp[row][col] > 0) {
//       return dp[row][col];
//     }

//     // 做选择
//     const sum1 = backtrack(row + 1, col);
//     const sum2 = backtrack(row, col + 1);

//     dp[row][col] = Math.min(sum1, sum2) + val;
//     return dp[row][col];
//   }
// }

(() => {
  const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
  ];
  console.log(minPathSum(grid));
})();
