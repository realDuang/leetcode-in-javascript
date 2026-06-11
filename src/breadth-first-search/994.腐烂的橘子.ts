/*
 * @lc app=leetcode.cn id=994 lang=typescript
 *
 * [994] 腐烂的橘子
 *
 * https://leetcode.cn/problems/rotting-oranges/description/
 *
 * algorithms
 * Medium (55.51%)
 * Likes:    1152
 * Dislikes: 0
 * Total Accepted:    446.7K
 * Total Submissions: 804.6K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 *
 *
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子。
 *
 *
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 *
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] 仅为 0、1 或 2
 *
 *
 */

// @lc code=start
const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

function orangesRotting(grid: number[][]): number {
  const queue: Array<[number, number]> = [];
  let freshCnt: number = 0;
  let time = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) queue.push([i, j]);
      if (grid[i][j] === 1) freshCnt += 1;
    }
  }

  while (queue.length !== 0 && freshCnt !== 0) {
    let len = queue.length;
    while (len--) {
      const [i, j] = queue.shift();
      bfs(i, j);
    }
    time++;
  }
  return freshCnt !== 0 ? -1 : time;

  function bfs(i: number, j: number) {
    for (const [dx, dy] of dir) {
      const x = i + dx;
      const y = j + dy;

      if (x < 0 || x > grid.length - 1 || y < 0 || y > grid[0].length - 1) continue;

      if (grid[x][y] === 1) {
        grid[x][y] = 2;
        freshCnt--;
        queue.push([x, y]);
      }
    }
  }
}
// @lc code=end

(() => {
  LCT.func(orangesRotting).auto();
})();
