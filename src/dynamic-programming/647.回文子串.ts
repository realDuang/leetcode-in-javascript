/*
 * @lc app=leetcode.cn id=647 lang=typescript
 *
 * [647] 回文子串
 *
 * https://leetcode.cn/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (68.21%)
 * Likes:    1508
 * Dislikes: 0
 * Total Accepted:    440K
 * Total Submissions: 645.1K
 * Testcase Example:  '"abc"'
 *
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
 *
 * 回文字符串 是正着读和倒过来读一样的字符串。
 *
 * 子字符串 是字符串中的由连续字符组成的一个序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 由小写英文字母组成
 *
 *
 */

// @lc code=start
function countSubstrings(s: string): number {
  let res = 0;

  // 设 dp[i][j] 为 i-j 字符串 是否是回文子串
  const dp: boolean[][] = Array(s.length)
    .fill(0)
    .map(x => Array(s.length).fill(false));

  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (s[i] === s[j]) {
        if (j - i < 2 || dp[i + 1][j - 1] === true) {
          dp[i][j] = true;
          res++;
        }
      }
    }
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(countSubstrings).auto();
})();
