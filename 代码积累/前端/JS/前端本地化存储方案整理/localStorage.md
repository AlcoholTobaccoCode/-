# __localStorage__（本地存储）

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
</style>

<a href="#localstorage本地存储）" class="go-top"> ↑ </a>

<div class="pack-up-toc c-blue"><span class="pack-up-toc-icon">↓</span>收起菜单</div>

[TOC]

## 前言

 `HTML5` 新方法，不过 __IE8及以上浏览器都兼容__。

## 特点

1. 生命周期：__持久化__ 的本地存储，除非主动删除数据，否则数据永远不会过期。
2. 存储的信息在同一域中是共享的。
3. 当本页操作（新增、修改、删除）了 `localStorage` 的时候，本页面不会触发 `storage` 事件，但是别的页面会触发 `storage` 事件。
	* 监听事件：
	```
	window.addEventListener('storage', function(e) {
		console.info(e.key, e.oldValue, e.newValue);
	} 
	//StorageEvent对象
    {
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        composed: false,
        currentTarget: {...}, //当前Window对象
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        key: "tabs",//更新的item键名
        newValue: "1",//更新后的item键值
        oldValue: "2",//更新前的item键值
        path: [Window],//一个数组，数组中有一个元素，为当前Window对象
        returnValue: true,
        srcElement: {...}, //当前Window对象
        storageArea: {...}, //Storage对象
        target:{...}, //当前Window对象
        timeStamp: 101647.2000000067,
        type: "storage",
        url: "http://www.localhost.com/list.html",//更新localStorage的页面
        __proto__: StorageEvent
    }
    //* 通过这些属性我们可以做很多操作，例如页面之间互相传值，统计当前打开的页面数量（限同源页面）等。
	```
4. 大小：据说是 __5M__（跟浏览器厂商有关系）
5. 在非 `IE` 下的浏览中可以本地打开。`IE` 浏览器要在服务器中打开。
	
	* 此处的服务器指服务器环境下。
6. `localStorage` 本质上 对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。
7. `localStorage` 受同源策略的限制。

## 设置、读取、删除

> 设置
> `localStorage.setItem('username', 'cfx')`;

> 获取
> `localStorage.getItem('username')`
> 也可以获取键名
> `localStorage.key(0); //* 获取第一个键名`;

> 删除
> `localStorage.removeItem('username')`;
> 清空所有
> `localStorage.clear();`

## __`storage` 事件__

 当 `storage` 发生改变的时候触发。
 __注意：__ 当前页面对 `storage` 的操作会触发其他页面的 `storage` 事件，
 事件的回调函数中有一个参数 `event`，是一个 `StorageEvent` 对象，提供了一些使用的属性，如下表：

|__Property__|__Type__|__Description__|
|:--:|:--:|:---|
|key|String|添加、删除或修改的键名|
|oldValue|Any|之前的值（现在被覆盖），如果添加了新项则为 `null`|
|newValue|Any|新值，如果添加了新项则为 `null`|
|url/uri|String|调用触发此更改方法的页面|
