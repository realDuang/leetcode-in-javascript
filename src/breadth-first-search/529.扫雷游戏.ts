/*
 * @lc app=leetcode.cn id=529 lang=typescript
 *
 * [529] 扫雷游戏
 *
 * https://leetcode.cn/problems/minesweeper/description/
 *
 * algorithms
 * Medium (64.00%)
 * Likes:    403
 * Dislikes: 0
 * Total Accepted:    60.1K
 * Total Submissions: 93.7K
 * Testcase Example:  '[["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]]\n' +
  '[3,0]'
 *
 * 让我们一起来玩扫雷游戏！
 * 
 * 给你一个大小为 m x n 二维字符矩阵 board ，表示扫雷游戏的盘面，其中：
 * 
 * 
 * 'M' 代表一个 未挖出的 地雷，
 * 'E' 代表一个 未挖出的 空方块，
 * 'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的 已挖出的 空白方块，
 * 数字（'1' 到 '8'）表示有多少地雷与这块 已挖出的 方块相邻，
 * 'X' 则表示一个 已挖出的 地雷。
 * 
 * 
 * 给你一个整数数组 click ，其中 click = [clickr, clickc] 表示在所有 未挖出的 方块（'M' 或者
 * 'E'）中的下一个点击位置（clickr 是行下标，clickc 是列下标）。
 * 
 * 根据以下规则，返回相应位置被点击后对应的盘面：
 * 
 * 
 * 如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X' 。
 * 如果一个 没有相邻地雷 的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的 未挖出 方块都应该被递归地揭露。
 * 如果一个 至少与一个地雷相邻 的空方块（'E'）被挖出，修改它为数字（'1' 到 '8' ），表示相邻地雷的数量。
 * 如果在此次点击中，若无更多方块可被揭露，则返回盘面。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：board =
 * [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]],
 * click = [3,0]
 * 
 * 输出：[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：board =
 * [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]],
 * click = [1,2]
 * 
 * 输出：[["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 50
 * board[i][j] 为 'M'、'E'、'B' 或数字 '1' 到 '8' 中的一个
 * click.length == 2
 * 0 <= clickr < m
 * 0 <= clickc < n
 * board[clickr][clickc] 为 'M' 或 'E'
 * 
 * 
 */

// @lc code=start
const dx = [1, 1, 1, -1, -1, -1, 0, 0];
const dy = [1, 0, -1, 0, 1, -1, 1, -1];

function updateBoard(board: string[][], click: number[]): string[][] {
  const m = board.length;
  const n = board[0].length;

  const [r, c] = click;
  if (board[r][c] === 'M') {
    board[r][c] = 'X';
    return board;
  }

  // 踩中未知点，则从当前点递归搜索
  if (board[r][c] === 'E') {
    update(r, c);
    return board;
  }

  // 如果踩中其他点，则无反应，原样返回
  return board;

  // BFS 方案
  // function update(r: number, c: number) {
  //   const queue: [number, number][] = [[r, c]];
  //   while (queue.length > 0) {
  //     const [x, y] = queue.shift();

  //     // 如果该点越界或者不为未知点，则直接返回
  //     if (!isValid(x, y) || board[x][y] !== 'E') continue;

  //     // 查找该点周围 8 个位置雷的个数
  //     let count = 0;
  //     for (let i = 0; i < 8; i++) {
  //       const nx = x + dx[i];
  //       const ny = y + dy[i];
  //       if (isValid(nx, ny) && board[nx][ny] === 'M') {
  //         count += 1;
  //       }
  //     }

  //     // 如果周围没有雷，标记为 B，并继续递归周围的 8 个点
  //     if (count === 0) {
  //       board[x][y] = 'B';
  //       for (let i = 0; i < 8; i++) {
  //         const nx = x + dx[i];
  //         const ny = y + dy[i];
  //         queue.push([nx, ny]);
  //       }
  //     } else {
  //       // 有雷，标记该点为雷的个数
  //       board[x][y] = count.toString();
  //     }
  //   }
  // }

  // DFS 方案
  function update(x: number, y: number) {
    // 如果该点越界或者不为未知点，则直接返回
    if (!isValid(x, y) || board[x][y] !== 'E') return;

    // 查找该点周围 8 个位置雷的个数
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (isValid(nx, ny) && board[nx][ny] === 'M') {
        count += 1;
      }
    }

    // 如果周围没有雷，标记为 B，并继续递归周围的 8 个点
    if (count === 0) {
      board[x][y] = 'B';
      for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        update(nx, ny);
      }
    } else {
      // 有雷，标记该点为雷的个数
      board[x][y] = count.toString();
    }
  }

  function isValid(x: number, y: number) {
    const inBound = x >= 0 && x < m && y >= 0 && y < n;
    return inBound;
  }
}

// @lc code=end

(() => {
  const board = [
      ['E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'M', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E']
    ],
    click = [3, 0];
  console.log(updateBoard(board, click));
})();
