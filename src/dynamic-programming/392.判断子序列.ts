/*
 * @lc app=leetcode.cn id=392 lang=typescript
 *
 * [392] 判断子序列
 *
 * https://leetcode.cn/problems/is-subsequence/description/
 *
 * algorithms
 * Easy (52.16%)
 * Likes:    651
 * Dislikes: 0
 * Total Accepted:    198.3K
 * Total Submissions: 380.2K
 * Testcase Example:  '"abc"\n"ahbgdc"'
 *
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 *
 *
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 *
 * 进阶：
 *
 * 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T
 * 的子序列。在这种情况下，你会怎样改变代码？
 *
 * 致谢：
 *
 * 特别感谢 @pbrother 添加此问题并且创建所有测试用例。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abc", t = "ahbgdc"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "axc", t = "ahbgdc"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * 0
 * 两个字符串都只由小写字符组成。
 *
 *
 */

// @lc code=start
function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  let j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i += 1;
      j += 1;
    } else {
      j += 1;
    }
  }
  return i === s.length;
}
// @lc code=end

// function isSubsequence(s: string, t: string): boolean {
//   const sLen = s.length;
//   const tLen = t.length;
//   if (sLen > tLen) return false;
//   const dp: number[][] = Array(sLen + 1)
//     .fill(0)
//     .map(x => Array(tLen + 1).fill(0));
//   // 字串s为空字符串时，恒成立
//   for (let j = 0; j <= tLen; j++) {
//     dp[0][j] = 1;
//   }
//   for (let i = 1; i <= sLen; i++) {
//     for (let j = i; j <= tLen; j++) {
//       // 如果不包含该字符的t的字串已经成立，则加上当前字符仍然成立
//       if (dp[i][j - 1]) {
//         dp[i][j] = 1;
//       }
//       // 如果两字符相等，且不包含两字符的各自字串符合条件，则当前情况也成立
//       else if (s[i - 1] === t[j - 1] && dp[i - 1][j - 1]) {
//         dp[i][j] = 1;
//       }
//     }
//   }
//   return !!dp[sLen][tLen];
// }

(() => {
  const s = 'abc',
    t = 'ahbgdc';
  console.log(isSubsequence(s, t));
})();
