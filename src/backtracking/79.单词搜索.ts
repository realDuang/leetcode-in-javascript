/*
 * @lc app=leetcode.cn id=79 lang=typescript
 *
 * [79] 单词搜索
 *
 * https://leetcode-cn.com/problems/word-search/description/
 *
 * algorithms
 * Medium (46.15%)
 * Likes:    1184
 * Dislikes: 0
 * Total Accepted:    267.7K
 * Total Submissions: 580K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false
 * 。
 *
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "ABCCED"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "SEE"
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
 * "ABCB"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == board.length
 * n = board[i].length
 * 1
 * 1
 * board 和 word 仅由大小写英文字母组成
 *
 *
 *
 *
 * 进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
 *
 */

// @lc code=start
function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;
  const wordLen = word.length;
  const visited: number[][] = Array(m)
    .fill(0)
    .map(x => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const flag = backtrack(i, j, 0);
      // 剪枝：当找到了一次匹配时，不继续进行遍历了
      if (flag) return true;
    }
  }
  return false;

  function backtrack(i: number, j: number, index: number): boolean {
    // 剪枝：数组越界或者被访问过，直接 return
    if (i < 0 || i >= m || j < 0 || j >= n || visited[i][j] !== 0) return false;
    // 剪枝：当前节点与目标不匹配，直接 return
    if (board[i][j] !== word[index]) return false;

    // 已经比对到 word 最后一个字符，且当前节点与目标匹配，则说明找到了答案，直接返回true。
    if (index === wordLen - 1) {
      return true;
    }

    // 做选择
    visited[i][j] = 1;
    // 递归
    // 剪枝：当发现其中一条路径已经走通，则不进行下面的递归了。
    const result =
      backtrack(i + 1, j, index + 1) ||
      backtrack(i - 1, j, index + 1) ||
      backtrack(i, j + 1, index + 1) ||
      backtrack(i, j - 1, index + 1);
    // 撤销选择
    visited[i][j] = 0;

    return result;
  }
}
// @lc code=end

(() => {
  const board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    word = 'ABCB';
  console.log(exist(board, word));
})();
