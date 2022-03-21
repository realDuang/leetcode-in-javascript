/*
 * @lc app=leetcode.cn id=1905 lang=typescript
 *
 * [1905] 统计子岛屿
 *
 * https://leetcode-cn.com/problems/count-sub-islands/description/
 *
 * algorithms
 * Medium (62.39%)
 * Likes:    41
 * Dislikes: 0
 * Total Accepted:    9.8K
 * Total Submissions: 15.4K
 * Testcase Example:  '[[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]\n' +
  '[[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]'
 *
 * 给你两个 m x n 的二进制矩阵 grid1 和 grid2 ，它们只包含 0 （表示水域）和 1 （表示陆地）。一个 岛屿 是由 四个方向
 * （水平或者竖直）上相邻的 1 组成的区域。任何矩阵以外的区域都视为水域。
 * 
 * 如果 grid2 的一个岛屿，被 grid1 的一个岛屿 完全 包含，也就是说 grid2 中该岛屿的每一个格子都被 grid1
 * 中同一个岛屿完全包含，那么我们称 grid2 中的这个岛屿为 子岛屿 。
 * 
 * 请你返回 grid2 中 子岛屿 的 数目 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],
 * grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
 * 输出：3
 * 解释：如上图所示，左边为 grid1 ，右边为 grid2 。
 * grid2 中标红的 1 区域是子岛屿，总共有 3 个子岛屿。
 * 
 * 
 * 示例 2：
 * 
 * 输入：grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]],
 * grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
 * 输出：2 
 * 解释：如上图所示，左边为 grid1 ，右边为 grid2 。
 * grid2 中标红的 1 区域是子岛屿，总共有 2 个子岛屿。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == grid1.length == grid2.length
 * n == grid1[i].length == grid2[i].length
 * 1 <= m, n <= 500
 * grid1[i][j] 和 grid2[i][j] 都要么是 0 要么是 1 。
 * 
 * 
 */

// @lc code=start
function countSubIslands(grid1: number[][], grid2: number[][]): number {
  let res = 0;

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  const rowLen = grid1.length;
  const colLen = grid1[0].length;

  // 先将 grid1 与 grid2 每个节点一一比对
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      // 发现某个节点在 grid2 是岛屿而在 grid1 不是，淹没 grid2 的这个岛屿
      if (grid2[i][j] === 1 && grid1[i][j] !== 1) {
        backtrack(i, j);
      }
    }
  }

  // grid2 剩余没被淹没的岛屿则一定是子岛屿了
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid2[i][j] === 1) {
        backtrack(i, j);
        res += 1;
      }
    }
  }

  return res;

  function backtrack(row: number, col: number) {
    if (row < 0 || row >= rowLen || col < 0 || col >= colLen) return;
    if (grid2[row][col] !== 1) return;

    grid2[row][col] = 2;

    for (const [i, j] of direction) {
      backtrack(row + i, col + j);
    }
  }
}
// @lc code=end

(() => {
  const grid1 = [
      [1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1]
    ],
    grid2 = [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0]
    ];
  console.log(countSubIslands(grid1, grid2));
})();
