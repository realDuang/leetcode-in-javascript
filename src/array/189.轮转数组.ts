/*
 * @lc app=leetcode.cn id=189 lang=typescript
 *
 * [189] 轮转数组
 *
 * https://leetcode-cn.com/problems/rotate-array/description/
 *
 * algorithms
 * Medium (44.69%)
 * Likes:    1230
 * Dislikes: 0
 * Total Accepted:    388.3K
 * Total Submissions: 868.8K
 * Testcase Example:  '[1,2,3,4,5,6,7]\n3'
 *
 * 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 *
 *
 * 示例 2:
 *
 *
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释:
 * 向右轮转 1 步: [99,-1,-100,3]
 * 向右轮转 2 步: [3,99,-1,-100]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 * 0 <= k <= 10^5
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
 * 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
 *
 *
 *
 *
 *
 *
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  const len = nums.length;
  k = k % len;

  reverse(0, len - 1);
  reverse(0, k - 1);
  reverse(k, len - 1);

  function reverse(start: number, end: number) {
    let left = start;
    let right = end;
    while (left < right) {
      const temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      left++;
      right--;
    }
  }
}

// @lc code=end

(() => {
  const nums = [1, 2, 3, 4, 5, 6, 7];
  const k = 6;
  rotate(nums, k);
  console.log(nums);
})();

// function rotate(nums: number[], k: number): void {
//   const len = nums.length;
//   k = k % len;

//   const tempArr = [];
//   for (let i = len - k; i < len; i++) {
//     tempArr.push(nums[i]);
//   }

//   for (let i = len - 1; i >= k; i--) {
//     nums[i] = nums[i - k];
//   }

//   for (let i = 0; i < tempArr.length; i++) {
//     nums[i] = tempArr[i];
//   }
// }
