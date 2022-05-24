/*
 * @lc app=leetcode.cn id=435 lang=typescript
 *
 * [435] 无重叠区间
 *
 * https://leetcode.cn/problems/non-overlapping-intervals/description/
 *
 * algorithms
 * Medium (50.83%)
 * Likes:    701
 * Dislikes: 0
 * Total Accepted:    147.7K
 * Total Submissions: 290.6K
 * Testcase Example:  '[[1,2],[2,3],[3,4],[1,3]]'
 *
 * 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回
 * 需要移除区间的最小数量，使剩余区间互不重叠 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * 输出: 1
 * 解释: 移除 [1,3] 后，剩下的区间没有重叠。
 *
 *
 * 示例 2:
 *
 *
 * 输入: intervals = [ [1,2], [1,2], [1,2] ]
 * 输出: 2
 * 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
 *
 *
 * 示例 3:
 *
 *
 * 输入: intervals = [ [1,2], [2,3] ]
 * 输出: 0
 * 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= intervals.length <= 10^5
 * intervals[i].length == 2
 * -5 * 10^4 <= starti < endi <= 5 * 10^4
 *
 *
 */

// @lc code=start
function eraseOverlapIntervals(intervals: number[][]): number {
  let res = 0;
  // 先对 end 进行从小到大排序
  intervals.sort((a, b) => a[1] - b[1]);

  let end = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    const start = intervals[i][0];
    // 若该区间的起始点小于前一个区间的结束点，则说明该区间有重叠，需要被移除
    if (start < end) {
      res += 1;
    } else {
      // 否则找到了一个新的不重叠区间，将end指针移动过来
      end = intervals[i][1];
    }
  }
  return res;
}
// @lc code=end

(() => {
  const intervals = [
    [1, 2],
    [2, 3]
  ];
  console.log(eraseOverlapIntervals(intervals));
})();
