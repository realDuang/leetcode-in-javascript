/*
 * @lc app=leetcode.cn id=198 lang=typescript
 *
 * [198] 打家劫舍
 *
 * https://leetcode-cn.com/problems/house-robber/description/
 *
 * algorithms
 * Medium (51.96%)
 * Likes:    1775
 * Dislikes: 0
 * Total Accepted:    426.4K
 * Total Submissions: 820.7K
 * Testcase Example:  '[1,2,3,1]'
 *
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：[1,2,3,1]
 * 输出：4
 * 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 * 偷窃到的最高金额 = 1 + 3 = 4 。
 *
 * 示例 2：
 *
 *
 * 输入：[2,7,9,3,1]
 * 输出：12
 * 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 * 偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 *
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
function rob(nums: number[]): number {
  const len = nums.length;
  if (len === 1) return nums[0];

  let interval = 0;
  let prev = nums[0];
  // 从第二间房开始判断，当前房间是否抢：
  // 不抢，结果等于抢邻房间时的最大值 + 0；
  // 抢，结果等于隔间房间的最大值 + 当前房间金额
  // 状态转移方程：Sn = Math.max(Sn-1, Sn-2 + nums[n])
  for (let i = 1; i < len; i++) {
    const curr = Math.max(interval + nums[i], prev);
    interval = prev;
    prev = curr;
  }
  return prev;
}
// @lc code=end

(() => {
  const nums = [2, 7, 9, 3, 1];
  console.log(rob(nums));
})();
