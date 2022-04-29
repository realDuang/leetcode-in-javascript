(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{537:function(t,s,a){"use strict";a.r(s);var n=a(56),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"二叉树遍历算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二叉树遍历算法"}},[t._v("#")]),t._v(" 二叉树遍历算法")]),t._v(" "),a("p",[t._v("这一篇是二叉树的遍历算法。")]),t._v(" "),a("p",[t._v("该算法可以拓展为多叉树算法，这是广度优先搜索与深度优先搜索的基础，而树算法也是图算法的基础。可以说，二叉树算法是所有算法的基础。所以，理解与掌握这一篇十分重要。")]),t._v(" "),a("h2",{attrs:{id:"二叉树的遍历方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二叉树的遍历方式"}},[t._v("#")]),t._v(" 二叉树的遍历方式")]),t._v(" "),a("p",[t._v("我们知道，二叉树的遍历方式一共有前中后序三种。但他们之间的区别是什么，以及是如何划分的呢？")]),t._v(" "),a("p",[t._v("实际上，划分的依据只有一句话，就是每经过一个节点时，需要在什么"),a("strong",[t._v("时机")]),t._v("进行运算与数据的输出。")]),t._v(" "),a("p",[t._v("所谓前序遍历，即指在某个节点，进入左右子节点之前，进行运算与输出数据。而中序指的是在遍历左子树完成后，在准备遍历右子树之前，进行运算与输出数据。同样的，后序遍历即在左右子树都遍历完成后，再进行计算与输出。")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("traverse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" TreeNode "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理 base case，结束递归")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此处进行前序遍历")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("traverse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此处进行中序遍历")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("traverse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("right"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此处进行后序遍历")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"如何选择合适的遍历方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何选择合适的遍历方式"}},[t._v("#")]),t._v(" 如何选择合适的遍历方式")]),t._v(" "),a("p",[t._v("由前面的介绍我们可以知道，合适的遍历方式即指在合适的时机处理数据。")]),t._v(" "),a("h3",{attrs:{id:"无要求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#无要求"}},[t._v("#")]),t._v(" 无要求")]),t._v(" "),a("p",[t._v("如果题目的需求不在乎合适的时机，每个节点的数据处理都只关心自己节点的信息。")]),t._v(" "),a("p",[t._v("例如：求二叉树中，节点值为 1 的节点信息，那么无论前中后序遍历选用哪一种，自然都是可行的。")]),t._v(" "),a("h3",{attrs:{id:"要求前置节点信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#要求前置节点信息"}},[t._v("#")]),t._v(" 要求前置节点信息")]),t._v(" "),a("p",[t._v("如果题目只需要知道进入当前节点时，当前节点与之前遍历过的节点的信息，那么三种遍历顺序也都是可行的。")]),t._v(" "),a("p",[t._v("因为在进入节点之前，上层的信息就已经可以获取到了。但通常来说，前序遍历是最为方便的选择。")]),t._v(" "),a("p",[t._v("例如：求二叉树中，路径上节点值之和的最大值。我们只需要定义一个全局变量，每经过一个节点时，将之前的和加上当前节点值与最大值比较即可。接着将新和递归传递给下一个子节点。")]),t._v(" "),a("h3",{attrs:{id:"要求子树节点信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#要求子树节点信息"}},[t._v("#")]),t._v(" 要求子树节点信息")]),t._v(" "),a("p",[t._v("如果题目要求，当前的运算必须依赖其子节点的结果，此时就只有后序遍历可以胜任了。")]),t._v(" "),a("p",[t._v("因为只有后序遍历的数据处理时机能拿到左右子树运算完成后的结果，此时才能对数据进行处理。")]),t._v(" "),a("p",[t._v("还是刚刚的问题，求路径上节点值和的最大值。我们可以换一个思路。不借助全局变量，如果每一个节点都能拿到左子树与右子树的路径值的和，那么去左右子树和的最大值加上当前节点值，即为当前节点下的最大值。那么只需要输出根节点的结果即可完成题目。")]),t._v(" "),a("p",[t._v("所以，哪怕对于同一个题目，看待题目的思路不同，解法也可以不同。")]),t._v(" "),a("p",[t._v("中序遍历的要求同理，如果有题目要求只需要知道左子树的信息来做运算，此时可以选择中序遍历。在此就不举例说明了。")]),t._v(" "),a("p",[t._v("题型参考：")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("[104] 二叉树的最大深度")])]),t._v(" "),a("li",[a("code",[t._v("[543] 二叉树的直径")])]),t._v(" "),a("li",[a("code",[t._v("[105] 从前序与中序遍历序列构造二叉树")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);