/*
 * @lc app=leetcode.cn id=797 lang=typescript
 *
 * [797] 所有可能的路径
 *
 * https://leetcode-cn.com/problems/all-paths-from-source-to-target/description/
 *
 * algorithms
 * Medium (78.89%)
 * Likes:    245
 * Dislikes: 0
 * Total Accepted:    52.2K
 * Total Submissions: 66.1K
 * Testcase Example:  '[[1,2],[3],[3],[]]'
 *
 * 给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）
 *
 * graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：graph = [[1,2],[3],[3],[]]
 * 输出：[[0,1,3],[0,2,3]]
 * 解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
 * 输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == graph.length
 * 2 <= n <= 15
 * 0 <= graph[i][j] < n
 * graph[i][j] != i（即不存在自环）
 * graph[i] 中的所有元素 互不相同
 * 保证输入为 有向无环图（DAG）
 *
 *
 *
 *
 */

// @lc code=start
function allPathsSourceTarget(graph: number[][]): number[][] {
  // 入参 graph 直接就是邻接表了
  // 由于说明了此图无环，因此不需要用 visited 数组

  // 结果数组
  const res: number[][] = [];
  // 记录已遍历过的路径
  const path: number[] = [];

  const len = graph.length;
  traverse(0);

  return res;

  function traverse(index: number) {
    // 添加当前节点到路径中
    path.push(index);

    // 遍历到达终点
    if (index === len - 1) {
      // 拷贝一份当前路径，将其添加到结果数组中
      res.push([...path]);
      // 从路径中移除当前节点
      path.pop();
      return;
    }

    // 递归所有相邻节点
    for (const adjacent of graph[index]) {
      traverse(adjacent);
    }

    // 从路径中移除当前节点，相当于回溯法中的撤销选择
    path.pop();
  }
}
// @lc code=end

(() => {
  const graph = [[4, 3, 1], [3, 2, 4], [3], [4], []];
  console.log(allPathsSourceTarget(graph));
})();
