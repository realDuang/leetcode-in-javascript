/*
 * @lc app=leetcode.cn id=1449 lang=typescript
 *
 * [1449] 数位成本和为目标值的最大数字
 *
 * https://leetcode.cn/problems/form-largest-integer-with-digits-that-add-up-to-target/description/
 *
 * algorithms
 * Hard (62.97%)
 * Likes:    214
 * Dislikes: 0
 * Total Accepted:    25.7K
 * Total Submissions: 40.8K
 * Testcase Example:  '[4,3,2,5,6,7,2,5,5]\n9'
 *
 * 给你一个整数数组 cost 和一个整数 target 。请你返回满足如下规则可以得到的 最大 整数：
 *
 *
 * 给当前结果添加一个数位（i + 1）的成本为 cost[i] （cost 数组下标从 0 开始）。
 * 总成本必须恰好等于 target 。
 * 添加的数位中没有数字 0 。
 *
 *
 * 由于答案可能会很大，请你以字符串形式返回。
 *
 * 如果按照上述要求无法得到任何整数，请你返回 "0" 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：cost = [4,3,2,5,6,7,2,5,5], target = 9
 * 输出："7772"
 * 解释：添加数位 '7' 的成本为 2 ，添加数位 '2' 的成本为 3 。所以 "7772" 的代价为 2*3+ 3*1 = 9 。 "977"
 * 也是满足要求的数字，但 "7772" 是较大的数字。
 * ⁠数字     成本
 * ⁠ 1  ->   4
 * ⁠ 2  ->   3
 * ⁠ 3  ->   2
 * ⁠ 4  ->   5
 * ⁠ 5  ->   6
 * ⁠ 6  ->   7
 * ⁠ 7  ->   2
 * ⁠ 8  ->   5
 * ⁠ 9  ->   5
 *
 *
 * 示例 2：
 *
 *
 * 输入：cost = [7,6,5,5,5,6,8,7,8], target = 12
 * 输出："85"
 * 解释：添加数位 '8' 的成本是 7 ，添加数位 '5' 的成本是 5 。"85" 的成本为 7 + 5 = 12 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：cost = [2,4,6,2,4,6,4,4,4], target = 5
 * 输出："0"
 * 解释：总成本是 target 的条件下，无法生成任何整数。
 *
 *
 * 示例 4：
 *
 *
 * 输入：cost = [6,10,15,40,40,40,40,40,40], target = 47
 * 输出："32211"
 *
 *
 *
 *
 * 提示：
 *
 *
 * cost.length == 9
 * 1
 * 1
 *
 *
 */

// @lc code=start
function largestNumber(cost: number[], target: number): string {
  // 设 dp[i]为 target 为 i 时，能够获取的最大整数的位数（为什么不存整数，因为整数可能很大，存位数到时候用贪心法还原整数）
  const dp = Array(target + 1).fill(-Infinity);
  dp[0] = 0;

  for (let i = 0; i < cost.length; i++) {
    const weight = cost[i];
    for (let j = weight; j <= target; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight] + 1);
    }
  }

  // 获取了最大位数，接下来就是用贪心法还原整数值了
  if (dp[target] === -Infinity) return '0';

  let res = '';
  let remain = target;
  for (let i = 0; i < dp[target]; i++) {
    for (let d = 8; d >= 0; d--) {
      if (remain >= cost[d] && dp[remain - cost[d]] === dp[target] - i - 1) {
        res += (d + 1).toString();
        remain -= cost[d];
        break;
      }
    }
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(largestNumber).auto();
})();
