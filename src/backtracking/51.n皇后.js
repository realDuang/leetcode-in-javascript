/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N皇后
 *
 * https://leetcode-cn.com/problems/n-queens/description/
 *
 * algorithms
 * Hard (68.48%)
 * Likes:    376
 * Dislikes: 0
 * Total Accepted:    35.4K
 * Total Submissions: 51.4K
 * Testcase Example:  '4'
 *
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *
 *
 *
 * 上图为 8 皇后问题的一种解法。
 *
 * 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
 *
 * 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 * 示例:
 *
 * 输入: 4
 * 输出: [
 * ⁠[".Q..",  // 解法 1
 * ⁠ "...Q",
 * ⁠ "Q...",
 * ⁠ "..Q."],
 *
 * ⁠["..Q.",  // 解法 2
 * ⁠ "Q...",
 * ⁠ "...Q",
 * ⁠ ".Q.."]
 * ]
 * 解释: 4 皇后问题存在两个不同的解法。
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const res = [];
  const map = Array(n)
    .fill('')
    .map(x => Array(n).fill('.'));

  backtrack(map, 0);
  return res;

  function backtrack(map, row) {
    if (row >= n) {
      res.push(map.map(arr => arr.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      // 判断该位置放皇后是否与上面几行冲突
      if (isValid(map, row, col)) {
        // 若选择，则在该点放皇后，并向下一行递归
        map[row][col] = 'Q';
        backtrack(map, row + 1);

        // 否则取消该选择，遍历下一个点
        map[row][col] = '.';
      }
    }
  }

  function isValid(map, row, col) {
    // 检查同一列是否有皇后
    for (let i = 0; i < row; i++) {
      if (map[i][col] === 'Q') return false;
    }
    // 检查左上斜线是否有皇后
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (map[i][j] === 'Q') return false;
    }
    // 检查右上斜线是否有皇后
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (map[i][j] === 'Q') return false;
    }
    return true;
  }
};

// @lc code=end

console.log(solveNQueens(5));
