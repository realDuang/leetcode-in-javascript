/*
 * @lc app=leetcode.cn id=494 lang=typescript
 *
 * [494] 目标和
 *
 * https://leetcode-cn.com/problems/target-sum/description/
 *
 * algorithms
 * Medium (49.07%)
 * Likes:    1137
 * Dislikes: 0
 * Total Accepted:    202.6K
 * Total Submissions: 413K
 * Testcase Example:  '[1,1,1,1,1]\n3'
 *
 * 给你一个整数数组 nums 和一个整数 target 。
 *
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 *
 *
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 *
 *
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], target = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * 0
 * -1000
 *
 *
 */

// @lc code=start
function findTargetSumWays(nums: number[], target: number): number {
  // 每个数字有两个选择，加或者减
  // 设所有添加减号的整数和为negSum，则所有添加加号的整数和为 sum - negSum
  // 若需要符合题意的话，需要满足 (sum - negSum) - negSum = target
  // 则可得：negSum = (sum - target) / 2，且 negSum 一定为非负整数，否则无法由非负整数构造出来
  const sum = nums.reduce((prev, curr) => prev + curr);
  const negSum = (sum - target) / 2;
  if (negSum < 0 || negSum % 1 !== 0) return 0;

  const len = nums.length;

  // 接下来的问题就转变为：是否选取某个数字加入到 negSum 中，转变为0-1背包问题
  const dp = Array(len + 1)
    .fill(0)
    .map(x => Array(negSum + 1).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= len; i++) {
    // 由于 i 从 1 计数，取数字索引时减掉 offset
    const num = nums[i - 1];
    for (let j = 0; j <= negSum; j++) {
      dp[i][j] = dp[i - 1][j];
      // 如果当前数字比背包剩余量小，则只能选择不取
      // 若可以选择当前值，表达式数量可以加上，背包剩余量为 j - nums[i-1] 的情况
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }
  return dp[len][negSum];
}
// @lc code=end

(() => {
  const nums = [1, 1, 1, 1, 1],
    target = 3;
  console.log(findTargetSumWays(nums, target));
})();
