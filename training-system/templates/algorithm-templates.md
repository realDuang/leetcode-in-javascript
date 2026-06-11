# 算法框架快速模板

> 拿来即用的代码框架，先套模板再优化细节

## 🎯 使用说明

1. **先识别题型**（参考框架识别训练）
2. **选择对应模板**（直接复制粘贴）
3. **填充业务逻辑**（根据题目要求修改）
4. **调试优化**（处理边界情况）

---

## 🪟 滑动窗口模板

### 固定长度滑动窗口

```javascript
function fixedSlidingWindow(nums, k) {
  let result = [];

  // 初始化第一个窗口
  for (let i = 0; i < k; i++) {
    // 处理窗口元素
  }
  // 记录第一个窗口结果

  // 滑动窗口
  for (let i = k; i < nums.length; i++) {
    // 移除窗口左边元素的影响
    // 添加窗口右边新元素的影响
    // 更新结果
  }

  return result;
}
```

### 动态长度滑动窗口

```javascript
function dynamicSlidingWindow(s, condition) {
  let left = 0,
    right = 0;
  let window = new Map(); // 或者用对象 {}
  let result = initResult;

  while (right < s.length) {
    // 扩展右边界
    let rightChar = s[right];
    right++;
    window.set(rightChar, (window.get(rightChar) || 0) + 1);

    // 判断是否需要收缩左边界
    while (满足收缩条件) {
      // 更新结果（在收缩前）
      updateResult();

      // 收缩左边界
      let leftChar = s[left];
      left++;
      window.set(leftChar, window.get(leftChar) - 1);
      if (window.get(leftChar) === 0) {
        window.delete(leftChar);
      }
    }
  }

  return result;
}
```

---

## 🎯 二分搜索模板

### 标准二分查找

```javascript
function binarySearch(nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // 未找到
}
```

### 搜索左边界

```javascript
function leftBound(nums, target) {
  let left = 0,
    right = nums.length;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left; // 或者检查越界后返回-1
}
```

### 搜索右边界

```javascript
function rightBound(nums, target) {
  let left = 0,
    right = nums.length;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left - 1; // 或者检查越界后返回-1
}
```

---

## 🔄 回溯模板

### 排列问题

```javascript
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    // 结束条件
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    // 选择列表
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // 剪枝

      // 做选择
      path.push(nums[i]);
      used[i] = true;

      // 递归
      backtrack(path);

      // 撤销选择
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
```

### 组合问题

```javascript
function combine(n, k) {
  const result = [];

  function backtrack(path, start) {
    // 结束条件
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    // 选择列表
    for (let i = start; i <= n; i++) {
      // 做选择
      path.push(i);

      // 递归
      backtrack(path, i + 1);

      // 撤销选择
      path.pop();
    }
  }

  backtrack([], 1);
  return result;
}
```

### 子集问题

```javascript
function subsets(nums) {
  const result = [];

  function backtrack(path, start) {
    // 前序遍历位置，每个节点都是一个子集
    result.push([...path]);

    // 选择列表
    for (let i = start; i < nums.length; i++) {
      // 做选择
      path.push(nums[i]);

      // 递归
      backtrack(path, i + 1);

      // 撤销选择
      path.pop();
    }
  }

  backtrack([], 0);
  return result;
}
```

---

## 🌊 DFS模板

### 网格DFS

```javascript
function dfs(grid, i, j) {
  // 越界检查
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
    return;
  }

  // 条件检查
  if (grid[i][j] !== '期望值') {
    return;
  }

  // 标记已访问
  grid[i][j] = '已访问标记';

  // 递归遍历四个方向
  dfs(grid, i + 1, j); // 下
  dfs(grid, i - 1, j); // 上
  dfs(grid, i, j + 1); // 右
  dfs(grid, i, j - 1); // 左
}

// 主函数
function solve(grid) {
  let result = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '目标值') {
        dfs(grid, i, j);
        result++; // 或其他处理
      }
    }
  }

  return result;
}
```

---

## 🚌 BFS模板

### 层序遍历BFS

```javascript
function bfs(start) {
  const queue = [start];
  const visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    const size = queue.length;

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const current = queue.shift();

      // 处理当前节点

      // 将下一层节点加入队列
      for (let next of getNextNodes(current)) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
  }
}
```

---

## 💎 动态规划模板

### 一维DP

```javascript
function dp1D(n) {
  // 定义dp数组
  const dp = new Array(n + 1);

  // 初始化base case
  dp[0] = baseValue;

  // 状态转移
  for (let i = 1; i <= n; i++) {
    dp[i] = 状态转移方程;
  }

  return dp[n];
}
```

### 二维DP

```javascript
function dp2D(m, n) {
  // 定义dp数组
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  // 初始化base case
  for (let i = 0; i <= m; i++) dp[i][0] = baseValue;
  for (let j = 0; j <= n; j++) dp[0][j] = baseValue;

  // 状态转移
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = 状态转移方程;
    }
  }

  return dp[m][n];
}
```

---

## 🎯 双指针模板

### 对撞指针

```javascript
function twoPointers(arr) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    if (满足条件) {
      // 处理结果
      left++;
      right--;
    } else if (需要移动左指针) {
      left++;
    } else {
      right--;
    }
  }
}
```

### 快慢指针

```javascript
function fastSlowPointers(head) {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // 检查条件（如环检测）
    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

---

## 🚀 使用技巧

1. **优先套模板**：不要从零开始写，直接改模板
2. **关键位置标注**：把需要修改的地方用注释标出
3. **边界条件检查**：模板处理一般情况，别忘了边界
4. **变量命名规范**：使用有意义的变量名
5. **逐步调试**：先保证框架正确，再优化细节

记住：**熟练使用模板是第一步，理解原理是第二步！**
