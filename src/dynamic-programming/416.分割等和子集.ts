/*
 * @lc app=leetcode.cn id=416 lang=typescript
 *
 * [416] 分割等和子集
 *
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (51.29%)
 * Likes:    1151
 * Dislikes: 0
 * Total Accepted:    214.3K
 * Total Submissions: 417.9K
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,5,11,5]
 * 输出：true
 * 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,5]
 * 输出：false
 * 解释：数组不能分割成两个元素和相等的子集。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 */

// @lc code=start
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((curr, prev) => curr + prev);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const len = nums.length;

  const dp: boolean[] = Array(target + 1).fill(false);

  // 当背包容量为 0 时，任何情况都能满足要求（不装）
  dp[0] = true;

  for (let i = 1; i <= len; i++) {
    for (let j = target + 1; j > 0; j--) {
      if (j >= nums[i - 1]) {
        // 若当前物品容量没有超过背包总容量，则分为两种情况
        // 一种是不取当前物品，保持原样
        // 若取当前物品，则判断当前物品 i 是否正好能装满背包剩余容量 j - nums[i - 1]
        // 有一种情况为 true，当前结果都为 true
        dp[j] = dp[j] || dp[j - nums[i - 1]];
      }
    }
  }
  return dp[target];
}
// @lc code=end

(() => {
  const nums = [1, 2, 5];
  console.log(canPartition(nums));
})();
