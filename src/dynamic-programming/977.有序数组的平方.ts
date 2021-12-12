/*
 * @lc app=leetcode.cn id=977 lang=typescript
 *
 * [977] 有序数组的平方
 *
 * https://leetcode-cn.com/problems/squares-of-a-sorted-array/description/
 *
 * algorithms
 * Easy (70.37%)
 * Likes:    369
 * Dislikes: 0
 * Total Accepted:    208.2K
 * Total Submissions: 296K
 * Testcase Example:  '[-4,-1,0,3,10]'
 *
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-4,-1,0,3,10]
 * 输出：[0,1,9,16,100]
 * 解释：平方后，数组变为 [16,1,0,9,100]
 * 排序后，数组变为 [0,1,9,16,100]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [-7,-3,2,3,11]
 * 输出：[4,9,9,49,121]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 10^4
 * -10^4
 * nums 已按 非递减顺序 排序
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 请你设计时间复杂度为 O(n) 的算法解决本问题
 *
 *
 */

// @lc code=start
function sortedSquares(nums: number[]): number[] {
  const res: number[] = [];

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const resLeft = Math.pow(nums[left], 2);
    const resRight = Math.pow(nums[right], 2);
    if (resLeft > resRight) {
      res.unshift(resLeft);
      left += 1;
    } else {
      res.unshift(resRight);
      right -= 1;
    }
  }

  return res;
}
// @lc code=end

(() => {
  const nums = [-4, -1];
  console.log(sortedSquares(nums));
})();

// function sortedSquares(nums: number[]): number[] {
//   const last = nums.length - 1;
//   const res: number[] = [];

//   // right指针找出最小的非负整数的位置
//   let right = last;
//   for (let i = last; i >= 0; i--) {
//     if (nums[i] < 0) break;
//     right = i;
//   }

//   let left = right - 1;

//   while (left >= 0 && right <= last) {
//     const resLeft = Math.pow(nums[left], 2);
//     const resRight = Math.pow(nums[right], 2);
//     if (resLeft > resRight) {
//       res.push(resRight);
//       right += 1;
//     } else {
//       res.push(resLeft);
//       left -= 1;
//     }
//   }

//   // 下面最多只会二选一
//   for (let i = left; i >= 0; i--) {
//     res.push(Math.pow(nums[i], 2));
//   }
//   for (let i = right; i <= last; i++) {
//     res.push(Math.pow(nums[i], 2));
//   }

//   return res;
// }
