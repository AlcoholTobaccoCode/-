# __cookie__

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

<a href="#cookie" class="go-top"> ↑ </a>

<div class="pack-up-toc c-blue"><span class="pack-up-toc-icon">↓</span>收起菜单</div>

[TOC]

## __前言__

 网络早期最大的问题之一是如果管理状态。简而言之，服务器无法知道两个请求是否来自同一个浏览器。当时最简单的方法是在请求时，在页面中插入一些参数，并在下一个请求中传回参数。这需要使用包含参数的隐藏的表单，或者作为 `URL` 参数的一部分传递。这两个解决方案都手动操作，很容易出错。`cookie` 出现来解决这个问题。

## __作用__

 `cookie` 是纯文本，没有可执行代码。存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过 `cookie` 来向访问者电脑上存储数据，或者某项网站为了辨别用户身份、进行 `session` 跟踪而储存在用户本地终端上的数据（通常经过加密）

## __如何工作__

 当网页要发 `http` 请求时，浏览器会先检查是否有相应的 `cookie`，有则自动添加在 `request header` 中的 `cookie` 字段中。这些是浏览器自动帮我们做的，而且每一次 `http` 请求浏览器都会自动帮我们做。这个特点很重要，因为这关系到“什么样的数据适合存储在 `cookie` 中”。
 存储在 `cookie` 中的数据，每次都会被浏览器自动放在 `http` 请求中，如果这些数据 并不是每个请求都需要发給服务端的数据，浏览器这设置自动处理无疑增加了网络开销；单如果这些数据是每个请求都需要发給服务端（比如身份认证信息），浏览器这设置自动处理就大大免去了重复添加操作。所以对于那种设置“每次请求都要写到 信息（最典型的就是身份认证信息）”就特别适合放在 `cookie` 中，其他类型的数据就不适合了。

## __特征__

1. 不同的浏览器存放的 `cookie` 位置不一样，也是不能通用的。
2. `cookie` 的存储是以域名形式进行区分的，不同的域下存储的 `cookie` 是独立的。
3. 我们可以设置 `cookie` 生效的域（当前设置 `cookie` 所在域的子域），也就是说，我们能够操作的 `cookie` 是当前域以及当前域下的子域。
4. 一个域名下存放的 `cookie` 的个数是有限制的，不同的浏览器存放的个数不一样，一般为 `20` 个。
5. 每个 `cookie` 存放的内容大小也是有限制的，不同的浏览器存放大小不一样，一般为 `4kb`。
6. `cookie` 也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁。

## __`cookie` 值既可以设置，也可以读取__

### 设置

 __客户端设置__

``` js
document.cookie = '名字=值';
document.cookie = 'username=csx;doman=baike.biadu.com'; //* 设置存储值与生效域
```
 __注意:__ 客户端可以设置 `cookie` 的下列选项: `expires(过期时间)`、`domain(生效域)`、`path(路径)`、`secure(安全性, 有条件: 只有在 https 协议的网页中，客户端设置 secure 类型的 cookie 才能成功)`；客户端无法设置 `httpOnly` 选项。

> 扩展解释

* `path`：
  默认是'/项目名/当前路径的上一层地址'，如: 请求路径: `/cookie/cookieDome/servlet/login`，`cookie` 的请求路径: `/cookie/cookieDome/servlet`，如果我们设置 `path` ，如果当前访问的路径包含了 `cookie` 的路径（当前访问路径在 `cookie` 基础上要比 `cookie` 的范围小）`cookie` 就会加载 `request` 的对象之中。
 `cookie` 的路径，它只能拿到当前请求路径的上一级所包含的路径。也就是说，在访问子路径时，会包含父路径的 `cookie`，而在访问父路径时，不包含子路径的 `cookie`。

``` mermaid
graph LR;

请求的路径==>`http://localhost/cDemo/a/b/c/meLearn3`
请求的路径==>`http://localhost/cDemo/a/b/meLearn2`
请求的路径==>`http://localhost/cDemo/meLearn1`
`http://localhost/cDemo/a/b/c/meLearn3`==>3请求中包含的`cookie`
`http://localhost/cDemo/a/b/meLearn2`==>2请求中包含的`cookie`
`http://localhost/cDemo/meLearn1`==>1请求中包含的`cookie`
3请求中包含的`cookie`==>3`/cDemo/`
3请求中包含的`cookie`==>3`/cDemo/a/`
3请求中包含的`cookie`==>3`/cDemo/a/b/`
3请求中包含的`cookie`==>3`/cDemo/a/b/c/`
2请求中包含的`cookie`==>2`/cDemo/`
2请求中包含的`cookie`==>2`/cDemo/a/`
2请求中包含的`cookie`==>2`/cDemo/a/b/`
1请求中包含的`cookie`==>1`/cDemo`
```

例如: 有三个请求路径包含一个 `cookie` 并设置
* a: `http://localhost:8080/day01/hello`
* b: `http://localhost:8080/day01/hello/b`
* c: `http://localhost:8080/day01/hello/b/c`
当请求 b 路径时，`request` 中只能获取到 a、b 请求中的 `cookie` 对象
当请求 c 路径时，`request` 中能获取到 a、b、c 请求中的 `cookie` 对象
注意: 在设置 `cookie` 路径时，最好不要写死，可通过 `request.getContextpath()` 来获取当前项目的根目录来设置:

``` js
//* 写死
cookie.setPath('/hello/xx');
//* 根据当前请求路径设置
cookie.setPath(request.getContextpath() + '/');
```

 __服务端设置__

 不管你是请求一个资源文件（如 `html/css/js/图片`），还是发送一个 `ajax` 请求，服务员都会返回 `response`。而 `response header` 中有一项叫 `set-cookie`，是服务端专门用来设置 `cookie` 的。

``` text
Set-Cookie 消息头是一个字符串，其格式如下（中括号中的部分是可选的）：
Set-Cookie: value[; expire=date][; domain=domain][; path=path][; secure]
```

__注意：__ 一个 `set-Cookie` 字段只能设置一个 `cookie`，当你要想设置多个 `cookie`，需要添加同样多的 `set-Cookie` 字段。
服务端可以设置 `cookie` 的所有选项：`expires`、`domain`、`path`、`secure`、`httpOnly`
通过 `Set-Cookie` 指定的这些可选项只会在浏览器端使用，而不会被发送至服务器端。

> 校验浏览器是否支持 `cookie`

``` js
var dt = new Date();
dt.setSeconds(dt.getSeconds() + 60); 
document.cookie = "cookietest=1; expires=" + dt.toGMTString(); 
var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1; 
if(!cookiesEnabled) { 
	console.info("没有启用cookie");
} else{
	console.info("已经启用cookie"); 
}

```

### __读取__

 我们通过 `document.cookie` 来获取当前网站下的 `cookie` 的时候，
 得到的字符串形式的值，它包含了当前网站下所有的 `cookie`（为避免跨脚本(`xss`)攻击，这个方法只能获取非 `httpOnly` 类型的 `cookie`）。
 它会把所有 `cookie` 通过一个 __分号 + 空格__ 的形式串联起来，例如：
 `username=cfx; job=coding`。

### __修改__

 要想修改一个 `cookie`，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新 `cookie` 时，`path/domain/` 这几个选项一定要和旧 `cookie` 保持一样，否则不会修改旧值，而是添加了一个新的 `cookie`。

### __删除__

 把要删除的 `cookie` 的过期时间设置成已过去的时间，`path/domain/` 这几个选项一定要和旧 `cookie`保持一样。

 __注意：__
 如果只设置一个值，那么算 `cookie` 中的 `value`；设置的两个 `cookie, key`值如果设置相同，下面的也会把上面的覆盖。

## `cookie` 的属性（可选项）

### 过期时间（`expries、max-age`）

 如果我们想长时间存放一个 `cookie` 。需要在设置这个 `cookie` 的时候同时給它设置一个过期的时间，如果不设置，`cookie` 默认是临时存储的，当浏览器关闭的时候自动销毁。

``` text
注意：document.cookie = '名称=值;expires=' + GMT(格林威治时间)格式的日期型字符串;
```

 一般设置天数： `new Date().setDate(oDate.getDate() + 5);` 比当前时间多5天；
 一个设置 `cookie`时效性的栗子🌰：

``` js
/**
* 设置 cookie
* @param {string} c_name cookie 名字
* @param {string} value  cookie 值
* @param {number} expiredays  过期时间
*/
function setCookie(c_name, value, expiredays) {
	let exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
setCookie('username', 'cfx', 30);
```

> `expires` 是 `http/1.0`协议中的选项，在`http/1.1`协议中`expires`已由`max-age`选项代替，两者的作用都是限制`cookie`的有效时间。`expires`的值是一个时间点（`cookie`时效时刻=创建时刻+`max-age`）。
> 另外，`max-agee`的默认值是 -1（即有效期为`session`）；`max-age`有三种可能：负数、0、正数。
> 负数：有效期`session`；
> 0：删除`cookie`;
> 正数：有效期为创建时刻+`max-age`。

### __`cookie`的域概念（`domain`选项）__

 `domain`指定了`cookie`将要被发送至哪个或哪些域中。默认情况下，`domain`会被设置为创建该`cookie`的页面所在的域名，所以当給相同域名发送请求时，该`cookie`会被发送至服务器。
 浏览器会把`domain`的值与请求的域名做一个尾部比较（即从字符串的尾部开始比较），并将匹配的`cookie`发送至服务器。

#### __客户端设置__

 `document.cookie = 'username=cfx;path=/;domain=qq.com'`;
 如上：`www.qq.com` 与 `sports.qq.com` 共用一个关联的域名 `qq.com`，我们吐过想让 `sports.qq.com` 下的 `cookie` 被 `www.qq.com` 访问，我们就需要用到 `cookie` 的 `domain` 属性，并且需要把 `path` 属性设置为 `/`。

#### __服务端设置__

 `Set-Cookie: username=cfx;path=/;domain=qq.com`;
_注：一定是同域之间的访问，不能把`domain`设置成非主域的域名。_

### `cookie`的路径概念（path选项）

 `cookie`一般都是由于用户访问页面而被创建的，可是并不是只有在创建`cookie`的页面才可以访问这个`cookie`。
 因为安全方面的考虑，默认情况下，只有与创建 `cookie` 的页面在同一个目录或子目录下的网站才可以访问。
 即 `path` 属性可以为服务器特定文档指定 `cookie`，这个属性设置的 `url` 且带有这个前缀的 `url` 路径都是有效的。

#### __客户端设置__

 最常用的例子就是让 `cookie` 在根目录下，这样不管是哪个子页面创建的 `cookie`，所有的单页面都可以访问到了。
 `document.cookie = 'username=cfx;path=/'`;

#### __服务端设置__
 `Set-Cookie: name=cfx;path=/test`;
 如上设置，`path` 选项值会与 `/test`，`/testDemo`等等相匹配；任何以 `/test` 开头的选项都是合法的。需要注意的是，只有在 `domain` 选项核实完毕之后才会对 `path` 属性值进行比较。`path` 属性的默认值是发送 `Set-Cookie` 消息头所对应的 `URL` 中的 `path` 部分。

### __`domain` 和 `path` 总结：__

 `domain`是域名，`path` 是路径，两者加起来就构成了 `URL`，`domain` 和 `path` 一起来限制 `cookie` 能被哪些 `URL` 访问。
 所以 `domain` 和 `path` 2个选项共同决定了 `cookie` 何时被浏览器自动添加到请求头中发送出去。如果没有设置这年两个选项，则会使用默认值。`domain` 的默认值为设置该 `cookie` 的网页所在的域名，`path` 默认值为设置该 `cookie` 的网页所在的目录。

### `cookie` 的安全性（`secure` 选项）

 通常 `cookie` 信息都是使用 `HTTP` 连接传递数据，这种传递方式很容易被查看，所以 `cookie` 存储的信息容易被窃取。假如 `cookie` 中所传递的内容比较重要，那么就要求使用加密的数据传输。
 `secure` 选项用来设置 `cookie` 只在确保安全的请求中才会发送。当请求是 `HTTPS` 或者其他安全协议时，包含 `secure` 选项的 `cookie` 才能被发送至服务器。
 `document.cookie = 'username=cfx; secure'`;
 把 `cookie` 设置为 `secure`，只保证 `cookie` 与服务器之间的数据传输过程加密，而保存在本地的 `cookie` 文件并不加密。就算设置了 `secure` 属性也并不代表他人不能看到你机器本地保存的 `cookie` 信息。机密且敏感的信息绝不应该在 `cookie` 中存储或传输，因为 `cookie` 的整个机制都是不安全的。
 __注意：如果想在客户端即网页中通过 `js` 去设置 `secure` 类型的 `cookie`，必须保证网页是 `https` 协议的。在 `http` 的协议的网页中是无法设置 `secure` 类型的 `cookie` 的。 __

### `httpOnly`

 这个选项用来设置 `cookie` 是否能通过 `js` 去访问。默认情况下，`cookie` 不会带 `httpOnly` 选项（即为空），所以默认情况下，客户端是可以通过 `js` 代码去访问（包括的读取、修改、删除等）这个 `cookie` 的。当 `cookie` 带 `httpOnly` 选项时，客户端则无法通过 `js` 代码去访问（包括读取、修改、删除等）这个 `cookie`。
 __在客户端是不能通过 `js` 代码去设置一个 `httpOnly` 类型的 `cookie` 的，这种类型的 `cookie` 只能通过服务端来设置。__

### `cookie` 的编码

 `cookie` 其实是个字符串，但这个字符串中等号、分号、空格被当做了特殊符号。所以当 `cookie` 的 `key` 和 `value` 中含有这3个特殊字符时，需要对其进行额外编码，一般会用 `escape` 进行编码，读取时用 `unescape` 进行解码；也可以用 `encodeURIComponent/decodeURIComponent` 或者 `encodeURI/decodeURI`（[拓展：关于编码的介绍](https://www.cnblogs.com/season-huang/p/3439277.html)）
 话题拓展：
* [聊一聊 `cookie`](https://segmentfault.com/a/1190000004556040)

