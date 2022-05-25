/*
 * @lc app=leetcode.cn id=210 lang=typescript
 *
 * [210] 课程表 II
 *
 * https://leetcode.cn/problems/course-schedule-ii/description/
 *
 * algorithms
 * Medium (55.57%)
 * Likes:    631
 * Dislikes: 0
 * Total Accepted:    128.4K
 * Total Submissions: 231K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中
 * prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。
 *
 *
 * 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
 *
 *
 * 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：[0,1]
 * 解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * 输出：[0,2,1,3]
 * 解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 * 因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 *
 * 示例 3：
 *
 *
 * 输入：numCourses = 1, prerequisites = []
 * 输出：[0]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * ai != bi
 * 所有[ai, bi] 互不相同
 *
 *
 */

// @lc code=start
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph = buildGraph(numCourses, prerequisites);

  const visited: boolean[] = [];
  const onPath: boolean[] = [];
  const res: number[] = [];

  let hasCycle = false;
  for (let i = 0; i < numCourses; i++) {
    traverse(i);
  }

  // 若图存在环，则不存在完成的可能
  if (hasCycle) return [];

  // 后序遍历的翻转结果即为图的拓扑排序
  return res.reverse();

  function traverse(index: number) {
    // 当前路径中的节点被再一次访问到了，说明出现了环
    if (onPath[index]) {
      hasCycle = true;
      // 已经发现环，则直接退出
      return;
    }

    // 若已经遍历过该节点，则剪枝
    if (visited[index]) {
      return;
    }

    // 做选择
    visited[index] = true;
    onPath[index] = true;
    // 递归遍历子节点
    for (const childIndex of graph[index]) {
      traverse(childIndex);
    }

    // 后序遍历位置
    res.push(index);

    // 撤销选择
    onPath[index] = false;
  }

  // 构造出邻接表
  function buildGraph(numCourses: number, prerequisites: number[][]) {
    const graph: Set<number>[] = Array(numCourses)
      .fill(0)
      .map(x => new Set());

    for (const edge of prerequisites) {
      const [to, from] = edge;
      // 构造一条 from 到 to 的有向边
      graph[from].add(to);
    }
    return graph;
  }
}
// @lc code=end

(() => {
  const numCourses = 2,
    prerequisites = [
      [0, 1],
      [1, 0]
    ];
  console.log(findOrder(numCourses, prerequisites));
})();
