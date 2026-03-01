/*
 * @lc app=leetcode.cn id=986 lang=javascript
 *
 * [986] 区间列表的交集
 *
 * https://leetcode-cn.com/problems/interval-list-intersections/description/
 *
 * algorithms
 * Medium (64.41%)
 * Likes:    89
 * Dislikes: 0
 * Total Accepted:    9.6K
 * Total Submissions: 14.8K
 * Testcase Example:  '[[0,2],[5,10],[13,23],[24,25]]\n[[1,5],[8,12],[15,24],[25,26]]'
 *
 * 给定两个由一些 闭区间 组成的列表，每个区间列表都是成对不相交的，并且已经排序。
 *
 * 返回这两个区间列表的交集。
 *
 * （形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <=
 * b。两个闭区间的交集是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3]。）
 *
 *
 *
 * 示例：
 *
 *
 *
 * 输入：A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
 * 输出：[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= A.length < 1000
 * 0 <= B.length < 1000
 * 0 <= A[i].start, A[i].end, B[i].start, B[i].end < 10^9
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var intervalIntersection = function (A, B) {
  if (A.length <= 0 || B.length <= 0) return [];

  const res = [];
  let i = 0;
  let j = 0;

  while (i < A.length && j < B.length) {
    //  判断两区间是否存在交集
    // 不存在交集的情况为：A[i][0] > B[j][1] || B[j][0] > A[i][1]。取非
    if (A[i][0] <= B[j][1] && B[j][0] <= A[i][1]) {
      // 选取交集
      res.push([Math.max(A[i][0], B[j][0]), Math.min(A[i][1], B[j][1])]);
    }
    // 指针进位规则：右边界小的那方进行移动
    if (B[j][1] < A[i][1]) {
      j++;
    } else {
      i++;
    }
  }

  return res;
};
// @lc code=end

console.log(
  intervalIntersection(
    [
      [0, 2],
      [5, 10],
      [13, 23],
      [24, 25]
    ],
    [
      [1, 5],
      [8, 12],
      [15, 24],
      [25, 26]
    ]
  )
);
