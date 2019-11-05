/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input array is sorted
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  const size = numbers.length;
  let lp = 0;
  let rp = size - 1;
  while (lp < rp) {
    if (numbers[lp] + numbers[rp] === target) {
      return [lp + 1, rp + 1];
    } else if (numbers[lp] + numbers[rp] < target) {
      lp++;
    } else {
      rp--;
    }
  }
  return [];
};
// @lc code=end

// 由于数组已经排好序，因此利用头尾指针能在O(n)的时间内解决该题，比结果大前移大数指针位置，比结果小后移小数指针位置
console.log(twoSum([2, 7, 11, 15], 9));
