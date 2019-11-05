/*
 * @lc app=leetcode id=203 lang=javascript
 *
 * [203] Remove Linked List Elements
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  const dummy = {
    next: head
  };
  let cur = dummy;
  while (cur.next) {
    if (cur.next.val === val) {
      const newNext = cur.next.next || null;
      cur.next = newNext;
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
// @lc code=end

// 注意头结点也是可能被删去的节点，因此需要补充建立一个虚拟的dummy节点，next指向head
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(6);
const d = new ListNode(3);
const e = new ListNode(4);
const f = new ListNode(5);
const g = new ListNode(6);
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;
console.log(removeElements(a, 6));
