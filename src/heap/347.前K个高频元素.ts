/*
 * @lc app=leetcode.cn id=347 lang=typescript
 *
 * [347] 前 K 个高频元素
 *
 * https://leetcode.cn/problems/top-k-frequent-elements/description/
 *
 * algorithms
 * Medium (64.65%)
 * Likes:    1991
 * Dislikes: 0
 * Total Accepted:    699.2K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,1,1,2,2,3]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1], k = 1
 * 输出: [1]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * k 的取值范围是 [1, 数组中不相同的元素的个数]
 * 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
 *
 *
 *
 *
 * 进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
 *
 */

// @lc code=start
function topKFrequent(nums: number[], k: number): number[] {
  const hash: Record<string, number> = {};
  let maxFreq = 0;
  for (const num of nums) {
    hash[num] = hash[num] ? hash[num] + 1 : 1;
    maxFreq = Math.max(maxFreq, hash[num]);
  }

  const barrel = Array(maxFreq + 1);
  for (const [key, value] of Object.entries(hash)) {
    if (!barrel[value]) {
      barrel[value] = [Number(key)];
    } else {
      barrel[value].push(Number(key));
    }
  }

  const res: number[] = [];
  // 倒序遍历频率桶
  // 由于答案唯一，所以对于每一个频率的所有值，要么不取要么全取
  for (let i = barrel.length - 1; i >= 0 && res.length < k; i--) {
    if (barrel[i]) {
      res.push(...barrel[i]);
    }
  }

  return res;
}

// @lc code=end

(() => {
  console.log(topKFrequent([3, 1, 1, 1, 2, 2], 2));
  console.log(topKFrequent([1, 2], 2));
})();
