/*
 * @lc app=leetcode.cn id=97 lang=typescript
 *
 * [97] 交错字符串
 *
 * https://leetcode.cn/problems/interleaving-string/description/
 *
 * algorithms
 * Medium (45.03%)
 * Likes:    771
 * Dislikes: 0
 * Total Accepted:    98.4K
 * Total Submissions: 218.5K
 * Testcase Example:  '"aabcc"\n"dbbca"\n"aadbbcbcac"'
 *
 * 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
 * 
 * 两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：
 * 
 * 
 * s = s1 + s2 + ... + sn
 * t = t1 + t2 + ... + tm
 * |n - m| <= 1
 * 交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 +
 * ...
 * 
 * 
 * 注意：a + b 意味着字符串 a 和 b 连接。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 * 输出：false
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s1 = "", s2 = "", s3 = ""
 * 输出：true
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= s1.length, s2.length <= 100
 * 0 <= s3.length <= 200
 * s1、s2、和 s3 都由小写英文字母组成
 * 
 * 
 * 
 * 
 * 进阶：您能否仅使用 O(s2.length) 额外的内存空间来解决它?
 * 
 */

// @lc code=start
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const l1 = s1.length;
    const l2 = s2.length;
    const l3 = s3.length;

    if (l1 + l2 !== l3) return false;

    // fn(i, j) 表示 s1 的前 i 个字符和 s2 的前 j 个字符能否交错组成 s3 的前 i + j 个字符
    const dp = Array(l1 + 1).fill(0).map(() => Array(l2 + 1).fill(false));
    dp[0][0] = true;
    for (let i = 0; i <= l1; i++) {
        for (let j = 0; j <= l2; j++) {
            const k = i + j;
            if (i > 0) {
                // 若 s1 当前字符与 s3 的当前字符相同，且 s3 之前的字符能由 s1 与 s2 交错组成，则 s3 当前的字串也能由 s1 与 s2 交错组成
                dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1[i - 1] === s3[k - 1]);
            }
            if (j > 0) {
                // 若 s2 当前字符与 s3 的当前字符相同，且 s3 之前的字符能由 s1 与 s2 交错组成，则 s3 当前的字串也能由 s1 与 s2 交错组成
                dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2[j - 1] === s3[k - 1]);
            }
        }
    }
    return dp[l1][l2];
};
// @lc code=end

(() => {
    const s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
    console.log(isInterleave(s1, s2, s3));
})();