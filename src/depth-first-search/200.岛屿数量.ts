/*
 * @lc app=leetcode.cn id=200 lang=typescript
 *
 * [200] 岛屿数量
 *
 * https://leetcode-cn.com/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (56.55%)
 * Likes:    1505
 * Dislikes: 0
 * Total Accepted:    382.4K
 * Total Submissions: 676.2K
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 *
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 *
 * 此外，你可以假设该网格的四条边均被水包围。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [
 * ⁠ ["1","1","1","1","0"],
 * ⁠ ["1","1","0","1","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","0","0","0"]
 * ]
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","1","0","0"],
 * ⁠ ["0","0","0","1","1"]
 * ]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1
 * grid[i][j] 的值为 '0' 或 '1'
 *
 *
 */

// @lc code=start
function numIslands(grid: string[][]): number {
  let res = 0;
  const height = grid.length;
  const width = grid[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === '1') {
        res += 1;
        floodFill(i, j);
      }
    }
  }
  return res;

  function floodFill(i: number, j: number) {
    // 递归越界返回
    if (i < 0 || j < 0 || i >= height || j >= width) return;
    // 已遍历过，或者当前节点不是陆地时，返回
    if (grid[i][j] === '0') return;

    // 将当前点设置为已访问
    grid[i][j] = '0';

    // 分别递归其上下左右节点
    floodFill(i - 1, j);
    floodFill(i + 1, j);
    floodFill(i, j - 1);
    floodFill(i, j + 1);
  }
}
// @lc code=end

(() => {
  const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ];
  console.log(numIslands(grid));
})();
