/*
 * @lc app=leetcode.cn id=1319 lang=typescript
 *
 * [1319] 连通网络的操作次数
 *
 * https://leetcode.cn/problems/number-of-operations-to-make-network-connected/description/
 *
 * algorithms
 * Medium (62.52%)
 * Likes:    263
 * Dislikes: 0
 * Total Accepted:    51.7K
 * Total Submissions: 82.5K
 * Testcase Example:  '4\n[[0,1],[0,2],[1,2]]'
 *
 * 用以太网线缆将 n 台计算机连接成一个网络，计算机的编号从 0 到 n-1。线缆用 connections 表示，其中 connections[i] =
 * [a, b] 连接了计算机 a 和 b。
 *
 * 网络中的任何一台计算机都可以通过网络直接或者间接访问同一个网络中其他任意一台计算机。
 *
 * 给你这个计算机网络的初始布线
 * connections，你可以拔开任意两台直连计算机之间的线缆，并用它连接一对未直连的计算机。请你计算并返回使所有计算机都连通所需的最少操作次数。如果不可能，则返回
 * -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：n = 4, connections = [[0,1],[0,2],[1,2]]
 * 输出：1
 * 解释：拔下计算机 1 和 2 之间的线缆，并将它插到计算机 1 和 3 上。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
 * 输出：2
 *
 *
 * 示例 3：
 *
 * 输入：n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
 * 输出：-1
 * 解释：线缆数量不足。
 *
 *
 * 示例 4：
 *
 * 输入：n = 5, connections = [[0,1],[0,2],[3,4],[2,3]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^5
 * 1 <= connections.length <= min(n*(n-1)/2, 10^5)
 * connections[i].length == 2
 * 0 <= connections[i][0], connections[i][1] < n
 * connections[i][0] != connections[i][1]
 * 没有重复的连接。
 * 两台计算机不会通过多条线缆连接。
 *
 *
 */

// @lc code=start
function makeConnected(n: number, connections: number[][]): number {
  const len = connections.length;
  if (len < n - 1) return -1;

  const visited: boolean[] = Array(n).fill(false);
  const map: number[][] = Array(n)
    .fill(0)
    .map(x => Array());
  let graphCnt = 0;

  for (const [a, b] of connections) {
    // 先统计出来每一个点所直接连接的点有哪些
    map[a].push(b);
    map[b].push(a);
  }

  // 从每一个位置开始求所在联通图
  for (let i = 0; i < n; i++) {
    dfs(i, false);
  }

  // 将 n 个独立图联通起来的最少需要 n-1 条边
  return graphCnt - 1;

  // recursive 表示是否是其他点递归过来的函数
  function dfs(index: number, recursive: boolean) {
    // 如果该位置被访问过，说明已经在同一个联通图里了
    if (visited[index]) return;

    visited[index] = true;
    if (!recursive) {
      // 只有是独立发起的图的起点，才将独立图数量 +1
      graphCnt += 1;
    }

    // 如果有与当前位置联通的点，继续递归扩散
    if (map[index].length) {
      for (const next of map[index]) {
        dfs(next, true);
      }
    }
  }
}
// @lc code=end

(() => {
  const n = 6,
    connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3]
    ];
  console.log(makeConnected(n, connections));
})();
