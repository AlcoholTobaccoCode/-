// ==UserScript==
// @name         seeyouOA
// @namespace    http://tampermonkey.net/
// @require	 https://cdn.staticfile.org/jquery/1.11.2/jquery.min.js
// @version      0.1
// @description  ya内部使用
// @author       duqings@foxmail.com
// @include      http://hzya.ufyct.com:8088/seeyon/*
// @grant        none
// ==/UserScript==

$(function () {
  //* 表头图片宽度控制
  $('body').append('<style>.MsoTableGrid.msoUcTable img {width: 100% !important}</style>');

  //* 页面点击事件
  pageEventInSeeYou();
});

/**
 * 页面点击事件
 */
function pageEventInSeeYou() {
  //* 事项点击
  $(document).on('click', 'td.tr-bottom.sectionSubjectIcon', function () {
    var $href = $(this).find('a').attr('href');
    var useHref = $href.split(',')[0];
    useHref = useHref.substr(useHref.indexOf("'") + 1, useHref.length - 1);
    console.info(useHref.replace(/[\\"'"]/g, ''));
    window.open(useHref.replace(/[\\"'"]/g, ''));
    // $(this).find('a').attr('href', useHref).attr('target', '_black');
  });
}
