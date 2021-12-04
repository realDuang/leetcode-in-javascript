/*
 * @lc app=leetcode.cn id=746 lang=typescript
 *
 * [746] 使用最小花费爬楼梯
 *
 * https://leetcode-cn.com/problems/min-cost-climbing-stairs/description/
 *
 * algorithms
 * Easy (59.56%)
 * Likes:    734
 * Dislikes: 0
 * Total Accepted:    151.1K
 * Total Submissions: 253.6K
 * Testcase Example:  '[10,15,20]'
 *
 * 数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。
 *
 * 每当你爬上一个阶梯你都要花费对应的体力值，一旦支付了相应的体力值，你就可以选择向上爬一个阶梯或者爬两个阶梯。
 *
 * 请你找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：cost = [10, 15, 20]
 * 输出：15
 * 解释：最低花费是从 cost[1] 开始，然后走两步即可到阶梯顶，一共花费 15 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
 * 输出：6
 * 解释：最低花费方式是从 cost[0] 开始，逐个经过那些 1 ，跳过 cost[3] ，一共花费 6 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * cost 的长度范围是 [2, 1000]。
 * cost[i] 将会是一个整型数据，范围为 [0, 999] 。
 *
 *
 */

// @lc code=start
function minCostClimbingStairs(cost: number[]): number {
  if (cost.length === 0 || cost.length === 1) return 0;

  // 构造最后一级阶梯需要花费的体力，cost[i]花费为0
  cost.push(0);

  let n1 = cost[0];
  let n2 = cost[1];

  // 状态转移方程：Fn = Math.min(Fn-2 + Costn, Fn-1 + Costn)
  for (let i = 2; i < cost.length; i++) {
    const res = Math.min(n1 + cost[i], n2 + cost[i]);
    n1 = n2;
    n2 = res;
  }
  return n2;
}
// @lc code=end

const cost = [1, 100];
console.log(minCostClimbingStairs(cost));
