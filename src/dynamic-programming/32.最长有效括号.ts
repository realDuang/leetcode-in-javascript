/*
 * @lc app=leetcode.cn id=32 lang=typescript
 *
 * [32] 最长有效括号
 *
 * https://leetcode.cn/problems/longest-valid-parentheses/description/
 *
 * algorithms
 * Hard (38.07%)
 * Likes:    2525
 * Dislikes: 0
 * Total Accepted:    463.2K
 * Total Submissions: 1.2M
 * Testcase Example:  '"(()"'
 *
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "(()"
 * 输出：2
 * 解释：最长有效括号子串是 "()"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = ")()())"
 * 输出：4
 * 解释：最长有效括号子串是 "()()"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = ""
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 3 * 10^4
 * s[i] 为 '(' 或 ')'
 *
 *
 *
 *
 */

// @lc code=start
function longestValidParentheses(s: string): number {
  const len = s.length;
  if (len <= 1) return 0;

  const stack = [];
  // dp[i] 定义：以 s[i]为结尾的最长合法括号子串的长度
  const dp: number[] = Array(s.length + 1).fill(0);

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === '(') {
      // 匹配到左括号，压栈，且当前s[i]结尾的子串肯定不合法
      stack.push(i);
      dp[i + 1] = 0;
    } else {
      if (stack.length === 0) {
        // 没有匹配的左括号，不合法
        dp[i + 1] = 0;
      } else {
        // 最长长度为，当前位置与匹配到的左括号的距离，加上匹配到左括号前的最长子串
        const leftIndex = stack.pop();
        dp[i + 1] = dp[leftIndex] + i - leftIndex + 1;
      }
    }
  }

  const res = Math.max(...dp);
  return res;
}
// @lc code=end

(() => {
  const s = '(()(()())))()((())()()';
  console.log(longestValidParentheses(s));
})();
