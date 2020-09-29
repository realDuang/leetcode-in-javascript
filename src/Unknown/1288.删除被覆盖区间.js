/*
 * @lc app=leetcode.cn id=1288 lang=javascript
 *
 * [1288] 删除被覆盖区间
 *
 * https://leetcode-cn.com/problems/remove-covered-intervals/description/
 *
 * algorithms
 * Medium (54.71%)
 * Likes:    17
 * Dislikes: 0
 * Total Accepted:    3.6K
 * Total Submissions: 6.5K
 * Testcase Example:  '[[1,4],[3,6],[2,8]]'
 *
 * 给你一个区间列表，请你删除列表中被其他区间所覆盖的区间。
 *
 * 只有当 c <= a 且 b <= d 时，我们才认为区间 [a,b) 被区间 [c,d) 覆盖。
 *
 * 在完成所有删除操作后，请你返回列表中剩余区间的数目。
 *
 *
 *
 * 示例：
 *
 *
 * 输入：intervals = [[1,4],[3,6],[2,8]]
 * 输出：2
 * 解释：区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。
 *
 *
 *
 *
 * 提示：​​​​​​
 *
 *
 * 1 <= intervals.length <= 1000
 * 0 <= intervals[i][0] < intervals[i][1] <= 10^5
 * 对于所有的 i != j：intervals[i] != intervals[j]
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function(intervals) {
  // 先排序，接下来就只用判断区间右侧位置与新区间之间的关系
  // 注意，当两区间起始相同时，比较区间以范围较大的优先，即：起点升序排列，终点降序排列
  intervals.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  let res = 0;

  // 先初始化区间的结束位置
  // 因为之前的排序新区间起始位置不可能小于left，因此左侧位置不需要比较
  let right = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const newRight = intervals[i][1];
    if (right >= newRight) {
      // 新的区间完全被覆盖了，满足要求
      res += 1;
    } else {
      // 新区间不能被完全覆盖，则更新匹配区间位置
      right = newRight;
    }
  }
  return intervals.length - res;
};
// @lc code=end

console.log(
  removeCoveredIntervals([
    [1, 2],
    [1, 4],
    [3, 4]
  ])
);
