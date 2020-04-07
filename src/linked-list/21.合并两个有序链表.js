/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (60.53%)
 * Likes:    935
 * Dislikes: 0
 * Total Accepted:    222.3K
 * Total Submissions: 365.5K
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 示例：
 *
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 *
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  const dummy = new ListNode();
  let cur = dummy;
  while (l1 && l2) {
    const node = new ListNode();
    if (l1.val < l2.val) {
      node.val = l1.val;
      l1 = l1.next;
    } else {
      node.val = l2.val;
      l2 = l2.next;
    }
    cur.next = node;
    cur = cur.next;
  }
  if (l1) {
    cur.next = l1;
  }
  if (l2) {
    cur.next = l2;
  }
  return dummy.next;
};
// @lc code=end

function ListNode(val) {
  this.val = val;
  this.next = null;
}
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(4);
a.next = b;
b.next = c;

const d = new ListNode(1);
const e = new ListNode(3);
const f = new ListNode(4);
d.next = e;
e.next = f;

console.log(mergeTwoLists(a, d));
