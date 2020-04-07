/*
 * @lc app=leetcode.cn id=85 lang=javascript
 *
 * [85] 最大矩形
 *
 * https://leetcode-cn.com/problems/maximal-rectangle/description/
 *
 * algorithms
 * Hard (44.93%)
 * Likes:    373
 * Dislikes: 0
 * Total Accepted:    23.4K
 * Total Submissions: 51.8K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 *
 * 示例:
 *
 * 输入:
 * [
 * ⁠ ["1","0","1","0","0"],
 * ⁠ ["1","0","1","1","1"],
 * ⁠ ["1","1","1","1","1"],
 * ⁠ ["1","0","0","1","0"]
 * ]
 * 输出: 6
 *
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  let res = 0;

  const dpWidth = new Array(rowLen).fill(0).map(x => new Array(colLen).fill(0));
  for (let i = 0; i < rowLen; i++) {
    dpWidth[i][0] = matrix[i][0] === '0' ? 0 : 1;
    for (let j = 1; j < colLen; j++) {
      dpWidth[i][j] = matrix[i][j] === '0' ? 0 : dpWidth[i][j - 1] + 1;
    }
  }
  // 顶行插入一行0作为遍历终止条件
  dpWidth.unshift(new Array(colLen).fill(0));

  const dpArea = new Array(rowLen + 1).fill(0).map(x => new Array(colLen).fill(0));
  for (let i = 0; i < rowLen + 1; i++) {
    for (let j = 0; j < colLen; j++) {
      let widthMin = dpWidth[i][j];
      // 随着高度增加，最短边长*高度=面积
      for (let k = i; k >= 0 && dpWidth[k][j] !== 0; k--) {
        if (dpWidth[k][j] <= widthMin) {
          widthMin = dpWidth[k][j];
        }
        const height = i - k + 1;
        dpArea[i][j] = Math.max(dpArea[i][j], widthMin * height);
      }
      res = Math.max(res, dpArea[i][j]);
    }
  }
  return res;
};
// @lc code=end

// 这是一道hard难度的动态规划题，可能我的实现方式复杂度比较高，但是至少对于我来说，是最容易想到以及理解的。
// 问题的难点在于对子问题的定义，我们知道矩形面积=宽x高，可以通过这一特性求出那么我们先来建立一个二维数组dpWidth，记录每一个点在以该行为底边的矩形最大可能的宽，及连续的1的个数。
// 这个dp数组的状态转移方程非常好推导：dp[i][j] = matrix[i][j] === '0' ? 0 : dp[i][j-1]
// 我们知道了底边长，之后再求面积只需要获取高度即可，那么我们再建立一个二维数组dpArea，定义为：以每一个点为右下角所组成的所有可能的矩形，取其中的最大值，作为该点的值。求矩形的方法很简单，从该点向上遍历，将遍历距离作为矩形的高度，遍历过的 底边长最小值 作为矩形的宽，然后求出组成的矩形面积。一直向上遍历到记录值为0的位置，因为该点及以上一定不会形成同一个矩形。
// 注意边界值判定，需要给dpWidth最上面加一行作为求dpArea时遍历高度的终止条件。
// 求dpArea数组中的最大值即为问题的解。

console.log(
  maximalRectangle([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0']
  ])
);
