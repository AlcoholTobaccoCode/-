//* 关联油猴插件
// ==UserScript==
// @name     iconfont复制代码设置
// @include https://www.iconfont.cn/manage/index*
// @require https://cdn.staticfile.org/jquery/1.11.2/jquery.min.js
// @description  阿里图标库复制 dom 标签
// @author       duqings@foxmail.com
// @version  1
// @grant    none
// ==/UserScript==
$(document).ready(function () {
  //* 创建一个 隐藏(视觉维度) 的 input
  //* 考虑到 'display:none / hidden' 可能会导致调用系统 select() 方法失效
  //* 所以使用固定定位将其定位到视角外
  $('body').append('<input type="text" style="position: fixed; top: -500px" id="copyIn" />');
  var waitTime = null;
  //* 这里很僵硬
  waitTime = setInterval(function () {
    if ($('.icon-cover-unfreeze').length > 0) {
      //* 等待项目中字体图标加载完成之后
      $('.icon-cover-unfreeze').each(function (i, item) {
        //* 改变默认 icon 列表高度, 防止 hover 监听不到
        $(item).parents('.icon-item').css('height', '170px');
        //* 考虑到不同情况, 新建一个复制按钮
        $(item).append('<span title="复制标签代码" class="cover-item iconfont cover-item-line copy-html" style="font-size: 14px;">复制标签</span>');
      });
      clearInterval(waitTime);
      waitTime = null;
    }
  });
  //* 复制标签代码
  $(document).on('click', '.copy-html', function () {
    //* (如果存在)移除上次复制成功提醒框
    $('._dawangraoming_alert-message').remove();
    //* 取当前 icon class编码
    var iconfontHTML = $(this).parents('.icon-item').find('.icon-code.icon-code-show').text();
    //* 清空上次的存值
    $('#copyIn').val('');
    //* 拼接、更新
    $('#copyIn').val('<i class="iconfont ' + iconfontHTML + '" ></i>');
    //* 复制
    $('#copyIn').select();
    document.execCommand("Copy");
    //* 复制结束提醒
    $('body').append('<p class="_dawangraoming_alert-message">' + $(this).parents('.icon-item').find('.icon-name').text() + 'DOM 标签复制成功！</p>');
    setTimeout(function () {
      //* 移除提醒
      $('._dawangraoming_alert-message').remove();
    }, 800);
  });
});