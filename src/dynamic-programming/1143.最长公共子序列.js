/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 *
 * https://leetcode-cn.com/problems/longest-common-subsequence/description/
 *
 * algorithms
 * Medium (58.62%)
 * Likes:    89
 * Dislikes: 0
 * Total Accepted:    14.7K
 * Total Submissions: 25K
 * Testcase Example:  '"abcde"\n"ace"'
 *
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列。
 *
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde"
 * 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
 *
 * 若这两个字符串没有公共子序列，则返回 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入：text1 = "abcde", text2 = "ace"
 * 输出：3
 * 解释：最长公共子序列是 "ace"，它的长度为 3。
 *
 *
 * 示例 2:
 *
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc"，它的长度为 3。
 *
 *
 * 示例 3:
 *
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * 解释：两个字符串没有公共子序列，返回 0。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= text1.length <= 1000
 * 1 <= text2.length <= 1000
 * 输入的字符串只含有小写英文字符。
 *
 *
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
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
