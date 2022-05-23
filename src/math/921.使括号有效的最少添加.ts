/*
 * @lc app=leetcode.cn id=921 lang=typescript
 *
 * [921] 使括号有效的最少添加
 *
 * https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/
 *
 * algorithms
 * Medium (74.81%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    29.8K
 * Total Submissions: 39.9K
 * Testcase Example:  '"())"'
 *
 * 只有满足下面几点之一，括号字符串才是有效的：
 *
 *
 * 它是一个空字符串，或者
 * 它可以被写成 AB （A 与 B 连接）, 其中 A 和 B 都是有效字符串，或者
 * 它可以被写作 (A)，其中 A 是有效字符串。
 *
 *
 * 给定一个括号字符串 s ，移动N次，你就可以在字符串的任何位置插入一个括号。
 *
 *
 * 例如，如果 s = "()))" ，你可以插入一个开始括号为 "(()))" 或结束括号为 "())))" 。
 *
 *
 * 返回 为使结果字符串 s 有效而必须添加的最少括号数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "())"
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "((("
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 只包含 '(' 和 ')' 字符。
 *
 *
 */

// @lc code=start
function minAddToMakeValid(s: string): number {
  let res = 0;
  let leftNum = 0;
  for (let i = 0; i < s.length; i++) {
    // 当为左括号时，左括号计数器+1
    if (s[i] === '(') {
      leftNum += 1;
    } else {
      // 如果之前有左括号，则去除匹配的一对括号
      if (leftNum > 0) {
        leftNum -= 1;
      } else {
        // 否则此处应该增添一个左括号
        res += 1;
      }
    }
  }
  // 遍历结束时，应在结尾补充与多余左括号数量相等的右括号
  res += leftNum;
  return res;
}
// @lc code=end

(() => {
  const s = '(())(';
  console.log(minAddToMakeValid(s));
})();
