/*
 * @lc app=leetcode.cn id=84 lang=typescript
 *
 * [84] 柱状图中最大的矩形
 *
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
 *
 * algorithms
 * Hard (45.98%)
 * Likes:    2759
 * Dislikes: 0
 * Total Accepted:    433.1K
 * Total Submissions: 941.8K
 * Testcase Example:  '[2,1,5,6,2,3]'
 *
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 *
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入：heights = [2,1,5,6,2,3]
 * 输出：10
 * 解释：最大的矩形为图中红色区域，面积为 10
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入： heights = [2,4]
 * 输出： 4
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  // 为什么前后加 0，为了计算第一个和最后一个 bar 的面积情况
  // 第一个加 0，因为求宽度时需要出栈后的栈顶参与计算，所以栈永远不能为空
  // 最后一个加 0，是为了让还在栈中的所有 bar 都能正常出栈
  const newHeights = [0, ...heights, 0];

  for (let i = 0; i < newHeights.length; i++) {
    // 维持单调递增栈
    // 遇到了当前 bar 比栈顶矮的情况，出栈并计算以该栈顶为高的最大矩形面积
    while (stack.length > 0 && newHeights[i] < newHeights[stack[stack.length - 1]]) {
      const stackPopIndex = stack.pop();
      const curHeight = newHeights[stackPopIndex];
      const curWidth = i - 1 - stack[stack.length - 1];
      maxArea = Math.max(maxArea, curHeight * curWidth);
    }

    // 当前 bar 比栈顶高，将索引入栈，维持单调递增栈的索引正确
    stack.push(i);
  }
  return maxArea;
}
// @lc code=end

(() => {
  const heights = [2, 1, 5, 6, 2, 3];
  console.log(largestRectangleArea(heights));
})();

// function largestRectangleArea(heights: number[]): number {
//   let maxArea = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);

//       maxArea = Math.max(maxArea, minHeight * (j - i + 1));
//     }
//   }
//   return maxArea;
// }

// function largestRectangleArea(heights: number[]): number {
//   let maxArea = 0;
//   for (let i = 0; i < heights.length; i++) {
//     // 问题转换成，找到以第i根柱子为最矮柱子所能向左右延伸的最大面积
//     const height = heights[i];
//     let left = i;
//     let right = i;
//     while (left >= 0 && heights[left] >= height) {
//       left -= 1;
//     }
//     while (right < heights.length && heights[right] >= height) {
//       right += 1;
//     }
//     maxArea = Math.max(maxArea, height * (right - 1 - (left + 1) + 1));
//   }
//   return maxArea;
// }

// function largestRectangleArea(heights: number[]): number {
//   let maxArea = 0;

//   const len = heights.length;
//   const resLeft: number[] = [];
//   // 单调栈，时刻维护栈是递减状态的
//   let stack: number[] = [];

//   for (let i = 0; i < len; i++) {
//     while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
//       stack.pop();
//     }

//     resLeft[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }

//   stack = [];
//   const resRight: number[] = [];
//   for (let i = len - 1; i >= 0; i--) {
//     while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
//       stack.pop();
//     }

//     resRight[i] = stack.length === 0 ? heights.length : stack[stack.length - 1];
//     stack.push(i);
//   }

//   for (let i = 0; i < len; i++) {
//     const width = resRight[i] - resLeft[i] - 1;
//     const height = heights[i];
//     maxArea = Math.max(maxArea, height * width);
//   }

//   return maxArea;
// }
