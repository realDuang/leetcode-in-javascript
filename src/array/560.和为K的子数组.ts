/*
 * @lc app=leetcode.cn id=560 lang=typescript
 *
 * [560] 和为 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (44.27%)
 * Likes:    2702
 * Dislikes: 0
 * Total Accepted:    676.5K
 * Total Submissions: 1.5M
 * Testcase Example:  '[1,1,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
 *
 * 子数组是数组中元素的连续非空序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 *
 *
 */

// @lc code=start
function subarraySum(nums: number[], k: number): number {
  // 先算出前缀和
  const preSum = Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    preSum[i + 1] = nums[i] + preSum[i];
  }

  // 因为前缀和中任意两个数 pre[i] 与 pre[j] 的差,即为数组 i~j 的和，代表一种子数组的情况
  // 问题转换成，preSum 数组中有多少种情况使得其中两数之差为 k， 即 pre[i] - pre[j] = k
  // 等价于 pre[j] = pre[i] - k，其中 i > j
  const hash: Record<string, number> = {};
  let result = 0;
  for (let i = 0; i < preSum.length; i++) {
    const preI = preSum[i];
    const preJ = preI - k;

    // 如果找到符合要求的和 pre[j]，result 中加上该种情况
    result += hash[preJ] ? hash[preJ] : 0;

    // 将当前的数字存入 hash 中方便后面以 O1 的复杂度取到
    hash[preI] = hash[preI] ? hash[preI] + 1 : 1;
  }

  return result;
}
// @lc code=end

(() => {
  const nums = [1, 1, -1, 1, -1],
    k = 1;
  console.log(subarraySum(nums, k));
})();
