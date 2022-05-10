(window.webpackJsonp=window.webpackJsonp||[]).push([[181],{593:function(t,s,a){"use strict";a.r(s);var n=a(62),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"动态规划之-背包问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#动态规划之-背包问题"}},[t._v("#")]),t._v(" 动态规划之 -- 背包问题")]),t._v(" "),a("p",[t._v("背包问题是动态规划系列中经典的一类题型。它浓缩了动态规划最精髓的 "),a("code",[t._v("状态 + 选择")]),t._v(" 的特点。通过解决背包问题，能够帮助我们最直观的思考一个动态规划问题究竟是如何推导出来的。")]),t._v(" "),a("p",[t._v("背包问题大概可分为两类："),a("code",[t._v("0-1 背包问题")]),t._v(" 与 "),a("code",[t._v("完全背包问题")]),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"_0-1-背包问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_0-1-背包问题"}},[t._v("#")]),t._v(" 0-1 背包问题")]),t._v(" "),a("p",[t._v("0-1 背包问题的题型为：有 M 个物品，每样物品都有各自的价值 a 与体积 b，使用一个容积为 N 的背包，如何选择物品，将背包装满，且此时价值最大。")]),t._v(" "),a("p",[t._v("这种题型的特点在于，每样物品只有取和不取两种选择，不能取多次，也不能取一半。因此解题的关键为物品的取舍。")]),t._v(" "),a("p",[t._v("因此，此种情况下建立的 dp 表的大小为 dp[M+1][N+1]。通过遍历每个物品 i，以及当前的背包容量 j，获取当前可以装下的最大价值 dp[i][j]。最终返回结果 dp[M][N]。")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("M")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" dp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("M")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("N")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  初始化 base "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("M")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("N")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      dp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("max（选取 i 的结果， 不选取 i 的结果）\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ep: ")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// if (j < nums[i]) dp[i][j] = dp[i-1][j]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// else dp[i][j] = Math.max(dp[i-1][j - nums[i]] ,dp[i-1][j])")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" dp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("M")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("N")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("遍历框架确定了，剩余的又回到了动态规划的关键问题，确立 base 数值，并获取状态转移方程。在本题型中即为：选取 i 的结果与不选取 i 的结果。找出规律后填空即可。")]),t._v(" "),a("p",[t._v("题型参考：")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("[416] 分割等和子集")])]),t._v(" "),a("li",[a("code",[t._v("[474] 一和零")])]),t._v(" "),a("li",[a("code",[t._v("[494] 目标和")])]),t._v(" "),a("li",[a("code",[t._v("[879 盈利计划")])]),t._v(" "),a("li",[a("code",[t._v("[1049] 最后一块石头的重量 II")])]),t._v(" "),a("li",[a("code",[t._v("[1230] 抛掷硬币")])])]),t._v(" "),a("h2",{attrs:{id:"完全背包问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#完全背包问题"}},[t._v("#")]),t._v(" 完全背包问题")]),t._v(" "),a("p",[t._v("同样是有限的背包，有限种类的物品价值与重量，完全背包问题相比 0-1 背包问题，区别仅在于：每样物品的数量是无限的。")]),t._v(" "),a("p",[t._v("在解题思路与算法框架上仍然一致，围绕选择与状态来进行思考。")]),t._v(" "),a("p",[t._v("与 0-1 背包问题稍有不同的是，由于物品数量无限，通常选择该物品后的结果，往往是不需要基于上一个可选择物品做比对的。")]),t._v(" "),a("p",[t._v("例如：在 0-1 背包中选择状态所记录的值为 dp[i-1][j - nums[i]]，往往需要更改为 dp[i][j - nums[i]]。同时我们可以注意到，这样记录值通常与 dp[i] 是无关的，因此往往可以少建立一个维度的 dp 数组。")]),t._v(" "),a("p",[t._v("题型参考：")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("[322] 零钱兑换")])]),t._v(" "),a("li",[a("code",[t._v("[518] 零钱兑换 II")])]),t._v(" "),a("li",[a("code",[t._v("[1449] 数位成本和为目标值的最大数字")])]),t._v(" "),a("li",[a("code",[t._v("[279] 完全平方数")])])])])}),[],!1,null,null,null);s.default=p.exports}}]);