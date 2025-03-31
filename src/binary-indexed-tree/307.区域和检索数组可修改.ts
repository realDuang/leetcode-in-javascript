/*
 * @lc app=leetcode.cn id=307 lang=typescript
 *
 * [307] 区域和检索 - 数组可修改
 *
 * https://leetcode.cn/problems/range-sum-query-mutable/description/
 *
 * algorithms
 * Medium (53.69%)
 * Likes:    763
 * Dislikes: 0
 * Total Accepted:    96.4K
 * Total Submissions: 178.8K
 * Testcase Example:  '["NumArray","sumRange","update","sumRange"]\n[[[1,3,5]],[0,2],[1,2],[0,2]]'
 *
 * 给你一个数组 nums ，请你完成两类查询。
 *
 *
 * 其中一类查询要求 更新 数组 nums 下标对应的值
 * 另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right
 *
 *
 * 实现 NumArray 类：
 *
 *
 * NumArray(int[] nums) 用整数数组 nums 初始化对象
 * void update(int index, int val) 将 nums[index] 的值 更新 为 val
 * int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含
 * ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：
 * ["NumArray", "sumRange", "update", "sumRange"]
 * [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
 * 输出：
 * [null, 9, null, 8]
 *
 * 解释：
 * NumArray numArray = new NumArray([1, 3, 5]);
 * numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
 * numArray.update(1, 2);   // nums = [1,2,5]
 * numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * -100 <= nums[i] <= 100
 * 0 <= index < nums.length
 * -100 <= val <= 100
 * 0 <= left <= right < nums.length
 * 调用 update 和 sumRange 方法次数不大于 3 * 10^4
 *
 *
 */

// @lc code=start
class NumArray {
  // 设 treeAns 为树状数组
  treeAns: number[];
  nums: number[];

  // O(n) 复杂度
  constructor(nums: number[]) {
    this.nums = nums;
    this.treeAns = Array(nums.length + 1).fill(0);
    for (let i = 1; i <= nums.length; i++) {
      this.treeAns[i] += nums[i - 1];
      // (i & -i) 是一个位运算，表示二进制表示的最后一个 1 所代表的值。例如：
      // 如果 i = 4（100），i & -i = 4。
      // 如果 i = 6（110），i & -i = 2。
      // i + (i & -i) 的作用是找到当前索引 i 的二进制线段树的下一个需要更新的索引。
      // 例如如果更新 num[5], 则除了更新 treeAns[5] 外，还需要更新 6
      const next = i + (i & -i);
      if (next <= nums.length) this.treeAns[next] += this.treeAns[i];
    }
    // 注意此时更新完后的 treeAns 并不是所有位置的正确前缀和，而只有第 2^n 位被完全更新正确了
    // console.log(this.treeAns);
  }

  // O(lgn) 复杂度
  update(index: number, val: number): void {
    const diff = val - this.nums[index];
    this.nums[index] = val;

    // 同理，每次只更新其后面 2^n 位置
    // 例如如果更新了 num[4], 则除了更新 treeAns[5] 外(index+1)，还需要更新 6, 8, 16... 的节点
    for (let i = index + 1; i < this.treeAns.length; i += i & -i) {
      this.treeAns[i] += diff;
    }
    // console.log(this.treeAns);
  }

  // 针对二进制线段树的前缀和算法
  // O(lgn) 复杂度
  prefixSum(index: number) {
    let res = 0;
    // 也是算 0～i 中的 2^n + i 位置的和
    // 例如如果 要计算 treeAns[5], 则为 treeAns[4]+treeAns[2]+treeAns[1]
    for (let i = index; i > 0; i -= i & -i) {
      res += this.treeAns[i];
    }
    return res;
  }

  sumRange(left: number, right: number): number {
    return this.prefixSum(right + 1) - this.prefixSum(left);
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
// @lc code=end

(() => {
  const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
  console.log(numArray.sumRange(0, 2)); // return 1 ((-2) + 0 + 3)
  console.log(numArray.sumRange(2, 5)); // return -1 (3 + (-5) + 2 + (-1))
  numArray.update(1, 2); // 此时数组为 [-2, 2, 3, -5, 2, -1]
  console.log(numArray.sumRange(0, 5)); // return -1 ((-2) + 2 + 3 + (-5) + 2 + (-1))
})();

// class NumArray {
//   // 设 numAns 为前缀和
//   numAns: number[];
//   nums: number[];
//   constructor(nums: number[]) {
//     this.nums = nums;
//     this.numAns = Array(nums.length + 1).fill(0);
//     for (let i = 0; i < nums.length; i++) {
//       this.numAns[i + 1] = this.numAns[i] + nums[i];
//     }
//     // console.log(this.numAns);
//   }

//   update(index: number, val: number): void {
//     const diff = val - this.nums[index];
//     this.nums[index] = val;

//     for (let i = index + 1; i < this.numAns.length; i++) {
//       this.numAns[i] += diff;
//     }
//     // console.log(this.numAns);
//   }

//   sumRange(left: number, right: number): number {
//     return this.numAns[right + 1] - this.numAns[left];
//   }
// }
