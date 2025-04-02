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
  // 建堆，构建一个大小为 k 的小顶堆
  const heap = buildMinHeap(nums, k);

  // 因为是小顶堆，因此堆顶就是第 k 大的元素
  return heap.peek();
}

function buildMinHeap(nums: number[], k: number) {
  const heap = new Heap(true);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // 如果堆还没填满，则直接堆进去
    if (i < k) {
      heap.push(num);
    } else {
      // 如果当前元素比堆顶(即最小值)还要小，则直接丢弃
      // 否则剔除掉当前的最小值(堆顶)，将当前值设为堆顶，并开始下沉
      if (heap.peek() < num) {
        heap.update(0, num);
        heap.heapifyDown();
      }
    }
  }
  return heap;
}

class Heap {
  private heap: number[];
  private isMinHeap: boolean;

  constructor(isMinHeap = true) {
    this.heap = [];
    this.isMinHeap = isMinHeap;
  }

  get size(): number {
    return this.heap.length;
  }

  push(val: number) {
    // 推入到堆尾部，并开始上浮
    this.heap.push(val);
    this.heapifyUp();
  }

  pop(): number {
    if (this.size <= 0) return null;

    // 记录堆顶值
    const top = this.peek();
    // 交换堆顶和堆尾，之后弹出堆尾元素(即原来的的堆顶)
    this.swap(0, this.heap.length - 1);
    this.heap.pop();

    // 做堆下沉操作
    this.heapifyDown();
    return top;
  }

  update(i: number, val: number) {
    this.heap[i] = val;
  }

  peek(): number {
    return this.heap[0];
  }

  // 堆上浮排序，从尾部插入的元素开始， 依次与父节点比较。
  // 如果小于(大于)父节点则交换，并递归计算直到根节点。
  heapifyUp() {
    const { heap, getParent } = this;
    let i = heap.length - 1;
    // 当前不为根节点，且当前元素小于(大于)父元素，则交换
    while (i > 0 && this.compare(heap[i], heap[getParent(i)])) {
      const parentIndex = getParent(i);
      this.swap(parentIndex, i);
      i = parentIndex;
    }
  }

  // 堆下沉排序，从根节点开始，与左右子节点比较。
  // 如果小于(大于)左右子节点中的任意一个，则交换那个较小(大)的子节点，并递归计算直到叶子节点停止。
  heapifyDown() {
    const { heap } = this;
    let i = 0;
    // 如果当前节点存在子节点（非叶子节点）
    while (i * 2 + 1 < heap.length) {
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      // 如果左右子节点都存在，则选择左右子节点中较小(大)的一个
      let child = left;
      if (right < heap.length && this.compare(heap[right], heap[left])) {
        child = right;
      }

      // 如果当前节点比左右子节点都小(大)，则表示完成堆化，退出
      if (this.compare(heap[i], heap[child])) {
        return;
      }

      // 交换并递归
      this.swap(i, child);
      i = child;
    }
  }

  private getParent(i: number) {
    return ((i - 1) / 2) | 0;
  }

  private compare(a: number, b: number): boolean {
    if (this.isMinHeap) {
      return a - b < 0;
    }
    return a - b > 0;
  }

  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// @lc code=end

(() => {
  console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
  console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
})();
