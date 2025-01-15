/*
 * @lc app=leetcode.cn id=542 lang=typescript
 *
 * [542] 01 矩阵
 *
 * https://leetcode.cn/problems/01-matrix/description/
 *
 * algorithms
 * Medium (47.02%)
 * Likes:    970
 * Dislikes: 0
 * Total Accepted:    149.9K
 * Total Submissions: 317.6K
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * 给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。
 *
 * 两个相邻元素间的距离为 1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：[[0,0,0],[0,1,0],[0,0,0]]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：mat = [[0,0,0],[0,1,0],[1,1,1]]
 * 输出：[[0,0,0],[0,1,0],[1,2,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1
 * 1
 * mat[i][j] is either 0 or 1.
 * mat 中至少有一个 0
 *
 *
 */

// @lc code=start
function updateMatrix(mat: number[][]): number[][] {
  const height = mat.length;
  const width = mat[0].length;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const dist: number[][] = Array(height)
    .fill(0)
    .map(x => Array(width).fill(0));
  const visited: boolean[][] = Array(height)
    .fill(0)
    .map(x => Array(width).fill(false));

  const queue: number[][] = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // 对所有 0 位置进行扩散查找距离
      if (mat[i][j] === 0) {
        queue.push([i, j]);
        // 设置当前路径标记为完成
        // 因为 0 位置的最小距离就是 0，不需要对 dist 做更改
        // dist[i][j] = 0;
        visited[i][j] = true;
      }
    }
  }

  // BFS 去找距离 0 位置的最短步数
  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i <= 3; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      // 越界丢弃
      if (nx < 0 || nx >= height || ny < 0 || ny >= width || visited[nx][ny]) continue;

      // 第一个扩散到当前位置的一定是最短路径
      dist[nx][ny] = dist[x][y] + 1;

      // 设置完最短路径后 标记为完成
      visited[nx][ny] = true;

      // 作为下一跳的搜寻节点
      queue.push([nx, ny]);
    }
  }

  return dist;
}
// @lc code=end

(() => {
  const mat = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
  ];
  console.log(updateMatrix(mat));
})();
