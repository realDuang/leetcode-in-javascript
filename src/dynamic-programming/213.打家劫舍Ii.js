/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 *
 * https://leetcode-cn.com/problems/house-robber-ii/description/
 *
 * algorithms
 * Medium (39.27%)
 * Likes:    358
 * Dislikes: 0
 * Total Accepted:    52.5K
 * Total Submissions: 133.5K
 * Testcase Example:  '[2,3,2]'
 *
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
 *
 * 示例 1:
 *
 * 输入: [2,3,2]
 * 输出: 3
 * 解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
 *
 *
 * 示例 2:
 *
 * 输入: [1,2,3,1]
 * 输出: 4
 * 解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
 * 偷窃到的最高金额 = 1 + 3 = 4 。
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const len = nums.length;
  if (len === 1) return nums[0];

  return Math.max(helper(0, len - 1), helper(1, len));

  function helper(start, end) {
    let dp = 0;
    let res = 0;
    for (let i = start; i < end; i++) {
      const temp = res;
      res = Math.max(res, dp + nums[i]);
      dp = temp;
    }
    return res;
  }
};
// @lc code=end

console.log(rob([3, 1, 1, 3]));

/* 
这道题与`198.打家劫舍`长得几乎一致，因此解法也是相同的。
唯一的一点不同在于，房屋的摆放是环形的，形成了一个环形数组。
因此我们做的最优决策里，不能同时取第一号和最后一号房屋里的钱。
解决方法也很简单，我们分别算出[1, n]房间与[0,n-1]房间的最优决策，再比较一下取较大的那个即能得到最优解了。
 */
