/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (38.13%)
 * Likes:    796
 * Dislikes: 0
 * Total Accepted:    158K
 * Total Submissions: 411.7K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 *
 * 示例：
 *
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 *
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 *
 *
 * 说明：
 *
 * 给定的 n 保证是有效的。
 *
 * 进阶：
 *
 * 你能尝试使用一趟扫描实现吗？
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  const nude = new ListNode(null);
  nude.next = head;

  let slow = nude;
  let fast = nude;

  while (n--) {
    fast = fast.next;
  }

  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;

  return nude.next;
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
console.log(removeNthFromEnd(a, 5));

// 这道题用正常思维很好解决，链表最大的问题就是不知道链表长度，那么只需要一次遍历并计数即可获取，然后在第二次遍历是寻找第length - n个节点即可得到倒数第k个节点了。

// 题目要求一次遍历搞定，那又要祭出我们的快慢指针大法了，先让快指针走n - 1步，然后慢指针和快指针一同前进，当快指针遍历到末尾了自然慢指针就走到了length - n的位置了。

// 注意加上一个虚头结点再开始遍历，防止删除的元素为头结点。
