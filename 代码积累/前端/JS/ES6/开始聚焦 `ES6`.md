# ES6（基础）

<script>
window.onload = function() {
	document.querySelector('.pack-up-toc').onclick = function() {
		if (this.nextSibling.className.indexOf('box-hide') > -1) { //* 隐藏时
			document.querySelector('.md-toc').classList.value = 'md-toc'; //* 显示
			document.querySelector('.pack-up-toc-icon').style.transform = 'rotate(0)';
		} else {
			document.querySelector('.md-toc').classList.value += ' box-hide';
			document.querySelector('.pack-up-toc-icon').style.transform = 'rotate(-90deg)';
		}
	}
}
</script>

<style>
/*返回顶部*/
.go-top {text-decoration: none;}
.go-top {
	position: fixed;
	right: 5px;
	bottom: 20px;
    width: 32px;
    height: 32px;
    -webkit-box-shadow: 0 2px 6px rgb(0 0 0 / 15%);
    box-shadow: 0 2px 6px rgb(0 0 0 / 15%);
	background-color: #fff;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	color: #ccc;
	cursor: pointer;
}
.go-top:hover {color: #999}
.go-top span {cursor: pointer;}
.go-top a, .go-top a:hover, .go-top a:active {color: #ccc;}
/*隐藏盒子*/
.box-hide {display: none !important;}
/*收起菜单*/
.pack-up-toc {cursor: pointer; padding: 0 15px;}
.pack-up-toc-icon {font-size: 18px; font-weight: 700; transition: all ease-in-out .3s; display: inline-block; padding: 0 15px;}
/*字体颜色*/
.c-orange {color: rgba(255,165,0,1);}
.c-red {color:  #e54d42}
.c-green{color: #00bfad}
.c-blue{color: rgba(15,136,235,1)}
.c-grey{color: #8799a3}
/* 目录序号 */
.toc ol { counter-reset: item; list-style: none; }
.toc li:before { counter-increment: item; content: counters(item, ".", lower-roman) " "; }
</style>

<a href="#es6基础）" class="go-top"> ↑ </a>

<div class="pack-up-toc c-blue"><span class="pack-up-toc-icon">↓</span>收起菜单</div>

[TOC]

## 前言

> 文章学习自掘金用户@雪月的 [【ES6系列】 90% 的前端都会使用 ES6 来简化代码，你都用过吗？](https://juejin.cn/post/6960868793140641799?utm_source=gold_browser_extension#heading-2) ，照例先感谢大佬分享！

> 介绍 ECMAScript
---
最初的 `JavaScript` 语言有2份标准：
`ECMA-262`：主标准，由 ECMA 国际组织（Ecma International）负责管理（为了让最初的 `JavaScript` 与最初的 `JScript` 能遵循同一套标准发展而诞生的 `ECMAScript`，正好排到了作为 `Ecma` 的 `262` 号标准，所以得到 `ECMA-262` 编号。）

`ISO/IEC 16262`：第二标准，由国际标准化组织 `ISO`（International Standard Organization）和国际电子技术委员会 `IEC` （`International Electrotechnical Commisssion`）负责管理；

出于商标版权的原因，规范标准中将这门语言称为 `ECMAScript`，所以原则上 `JavaScript` 与 `ECMAScript` 指的是同一个东西，但有时也会加以区分：

 * `JavaScript`：指语言及其实现
 * `ECMAScript`：指语言标准及语言版本，比如 ES6 表示语言（标准）的第 6 版

> ECMAScript 发展历史
---

 [ECMAScript发展历史](ECMAScript发展历史.md) 

## 开始（聚焦 ES6）
---

 这里主要引用 `阮一峰` 老师的 `ES6标准入门` 一书中的总结：ES6既是一个历史名词，也是一个泛指，含义是 5.1 版本以后的 `JavaScript` 的下一代标准，涵盖了 `ES2015、ES2016、ES2017` 等，而 `ES2015` 则是正式名称，特指当年发布的真实版本的语言标准，市面上提到的 ES6 一般指 `ES2015` 标准，但有时也是泛指 `下一代 JavaScript`。

### 本文主要讲解以下内容：

* 块级作用域（Block scoping，ES2015）
* 解构（Destructuring，ES2015）
* 箭头函数（Arrow Functions，ES2015）
* 模板字符串（template string，ES2015）
* 剩余参数/展开语法（Rest and spread parameters，ES2015）
* 对象字面量简写语法（Object shorthand，ES2015）
* 数组实例的 includes()（ES2016）
* Async/await 异步语法（ES2017）

### 块级作用域

> 为什么需要块级作用域？

 ES5 只有全局作用域和函数作用域，没有块级作用域，这导致很多场景不合理。

* 第一种场景，内层变量可能会覆盖外层变量。

``` js
var tmp = new Date();
function fn() {
	console.info(tmp);
	if (false) {
		var tmp = 'hello world';
	}
}
fn(); //* undefined
```

 以上代码的原意是，`if` 代码块的外部使用外层的 `tmp` 变量，内部使用内层的 `tmp` 变量。但是，函数 `fn` 执行后，输出结果为 `undefined`，原因在于变量提升导致内层的`tmp` 变量覆盖了外层的 `tem` 变量。

``` js
//* 解析步骤
var tmp = new Date();
function fn() {
	var tmp; //* undefined;
	console.info(tmp); //* undefined;
	if(false) {
		tmp = 'hello world';
	}
}
fn();
```

* 第二种场景，用来技术的循环变量泄露为全局变量。

``` js
var tmp = 'hello';
for (var i = 0; i < tmp.length; i++) {
	console.info(tmp[i]);
}
console.info(i); //* 5
```

上面的代码中，变量 `i` 只用来控制循环，但是循环结束后，它并没有消失，而是泄露成了全局变量。

`let` 实际上为 `JavaScript` 新增了块级作用域。

``` js
function fn() {
	let n = 5;
	if (1) {
		let n = 10;
	}
	console.info(n); //* 5
}
```

上面的函数有两个代码块，都声明了变量 `n`，运行后输出 `5`，这标识外层代码块不受内层代码块的影响。如果使用 `var` 定义变量，最后输出的值是 `10`。

那么我能利用 `块级作用域` 做什么呢？

我们先来做一道面试题

``` js
for (var i = 0; i < 5; i++) {
	setTimeout(()=> {
		console.info(i);
	}, 1000);
}
//* 5 5 5 5 5
```

改成 `ES6` 中的 `let`

``` js
for (let i = 0; i < 5; i++) {
	setTimeout(() => {
		console.info(i);
	}, 1000);
}
//* 0 1 2 3 4
```

↑ 块级作用域的好处

那么 `ES5` 能不能实现 `块级作用域` 的效果呢？可以， 可以使用闭包

``` js
for (var i = 0; i < 5; i++) {
	;(function(index) {
		setTimeout(() => {
			console.info(index);
		},1000)
	})(i);
}
```

### 解构

> 解构：是将一个数据结构分解为更小部分的过程。ES6中，从数组和对象中提取值，对变量进行赋值。

那么解构有什么用处呢？

0. 可以大大的简化变量声明操作

``` js
//* ES5
var foo = 1;
var bar = 2;
var baz = 3;

//* ES6
let [foo, bar, baz] = [1, 2, 3];
```

1. 变量交换，看起来如同镜像。赋值语句的左侧的结构模式，右侧是临时创建的数组字面量。`x` 被赋值为数组中的 `y` ，`y` 被赋值为数组中的 `x`；

``` js
let x = 1;
let y = 2;
;[x, y] = [y, x];
//* x = 2; y = 1;
```

2. 对象解构

``` js
var obj = { x: 1, y: 2, c: 1 };
let { x, y } = obj;
//* x = 1; y = 2;
```

3. 字符串解构

``` js
const [a, b, c, d, e] = 'hello';
//* a = 'h'; b = 'b'; c = 'l'; d = 'l'; e = 'o';
```

4. 函数参数解构

``` js
const xueyue = {
	name: '雪月',
	age: 18
}

function getAge({name, age}) {
	return `${name}今年${age}岁`;
}
getAge(xueyue); //* 雪月今年18岁
```

### 箭头函数

0. `ES6` 允许使用箭头 `=>` 定义函数

``` js
var f = v => v;
//* 等同于
var f = function(v) {
	return v;
}
```

1. 如果箭头函数不需要参数或需要多个参数，就是用圆括号代表参数部分。

``` js 
var f = () => 5;
//* 等同于 ES5 的
var f = function() {
	return 5;
}

var sum = (num1, num2) => num1 + num2;
//* 等同于 ES5 的
var sum = function(num1, num2) {
	return num1 + num2;
}
```

2. 箭头函数可以与结构结合使用

``` js
const full = ({ first, last }) => first + ' ' + last;
//* 等同于 ES5 的
function full(person) {
	return person.first + ' ' + person.last;
}
```

3. 箭头函数使得表达更加简洁

``` js
const isEven = n => n % 2 === 0;
const square = n => n * n;

var result = values.sort((a, b) => a -b);
//* 等同于 ES5 的
var result = values.sort(function(a, b) {
	return a - b;
});
```

 上面代码只用了两行，就定义了两个简单 工具函数。如果不用箭头函数，可能就要占用多行，而且还不如现在这样写醒目

4. 箭头函数使用注意点
	* 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象。
	* 不可以当做构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。
	* 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
	* 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。
	* 详情：[TODO：rest 详情]、[TODO: yield 详情]

上面四点中，第一点尤其值得注意。`this` 对象的指向是可变的，但是在箭头函数中，它是固定的。

``` js
//* ES6
function foo() {
	setTimeout(() => {
		console.info('id', this.id);
	}, 100);
}
//* 转换 ES5
function foo() {
	var _this = this;
	
	setTimeout(function() {
		console.info('id', _this.id);
	}, 100);
}
```

上面代码中，转换后的 `ES5` 版本清楚的说明了，箭头函数里面根本没有自己的 `this`，而是引用外层的 `this`。






