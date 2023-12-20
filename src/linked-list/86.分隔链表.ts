/*
 * @lc app=leetcode.cn id=86 lang=typescript
 *
 * [86] 分隔链表
 *
 * https://leetcode.cn/problems/partition-list/description/
 *
 * algorithms
 * Medium (64.39%)
 * Likes:    799
 * Dislikes: 0
 * Total Accepted:    249.7K
 * Total Submissions: 387.6K
 * Testcase Example:  '[1,4,3,2,5,2]\n3'
 *
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 *
 * 你应当 保留 两个分区中每个节点的初始相对位置。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,4,3,2,5,2], x = 3
 * 输出：[1,2,2,4,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [2,1], x = 2
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 200] 内
 * -100
 * -200
 *
 *
 */
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

function partition(head: ListNode | null, x: number): ListNode | null {
  const l1 = new ListNode();
  const l2 = new ListNode();

  let p1 = l1,
    p2 = l2,
    p = head;
  while (p) {
    if (p.val >= x) {
      p2.next = new ListNode(p.val);
      p2 = p2.next;
    } else {
      p1.next = new ListNode(p.val);
      p1 = p1.next;
    }
    p = p.next;
  }
  p1.next = l2.next;
  return l1.next;
}
// @lc code=end

import { serialize, deserialize } from '../utils/list';
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const head = deserialize([1, 4, 3, 2, 5, 2]);
const x = 3;
console.log(serialize(partition(head, x)));
