/*
 * @lc app=leetcode.cn id=18 lang=typescript
 *
 * [18] 四数之和
 *
 * https://leetcode-cn.com/problems/4sum/description/
 *
 * algorithms
 * Medium (39.47%)
 * Likes:    1086
 * Dislikes: 0
 * Total Accepted:    255.7K
 * Total Submissions: 647.8K
 * Testcase Example:  '[1,0,-1,0,-2,2]\n0'
 *
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a],
 * nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 *
 *
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 *
 * 你可以按 任意顺序 返回答案 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,2,2,2,2], target = 8
 * 输出：[[2,2,2,2]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * -10^9 <= nums[i] <= 10^9
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
function fourSum(nums: number[], target: number): number[][] {
  nums = nums.sort((a, b) => a - b);
  const len = nums.length;

  const res: number[][] = [];
  for (let i = 0; i < len - 3; i++) {
    // 最小的4个数都小于target，直接退出；或者最大的4个数都大于target, 直接跳过
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (nums[i] + nums[len - 1] + nums[len - 2] + nums[len - 3] < target) continue;
    // 去掉重复情况
    if (i > 0 && nums[i - 1] === nums[i]) continue;

    // 接下来就是 3Sum 问题了
    threeSumCase(i, nums[i], target, nums, res);
  }

  return res;

  function threeSumCase(start: number, first: number, target: number, nums: number[], res: number[][]) {
    const len = nums.length;
    for (let i = start + 1; i < len - 2; i++) {
      const second = nums[i];

      // 最小的4个数都小于target，直接退出；或者最大的4个数都大于target, 直接跳过
      if (first + second + nums[i + 1] + nums[i + 2] > target) break;
      if (first + second + nums[len - 1] + nums[len - 2] < target) continue;
      // 去掉重复情况
      if (i > start + 1 && nums[i - 1] === nums[i]) continue;

      // 接下来就是 2Sum 问题了
      let left = i + 1;
      let right = nums.length - 1;
      while (left < right) {
        const sum = first + second + nums[left] + nums[right];
        if (sum === target) {
          res.push([first, second, nums[left], nums[right]]);
          // 去除重复情况
          while (left < right && nums[left + 1] === nums[left]) left += 1;
          while (left < right && nums[right - 1] === nums[right]) right -= 1;

          // 指针移动到下一组情况
          left += 1;
          right -= 1;
        } else if (sum > target) {
          right -= 1;
        } else {
          left += 1;
        }
      }
    }
  }
}
// @lc code=end

(() => {
  const nums = [1, 0, -1, 0, -2, 2];
  const target = 0;
  console.log(fourSum(nums, target));
})();
