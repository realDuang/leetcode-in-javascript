/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 *
 * https://leetcode-cn.com/problems/sudoku-solver/description/
 *
 * algorithms
 * Hard (60.32%)
 * Likes:    387
 * Dislikes: 0
 * Total Accepted:    25.3K
 * Total Submissions: 41.4K
 * Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
 *
 * 编写一个程序，通过已填充的空格来解决数独问题。
 *
 * 一个数独的解法需遵循如下规则：
 *
 *
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 *
 *
 * 空白格用 '.' 表示。
 *
 *
 *
 * 一个数独。
 *
 *
 *
 * 答案被标成红色。
 *
 * Note:
 *
 *
 * 给定的数独序列只包含数字 1-9 和字符 '.' 。
 * 你可以假设给定的数独只有唯一解。
 * 给定数独永远是 9x9 形式的。
 *
 *
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  const len = 9;
  const charCode1 = '1'.charCodeAt();
  const charCode9 = '9'.charCodeAt();
  backtrack(board, 0, 0);
  return board;

  function backtrack(board, i, j) {
    // 到最后一行，结束回溯
    if (i >= len) {
      return true;
    }

    // 到最后一列，进入下一行遍历
    if (j >= len) {
      return backtrack(board, i + 1, 0);
    }

    // 若已有预设值，则跳过
    if (board[i][j] !== '.') {
      return backtrack(board, i, j + 1);
    }

    for (let charCode = charCode1; charCode <= charCode9; charCode++) {
      const ch = String.fromCharCode(charCode);
      if (isValid(i, j, ch)) {
        board[i][j] = ch;
        // 找到可行解，直接填入并找下一个空，剪枝，不用回溯了
        if (backtrack(board, i, j + 1)) {
          return true;
        }
        board[i][j] = '.';
      }
    }
  }

  function isValid(row, col, num) {
    for (let i = 0; i < len; i++) {
      // 判断所在行所在列有无重复数字
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    // 判断所在九宫格内有无重复数字
    const rowStart = row - (row % 3);
    const colStart = col - (col % 3);
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    return true;
  }
};

// @lc code=end

console.log(
  solveSudoku([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']
  ])
);
