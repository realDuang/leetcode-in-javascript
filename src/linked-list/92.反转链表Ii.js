/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 *
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (49.50%)
 * Likes:    354
 * Dislikes: 0
 * Total Accepted:    46.5K
 * Total Submissions: 93.4K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 *
 * 说明:
 * 1 ≤ m ≤ n ≤ 链表长度。
 *
 * 示例:
 *
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  if (m === n) return head;
  const dummy = new ListNode(null);
  dummy.next = head;

  let beforeStart = dummy;
  let cnt = 1;
  while (cnt < m) {
    beforeStart = beforeStart.next;
    cnt++;
  }
  let end = beforeStart;
  while (cnt <= n) {
    end = end.next;
    cnt++;
  }
  const start = beforeStart.next;
  const afterEnd = end.next;

  let pre = start;
  let cur = pre.next;
  while (cur !== end) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  start.next = afterEnd;
  beforeStart.next = end;
  cur.next = pre;

  return dummy.next;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}
// @lc code=end

const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
const d = new ListNode(4);
const e = new ListNode(5);
const f = new ListNode(6);
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;

console.log(reverseBetween(a, 2, 5));

// 使用一趟扫描完成的操作，不用说第一时间就会想到双指针解题。
