/*
 * @lc app=leetcode.cn id=752 lang=typescript
 *
 * [752] 打开转盘锁
 *
 * https://leetcode-cn.com/problems/open-the-lock/description/
 *
 * algorithms
 * Medium (53.06%)
 * Likes:    435
 * Dislikes: 0
 * Total Accepted:    77.7K
 * Total Submissions: 146.5K
 * Testcase Example:  '["0201","0101","0102","1212","2002"]\n"0202"'
 *
 * 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8',
 * '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 *
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 *
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 *
 * 字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
 * 输出：6
 * 解释：
 * 可能的移动序列为 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"。
 * 注意 "0000" -> "0001" -> "0002" -> "0102" -> "0202" 这样的序列是不能解锁的，
 * 因为当拨动到 "0102" 时这个锁就会被锁定。
 *
 *
 * 示例 2:
 *
 *
 * 输入: deadends = ["8888"], target = "0009"
 * 输出：1
 * 解释：
 * 把最后一位反向旋转一次即可 "0000" -> "0009"。
 *
 *
 * 示例 3:
 *
 *
 * 输入: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"],
 * target = "8888"
 * 输出：-1
 * 解释：
 * 无法旋转到目标数字且不被锁定。
 *
 *
 * 示例 4:
 *
 *
 * 输入: deadends = ["0000"], target = "8888"
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * deadends[i].length == 4
 * target.length == 4
 * target 不在 deadends 之中
 * target 和 deadends[i] 仅由若干位数字组成
 *
 *
 */

// @lc code=start
function openLock(deadends: string[], target: string): number {
  let res = 0;
  const hash: Record<string, number> = {};
  for (let i = 0; i < deadends.length; i++) {
    hash[deadends[i]] = 1;
  }
  // 若起点deadend了，则直接无解
  if(hash['0000']) return -1;

  const queue: string[] = ['0000'];
  hash['0000'] = 1;

  while (queue.length > 0) {
    let len = queue.length;
    while (len--) {
      const curr = queue.pop();
      if (curr === target) {
        return res;
      }
      for (let i = 0; i < 4; i++) {
        const upArr = curr.split('');
        upArr.splice(i, 1, up(curr[i]));
        const upString = upArr.join('');
        if (!hash[upString]) {
          hash[upString] = 1;
          queue.unshift(upString);
        }

        const downArr = curr.split('');
        downArr.splice(i, 1, down(curr[i]));
        const downString = downArr.join('');
        if (!hash[downString]) {
          hash[downString] = 1;
          queue.unshift(downString);
        }
      }
    }
    res += 1;
  }

  return -1;

  function up(ch: string): string {
    const num = Number(ch);
    if (num === 9) {
      return '0';
    } else {
      return String(num + 1);
    }
  }

  function down(ch: string): string {
    const num = Number(ch);
    if (num === 0) {
      return '9';
    } else {
      return String(num - 1);
    }
  }
}
// @lc code=end

(() => {
  const deadends = ['0201', '0101', '0102', '1212', '2002', '0000'],
    target = '0202';
  console.log(openLock(deadends, target));
})();
