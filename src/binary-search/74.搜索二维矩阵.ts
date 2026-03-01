/*
 * @lc app=leetcode.cn id=74 lang=typescript
 *
 * [74] 搜索二维矩阵
 *
 * https://leetcode-cn.com/problems/search-a-2d-matrix/description/
 *
 * algorithms
 * Medium (46.68%)
 * Likes:    561
 * Dislikes: 0
 * Total Accepted:    194.8K
 * Total Submissions: 417.1K
 * Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3'
 *
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 *
 *
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * -10^4
 *
 *
 */

// @lc code=start
function searchMatrix(matrix: number[][], target: number): boolean {
  const height = matrix.length;
  const width = matrix[0].length;

  let left = 0;
  let right = height * width - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midElement = matrix[Math.floor(mid / width)][mid % width];
    if (midElement === target) {
      return true;
    } else if (midElement < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}
// @lc code=end

(() => {
  // 从矩阵特性中，我们很容易看出，矩阵就是用一个升序数组从左至右一行一行排列而来的。
  // 那么，问题显然就变成了在有序数组中寻找目标值的问题。考虑使用二分查找来解
  const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    target = 3;
  console.log(searchMatrix(matrix, target));
})();
