/*
 * @lc app=leetcode.cn id=42 lang=typescript
 *
 * [42] 接雨水
 *
 * https://leetcode.cn/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (64.56%)
 * Likes:    5461
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 1.8M
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
  // 单调栈解法。本质上是算左右两边之间横着的雨水面积
  let res = 0;
  // 维护一个单调递减栈（非增栈）
  const stack: number[] = [];
  for (let i = 0; i < height.length; i++) {
    // 当前位置比栈顶位置更高时，说明栈顶位置 curr 可以接雨水，求的是以 curr 为最低点时离左右最近的高点能存水的面积
    while (stack.length > 0 && height[i] >= height[stack[stack.length - 1]]) {
      const curr = stack.pop() as number;

      // 如果此时栈为空，说明没有左边界，无法接雨水，直接 break
      if (stack.length === 0) break;

      // 栈中当前的栈顶值即为本次接水的左边界，当前遍历位置 i 为右边界
      const left = stack[stack.length - 1];

      const w = i - 1 - left;
      const h = Math.min(height[left], height[i]) - height[curr];
      res += w * h;
    }

    stack.push(i);
  }

  return res;
}
// @lc code=end

(() => {
  const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  // const height = [4, 2, 0, 3, 2, 5];
  console.log(trap(height));
})();

// function trap(height: number[]): number {
//   // 找到在每个位置的左右最高点，从而求出当前位置的灌水面积为：min(leftH, rightH) - currentH
//   const leftMax = Array(height.length).fill(-1);
//   const rightMax = Array(height.length).fill(-1);
//   let max = -1;
//   for (let i = 0; i < height.length; i++) {
//     leftMax[i] = max;
//     if (height[i] > max) max = height[i];
//   }
//   max = -1;
//   for (let i = height.length - 1; i >= 0; i--) {
//     rightMax[i] = max;
//     if (height[i] > max) max = height[i];
//   }
//   // console.log(leftMax, rightMax);

//   let result = 0;
//   for (let i = 0; i < height.length; i++) {
//     const rain = Math.min(leftMax[i], rightMax[i]) - height[i];
//     if (rain > 0) {
//       result += rain;
//     }
//   }

//   return result;
// }
