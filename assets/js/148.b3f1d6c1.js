(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{542:function(t,s,a){"use strict";a.r(s);var n=a(56),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_75-颜色分类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_75-颜色分类"}},[t._v("#")]),t._v(" [75] 颜色分类")]),t._v(" "),a("blockquote",[a("p",[t._v("给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。")]),t._v(" "),a("p",[t._v("此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。")]),t._v(" "),a("p",[t._v("注意:")]),t._v(" "),a("p",[t._v("不能使用代码库中的排序函数来解决这道题。")]),t._v(" "),a("blockquote",[a("p",[t._v("示例:")]),t._v(" "),a("p",[t._v("输入: [2,0,2,1,1,0]")]),t._v(" "),a("p",[t._v("输出: [0,0,1,1,2,2]")])]),t._v(" "),a("p",[t._v("进阶：")]),t._v(" "),a("blockquote",[a("p",[t._v("一个直观的解决方案是使用计数排序的两趟扫描算法。")]),t._v(" "),a("p",[t._v("首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。")]),t._v(" "),a("p",[t._v("你能想出一个仅使用常数空间的一趟扫描算法吗？")])])]),t._v(" "),a("p",[t._v("这题最容易想到的就是写一个简单的排序算法解题。快排就是一个原地算法，最快能达到O(nlgn)的时间复杂度。")]),t._v(" "),a("p",[t._v("更符合要求的思路就如题干进阶示意，由于已知数组只有0、1、2三个元素，因此用一次遍历，使用一个map存储这三个元素的个数，之后第二次遍历的时候直接按0，1，2的个数和顺序一一赋值即可。")]),t._v(" "),a("p",[t._v("但题目要求我们只遍历一遍数组，因此考虑用首尾指针解题。")]),t._v(" "),a("p",[t._v("令首指针永远指向第一个1的位置，尾指针永远指向最后一个1的位置。这样在首尾指针之外的数据就一定是排好序的0和2了。")]),t._v(" "),a("p",[t._v("再令一个遍历指针在遍历过程中比对当前指向值与首尾指针指向值的关系。由于总共只有三个数的排序，因此遍历数组时，遇到0向左边指针交换，2向右边指针交换即可。因此在遍历过的数字中，首尾指针也符合永远指向第一个1的位置和永远指向最后一个1的位置。")]),t._v(" "),a("p",[t._v("这里面的核心思想跟快速排序有点像，都是首尾指针与目标位置交换。不过由于总共只有三个数，因此在一次循环内即可完成最终位置交换，不需要再分治左右子数组了。")]),t._v(" "),a("p",[t._v("需要注意的是遍历时，若当前指针与首指针交换后自己需要向前进位，而与尾指针交换后自己不能向前进位。")]),t._v(" "),a("p",[t._v("这是因为与尾指针交换后，不能确定交换过来的值是多少，因此还得等下一次判断；而因为当前指针是从首指针位置开始的，因此首指针指向的值一定已经被判断过了，因此可以直接进一位。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("sortColors")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("nums")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" p1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" p2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" cur "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" p1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cur "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" p2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cur"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cur"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cur"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("p1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("p1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      p1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      cur"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cur"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cur"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cur"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("p2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("p2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      p2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      cur"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=p.exports}}]);