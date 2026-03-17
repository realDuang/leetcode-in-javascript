# 框架实践突破计划

> 从"知道框架"到"熟练运用"的7天突破法

## 🎯 问题诊断

你现在的状态：
- ✅ 理论框架完整
- ✅ 题目解法正确
- ❌ 无法快速识别题型
- ❌ 框架套用不熟练
- ❌ 缺少肌肉记忆

## 📅 7天突破计划

### Day 1-2: 框架识别训练
**目标**：30秒内识别题型

**训练方法**：
1. 从每个专题选择3道最经典的题目
2. 只看题目描述，不看代码
3. 计时30秒，判断用什么框架
4. 记录错误，找出识别盲点

**训练材料**：
- 滑动窗口：76, 3, 438
- 二分搜索：704, 34, 153
- 回溯：78, 46, 39
- DFS：200, 695, 130
- DP：70, 322, 300

### Day 3-4: 框架套用训练
**目标**：5分钟内写出框架代码

**训练方法**：
1. 先写框架骨架，再填充细节
2. 不求最优，先求正确
3. 每个框架练习10-15道题

### Day 5-6: 变种识别训练
**目标**：处理框架变种

**训练方法**：
1. 混合不同框架的题目
2. 练习多框架组合问题
3. 处理边界情况

### Day 7: 综合测试
**目标**：模拟面试环境

## 🔧 框架速记卡片

### 滑动窗口
```javascript
// 固定长度滑动窗口
for (let i = 0; i < nums.length - k + 1; i++) {
    // 处理窗口 [i, i+k-1]
}

// 动态长度滑动窗口
let left = 0, right = 0;
while (right < s.length) {
    // 扩展右边界
    right++;
    // 判断是否需要收缩左边界
    while (needShrink()) {
        left++;
    }
}
```

### 二分搜索
```javascript
// 标准二分
let left = 0, right = nums.length - 1;
while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}

// 搜索边界
let left = 0, right = nums.length;
while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) right = mid;
    else left = mid + 1;
}
```

### 回溯
```javascript
function backtrack(path, choices) {
    if (满足结束条件) {
        result.push([...path]);
        return;
    }

    for (let choice of choices) {
        // 做选择
        path.push(choice);
        // 递归
        backtrack(path, newChoices);
        // 撤销选择
        path.pop();
    }
}
```

### DFS
```javascript
function dfs(grid, i, j) {
    if (越界 || 不符合条件) return;

    // 标记已访问
    grid[i][j] = 'visited';

    // 遍历四个方向
    dfs(grid, i+1, j);
    dfs(grid, i-1, j);
    dfs(grid, i, j+1);
    dfs(grid, i, j-1);
}
```

## 📊 练习追踪表

| 框架 | 识别准确率 | 套用熟练度 | 薄弱环节 | 改进计划 |
|------|------------|------------|----------|----------|
| 滑动窗口 | _/10 | _/10 | | |
| 二分搜索 | _/10 | _/10 | | |
| 回溯 | _/10 | _/10 | | |
| DFS | _/10 | _/10 | | |
| BFS | _/10 | _/10 | | |
| DP | _/10 | _/10 | | |

## ⚡ 实践技巧

1. **建立条件反射**：看到关键词立即想到框架
2. **先骨架后细节**：不要一开始就追求完美
3. **大量重复**：同一类型多练几道直到熟练
4. **限时训练**：给自己压力，提高反应速度
5. **总结优化**：每天练完都要总结改进

## 🎓 毕业标准

达到以下水平说明你突破了瓶颈：
- [ ] 30秒内准确识别题型 (90%以上)
- [ ] 5分钟内写出框架代码
- [ ] 能处理框架的常见变种
- [ ] 面对新题有清晰的解题思路

记住：**框架掌握 = 识别能力 + 套用熟练度**