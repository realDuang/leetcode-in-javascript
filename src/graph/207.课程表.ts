/*
 * @lc app=leetcode.cn id=207 lang=typescript
 *
 * [207] 课程表
 *
 * https://leetcode.cn/problems/course-schedule/description/
 *
 * algorithms
 * Medium (53.84%)
 * Likes:    1272
 * Dislikes: 0
 * Total Accepted:    210.1K
 * Total Submissions: 389.8K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
 *
 * 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi]
 * ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
 *
 *
 * 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
 *
 *
 * 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：true
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
 *
 * 示例 2：
 *
 *
 * 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
 * 输出：false
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * prerequisites[i].length == 2
 * 0 i, bi < numCourses
 * prerequisites[i] 中的所有课程对 互不相同
 *
 *
 */

// @lc code=start
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const visited: boolean[] = [];
  const onPath: boolean[] = [];

  const graph = buildGraph(numCourses, prerequisites);

  let hasCycle = false;
  // 从每个节点为起点，开始进行遍历，保证每一个节点都被遍历到
  for (let i = 0; i < numCourses; i++) {
    traverse(i);
  }

  return !hasCycle;

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
  const numCourses = 3,
    prerequisites = [
      [1, 0],
      [2, 0],
      [2, 1],
      [0, 1]
    ];
  console.log(canFinish(numCourses, prerequisites));
})();
