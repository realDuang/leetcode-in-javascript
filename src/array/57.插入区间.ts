/*
 * @lc app=leetcode.cn id=57 lang=typescript
 *
 * [57] 插入区间
 *
 * https://leetcode.cn/problems/insert-interval/description/
 *
 * algorithms
 * Medium (42.68%)
 * Likes:    948
 * Dislikes: 0
 * Total Accepted:    241.1K
 * Total Submissions: 564.1K
 * Testcase Example:  '[[1,3],[6,9]]\n[2,5]'
 *
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表 intervals，其中 intervals[i] = [starti, endi] 表示第 i
 * 个区间的开始和结束，并且 intervals 按照 starti 升序排列。同样给定一个区间 newInterval = [start, end]
 * 表示另一个区间的开始和结束。
 *
 * 在 intervals 中插入区间 newInterval，使得 intervals 依然按照 starti
 * 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。
 *
 * 返回插入之后的 intervals。
 *
 * 注意 你不需要原地修改 intervals。你可以创建一个新数组然后返回它。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出：[[1,5],[6,9]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * 输出：[[1,2],[3,10],[12,16]]
 * 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^5
 * intervals 根据 starti 按 升序 排列
 * newInterval.length == 2
 * 0 <= start <= end <= 10^5
 *
 *
 */

// @lc code=start
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const len = intervals.length;
  if (len === 0) {
    return [newInterval];
  }

  // newInterval 比所有都大
  if (intervals[len - 1][1] < newInterval[0]) {
    return [...intervals, newInterval];
  }
  // newInterval 比所有都 小
  if (intervals[0][0] > newInterval[1]) {
    return [newInterval, ...intervals];
  }

  // 找到有交集的位置
  let i = 0;
  const past: number[][] = [];
  while (i < len && intervals[i][1] < newInterval[0]) {
    past.push(intervals[i]);
    i++;
  }

  let j = len - 1;
  const rest: number[][] = [];
  while (j > 0 && intervals[j][0] > newInterval[1]) {
    rest.unshift(intervals[j]);
    j--;
  }

  const newVal = [Math.min(intervals[i][0], newInterval[0]), Math.max(intervals[j][1], newInterval[1])];

  return [...past, newVal, ...rest];
}
// @lc code=end

(() => {
  const intervals = [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16]
    ],
    newInterval = [4, 8];
  console.log(insert(intervals, newInterval)); // [[1,5],[6,9]]
})();
