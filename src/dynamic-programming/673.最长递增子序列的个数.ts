/*
 * @lc app=leetcode.cn id=673 lang=typescript
 *
 * [673] 最长递增子序列的个数
 *
 * https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (43.86%)
 * Likes:    551
 * Dislikes: 0
 * Total Accepted:    55.4K
 * Total Submissions: 126.3K
 * Testcase Example:  '[1,3,5,4,7]'
 *
 * 给定一个未排序的整数数组 nums ， 返回最长递增子序列的个数 。
 *
 * 注意 这个数列必须是 严格 递增的。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: [1,3,5,4,7]
 * 输出: 2
 * 解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
 *
 *
 * 示例 2:
 *
 *
 * 输入: [2,2,2,2,2]
 * 输出: 5
 * 解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
 *
 *
 *
 *
 * 提示:
 *
 *
 *
 *
 * 1 <= nums.length <= 2000
 * -10^6 <= nums[i] <= 10^6
 *
 *
 */

// @lc code=start
function findNumberOfLIS(nums: number[]): number {
  let res = 1;
  let max = 1;
  const dp = Array(nums.length).fill(1);
  const count = Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
          count[i] = count[j];
        } else if (dp[i] === dp[j] + 1) {
          count[i] += count[j];
        }
      }
    }

    if (max < dp[i]) {
      max = dp[i];
      res = count[i];
    } else if (max === dp[i]) {
      res += count[i];
    }
  }

  return res;
}
// @lc code=end

(() => {
  const nums = [1, 3, 5, 4, 7];
  console.log(findNumberOfLIS(nums));
})();
