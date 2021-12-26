/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
 *
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (55.38%)
 * Likes:    1294
 * Dislikes: 0
 * Total Accepted:    336K
 * Total Submissions: 605.9K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos
 * 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos
 * 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 *
 * 不允许修改 链表。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：返回索引为 1 的链表节点
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：head = [1,2], pos = 0
 * 输出：返回索引为 0 的链表节点
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 *
 *
 * 示例 3：
 *
 *
 *
 *
 * 输入：head = [1], pos = -1
 * 输出：返回 null
 * 解释：链表中没有环。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目范围在范围 [0, 10^4] 内
 * -10^5 <= Node.val <= 10^5
 * pos 的值为 -1 或者链表中的一个有效索引
 *
 *
 *
 *
 * 进阶：你是否可以使用 O(1) 空间解决此题？
 *
 */

import { deserialize } from '../utils/list';

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function detectCycle(head: ListNode | null): ListNode | null {
  let quick = head;
  let slow = head;
  while (quick && quick.next) {
    quick = quick.next.next;
    slow = slow.next;
    if (slow === quick) break;
  }
  // 若快慢指针不相遇，则说明无环
  if (slow !== quick) return null;

  // 设慢指针走过的距离为a，环起点距离相遇点的距离为x
  // 则：快指针走过的距离为2a，起始点到环起点的距离为 a - x
  // 可得：快指针此时距离环起点的距离为 (2a - a) - x（比慢指针多走的距离减去环起点到相遇点的距离） = a - x
  // 因此，起始点到环起点的距离一定等于快指针到环起点的距离，只需要步进a-x步，则快指针所在的位置即为环起点。
  slow = head;
  while (slow !== quick) {
    slow = slow.next;
    quick = quick.next;
  }
  // 相遇位置则为环起始位置
  return quick;
}
// @lc code=end

const head = deserialize([3, 2, 0, -4], 1);

console.log(detectCycle(head));
