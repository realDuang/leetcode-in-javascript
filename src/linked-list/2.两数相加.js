/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (36.94%)
 * Likes:    4146
 * Dislikes: 0
 * Total Accepted:    379.8K
 * Total Submissions: 1M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 *
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 *
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 * 示例：
 *
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
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
