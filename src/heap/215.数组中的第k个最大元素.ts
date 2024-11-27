/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (61.08%)
 * Likes:    2592
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2M
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 *
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: [3,2,1,5,6,4], k = 2
 * 输出: 5
 *
 *
 * 示例 2:
 *
 *
 * 输入: [3,2,3,1,2,4,5,5,6], k = 4
 * 输出: 4
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 */

// @lc code=start
function findKthLargest(nums: number[], k: number): number {
  // 建堆，构建一个大顶堆
  const heap = new Heap(false);
  for (const num of nums) {
    heap.push(num);
  }

  // 弹出前 k-1 大的元素
  for (let i = 0; i < k - 1; i++) {
    heap.pop();
  }

  // 堆顶就是第 k 大的元素
  return heap.peek();
}

class Heap {
  private heap: number[] = [];

  constructor(private isMinHeap = true) {}

  push(val: number) {
    this.heap.push(val);
    this.heapifyUp();
  }

  pop(): number {
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return top;
  }

  peek(): number {
    return this.heap[0];
  }

  // 堆上浮排序，从尾部插入的叶子节点开始，与父节点比较。
  // 如果小于(大于)父节点则交换，并递归计算直到根节点。
  // 如果大于(小于)等于父节点则停止，此时已经完成堆化。
  private heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (
        (this.isMinHeap && this.heap[index] >= this.heap[parentIndex]) ||
        (!this.isMinHeap && this.heap[index] <= this.heap[parentIndex])
      )
        break;

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // 堆下沉排序，从根节点开始，与左右子节点比较。
  // 如果小于(大于)左右子节点中的任意一个，则交换那个较小(大)的子节点，并递归计算直到叶子节点停止。
  // 如果大于(小于)等于左右子节点则停止，此时已完成堆化。
  private heapifyDown() {
    let index = 0;
    // 如果当前节点存在子节点（非叶子节点）
    while (index * 2 + 1 < this.heap.length) {
      let childL = index * 2 + 1;
      let childR = index * 2 + 2;
      let swapChildIndex = childL;
      // 如果左右子节点都存在，则选择左右子节点中较小(大)的一个
      if (childR < this.heap.length) {
        if (
          (this.isMinHeap && this.heap[childR] < this.heap[childL]) ||
          (!this.isMinHeap && this.heap[childR] > this.heap[childL])
        ) {
          swapChildIndex = childR;
        }
      }

      if (
        (this.isMinHeap && this.heap[index] <= this.heap[swapChildIndex]) ||
        (!this.isMinHeap && this.heap[index] >= this.heap[swapChildIndex])
      )
        break;

      this.swap(index, swapChildIndex);
      index = swapChildIndex;
    }
  }

  private swap(i: number, j: number) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

// @lc code=end

(() => {
  const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
  const k = 4;
  console.log(findKthLargest(nums, k));
})();
