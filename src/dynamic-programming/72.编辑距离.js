/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 *
 * https://leetcode-cn.com/problems/edit-distance/description/
 *
 * algorithms
 * Hard (56.61%)
 * Likes:    763
 * Dislikes: 0
 * Total Accepted:    50.2K
 * Total Submissions: 84.7K
 * Testcase Example:  '"horse"\n"ros"'
 *
 * 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
 *
 * 你可以对一个单词进行如下三种操作：
 *
 *
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 *
 *
 * 示例 2：
 *
 * 输入：word1 = "intention", word2 = "execution"
 * 输出：5
 * 解释：
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 *
 *
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  const len1 = word1.length;
  const len2 = word2.length;
  const dp = new Array(len1 + 1).fill(0).map(x => new Array(len2 + 1).fill(0));

  for (let i = 0; i <= len2; i++) {
    dp[0][i] = i;
  }

  for (let i = 1; i <= len1; i++) {
    dp[i][0] = i;
    for (let j = 1; j <= len2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  return dp[len1][len2];
};
// @lc code=end

// 设原问题为word1.slice(0, i)转变为word2.slice(0, j)
// 涉及到双字符串匹配的动态规划问题永远是两个字符串中字符的比较，并且结果也只分为两类，相等和不相等。
// 若相等，则表示这两个字符匹配，不需要做任何操作，子问题直接变为word1.slice(0, i-1)转化为word2.slice(0, j-1)
// 若不相等，需要对字符进行操作，step+1。这里对字符串有三种操作，分别是:
// 删除，子问题即word1.slice(0, i-1)转变为word2.slice(0, j)
// 替换，子问题即word1.slice(0, i-1)转变为word2.slice(0, j-1)
// 添加，子问题即word1.slice(0, i)转变为word2.slice(0, j-1)
// 另外需要注意的是边界值的问题，为字符串与空字符的比较，因此第一横行与第一竖行的值从0递增，即不断执行添加操作。

// minDistance = function(word1, word2) {
//   const len1 = word1.length;
//   const len2 = word2.length;

//   const dp = new Array(len1 + 1).fill(0).map(x => new Array(len2 + 1).fill(0));
//   for (let i = 0; i <= len2; i++) {
//     dp[0][i] = i;
//   }
//   for (let i = 0; i <= len1; i++) {
//     dp[i][0] = i;
//   }
//   for (let i = 1; i <= len1; i++) {
//     for (let j = 1; j <= len2; j++) {
//       if (word1[i - 1] === word2[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1];
//       } else {
//         dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
//       }
//     }
//   }
//   return dp[len1][len2];
// };

console.log(minDistance('ros', 'horse'));
