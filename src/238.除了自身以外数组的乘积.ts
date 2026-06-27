function productExceptSelf(nums: number[]): number[] {
  const len = nums.length;

  // 先把后缀和算出来
  const res: number[] = Array(len).fill(1);
  for (let i = len - 2; i >= 0; i--) {
    res[i] = res[i + 1] * nums[i + 1];
  }
  // 暂存前缀和
  let prefix = 1;
  for (let i = 1; i < len; i++) {
    prefix *= nums[i - 1];
    res[i] *= prefix;
  }
  return res;
}

(() => {
  LCT.func(productExceptSelf).cases([{ input: [[1, 2, 3, 4]], output: [24, 12, 8, 6] }]);
})();
