/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    let pre = 0;
    for (let j = 0; j < n; j++) {
      pre = dp[j] + pre;
      dp[j] = pre;
    }
  }
  return dp[n - 1];
};
// @lc code=end

console.log(uniquePaths(7, 3));

// 最简易的动态规划，每一格只能从上方往下走和左方往右走两种情况，因此将这两格的情况相加即可。

// const dp = new Array(m).fill(0).map(x => new Array(n).fill(0));
// for (let i = 0; i < n; i++) dp[0][i] = 1;
// for (let i = 1; i < m; i++) {
//   for (let j = 0; j < n; j++) {
//     if (j === 0) dp[i][j] = 1;
//     else dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
//   }
// }
// return dp[m - 1][n - 1];

// 由于每一格的取值只与上方与左方有关，因此我们可以化简为一维数组节省空间。一维数组存储对每一行遍历时上一行的数据，另外建一个变量pre存储遍历行时左边一格的数据，更新时指针右移，此时将pre于一维数组对应值更新即可。

// var uniquePaths = function(m, n) {
//   const smaller = (m < n ? m : n) - 1;
//   const bigger = (m > n ? m : n) - 1;

//   let dividend = 1;
//   let divisor = 1;
//   for (let i = 1; i <= smaller; i++) {
//     dividend *= bigger + i;
//     divisor *= i;
//   }
//   return dividend / divisor;
// };