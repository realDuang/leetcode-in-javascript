/*
 * @lc app=leetcode.cn id=54 lang=typescript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode.cn/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (53.06%)
 * Likes:    1946
 * Dislikes: 0
 * Total Accepted:    768.3K
 * Total Submissions: 1.4M
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * -100
 *
 *
 */

// @lc code=start
function spiralOrder(matrix: number[][]): number[] {
  const row = matrix.length;
  const col = matrix[0].length;

  const res: number[] = [];
  // let top = 0;
  // let bottom = matrix.length - 1;
  // let left = 0;
  // let right = matrix[0].length - 1;

  let i = 0;
  let j = 0;

  // const directions= ['right', 'down', 'left', 'up'];
  let direction = 0;
  const indexes = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];

  function check(i: number, j: number) {
    return i < 0 || i >= row || j < 0 || j >= col || matrix[i][j] === Infinity;
  }

  // 总共需要走的步数
  let leftStep = row * col;
  while (leftStep--) {
    res.push(matrix[i][j]);
    // 重要！标记 matrix 此处已经走过，下次螺旋过来就不会再遍历
    matrix[i][j] = Infinity;

    // 预测此方向上下一格的位置是否合法
    if (check(i + indexes[direction][0], j + indexes[direction][1])) {
      // 判断到达边界，开始转向
      direction = (direction + 1) % 4;
    }

    // 前往正确方向上的下一格
    i += indexes[direction][0];
    j += indexes[direction][1];
  }

  return res;
}
// @lc code=end

(() => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  console.log(spiralOrder(matrix));
})();
