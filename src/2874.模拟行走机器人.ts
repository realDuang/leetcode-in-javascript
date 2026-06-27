/*
 * @lc app=leetcode.cn id=874 lang=typescript
 * @lcpr version=30403
 *
 * [874] 模拟行走机器人
 */

// @lc code=start
function robotSim(commands: number[], obstacles: number[][]): number {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  let cur = 0;

  let spot = [0, 0];
  const obstaclesMap = new Set<string>(obstacles.map(o => `${o[0]},${o[1]}`));
  let res = 0;

  for (const command of commands) {
    if (command === -2) {
      cur = (cur + 3) % 4;
    } else if (command === -1) {
      cur = (cur + 1) % 4;
    } else {
      const dir = dirs[cur];
      let k = command;
      while (k--) {
        const next = [spot[0] + dir[0], spot[1] + dir[1]];
        if (obstaclesMap.has(`${next[0]},${next[1]}`)) {
          break;
        }
        spot = next;
      }
      res = Math.max(res, Math.pow(spot[0], 2) + Math.pow(spot[1], 2));
    }
  }

  return res;
}
// @lc code=end

/*
// @lcpr case=start
// [4,-1,3]\n[]\n
// @lcpr case=end

// @lcpr case=start
// [4,-1,4,-2,4]\n[[2,4]]\n
// @lcpr case=end

// @lcpr case=start
// [6,-1,-1,6]\n[[0,0]]\n
// @lcpr case=end

 */

(() => {
  LCT.func(robotSim).auto();
})();
