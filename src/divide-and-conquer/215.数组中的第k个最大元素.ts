/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (64.72%)
 * Likes:    1686
 * Dislikes: 0
 * Total Accepted:    636.6K
 * Total Submissions: 983.5K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 *
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 *
 *
 * 示例 2:
 *
 *
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10^4
 *
 *
 */

// @lc code=start
function findKthLargest(nums: number[], k: number): number {
  // 快速排序
  function partition(left: number, right: number): number {
    const pivot = nums[left];
    let i = left + 1;
    let j = right;
    while (i <= j) {
      while (i <= right && nums[i] <= pivot) i++;
      while (j > left && nums[j] >= pivot) j--;
      if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    [nums[left], nums[j]] = [nums[j], nums[left]];
    return j;
  }

  // 快速选择法，其实就是快速排序，但只取一侧排序
  function quickSelect(left: number, right: number): number {
    if (left >= right) return nums[left];
    const index = partition(left, right);

    // index 位置所在的值已经是排好序的了，是第 index 小的数，目标是找到第 nums.length - k 小的数（即第k大的数）
    // 当前有序的数的位置如果在左侧，则从右侧找target位置上的数，反之从左侧找，知道找到位置
    const target = nums.length - k;
    if (index < target) {
      return quickSelect(index + 1, right);
    } else if (index > target) {
      return quickSelect(left, index - 1);
    }
    return nums[target];
  }

  return quickSelect(0, nums.length - 1);
}
// @lc code=end

(() => {
  LCT.func(findKthLargest).cases([
    {
      input: [[3, 2, 1, 5, 6, 4], 2],
      output: 5
    },
    {
      input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
      output: 4
    },
        {
      input: [[1], 1],
      output: 1
    }
  ]);
})();

// 归并排序法
// function findKthLargest(nums: number[], k: number): number {
//   sort(0, nums.length - 1);
//   return nums[k - 1];

//   function sort(left: number, right: number) {
//     if (left >= right) return;

//     const mid = Math.floor((left + right) / 2);
//     sort(left, mid);
//     sort(mid + 1, right);
//     merge(left, mid, right);
//   }

//   function merge(left: number, mid: number, right: number) {
//     const temp = [];
//     let l = left;
//     let r = mid + 1;
//     while (l < mid + 1 || r < right + 1) {
//       if (l === mid + 1) {
//         temp.push(nums[r]);
//         r += 1;
//       } else if (r === right + 1) {
//         temp.push(nums[l]);
//         l += 1;
//       } else if (nums[l] > nums[r]) {
//         temp.push(nums[l]);
//         l += 1;
//       } else {
//         temp.push(nums[r]);
//         r += 1;
//       }
//     }
//     for (let i = left; i <= right; i++) {
//       nums[i] = temp[i - left];
//     }
//   }
// }

// 堆排序法
// function findKthLargest(nums: number[], k: number): number {
//   const len = nums.length;
//   sort(true);

//   console.log(nums);
//   return nums[k - 1];

//   // 数组递增排序或递减排序
//   function sort(increase: boolean) {
//     const isHeapMin = !increase;
//     // 先将数组构建为大顶堆，最大值将会在堆顶
//     buildHeap(isHeapMin);
//     // 接下来仅需要每次丢弃并输出堆顶元素即可保证有序
//     // 原地排序的具体做法是，遍历数组，每次将最大值交换到堆底并重新堆化前 n-1 个元素
//     // 从而最终实现数组从小到大的排列
//     for (let i = len - 1; i > 0; i--) {
//       // 将堆顶元素移到堆尾
//       swap(0, i);
//       // 堆化前 i-1 个元素
//       heapify(0, i, isHeapMin);
//     }
//   }

//   // 对数组建立二叉堆，从倒数第一个非叶子节点开始堆化
//   function buildHeap(isHeapMin: boolean) {
//     const notLeafIndex = Math.floor(len / 2) - 1;
//     for (let i = notLeafIndex; i >= 0; i--) {
//       heapify(i, len, isHeapMin);
//     }
//   }

//   // 将当前节点作为根节点的子树进行堆化
//   function heapify(root: number, heapSize: number, isHeapMin: boolean) {
//     let temp = root;
//     // 左右子位置
//     const l = root * 2 + 1;
//     const r = l + 1;
//     // 判断当前节点与左右子节点哪一个是最小(大)的
//     if (l < heapSize) {
//       if (isHeapMin ? nums[l] < nums[temp] : nums[l] > nums[temp]) {
//         temp = l;
//       }
//     }
//     if (r < heapSize) {
//       if (isHeapMin ? nums[r] < nums[temp] : nums[r] > nums[temp]) {
//         temp = r;
//       }
//     }

//     // 若当前节点值比两个子节点的值都小(大)，则不交换，下沉停止
//     // 否则进行交换，并递归继续下一次下沉比较
//     if (temp !== root) {
//       swap(root, temp);
//       heapify(temp, heapSize, isHeapMin);
//     }
//   }

//   function swap(i: number, j: number) {
//     const temp = nums[i];
//     nums[i] = nums[j];
//     nums[j] = temp;
//   }
// }
