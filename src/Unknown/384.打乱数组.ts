/*
 * @lc app=leetcode.cn id=384 lang=typescript
 *
 * [384] 打乱数组
 *
 * https://leetcode-cn.com/problems/shuffle-an-array/description/
 *
 * algorithms
 * Medium (60.91%)
 * Likes:    263
 * Dislikes: 0
 * Total Accepted:    90.1K
 * Total Submissions: 147.9K
 * Testcase Example:  '["Solution","shuffle","reset","shuffle"]\n[[[1,2,3]],[],[],[]]'
 *
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。
 *
 * 实现 Solution class:
 *
 *
 * Solution(int[] nums) 使用整数数组 nums 初始化对象
 * int[] reset() 重设数组到它的初始状态并返回
 * int[] shuffle() 返回数组随机打乱后的结果
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入
 * ["Solution", "shuffle", "reset", "shuffle"]
 * [[[1, 2, 3]], [], [], []]
 * 输出
 * [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
 *
 * 解释
 * Solution solution = new Solution([1, 2, 3]);
 * solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回
 * [3, 1, 2]
 * solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
 * solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * -10^6 <= nums[i] <= 10^6
 * nums 中的所有元素都是 唯一的
 * 最多可以调用 5 * 10^4 次 reset 和 shuffle
 *
 *
 */

// @lc code=start
class Solution {
  nums: number[];
  origin: number[];
  constructor(nums: number[]) {
    this.nums = nums;
    this.origin = [...nums];
  }

  reset(): number[] {
    this.nums = [...this.origin];
    return this.nums;
  }

  shuffle(): number[] {
    // 遍历一遍数组，通过 i ~ n 之间的数字，以相等的概率交换第 i 个数，之后锁定第 i 个位置
    for (let i = 0; i < this.nums.length; i++) {
      const j = Math.floor(Math.random() * (this.nums.length - i)) + i;
      // 交换
      const temp = this.nums[i];
      this.nums[i] = this.nums[j];
      this.nums[j] = temp;
    }
    return this.nums;
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end

(() => {
  const solution: Solution = new Solution([1, 2, 3]);
  console.log(solution.shuffle());
  console.log(solution.reset());
  console.log(solution.shuffle());
  console.log(solution.shuffle());
  console.log(solution.shuffle());
})();
