/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let lp = 0;
  let rp = 0;
  while (rp < nums.length) {
    if (nums[lp] !== nums[rp]) {
      lp++;
      nums[lp] = nums[rp];
    }
    rp++;
  }
  return lp + 1;
};
// @lc code=end

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
