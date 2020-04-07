/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 *
 * https://leetcode-cn.com/problems/regular-expression-matching/description/
 *
 * algorithms
 * Hard (26.86%)
 * Likes:    1081
 * Dislikes: 0
 * Total Accepted:    65.8K
 * Total Submissions: 242.4K
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * 
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 
 * 
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 
 * 说明:
 * 
 * 
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 * 
 * 
 * 示例 1:
 * 
 * 输入:
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串。
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * s = "aa"
 * p = "a*"
 * 输出: true
 * 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 * 
 * 
 * 示例 3:
 * 
 * 输入:
 * s = "ab"
 * p = ".*"
 * 输出: true
 * 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 * 
 * 
 * 示例 4:
 * 
 * 输入:
 * s = "aab"
 * p = "c*a*b"
 * 输出: true
 * 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
 * 
 * 
 * 示例 5:
 * 
 * 输入:
 * s = "mississippi"
 * p = "mis*is*p*."
 * 输出: false
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const dp = new Array(s.length + 1).fill(0).map(x => new Array(p.length + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      if (j > 1 && p[j - 1] === '*') {
        if (dp[i][j - 2]) {
          dp[i][j] = true;
        } else {
          if (i > 0 && (s[i - 1] === p[j - 2] || p[j - 2] === '.')) {
            dp[i][j] = dp[i - 1][j];
          }
        }
      } else {
        if (i > 0 && (s[i - 1] === p[j - 1] || p[j - 1] === '.')) {
          dp[i][j] = dp[i - 1][j - 1];
        }
      }
    }
  }
  console.log(dp);
  return dp[s.length][p.length];
};
// @lc code=end

// 这道题也可以尝试着用dp来解。一般来说，涉及到两字符串比较求极值的问题，通常都是建立一个二维数组dp[i][j]，然后让两字符串的每个字符充当横纵轴，然后查看结果是否匹配。定义好问题后，我们看下子问题分类，这里一共有两种情况。
// 1. 当正则字符串的前一个字符不为*时，那么就考虑s前一个字符是否被p前一个字符匹配了(即相等或.)，子问题化简为dp[i-1][j-1]。即：
// dp[i][j] = dp[i-1][j-1]  当dp[j-1] !== "*" && (s[i-1] === p[j-1] || p[j-1] === '.')
// 2. 当正则字符串的前一个字符为*时，子问题又要分化为两种情况，即：
// 1）在*前面的字符没有被匹配过，那么匹配字符串的前两个字符都可以被去掉了，即：
// dp[i][j] = dp[i][j-2] 当dp[j-1] === "*" && *前面的字符没有被匹配过
// 2）在*前面的字符被匹配过，那么就考虑s前一个字符是否被p前 两 个字符匹配了(即相等或.)(因为p前一个字符为*)，即：
// dp[i][j] = dp[i-1][j] 当dp[j-1] === "*" && *前面的字符被匹配过 && (s[i-1] === p[j-2] || p[j-1] === '.')

// var isMatch = function(s, p) {
//   const dp = new Array(s.length + 1).fill(0).map(x => new Array(p.length + 1).fill(false));
//   dp[0][0] = true;
//   for (let i = 0; i <= s.length; i++) {
//     for (let j = 1; j <= p.length; j++) {
//       if (j >= 2 && p[j - 1] === '*') {
//         const isNoneMatch = dp[i][j - 2];
//         const isOnceMatch = i > 0 && (p[j - 2] === '.' || s[i - 1] === p[j - 2]) && dp[i - 1][j];
//         dp[i][j] = isNoneMatch || isOnceMatch;
//       } else {
//         dp[i][j] = i > 0 && (p[j - 1] === '.' || s[i - 1] === p[j - 1]) && dp[i - 1][j - 1];
//       }
//     }
//   }
//   return dp[s.length][p.length];
// };

console.log(isMatch('ab', '.*'));