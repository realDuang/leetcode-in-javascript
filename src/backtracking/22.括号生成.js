/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (73.67%)
 * Likes:    839
 * Dislikes: 0
 * Total Accepted:    94.3K
 * Total Submissions: 127.9K
 * Testcase Example:  '3'
 *
 * 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
 *
 * 例如，给出 n = 3，生成结果为：
 *
 * [
 * ⁠ "((()))",
 * ⁠ "(()())",
 * ⁠ "(())()",
 * ⁠ "()(())",
 * ⁠ "()()()"
 * ]
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const res = [];
  helper('', n, n, res);
  return res;
};

function helper(str, left, right, res) {
  if (left < 0 || right < 0 || left > right) return;
  if (left === 0) {
    str += ')'.repeat(right);
    res.push(str);
    return;
  }

  helper(str + '(', left - 1, right, res);
  helper(str + ')', left, right - 1, res);
}
// @lc code=end

console.log(generateParenthesis(3));

// 这道题可以用递归来解，本质上就是一次二叉树的深度优先遍历。难点关键在于如何剪枝，减少不必要的递归次数。
// 我们可以发现，若每次增加括号的过程中，若左括号的数量大于右括号，则当前递归一定是不合法的，直接剪掉。若左括号已经用完，那么将剩下的所有右括号全部加入进字符串即可。之后生成一种合法的字符串，然后加入到res数组中。
