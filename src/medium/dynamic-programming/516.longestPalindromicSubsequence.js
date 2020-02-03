/*
 * @lc app=leetcode id=516 lang=javascript
 *
 * [516] Longest Palindromic Subsequence
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
  const len = s.length;
  if (len <= 0) return 0;
  let res = 1;
  const dp = new Array(len).fill(1);
  for (let i = len - 1; i >= 0; i--) {
    let tempRes = 0;
    for (let j = i + 1; j < len; j++) {
      const temp = dp[j];
      if (s[i] === s[j]) {
        dp[j] = tempRes + 2;
        res = Math.max(dp[j], res);
      }
      tempRes = Math.max(tempRes, temp);
    }
  }
  return res;
};
// @lc code=end

// 也是一道求最长回文子串的问题，求极值的问题我们通常用dp来解。
// dp同样先将子问题归类划分。设dp[i][j]表示s中从i到j是否可以形成回文。
// 本题一共有两种情况，如果左右两个字符相同，那么当前解转化为子串的最大回文长度dp[i+1][j-1]+2，如果左右两个字符不同，那么现字符串一定不是回文字符串，当前解转化为dp[i][j-1]或dp[i+1][j]中的较大值。
// var longestPalindromeSubseq = function(s) {
//   const len = s.length;
//   const dp = new Array(len).fill(0).map(x => new Array(len).fill(0));
//   for (let i = len - 1; i >= 0; i--) {
//     dp[i][i] = 1;
//     for (let j = i + 1; j < len; j++) {
//       if (s[i] === s[j]) {
//         dp[i][j] = dp[i + 1][j - 1] + 2;
//       } else {
//         dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
//       }
//     }
//   }
//   return dp[0][s.length - 1];
// };

// 观察dp子问题的依赖项，我们可以对空间进行优化，利用一维数组来解
console.log(longestPalindromeSubseq('bbbab'));
