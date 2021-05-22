# IDEA 项目启动配置示例

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

<script src="https://www.jq22.com/js/jquery.min.js"></script>

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

<a href="#idea-项目启动配置示例" class="go-top"> ↑ </a>

<div class="pack-up-toc c-blue"><span class="pack-up-toc-icon">↓</span>收起菜单</div>

[TOC]

## 一、Idea 中配置指定项目关联 svn

### 1.1 寻找项目svn URL地址

 svn服务器上项目地址: 例: `http://hzya.ufyct.com:9095/svn/JAVAProject/KF2020307杭州望家欢生鲜配送ERP/code/freshdelivery`

![1.1.1](https://files.catbox.moe/609qp4.png)

![1.1.2](https://files.catbox.moe/dy16nl.png)

### 1.2 idea配置svn代码地址

 打开 idea 远程仓库控制台
![1.2.1](https://ae01.alicdn.com/kf/U85b7b396695b4ad398f40564722144b5M.jpg)

 选择 svn; ② 添加远程仓; ③ 添加远程仓地址
![1.2.2](https://ae01.alicdn.com/kf/U85b7b396695b4ad398f40564722144b5M.jpg)

## 二、配置IDEA项目

 打开 idea ‘项目结构’ 面板(快捷键: Ctrl + Shift + Alt + S)
![2.1.1](https://ae01.alicdn.com/kf/U9c10e033e29b4557a0cb90de9790b146M.jpg)

 `E:\hzya-projects\ideawork\freshdelivery\target` 面板中选择 ‘Project’ 选择当前项目目录, 指定项目编译成功后的代码生成目录
![2.1.2](https://ae01.alicdn.com/kf/U77ff85faa74c4c91a0d3d1e54fb5a6e56.jpg)

 下一步来到 ‘Module’, 防止程序定向不到预定编译输出文件夹, 先删除已存在的配置
![2.1.3](https://ae01.alicdn.com/kf/U3327ebfff0584d6ba489a8bcc60c65f5E.jpg)

 下一步来到 ‘Artifacts(工件)’ – 删除第一个 war 配置
![2.1.4](https://ae01.alicdn.com/kf/Uf469e770711e433896c2c11b1c44c8cfP.jpg)

 添加 ‘Module’ – 选择 ‘Web(因为当前是 web 项目)’ – 右下角自动创建工件
![2.1.5](https://ae01.alicdn.com/kf/U10701b5e20b8478b894c4ee527fe14b81.jpg)

 回到 ‘Artifacts’ – 右侧 ‘Available Elements(可用元素)’ – 选中已有项目文件夹 – Put into Output Root(放入输出根)
![2.1.6](https://ae01.alicdn.com/kf/U064e4282206c494486eeb892b941d932t.jpg)

## 三、添加 tomcat 服务

 顶部锤子 旁边 - Edit Configurations 配置服务
![3.1.1](https://ae01.alicdn.com/kf/U5ebf2f0f83db41c7a9b1ca73951855ddS.jpg)

 左上角添加 tomcat  – Tomcat Server – tomcat-local  - 会将面板替换成下图
![3.1.2](https://ae01.alicdn.com/kf/U4cb8cd3d066142d8a17d1c273619afd5J.jpg)

 配置相关服务器信息(name、端口等), 点击右下角 ‘fix’, 自动导入需要部署的项目
![3.1.3](https://ae01.alicdn.com/kf/U107ac51e0de4457a982dd0a6ecf31c502.jpg)

 再来到 ‘Deployment(部署)’ – 配置 ‘Application content’ – 配置 Web 项目访问路径
![3.1.4](https://ae01.alicdn.com/kf/Ucf345cd4c09649ccade98e9840f1f207a.jpg)

 启动实时文件更新到前台(文件热加载)
![3.1.5](https://ae01.alicdn.com/kf/Uee74eeff8d8545ec86fe451d124bfe255.jpg)

 点击顶部锤子 编译项目(或者小虫子使用 Debugger 模式)
![3.1.6](https://ae01.alicdn.com/kf/U5a107359367347cebd69e34c56c2ece87.jpg)

``` mermaid
graph TB;
点击顶部锤子编译项目_或_小虫子使用Debugger模式==>编译成功
编译成功==>项目启动成功
```
