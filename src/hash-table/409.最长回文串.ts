/*
 * @lc app=leetcode.cn id=409 lang=typescript
 *
 * [409] 最长回文串
 *
 * https://leetcode.cn/problems/longest-palindrome/description/
 *
 * algorithms
 * Easy (55.58%)
 * Likes:    413
 * Dislikes: 0
 * Total Accepted:    123.4K
 * Total Submissions: 222K
 * Testcase Example:  '"abccccdd"'
 *
 * 给定一个包含大写字母和小写字母的字符串 s ，返回 通过这些字母构造成的 最长的回文串 。
 *
 * 在构造过程中，请注意 区分大小写 。比如 "Aa" 不能当做一个回文字符串。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入:s = "abccccdd"
 * 输出:7
 * 解释:
 * 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
 *
 *
 * 示例 2:
 *
 *
 * 输入:s = "a"
 * 输入:1
 *
 *
 * 示例 3:
 *
 *
 * 输入:s = "bb"
 * 输入: 2
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length <= 2000
 * s 只能由小写和/或大写英文字母组成
 *
 *
 */

// @lc code=start
function longestPalindrome(s: string): number {
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] ? (hash[s[i]] += 1) : (hash[s[i]] = 1);
  }
  // 每个字符最多可以取 2 的倍数个
  let res = Object.values(hash).reduce((prev, curr) => prev + Math.floor(curr / 2) * 2, 0);
  // 回文串允许在最中间有一个不同的字符
  return res === s.length ? res : res + 1;
}
// @lc code=end

(() => {
  const s = 'abccccdd';
  console.log(longestPalindrome(s));
})();
