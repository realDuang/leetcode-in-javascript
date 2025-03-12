/*
 * @lc app=leetcode.cn id=3290 lang=typescript
 *
 * [3290] 最高乘法得分
 *
 * https://leetcode.cn/problems/maximum-multiplication-score/description/
 *
 * algorithms
 * Medium (38.88%)
 * Likes:    15
 * Dislikes: 0
 * Total Accepted:    5.7K
 * Total Submissions: 14.3K
 * Testcase Example:  '[3,2,5,6]\n[2,-6,4,-5,-3,2,-7]'
 *
 * 给你一个大小为 4 的整数数组 a 和一个大小 至少为 4 的整数数组 b。
 *
 * 你需要从数组 b 中选择四个下标 i0, i1, i2, 和 i3，并满足 i0 < i1 < i2 < i3。你的得分将是 a[0] * b[i0]
 * + a[1] * b[i1] + a[2] * b[i2] + a[3] * b[i3] 的值。
 *
 * 返回你能够获得的 最大 得分。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： a = [3,2,5,6], b = [2,-6,4,-5,-3,2,-7]
 *
 * 输出： 26
 *
 * 解释：
 * 选择下标 0, 1, 2 和 5。得分为 3 * 2 + 2 * (-6) + 5 * 4 + 6 * 2 = 26。
 *
 *
 * 示例 2：
 *
 *
 * 输入： a = [-1,4,5,-2], b = [-5,-1,-3,-2,-4]
 *
 * 输出： -1
 *
 * 解释：
 * 选择下标 0, 1, 3 和 4。得分为 (-1) * (-5) + 4 * (-1) + 5 * (-2) + (-2) * (-4) =
 * -1。
 *
 *
 *
 *
 * 提示：
 *
 *
 * a.length == 4
 * 4 <= b.length <= 10^5
 * -10^5 <= a[i], b[i] <= 10^5
 *
 *
 */

// @lc code=start
function maxScore(a: number[], b: number[]): number {
  // 设 dp[i][j] 为 b 数组选前 i 个，a 数组选前 j 个时最大得分
  const dp = Array(b.length + 1)
    .fill(0)
    .map(x => Array(5).fill(0));

  // 设成最小值
  for (let j = 1; j <= 4; j++) {
    dp[0][j] = -10e5 - 1;
  }

  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < 4; j++) {
      // 选 b[i],则最大值为 a[j] * b[i] 加上之前的值
      // 不选 b[i],则与之前没有 b[i] 可选的情况相同
      dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i][j] + a[j] * b[i]);
    }
  }
  console.log(dp);
  return dp[b.length][4];
}
// @lc code=end

(() => {
  let a = [3, 2, 5, 6],
    b = [2, -6, 4, -5, -3, 2, -7];
  console.log(maxScore(a, b));
})();
