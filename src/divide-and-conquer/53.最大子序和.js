/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 *
 * https://leetcode-cn.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (49.88%)
 * Likes:    1797
 * Dislikes: 0
 * Total Accepted:    197.7K
 * Total Submissions: 394.8K
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 *
 * 示例:
 *
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 *
 *
 * 进阶:
 *
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  return SubHelper(nums, 0, nums.length - 1);
};

function SubHelper(nums, l, r) {
  if (l === r) return nums[l];
  let sum = 0;
  let leftMax = Number.MIN_SAFE_INTEGER;
  let rightMax = Number.MIN_SAFE_INTEGER;
  const mid = l + ((r - l) >> 1);
  const subLeft = SubHelper(nums, l, mid);
  const subRight = SubHelper(nums, mid + 1, r);
  for (let i = mid; i >= l; i--) {
    sum += nums[i];
    if (sum > leftMax) leftMax = sum;
  }
  sum = 0;
  for (let i = mid + 1; i <= r; i++) {
    sum += nums[i];
    if (sum > rightMax) rightMax = sum;
  }
  return Math.max(leftMax + rightMax, subLeft, subRight);
}
// @lc code=end

// 最大子序列和的位置有以下三种情况：

// 1. 考虑中间元素nums[m], 跨越左右两部分，这里从中间元素开始，往左求出后缀最大，往右求出前缀最大, 保持连续性。
// 2. 不考虑中间元素，最大子序列和出现在左半部分，递归求解左边部分最大子序列和
// 3. 不考虑中间元素，最大子序列和出现在右半部分，递归求解右边部分最大子序列和
// 分别求出三种情况下最大子序列和，三者中最大值即为最大子序列和。

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
