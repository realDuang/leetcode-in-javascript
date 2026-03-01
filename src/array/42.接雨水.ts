/*
 * @lc app=leetcode.cn id=42 lang=typescript
 *
 * [42] 接雨水
 *
 * https://leetcode.cn/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (63.68%)
 * Likes:    5195
 * Dislikes: 0
 * Total Accepted:    986.2K
 * Total Submissions: 1.5M
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == height.length
 * 1 <= n <= 2 * 10^4
 * 0 <= height[i] <= 10^5
 *
 *
 */

// @lc code=start
function trap(height: number[]): number {
  const len = height.length;
  const lMax = Array(len).fill(0);
  const rMax = Array(len).fill(0);

  // base case
  lMax[0] = height[0];
  rMax[len - 1] = height[len - 1];

  // Get left max height and right max height for each one
  for (let i = 1; i < len; i++) {
    lMax[i] = Math.max(height[i], lMax[i - 1]);
  }
  for (let i = len - 2; i >= 0; i--) {
    rMax[i] = Math.max(height[i], rMax[i + 1]);
  }

  // Calculate
  let sum = 0;
  // exclude both sides
  for (let i = 1; i < len - 1; i++) {
    sum += Math.min(lMax[i], rMax[i]) - height[i];
  }

  return sum;
}
// @lc code=end

(() => {
  const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  console.log(trap(height));
})();
