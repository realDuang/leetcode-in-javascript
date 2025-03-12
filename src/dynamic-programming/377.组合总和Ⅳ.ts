/*
 * @lc app=leetcode.cn id=377 lang=typescript
 *
 * [377] 组合总和 Ⅳ
 *
 * https://leetcode.cn/problems/combination-sum-iv/description/
 *
 * algorithms
 * Medium (53.16%)
 * Likes:    1108
 * Dislikes: 0
 * Total Accepted:    254.6K
 * Total Submissions: 474.3K
 * Testcase Example:  '[1,2,3]\n4'
 *
 * 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。
 *
 * 题目数据保证答案符合 32 位整数范围。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3], target = 4
 * 输出：7
 * 解释：
 * 所有可能的组合为：
 * (1, 1, 1, 1)
 * (1, 1, 2)
 * (1, 2, 1)
 * (1, 3)
 * (2, 1, 1)
 * (2, 2)
 * (3, 1)
 * 请注意，顺序不同的序列被视作不同的组合。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [9], target = 3
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * nums 中的所有元素 互不相同
 * 1
 *
 *
 *
 *
 * 进阶：如果给定的数组中含有负数会发生什么？问题会产生何种变化？如果允许负数出现，需要向题目中添加哪些限制条件？
 *
 */

// @lc code=start
function combinationSum4(nums: number[], target: number): number {
  // memo[i] 表示当 target 为 i 时可以产生的组合总数。
  const memo = Array(target + 1).fill(-1);
  memo[0] = 1;

  dfs(target);
  return memo[target];

  function dfs(rest: number) {
    if (memo[rest] !== -1) return memo[rest];

    let res = 0;
    for (const num of nums) {
      if (rest - num >= 0) {
        res += dfs(rest - num);
      }
    }
    memo[rest] = res;
    return res;
  }
}
// @lc code=end

// function combinationSum4(nums: number[], target: number): number {
//   const dp = Array(target + 1).fill(0);
//   dp[0] = 1;

//   nums.sort((a, b) => a - b);

//   for (let i = 1; i <= target; i++) {
//     for (let j = 0; j < nums.length && i >= nums[j]; j++) {
//       dp[i] += dp[i - nums[j]];
//     }
//   }
//   return dp[target];
// }

(() => {
  let nums = [1, 2, 3],
    target = 4;
  console.log(combinationSum4(nums, target));
})();
