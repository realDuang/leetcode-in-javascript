/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 *
 * https://leetcode.cn/problems/daily-temperatures/description/
 *
 * algorithms
 * Medium (69.73%)
 * Likes:    2150
 * Dislikes: 0
 * Total Accepted:    971.2K
 * Total Submissions: 1.4M
 * Testcase Example:  '[73,74,75,71,69,72,76,73]'
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i
 * 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 *
 *
 * 示例 2:
 *
 *
 * 输入: temperatures = [30,40,50,60]
 * 输出: [1,1,1,0]
 *
 *
 * 示例 3:
 *
 *
 * 输入: temperatures = [30,60,90]
 * 输出: [1,1,0]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= temperatures.length <= 10^5
 * 30 <= temperatures[i] <= 100
 *
 *
 */

// @lc code=start
function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = [];
  const res: number[] = Array(temperatures.length).fill(0);

  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (stack.length && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
      stack.pop();
    }
    if (stack.length) {
      const nextHigh = stack[stack.length - 1];
      res[i] = nextHigh - i;
    }
    stack.push(i);
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(dailyTemperatures).auto();

  LCT.func(dailyTemperatures).cases([
    {
      input: [[89, 62, 70, 58, 47, 47, 46, 76, 100, 70]],
      output: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0]
    }
  ]);
})();

// function dailyTemperatures(temperatures: number[]): number[] {
//   const stack: number[] = [];
//   const res: number[] = Array(temperatures.length).fill(0);

//   // 遍历方向，看你需要向前查找还是向后查找
//   for (let i = temperatures.length - 1; i >= 0; i--) {
//     // 如果当前元素破坏了站的单调性，需要不断弹出栈顶直到恢复单调栈
//     // 比较大小方向，看查找的是更大值还是更小值（维护单增栈还是单减栈）
//     while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
//       const top = stack.pop();

//       //  Tips: 弹出时可以按需记录,例如接雨水，它需要在弹出时用左右边界算贡献
//       // 左边界就是栈顶，右边界就是当前位置 i，弹出的 top 就是高度的低点
//     }

//     // 当栈顶有值，说明是下一个更高温度
//     if (stack.length > 0) {
//       res[i] = stack[stack.length - 1] - i;
//     }

//     // 如果当前元素不破坏栈的单调性，直接把 index 入栈
//     stack.push(i);
//   }

//   return res;
// }
