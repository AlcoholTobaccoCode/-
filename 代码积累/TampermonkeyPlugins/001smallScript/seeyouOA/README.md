# YA 致远A8-m协同管理软件-Chrome支持插件

[TOC]

## 插件使用流程

### 说明

 让 Chrome、Edge 浏览支持打开 __事项__，可以做一些的查看、打印等操作，插件不作用于__新建表单__;
 插件需要 油猴插件做支持, 已有油猴插件可以直接跳到使用教程.

### 步骤

#### 1.安装前置拓展支持

 1.1 Chrome/Edge 安装油猴插件(Tampermonkey)
 ![Tampermonkey](https://files.catbox.moe/prifsm.png)

 1.2.1 安装方法1：附件中的 `Tampermonkey_extension_4_11_0_0.crx` 为油猴插件主体，直接拖拽安装
 ![做拽安装](https://files.catbox.moe/0ogetu.png)

 1.2.2 安装方法2：测试时发现部分设备环境问题会导致上述安装方法失败, 提供一种文件夹导入方法: a).将附件中 `Tampermonkey_extension_4_11_0_0` 文件夹放在一个 __固定位置__, 删除该文件夹会使油猴插件 __失效__; b).拓展页面右上角开启开发者模式;
 ![导入未封装的插件](https://files.catbox.moe/aqykhe.png)
 c). 导入未封装项目 - 打开 `Tampermonkey_extension_4_11_0_0` 文件夹, 选择 `4.11_0` - 选择文件夹
 ![导入未封装的插件](https://files.catbox.moe/z89jfg.png)

 1.3 找到刚安装的油猴插件，启动
 ![启动](https://files.catbox.moe/1wackb.png)

#### 2.导入脚本

 2.1 启动之后浏览器顶部会有个小图标，戳他 - 新增脚本
 ![新增脚本](https://files.catbox.moe/zknbje.png)

 2.2.1 导入方法1:  附件 `seeyouOA.js` 全选复制粘贴覆盖编辑框内默认内容, Ctrl S 保存
 ![导入方法1](https://files.catbox.moe/gvbj86.png)

 2.2.2 导入方法2: 油猴插件内顶部点击 [实用工具] - 文件(档案) - 导入文件, 选择附件中 `seeyouOA.js` - 安装
 ![导入方法2](https://files.catbox.moe/k86kyn.png)

 2.3 安装成功之后 - 插件列表 - 启动
 ![安装成功的插件启用](https://files.catbox.moe/grac2q.png)

 2.4 <a href="http://hzya.ufyct.com:8088" target="_black">前往OA</a>, 检查运行状态，已打开OA启动插件时，需要刷新页面；插件有小标出现说明正在运行.
 ![OA示例](https://files.catbox.moe/xx6v9c.png)

 2.5 插件目前仅作用于 待办工作、跟踪事项、已办事项、已发事项；点击某条事项会打开新页面,不影响目前页面;
 ![使用](https://files.catbox.moe/o9sij2.png)


