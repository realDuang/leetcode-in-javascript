/*
 * @lc app=leetcode.cn id=413 lang=typescript
 *
 * [413] 等差数列划分
 *
 * https://leetcode-cn.com/problems/arithmetic-slices/description/
 *
 * algorithms
 * Medium (69.16%)
 * Likes:    412
 * Dislikes: 0
 * Total Accepted:    84.8K
 * Total Submissions: 122.7K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 如果一个数列 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该数列为等差数列。
 *
 *
 * 例如，[1,3,5,7,9]、[7,7,7,7] 和 [3,-1,-5,-9] 都是等差数列。
 *
 *
 *
 *
 * 给你一个整数数组 nums ，返回数组 nums 中所有为等差数组的 子数组 个数。
 *
 * 子数组 是数组中的一个连续序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,4]
 * 输出：3
 * 解释：nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -1000
 *
 *
 *
 *
 */

// @lc code=start
function numberOfArithmeticSlices(nums: number[]): number {
  let res = 0;
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    let diffValue: number | undefined;
    for (let j = i + 2; j < len; j++) {
      if (j - i === 2) {
        if (nums[j] - nums[j - 1] === nums[j - 1] - nums[j - 2]) {
          diffValue = nums[j] - nums[j - 1];
          res += 1;
        }
      } else {
        if (diffValue === undefined || nums[j] - nums[j - 1] !== diffValue) {
          // 当 i 到 j 不为等差数列后，后面的数字也不用继续判断了
          break;
        } else {
          res += 1;
        }
      }
    }
  }
  return res;
}
// @lc code=end

// 状态转移方程：
// 1. j - i === 2 时，当 nums[j] - nums[j-1] === nums[j-1] - nums[j-2] 时，dp[i][j] = nums[j] - nums[j-1]。
// 2. 其余情况下，当 nums[j] - nums[j-1] === dp[i][j-1] 时，dp[i][j] = dp[i][j-1]

// function numberOfArithmeticSlices(nums: number[]): number {
//   let res = 0;
//   const len = nums.length;
//   const dp: (number | null)[][] = Array(len)
//     .fill(0)
//     .map(x => Array(len).fill(null));

//   for (let i = 0; i < len; i++) {
//     for (let j = i + 2; j < len; j++) {
//       if (j - i === 2) {
//         if (nums[j] - nums[j - 1] === nums[j - 1] - nums[j - 2]) {
//           dp[i][j] = nums[j] - nums[j - 1];
//           res += 1;
//         }
//       } else {
//         if (dp[i][j - 1] !== null && nums[j] - nums[j - 1] === dp[i][j - 1]) {
//           dp[i][j] = dp[i][j - 1];
//           res += 1;
//         }
//       }
//     }
//   }
//   return res;
// }

(() => {
  const nums = [1, 3, 5, 6, 7];
  console.log(numberOfArithmeticSlices(nums));
})();
