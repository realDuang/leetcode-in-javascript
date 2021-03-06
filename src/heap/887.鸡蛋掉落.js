/*
 * @lc app=leetcode.cn id=887 lang=javascript
 *
 * [887] 鸡蛋掉落
 *
 * https://leetcode-cn.com/problems/super-egg-drop/description/
 *
 * algorithms
 * Hard (21.48%)
 * Likes:    204
 * Dislikes: 0
 * Total Accepted:    9.6K
 * Total Submissions: 43.9K
 * Testcase Example:  '1\n2'
 *
 * 你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
 *
 * 每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
 *
 * 你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
 *
 * 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
 *
 * 你的目标是确切地知道 F 的值是多少。
 *
 * 无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：K = 1, N = 2
 * 输出：2
 * 解释：
 * 鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
 * 否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
 * 如果它没碎，那么我们肯定知道 F = 2 。
 * 因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
 *
 *
 * 示例 2：
 *
 * 输入：K = 2, N = 6
 * 输出：3
 *
 *
 * 示例 3：
 *
 * 输入：K = 3, N = 14
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= K <= 100
 * 1 <= N <= 10000
 *
 *
 */

// @lc code=start
/**
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function(K, N) {
  if (N < 1) return 0;
  if (N === 1) return 1;
  if (K === 1) return N;
  const dp = new Array(K + 1).fill(0).map(x => new Array(N + 1).fill(Number.MAX_SAFE_INTEGER));
  // K=0,1特例
  for (let i = 0; i <= N; i++) {
    dp[0][i] = 0;
    dp[1][i] = i;
  }
  // N=0,1特例
  for (let i = 1; i <= K; i++) {
    dp[i][0] = 0;
    dp[i][1] = 1;
  }
  for (let k = 2; k <= K; k++) {
    let i = 1;
    for (let j = 1; j <= N; j++) {
      while (i < j && dp[k - 1][i - 1] < dp[k][j - i]) ++i;
      const temp = 1 + Math.max(dp[k - 1][i - 1], dp[k][j - i]);
      dp[k][j] = Math.min(temp, dp[k][j]);
    }
  }
  return dp[K][N];
};
// @lc code=end

console.log(superEggDrop(9, 10000));

// 你面前有一栋从1到N共N层的楼，不限制鸡蛋个数，现在确定这栋楼存在楼层0 <= F <= N，在这层楼将鸡蛋扔下去，鸡蛋恰好没摔碎（高于F的楼层都会碎，低于F的楼层都不会碎）。现在问你，最坏情况下，你至少要扔几次鸡蛋，才能确定这个楼层F呢？

// PS：F 可以为 0，比如说鸡蛋在 1 层都能摔碎，那么 F = 0。

// 用最简单的二分法解

// var eggDrop = function(n) {
//   if (n <= 0) return 0;
//   let count = 0;
//   let temp = n;
//   while (temp > 1) {
//     temp = temp >> 1;
//     count++;
//   }
//   return count;
// };

// console.log(eggDrop(100));

// 你面前有一栋从1到N共N层的楼，限制鸡蛋个数为2，现在确定这栋楼存在楼层0 <= F <= N，在这层楼将鸡蛋扔下去，鸡蛋恰好没摔碎（高于F的楼层都会碎，低于F的楼层都不会碎）。现在问你，最坏情况下，你至少要扔几次鸡蛋，才能确定这个楼层F呢？

// 这时题目的变化使得不适用二分法求解了，本质上是一道动态规划求极值的问题。经典的"最坏情况下代价最小"问题。

// 由于只有两个鸡蛋，那么子问题可以分解为：总楼层为n，第一个鸡蛋随便从一个楼层i扔下去，碎了与没碎两种情况，
// 1. 如果碎了，那么只能从第一层开始一直遍历到当前楼层i之前，共需 i - 1次
// 2. 如果没碎，那么i层之前的楼层就一定不会碎，因此子问题转化为测试[i+1, n] 层的最小测试次数，即dp[n-i]
// 以上两种情况取较大值再加上本次测试使用的1次机会，即为本次实验的最小次数
// 那么有：dp[n] = 1 + max(i - 1, dp[n - i])
// 这是不是已经是该题的解呢，其实不是，如果我们能选择任意小于n的楼层进行上述求解，有可能取得的值要比上述结果更小，因此我们应当对所有小于总楼层n的楼层遍历取所有结果的最小值作为本次子问题的解。
// 即：dp[n] = min(1 + max(i - 1, dp[j - i])) (j遍历 1~n)

// var eggDrop2 = function(n) {
//   if (n <= 0) return 0;
//   const dp = new Array(n).fill(Number.MAX_SAFE_INTEGER);
//   dp[0] = 1;
//   for (let j = 1; j < n; j++) {
//     for (let i = 1; i <= j; i++) {
//       const temp = 1 + Math.max(i - 1, dp[j - i]);
//       dp[j] = Math.min(temp, dp[j]);
//     }
//   }
//   return dp[n - 1];
// };

// console.log(eggDrop2(7));

// 你面前有一栋从1到N共N层的楼，限制鸡蛋个数为K，现在确定这栋楼存在楼层0 <= F <= N，在这层楼将鸡蛋扔下去，鸡蛋恰好没摔碎（高于F的楼层都会碎，低于F的楼层都不会碎）。现在问你，最坏情况下，你至少要扔几次鸡蛋，才能确定这个楼层F呢？

// 现在这道题变成了更为复杂的DP问题，由于多加入了一个参数，显然需要使用二维数组解题。
// 在上面已经推导出 k=2 时的状态转移方程了，又已知 i-1 这个值是 k=1 时的特例，那接下来的状态转移方程便也不难推导了。
// 还是依照上面的思路，每次在第i层扔鸡蛋的结果共有两种情况：
// 1. 如果碎了，那么可使用的鸡蛋数减少一个，剩下需要测试的层数为1~i层，因此子问题转化为dp[k-1][i-1]
// 2. 如果没碎，那么鸡蛋数不变，并且i层之前的楼层就一定不会碎，需要测试i+1~n层，因此子问题转化为dp[k][n-i]
// 那么有：dp[k][n] = 1 + max(dp[k-1][i-1], dp[k][n - i])
// 还是如上题所说，我们应当对所有小于总楼层n的楼层遍历取所有结果的最小值作为本次子问题的解。
// 即 dp[k][n] = min(1 + max(dp[k-1][i-1], dp[k][j - i])) (j遍历 1~n)

// var superEggDrop = function(K, N) {
//   if (N < 1) return 0;
//   if (N === 1) return 1;
//   if (K === 1) return N;
//   const dp = new Array(K + 1).fill(0).map(x => new Array(N + 1).fill(Number.MAX_SAFE_INTEGER));
//   // K=0,1特例
//   for (let i = 0; i <= N; i++) {
//     dp[0][i] = 0;
//     dp[1][i] = i;
//   }
//   // N=0,1特例
//   for (let i = 1; i <= K; i++) {
//     dp[i][0] = 0;
//     dp[i][1] = 1;
//   }
//   for (let k = 2; k <= K; k++) {
//     for (let j = 1; j <= N; j++) {
//       for (let i = 1; i <= j; i++) {
//         const temp = 1 + Math.max(dp[k - 1][i - 1], dp[k][j - i]);
//         dp[k][j] = Math.min(temp, dp[k][j]);
//       }
//     }
//   }
//   console.log(dp);
//   return dp[K][N];
// };

// console.log(superEggDrop(2, 100));

// 算法思想实现大致如此，时间复杂度为O(KN^2)，空间复杂度为O(KN)。但是很遗憾，这是一道hard难度的题目，因此直接这样提交会TLE，我们需要想办法优化这个算法。
// 通过观察 dp[k-1][i-1] 与 dp[k][n-i] 这两种情况，我们可以发现前者随着i单调递增，后者随i单调递减，那么求这两者间的最大值可以转化为：存在一个值i，使得当二者相等或者差值最小，此时得到最优解。
// 同时我们观察二维数组还可以发现，随着j的增加，此时最优决策点也是单调递增的，那么对于每一次遍历k时，我们可以使用一个变量i，记录当前层数为j时的最优决策点，当j增加时，将i更新即可。这样我们就能将时间复杂度降到O(KN)，总算能够AC了。

// var superEggDrop = function(K, N) {
//   if (N < 1) return 0;
//   if (N === 1) return 1;
//   if (K === 1) return N;
//   const dp = new Array(K + 1).fill(0).map(x => new Array(N + 1).fill(Number.MAX_SAFE_INTEGER));
//   // K=0,1特例
//   for (let i = 0; i <= N; i++) {
//     dp[0][i] = 0;
//     dp[1][i] = i;
//   }
//   // N=0,1特例
//   for (let i = 1; i <= K; i++) {
//     dp[i][0] = 0;
//     dp[i][1] = 1;
//   }
//   for (let k = 2; k <= K; k++) {
//     let i = 1;
//     for (let j = 1; j <= N; j++) {
//       while (i < j && dp[k - 1][i - 1] < dp[k][j - i]) ++i;
//       const temp = 1 + Math.max(dp[k - 1][i - 1], dp[k][j - i]);
//       dp[k][j] = Math.min(temp, dp[k][j]);
//     }
//   }
//   return dp[K][N];
// };

// console.log(superEggDrop(2, 100));
