/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (26.14%)
 * Likes:    1969
 * Dislikes: 0
 * Total Accepted:    191.8K
 * Total Submissions: 728.4K
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？请你找出所有满足条件且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例：
 *
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 *
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (!nums || nums.length <= 0) return [];
  nums = nums.sort((a, b) => a - b);
  if (nums[0] > 0 || nums[nums.length - 1] < 0) return [];

  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (nums[i] === nums[i - 1]) continue;
    const target = 0 - nums[i];
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      let sum = nums[l] + nums[r];
      if (sum === target) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < target) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
};
// @lc code=end

// 这道题是Two Sum的升级版，需要三个数的和为0。那么我们可以想到，这三个数中的最小数必定为负数，并且另两个数的和等于这个数的相反数。
// 因此我们需要对数组从小到大进行排序，之后遍历一遍数组，每次固定住最小的那个数字，将它的相反数作为target。之后的解法就与Two Sum的解法完全一致了，由于另外两个数一定比最小数大，因此左右指针范围在当前位置+1到数组尾。
// 跟Two Sum稍有不同的是，当找到target的一组解后不能立即结束循环，因为有可能存在多组和为target的解。并且数字组成完全相同的解不能放入结果中，需要做好条件判断。
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
