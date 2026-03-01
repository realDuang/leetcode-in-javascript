/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 *
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (43.92%)
 * Likes:    607
 * Dislikes: 0
 * Total Accepted:    82.7K
 * Total Submissions: 187.4K
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 *
 * 示例:
 *
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 *
 * 说明:
 *
 *
 * 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
 * 你算法的时间复杂度应该为 O(n^2) 。
 *
 *
 * 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (!nums || nums.length <= 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let res = 1;

  for (let i = 1; i < nums.length; i++) {
    const cur = nums[i];
    for (let j = 0; j < i; j++) {
      if (nums[j] < cur) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
};
// @lc code=end

// 严格最长升序子序列，这道题如果是求连续最长升序子序列则非常简单，对数组进行一次双指针查询，往后遍历到小于前一个数为止记录两指针差值即可。
// 但这里的升序序列不一定连续，例如[2，5，3，4]这个数组就能分出[2,3,4]的升序子序列，如果再用上述办法暴力解的话就需要再多一次循环判断是否需要纳入当前快指针进入子序列。同时在这里也可以看出这中判断是存在最优子结构的，因此很容易联想到用动态规划来解。
// 构建一个一维数组dp[i]，表示以第i个数字为结尾的最长上升子序列的长度。dp[i]的值应为i之前所有比nums[i]小的值所对应的子序列长度中最长的+1。
// 这样很容易得到了状态转移方程：dp[i] = max(dp[j] + 1) (0<j<i && nums[j] < nums[i])

// 这样dp[n]求的是以数组最后一个数字结尾的最长升序子序列，如果要求整个数组的，只需要取dp中最大的值即可。

console.log(lengthOfLIS([10, 9, 2, 5, 3, 4]));
