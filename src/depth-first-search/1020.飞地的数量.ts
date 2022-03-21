/*
 * @lc app=leetcode.cn id=1020 lang=typescript
 *
 * [1020] 飞地的数量
 *
 * https://leetcode-cn.com/problems/number-of-enclaves/description/
 *
 * algorithms
 * Medium (60.80%)
 * Likes:    161
 * Dislikes: 0
 * Total Accepted:    39.4K
 * Total Submissions: 64.7K
 * Testcase Example:  '[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]'
 *
 * 给你一个大小为 m x n 的二进制矩阵 grid ，其中 0 表示一个海洋单元格、1 表示一个陆地单元格。
 *
 * 一次 移动 是指从一个陆地单元格走到另一个相邻（上、下、左、右）的陆地单元格或跨过 grid 的边界。
 *
 * 返回网格中 无法 在任意次数的移动中离开网格边界的陆地单元格的数量。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
 * 输出：3
 * 解释：有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
 * 输出：0
 * 解释：所有 1 都在边界上或可以到达边界。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 500
 * grid[i][j] 的值为 0 或 1
 *
 *
 */

// @lc code=start
function numEnclaves(grid: number[][]): number {
  let res = 0;
  let count = 0;
  let foundBound = false;

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  const rowLen = grid.length;
  const colLen = grid[0].length;

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] === 1) {
        count = 0;
        foundBound = false;
        backtrack(i, j);
        if (!foundBound) {
          res += count;
        }
      }
    }
  }
  return res;

  function backtrack(row: number, col: number) {
    if (row < 0 || row >= rowLen || col < 0 || col >= colLen) return;
    if (grid[row][col] !== 1) return;

    if (row === 0 || row === rowLen - 1 || col === 0 || col === colLen - 1) {
      foundBound = true;
    }
    grid[row][col] = 2;
    count += 1;

    for (const [i, j] of direction) {
      backtrack(row + i, col + j);
    }
  }
}
// @lc code=end

(() => {
  const grid = [
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
  ];
  console.log(numEnclaves(grid));
})();
