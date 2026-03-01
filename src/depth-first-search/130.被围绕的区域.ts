/*
 * @lc app=leetcode.cn id=130 lang=typescript
 *
 * [130] 被围绕的区域
 *
 * https://leetcode-cn.com/problems/surrounded-regions/description/
 *
 * algorithms
 * Medium (45.03%)
 * Likes:    710
 * Dislikes: 0
 * Total Accepted:    147.8K
 * Total Submissions: 328.2K
 * Testcase Example:  '[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]'
 *
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X'
 * 填充。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board =
 * [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 * 解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O'
 * 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
 *
 *
 * 示例 2：
 *
 *
 * 输入：board = [["X"]]
 * 输出：[["X"]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == board.length
 * n == board[i].length
 * 1
 * board[i][j] 为 'X' 或 'O'
 *
 *
 *
 *
 */

// @lc code=start
/**
  Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
  const width = board[0].length;
  const height = board.length;

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  const visited: boolean[][] = Array(height)
    .fill(0)
    .map(x => Array(width).fill(false));

  // 将边界和与其相连的O标记为已访问，不淹没其状态
  for (let i = 0; i < height; i++) {
    dfs(i, 0, false);
    dfs(i, width - 1, false);
  }
  for (let j = 0; j < width; j++) {
    dfs(0, j, false);
    dfs(height - 1, j, false);
  }

  // 对内部，对未访问过的O进行淹没
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      if (!visited[i][j] && board[i][j] === 'O') {
        dfs(i, j, true);
      }
    }
  }

  function dfs(row: number, col: number, needFill: boolean) {
    if (row < 0 || col < 0 || row >= height || col >= width) return;

    if (visited[row][col] || board[row][col] === 'X') return;

    visited[row][col] = true;
    if (needFill) {
      board[row][col] = 'X';
    }

    for (const [i, j] of direction) {
      dfs(row + i, col + j, needFill);
    }
  }
}
// @lc code=end

(() => {
  const board = [
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'O', 'X'],
    ['X', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'X']
  ];
  solve(board);
  console.log(board);
})();

// function solve(board: string[][]): void {
//   const width = board[0].length;
//   const height = board.length;
//   const visited: boolean[][] = Array(height)
//     .fill(0)
//     .map(x => Array(width).fill(false));

//   for (let i = 0; i < height; i++) {
//     dfs(i, 0, false);
//     dfs(i, width - 1, false);
//   }
//   for (let j = 0; j < width; j++) {
//     dfs(0, j, false);
//     dfs(height - 1, j, false);
//   }

//   for (let i = 1; i < height - 1; i++) {
//     for (let j = 1; j < width - 1; j++) {
//       if (!visited[i][j] && board[i][j] === 'O') {
//         dfs(i, j, true);
//       }
//     }
//   }

//   function dfs(i: number, j: number, needFill: boolean) {
//     if (i < 0 || i >= height || j < 0 || j > width) return;
//     if (visited[i][j] || board[i][j] === 'X') return;

//     visited[i][j] = true;
//     if (needFill) board[i][j] = 'X';

//     dfs(i - 1, j, needFill);
//     dfs(i + 1, j, needFill);
//     dfs(i, j - 1, needFill);
//     dfs(i, j + 1, needFill);
//   }
// }
