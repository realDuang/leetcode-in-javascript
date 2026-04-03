# Training Plan

> Auto-generated based on comprehensive test results from 2026-03-17

## Current Level Assessment

| Stage | Score | Status |
|-------|-------|--------|
| L1 Framework Recognition | 90% | ✅ Passed |
| L2 Template Application | 71% | ⚠️ Needs boundary detail practice |
| L3 Variant Recognition | 17% | ❌ Key weakness |
| L4 Multi-framework Combo | — | Not tested |
| L5 Optimization Selection | — | Not tested |
| L6 Interview Simulation | — | Not tested |

## Priority Training Queue

### Phase 1: DP Intensive (Week 1-2)

Focus: Build correct DP thinking — state definition, transition formula, initialization

#### Day 1-3: 1D DP Fundamentals
| Problem | Difficulty | Key Concept | Status |
|---------|------------|-------------|--------|
| [70. Climbing Stairs](../../src/dynamic-programming/) | Easy | Basic 1D DP | ⬜ |
| [198. House Robber](../../src/dynamic-programming/) | Medium | Non-adjacent selection | ⬜ |
| [300. Longest Increasing Subsequence](../../src/dynamic-programming/) | Medium | Subsequence DP state def | ⬜ |
| [53. Maximum Subarray](../../src/dynamic-programming/) | Medium | Subarray vs subsequence | ⬜ |

#### Day 4-6: 2D DP & Grid DP
| Problem | Difficulty | Key Concept | Status |
|---------|------------|-------------|--------|
| [62. Unique Paths](../../src/dynamic-programming/) | Medium | Basic grid DP | ⬜ |
| [64. Minimum Path Sum](../../src/dynamic-programming/) | Medium | Grid DP with values | ⬜ |
| [221. Maximal Square](../../src/dynamic-programming/) | Medium | Grid DP variant (the one you missed!) | ⬜ |
| [1143. Longest Common Subsequence](../../src/dynamic-programming/) | Medium | Two-sequence DP | ⬜ |

#### Day 7-10: DP vs BFS/DFS Discrimination
| Problem | Difficulty | Why DP not BFS? | Status |
|---------|------------|-----------------|--------|
| [121. Best Time to Buy and Sell Stock](../../src/dynamic-programming/) | Easy | "Maximum profit" → DP | ⬜ |
| [322. Coin Change](../../src/dynamic-programming/) | Medium | "Minimum count" → DP | ⬜ |
| [279. Perfect Squares](../../src/dynamic-programming/) | Medium | Looks like BFS, but DP works too | ⬜ |
| [139. Word Break](../../src/dynamic-programming/) | Medium | Looks like backtracking, actually DP | ⬜ |

### Phase 2: Template Precision (Week 2-3)

Focus: Fix boundary detail issues — open/closed intervals, variable scope

#### Sliding Window Precision ✅ (2026-03-23)
| Problem | Focus Point | Status |
|---------|-------------|--------|
| [3. Longest Substring Without Repeating Characters](../../src/sliding-window/) | Window length calculation | ✅ 2/4 |
| [76. Minimum Window Substring](../../src/sliding-window/) | Shrink timing + result update | ✅ 3/6 |
| [438. Find All Anagrams in a String](../../src/sliding-window/) | Fixed-length window variant | ✅ 4/4 🎉 |

#### Backtracking Precision ✅ (2026-03-24)
| Problem | Focus Point | Status |
|---------|-------------|--------|
| [46. Permutations](../../src/backtracking/) | path vs candidates clarity | ✅ 4/4 🎉 |
| [78. Subsets](../../src/backtracking/) | start index logic | ✅ 3/3 🎉 |
| [40. Combination Sum II](../../src/backtracking/) | Dedup + pruning | ✅ 3/4 (dedup missed) |

### Phase 3: Re-test L3 Variant Recognition (Week 3) ✅ GRADUATED

After Phase 1 & 2, retake Stage 3 test to verify improvement.

**Re-test #1 (2026-03-25): 70%** ⚠️ (up from 17%, target 80%)

| Problem | Result | Notes |
|---------|--------|-------|
| 416 Partition Equal Subset Sum | ❌ | 误判双指针，实为0/1背包 |
| 33 Rotated Sorted Array | ✅ | 二分识别正确 |
| 152 Max Product Subarray | ⚠️ | DP对，转移方程漏min追踪 |
| 56 Merge Intervals | ✅ | 排序+贪心 |
| 215 Kth Largest | ✅ | 小顶堆 |

**Re-test #2 (2026-03-27): 100%** 🎉 GRADUATED

| Problem | Result |
|---------|--------|
| 64 Minimum Path Sum | ✅ |
| 300 LIS | ✅ |
| 至少k个不同字符最长子串 | ✅ |
| 85 Maximal Rectangle | ✅ |
| 103 Zigzag Level Order | ✅ |

---

## Decision Framework Cheat Sheet

```
Grid/Matrix problem?
├── "Count connected regions" → BFS/DFS
├── "Shortest path" → BFS
├── "Maximum/minimum area/length" → likely DP
└── "Traverse all cells" → DFS/BFS

"Maximum/minimum/count" with choices?
├── Has overlapping subproblems? → DP
├── Need all solutions? → Backtracking
└── Greedy condition holds? → Greedy

Subsequence vs Subarray?
├── Subsequence (can skip elements) → dp[i] = best ending at i
└── Subarray (must be contiguous) → sliding window or dp[i] = best ending at i (contiguous)
```

---

## Training Rules

1. **Daily minimum:** 2 problems from the current phase
2. **Template practice:** Fill blanks, don't write from scratch
3. **Mistake journal:** Record every wrong answer and why
4. **Level up condition:** ≥ 80% accuracy on 10 consecutive problems
5. **If stuck:** Drop back one difficulty level, don't brute force

## Next Session Command

```
"继续DP专项训练" — Resume from where you left off
"复测第3层" — Re-test Stage 3 after completing Phase 1
```
