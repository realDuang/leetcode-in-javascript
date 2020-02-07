/*
 * @lc app=leetcode id=1143 lang=javascript
 *
 * [1143] Longest Common Subsequence
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  const len1 = text1.length;
  const len2 = text2.length;
  if (len1 === 0 || len2 === 0) return 0;
  const dp = new Array(len1 + 1).fill(0).map(x => new Array(len2 + 1).fill(0));

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j - 1] + 1, dp[i][j]);
      }
    }
  }
  return dp[len1][len2];
};

// @lc code=end

// 最长公共子序列是字符串动态规划里最经典的题型之一了，动态规划最重要的思想就是将题型转化为递归调用的子问题，并对子问题求解。
// 这里可以构建一个二维数组，横轴和纵轴分别为text1和text2的每一个字符，dp[i][j]表示text1.slice(0,i)和text2.slice(0,j)的最大公共子序列。通过观察二维数组很容易得出状态转移方程：
// 当text1[i] !== text2[j]时，dp[i][j] = max(dp[i-1][j], dp[i][j-1])
// 当text1[i] === text2[j]时，dp[i][j] = max(dp[i-1][j-1] + 1, dp[i-1][j], dp[i][j-1])

// 同时可以看出dp[i][j]应当只与dp[i-1][j]、dp[i][j-1]、dp[i-1][j-1]有关。因此也可以通过只三个变量加上一行的一维数组存储，从而节省空间复杂度。就不在此多说了。

console.log(longestCommonSubsequence('bsbininm', 'jmjkbkjkv'));
