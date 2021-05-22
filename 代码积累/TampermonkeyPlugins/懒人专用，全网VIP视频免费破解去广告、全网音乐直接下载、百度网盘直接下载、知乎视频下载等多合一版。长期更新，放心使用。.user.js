// ==UserScript==
// @name         懒人专用，全网VIP视频免费破解去广告、全网音乐直接下载、百度网盘直接下载、知乎视频下载等多合一版。长期更新，放心使用。
// @namespace 	 lanhaha
// @version      3.1.9
// @description  自用组合型多功能脚本，无需关注公众号，集合了优酷、爱奇艺、腾讯、芒果等全网VIP视频免费破解去广告，网易云音乐、QQ音乐、酷狗、酷我、虾米、蜻蜓FM、荔枝FM、喜马拉雅等网站音乐和有声书音频免客户端下载，百度网盘直接下载，知乎视频下载，优惠券查询等几个自己常用的功能。
// @author       lanhaha，syhyz1990，Chao，zuihuimai
// @include      *://pan.baidu.com/disk/home*
// @include      *://yun.baidu.com/disk/home*
// @include      *://pan.baidu.com/s*
// @include      *://yun.baidu.com/s*
// @include      *://*.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *.youku.com/v*
// @include      *m.youku.com/*
// @include      *.iqiyi.com/v_*
// @include      *.iqiyi.com/w_*
// @include      *.iqiyi.com/a_*
// @include      *.le.com/ptv/vplay/*
// @include      *v.qq.com/x/*
// @include      *v.qq.com/p*
// @include      *v.qq.com/cover*
// @include      *v.qq.com/tv/*
// @include      *.tudou.com/listplay/*
// @include      *.tudou.com/albumplay/*
// @include      *.tudou.com/programs/view/*
// @include      *.tudou.com/v*
// @include      *.mgtv.com/b/*
// @include      *tv.sohu.com/*
// @include      *film.sohu.com/album/*
// @include      *.bilibili.com/video/*
// @include      *.bilibili.com/anime/*
// @include      *.bilibili.com/bangumi/play/*
// @include      *.pptv.com/show/*
// @include      *.wasu.cn/Play/show*
// @include      *v.yinyuetai.com/video/*
// @include      *v.yinyuetai.com/playlist/*
// @include      *://item.taobao.com/*
// @include      *://*detail.tmall.com/*
// @include      *://*detail.tmall.hk/*
// @include      *://*.liangxinyao.com/*
// @include      *music.163.com/*
// @include      *://y.qq.com/portal*
// @include      *://i.y.qq.com/*
// @include      *://*.kugou.com/*
// @include      *://*kuwo.cn/*
// @include      *://*.xiami.com/*
// @include      *://music.taihe.com/song*
// @include      *://*.1ting.com/player*
// @include      *://music.migu.cn/v*
// @include      *://*.lizhi.fm/*
// @include      *://*.qingting.fm/*
// @include      *://*.ximalaya.com/*
// @exclude      *://*.eggvod.cn/*
// @connect      d.pcs.baidu.com
// @connect      baidu.com
// @connect      baidupcs.com
// @connect      baiduyun.wiki
// @connect      localhost
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@9
// @license      GPL License
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

//百度网盘
(function() {
var pan_title=new Array()
		pan_title[0]= "https://pan.baidu.com/"
		pan_title[1]= "https://yun.baidu.com/"
        let pan_link = location.href;
		for(var a=0;a<pan_title.length;a++){
			if(pan_link.indexOf(pan_title[a])!= -1){
                pan_link = pan_link.replace('baidu.com','baiduwp.com');
				var pan_html = "<a href="+pan_link+" target='_blank' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;'><img src='data:image/gif;base64,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' style='width:50px' ></a>";
				$("body").append(pan_html);

//百度网盘脚本开始
//
;(() => {
  'use strict'
  const version = GM_info.script.version
  const classMap = {
    'bar-search': 'OFaPaO',
    'list-tools': 'tcuLAu',
    'header': 'vyQHNyb'
  }
  const errorMsg = {
    'dir': '提示：不支持整个文件夹下载，可进入文件夹内获取文件链接下载！',
    'unlogin': '提示：登录网盘后才能使用此功能哦！',
    'fail': '提示：获取下载链接失败！请刷新网页后重试！',
    'unselected': '提示：请先选择要下载的文件！',
    'morethan': '提示：多个文件请点击【显示链接】！',
    'toobig': '提示：只支持300M以下的文件夹，若链接无法下载，请进入文件夹后勾选文件获取！',
    'timeout': '提示：页面过期，请刷新重试！',
    'wrongcode': '提示：获取验证码失败！',
    'deleted': '提示：文件不存在或已被百度和谐，无法下载！',
  }
  let defaultCode = 250528
  let secretCode = getValue('secretCodeV') ? getValue('secretCodeV') : defaultCode
  let panhelper = {}
  let userAgent = ''
  let Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  let ariaRPC = {
    domain: getValue('rpcDomain') || 'http://localhost',
    port: getValue('rpcPort') || 6800,
    token: getValue('rpcToken') || '',
    dir: getValue('rpcDir') || 'D:/',
  }

  function clog(c1, c2, c3) {
    c1 = c1 ? c1 : ''
    c2 = c2 ? c2 : ''
    c3 = c3 ? c3 : ''
    console.group('[网盘直链下载助手]')
    console.log(c1, c2, c3)
    console.groupEnd()
  }

  function getBDUSS() {
    let baiduyunPlugin_BDUSS = getStorage('baiduyunPlugin_BDUSS') ? getStorage('baiduyunPlugin_BDUSS') : '{"baiduyunPlugin_BDUSS":""}'
    let BDUSS = JSON.parse(baiduyunPlugin_BDUSS).BDUSS
    if (!BDUSS) {
      Swal.fire({
        icon: 'error',
        title: '提示',
        html: panhelper.t.e,
        footer: '【网盘万能助手】是增强扩展插件，安装后请刷新',
        confirmButtonText: '安装'
      }).then((result) => {
        if (result.value) {
          GM_openInTab(panhelper.w, {active: true})
        }
      })
    }
    return BDUSS
  }

  function aria2c(link, filename, ua) {
    let BDUSS = getBDUSS()
    ua = ua || userAgent
    if (BDUSS) {
      return encodeURIComponent(`aria2c "${link}" --out "${filename}" --header "User-Agent: ${ua}" --header "Cookie: BDUSS=${BDUSS}"`)
    } else {
      return '请先安装网盘万能助手，安装后请重启浏览器！！！'
    }
  }

  function replaceLink(link) {
    return link ? link.replace(/&/g, '&amp;') : ''
  }

  function detectPage() {
    let regx = /[\/].+[\/]/g
    let page = location.pathname.match(regx)
    return page[0].replace(/\//g, '')
  }

  function getCookie(e) {
    let o, t
    let n = document, c = decodeURI
    return n.cookie.length > 0 && (o = n.cookie.indexOf(e + "="), -1 != o) ? (o = o + e.length + 1, t = n.cookie.indexOf(";", o), -1 == t && (t = n.cookie.length), c(n.cookie.substring(o, t))) : ""
  }

  function setCookie(key, value, t) {
    let oDate = new Date()  //创建日期对象
    oDate.setTime(oDate.getTime() + t * 60 * 1000) //设置过期时间
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString()  //设置cookie的名称，数值，过期时间
  }

  function getValue(name) {
    return GM_getValue(name)
  }

  function setValue(name, value) {
    GM_setValue(name, value)
  }

  function getStorage(key) {
    return localStorage.getItem(key)
  }

  function setStorage(key, value) {
    return localStorage.setItem(key, value)
  }

  function encode(str) {
    return btoa(unescape(encodeURIComponent(btoa(unescape(encodeURIComponent(str))))))
  }

  function decode(str) {
    return decodeURIComponent(escape(atob(decodeURIComponent(escape(atob(str))))))
  }

  function getLogID() {
    let name = "BAIDUID"
    let u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&"
    let d = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
    let f = String.fromCharCode

    function l(e) {
      if (e.length < 2) {
        let n = e.charCodeAt(0)
        return 128 > n ? e : 2048 > n ? f(192 | n >>> 6) + f(128 | 63 & n) : f(224 | n >>> 12 & 15) + f(128 | n >>> 6 & 63) + f(128 | 63 & n)
      }
      let n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320)
      return f(240 | n >>> 18 & 7) + f(128 | n >>> 12 & 63) + f(128 | n >>> 6 & 63) + f(128 | 63 & n)
    }

    function g(e) {
      return (e + "" + Math.random()).replace(d, l)
    }

    function m(e) {
      let n = [0, 2, 1][e.length % 3]
      let t = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0)
      let o = [u.charAt(t >>> 18), u.charAt(t >>> 12 & 63), n >= 2 ? "=" : u.charAt(t >>> 6 & 63), n >= 1 ? "=" : u.charAt(63 & t)]
      return o.join("")
    }

    function h(e) {
      return e.replace(/[\s\S]{1,3}/g, m)
    }

    function p() {
      return h(g((new Date()).getTime()))
    }

    function w(e, n) {
      return n ? p(String(e)).replace(/[+\/]/g, (e) => {
        return "+" == e ? "-" : "_"
      }).replace(/=/g, "") : p(String(e))
    }

    return w(getCookie(name))
  }

  function rpcSetting() {
    let dom = ''
    dom += '<div class="flex-center-between"><label for="rpcDomain" class="label">主机</label><input type="text" id="rpcDomain" value="' + ariaRPC.domain + '" class="swal2-input" placeholder="http://localhost"></div>'
    dom += '<div class="flex-center-between"><label for="rpcPort" class="label">端口</label><input type="text" id="rpcPort" value="' + ariaRPC.port + '" class="swal2-input" placeholder="6800"></div>'
    dom += '<div class="flex-center-between"><label for="rpcToken" class="label">密钥</label><input type="text" id="rpcToken" value="' + ariaRPC.token + '" class="swal2-input" placeholder="没有留空"></div>'
    dom += '<div class="flex-center-between"><label for="rpcDir" class="label">下载路径</label><input type="text" id="rpcDir" value="' + ariaRPC.dir + '" class="swal2-input" placeholder="默认为D:\"></div>'
    dom += '<div class="flex-center-between" style="margin-top: 15px;font-size: 0.85em;color: #999;"><div class="label">快速配置</div> <div style="flex: 1;text-align: left;"><span class="rtag" id="rpc1">Motrix</span><span class="rtag" id="rpc2">Aria2 Tools</span><span class="rtag" id="rpc3">AriaNgGUI</span></div></div>'
    dom = '<div>' + dom + '</div>'
    let $dom = $(dom)
    $(document).on('click', '#rpc1', () => {
      $('#rpcDomain').val('http://localhost')
      $('#rpcPort').val(16800)
      $('#rpcDir').val('D:')
    })
    $(document).on('click', '#rpc2', () => {
      $('#rpcDomain').val('http://localhost')
      $('#rpcPort').val(6800)
      $('#rpcDir').val('D:')
    })
    $(document).on('click', '#rpc3', () => {
      $('#rpcDomain').val('http://192.168.0.?')
      $('#rpcPort').val(6800)
      $('#rpcDir').val('/storage/emulated/0/Download')
    })
    Swal.fire({
        title: 'RPC配置',
        allowOutsideClick: false,
        html: $dom[0],
        showCancelButton: true,
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        footer: panhelper.t.n
      }
    ).then((result) => {
      if (result.value) {
        ariaRPC.domain = $('#rpcDomain').val()
        ariaRPC.port = $('#rpcPort').val()
        ariaRPC.token = $('#rpcToken').val()
        ariaRPC.dir = $('#rpcDir').val()
        setValue('rpcDomain', ariaRPC.domain)
        setValue('rpcPort', ariaRPC.port)
        setValue('rpcToken', ariaRPC.token)
        setValue('rpcDir', ariaRPC.dir)
        Toast.fire({
          text: '设置成功',
          icon: 'success'
        })
      }
    })
  }

  function Dialog() {
    let linkList = []
    let showParams
    let dialog, shadow

    function createDialog() {
      let screenWidth = document.body.clientWidth
      let dialogLeft = screenWidth > 800 ? (screenWidth - 800) / 2 : 0
      let $dialog_div = $('<div class="dialog" style="width: 800px; top: 0px; bottom: auto; left: ' + dialogLeft + 'px; right: auto; display: hidden; visibility: visible; z-index: 52;"></div>')
      let $dialog_header = $('<div class="dialog-header"><h3><span class="dialog-title" style="display:inline-block;width:740px;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis"></span></h3></div>')
      let $dialog_control = $('<div class="dialog-control"><span class="dialog-icon dialog-close">×</span></div>')
      let $dialog_body = $('<div class="dialog-body"></div>')
      let $dialog_tip = $('<div class="dialog-tip"><p></p></div>')
      $dialog_div.append($dialog_header.append($dialog_control)).append($dialog_body)
      let $dialog_button = $('<div class="dialog-button" style="display:none"></div>')
      let $dialog_button_div = $('<div style="display:table;margin:auto"></div>')
      let $dialog_copy_button = $('<button id="dialog-copy-button" style="display:none">复制全部链接</button>')
      let $dialog_send_button = $('<button id="dialog-send-button" class="send-all" style="display:none">发送全部链接</button>')
      let $dialog_rpc_button = $('<button id="dialog-rpc-button" class="rpc-setting" style="display:none">配置RPC服务</button>')
      $dialog_button_div.append($dialog_copy_button).append($dialog_send_button).append($dialog_rpc_button)
      $dialog_button.append($dialog_button_div)
      $dialog_div.append($dialog_button)
      $dialog_copy_button.click(() => {
        let content = ''
        if (showParams.type === 'pcs') {
          $.each(linkList, (index, element) => {
            console.log(element)
            if (index === linkList.length - 1)
              content += element.dlink
            else
              content += element.dlink + '\r\n'
          })
        }
        if (showParams.type === 'batchAria') {
          $.each(linkList, (index, element) => {
            if (index === linkList.length - 1)
              content += decodeURIComponent(aria2c(element.dlink, element.filename, userAgent))
            else
              content += decodeURIComponent(aria2c(element.dlink, element.filename, userAgent) + '\r\n')
          })
        }
        if (showParams.type === 'rpc') {
          $.each(linkList, (index, element) => {
            if (index === linkList.length - 1)
              content += element.downloadlink
            else
              content += element.downloadlink + '\r\n'
          })
        }
        if (showParams.type === 'shareLink') {
          $.each(linkList, (index, element) => {
            if (element.dlink == 'error')
              return
            if (index == linkList.length - 1)
              content += element.dlink
            else
              content += element.dlink + '\r\n'
          })
        }
        if (showParams.type == 'shareAriaLink') {
          $.each(linkList, (index, element) => {
            if (element.dlink == 'error')
              return
            if (index == linkList.length - 1)
              content += decodeURIComponent(aria2c(element.dlink, element.server_filename))
            else
              content += decodeURIComponent(aria2c(element.dlink, element.server_filename) + '\r\n')
          })
        }
        GM_setClipboard(content, 'text')
        if (content != '') {
          Toast.fire({
            icon: 'success',
            text: '已将链接复制到剪贴板！'
          })

        } else {
          Toast.fire({
            icon: 'error',
            text: '复制失败，请手动复制！'
          })
        }
      })
      $dialog_div.append($dialog_tip)
      $('body').append($dialog_div)
      $dialog_control.click(dialogControl)
      return $dialog_div
    }

    function createShadow() {
      let $shadow = $('<div class="dialog-shadow" style="position: fixed; left: 0px; top: 0px; z-index: 50; background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0.5; width: 100%; height: 100%; display: none;"></div>')
      $('body').append($shadow)
      return $shadow
    }

    this.open = (params) => {
      showParams = params
      linkList = []
      if (params.type == 'link') {
        linkList = params.list.urls
        $('div.dialog-header h3 span.dialog-title', dialog).html(params.title + "：" + params.list.filename)
        $.each(params.list.urls, (index, element) => {
          element.url = replaceLink(element.url)
          let $div = $('<div><div style="width:30px;float:left">' + element.rank + ':</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><a href="' + element.url + '">' + element.url + '</a></div></div>')
          $('div.dialog-body', dialog).append($div)
        })
      }
      if (params.type === 'batchAria' || params.type === 'batchAriaRPC' || params.type === 'pcs') {
        linkList = params.list
        $('div.dialog-header h3 span.dialog-title', dialog).html(params.title)
        $.each(params.list, (index, element) => {
          let $div = $('<div class="row"><div class="ui-title" title="' + element.filename + '">' + element.filename + '</div><span>：</span></div>')
          if (params.type === 'pcs') {
            $div.append($('<a class="ui-link api-dlink" data-filename=' + element.filename + ' data-link=' + element.dlink + ' href="' + element.dlink + '">' + element.dlink + '</a>'))
          }
          if (params.type === 'batchAria') {
            let link = decodeURIComponent(aria2c(element.dlink, element.filename, userAgent))
            $div.append($('<a class="ui-link aria-link" href="javascript:;">' + link + '</a>'))
          }
          if (params.type === 'batchAriaRPC') {
            $div.append($('<button class="aria-rpc" data-link="' + element.dlink + '" data-filename="' + element.filename + '">点击发送到Aria下载器</button>'))
          }
          $('div.dialog-body', dialog).append($div)
        })
      }
      if (params.type === 'shareLink') {
        linkList = params.list
        $('div.dialog-header h3 span.dialog-title', dialog).html(params.title)
        $.each(params.list, (index, element) => {
          element.dlink = replaceLink(element.dlink)
          if (element.isdir == 1) return
          let $div = $('<div class="row"><div class="ui-title" title="' + element.server_filename + '">' + element.server_filename + '</div><span>：</span><a href="' + element.dlink + '" class="api-dlink">' + element.dlink + '</a></div>')
          $('div.dialog-body', dialog).append($div)
        })
      }
      if (params.type === 'rpcLink') {
        linkList = params.list
        $('div.dialog-header h3 span.dialog-title', dialog).html(params.title)
        $.each(params.list, (index, element) => {
          element.dlink = replaceLink(element.dlink)
          if (element.isdir == 1) return
          let $div = $('<div class="row"><div class="ui-title" title="' + element.server_filename + '">' + element.server_filename + '</div><span>：</span><button class="aria-rpc" data-link="' + element.dlink + '" data-filename="' + element.server_filename + '">点击发送到Aria下载器</button></div>')
          $('div.dialog-body', dialog).append($div)
        })
      }
      if (params.type === 'shareAriaLink') {
        linkList = params.list
        $('div.dialog-header h3 span.dialog-title', dialog).html(params.title)
        $.each(params.list, (index, element) => {
          if (element.isdir == 1) return
          let link = decodeURIComponent(aria2c(element.dlink, element.server_filename))
          let $div = $('<div class="row"><div class="ui-title" title="' + element.server_filename + '">' + element.server_filename + '</div><span>：</span><a href="javasctipt:void(0)" class="aria-link">' + link + '</a></div>')
          $('div.dialog-body', dialog).append($div)
        })
      }
      if (params.tip) {
        $('div.dialog-tip p', dialog).html(params.tip)
      }
      if (params.showcopy) {
        $('div.dialog-button', dialog).show()
        $('div.dialog-button #dialog-copy-button', dialog).show()
      }
      if (params.showrpc) {
        $('div.dialog-button', dialog).show()
        $('div.dialog-button #dialog-send-button', dialog).show()
        $('div.dialog-button #dialog-rpc-button', dialog).show()
      }
      shadow.show()
      dialog.show()
    }

    this.close = () => {
      dialogControl()
    }

    function dialogControl() {
      $('div.dialog-body', dialog).children().remove()
      $('div.dialog-header h3 span.dialog-title', dialog).text('')
      $('div.dialog-tip p', dialog).text('')
      $('div.dialog-button', dialog).hide()
      $('div.dialog-button button#dialog-copy-button', dialog).hide()
      $('div.dialog-button button#dialog-send-button', dialog).hide()
      $('div.dialog-button button#dialog-rpc-button', dialog).hide()
      dialog.hide()
      shadow.hide()
    }

    dialog = createDialog()
    shadow = createShadow()
  }

  function PanHelper() {
    let yunData, sign, timestamp, bdstoken, logid, fid_list
    let fileList = [], selectFileList = [], batchLinkList = [], batchLinkListAll = [], linkList = []
    let dialog, searchKey
    let panAPIUrl = location.protocol + "//" + location.host + "/api/"
    let restAPIUrl = location.protocol + "//pcs.baidu.com/rest/2.0/pcs/"
    let clientAPIUrl = location.protocol + "//pan.baidu.com/rest/2.0/"
    this.init = () => {
      yunData = unsafeWindow.yunData
      initVar()
      registerEventListener()
      addButton()
      dialog = new Dialog({addCopy: true})
      clog('下载助手加载成功！当前版本：', version)
    }

    function getSelectedFile() {
      return require("disk-system:widget/pageModule/list/listInit.js").getCheckedItems()
    }

    function initVar() {
      timestamp = yunData.timestamp || ''
      bdstoken = yunData.MYBDSTOKEN || ''
      logid = getLogID()
    }

    function registerEventListener() {
      $(document).on('click', '.aria-rpc', (e) => {
        $(e.target).addClass('clicked')
        let link = e.target.dataset.link
        let filename = e.target.dataset.filename

        let url = ariaRPC.domain + ":" + ariaRPC.port + '/jsonrpc'
        let json_rpc = {
          id: new Date().getTime(),
          jsonrpc: '2.0',
          method: 'aria2.addUri',
          params: [
            "token:" + ariaRPC.token,
            [link],
            {
              dir: ariaRPC.dir,
              out: filename,
              header: ['User-Agent:' + userAgent, 'Cookie: BDUSS=' + getBDUSS()]
            }
          ]
        }
        GM_xmlhttpRequest({
          method: "POST",
          headers: {"User-Agent": userAgent},
          url: url,
          responseType: 'json',
          timeout: 3000,
          data: JSON.stringify(json_rpc),
          onload: (response) => {
            if (response.response.result) {
              Toast.fire({
                icon: 'success',
                title: '任务已发送至RPC下载器'
              })
            } else {
              Toast.fire({
                icon: 'error',
                title: response.response.message
              })
            }
          },
          ontimeout: () => {
            Toast.fire({
              icon: 'error',
              title: '连接到RPC服务器超时，请检查RPC配置'
            })
          }
        })
      })
      $(document).on('click', '.rpc-setting', () => {
        rpcSetting()
      })
      $(document).on('click', '.send-all', () => {
        $('.aria-rpc').click()
        $('.dialog').hide()
        $('.dialog-shadow').hide()
      })
    }

    function addButton() {
      $('div.' + classMap['bar-search']).css('width', '18%')
      let $dropdownbutton = $('<span class="g-dropdown-button"></span>')
      let $dropdownbutton_a = $('<a class="g-button" data-button-id="b200" data-button-index="200" href="javascript:;"></a>')
      let $dropdownbutton_a_span = $('<span class="g-button-right"><em class="icon icon-download"></em><span class="text" style="width: 60px;">下载助手</span></span>')
      let $dropdownbutton_span = $('<span class="menu" style="width:auto;z-index:41"></span>')
      let $linkButton = $('<a class="g-button-menu" id="batchhttplink-pcs" href="javascript:;" data-type="down">API下载</a>')
      let $aricLinkButton = $('<a class="g-button-menu" id="batchhttplink-aria" href="javascript:;">Aria下载</a>')
      let $aricRPCButton = $('<a class="g-button-menu" id="batchhttplink-rpc" href="javascript:;" data-type="rpc">RPC下载</a>')
      let $versionButton = $(`<a style="color: #F24C43;" class="g-button-menu" target="_blank" href="${panhelper.u}">${panhelper.t.u}</a>`)
      $dropdownbutton_span.append($linkButton).append($aricLinkButton).append($aricRPCButton)
      $dropdownbutton_a.append($dropdownbutton_a_span)
      $dropdownbutton.append($dropdownbutton_a).append($dropdownbutton_span)
      if (getValue('up')) {$dropdownbutton_span.append($versionButton)}
      $dropdownbutton.hover(() => {
        $dropdownbutton.toggleClass('button-open')
      })
      $aricRPCButton.click(batchClick)
      $linkButton.click(batchClick)
      $aricLinkButton.click(batchClick)
      $('.' + classMap['list-tools']).append($dropdownbutton)
      $('.' + classMap['list-tools']).css('height', '40px')
    }

    function batchClick(event) {
      selectFileList = getSelectedFile()
      if (selectFileList.length === 0) {
        Toast.fire({
          icon: 'error',
          text: errorMsg.unselected
        })
        return
      }
      let id = event.target.id
      let tip
      batchLinkList = []
      batchLinkListAll = []
      if (id.indexOf('pcs') > 0) {
        getPCSBatchLink((batchLinkList) => {
          let tip = panhelper.t.j
          if (batchLinkList.length === 0) {
            Toast.fire({
              icon: 'error',
              text: errorMsg.unselected
            })
            return
          }
          dialog.open({title: panhelper.t.k, type: 'pcs', list: batchLinkList, tip: tip, showcopy: false})
        })
      }
      if (id.indexOf('aria') > 0) {
        getPCSBatchLink((batchLinkList) => {
          tip = panhelper.t.f
          if (batchLinkList.length === 0) {
            Toast.fire({
              icon: 'error',
              text: errorMsg.unselected
            })
            return
          }
          dialog.open({title: panhelper.t.l, type: 'batchAria', list: batchLinkList, tip: tip, showcopy: true})
        })
      }
      if (id.indexOf('rpc') > 0) {
        getPCSBatchLink((batchLinkList) => {
          tip = panhelper.t.g
          if (batchLinkList.length === 0) {
            Toast.fire({
              icon: 'error',
              text: errorMsg.unselected
            })
            return
          }
          dialog.open({title: panhelper.t.m, type: 'batchAriaRPC', list: batchLinkList, tip: tip, showcopy: false, showrpc: true})
        })
      }
    }

    function getPCSBatchLink(callback) {
      let fsids = [], token = undefined
      $.each(selectFileList, (index, element) => {
        if (element.isdir == 1)
          return
        fsids.push(element.fs_id)
      })
      fsids = encodeURIComponent(JSON.stringify(fsids))
      let link = panhelper.p.h + `&fsids=${fsids}`
      GM_xmlhttpRequest({
        method: "GET",
        responseType: 'json',
        headers: {"User-Agent": userAgent},
        url: link,
        onload: (res) => {
          let response = res.response
          if (response.errno === 0) {
            callback(response.list)
          }
        }
      })
    }
  }

  function PanShareHelper() {
    let yunData, sign, timestamp, bdstoken, channel, clienttype, web, app_id, logid, encrypt, product, uk,
      primaryid, fid_list, extra, shareid
    let shareType, buttonTarget, dialog
    let selectFileList = []
    let panAPIUrl = location.protocol + "//" + location.host + "/api/"

    this.init = () => {
      yunData = unsafeWindow.yunData
      initVar()
      addButton()
      dialog = new Dialog({addCopy: false})
      registerEventListener()
      clog('下载助手加载成功！当前版本：', version)
    }

    function initVar() {
      shareType = getShareType()
      sign = yunData.SIGN
      timestamp = yunData.TIMESTAMP
      bdstoken = yunData.MYBDSTOKEN
      channel = 'chunlei'
      clienttype = 0
      web = 1
      app_id = secretCode
      logid = getLogID()
      encrypt = 0
      product = 'share'
      primaryid = yunData.SHARE_ID
      uk = yunData.SHARE_UK
      if (shareType == 'secret') {
        extra = getExtra()
      }
      if (!isSingleShare()) {
        shareid = yunData.SHARE_ID
      }
    }

    function getSelctedFile() {
      if (isSingleShare()) {
        return yunData.FILEINFO
      } else {
        return require("disk-share:widget/pageModule/list/listInit.js").getCheckedItems()
      }
    }

    function getShareType() {
      return yunData.SHARE_PUBLIC === 1 ? 'public' : 'secret'
    }

    function isSingleShare() {
      return yunData.SHAREPAGETYPE === "single_file_page"
    }

    function isSelfShare() {
      return yunData.MYSELF === 1
    }

    function getExtra() {
      let seKey = decodeURIComponent(getCookie('BDCLND'))
      return '{' + '"sekey":"' + seKey + '"' + "}"
    }

    function getPath() {
      let hash = location.hash
      let regx = new RegExp("path=([^&]*)(&|$)", 'i')
      let result = hash.match(regx)
      return decodeURIComponent(result[1])
    }

    function addButton() {
      if (isSingleShare()) {
        $('div.slide-show-right').css('width', '500px')
        $('div.frame-main').css('width', '96%')
        $('div.share-file-viewer').css('width', '740px').css('margin-left', 'auto').css('margin-right', 'auto')
      } else
        $('div.slide-show-right').css('width', '500px')
      let $dropdownbutton = $('<span class="g-dropdown-button"></span>')
      let $dropdownbutton_a = $('<a class="g-button" data-button-id="b200" data-button-index="200" href="javascript:;"></a>')
      let $dropdownbutton_a_span = $('<span class="g-button-right"><em class="icon icon-download"></em><span class="text" style="width: 60px;">下载助手</span></span>')
      let $dropdownbutton_span = $('<span class="menu" style="width:auto;z-index:41"></span>')
      let $linkButton = $('<a class="g-button-menu" href="javascript:;" data-type="down">API下载</a>')
      let $aricLinkButton = $('<a class="g-button-menu" href="javascript:;">Aria下载</a>')
      let $aricRPCButton = $('<a class="g-button-menu" href="javascript:;" data-type="rpc">RPC下载</a>')
      let $versionButton = $(`<a style="color: #F24C43;" class="g-button-menu" target="_blank" href="${panhelper.u}">${panhelper.t.u}</a>`)
      $dropdownbutton_span.append($linkButton).append($aricLinkButton).append($aricRPCButton)
      $dropdownbutton_a.append($dropdownbutton_a_span)
      $dropdownbutton.append($dropdownbutton_a).append($dropdownbutton_span)
      if (getValue('up')) {$dropdownbutton_span.append($versionButton)}
      $dropdownbutton.hover(() => {
        $dropdownbutton.toggleClass('button-open')
      })
      $aricRPCButton.click(linkButtonClick)
      $linkButton.click(linkButtonClick)
      $aricLinkButton.click(ariclinkButtonClick)
      $('div.module-share-top-bar div.bar div.x-button-box').append($dropdownbutton)
    }

    function ariclinkButtonClick() {
      selectFileList = getSelctedFile()
      if (bdstoken === null) {
        Toast.fire({
          icon: 'error',
          text: errorMsg.unlogin
        })
        return false
      }
      if (selectFileList.length === 0) {
        Toast.fire({
          icon: 'error',
          text: errorMsg.unselected
        })
        return false
      }
      buttonTarget = 'ariclink'
      getDownloadLink((downloadLink) => {
        if (downloadLink === undefined) return
        if (downloadLink.errno === 0) {
          let tip = panhelper.t.f
          dialog.open({title: panhelper.t.l, type: 'shareAriaLink', list: downloadLink.list, tip: tip, showcopy: true})
        } else if (downloadLink.errno == 112) {
          Toast.fire({
            icon: 'error',
            text: errorMsg.timeout
          })
          return false
        } else {
          Toast.fire({
            icon: 'error',
            text: errorMsg.fail
          })
        }
      })
    }

    function registerEventListener() {
      $(document).on('click', '.aria-rpc', (e) => {
        $(e.target).addClass('clicked')
        let link = e.target.dataset.link
        let filename = e.target.dataset.filename
        let url = ariaRPC.domain + ":" + ariaRPC.port + '/jsonrpc'
        let json_rpc = {
          id: new Date().getTime(),
          jsonrpc: '2.0',
          method: 'aria2.addUri',
          params: [
            "token:" + ariaRPC.token,
            [link],
            {
              dir: ariaRPC.dir,
              out: filename,
              header: ['User-Agent:' + userAgent, 'Cookie: BDUSS=' + getBDUSS()]
            }
          ]
        }
        GM_xmlhttpRequest({
          method: "POST",
          headers: {"User-Agent": userAgent},
          url: url,
          responseType: 'json',
          timeout: 3000,
          data: JSON.stringify(json_rpc),
          onload: (response) => {
            if (response.response.result) {
              Toast.fire({
                icon: 'success',
                title: '任务已发送至RPC下载器'
              })
            } else {
              Toast.fire({
                icon: 'error',
                title: response.response.message
              })
            }
          },
          ontimeout: () => {
            Toast.fire({
              icon: 'error',
              title: '连接到RPC服务器超时，请检查RPC配置'
            })
          }
        })
      })
      $(document).on('click', '.rpc-setting', (e) => {
        rpcSetting()
      })
      $(document).on('click', '.send-all', (e) => {
        $('.aria-rpc').click()
        $('.dialog').hide()
        $('.dialog-shadow').hide()
      })
    }

    function getFidList() {
      let fidlist = []
      $.each(selectFileList, (index, element) => {
        fidlist.push(element.fs_id)
      })
      return '[' + fidlist + ']'
    }

    function linkButtonClick(e) {
      selectFileList = getSelctedFile()
      if (bdstoken === null) {
        Toast.fire({
          icon: 'error',
          text: errorMsg.unlogin
        })
        return false
      }
      if (selectFileList.length === 0) {
        Toast.fire({
          icon: 'error',
          text: errorMsg.unselected
        })
        return false
      }

      buttonTarget = 'link'
      getDownloadLink((downloadLink) => {
        if (downloadLink === undefined) return

        if (downloadLink.errno === 0) {
          if (e.target.dataset.type === 'rpc') {
            let tip = panhelper.t.g
            dialog.open({title: panhelper.t.m, type: 'rpcLink', list: downloadLink.list, tip: tip, showcopy: false, showrpc: true})
          } else {
            let tip = panhelper.t.i
            dialog.open({title: panhelper.t.k, type: 'shareLink', list: downloadLink.list, tip: tip, showcopy: true})
          }
        } else if (downloadLink.errno == 112) {
          Toast.fire({
            icon: 'error',
            text: errorMsg.timeout
          })
          return false
        } else {
          Toast.fire({
            icon: 'error',
            text: errorMsg.fail
          })
        }
      })
    }

    function getDownloadLink(cb) {
      if (bdstoken === null) {
        Toast.fire({
          icon: 'error',
          text: errorMsg.unlogin
        })
        return ''
      }
      if (isSingleShare) {
        fid_list = getFidList()
        logid = getLogID()

        let params = new FormData()
        params.append('encrypt', encrypt)
        params.append('product', product)
        params.append('uk', uk)
        params.append('primaryid', primaryid)
        params.append('fid_list', fid_list)

        if (shareType == 'secret') {
          params.append('extra', extra)
        }

        GM_xmlhttpRequest({
          method: "POST",
          data: params,
          url: panhelper.p.s + `&sign=${sign}&timestamp=${timestamp}&logid=${logid}`,
          onload: (res) => {
            cb(JSON.parse(res.response))
          }
        })
      }
    }
  }

  function PanPlugin() {
    clog('RPC：', ariaRPC)
    this.init = () => {
      main()
      addGMStyle()
      checkUpdate()
      getValue('SETTING_H') ? createHelp() : ''
      createMenu()
    }

    function loadPanhelper() {
      switch (detectPage()) {
        case 'disk':
        case 'oauth2.0':
          let panHelper = new PanHelper()
          panHelper.init()
          return
        case 'share':
        case 's':
          let panShareHelper = new PanShareHelper()
          panShareHelper.init()
          return
        default:
          return
      }
    }

    function addGMStyle() {
      GM_addStyle(`
                .dialog .row {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
                .dialog .row .ui-title {width: 150px;float: left;overflow: hidden;text-overflow: ellipsis;}
                .dialog .row .ui-link {margin-right: 20px;}
                .dialog-body {max-height: 450px;overflow-y: auto;padding: 0 20px;}
                .dialog-tip {padding: 0 20px;background-color: #fff;border-top: 1px solid #c4dbfe;color: #dc373c;}
                .tm-setting {display: flex;align-items: center;justify-content: space-between;padding-top: 20px;}
                .tm-checkbox {width: 16px;height: 16px;}
                #dialog-copy-button {width: 120px;margin: 5px 10px 10px;cursor: pointer;background: #cc3235;border: none;height: 30px;color: #fff;border-radius: 3px;}
                #dialog-send-button {width: 120px;margin: 5px 10px 10px;cursor: pointer;background: #cc3235;border: none;height: 30px;color: #fff;border-radius: 3px;}
                #dialog-rpc-button {width: 120px;margin: 5px 10px 10px;cursor: pointer;background: #4e97ff;border: none;height: 30px;color: #fff;border-radius: 3px;}
                .flex-center-between {display: flex;align-items: center;justify-content: space-between}
                .flex-center-between .label {margin-right: 20px;flex: 0 0 100px;text-align:right}
                .swal2-input {height:50px!important;margin:10px auto!important;}
                .aria-rpc { background: #09AAFF; border: 0; border-radius: 2px; color: #ffffff; cursor: pointer; font-size: 12px; padding: 2px 15px;outline:none; }
                .aria-rpc.clicked { background: #808080; }
                .rtag {padding: 3px 8px; background: #e6e0e0; border-radius: 5px; margin: 0 10px 0 0; color: #666; cursor: pointer;}
            `)
    }

    function checkUpdate() {
      setValue('up', 0)
      GM_xmlhttpRequest({
        method: "POST",
        data: encode(JSON.stringify(GM_info.script)),
        url: `https://api.baiduyun.wiki/update?ver=${version}`,
        onload: (r) => {
          let res = JSON.parse(decode(r.response))
          panhelper = res
          setValue('lastest_version', res.v)
          userAgent = res.a
          if (res.s != getValue('scode')) {
            Swal.fire({
              title: res.t.b,
              //html: $(`<div><img style="width: 250px;margin-bottom: 10px;" src="${res.q}"><input class="swal2-input" id="scode" type="text" placeholder="${res.t.a}"></div>`)[0],
              allowOutsideClick: false,
              confirmButtonText: '确定'
            }).then((result) => {
              if (res.s == $('#scode').val()) {
                setValue('scode', res.s)
                setValue('init', 1)
                Toast.fire({
                  icon: 'success',
                  text: res.t.c,
                }).then(() => {
                  history.go(0)
                })
              } else {
                setValue('scode', res.s)
                setValue('init', 1)
                Toast.fire({
                  icon: 'success',
                  text: res.t.c,
                }).then(() => {
                  history.go(0)
                })
              }
            })
          } else {
            loadPanhelper()
          }
        }
      })
    }

    function compareVersion(a, b) {
      return (a.replace(/\./g, '') - b.replace(/\./g, '')) > 0
    }

    function createHelp() {
      setTimeout(() => {
        let topbar = $('.' + classMap['header'])
        let toptemp = $('<span class="cMEMEF" node-type="help-author" style="opacity: .5" ><a href="' + panhelper.h + '" target="_blank">' + panhelper.o + '</a><i class="find-light-icon" style="display: inline;background-color: #009fe8;"></i></span>')
        topbar.append(toptemp)
      }, panhelper.tt || 5000)
    }

    function createMenu() {
      GM_registerMenuCommand('设置', () => {
        if (getValue('SETTING_H') === undefined) {
          setValue('SETTING_H', true)
        }
        let dom = ''
        if (getValue('SETTING_H')) {
          dom += '<label class="tm-setting">开启教程<input type="checkbox" id="S-H" checked class="tm-checkbox"></label>'
        } else {
          dom += '<label class="tm-setting">开启教程<input type="checkbox" id="S-H" class="tm-checkbox"></label>'
        }
        dom = '<div>' + dom + '</div>'
        let $dom = $(dom)
        Swal.fire({
          title: '脚本配置',
          html: $dom[0],
          confirmButtonText: '保存'
        }).then((result) => {
          history.go(0)
        })
      })
      $(document).on('change', '#S-H', (e) => {
        setValue('SETTING_H', e.currentTarget.checked)
      })
    }

    function main() {
      setValue('current_version', version)
      let oMeta = document.createElement('meta')
      oMeta.httpEquiv = 'Content-Security-Policy'
      oMeta.content = 'upgrade-insecure-requests'
      document.getElementsByTagName('head')[0].appendChild(oMeta)
      $(document).on('contextmenu', '.aria-link', (e) => {
        e.preventDefault()
        return false
      })
      $(document).on('mousedown', '.aria-link', (e) => {
        e.preventDefault()
        let link = e.currentTarget.innerText
        GM_setClipboard(link, 'text')
        Toast.fire({
          icon: 'success',
          text: '已将链接复制到剪贴板！'
        })
        return false
      })
      $(document).on('click', '.api-dlink', (e) => {
        e.preventDefault()
        if (e.target.innerText) {
          GM_xmlhttpRequest({
            method: "GET",
            headers: {"User-Agent": userAgent},
            url: e.target.innerText,
          })
        }
      })
    }
  }

  $(() => {
    let plugin = new PanPlugin()
    plugin.init()
  })
})()
//百度网盘脚本结束
			}
		}
})();
//百度网盘结束
//
(function() {
    //alert(document.querySelector('div[class*="play"] a[hidefocus="true"][href*="?id="]').href);
    var couponUrl = window.location.href;
    if(couponUrl.indexOf('taobao') != -1 || couponUrl.indexOf('tmall') != -1){
    //is_off
    $.get('https://www.zuihuimai.net/vrhr/loading.php',function(loading_html){
    if(loading_html){
    var head = document.getElementsByTagName('head')[0],
	cssURL = 'https://www.zuihuimai.net/tm/style.css',
	linkTag = document.createElement('link');
	linkTag.id = 'dynamic-style';
	linkTag.href = cssURL;
	linkTag.setAttribute('rel','stylesheet');
	linkTag.setAttribute('media','all');
	linkTag.setAttribute('type','text/css');
	head.appendChild(linkTag);
	var goods_id = getQueryString('id');
	var zhm_url = 'https://www.zuihuimai.net/vrhr/index.php';
	if(goods_id){

		$('#J_LinkBasket').parent().after(loading_html);
		$('.J_LinkAdd').parent().after(loading_html);
		if(window.location.host.search('taobao.com') != -1){
			$('#zhm_table').addClass('zhm_tab_taobao');
		}else{
			$('#zhm_table').addClass('zhm_tab_tmall');
		}

		$.get(zhm_url,{goods_id:goods_id},function(data){
			$('#zhm_div_s').html(data);
			$('#zhm_div_s').html(data);
			if(window.location.host.search('taobao.com') != -1){
				$('#zhm_table').addClass('zhm_tab_taobao');
			}else{
				$('#zhm_table').addClass('zhm_tab_tmall');
			}
		});
	}
    }
    });
    }

    var id_random = Math.ceil(Math.random()*100000000);
	var play_url = window.location.href;

	var arr = new Array();
	arr = play_url.split('?')
	var get_url = arr[0];

	if(get_url.indexOf('eggvod.cn') == -1){
		var jx_title=new Array()
		jx_title[0]="youku.com"
		jx_title[1]="iqiyi.com"
		jx_title[2]="le.com"
		jx_title[3]="v.qq.com"
		jx_title[4]="tudou.com"
		jx_title[5]="mgtv.com"
		jx_title[6]="sohu.com"
		jx_title[7]="acfun.cn"
		jx_title[8]="bilibili.com"
		jx_title[9]="pptv.com"
		jx_title[10]="baofeng.com"
		jx_title[11]="yinyuetai.com"
		jx_title[12]="wasu.cn"
		var title_result = false;
		for(var n=0;n<jx_title.length;n++){
			if(get_url.indexOf(jx_title[n])!= -1){


                var play_line_json =  [
		{"name":"纯净1","url":"https://z1.m1907.cn/?jx="},
		{"name":"纯净2","url":"https://jx.618g.com/?url="},
		{"name":"B站1","url":"https://vip.parwix.com:4433/player/?url="},
		{"name":"B站2","url":"https://www.cuan.la/m3u8.php?url="},
		{"name":"BJT","url":"https://ckmov.bjtjr.net/ckmov/?url="},
		{"name":"BL","url":"https://vip.bljiex.com/?v="},
        {"name":"CK","url":"https://www.ckplayer.vip/jiexi/?url="},
        {"name":"大侠","url":"https://api.10dy.net/?url="},
		{"name":"ELW","url":"https://jx.elwtc.com/vip/?url="},
		{"name":"爱跟","url":"https://vip.2ktvb.com/player/?url="},
		{"name":"冰豆","url":"https://api.qianqi.net/vip/?url="},
		{"name":"八八","url":"https://jiexi.q-q.wang/?url="},
		{"name":"百域","url":"https://jx.618g.com/?url="},
		{"name":"ckmov","url":"https://www.ckmov.vip/api.php?url="},
		{"name":"大幕","url":"https://jx.52damu.com/dmjx/jiexi.php?url="},
		{"name":"迪奥","url":"https://123.1dior.cn/?url="},
		{"name":"福星","url":"https://jx.popo520.cn/jiexi/?url="},
		{"name":"跟剧","url":"https://www.5igen.com/dmplayer/player/?url="},
		{"name":"RDHK","url":"https://jx.rdhk.net/?v="},
		{"name":"H8","url":"https://www.h8jx.com/jiexi.php?url="},
		{"name":"豪华","url":"https://api.lhh.la/vip/?url="},
		{"name":"黑云","url":"https://jiexi.380k.com/?url="},
		{"name":"蝴蝶","url":"https://api.hdworking.top/?url="},
		{"name":"IK","url":"https://vip.ikjiexi.top/?url="},
		{"name":"解析la","url":"https://api.jiexi.la/?url="},
		{"name":"久播","url":"https://jx.jiubojx.com/vip.php?url="},
		{"name":"九八","url":"https://jx.youyitv.com/?url="},
		{"name":"老板","url":"https://vip.laobandq.com/jiexi.php?url="},
		{"name":"乐喵","url":"https://jx.hao-zsj.cn/vip/?url="},
		{"name":"M3U8","url":"https://jx.m3u8.tv/jiexi/?url="},
		{"name":"MUTV","url":"https://jiexi.janan.net/jiexi/?url="},
		{"name":"Mao","url":"https://titan.mgtv.com.kunlanys.com/m3u8.php?url="},
		{"name":"明日","url":"https://jx.yingxiangbao.cn/vip.php?url="},
		{"name":"磨菇","url":"https://jx.wzslw.cn/?url="},
		{"name":"诺诺","url":"https://www.ckmov.com/?url="},
		{"name":"诺讯","url":"https://www.nxflv.com/?url="},
		{"name":"OK","url":"https://okjx.cc/?url="},
		{"name":"思云","url":"https://jx.ap2p.cn/?url="},
		{"name":"思古","url":"https://api.sigujx.com/?url="},
		{"name":"思古2","url":"https://api.bbbbbb.me/jx/?url="},
		{"name":"思古3","url":"https://jsap.attakids.com/?url="},
		{"name":"tv920","url":"https://api.tv920.com/vip/?url="},
		{"name":"维多","url":"https://jx.ivito.cn/?url="},
		{"name":"我爱","url":"https://vip.52jiexi.top/?url="},
		{"name":"无名","url":"https://www.administratorw.com/video.php?url="},
		{"name":"小蒋","url":"https://www.kpezp.cn/jlexi.php?url="},
		{"name":"小狼","url":"https://jx.yaohuaxuan.com/?url="},
		{"name":"智能","url":"https://vip.kurumit3.top/?v="},
		{"name":"星驰","url":"https://vip.cjys.top/?url="},
		{"name":"星空","url":"http://60jx.com/?url="},
		{"name":"月亮","url":"https://api.yueliangjx.com/?url="},
		{"name":"云端","url":"https://jx.ergan.top/?url="},
		{"name":"云析","url":"https://jx.yparse.com/index.php?url="},
		{"name":"17云","url":"https://www.1717yun.com/jx/ty.php?url="},
		{"name":"33t","url":"https://www.33tn.cn/?url="},
		{"name":"41","url":"https://jx.f41.cc/?url="},
		{"name":"66","url":"https://api.3jx.top/vip/?url="},
		{"name":"116","url":"https://jx.116kan.com/?url="},
		{"name":"200","url":"https://vip.66parse.club/?url="},
		{"name":"4080","url":"https://jx.urlkj.com/4080/?url="},
		{"name":"973","url":"https://jx.973973.xyz/?url="},
		{"name":"8090","url":"https://www.8090g.cn/?url="}
       ];

                console.log(play_line_json[0].url);

                var play_wrap_html = "<div href='javascript:void(0)' target='_blank' style='cursor:pointer;z-index:9999999999;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;overflow:visible' class='playButton'><img src='data:image/gif;base64,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' title='点击主图标弹出解析，点击右侧列表站内解析' style='width:50px'id="+id_random+">";
				play_wrap_html += "<div style='position:fixed;left:50px;top:180px;z-index:9999999999;overflow: hidden;width:300px;display:none'class='playLineDiv'>"
				play_wrap_html += "<div style='width:320px;height:316px;overflow-y:scroll;overflow-x:hidden'>";
                play_wrap_html += "<table class='playLineTabel' style='width:300px;border-spacing:5px;border-collapse:separate'><tr>";
                for(var playLineIndex=0 ;playLineIndex < play_line_json.length;playLineIndex++){

                    if((/(^[1-9]\d*$)/.test(playLineIndex/3))){

                        play_wrap_html +="<tr>";

                        play_wrap_html += "<td class='playLineTd' id='"+play_line_json[playLineIndex].url+"' style='width:33%;color:#fff;text-align:center;background-color:#f24443;box-shadow:0px 0px 10px #fff;'>"+play_line_json[playLineIndex]['name']+"</td>";

                        continue;

                    }

                    play_wrap_html += "<td class='playLineTd' id='"+play_line_json[playLineIndex].url+"' style='width:33%;color:#fff;text-align:center;background-color:#f24443;box-shadow:0px 0px 10px #fff;'>"+play_line_json[playLineIndex]['name']+"</td>";

                    if((/(^[1-9]\d*$)/.test((playLineIndex+1)/3))){

                        play_wrap_html +="</tr>";

                    }


                }

                play_wrap_html += "</tr></table>";

                play_wrap_html +="</div></div></div>";
console.log(play_wrap_html);
                $("body").append(play_wrap_html);

                $(".playButton").on("mouseover", () => {
                    $(".playLineDiv").show();
                });
                    $(".playButton").on("mouseout", () => {
                        $(".playLineDiv").hide();
                    })
                    $(".playLineTd").hover(function(){
                        $(this).css("color","#260033");
                        $(this).css("background-color","#fcc0c0");
                    },function(){
                        $(this).css("color","#fff");
                        $(this).css("background-color","#f24443");
                    });

                     var host = location.host;
        var node = "";
        var player_nodes = [
            { url:"v.qq.com", node:"#mod_player"},
            { url:"www.iqiyi.com", node:"#flashbox"},
            { url:"v.youku.com", node:"#player"},
            { url:"w.mgtv.com", node:"#mgtv-player-wrap"},
            { url:"www.mgtv.com", node:"#mgtv-player-wrap"},
            { url:"tv.sohu.com", node:"#player"},
            { url:"film.sohu.com", node:"#playerWrap"},
            { url:"www.le.com", node:"#le_playbox"},
            { url:"video.tudou.com", node:".td-playbox"},
            { url:"v.pptv.com", node:"#pptv_playpage_box"},
            { url:"vip.pptv.com", node:".w-video"},
            { url:"www.wasu.cn", node:"#flashContent"},
            { url:"www.acfun.cn", node:"#ACPlayer"},
            { url:"vip.1905.com", node:"#player"},
            {url:"play.tudou.com",node:"#player"},
            {url:"www.bilibili.com/video",node:"#bilibiliPlayer"},
            {url:"www.bilibili.com/bangumi",node:"#player_module"},

        ];
        for(var m in player_nodes) {

            if(get_url.indexOf(player_nodes[m].url)!= -1){

                node = player_nodes[m].node;

            }
        }
        console.log(node);
        $(".playLineTd").click(function(){

            var play_html = "<div style='width:100%;height:100%;'><iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='playIframe'></iframe></div>";

            $(node).html(play_html);

            var iframe_src= this.id+play_url;

            $("#playIframe").attr("src",iframe_src);

        });

		$("#"+id_random).click(function(){
			var play_jx_url = window.location.href;
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                var mobile_html = "<div style='margin:0 auto;padding:10px;'>";
                mobile_html +="<button type='button' style='position:absolute;top:0;right:30px;font-size:30px;line-height: 1;color: #000;text-shadow: 0 1px 0 #fff;cursor: pointer;border:0;background:0 0;' onclick='location.reload();'>×</button>";
                mobile_html += "<div><iframe src='https://www.eggvod.cn/mobile.php?zhm_jx="+play_jx_url +"' allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play'style='height:600px;width:100%'></iframe></div>"
                mobile_html += "</div>";
               $("body").html(mobile_html);
            } else {
                $.get('https://www.eggvod.cn/jxcode.php',{in:81516699,code:2},function(data){
                    location.href='https://www.eggvod.cn/jxjx.php?lrspm='+data+'&zhm_jx='+play_jx_url;
               });
            }
		});



			}
		}




        var music_id = Math.ceil(Math.random()*100000000);
		var music_title=new Array()
		music_title[0]="163.com"
		music_title[1]= "y.qq.com"
		music_title[2]= "kugou.com"
		music_title[3]= "kuwo.cn"
		music_title[4]= "xiami.com"
		music_title[5]= "taihe.com"
		music_title[6]= "1ting.com"
		music_title[7]= "migu.cn"
		music_title[8]= "qingting.fm"
		music_title[9]= "lizhi.fm"
		music_title[10]= "ximalaya.com"

		for(var i=0;i<music_title.length;i++){
			if(get_url.indexOf(music_title[i])!= -1){
				var music_html = "<div href='javascript:void(0)' id="+music_id+" style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;'><img src='data:image/gif;base64,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' title='在音乐单曲播放页面点击图标下载' style='width:50px' ></div>";
				$("body").append(music_html);
			}

		}

		$("#"+music_id).click(function(){

            var hostUrl = window.location.href;

            if(hostUrl.match(/music\.163\./)){

                if(hostUrl.match(/^https?:\/\/music\.163\.com\/#\/(?:song|dj)\?id/)) {

                    window.open('http://music.jpnet.cc/newmusic/?url='+encodeURIComponent(hostUrl.replace('/#','')));

                }else if(hostUrl.match(/^https?:\/\/y\.music\.163\.com\/m\/(?:song|dj)\?id/)) {

                     window.open('http://music.jpnet.cc/newmusic/?url='+encodeURIComponent('https://music.163.com/song?id='+getQueryString('id')));

                }else{
                  return false;
                }
            }else if(hostUrl.match(/y\.qq\.com/)){

                try {
                    document.querySelector("audio").pause();
                } catch (e) {}

                var qqSong = $('#sim_song_info').children("a").attr("href").match(/song\/(\S*).html/);
                window.open('http://music.jpnet.cc/newmusic/?id='+qqSong[1]+'&type=qq&playUrl='+encodeURIComponent(document.querySelector("audio").src));

            }else if(hostUrl.match(/kugou\.com/)){
                try {
                    document.querySelector("audio").pause();
                } catch (e) {}
                var kgSong = hostUrl.match(/hash=(\S*)&album/);
                window.open('http://music.jpnet.cc/newmusic/?id='+kgSong[1]+'&type=kugou&playUrl='+encodeURIComponent(document.querySelector("audio").src));
c
            }else if(hostUrl.match(/kuwo\.cn/)){

                try {
                    document.querySelector("audio").pause();
                } catch (e) {}
                var kwSong = hostUrl.match(/play_detail\/(\S*)/);
                console.log(kwSong);
                window.open('http://music.jpnet.cc/newmusic/?id='+kwSong[1]+'&type=kuwo&playUrl='+encodeURIComponent(document.querySelector("audio").src));

            }else if(hostUrl.match(/www\.xiami\.com/)){
                try {
                    document.querySelector("audio").pause();
                } catch (e) {}
                var xmSong = hostUrl.match(/song\/(\S*)/);
                console.log(xmSong);
                window.open('http://music.jpnet.cc/newmusic/?id='+xmSong[1]+'&type=xiami&playUrl='+encodeURIComponent(document.querySelector("audio").src));

            }else if(hostUrl.match(/www\.ximalaya\.com/)){
                var xmlyUrlArr = hostUrl.split("/");

                for(var xuaIndex =0;xuaIndex<xmlyUrlArr.length;xuaIndex++){

                    if(xuaIndex==xmlyUrlArr.length-1){

                        window.open('http://music.jpnet.cc/newmusic/?id='+xmlyUrlArr[xuaIndex]+'&type=xmly&playUrl='+encodeURIComponent(hostUrl));

                    }

                }
            }else if(hostUrl.match(/music\.taihe\.com/)){
                return false;
            }else{
                 return false;

            }

		});


	}

	//获取url参数;
	function getQueryString(e) {
		var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
		var a = window.location.search.substr(1).match(t);
		if (a != null) return a[2];
		return "";
	}
})();

//知乎视频
//
(async () => {
    if (window.location.host == 'www.zhihu.com') return;

    const playlistBaseUrl = 'https://lens.zhihu.com/api/videos/';
    //const videoBaseUrl = 'https://video.zhihu.com/video/';
    const videoId = window.location.pathname.split('/').pop(); // 视频id
    const menuStyle = 'transform:none !important; left:auto !important; right:-0.5em !important;';
    const playerId = 'player';
    const coverSelector = '#' + playerId + ' > div:first-child > div:first-child > div:nth-of-type(2)';
    const controlBarSelector = '#' + playerId + ' > div:first-child > div:first-child > div:last-child > div:last-child > div:first-child';
    const svgDownload = '<path d="M9.5,4 H14.5 V10 H17.8 L12,15.8 L6.2,10 H9.5 Z M6.2,18 H17.8 V20 H6.2 Z"></path>';
    let player = document.getElementById(playerId);
    let resolutionMap = {'标清': 'sd', '高清': 'ld', '超清': 'hd'};
    let videos = []; // 存储各分辨率的视频信息
    let downloading = false;

    function getBrowerInfo() {
        let browser = (function (window) {
            let document = window.document;
            let navigator = window.navigator;
            let agent = navigator.userAgent.toLowerCase();
            // IE8+支持.返回浏览器渲染当前文档所用的模式
            // IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
            // IE10:10(兼容模式7||8||9)
            let IEMode = document.documentMode;
            let chrome = window.chrome || false;
            let system = {
                // user-agent
                agent: agent,
                // 是否为IE
                isIE: /trident/.test(agent),
                // Gecko内核
                isGecko: agent.indexOf('gecko') > 0 && agent.indexOf('like gecko') < 0,
                // webkit内核
                isWebkit: agent.indexOf('webkit') > 0,
                // 是否为标准模式
                isStrict: document.compatMode === 'CSS1Compat',
                // 是否支持subtitle
                supportSubTitle: function () {
                    return 'track' in document.createElement('track');
                },
                // 是否支持scoped
                supportScope: function () {
                    return 'scoped' in document.createElement('style');
                },

                // 获取IE的版本号
                ieVersion: function () {
                    let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
                    let match = rMsie.exec(agent);
                    try {
                        return match[2];
                    } catch (e) {
                        return IEMode;
                    }
                },
                // Opera版本号
                operaVersion: function () {
                    try {
                        if (window.opera) {
                            return agent.match(/opera.([\d.]+)/)[1];
                        }
                        else if (agent.indexOf('opr') > 0) {
                            return agent.match(/opr\/([\d.]+)/)[1];
                        }
                    } catch (e) {
                        return 0;
                    }
                }
            };

            try {
                // 浏览器类型(IE、Opera、Chrome、Safari、Firefox)
                system.type = system.isIE ? 'IE' :
                    window.opera || (agent.indexOf('opr') > 0) ? 'Opera' :
                        (agent.indexOf('chrome') > 0) ? 'Chrome' :
                            //safari也提供了专门的判定方式
                            window.openDatabase ? 'Safari' :
                                (agent.indexOf('firefox') > 0) ? 'Firefox' :
                                    'unknow';

                // 版本号
                system.version = (system.type === 'IE') ? system.ieVersion() :
                    (system.type === 'Firefox') ? agent.match(/firefox\/([\d.]+)/)[1] :
                        (system.type === 'Chrome') ? agent.match(/chrome\/([\d.]+)/)[1] :
                            (system.type === 'Opera') ? system.operaVersion() :
                                (system.type === 'Safari') ? agent.match(/version\/([\d.]+)/)[1] :
                                    '0';

                // 浏览器外壳
                system.shell = function () {
                    if (agent.indexOf('edge') > 0) {
                        system.version = agent.match(/edge\/([\d.]+)/)[1] || system.version;
                        return 'Edge';
                    }
                    // 遨游浏览器
                    if (agent.indexOf('maxthon') > 0) {
                        system.version = agent.match(/maxthon\/([\d.]+)/)[1] || system.version;
                        return 'Maxthon';
                    }
                    // QQ浏览器
                    if (agent.indexOf('qqbrowser') > 0) {
                        system.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || system.version;
                        return 'QQBrowser';
                    }
                    // 搜狗浏览器
                    if (agent.indexOf('se 2.x') > 0) {
                        return '搜狗浏览器';
                    }

                    // Chrome:也可以使用window.chrome && window.chrome.webstore判断
                    if (chrome && system.type !== 'Opera') {
                        let external = window.external;
                        let clientInfo = window.clientInformation;
                        // 客户端语言:zh-cn,zh.360下面会返回undefined
                        let clientLanguage = clientInfo.languages;

                        // 猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                        if (external && 'LiebaoGetVersion' in external) {
                            return 'LBBrowser';
                        }
                        // 百度浏览器
                        if (agent.indexOf('bidubrowser') > 0) {
                            system.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                                agent.match(/chrome\/([\d.]+)/)[1];
                            return 'BaiDuBrowser';
                        }
                        // 360极速浏览器和360安全浏览器
                        if (system.supportSubTitle() && typeof clientLanguage === 'undefined') {
                            let storeKeyLen = Object.keys(chrome.webstore).length;
                            let v8Locale = 'v8Locale' in window;
                            return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                        }
                        return 'Chrome';
                    }
                    return system.type;
                };

                // 浏览器名称(如果是壳浏览器,则返回壳名称)
                system.name = system.shell();
                // 对版本号进行过滤过处理
                // System.version = System.versionFilter(System.version);

            } catch (e) {
                // console.log(e.message);
            }

            return system;

        })(window);

        if (browser.name == undefined || browser.name == '') {
            browser.name = 'Unknown';
            browser.version = 'Unknown';
        }
        else if (browser.version == undefined) {
            browser.version = 'Unknown';
        }
        return browser;
    }

    function fetchRetry(url, options = {}, times = 1, delay = 1000, checkStatus = true) {
        return new Promise((resolve, reject) => {
            // fetch 成功处理函数
            function success(res) {
                if (checkStatus && !res.ok) {
                    failure(res);
                }
                else {
                    resolve(res);
                }
            }

            // 单次失败处理函数
            function failure(error) {
                times--;

                if (times) {
                    setTimeout(fetchUrl, delay);
                }
                else {
                    reject(error);
                }
            }

            // 总体失败处理函数
            function finalHandler(error) {
                throw error;
            }

            function fetchUrl() {
                return fetch(url, options)
                    .then(success)
                    .catch(failure)
                    .catch(finalHandler);
            }

            fetchUrl();
        });
    }

    // 下载指定url的资源
    async function downloadUrl(url, name = (new Date()).valueOf() + '.mp4') {
        let browser = getBrowerInfo();

        // Greasemonkey 需要把 url 转为 blobUrl
        if (GM_info.scriptHandler == 'Greasemonkey') {
            let res = await fetchRetry(url);
            let blob = await res.blob();
            url = URL.createObjectURL(blob);
        }

        // Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制
        if (window.GM_download) {
            GM_download({url, name});
        }
        else {
            // firefox 需要禁用 CSP, about:config -> security.csp.enable => false
            let a = document.createElement('a');
            a.href = url;
            a.download = name;
            // a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(function () {
                URL.revokeObjectURL(url);
            }, 100);
        }
    }

    function humanSize(size) {
        let n = Math.log(size) / Math.log(1024) | 0;
        return (size / Math.pow(1024, n)).toFixed(0) + ' ' + (n ? 'KMGTPEZY'[--n] + 'B' : 'Bytes');
    }

    if (!player) return;

    // 获取视频信息
    const res = await fetchRetry(playlistBaseUrl + videoId, {
        headers: {
            'referer': 'refererBaseUrl + videoId',
            'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20' // in zplayer.min.js of zhihu
        }
    }, 3);
    const videoInfo = await res.json();

    // 获取不同分辨率视频的信息
    for (let [key, video] of Object.entries(videoInfo.playlist)) {
        video.name = key;

        if (!videos.find(v => v.width == video.width)) {
            videos.push(video);
        }
    }

    // 按分辨率大小排序
    videos = videos.sort(function (v1, v2) {
        return v1.width == v2.width ? 0 : (v1.width > v2.width ? 1 : -1);
    }).reverse();

    document.addEventListener('DOMNodeInserted', (evt) => {
        let domControlBar = evt.relatedNode.querySelector(':scope > div:last-child > div:first-child');
        if (!domControlBar || domControlBar.querySelector('.download')) return;

        let domFullScreenBtn = domControlBar.querySelector(':scope > div:nth-last-of-type(1)');
        let domResolutionBtn = domControlBar.querySelector(':scope > div:nth-last-of-type(3)');
        let domDownloadBtn, defaultResolution, buttons;
        if (!domFullScreenBtn || !domFullScreenBtn.querySelector('button')) return;

        // 克隆分辨率菜单或全屏按钮为下载按钮
        domDownloadBtn = (domResolutionBtn && (domResolutionBtn.className == domFullScreenBtn.className))
            ? domResolutionBtn.cloneNode(true)
            : domFullScreenBtn.cloneNode(true);

        defaultResolution = domDownloadBtn.querySelector('button').innerText;

        // 生成下载按钮图标
        domDownloadBtn.querySelector('button:first-child').outerHTML = domFullScreenBtn.cloneNode(true).querySelector('button').outerHTML;
        domDownloadBtn.querySelector('svg').innerHTML = svgDownload;
        domDownloadBtn.className = domDownloadBtn.className + ' download';

        buttons = domDownloadBtn.querySelectorAll('button');

        // button 元素添加对应的下载地址
        buttons.forEach(dom => {
            let video = videos.find(v => v.name == resolutionMap[dom.innerText || defaultResolution]);
            video = video || videos[0];
            dom.dataset.video = video.play_url;
            if (dom.innerText) {
                (dom.innerText = `${dom.innerText} (${humanSize(video.size)})`);
            }
            else if (buttons.length == 1) {
                dom.nextSibling.querySelector('div').innerText = humanSize(video.size);
            }
        });

        // 鼠标事件 - 显示菜单
        domDownloadBtn.addEventListener('pointerenter', () => {
            let domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
            if (domMenu) {
                domMenu.style.cssText = menuStyle + 'opacity:1 !important; visibility:visible !important';
            }
        });

        // 鼠标事件 - 隐藏菜单
        domDownloadBtn.addEventListener('pointerleave', () => {
            let domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
            if (domMenu) {
                domMenu.style.cssText = menuStyle;
            }
        });

        // 鼠标事件 - 选择菜单项
        domDownloadBtn.addEventListener('pointerup', event => {
            if (downloading) {
                alert('当前正在执行下载任务，请等待任务完成。');
                return;
            }

            let e = event.srcElement || event.target;

            while (e.tagName != 'BUTTON') {
                e = e.parentNode;
            }

            downloadUrl(e.dataset.video);
        });

        // 显示下载按钮
        domControlBar.appendChild(domDownloadBtn);

    });
})();