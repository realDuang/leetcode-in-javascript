/*
 * @lc app=leetcode.cn id=117 lang=typescript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 *
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/description/
 *
 * algorithms
 * Medium (62.38%)
 * Likes:    497
 * Dislikes: 0
 * Total Accepted:    107K
 * Total Submissions: 171.4K
 * Testcase Example:  '[1,2,3,4,5,null,7]'
 *
 * 给定一个二叉树
 *
 *
 * struct Node {
 * ⁠ int val;
 * ⁠ Node *left;
 * ⁠ Node *right;
 * ⁠ Node *next;
 * }
 *
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 *
 * 初始状态下，所有 next 指针都被设置为 NULL。
 *
 *
 *
 * 进阶：
 *
 *
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 *
 *
 *
 *
 * 示例：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历顺序（由 next
 * 指针连接），'#' 表示每层的末尾。
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数小于 6000
 * -100
 *
 *
 *
 *
 *
 *
 *
 */
class Node {
  val: number;
  left: Node | null;
  right: Node | null;
  next: Node | null;
  constructor(val?: number, left?: Node, right?: Node, next?: Node) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}
import { deserialize } from '../utils/tree';

// @lc code=start
/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: Node | null): Node | null {
  if (root === null) return null;

  const queue: Node[] = [];
  queue.unshift(root);

  while (queue.length > 0) {
    let prev: Node | null = null;
    // 将当前队列中，即当前层级中所有节点做分析。
    // 注意，由于queue.length可能会变化，这里一定要锁死当前队列的length
    let count = queue.length;
    while (count) {
      const curr = queue.pop();

      // 此时curr表示prev的右侧节点，当prev节点指向节点时，将next节点指向curr
      if (prev) {
        prev.next = curr;
      }
      // 之后根据BFS顺序， prev 指针向右移动
      prev = curr;

      // 之后将节点的下一层节点入队列
      if (curr.left) {
        queue.unshift(curr.left);
      }
      if (curr.right) {
        queue.unshift(curr.right);
      }
      count--;
    }
  }
  return root;
}
// @lc code=end

(() => {
  const node4 = new Node(4);
  const node5 = new Node(5);
  const node7 = new Node(7);

  const node2 = new Node(2, node4, node5);
  const node3 = new Node(3, undefined, node7);

  const root = new Node(1, node2, node3);
  console.log(connect(root));
})();
