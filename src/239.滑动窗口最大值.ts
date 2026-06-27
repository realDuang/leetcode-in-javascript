/*
 * @lc app=leetcode.cn id=239 lang=typescript
 *
 * [239] 滑动窗口最大值
 *
 * https://leetcode.cn/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (50.16%)
 * Likes:    3467
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2.3M
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k
 * 个数字。滑动窗口每次只向右移动一位。
 *
 * 返回 滑动窗口中的最大值 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 * 解释：
 * 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], k = 1
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 *
 *
 */

// @lc code=start
function maxSlidingWindow(nums: number[], k: number): number[] {
  const stack: number[] = [];
  const res: number[] = [];

  let i = 0;
  for (; i < k; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }
    stack.push(i);
  }
  res.push(nums[stack[0]]);

  while (i < nums.length) {
    // 如果单调队列最大值位置被移出滑动窗口了，则去掉队头
    if (stack[0] === i - k) stack.shift();

    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }
    stack.push(i);
    res.push(nums[stack[0]]);
    i++;
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(maxSlidingWindow).auto();
})();
