/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 *
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (64.92%)
 * Likes:    457
 * Dislikes: 0
 * Total Accepted:    89.7K
 * Total Submissions: 137.9K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
 *
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 *
 *
 * 示例:
 *
 * 给定 1->2->3->4, 你应该返回 2->1->4->3.
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
