/*
 * @lc app=leetcode.cn id=406 lang=javascript
 *
 * [406] 根据身高重建队列
 *
 * https://leetcode-cn.com/problems/queue-reconstruction-by-height/description/
 *
 * algorithms
 * Medium (63.50%)
 * Likes:    278
 * Dislikes: 0
 * Total Accepted:    22.5K
 * Total Submissions: 35.2K
 * Testcase Example:  '[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]'
 *
 * 假设有打乱顺序的一群人站成一个队列。 每个人由一个整数对(h, k)表示，其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。
 * 编写一个算法来重建这个队列。
 *
 * 注意：
 * 总人数少于1100人。
 *
 * 示例
 *
 *
 * 输入:
 * [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
 *
 * 输出:
 * [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  people.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]));
  const res = [];
  people.forEach(ele => {
    res.splice(ele[1], 0, ele);
  });
  return res;
};
// @lc code=end

console.log(
  reconstructQueue([
    [7, 0],
    [4, 4],
    [7, 1],
    [5, 0],
    [6, 1],
    [5, 2]
  ])
);

// 这道题解法比较简单，关键是想到这个思路很难。题目需要将每个元素的第一个值height按从小到大排序，但要求元素的第二个值k表示该元素前所有height不小于当前height的元素的最小个数。
// 这里我们可以将数组先按height从大到小排序，若height相同，则按k从小到大排序。这样排序的目的是保证k的值一定不会大于当前的位置(如果题目有解)。这步操作便利了我们接下来的插入操作数组中间不至于存在空元素。
// 之后我们新建另一个数组res，遍历刚刚排序得到的数组，按K值插入到res中。因为height是从大到小排序，因此若遇到k相同的两个元素，后者的应该插入到前者之前。
