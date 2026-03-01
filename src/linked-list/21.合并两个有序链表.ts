/*
 * @lc app=leetcode.cn id=21 lang=typescript
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode.cn/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (66.19%)
 * Likes:    3389
 * Dislikes: 0
 * Total Accepted:    1.6M
 * Total Submissions: 2.4M
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 *
 *
 * 示例 2：
 *
 *
 * 输入：l1 = [], l2 = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 两个链表的节点数目范围是 [0, 50]
 * -100
 * l1 和 l2 均按 非递减顺序 排列
 *
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const res = new ListNode();
  let p1 = list1,
    p2 = list2,
    p3 = res;

  while (p1 !== null && p2 !== null) {
    const temp = new ListNode();
    if (p1.val > p2.val) {
      temp.val = p2.val;
      p2 = p2.next;
    } else {
      temp.val = p1.val;
      p1 = p1.next;
    }
    p3.next = temp;
    p3 = p3.next;
  }
  if (p1 !== null) {
    p3.next = p1;
  }
  if (p2 !== null) {
    p3.next = p2;
  }
  return res.next;
}
// @lc code=end

(() => {
  const l1 = List.deserialize([]);
  const l2 = List.deserialize([0]);
  console.log(List.serialize(mergeTwoLists(l1, l2)));
})();
