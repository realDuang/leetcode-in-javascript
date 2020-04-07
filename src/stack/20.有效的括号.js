/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (41.21%)
 * Likes:    1495
 * Dislikes: 0
 * Total Accepted:    246.3K
 * Total Submissions: 596.1K
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 *
 *
 * 注意空字符串可被认为是有效字符串。
 *
 * 示例 1:
 *
 * 输入: "()"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: "()[]{}"
 * 输出: true
 *
 *
 * 示例 3:
 *
 * 输入: "(]"
 * 输出: false
 *
 *
 * 示例 4:
 *
 * 输入: "([)]"
 * 输出: false
 *
 *
 * 示例 5:
 *
 * 输入: "{[]}"
 * 输出: true
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const left = new Set(['{', '[', '(']);
  const right = new Set(['}', ']', ')']);
  const map = {
    '}': '{',
    ']': '[',
    ')': '('
  };
  for (let i = 0; i < s.length; i++) {
    if (left.has(s[i])) {
      stack.push(s[i]);
    }
    if (right.has(s[i])) {
      if (stack.length === 0) {
        return false;
      }
      if (map[s[i]] !== stack[stack.length - 1]) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  if (stack.length === 0) {
    return true;
  }
  return false;
};
// @lc code=end

console.log(isValid('{[]()'));
