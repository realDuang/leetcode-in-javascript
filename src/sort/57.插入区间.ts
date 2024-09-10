/*
 * @lc app=leetcode.cn id=57 lang=typescript
 *
 * [57] 插入区间
 *
 * https://leetcode.cn/problems/insert-interval/description/
 *
 * algorithms
 * Medium (42.63%)
 * Likes:    920
 * Dislikes: 0
 * Total Accepted:    227.6K
 * Total Submissions: 533.3K
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
  const start = newInterval[0];
  const end = newInterval[1];

  if (intervals.length === 0 || intervals[intervals.length - 1][1] < start) {
    // 插入点在最右侧
    intervals.push(newInterval);
  } else if (intervals[0][0] > end) {
    // 插入点在最左侧
    intervals.unshift(newInterval);
  } else {
    // 找到插入位置
    let left = 0;
    let right = intervals.length - 1;
    while (intervals[left][1] < start) {
      left++;
    }
    while (intervals[right][0] > end) {
      right--;
    }

    if (left > right) {
      // 说明此时 newInterval 与原数组没有交集，直接插入
      intervals.splice(left, 0, newInterval);
    } else {
      // 有交集，替换交集处之间的集合
      const newItem = [Math.min(intervals[left][0], newInterval[0]), Math.max(intervals[right][1], newInterval[1])];
      intervals.splice(left, right - left + 1, newItem);
    }
  }
  return intervals;
}
// @lc code=end

(() => {
  // const intervals = [
  //   [1, 2],
  //   [3, 5],
  //   [6, 7],
  //   [8, 10],
  //   [12, 16]
  // ];
  // const newInterval = [4, 8];

  const intervals = [[1, 5]],
    newInterval = [0, 3];
  console.log(insert(intervals, newInterval));
})();
