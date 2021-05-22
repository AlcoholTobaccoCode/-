# indexDB 学习相关

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

<a href="#indexDB 学习相关" class="go-top"> ↑ </a>

<div class="pack-up-toc c-blue"><span class="pack-up-toc-icon">↓</span>收起菜单</div>

[TOC]

## 学习教程: [阮一峰浏览器数据库 IndexedDB 入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

### 一、概述

---

#### 背景

  随着浏览器功能不断增强, 但不适合存储大量数据: Cookie 的大小不超过 4KB, 且每次请求都会发送回服务器; LocalStorage 在 2.5MB 到 10MB 之间(各家浏览器不同), 而且不提供搜索功能, 不能简历自定义的索引. 所以, 需要一种新的解决方案, 这就是 IndexedDB 诞生背景.

  通俗的说, IndexedDB 就是 _浏览器提供的本地数据库_, __它可以被网页脚本创建和操作__, IndexedDB 允许存储大量数据, 提供查找接口, 还能建立索引, 这些都是 LocalStorage 所不具备的, 就数据库类型而言, IndexedDB 不属于 __关系型数据库(不支持 SQL 查询语句)__, 更接近 NoSQL 数据库.

>     关系型数据库相关概念:
>
>     [百度百科](https://baike.baidu.com/item/%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93/8999831)
>     [维基百科](https://zh.wikipedia.org/zh-hans/%E5%85%B3%E7%B3%BB%E6%95%B0%E6%8D%AE%E5%BA%93)
>
>     NoSQL
>     [维基百科](https://zh.wikipedia.org/wiki/NoSQL)
>

#### 特点

 IndexedDB 具有以下特点

| 条目 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 特点                                                         |
| :---------------------------------------: | :----------------------------------------------------------- |
|                键值对存储                 | IndexedDB 内部采用对象仓库(object store)存放数据. 所有的数据类型都可以直接存入, 包括 JavaScript 对象.对象仓库中, 数据以 "键值对" 的形式保存, 每一个数据记录都有对应的主键, 主键是独一无二的, 不能有重复, 否则会抛出一个错误. |
|                   异步                    | IndexedDB 操作时, 不会锁死浏览器, 用户依然可以进行其他操作, 这与 LocalStorage 形成对比, 后者的操作是同步的, 异步设计是为了防止大量数据的读写, 拖慢网页的表现. |
|                 支持事务                  | IndexedDB 支持事务 (transaction), 这意味着一些列操作步骤之中, 只要有一步失败, 整个事务就取消, 数据库回滚到事务发生之前的状态, 不存在只改写一部分数据的情况. |
|                 同源限制                  | IndexedDB 受到同源限制, 每一个数据库对应创建它的域名. 网页只能访问自身域名下的数据库, 而不能访问跨域的数据库 |
|                储存空间大                 | IndexedDB 的存储空间比 LocalStorage 大得多, 一般来说不少于 250MB, 甚至没有上限 |
|              支持二进制存储               | IndexedDB 不进可以存储字符串, 还可以存储二进制数据 (ArrayBuffer 对象和 Blob 对象) |

### 二、基本概念

---

#### 概念

> IndexedDB 是一个比较复杂的 API, 设计不少概念, 它把不同的实体, 抽象成一个个对象接口, 学习这个 API, 就是学习它的各种对象接口.

| 名称     | 对应对象            |
| :------- | :------------------ |
| 数据库   | IDBDatabase 对象    |
| 对象仓库 | IDBObjectStore 对象 |
| 索引     | IDBIndex 对象       |
| 事务     | IDBTransaction 对象 |
| 操作请求 | IDBRequest 对象     |
| 指针     | IDBCursor 对象      |
| 主键集合 | IDBKeyRange 对象    |

---

> 主要概念

| 名称 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | 备注                                                         |
| :---------------------------------------------- | :----------------------------------------------------------- |
| 数据库                                          | 数据库是一系列相关数据的容器, 每个域名(严格的说, __是协议 + 域名 + 端口__) 都可以新建任意多个数据库; IndexedDB 数据库有版本的概念, 同一个时刻只能有 __一个__ 版本的数据库存在, 如果要修改数据库结构(新增或删除表、索引或者主键), 只能通过升级数据库版本完成 |
| 对象仓库                                        | 每个数据库包含若干个对象仓库(object store), 它类似与关系型数据库的表格 |
| 数据记录                                        | 对象仓库保存的数据记录, 每条记录类似于关系型数据库的行, 但是只有主键和数据体两部分, 主键用来检录默认的索引, 必须是不同的, 否则会报错; 主键可以是数据记录里面的一个属性, 也可以指定为一个递增的整数编号 |
| 索引                                            | 为了加速数据的检索, 可以在对象仓库里面, 为不同的属性建立索引 |
| 事务                                            | 数据记录的读写和删改, 都要通过事务完成, 事务对象提供 __error__、__abort__ 和 __complete__ 三个事件, 用来监听操作结果 |
<!--
``` js
//* 数据记录
{id: 1, text: 'foo'}
//* 上面的对象中, __id__ 属性可以当作主键;
//* 数据体可以是任意数据类型, 不限于对象.
```
-->

---

### 三、操作流程

 IndexedDb 数据库的各种操作, 一般是按照下面的流程进行的; 这个部分只給出简单的代码示例, 用于快速上手, 详细的各个对象的 API 请看[这里](https://wangdoc.com/javascript/bom/indexeddb.html#indexeddb-%E5%AF%B9%E8%B1%A1)

#### 3.1 打开数据库

---

 使用 IndexedDB 的第一步是打开数据库, 使用 __`indexedDB.open()`__ 方法
 __`var request = window.indexedDB.open(databaseName, version);`__
 这个方法接受两个参数, 第一个参数是字符串, 标识数据库的名字; 如果指定的数据库不存在, 就会新建数据库;
 第二个参数是整数, 标识数据库的版本; 如果省略, 打开已有数据库时, 默认为当前版本; 新建数据库时, 默认为 _1_.

 __`indexedDB.open()`__ 方法返回一个 __IDBRequest__ 对象; 这个对象通过三种事件 __`error`__、__`success`__、__`upgradeneeded`__, 处理打开数据库的操作结果.

 (1). error 事件

 `error` 事件标识打开数据库失败

    ``` js
    request.onerror = function(event) {
      console.info('数据库打开失败');
    }
    ```

 (2). success 事件

 `success` 事件表示成功打开数据库.

    ``` js
    var db;
    
    request.onsuccess = function(event) {
      db.request.result;
      console.info('数据库打开成功');
    }
    ```

 这时, 通过 `request` 对象的 `result` 属性拿到数据库对象.

 (3). upgradeneeded 事件

 如果指定的版本号, 大于数据库的实际版本号, 就会发生数据库升级事件 __`upgradeneeded`__.

    ``` js
    var db;
    
    request.onupgradeneeded = function(event) {
      db = event.target.result;
    }
    ```

 这时通过事件对象 __`target.result`__ 属性, 拿到数据库实例.

#### 3.2 新建数据库

---

 新建数据库与打开数据库是同一个操作, 如果指定的数据库不存在, 就会新建; 不同之处在于, 后续的操作主要在 `upgradeneeded` 事件的监听函数里面完成, 因为这时版本从无到有, 所以会触发这个事件.

 通常, 新建数据库以后, 第一件事是 _新建对象仓库(即新建表)_

    ``` js
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      var objectStore = db.createObjectStore('person', { keyPath: 'id'});
    }
    ```

 上面代码中, 数据库新建成功以后, 新增一张叫做 `person` 的表格, 主键是 `id`.
 更好的写法是先判断一下这张表格是否存在, 如果不存在再新建.

    ``` js
    request.ongradeneeded = function(event) {
      db = event.target.result;
      var objectStore;
      if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', { keyPath: 'id' });
      }
    }
    ```

 主键(key) 是默认建立索引的属性, 比如, 数据记录是 `{ id: 1, name: '张三' }`, 那么 `id` 属性可以作为主键; 主键也可以指定为下一层对象的属性, 比如 `{foo: { bar: 'baz' }}` 的 `foo.bar` 也可以指定为主键.
 如果数据记录里面没有合适作为主键的属性, 那么可以让 __IndexedDB__ 自动生成主键.

    ``` js
    var objectStore = db.createObjectStore(
      'person',
      { autoIncrement: true }
    )
    ```

 上面代码中, 指定主键为一个递增的整数.
 新建对象仓库以后, 下一步可以新建索引.

    ``` js
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      var objectStore = db.createObjectStore('person', { keyPath: 'id' });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
    }
    ```

 上面代码中, `IDBObject.createIndex()` 的三个参数分别为索引名称、索引所在的属性、配置对象(说明改属性是否包含重复的值).

#### 3.3 新增数据

---

 新增数据指的是向对象仓库写入数据记录, 这需要通过事务完成.

    ``` js
    function add() {
      var request = db.transaction(['person', 'readwrite'])
        .objectStore('person')
        .add({ id: 1, name: '张三', age: 24, email: 'duqings@foxmail.com' });
    
      request.onsuccess = function(event) {
        console.info('数据写入成功');
      }
    
      request.onerror = function(event) {
        console.info('数据写入失败');
      }
    }
    
    add();
    ```
 上面代码中, 写入数据需要新建一个事务, 新建时必须指定表格名称和操作模式('只读'或'读写'); 新建事务以后, 通过 `IDBTransaction.objectStore(name)` 方法, 拿到 __IDBObjectStore__ 对象, 在通过表格对象的 `add()` 方法, 向表格写入一条记录.
 写入操作是一个异步操作, 通过监听连接对象的 `success` 事件和 `error` 事件, 了解是否写入成功.

#### 3.4 读取数据

---

 读取数据也是通过事务完成.

    ``` js
    function read() {
      var transaction = db.transaction(['person']);
      var objectStore = transaction.objectStore('person');
      var request = objectStore.get(1);
    
      request.onerror = function(event) {
        console.info('事务失败');
      }
    
      request.onsuccess = function(event) {
        if (request.result) {
          console.info('Name: ': + request.result.name);
          console.info('Age: ': + request.result.age);
          console.info('Email: ': + request.result.email);
        } else {
          console.info('未获得数据记录');
        }
      };
    }
    ```

 上面代码中, `objectStore.get()` 方法用于读取数据, 参数是主键的值.

#### 3.5 遍历数据

---

 遍历数据表格的所有记录, 要使用指针对象 __IDBCursor__.

    ``` js
    function readAll() {
      var objectStore = db.transaction('person').objectStore('person');
    
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
    
        if (cursor) {
          console.info('Id: ' + cursor.key);
          console.info('Name: ' + cursor.value.name);
          console.info('Age: ' + cursor.value.age);
          console.info('Email: ' + cursor.value.email);
          cursor.continue();
        } else {
          console.info('没有更多数据了');
        }
      };
    }
    ```

 上面代码中, 新建指针对象的 `openCursor()` 方法是一个异步操作, 所以要监听 `success` 事件.

#### 3.6 更新数据

---

 更新数据要使用 `IDBObject.put()` 方法

    ``` js
    function update() {
      var request = db.transaction(['person'], 'readwrite')
          .objectStore('person')
          .put({ id: 1, name: '李四', age: 35, email: 'liSi@mail.com' });
      
      request.onsuccess = function(event) {
        console.info('数据更新成功');
      }
    
      request.onerror = function(event) {}
      console.info('数据更新失败');
    }
    update();
    ```

#### 3.7 删除数据

---

 `IDBObjectStore.delete()` 方法用于删除记录.

    ``` js
    function remove() {
      var request = db.transaction(['person', 'readwrite'])
          .objectStore('person')
          .delete(1);
      request.onsuccess = function(event) {
        console.info('数据删除成功');
      };
    }
    remove();
    ```

#### 3.8 使用索引

---

 索引的意义在于, 可以让你搜索任意字段, 也就是说 _从任意字段拿到数据记录_, 如果不建立索引, 默认只能搜索主键(即从主键取值).
 假定新建表格的时候, 对 `name` 字段建立了索引.
 `ovjectStore.createIndex('name', 'name', { unique: false });`
 现在就可以从 `name` 找到对应的数据记录了.

~~~js
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function(e) {
  va result = e.target.result;
  if (result) {
    //* TODO...
  } else {
    //* TODO...
  }
}
~~~