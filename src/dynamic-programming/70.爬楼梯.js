/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 *
 * https://leetcode-cn.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (48.09%)
 * Likes:    915
 * Dislikes: 0
 * Total Accepted:    165.7K
 * Total Submissions: 343.7K
 * Testcase Example:  '2'
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 *
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 *
 * 注意：给定 n 是一个正整数。
 *
 * 示例 1：
 *
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 *
 * 示例 2：
 *
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  let dp1 = 1;
  let dp2 = 1;
  while (--n) {
    const temp = dp1 + dp2;
    dp2 = dp1;
    dp1 = temp;
  }
  return dp1;
};
// @lc code=end

// 递归写法
// var climbStairs = function(n) {
//   if (n === 0 || n === 1) return 1;
//   return climbStairs(n - 1) + climbStairs(n - 2);
// };
// 状态转移方程： dp[n] = dp[n-1] + dp[n-2]
// var climbStairs = function(n) {
//   const dp = [1, 1];
//   for (let i = 2; i <= n; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[n];
// };
// 由于状态转移方程只依赖n-1与n-2，因此可以只用两个变量存储中间值以节省空间复杂度

console.log(climbStairs(45));
