/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 *
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (49.34%)
 * Likes:    449
 * Dislikes: 0
 * Total Accepted:    69.8K
 * Total Submissions: 140K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
 *
 * 说明：不允许修改给定的链表。
 *
 *
 *
 * 示例 1：
 *
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：tail connects to node index 1
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 *
 *
 *
 *
 * 示例 2：
 *
 * 输入：head = [1,2], pos = 0
 * 输出：tail connects to node index 0
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 *
 *
 *
 *
 * 示例 3：
 *
 * 输入：head = [1], pos = -1
 * 输出：no cycle
 * 解释：链表中没有环。
 *
 *
 *
 *
 *
 *
 * 进阶：
 * 你是否可以不用额外空间解决此题？
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
var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
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
const f = new ListNode(6);
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = b;
console.log(detectCycle(a));

// 这道题跟`141.环形链表`太像了，唯一的区别就是该题已知存在环，然后要求出环起始的位置。

// 这道题如果用`141.环形链表`的方法一做起始是直接AC的，因为第一次找到的已标记的位置一定第一个被二次遍历到的位置，即环的起始位置。

// 那么问题的难点又在于不使用额外空间了。这里使用到的方法是，若快慢指针相遇了，则将慢指针移动到头结点，然后两指针以相同的速度遍历，再次相遇时的位置即为环的起始位置。

// 这个题的解法更偏向于数学思维一点，我们可以用数学来证明算法的正确性。

// 因为快指针走过的距离为慢指针的两倍，设慢指针走过的距离为a，则快指针走过的距离为2a，设环起点距离相遇点的距离为x，可得出起始点到环节点的距离为 `a - x`，快指针距离环起点的距离为 `2a - a - x`（比慢指针多走的距离减去环起点到相遇点的距离），是相等的。还是不理解的话其实只需要画个图就很清晰了。
