/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (34.30%)
 * Likes:    4214
 * Dislikes: 0
 * Total Accepted:    768.9K
 * Total Submissions: 2.2M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0
 * 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [0]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^5
 *
 *
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  nums = nums.sort((a, b) => a - b);

  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    const min = nums[i];

    // 如果数组的最小值都>0，则一定不存在 a + b + c = 0
    if (min > 0) break;
    // 去掉重复情况
    if (i > 0 && min === nums[i - 1]) continue;

    const target = 0 - min;
    // 接下来就是 2Sum 问题了
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (nums[left] + nums[right] === target) {
        res.push([min, nums[left], nums[right]]);
        // 去除重复情况
        while (left < right && nums[left + 1] === nums[left]) left += 1;
        while (left < right && nums[right - 1] === nums[right]) right -= 1;

        // 指针移动到下一组情况
        left += 1;
        right -= 1;
      } else if (nums[left] + nums[right] > target) {
        right -= 1;
      } else {
        left += 1;
      }
    }
  }
  return res;
}
// @lc code=end

(() => {
  const nums = [-1, 0, 1, 2, -1, -4];
  console.log(threeSum(nums));
})();
