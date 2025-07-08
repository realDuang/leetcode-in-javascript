/*
 * @lc app=leetcode.cn id=238 lang=typescript
 *
 * [238] 除自身以外数组的乘积
 *
 * https://leetcode.cn/problems/product-of-array-except-self/description/
 *
 * algorithms
 * Medium (77.38%)
 * Likes:    2062
 * Dislikes: 0
 * Total Accepted:    727.8K
 * Total Submissions: 935.9K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 *
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 *
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 10^5
 * -30 <= nums[i] <= 30
 * 输入 保证 数组 answer[i] 在  32 位 整数范围内
 *
 *
 *
 *
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
 *
 */

// @lc code=start
function productExceptSelf(nums: number[]): number[] {
  const len = nums.length;

  // 设定前缀和后缀积
  const pre: number[] = Array(len);
  pre[0] = 1;

  for (let i = 1; i < len; i++) {
    pre[i] = pre[i - 1] * nums[i - 1];
  }

  const post: number[] = Array(len);
  post[len - 1] = 1;
  for (let i = len - 2; i >= 0; i--) {
    post[i] = post[i + 1] * nums[i + 1];
  }

  // console.log(pre, post);

  const answer: number[] = Array(len);
  for (let i = 0; i < len; i++) {
    answer[i] = pre[i] * post[i];
  }

  return answer;
}
// @lc code=end

(() => {
  const nums = [1, 2, 3, 4];
  console.log(productExceptSelf(nums));
})();
