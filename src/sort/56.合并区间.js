/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (42.81%)
 * Likes:    631
 * Dislikes: 0
 * Total Accepted:    149K
 * Total Submissions: 345.5K
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 给出一个区间的集合，请合并所有重叠的区间。
 *
 *
 *
 * 示例 1:
 *
 * 输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 *
 * 示例 2:
 *
 * 输入: intervals = [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 * 注意：输入类型已于2019年4月15日更改。 请重置默认代码定义以获取新方法签名。
 *
 *
 *
 * 提示：
 *
 *
 * intervals[i][0] <= intervals[i][1]
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length <= 0) return [];

  // 先按起始位置排序，这样左侧位置就可以不做判断了
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    const temp = res[res.length - 1];

    if (cur[0] > temp[1]) {
      // 说明区间之间没有交集，此时结果中需要新建一个区间
      res.push(cur);
    } else {
      // 区间之间有交集，取并集
      temp[1] = Math.max(temp[1], cur[1]);
    }
  }
  return res;
};
// @lc code=end

console.log(
  merge([
    [1, 4],
    [4, 5]
  ])
);
