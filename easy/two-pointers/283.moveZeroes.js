/*
 * @lc app=leetcode id=283 lang=javascript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
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
