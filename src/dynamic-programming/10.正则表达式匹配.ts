/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 *
 * https://leetcode.cn/problems/regular-expression-matching/description/
 *
 * algorithms
 * Hard (31.61%)
 * Likes:    3006
 * Dislikes: 0
 * Total Accepted:    278.3K
 * Total Submissions: 880.4K
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *
 *
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 *
 *
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aa", p = "a"
 * 输出：false
 * 解释："a" 无法匹配 "aa" 整个字符串。
 *
 *
 * 示例 2:
 *
 *
 * 输入：s = "aa", p = "a*"
 * 输出：true
 * 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "ab", p = ".*"
 * 输出：true
 * 解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 20
 * 1 <= p.length <= 30
 * s 只包含从 a-z 的小写字母。
 * p 只包含从 a-z 的小写字母，以及字符 . 和 *。
 * 保证每次出现字符 * 时，前面都匹配到有效的字符
 *
 *
 */

// @lc code=start
function isMatch(s: string, p: string): boolean {
  const dp: boolean[][] = Array(s.length + 1)
    .fill(0)
    .map(x => Array(p.length + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      if (j >= 2 && p[j - 1] === '*') {
        // 当*前的一个字符未被匹配时，那么匹配字符串p的前两个字符都可以被去掉了
        const isNoneMatch = dp[i][j - 2];
        // 若p中*的前一个字符被s当前字符匹配上，则认为匹配，结果与去除s当前字符的情况相同
        const isOnceMatch = i >= 1 && (s[i - 1] === p[j - 2] || p[j - 2] === '.') ? dp[i - 1][j] : false;
        dp[i][j] = isNoneMatch || isOnceMatch;
      } else {
        // 将s与p的当前字符作比对，如相符或者p中字符为.通配符，则结果与dp[i-1][j-1]相同
        const isMatch = i >= 1 && (s[i - 1] === p[j - 1] || p[j - 1] === '.') ? dp[i - 1][j - 1] : false;
        dp[i][j] = isMatch;
      }
    }
  }
  return dp[s.length][p.length];
}
// @lc code=end

(() => {
  const s = 'aa',
    p = 'a*';
  console.log(isMatch(s, p));
})();
