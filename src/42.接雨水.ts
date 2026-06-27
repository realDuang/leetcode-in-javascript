/*
 * @lc app=leetcode.cn id=42 lang=typescript
 * @lcpr version=30403
 *
 * [42] 接雨水
 */

// @lc code=start
function trap(height: number[]): number {
  const stack: number[] = [];
  let res = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[stack[stack.length - 1]] < height[i]) {
      // 每一个被出栈的index都代表了可以存雨水的位置
      const index = stack.pop();
      // 出栈后栈顶元素为存水左边界，准备入单调栈的 i 为右边界，如果没有左边界自然不能存水
      if(stack.length === 0) continue;
      const left = stack[stack.length - 1];

      const h = Math.min(height[left], height[i]) - height[index];
      res += (i - left - 1) * h;
    }
    stack.push(i);
  }
  return res;
}
// @lc code=end

(() => {
  LCT.func(trap).cases([
    {
      input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
      output: 6
    }
  ]);
})();

/*
// @lcpr case=start
// [0,1,0,2,1,0,1,3,2,1,2,1]\n
// @lcpr case=end

// @lcpr case=start
// [4,2,0,3,2,5]\n
// @lcpr case=end

 */
