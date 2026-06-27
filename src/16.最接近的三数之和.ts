/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode.cn/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (44.85%)
 * Likes:    1814
 * Dislikes: 0
 * Total Accepted:    702.8K
 * Total Submissions: 1.6M
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个在 不同下标位置 的整数，使它们的和与 target
 * 最接近。
 *
 * 返回这三个数的和。
 *
 * 假定每组输入只存在恰好一个解。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2)。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,0], target = 1
 * 输出：0
 * 解释：与 target 最接近的和是 0（0 + 0 + 0 = 0）。
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 1000
 * -1000 <= nums[i] <= 1000
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  let res = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const ans = nums[l] + nums[r] + nums[i];
      if(ans===target) return ans;
      if (Math.abs(target - ans) < Math.abs(target - res)) {
        res = ans;
      }
      if (ans < target) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
}
// @lc code=end

(() => {
  LCT.func(threeSumClosest).auto();
})();
