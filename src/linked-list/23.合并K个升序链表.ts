/*
 * @lc app=leetcode.cn id=23 lang=typescript
 *
 * [23] 合并 K 个升序链表
 *
 * https://leetcode.cn/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (58.69%)
 * Likes:    2723
 * Dislikes: 0
 * Total Accepted:    738K
 * Total Submissions: 1.3M
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 给你一个链表数组，每个链表都已经按升序排列。
 *
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 *
 *
 *
 * 示例 1：
 *
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
 * [
 * ⁠ 1->4->5,
 * ⁠ 1->3->4,
 * ⁠ 2->6
 * ]
 * 将它们合并到一个有序链表中得到。
 * 1->1->2->3->4->4->5->6
 *
 *
 * 示例 2：
 *
 * 输入：lists = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 * 输入：lists = [[]]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] 按 升序 排列
 * lists[i].length 的总和不超过 10^4
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const res = new ListNode();
  let pRes = res;

  let pList = lists.filter(l => l !== null);

  while (pList.length > 0) {
    let minIndex = 0;
    let minList = pList[minIndex];
    for (let i = 1; i < pList.length; i++) {
      if (minList.val > pList[i].val) {
        minList = pList[i];
        minIndex = i;
      }
    }

    pRes.next = minList;
    pRes = pRes.next;
    pList[minIndex] = pList[minIndex].next;
    pRes.next = null;

    pList = pList.filter(l => l !== null);
  }

  return res.next;
}
// @lc code=end

(() => {
  const lists = [
    [1, 4, 5],
    [1, 3, 4],
    [2, 6]
  ];
  const listNodes = lists.map(x => List.deserialize(x));
  console.log(List.serialize(mergeKLists(listNodes)));
})();
