/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
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
