/*
 * @lc app=leetcode.cn id=128 lang=typescript
 *
 * [128] 最长连续序列
 *
 * https://leetcode.cn/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Medium (51.48%)
 * Likes:    2443
 * Dislikes: 0
 * Total Accepted:    962.8K
 * Total Submissions: 1.9M
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 *
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,0,1,2]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start
function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  const set = new Set(nums);

  let maxLen = 1;
  for (const num of set) {
    // 查找出来能构成一个序列的头部，如果 num-1 在数组中则说明 num 不是序列头部
    if (set.has(num - 1)) continue;

    let temp = num + 1;
    while (set.has(temp)) {
      temp += 1;
    }
    maxLen = Math.max(maxLen, temp - num);
  }
  return maxLen;
}
// @lc code=end

(() => {
  // const nums = [100, 4, 200, 1, 3, 2];
  const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
  console.log(longestConsecutive(nums));
})();
