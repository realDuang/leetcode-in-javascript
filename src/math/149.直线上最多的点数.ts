/*
 * @lc app=leetcode.cn id=149 lang=typescript
 *
 * [149] 直线上最多的点数
 *
 * https://leetcode-cn.com/problems/max-points-on-a-line/description/
 *
 * algorithms
 * Hard (35.67%)
 * Likes:    379
 * Dislikes: 0
 * Total Accepted:    54.1K
 * Total Submissions: 151.5K
 * Testcase Example:  '[[1,1],[2,2],[3,3]]'
 *
 * 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[1,1],[2,2],[3,3]]
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * points[i].length == 2
 * -10^4 i, yi
 * points 中的所有点 互不相同
 *
 *
 */

// @lc code=start
function maxPoints(points: number[][]): number {
  let res = 1;
  const len = points.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      let count = 2;
      for (let p = j + 1; p < len; p++) {
        // 求斜率。除法可能遇到精度问题，反正这个值也是用来做比对是否相等，所以改成乘法也一样。
        const k1 = (points[j][0] - points[i][0]) * (points[p][1] - points[j][1]);
        const k2 = (points[p][0] - points[j][0]) * (points[j][1] - points[i][1]);
        if (k1 === k2) count += 1;
      }
      res = Math.max(res, count);
    }
  }
  return res;
}
// @lc code=end

(() => {
  const points = [
    [1, 1],
    [3, 2],
    [5, 3],
    [4, 1],
    [2, 3],
    [1, 4]
  ];
  console.log(maxPoints(points));
})();
