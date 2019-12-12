/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let res = '';
  const dp = new Array(s.length).fill(0).map(x => new Array(s.length));
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (j - i === 0) {
        dp[i][j] = true;
      } else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true;
      } else {
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      }
      if (dp[i][j] && res.length < j - i + 1) {
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
console.log(longestPalindrome('babad'));
