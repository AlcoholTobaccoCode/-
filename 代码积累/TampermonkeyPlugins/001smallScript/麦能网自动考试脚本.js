// ==UserScript==
// @name         麦能网
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://nit.cjnep.net/*
// @grant        none
// ==/UserScript==

// Add jQuery
(function(){
    function runCheck() {
        var checkedExam = null;
        checkedExam = setTimeout(() => {
            console.count('run times: ');
            var topic = $('#quiz_wnd'); //* 获取当前题目主盒子
            if ($(topic).css('display') !== 'none') { //* 如果存在
                //* 直接提交
                $('#job_quizsub').click();
                //* 查看答案
                $('#job_quizview').click();

                //* 答案窗口
                var itemDetailList2 = $('#job_quizlist2').find('dd');

                var answerList = [];

                $(itemDetailList2).each((i, e) => {
                    if ($(e).hasClass('correct')) {
                        console.info(i);
                        answerList.push(i);
                    }
                });

                console.info('------');

                //* 重做
                $('#job_quizreset').click();
                // $('#job_quizlist')

                var item_quizlist = $('#job_quizlist').find('dd');

                for (var i = 0; i < answerList.length; i++) {
                    var ansItem = answerList[i];
                    //* 填充答案
                    $(item_quizlist).eq(ansItem).find('input').attr('flag', 'Y').click();
                }

                $('#job_quizsub').click();
                $('#job_quizfinish').click();
            }
            //* 回收
            clearTimeout(checkedExam);
            checkedExam = null;
            runCheck();
        }, 1500);
    }
    runCheck();
})();


