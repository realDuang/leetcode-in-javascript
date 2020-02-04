/*
 * @lc app=leetcode id=21 lang=javascript
 *
 * [21] Merge Two Sorted Lists
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
