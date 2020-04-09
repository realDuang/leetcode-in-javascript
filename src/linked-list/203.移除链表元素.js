/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 *
 * https://leetcode-cn.com/problems/remove-linked-list-elements/description/
 *
 * algorithms
 * Easy (44.68%)
 * Likes:    367
 * Dislikes: 0
 * Total Accepted:    69.3K
 * Total Submissions: 154.3K
 * Testcase Example:  '[1,2,6,3,4,5,6]\n6'
 *
 * 删除链表中等于给定值 val 的所有节点。
 *
 * 示例:
 *
 * 输入: 1->2->6->3->4->5->6, val = 6
 * 输出: 1->2->3->4->5
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
