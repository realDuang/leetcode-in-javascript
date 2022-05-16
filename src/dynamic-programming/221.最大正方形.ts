/*
 * @lc app=leetcode.cn id=221 lang=typescript
 *
 * [221] 最大正方形
 *
 * https://leetcode.cn/problems/maximal-square/description/
 *
 * algorithms
 * Medium (48.84%)
 * Likes:    1140
 * Dislikes: 0
 * Total Accepted:    195.3K
 * Total Submissions: 399.7K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix =
 * [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [["0","1"],["1","0"]]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：matrix = [["0"]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * matrix[i][j] 为 '0' 或 '1'
 *
 *
 */

// @lc code=start
function maximalSquare(matrix: string[][]): number {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  // 设 dp[i][j] 为以 (i, j) 为右下角时，所组成的最大正方形的边长
  const dp: number[][] = Array(rowLen + 1)
    .fill(0)
    .map(x => Array(colLen + 1).fill(0));

  let res = 0;
  for (let i = 1; i <= rowLen; i++) {
    for (let j = 1; j <= colLen; j++) {
      // 当 matrix[i][j] 为 1，且它的左边、上边、左上边都为正方形时，matrix[i][j] 才能够成为一个更大的正方形的右下角
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
        res = Math.max(res, dp[i][j]);
      }
    }
  }
  return res * res;
}
// @lc code=end

(() => {
  const matrix = [
    ['1', '0', '0', '0', '0'],
    ['1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0']
  ];
  console.log(maximalSquare(matrix));
})();
