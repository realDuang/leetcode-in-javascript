/*
 * @lc app=leetcode.cn id=560 lang=typescript
 *
 * [560] 和为 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (46.39%)
 * Likes:    3130
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 2.3M
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
  let prefixSum = 0;
  let res = 0;

  const hashMap: Map<number, number> = new Map();
  // 前缀和 0 出现了 1 次
  hashMap.set(0, 1);

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    // 是否有 之前的前缀和 = prefixSum - k，有多少个就加多少个到 res 里
    res += hashMap.get(prefixSum - k) ?? 0;
    // 更新当前新的前缀和出现的次数
    hashMap.set(prefixSum, (hashMap.get(prefixSum) ?? 0) + 1);
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(subarraySum).auto();
})();
