/*
 * @lc app=leetcode.cn id=42 lang=typescript
 *
 * [42] 接雨水
 *
 * https://leetcode.cn/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (62.03%)
 * Likes:    3831
 * Dislikes: 0
 * Total Accepted:    579.9K
 * Total Submissions: 934.5K
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
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;

  let res = 0;
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    // 如果左侧的最高柱子小于右侧，则左侧的柱子一定是短板，最多能接平齐 leftMax 的水
    // 因此在该列上，能接水的格子数为 上底高度 - 下底高度 个
    if (leftMax < rightMax) {
      res += leftMax - height[left];
      left++;
    } else {
      // 反之则右侧的柱子一定是短板，则计算右侧能接水的格子数量
      res += rightMax - height[right];
      right--;
    }
  }
  return res;
}
// @lc code=end

// function trap(height: number[]): number {
//     let res = 0;
//     for (let i = 0; i < height.length; i++) {
//         let lMax = 0;
//         let rMax = 0;
//         for (let l = 0; l < i; l++) {
//             if (height[l] > lMax) {
//                 lMax = height[l];
//             }
//         }
//         for (let r = i + 1; r < height.length; r++) {
//             if (height[r] > rMax) {
//                 rMax = height[r];
//             }
//         }
//         res += Math.max(Math.min(lMax, rMax) - height[i], 0);
//     }
//     return res;
// };

(() => {
  const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  console.log(trap(height));
})();
