// ==UserScript==
// @name         ya日志系统任务未完成情况高亮显示
// @namespace    http://tampermonkey.net/
// @version      0.1
// @require	 https://cdn.staticfile.org/jquery/1.11.2/jquery.min.js
// @description  ya内部使用
// @author       duqings@foxmail.com
// @match        http://hzya.ufyct.com:9090/*
// @match        http://hzya.ufyct.com:9090/*/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict';
  console.info('🚀 ~ runs in.');

  let taskTd = null, //* 数据表格 行
      timerWiatInTampermonkey = null, //* 定时器
      closeTimer = {
        close() {
          clearInterval(timerWiatInTampermonkey); // 关闭定时器
          timerWiatInTampermonkey = null; //* 回收
        }
      }; //* 定时器关闭方法
  timerWiatInTampermonkey = setInterval(() => {
    console.count('✨ ~ runs: ');
    taskTd = $('td[data-field="stateN"]');
    if (taskTd.length > 0) {
      for (let i = taskTd.length; i >= 0; i--) {
        let item = taskTd[i],
          itemText = $(item).text(), //* 任务核定情况文本
          par = $(item).parent('tr'); //* 当前行父级

        if (itemText) {
          //* 防止有干扰字符, 这里用 indexOf
          if (itemText.indexOf('未核对') > -1) { //* 未核对任务
            $(par).css({
              'background-color': '#e0e0e0'
            }).children('td').css({
              fontSize: '18px'
            });
          }
          if (itemText.indexOf('有效工作') > -1) { //* 未核对任务
            $(par).css({
              'background-color': '#07c160',
              'color': '#fff'
            }).children('td').css({
              fontSize: '18px'
            });
          }
          if (itemText.indexOf('无效工作') > -1) { //* 未核对任务
            $(par).css({
              'background-color': '#e54d42',
              'color': '#fff'
            }).children('td').css({
              fontSize: '18px'
            });
          }
        }
        $(item).css({
          fontSize: '26px',
          fontWeight: 800
        })
      }
    } else {
      closeTimer.close();
    }
  }, 500);

  //* 5s 后关闭定时器
  setTimeout(() => {
      closeTimer.close();
  }, 5000);
})();