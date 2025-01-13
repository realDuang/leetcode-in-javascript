/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 *
 * https://leetcode.cn/problems/daily-temperatures/description/
 *
 * algorithms
 * Medium (69.24%)
 * Likes:    1875
 * Dislikes: 0
 * Total Accepted:    660.5K
 * Total Submissions: 954K
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
  const len = temperatures.length;
  const res: number[] = Array(len).fill(0);

  const stack: number[] = [];

  // 本质上就是求下一个更大元素
  for (let i = len - 1; i >= 0; i--) {
    // 维护一个单调递减栈
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
      stack.pop();
    }
    // 此时栈顶元素就是第一个比当前元素大的元素，根据题意记录索引差
    if (stack.length > 0) {
      res[i] = stack[stack.length - 1] - i;
    }

    stack.push(i);
  }

  return res;
}
// @lc code=end

(() => {
  const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
  console.log(dailyTemperatures(temperatures));
})();
