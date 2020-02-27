/*
 * @lc app=leetcode id=75 lang=javascript
 *
 * [75] Sort Colors
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  let p1 = 0;
  let p2 = nums.length - 1;
  let cur = p1;
  while (cur <= p2) {
    if (nums[cur] === 0) {
      const temp = nums[cur];
      nums[cur] = nums[p1];
      nums[p1] = temp;
      p1++;
      cur++;
    } else if (nums[cur] === 2) {
      const temp = nums[cur];
      nums[cur] = nums[p2];
      nums[p2] = temp;
      p2--;
    } else {
      cur++;
    }
  }
};
// @lc code=end

// 这是一道原地算法，并且只遍历一遍数组，因此考虑用首尾双指针解题。
// 由于总共只有三个数的排序，因此遍历数组时，遇到0向左边指针交换，2向右边指针交换即可。因此在遍历过的数字中，首指针永远指向第一个不为0的位置，尾指针永远指向最后一个不为2的位置。
// 这里面的核心思想跟快速排序有点像，都是首尾指针与目标位置交换。不过由于总共只有三个数，因此在循环内即可完成最终位置交换，不需要再递归子数组了。

const arr = [2, 1, 0, 2, 2, 1, 0, 0, 1, 1, 2];
sortColors(arr);
console.log(arr);
