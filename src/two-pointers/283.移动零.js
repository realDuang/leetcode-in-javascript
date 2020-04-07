/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 *
 * https://leetcode-cn.com/problems/move-zeroes/description/
 *
 * algorithms
 * Easy (60.06%)
 * Likes:    544
 * Dislikes: 0
 * Total Accepted:    128.1K
 * Total Submissions: 212.5K
 * Testcase Example:  '[0,1,0,3,12]'
 *
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 示例:
 *
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 *
 * 说明:
 *
 *
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  for (let i = 0, j = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      j++;
    }
  }
};
// @lc code=end

// 因为是原地算法，因此考虑用快慢指针。
// 快指针不停向后遍历数组，慢指针指向数组第一个有0的位置。若快指针指向的值不为0，则交换快慢指针的值，并将慢指针+1，指向下一个0的位置(快慢指针之间的值必然全为0)
console.log(moveZeroes([0, 1, 0, 3, 12]));
