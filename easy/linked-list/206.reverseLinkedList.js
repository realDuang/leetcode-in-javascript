/*
 * @lc app=leetcode id=206 lang=javascript
 *
 * [206] Reverse Linked List
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
 * @return {ListNode}
 */
var reverseList = function(head) {
  let pre = null;
  let cur = head;
  while (cur) {
    const next = cur.next || null;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
// @lc code=end

function ListNode(val) {
  this.val = val;
  this.next = null;
}
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
const d = new ListNode(4);
const e = new ListNode(5);
a.next = b;
b.next = c;
c.next = d;
d.next = e;
console.log(reverseList(a));
