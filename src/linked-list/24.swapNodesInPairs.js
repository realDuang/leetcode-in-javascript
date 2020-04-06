/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
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
var swapPairs = function(head) {
  const dude = new ListNode(null);
  dude.next = head;
  let pre = dude;
  while (pre && pre.next && pre.next.next) {
    let cur = pre.next;
    let next = cur.next;
    pre.next = next;
    cur.next = next.next;
    next.next = cur;

    pre = cur;
    // console.log(dude.next);
  }
  return dude.next;
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
a.next = b;
b.next = c;
c.next = d;
console.log(a);
console.log(swapPairs(a));
