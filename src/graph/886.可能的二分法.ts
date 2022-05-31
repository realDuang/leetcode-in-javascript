/*
 * @lc app=leetcode.cn id=886 lang=typescript
 *
 * [886] 可能的二分法
 *
 * https://leetcode.cn/problems/possible-bipartition/description/
 *
 * algorithms
 * Medium (48.12%)
 * Likes:    177
 * Dislikes: 0
 * Total Accepted:    16.5K
 * Total Submissions: 34.2K
 * Testcase Example:  '4\n[[1,2],[1,3],[2,4]]'
 *
 * 给定一组 n 人（编号为 1, 2, ..., n）， 我们想把每个人分进任意大小的两组。每个人都可能不喜欢其他人，那么他们不应该属于同一组。
 *
 * 给定整数 n 和数组 dislikes ，其中 dislikes[i] = [ai, bi] ，表示不允许将编号为 ai 和
 * bi的人归入同一组。当可以用这种方法将所有人分进两组时，返回 true；否则返回 false。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 4, dislikes = [[1,2],[1,3],[2,4]]
 * 输出：true
 * 解释：group1 [1,4], group2 [2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 3, dislikes = [[1,2],[1,3],[2,3]]
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2000
 * 0 <= dislikes.length <= 10^4
 * dislikes[i].length == 2
 * 1 <= dislikes[i][j] <= n
 * ai < bi
 * dislikes 中每一组都 不同
 *
 *
 *
 *
 */

// @lc code=start
function possibleBipartition(n: number, dislikes: number[][]): boolean {
  // 建立邻接表
  const graph: Set<number>[] = Array(n)
    .fill(0)
    .map(x => new Set());
  for (const pair of dislikes) {
    const start = pair[0] - 1;
    const end = pair[1] - 1;
    // 无向图，两边都需要加上邻接点
    graph[start].add(end);
    graph[end].add(start);
  }

  // 判断二分图
  let res = true;
  const visited: boolean[] = [];
  const isInGroup1: boolean[] = Array(n).fill(false);
  for (let i = 0; i < graph.length; i++) {
    if (!visited[i]) {
      traverse(i);
    }
  }
  return res;

  function traverse(node: number) {
    if (!res) return;

    visited[node] = true;

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        isInGroup1[neighbor] = !isInGroup1[node];
        traverse(neighbor);
      } else {
        if (isInGroup1[neighbor] === isInGroup1[node]) {
          res = false;
        }
      }
    }
  }
}
// @lc code=end

(() => {
  const n = 5,
    dislikes = [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [1, 5]
    ];
  console.log(possibleBipartition(n, dislikes));
})();
