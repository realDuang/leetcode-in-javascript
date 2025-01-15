/*
 * @lc app=leetcode.cn id=930 lang=typescript
 *
 * [930] 和相同的二元子数组
 *
 * https://leetcode.cn/problems/binary-subarrays-with-sum/description/
 *
 * algorithms
 * Medium (56.56%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    57.7K
 * Total Submissions: 100.6K
 * Testcase Example:  '[1,0,1,0,1]\n2'
 *
 * 给你一个二元数组 nums ，和一个整数 goal ，请你统计并返回有多少个和为 goal 的 非空 子数组。
 *
 * 子数组 是数组的一段连续部分。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,0,1,0,1], goal = 2
 * 输出：4
 * 解释：
 * 有 4 个满足题目要求的子数组：[1,0,1]、[1,0,1,0]、[0,1,0,1]、[1,0,1]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,0,0,0], goal = 0
 * 输出：15
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * nums[i] 不是 0 就是 1
 * 0
 *
 *
 */

// @lc code=start
function numSubarraysWithSum(nums: number[], goal: number): number {
  // 可以将题目转变为两个：
  // 返回有多少个和大于 goal 的数组 以及 返回有多少个和大于等于 goal 的数组
  // 最后两者数量相减即可获取和 恰好等于 goal 的数组个数
  const res = slideWindow(true) - slideWindow(false);

  return res;

  function slideWindow(includeEqual: boolean) {
    let l = 0;
    let r = 0;
    let temp = 0;
    let ans = 0;

    while (r < nums.length) {
      temp += nums[r];

      while (l <= r && (includeEqual ? temp >= goal : temp > goal)) {
        temp -= nums[l];
        l++;
      }

      ans += l;
      r++;
    }

    return ans;
  }
}

// @lc code=end

(() => {
  const nums = [1, 1, 1, 1, 1],
    goal = 5;
  console.log(numSubarraysWithSum(nums, goal));
})();
