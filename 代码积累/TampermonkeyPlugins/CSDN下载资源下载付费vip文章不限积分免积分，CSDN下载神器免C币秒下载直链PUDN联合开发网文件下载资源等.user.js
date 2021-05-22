// ==UserScript==
// @name         CSDN下载资源下载付费vip文章不限积分免积分，CSDN下载神器/免C币秒下载直链PUDN联合开发网文件下载资源等
// @version      1.0.9
// @namespace    chaoxijiuhe
// @description  免积分免C币秒下载直链CSDN下载神器，CSDN下载资源和下载付费vip文章不限积分/免积分免C币，PUDN联合开发网不用会员资源下载等源代码包
// @author       chaoxijiuhe
// @include      *://csdn.net/*
// @include      *://*.csdn.net/*
// @include      *://www.csdn.net/*
// @include      *://download.csdn.net/*
// @include      *://pudn.com/*
// @include      *://*.pudn.com/*
// @include      *://www.pudn.com/*
// @include      *://*.baidu.com/*
// @include      *://*.sogou.com/*
// @include      *://*.so.com/*
// @include      *://*.bing.com/*
// @include      *://*.google.com/*
// @require      https://cdn.bootcss.com/jquery/2.1.0/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getResourceURL
// ==/UserScript==
 
(function() {
    'use strict';
    var url = window.location.href;
        url = encodeURIComponent(url);
    var urlmf = 'http://d.oo14.com/ePLe?utm_source=gf&url=' + url;
    var urlgj =  'http://d.oo14.com/5OLe?utm_source=gf&url=' + url;
 
    function addBtn1(){
                var doc_tag_wrap = $(".doc-tag-wrap");
                if(doc_tag_wrap && doc_tag_wrap.length){
                   var download = "<div id='download-csdn'style='display:block;line-height:40px; text-align: center;vertical-align: top; background-color: #EB5B3B; cursor: pointer; color: #fff;margin-bottom: 20px;z-index:9999;'><a href='"
                   +urlmf+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;z-index:9999;'>下载CSDN此资源</a></div>";
                   $(".doc-tag-wrap").prepend(download);
                }else{
                  var downloadx = "<div id='download-csdn'style='display: block;line-height: 40px; text-align: center; vertical-align: top;background-color: #EB5B3B; cursor: pointer; color: #fff; margin-bottom: 20px; position: fixed; left: 0; top: 260px; width: 83px; z-index: 9999; '><a href='"
                  +urlmf+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载CSDN此资源</a></div>";
                  $("body").append(downloadx);
                };
    }
     function addBtn2(){
                var doc_tag_wrap = $(".doc-info-right");
                if(doc_tag_wrap && doc_tag_wrap.length){
                   var download = "<div id='download-csdn-pro'style='display: block;line-height: 40px; text-align: center; vertical-align: top; background-color: red; cursor: pointer; color: #fff;margin-bottom: 2px;z-index:9998;'><a href='"
                   +urlgj+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载CSDN此资源</a></div>";
                   doc_tag_wrap.append(download);
                }else{
                  var downloadx = "<div id='download-csdn-pro'style='display: block;line-height: 40px; text-align: center; vertical-align: top; background-color: red; cursor: pointer; color: #fff; margin-bottom: 2px; position: fixed; left: 0; top: 358px; width: 83px; z-index: 9999;'><a href='"
                  +urlgj+"' target='_blank' style='font-size:16px;color:#fff;display: block; height: 100%; padding: 2px 10px;'>下载CSDN此资源</a></div>";
                  $("body").append(downloadx);
                };
    }
 
    addBtn2();
 
  var css_buttom = "#_copy{width:72px;height:40px;background:red;color:#fff;position:absolute;z-index:1000;display:flex;justify-content:center;align-items:center;border-radius:3px;font-size:13px;cursor:pointer}#select-tooltip,#sfModal,.modal-backdrop,div[id^=reader-helper]{display:none!important}.modal-open{overflow:auto!important}._sf_adjust_body{padding-right:0!important}";
 
  function styleInit(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (!css || typeof document === 'undefined') {
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
 
    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }
 
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }
 
  styleInit(css_buttom);
 
  function initEvent($, ClipboardJS) {
    $("body").on("mousedown", function (e) {
      $("#_copy").remove();
    });
 
    document.oncopy = function () {};
 
    $("body").on("copy", function (e) {
      e.stopPropagation();
      return true;
    });
    ClipboardJS.prototype.on('success', function (e) {
      $("#_copy").html("Copy succeeded");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
    ClipboardJS.prototype.on('error', function (e) {
      $("#_copy").html("copy failed");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
  }
 
  var path = "";
  function getSelectedText() {
    var select = unsafeWindow;
    path.split(".").forEach(function (v) {
      select = select[v];
    });
    return select;
  }
 
  function init$1($) {
    $(window).on("load", function (e) {
      $(".sf-edu-csdn-vw-container").attr("style", "");
      $(".sfa-body").on("selectstart", function (e) {
        e.stopPropagation();
        return true;
      });
    });
  }
 
  function getSelectedText$1() {
    if (unsafeWindow.pad) {
      unsafeWindow.pad.editor.clipboardManager.copy();
      return unsafeWindow.pad.editor.clipboardManager.customClipboard.plain;
    }
 
    return void 0;
  }
 
  var siteGetSelectedText = null;
  function initWebsite($, ClipboardJS) {
    var mather = function mather(regex, site) {
      if (regex.test(window.location.href)) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
 
        site.init.apply(site, args);
        if (site.getSelectedText) siteGetSelectedText = site.getSelectedText;
      }
    };
    mather(/.*download\.csdn\.net\/.+/, { init: init$1 }, $);
  }
 
  function getSelectedText$2() {
    if (siteGetSelectedText) return siteGetSelectedText();
    if (window.getSelection) return window.getSelection().toString();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange().text;
    return "";
  }
 
  (function () {
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS;
 
    initEvent($, ClipboardJS);
    initWebsite($);
    document.addEventListener("mouseup", function (e) {
      var copyText = getSelectedText$2();
      if (copyText) console.log(copyText);else return "";
      $("#_copy").remove();
      var template = "\n            <div id=\"_copy\"\n  style=\"left:".concat(e.pageX + 30, "px;top:").concat(e.pageY, "px;\"\n            data-clipboard-text=\"").concat(copyText, "\">\u590D\u5236</div>\n        ");
      $("body").append(template);
      $("#_copy").on("mousedown", function (event) {
        event.stopPropagation();
      });
      $("#_copy").on("mouseup", function (event) {
        event.stopPropagation();
      });
      new ClipboardJS('#_copy');
    });
  })();
 
    const rules = {
        plus: {
            name: "default",
            hook_eventNames: "copy|cut|dragstart|contextmenu|select|selectstart",
            unhook_eventNames: "keydown|keyup|mousedown|mouseup",
            dom0: true,
            hook_addEventListener: true,
            hook_preventDefault: true,
            add_css: true
        }
    };
    const returnTrue = e => true;
    const getRule = (host) => {
        return rules.plus;
    };
    const dontHook = e => !!e.closest('form');
    const EventTarget_addEventListener = EventTarget.prototype.addEventListener;
    const document_addEventListener = document.addEventListener;
    const Event_preventDefault = Event.prototype.preventDefault;
    let hook_eventNames, unhook_eventNames, eventNames;
 
    //Hook addEventListener proc
    function addEventListener(type, func, useCapture) {
        let _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
        if (!hook_eventNames.includes(type)) {
            _addEventListener.apply(this, arguments);
        } else {
            _addEventListener.apply(this, [type, returnTrue, useCapture]);
        }
    }
    function clearLoop() {
        let type, prop,
            c = [document,document.body, ...document.getElementsByTagName('div')],
        e = document.querySelector('iframe[src="about:blank"]');
        if (e && e.clientWidth>99 && e.clientHeight>11){
            e = e.contentWindow.document;
            c.push(e, e.body);
        }
        for (e of c) {
            if (!e) continue;
            e = e.wrappedJSObject || e;
            for (type of eventNames) {
                prop = 'on' + type;
                e[prop] = null;
            }
        }
    }
    function init() {
        let rule = getRule(location.host);
        hook_eventNames = rule.hook_eventNames.split("|");
        //Allowed to return value
        unhook_eventNames = rule.unhook_eventNames.split("|");
        eventNames = hook_eventNames.concat(unhook_eventNames);
        if (rule.dom0) {
            setInterval(clearLoop, 9e3);
            setTimeout(clearLoop, 1e3);
            window.addEventListener('load', clearLoop, true);
        }
        if (rule.hook_addEventListener) {
            EventTarget.prototype.addEventListener = addEventListener;
            document.addEventListener = addEventListener;
        }
        if (rule.hook_preventDefault) {
            Event.prototype.preventDefault = function () {
                if (dontHook(this.target) || !eventNames.includes(this.type)) {
                    Event_preventDefault.apply(this, arguments);
                }
            };
        }
        if (rule.add_css) GM_addStyle(
			`html, * {
            -webkit-user-select:text !important;
            -moz-user-select:text !important;
            user-select:text !important;
        }
    ::-moz-selection {color:#FFF!important; background:#3390ff!important;}
    ::selection {color:#FFF!important; background:#3390fF!important;}`
    );
    }
    init();
 
})();
