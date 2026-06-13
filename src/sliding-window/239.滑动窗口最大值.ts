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
  // 注意，这里的 queue 的单调队列存的是单调队列值的下标，所对应的值是单调的，但是序号不一定
  const queue: number[] = [];
  const res: number[] = [];

  let l = 0;
  let r = 0;
  while (r < nums.length) {
    // 插入时清理掉队尾比较小的值，保持单调性
    while (queue.length > 0 && nums[r] > nums[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(r);
    r++;

    if (r - l >= k) {
      // 窗口满足要求时，将单调队列的最大值推入 res
      res.push(nums[queue[0]]);

      // 缩小窗口时，如果队头被排出
      if (l === queue[0]) {
        queue.shift();
      }
      l++;
    }
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(maxSlidingWindow).auto();

  LCT.func(maxSlidingWindow).cases([
    {
      input: [[1, -1], 1],
      output: [1, -1]
    }
  ]);
})();

// 另一种实现：单调队列存值（先填满窗口，再逐个滑动）
// function maxSlidingWindow(nums: number[], k: number): number[] {
//   if (nums.length == 0 || k == 0) return [];
//   const dequeue = [];
//   const res: number[] = [];
//   // 初始化窗口
//   for (let i = 0; i < k; i++) {
//     // 保持单调队列的单调递减
//     while (dequeue.length !== 0 && dequeue[dequeue.length - 1] < nums[i]) {
//       dequeue.pop();
//     }
//     // 加入窗口右边界的值
//     dequeue.push(nums[i]);
//   }
//   // 由于滑动窗口中元素单调递减，队头一定是当前滑动窗口的最大值
//   res.push(dequeue[0]);

//   for (let i = k; i < nums.length; i++) {
//     // i - k 为窗口的左边界
//     const left = i - k;
//     // 如果这个元素在单调队列中，则直接删除
//     if (dequeue[0] === nums[left]) {
//       dequeue.shift();
//     }

//     // 保持单调队列的单调递减
//     while (dequeue.length !== 0 && dequeue[dequeue.length - 1] < nums[i]) {
//       dequeue.pop();
//     }
//     dequeue.push(nums[i]);

//     res.push(dequeue[0]);
//   }
//   return res;
// }
