/*
 * @lc app=leetcode.cn id=119 lang=typescript
 *
 * [119] 杨辉三角 II
 *
 * https://leetcode.cn/problems/pascals-triangle-ii/description/
 *
 * algorithms
 * Easy (68.74%)
 * Likes:    428
 * Dislikes: 0
 * Total Accepted:    228.5K
 * Total Submissions: 332.4K
 * Testcase Example:  '3'
 *
 * 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
 *
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 *
 *
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: rowIndex = 3
 * 输出: [1,3,3,1]
 *
 *
 * 示例 2:
 *
 *
 * 输入: rowIndex = 0
 * 输出: [1]
 *
 *
 * 示例 3:
 *
 *
 * 输入: rowIndex = 1
 * 输出: [1,1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 0
 *
 *
 *
 *
 * 进阶：
 *
 * 你可以优化你的算法到 O(rowIndex) 空间复杂度吗？
 *
 */

// @lc code=start
function getRow(rowIndex: number): number[] {
  const result: number[] = Array(rowIndex + 1).fill(0);
  result[0] = 1;
  for (let i = 1; i <= rowIndex; i++) {
    result[i] = Math.floor((result[i - 1] * (rowIndex - i + 1)) / i);
  }
  return result;
}
// @lc code=end

(() => {
  console.log(getRow(5));
})();

// function getRow(rowIndex: number): number[] {
//   const result: number[] = Array(rowIndex + 1).fill(0);
//   result[0] = 1;

//   for (let i = 1; i <= rowIndex; i++) {
//     for (let j = i; j > 0; j--) {
//       result[j] = result[j] + result[j - 1];
//     }
//   }
//   return result;
// }
