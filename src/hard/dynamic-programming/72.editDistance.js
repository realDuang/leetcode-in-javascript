/*
 * @lc app=leetcode id=72 lang=javascript
 *
 * [72] Edit Distance
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
