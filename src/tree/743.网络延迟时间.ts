/*
 * @lc app=leetcode.cn id=743 lang=typescript
 *
 * [743] 网络延迟时间
 *
 * https://leetcode.cn/problems/network-delay-time/description/
 *
 * algorithms
 * Medium (54.18%)
 * Likes:    550
 * Dislikes: 0
 * Total Accepted:    79.2K
 * Total Submissions: 146.2K
 * Testcase Example:  '[[2,1,1],[2,3,1],[3,4,1]]\n4\n2'
 *
 * 有 n 个网络节点，标记为 1 到 n。
 *
 * 给你一个列表 times，表示信号经过 有向 边的传递时间。 times[i] = (ui, vi, wi)，其中 ui 是源节点，vi 是目标节点，
 * wi 是一个信号从源节点传递到目标节点的时间。
 *
 * 现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：times = [[1,2,1]], n = 2, k = 1
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：times = [[1,2,1]], n = 2, k = 2
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= n <= 100
 * 1 <= times.length <= 6000
 * times[i].length == 3
 * 1 <= ui, vi <= n
 * ui != vi
 * 0 <= wi <= 100
 * 所有 (ui, vi) 对都 互不相同（即，不含重复边）
 *
 *
 */

// @lc code=start
function networkDelayTime(times: number[][], n: number, k: number): number {
  // 构建加权邻接图
  const graph: { to: number; weight: number }[][] = Array(n + 1)
    .fill(0)
    .map(x => Array());
  times.forEach(edge => {
    const [from, to, weight] = edge;
    graph[from].push({ to: to, weight: weight });
  });

  // 计算k到每个节点的加权距离
  const distances: number[] = dijkstra(k);
  // 从距离中取最大值，保证所有节点都收到信号
  const res = Math.max(...distances);
  // 若存在不可达节点，则返回 -1
  return res === Number.MAX_VALUE ? -1 : res;

  function dijkstra(start: number): number[] {
    const minDists: number[] = Array(n + 1).fill(Number.MAX_VALUE);
    // 去除无意义的节点距离
    minDists[0] = -1;
    // 起点距离自己的最短距离是0
    minDists[start] = 0;

    const queue = [{ curId: start, curToStartDist: 0 }];

    while (queue.length > 0) {
      const { curId, curToStartDist } = queue.shift();
      // 如果当前节点距离起点已经大于最短路径了，剪枝
      if (curToStartDist > minDists[curId]) {
        continue;
      }

      // 遍历所有邻接节点，以期望获取更小距离
      for (const { to, weight } of graph[curId]) {
        // 判断从当前节点到相邻节点的这条加权路径是否更短
        const newDistance = minDists[curId] + weight;
        if (newDistance < minDists[to]) {
          //  如果更短，更新相邻节点的最短路径
          // 由于该路径是可行的，将该路径信息加入到队列中等待下次递归
          minDists[to] = newDistance;
          queue.push({
            curId: to,
            curToStartDist: newDistance
          });
        }
      }
    }
    return minDists;
  }
}
// @lc code=end

(() => {
  const times = [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1]
    ],
    n = 4,
    k = 2;
  console.log(networkDelayTime(times, n, k));
})();
