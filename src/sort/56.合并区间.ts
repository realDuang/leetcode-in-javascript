/*
 * @lc app=leetcode.cn id=56 lang=typescript
 *
 * [56] 合并区间
 *
 * https://leetcode.cn/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (50.29%)
 * Likes:    2416
 * Dislikes: 0
 * Total Accepted:    952.2K
 * Total Submissions: 1.9M
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 *
 * 示例 2：
 *
 *
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 *
 *
 */

// @lc code=start
function merge(intervals: number[][]): number[][] {
  const res: number[][] = [];
  intervals.sort((a, b) => a[0] - b[0]);

  for (const interval of intervals) {
    const origin = res[res.length - 1];
    if (res.length <= 0 || origin[1] < interval[0]) {
      // 不存在交集时直接放入
      res.push(interval);
    } else {
      // 此时存在交集，确认是包含还是交集关系，取代原来的最后一个区间
      res[res.length - 1][1] = Math.max(origin[1], interval[1]);
    }
  }

  return res;
}
// @lc code=end

(() => {
  const intervals: number[][] = [
    [1, 9],
    [2, 5],
    [19, 20],
    [10, 11],
    [12, 20],
    [0, 3],
    [0, 1],
    [0, 2]
  ];
  console.log(merge(intervals));
})();
