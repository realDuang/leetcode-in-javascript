/*
 * @lc app=leetcode id=463 lang=javascript
 *
 * [463] Island Perimeter
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  let res = 0;
  const height = grid.length;
  const width = grid[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === 1) {
        let temp = 4;
        if (i > 0 && grid[i - 1][j] === 1) temp--;
        if (i < height - 1 && grid[i + 1][j] === 1) temp--;
        if (j > 0 && grid[i][j - 1] === 1) temp--;
        if (j < width - 1 && grid[i][j + 1] === 1) temp--;
        res += temp;
      }
    }
  }
  return res;
};
// @lc code=end
console.log(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0]
  ])
);

// 这题挺简单的，遍历二维数组每个值，分别判断其上下左右是否存在为1的值，若存在则说明该块的该条边在多边形内部，不计入该条边，若为0则将该条边长计入，遍历完成返回所有边长之和即可。