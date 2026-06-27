function minWindow(s: string, t: string): string {
  const hash: number[] = Array(60).fill(0);
  let res: string = '';
  for (let i = 0; i < t.length; i++) {
    const index = t.charCodeAt(i) - 65;
    hash[index] += 1;
  }

  const window: number[] = hash.map(x => x);
  let cnt = t.length;

  let l = 0;
  let r = 0;
  while (r < s.length) {
    const tempR = s.charCodeAt(r) - 65;
    if (hash[tempR]) {
      if (window[tempR] > 0) cnt--;
      window[tempR]--;
    }
    r++;

    while (cnt === 0) {
      const substr = s.substring(l, r);
      // 满足要求时
      if (res.length === 0 || substr.length < res.length) {
        res = substr;
      }

      // 缩小左窗口
      const tempL = s.charCodeAt(l) - 65;
      if (hash[tempL]) {
        window[tempL]++;
        if (window[tempL] > 0) cnt++;
      }
      l++;
    }
  }

  return res;
}

(() => {
  LCT.func(minWindow).cases([
    {
      input: ['ADOBECODEBANC', 'ABC'],
      output: 'BANC'
    },
    {
      input: ['a', 'a'],
      output: 'a'
    },
    {
      input: ['a', 'aa'],
      output: ''
    }
  ]);
})();
