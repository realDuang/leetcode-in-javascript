/*
 * @lc app=leetcode.cn id=1162 lang=typescript
 *
 * [1162] 地图分析
 *
 * https://leetcode-cn.com/problems/as-far-from-land-as-possible/description/
 *
 * algorithms
 * Medium (47.27%)
 * Likes:    257
 * Dislikes: 0
 * Total Accepted:    42.8K
 * Total Submissions: 90.7K
 * Testcase Example:  '[[1,0,1],[0,0,0],[1,0,1]]'
 *
 * 你现在手里有一份大小为 n x n 的 网格 grid，上面的每个 单元格 都用 0 和 1 标记好了。其中 0 代表海洋，1 代表陆地。
 *
 * 请你找出一个海洋单元格，这个海洋单元格到离它最近的陆地单元格的距离是最大的，并返回该距离。如果网格上只有陆地或者海洋，请返回 -1。
 *
 * 我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：(x0, y0) 和 (x1, y1) 这两个单元格之间的距离是 |x0 -
 * x1| + |y0 - y1| 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[1,0,1],[0,0,0],[1,0,1]]
 * 输出：2
 * 解释：
 * 海洋单元格 (1, 1) 和所有陆地单元格之间的距离都达到最大，最大距离为 2。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：grid = [[1,0,0],[0,0,0],[0,0,0]]
 * 输出：4
 * 解释：
 * 海洋单元格 (2, 2) 和所有陆地单元格之间的距离都达到最大，最大距离为 4。
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 *
 * n == grid.length
 * n == grid[i].length
 * 1 <= n <= 100
 * grid[i][j] 不是 0 就是 1
 *
 *
 */

// @lc code=start
function maxDistance(grid: number[][]): number {
  const height = grid.length;
  const width = grid[0].length;
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  let res: number = -1;

  // 将所有陆地节点入队
  const queue: [row: number, col: number][] = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }

  // 没有陆地或者没有海洋
  if (queue.length === 0 || queue.length === height * width) {
    return -1;
  }

  // 多源 BFS，从所有岛屿开始向外 BFS
  while (queue.length > 0) {
    const [x, y] = queue.pop();

    for (let [a, b] of direction) {
      const newX = x + a;
      const newY = y + b;

      // 越界，跳过
      if (newX < 0 || newX >= height || newY < 0 || newY >= width) {
        continue;
      }

      // 当前节点为陆地，或是已经被遍历过，跳过
      if (grid[newX][newY] !== 0) {
        continue;
      }

      // 新的海洋，距离为上一层 BFS 的节点距离 + 1
      const distance = grid[x][y] + 1;
      grid[newX][newY] = distance;
      res = Math.max(res, distance);

      queue.unshift([newX, newY]);
    }
  }

  // 由于距离从陆地的1开始记录，而显然陆地距离自己为0，因此结果要去掉
  return res - 1;
}
// @lc code=end

(() => {
  const grid = [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1]
  ];
  console.log(maxDistance(grid));
})();
