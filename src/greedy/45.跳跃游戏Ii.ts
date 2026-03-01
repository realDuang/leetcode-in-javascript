/*
 * @lc app=leetcode.cn id=45 lang=typescript
 *
 * [45] 跳跃游戏 II
 *
 * https://leetcode-cn.com/problems/jump-game-ii/description/
 *
 * algorithms
 * Medium (43.44%)
 * Likes:    1311
 * Dislikes: 0
 * Total Accepted:    234.2K
 * Total Submissions: 538.8K
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
 *
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 *
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
 *
 * 假设你总是可以到达数组的最后一个位置。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 * 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [2,3,0,1,4]
 * 输出: 2
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
function jump(nums: number[]): number {
  const len = nums.length;
  let end = 0;
  let greedy = 0;
  let jumps = 0;
  for (let i = 0; i < len - 1; i++) {
    greedy = Math.max(greedy, i + nums[i]);
    if (i === end) {
      jumps += 1;
      end = greedy;
    }
  }
  return jumps;
}
// @lc code=end

(() => {
  const nums = [2, 3, 1, 1, 2, 2, 1, 3];
  console.log(jump(nums));
})();

// function jump(nums: number[]): number {
//   const len = nums.length;
//   if (len === 1) return 0;
//   const dp = Array(len).fill(Number.MAX_SAFE_INTEGER);
//   dp[0] = 0;
//   for (let i = 1; i < len; i++) {
//     for (let j = 0; j < i; j++) {
//       // 如果从j点能跳跃到i点，则比较，取较小步数结果
//       if (j + nums[j] >= i) {
//         dp[i] = Math.min(dp[i], dp[j] + 1);
//       }
//     }
//   }
//   return dp[len - 1];
// }
