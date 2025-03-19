/*
 * @lc app=leetcode.cn id=174 lang=typescript
 *
 * [174] 地下城游戏
 *
 * https://leetcode.cn/problems/dungeon-game/description/
 *
 * algorithms
 * Hard (48.55%)
 * Likes:    896
 * Dislikes: 0
 * Total Accepted:    83.2K
 * Total Submissions: 170.7K
 * Testcase Example:  '[[-2,-3,3],[-5,-10,1],[10,30,-5]]'
 *
 * table.dungeon, .dungeon th, .dungeon td {
 * ⁠ border:3px solid black;
 * }
 *
 * ⁠.dungeon th, .dungeon td {
 * ⁠   text-align: center;
 * ⁠   height: 70px;
 * ⁠   width: 70px;
 * }
 *
 * 恶魔们抓住了公主并将她关在了地下城 dungeon 的 右下角 。地下城是由 m x n 个房间组成的二维网格。我们英勇的骑士最初被安置在 左上角
 * 的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。
 *
 * 骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。
 *
 * 有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为
 * 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。
 *
 * 为了尽快解救公主，骑士决定每次只 向右 或 向下 移动一步。
 *
 * 返回确保骑士能够拯救到公主所需的最低初始健康点数。
 *
 * 注意：任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
 * 输出：7
 * 解释：如果骑士遵循最佳路径：右 -> 右 -> 下 -> 下 ，则骑士的初始健康点数至少为 7 。
 *
 * 示例 2：
 *
 *
 * 输入：dungeon = [[0]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == dungeon.length
 * n == dungeon[i].length
 * 1 <= m, n <= 200
 * -1000 <= dungeon[i][j] <= 1000
 *
 *
 */

// @lc code=start

function calculateMinimumHP(dungeon: number[][]): number {
  if (dungeon == null || dungeon.length == 0 || dungeon[0].length == 0) {
    return 0;
  }

  const m = dungeon.length;
  const n = dungeon[0].length;
  const dp = Array(m)
    .fill(0)
    .map(() => Array(n).fill(-1));

  // 最后一格的值
  dp[m - 1][n - 1] = dungeon[m - 1][n - 1] < 0 ? -dungeon[m - 1][n - 1] : 0;

  // 最后一列的值
  for (let i = m - 2; i >= 0; i--) {
    // 根据下方一格的最小需求血量，与当前消耗血量，判断当前格最小需要血量
    const min = dp[i + 1][n - 1] - dungeon[i][n - 1];
    dp[i][n - 1] = min > 0 ? min : 0;
  }

  // 最后一行的值
  for (let j = n - 2; j >= 0; j--) {
    // 根据右方一格的最小需求血量，与当前消耗血量，判断当前格最小需要血量
    const min = dp[m - 1][j + 1] - dungeon[m - 1][j];
    dp[m - 1][j] = min > 0 ? min : 0;
  }

  for (let i = m - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      // 有两种选法，从右边或者从下边过来，取最小值
      const min = Math.min(dp[i][j + 1], dp[i + 1][j]) - dungeon[i][j];
      dp[i][j] = min > 0 ? min : 0;
    }
  }

  return dp[0][0] + 1;
}
// @lc code=end

// function calculateMinimumHP(dungeon: number[][]): number {
//   if (dungeon == null || dungeon.length == 0 || dungeon[0].length == 0) {
//     return 0;
//   }

//   const m = dungeon.length;
//   const n = dungeon[0].length;
//   const memo = Array(m)
//     .fill(0)
//     .map(() => Array(n).fill(-1));

//   // 最低需要血量还要 +1
//   return dfs(0, 0) + 1;

//   function dfs(i: number, j: number): number {
//     // 越界
//     if (i >= m || j >= n) return Infinity;

//     // 如果计算过，则直接返回
//     if (memo[i][j] !== -1) return memo[i][j];

//     // 如果走到最后一个格子，最小需要生命值是确定的
//     // 如果当前格是加血，则最小需要生命值为 0
//     if (i === m - 1 && j === n - 1) return dungeon[i][j] >= 0 ? 0 : -dungeon[i][j];

//     // 递归出来向右和向下的最佳消耗量
//     const right = dfs(i, j + 1);
//     const bottom = dfs(i + 1, j);

//     // 得出当前格的最小消耗血量
//     const needHp = Math.min(right, bottom) - dungeon[i][j];

//     // 需求血量如果小于 0，则表示当前格不需要额外生命值，否则到该格时需要最少加上该血量
//     const hp = needHp < 0 ? 0 : needHp;
//     // 记住避免重复计算
//     memo[i][j] = hp;
//     // console.log(i, j, hp);
//     return hp;
//   }
// }

(() => {
  const dungeon = [
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5]
  ];
  console.log(calculateMinimumHP(dungeon));
})();
