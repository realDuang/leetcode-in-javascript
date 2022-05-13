/*
 * @lc app=leetcode.cn id=354 lang=typescript
 *
 * [354] 俄罗斯套娃信封问题
 *
 * https://leetcode.cn/problems/russian-doll-envelopes/description/
 *
 * algorithms
 * Hard (42.43%)
 * Likes:    722
 * Dislikes: 0
 * Total Accepted:    84.3K
 * Total Submissions: 198.9K
 * Testcase Example:  '[[5,4],[6,4],[6,7],[2,3]]'
 *
 * 给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
 *
 * 当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
 *
 * 请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
 *
 * 注意：不允许旋转信封。
 *
 *
 * 示例 1：
 *
 *
 * 输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]
 * 输出：3
 * 解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
 *
 * 示例 2：
 *
 *
 * 输入：envelopes = [[1,1],[1,1],[1,1]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= envelopes.length <= 10^5
 * envelopes[i].length == 2
 * 1 <= wi, hi <= 10^5
 *
 *
 */

// @lc code=start
function maxEnvelopes(envelopes: number[][]): number {
  // 先把 width 从大到小排序，先保证一个维度的顺序嵌套
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
  const heights = envelopes.map(x => x[1]);
  const res = lengthOfLIS(heights);
  return res;

  function lengthOfLIS(nums: number[]): number {
    // 维护一个最小递增子序列
    const lis: number[] = [];
    // Sn = (Sn-1, An)为递增子序列 ? Sn-1 + 1 : Sn-1
    for (let i = 0; i < nums.length; i++) {
      let left = 0;
      let right = lis.length - 1;
      // 求左边界的二分法
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (lis[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      if (left >= lis.length) {
        // 边界越界，说明此时子 LIS 中不存在比 nums[i] 大的数，LIS 数组增加一位
        lis.push(nums[i]);
      } else {
        // 否则更新该 LIS 位置上的数字
        lis[left] = nums[i];
      }
    }
    return lis.length;
  }
}
// @lc code=end

(() => {
  const envelopes = [
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3]
  ];
  console.log(maxEnvelopes(envelopes));
})();
