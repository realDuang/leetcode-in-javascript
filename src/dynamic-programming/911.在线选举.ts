/*
 * @lc app=leetcode.cn id=911 lang=typescript
 *
 * [911] 在线选举
 *
 * https://leetcode.cn/problems/online-election/description/
 *
 * algorithms
 * Medium (54.13%)
 * Likes:    167
 * Dislikes: 0
 * Total Accepted:    34.5K
 * Total Submissions: 63.8K
 * Testcase Example:  '["TopVotedCandidate","q","q","q","q","q","q"]\n' +
  '[[[0,1,1,0,0,1,0],[0,5,10,15,20,25,30]],[3],[12],[25],[15],[24],[8]]'
 *
 * 给你两个整数数组 persons 和 times 。在选举中，第 i 张票是在时刻为 times[i] 时投给候选人 persons[i] 的。
 * 
 * 对于发生在时刻 t 的每个查询，需要找出在 t 时刻在选举中领先的候选人的编号。
 * 
 * 在 t 时刻投出的选票也将被计入我们的查询之中。在平局的情况下，最近获得投票的候选人将会获胜。
 * 
 * 实现 TopVotedCandidate 类：
 * 
 * 
 * TopVotedCandidate(int[] persons, int[] times) 使用 persons 和 times
 * 数组初始化对象。
 * int q(int t) 根据前面描述的规则，返回在时刻 t 在选举中领先的候选人的编号。
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["TopVotedCandidate", "q", "q", "q", "q", "q", "q"]
 * [[[0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]], [3], [12], [25], [15],
 * [24], [8]]
 * 输出：
 * [null, 0, 1, 1, 0, 0, 1]
 * 
 * 解释：
 * TopVotedCandidate topVotedCandidate = new TopVotedCandidate([0, 1, 1, 0, 0,
 * 1, 0], [0, 5, 10, 15, 20, 25, 30]);
 * topVotedCandidate.q(3); // 返回 0 ，在时刻 3 ，票数分布为 [0] ，编号为 0 的候选人领先。
 * topVotedCandidate.q(12); // 返回 1 ，在时刻 12 ，票数分布为 [0,1,1] ，编号为 1 的候选人领先。
 * topVotedCandidate.q(25); // 返回 1 ，在时刻 25 ，票数分布为 [0,1,1,0,0,1] ，编号为 1
 * 的候选人领先。（在平局的情况下，1 是最近获得投票的候选人）。
 * topVotedCandidate.q(15); // 返回 0
 * topVotedCandidate.q(24); // 返回 0
 * topVotedCandidate.q(8); // 返回 1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= persons.length <= 5000
 * times.length == persons.length
 * 0 <= persons[i] < persons.length
 * 0 <= times[i] <= 10^9
 * times 是一个严格递增的有序数组
 * times[0] <= t <= 10^9
 * 每个测试用例最多调用 10^4 次 q
 * 
 * 
 */

// @lc code=start
class TopVotedCandidate {
  public timeWin: [number, number][] = [];
  constructor(persons: number[], private times: number[]) {
    const board: Map<number, number> = new Map();
    let currMax = 0;
    for (let i = 0; i < persons.length; i++) {
      const cnt = board.get(persons[i]) ?? 0;
      board.set(persons[i], cnt + 1);

      if (board.get(persons[i]) >= currMax) {
        currMax = board.get(persons[i]);
        this.timeWin.push([times[i], persons[i]]);
      }
    }
  }

  q(t: number): number {
    let left = 0;
    let right = this.timeWin.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (this.timeWin[mid][0] <= t) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // 若当前时刻出现在所有票投票前，则直接返回 0
    return this.timeWin[right][0] <= t ? this.timeWin[right][1] : 0;
  }
}

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */
// @lc code=end

(() => {
  const persons = [0, 1, 1, 0, 0, 1, 0];
  const times = [0, 5, 10, 15, 20, 25, 30];

  const topVotedCandidate = new TopVotedCandidate(persons, times);
  console.log(topVotedCandidate.timeWin);
  console.log(topVotedCandidate.q(3));
  console.log(topVotedCandidate.q(12));
  console.log(topVotedCandidate.q(25));
  console.log(topVotedCandidate.q(15));
  console.log(topVotedCandidate.q(24));
  console.log(topVotedCandidate.q(8));
})();
