/*
 * @lc app=leetcode.cn id=1049 lang=typescript
 *
 * [1049] 最后一块石头的重量 II
 *
 * https://leetcode.cn/problems/last-stone-weight-ii/description/
 *
 * algorithms
 * Medium (71.97%)
 * Likes:    1059
 * Dislikes: 0
 * Total Accepted:    270K
 * Total Submissions: 375.4K
 * Testcase Example:  '[2,7,4,1,8,1]'
 *
 * 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
 *
 * 每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
 *
 *
 * 如果 x == y，那么两块石头都会被完全粉碎；
 * 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
 *
 *
 * 最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：stones = [2,7,4,1,8,1]
 * 输出：1
 * 解释：
 * 组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
 * 组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
 * 组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
 * 组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
 *
 *
 * 示例 2：
 *
 *
 * 输入：stones = [31,26,33,21,40]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= stones.length <= 30
 * 1 <= stones[i] <= 100
 *
 *
 */

// @lc code=start
function lastStoneWeightII(stones: number[]): number {
  // 本质上是目标和，01背包问题，选出部分和接近但不超过 sum/2 的部分 A，这样可以保证两者差B-A最小
  const sum = stones.reduce((a, b) => a + b, 0);
  const target = Math.floor(sum / 2);

  // dp[i] 为是否可以选出总和容量为 i 的选择
  const dp = Array(target + 1).fill(false);
  dp[0] = true;

  // 01背包问题，先遍历选择，内部再倒序遍历背包容量
  for (const weight of stones) {
    for (let j = target; j >= weight; j--) {
      // 如果容量为 j 时选当前石头，则 j - weight 容量也需要可以被其他石头组成
      dp[j] = dp[j] || dp[j - weight];
    }
  }

  // 设选出的选出的容量为 A，则另一部分 B = sum - A
  // 则两者差为 B - A = sum - A - A = sum - 2*A
  // 那么最小差即为最接近 sum/2 的，且 dp[i] = true 的组合
  let k = target;
  while (k >= 0) {
    if (dp[k]) {
      return sum - 2 * k;
    }
    k--;
  }

  // 上述一定可以出结果的（因为k=0时 dp[0] = true），下面这行其实永远不会走到
  return -1;
}
// @lc code=end

(() => {
  LCT.func(lastStoneWeightII).auto();
  LCT.func(lastStoneWeightII).cases([
    {
      input: [[2, 7, 4, 1, 8, 1]],
      output: 1
    },
    {
      input: [[31, 26, 33, 21, 40]],
      output: 5
    }
  ]);
})();
