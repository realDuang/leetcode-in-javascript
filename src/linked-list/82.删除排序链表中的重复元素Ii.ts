/*
 * @lc app=leetcode.cn id=82 lang=typescript
 *
 * [82] 删除排序链表中的重复元素 II
 *
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/description/
 *
 * algorithms
 * Medium (53.18%)
 * Likes:    784
 * Dislikes: 0
 * Total Accepted:    210.2K
 * Total Submissions: 395.4K
 * Testcase Example:  '[1,2,3,3,4,4,5]'
 *
 * 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 没有重复出现 的数字。
 *
 * 返回同样按升序排列的结果链表。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,3,4,4,5]
 * 输出：[1,2,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,1,1,2,3]
 * 输出：[2,3]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点数目在范围 [0, 300] 内
 * -100
 * 题目数据保证链表已经按升序排列
 *
 *
 */
import { deserialize, serialize } from '../utils/list';

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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

function deleteDuplicates(head: ListNode | null): ListNode | null {
  // 如果链表长度小于等于1，则不可能有重复元素
  if (!head || !head.next) return head;

  let dummy = new ListNode();
  dummy.next = head;

  let prev = dummy;
  let curr = head;
  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      const sameValue = curr.val;
      // 如果有重复元素，则找出所有相同val的节点
      while (curr && curr.val === sameValue) {
        curr = curr.next;
      }
      // 删除之间的所有节点
      prev.next = curr;
    } else {
      // 否则，继续往下遍历
      prev = curr;
      curr = curr.next;
    }
  }
  return dummy.next;
}
// @lc code=end

(() => {
  const head = deserialize([1, 1, 1, 2, 3]);
  console.log(serialize(deleteDuplicates(head)));
})();
