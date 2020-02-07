/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
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
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode(null);
  let cur = dummy;
  let carry = 0;
  while (l1 || l2) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    let answer = val1 + val2 + carry;
    carry = answer > 9 ? 1 : 0;
    cur.next = new ListNode(answer % 10);
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
    cur = cur.next;
  }

  if (carry === 1) cur.next = new ListNode(1);
  return dummy.next;
};
// @lc code=end

function ListNode(val) {
  this.val = val;
  this.next = null;
}

const a = new ListNode(2);
const b = new ListNode(4);
const c = new ListNode(3);
const d = new ListNode(5);
const e = new ListNode(6);
const f = new ListNode(4);
a.next = b;
b.next = c;
d.next = e;
e.next = f;
console.log(a, d);
console.log(addTwoNumbers(a, d));
