/*
 * @lc app=leetcode.cn id=496 lang=typescript
 *
 * [496] 下一个更大元素 I
 *
 * https://leetcode.cn/problems/next-greater-element-i/description/
 *
 * algorithms
 * Easy (71.12%)
 * Likes:    734
 * Dislikes: 0
 * Total Accepted:    184.5K
 * Total Submissions: 259.1K
 * Testcase Example:  '[4,1,2]\n[1,3,4,2]'
 *
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
 *
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
 *
 * 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定
 * nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
 *
 * 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
 * 输出：[-1,3,-1]
 * 解释：nums1 中每个值的下一个更大元素如下所述：
 * - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 * - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
 * - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [2,4], nums2 = [1,2,3,4].
 * 输出：[3,-1]
 * 解释：nums1 中每个值的下一个更大元素如下所述：
 * - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
 * - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length <= nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 10^4
 * nums1和nums2中所有整数 互不相同
 * nums1 中的所有整数同样出现在 nums2 中
 *
 *
 *
 *
 * 进阶：你可以设计一个时间复杂度为 O(nums1.length + nums2.length) 的解决方案吗？
 *
 */

// @lc code=start
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // 单调栈算法，返回一个数组res，res[i] 表示 nums[i] 对应的下一个更大元素，如果后面没有更大的则返回-1。
  function calculateGreaterElement(nums: number[]) {
    const len = nums.length;
    const res: number[] = [];
    // 单调栈，时刻维护栈是递增状态的
    const stack: number[] = [];

    // 倒序向单调栈中放入，是为了能正序出栈
    for (let i = len - 1; i >= 0; i--) {
      // 栈顶元素小于等于当前元素，则把栈中所有的小元素剔除掉，并在最后将当前元素入栈，从而保证栈的单调性
      while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
        stack.pop();
      }

      // res[i] 表示 nums[i] 后面第一个更大的元素。
      // 此时的栈顶元素即为下一个更大元素
      // 如果栈空了就说明后面没有更大的了，返回 -1
      res[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
      // 最后将当前元素入栈，从而保证栈的单调性
      stack.push(nums[i]);
    }

    return res;
  }

  const greater = calculateGreaterElement(nums2);

  // 生成 下一个更大元素的映射 map
  const greaterMap: Record<number, number> = {};
  for (let i = 0; i < nums2.length; i++) {
    greaterMap[nums2[i]] = greater[i];
  }

  const res: number[] = nums1.map(num => greaterMap[num]);
  return res;
}
// @lc code=end

(() => {
  const nums1 = [4, 1, 2],
    nums2 = [1, 3, 4, 2];
  console.log(nextGreaterElement(nums1, nums2));
})();
