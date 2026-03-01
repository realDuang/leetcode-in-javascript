/*
 * @lc app=leetcode.cn id=44 lang=typescript
 *
 * [44] 通配符匹配
 *
 * https://leetcode.cn/problems/wildcard-matching/description/
 *
 * algorithms
 * Hard (33.81%)
 * Likes:    1047
 * Dislikes: 0
 * Total Accepted:    137.6K
 * Total Submissions: 407.3K
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给你一个输入字符串 (s) 和一个字符模式 (p) ，请你实现一个支持 '?' 和 '*' 匹配规则的通配符匹配：
 *
 *
 * '?' 可以匹配任何单个字符。
 * '*' 可以匹配任意字符序列（包括空字符序列）。
 *
 *
 *
 *
 * 判定匹配成功的充要条件是：字符模式必须能够 完全匹配 输入字符串（而不是部分匹配）。
 *
 *
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
 * 示例 2：
 *
 *
 * 输入：s = "aa", p = "*"
 * 输出：true
 * 解释：'*' 可以匹配任意字符串。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "cb", p = "?a"
 * 输出：false
 * 解释：'?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length, p.length <= 2000
 * s 仅由小写英文字母组成
 * p 仅由小写英文字母、'?' 或 '*' 组成
 *
 *
 */

// @lc code=start
function isMatch(s: string, p: string): boolean {
  const sLen = s.length,
    pLen = p.length;
  const dp: boolean[] = Array(sLen + 1).fill(false);

  // 当p为空时，s为空时为true，s不为空时为false
  dp[0] = true;

  // 保存原算法中 dp[i - 1][j - 1] 的值，用于下一次循环
  let pre: boolean;

  for (let j = 1; j <= pLen; j++) {
    // 保存原算法中 dp[0][j-1] 的值
    pre = dp[0];

    // 当s为空时，p不为空时，只有当p的前j个所有的字符均为'*'时，结果才为true。其他情况均为false
    dp[0] = p[j - 1] === '*' ? dp[0] : false;

    for (let i = 1; i <= sLen; i++) {
      // 记录下来更改前的值，等价于 dp[i][j-1]
      const temp = dp[i];

      if (s[i - 1] === p[j - 1] || p[j - 1] === '?') {
        // 对应原来的 dp[i - 1][j - 1]。
        dp[i] = pre;
      } else if (p[j - 1] === '*') {
        // 分别对应原来的dp[i][j - 1]、dp[i - 1][j]、dp[i - 1][j - 1]。
        dp[i] = temp || dp[i - 1] || pre;
      } else {
        // 其他情况下，失去匹配，dp[i][j] = false。
        dp[i] = false;
      }

      // 最后给 pre 更新值，作为下一次循环中 dp[i - 1][j - 1] 的值
      pre = temp;
    }
  }

  return dp[sLen];
}
// @lc code=end

(() => {
  const inputs = [
    // ['aa', 'a'],
    ['abcd', 'a*b?']
    // ['cb', '?a'],
    // ['abcdefg', 'a*b?*g']
  ];
  inputs.forEach(item => {
    console.log(isMatch(item[0], item[1]));
  });
})();

// function isMatch(s: string, p: string): boolean {
//   const sLen = s.length,
//     pLen = p.length;
//   const dp: boolean[][] = Array(sLen + 1)
//     .fill(0)
//     .map(x => Array(pLen + 1).fill(false));

//   // 当p为空时，s为空时为true，s不为空时为false
//   dp[0][0] = true;

//   // 当s为空时，p不为空时，只有当p的前j个字符均为'*'时，dp[i][j]才为true。其他情况均为false
//   for (let j = 1; j <= pLen; j++) {
//     if (p[j - 1] === '*') {
//       dp[0][j] = true;
//     } else {
//       break;
//     }
//   }

//   for (let i = 1; i <= sLen; i++) {
//     for (let j = 1; j <= pLen; j++) {
//       if (s[i - 1] === p[j - 1] || p[j - 1] === '?') {
//         dp[i][j] = dp[i - 1][j - 1];
//       } else if (p[j - 1] === '*') {
//         // 此处共可能出现以下三种情况：
//         // '*'匹配0个字符，即dp[i][j] = dp[i][j - 1]。
//         // '*'匹配1个字符，即dp[i][j] = dp[i - 1][j - 1]。
//         // '*'匹配多个字符，即dp[i][j] = dp[i - 1][j]。
//         dp[i][j] = dp[i][j - 1] || dp[i - 1][j - 1] || dp[i - 1][j];
//       }
//       // 其他情况下，失去匹配，dp[i][j] = false。
//     }
//   }

//   return dp[sLen][pLen];
// }
