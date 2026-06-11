/*
 * @lc app=leetcode.cn id=234 lang=typescript
 *
 * [234] 回文链表
 *
 * https://leetcode.cn/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (58.16%)
 * Likes:    2273
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 2.2M
 * Testcase Example:  '[1,2,2,1]'
 *
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,2,1]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,2]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点数目在范围[1, 10^5] 内
 * 0 <= Node.val <= 9
 *
 *
 *
 *
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function isPalindrome(head: ListNode | null): boolean {
  // 找链表的中点
  function findMiddle(node: ListNode | null) {
    let l = node;
    let r = node;

    while (r !== null && r.next !== null) {
      l = l.next;
      r = r.next.next;
    }
    return l;
  }

  // 反转链表
  function reverse(node: ListNode | null) {
    let pre = null;
    let cur = node;
    while (cur !== null) {
      const temp = cur.next;
      cur.next = pre;

      pre = cur;
      cur = temp;
    }
    return pre;
  }

  const mid = findMiddle(head);
  let reverseHead = reverse(mid);

  while (reverseHead !== null) {
    if (head.val !== reverseHead.val) return false;

    head = head.next;
    reverseHead = reverseHead.next;
  }
  return true;
}

// @lc code=end

(() => {
  LCT.func(isPalindrome).cases([
    { input: List.deserialize([1, 2, 2, 1]), output: true },
    { input: List.deserialize([1, 2]), output: false },
    { input: List.deserialize([1, 2, 3, 2, 1]), output: true },
    { input: List.deserialize([1, 2, 3, 4, 5]), output: false },
    { input: List.deserialize([1, 2, 1]), output: true },
    { input: List.deserialize([1]), output: true }
  ]);
})();
