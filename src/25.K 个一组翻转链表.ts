/*
 * @lc app=leetcode.cn id=25 lang=typescript
 * @lcpr version=30403
 *
 * [25] K 个一组翻转链表
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

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let l = dummy;
  let r = l.next;
  while (r !== null) {
    let i = k;
    while (r !== null && i > 0) {
      r = r.next;
      i--;
    }
    // 当 i 没执行完时，说明剩余的链表长度不足 k，不翻转，退出
    if (i > 0) break;

    // 此时 l 表示要反转的 head 的前一个节点，r 表示右开区间边界，即反转链表外的下一个节点
    const newTail = l.next;
    const newHead = reverse(newTail, r);
    l.next = newHead;
    newTail.next = r;
    // 翻转后排序：l => newHead => 反转链表 => newTail => r

    // 重新设置好 l 和 r，进下一轮循环
    l = newTail;
    r = l.next;
  }
  return dummy.next;
}

function reverse(head: ListNode, tail: ListNode | null): ListNode | null {
  let cur = head;
  let prev = null;
  while (cur !== tail) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,4,5]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5]\n3\n
// @lcpr case=end

 */
