/*
 * @lc app=leetcode.cn id=52 lang=javascript
 *
 * [52] N皇后 II
 *
 * https://leetcode-cn.com/problems/n-queens-ii/description/
 *
 * algorithms
 * Hard (77.56%)
 * Likes:    111
 * Dislikes: 0
 * Total Accepted:    20.5K
 * Total Submissions: 26.3K
 * Testcase Example:  '4'
 *
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *
 *
 *
 * 上图为 8 皇后问题的一种解法。
 *
 * 给定一个整数 n，返回 n 皇后不同的解决方案的数量。
 *
 * 示例:
 *
 * 输入: 4
 * 输出: 2
 * 解释: 4 皇后问题存在如下两个不同的解法。
 * [
 * [".Q..",  // 解法 1
 * "...Q",
 * "Q...",
 * "..Q."],
 *
 * ["..Q.",  // 解法 2
 * "Q...",
 * "...Q",
 * ".Q.."]
 * ]
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
  let res = 0;
  const map = Array(n)
    .fill('')
    .map(x => Array(n).fill('.'));
  backtrack(map, 0);
  return res;

  function backtrack(map, row) {
    if (row >= n) {
      res += 1;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(map, row, col)) {
        map[row][col] = 'Q';
        backtrack(map, row + 1);
        map[row][col] = '.';
      }
    }
  }

  function isValid(map, row, col) {
    let i = row - 1;
    let topLeft = col - 1;
    let topRight = col + 1;
    while (i >= 0) {
      if (map[i][topLeft] === 'Q' || map[i][col] === 'Q' || map[i][topRight] === 'Q') return false;
      i--;
      topLeft--;
      topRight++;
    }

    return true;
  }
};
// @lc code=end

console.log(totalNQueens(4));
