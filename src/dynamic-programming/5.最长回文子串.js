/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (29.08%)
 * Likes:    1966
 * Dislikes: 0
 * Total Accepted:    226.3K
 * Total Submissions: 773.9K
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let res = '';
  const dp = new Array(s.length).fill(false);
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = s.length - 1; j >= 0; j--) {
      if (i === j) {
        dp[j] = true;
      } else if (j - i === 1) {
        dp[j] = s[i] === s[j] ? true : false;
      } else {
        dp[j] = s[i] === s[j] && dp[j - 1];
      }
      if (dp[j] && j - i + 1 >= res.length) {
        res = s.substring(i, j + 1);
      }
    }
  }
  return res;
};
// @lc code=end

// 求最长回文子串，这是一道非常经典的字符串问题
// 如果用动态规划来解的话，这道题的状态转移方程非常好推导，设dp[i][j]表示s中从i到j是否可以形成回文，当首尾字符相等且去除首尾字符以外的子串为回文时，此字符串为回文。即：dp[i][j] = s[i] === s[j] && dp[i+1][j-1]
// 特例情况为：当j-i=0时，表示单个字符，那么一定是回文。当j-i=1时，表示临近的两个字符，只有他们相等时，该子串才为回文。
console.log(longestPalindrome('bcbca'));
