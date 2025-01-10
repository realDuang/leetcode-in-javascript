/*
 * @lc app=leetcode.cn id=576 lang=typescript
 *
 * [576] 出界的路径数
 *
 * https://leetcode.cn/problems/out-of-boundary-paths/description/
 *
 * algorithms
 * Medium (47.12%)
 * Likes:    325
 * Dislikes: 0
 * Total Accepted:    41.4K
 * Total Submissions: 87.9K
 * Testcase Example:  '2\n2\n2\n0\n0'
 *
 * 给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn]
 * 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 最多 可以移动 maxMove 次球。
 *
 * 给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对
 * 10^9 + 7 取余 后的结果。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
 * 输出：6
 *
 *
 * 示例 2：
 *
 *
 * 输入：m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
 * 输出：12
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= m, n <= 50
 * 0 <= maxMove <= 50
 * 0 <= startRow < m
 * 0 <= startColumn < n
 *
 *
 */

// @lc code=start
function findPaths(m: number, n: number, maxMove: number, startRow: number, startColumn: number): number {
  const MOD = 1000000007;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  let res = 0;

  // dp[i][r][c] 表示移动 i 步时，球到达 (r, c) 处的路径数量
  const dp = Array(maxMove + 1)
    .fill(0)
    .map(x =>
      Array(m)
        .fill(0)
        .map(x => Array(n).fill(0))
    );

  // 如果一步不走，只有球在这个点上一种情况
  dp[0][startRow][startColumn] = 1;

  for (let i = 0; i < maxMove; i++) {
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        const steps = dp[i][r][c];
        if (steps === 0) continue;

        // 给下一步相邻位置上的格子加上当前点过去的路径数
        for (const direction of directions) {
          const r1 = r + direction[0];
          const c1 = c + direction[1];
          if (r1 >= 0 && r1 < m && c1 >= 0 && c1 < n) {
            dp[i + 1][r1][c1] = (dp[i + 1][r1][c1] + steps) % MOD;
          } else {
            // 如果此时位置已经越界，说明到达该点的所有路径是可以走出去的，加入到 res 中
            res = (res + steps) % MOD;
          }
        }
      }
    }
  }

  return res;
}
// @lc code=end

(() => {
  const m = 1,
    n = 3,
    maxMove = 3,
    startRow = 0,
    startColumn = 1;
  console.log(findPaths(m, n, maxMove, startRow, startColumn));
})();
