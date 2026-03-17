/*
 * @lc app=leetcode.cn id=703 lang=typescript
 *
 * [703] 数据流中的第 K 大元素
 *
 * https://leetcode.cn/problems/kth-largest-element-in-a-stream/description/
 *
 * algorithms
 * Easy (53.41%)
 * Likes:    524
 * Dislikes: 0
 * Total Accepted:    117K
 * Total Submissions: 219K
 * Testcase Example:  '["KthLargest","add","add","add","add","add"]\n' +
  '[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]'
 *
 * 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
 * 
 * 请实现 KthLargest 类：
 * 
 * 
 * KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
 * int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * ["KthLargest", "add", "add", "add", "add", "add"]
 * [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * 
 * 输出：[null, 4, 5, 5, 8, 8]
 * 
 * 解释：
 * 
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3); // 返回 4
 * kthLargest.add(5); // 返回 5
 * kthLargest.add(10); // 返回 5
 * kthLargest.add(9); // 返回 8
 * kthLargest.add(4); // 返回 8
 * 
 * 
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：
 * ["KthLargest", "add", "add", "add", "add"]
 * [[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]
 * 
 * 输出：[null, 7, 7, 7, 8]
 * 
 * 解释：
 * KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
 * kthLargest.add(2); // 返回 7
 * kthLargest.add(10); // 返回 7
 * kthLargest.add(9); // 返回 7
 * kthLargest.add(9); // 返回 8
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= nums.length <= 10^4
 * 1 <= k <= nums.length + 1
 * -10^4 <= nums[i] <= 10^4
 * -10^4 <= val <= 10^4
 * 最多调用 add 方法 10^4 次
 * 
 * 
 */

// @lc code=start
class KthLargest {
  private k: number;
  // 永远维护一个长度为 k 的小顶堆，这样堆顶就是第 k 大的数。
  private heap: number[] = [];
  constructor(k: number, nums: number[]) {
    this.k = k;
    // 建堆
    for (let i = 0; i < nums.length; i++) {
      this.add(nums[i]);
    }
  }

  add(val: number): number {
    // 如果堆还没满，直接push，然后从尾部上浮建堆
    if (this.heap.length < this.k) {
      this.heap.push(val);
      this.heapifyUp(this.heap.length - 1);
    } else if (val > this.heap[0]) {
      // 如果堆满了，且此时加入的值比最小值（即小堆顶）要大，则剔除最小值，替换加入值，并下沉
      this.heap[0] = val;
      this.heapifyDown(0, this.heap.length);
    }
    // 返回堆顶值，即为第k大
    return this.heap[0];
  }

  private heapifyDown(i: number, heapSize: number) {
    while (true) {
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      let min = i;

      if (left < heapSize && this.heap[left] < this.heap[min]) min = left;
      if (right < heapSize && this.heap[right] < this.heap[min]) min = right;

      if (min === i) break;

      [this.heap[i], this.heap[min]] = [this.heap[min], this.heap[i]];
      i = min;
    }
  }

  private heapifyUp(i: number) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent] <= this.heap[i]) break;

      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end

(() => {
  LCT.cls(KthLargest).auto();
})();
