// ==UserScript==
//www.23txt.com  去广告
// @name         百度文库破解加强、 CSDN阅读增强、知乎使用增强、抖音去水印原视频下载、全网VIP视频破解，去广告
// @namespace    congcongguoke_baiduwenku_script
// @version      2.0.0
// @description  【自用，长期维护】【功能有】1：百度文库文档免费下载、文档内容自由复制、广告过滤，看了就烦；2：CSDN阅读加强：CSDN自动展开、去广告、净化剪贴板、免登陆等；3：知乎使用增强：外链接直接跳出、内容自动展开、短视频下载、去除登录提醒、自动高清图片等；4：抖音去水印原视频下载，非调用第三方；5：KIWI视频解析，支持大部分视频播放平台[支持优酷 | 腾讯 | 爱奇艺 | 芒果 | 乐视等常用视频]，移动端，PC端都适用
// @author       匆匆过客、gorgiaxx、王超
// @include      *://wenku.baidu.com/*
// @include      *://www.tool77.com/*

// @include      *://www.iesdouyin.com/share/video/*

// @include      *://*.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *://video.zhihu.com/video/*

// @include      *://blog.csdn.net/*/article/details/*
// @include      *://*.blog.csdn.net/article/details/*
// @include      *://bbs.csdn.net/topics/*
// @include      *://*.iteye.com/blog/*

// @include      *://*.youku.com/v_*
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.le.com/ptv/vplay/*
// @include      *://v.qq.com/x/cover/*
// @include      *://v.qq.com/x/page/*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.mgtv.com/b/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/v/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://*.baofeng.com/play/*
// @include      *://vip.pptv.com/show/*
// @include      *://v.pptv.com/show/*

// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @connect      www.iesdouyin.com
// @connect      ixigua.com
// @connect      aweme.snssdk.com
// @connect      zhihu.com
// @connect      vzuu.com
// @grant        GM_info
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';	
    var $ = $ || window.$;
    var window_url = window.location.href;
    var website_host = window.location.host;
	
	//iframe中不再执行
	if(window.top != window.self){
    	return;
    }
	
	//--百度文库开始
	var baiduwenkuHelper={};
	baiduwenkuHelper.wenkudownloadUrl = "http://www.tool77.com/wenku";
	baiduwenkuHelper.removeAD=function(){
    	if(website_host.indexOf("wenku.baidu.com") != -1){
		    setInterval(function(){
		    	$(".banner-ad").hide();
		    	$(".union-ad-bottom").hide();
		    	$("iframe").hide();
		    	
		    	//VIP去广告小按钮
		    	$(".ggbtm-vip-close").hide();
		    	$(".ad-vip-close-bottom").hide();
		    	$(".ad-vip-close").hide();
		    	
		    	//搜索页面
		    	$("#fengchaoad").hide();
		    	$(".search-aside-adWrap").hide();
		    },300);
	    }
	};
	baiduwenkuHelper.generateHtml=function(){
		var $that = this;
    	if(window_url.indexOf("wenku.baidu.com/view")==-1 || website_host!="wenku.baidu.com"){
    		return;
    	}
    	var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:40%;left:0px;'>"+
						"<div id='baiduwenku_helper_download_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#25AE84;'>下载</div>"+
						"<div id='baiduwenku_helper_copyall_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#FE8A23;'>复制</div>"+
				 	 "</div>";
		$("body").append(topBox);
    	
    	//为每一页添加复制按钮
		var onePageCopyContentHtml = '<div class="baiduwenku_helper_copy_onepage" style="float:left;padding:3px 8px;background:green;z-index:999;position:relative;top:60px;color:#fff;background-color:#FE8A23;font-size:13px;cursor:pointer;">复制此页面内容</div>'; 
		$('.mod.reader-page.complex, .ppt-page-item, .mod.reader-page-mod.complex').each(function() {
			$(this).prepend(onePageCopyContentHtml);
		});
		
		//复制全部文档内容
		$("body").on("click","#baiduwenku_helper_copyall_btn",function(){
	    	$that.copybaiduWenkuAll();
	    });
	    
	    //复制每一页内容
	    $("body").on("click",".baiduwenku_helper_copy_onepage",function(){
	    	var $inner = $(this).parent(".mod").find(".inner")
	    	$that.copybaiduWenkuOne($inner);
	    });
		
		//解析下载
	    $("body").on("click","#baiduwenku_helper_download_btn",function(){
	    	GM_setValue("wenku_helper_url_key",window_url);
	    	GM_openInTab($that.wenkudownloadUrl, { active: true });
	    });
   	};
    baiduwenkuHelper.showBaiduCopyContentBox=function(str){
    	var ua = navigator.userAgent;
    	var opacity = '0.95';
		if (ua.indexOf("Edge") >= 0) {
		    opacity = '0.6';
		} else{
		    opacity = '0.95';
		}
    	var copyTextBox = '<div id="baiduwenku_helper_copy_text_box" style="width:100%;height:100%;position: fixed;z-index: 9999;display: block;top: 0px;left: 0px;background:rgba(255,255,255,' + opacity + ');-webkit-backdrop-filter: blur(20px);display: flex;justify-content:center;align-items:center;">'+
    						'<div id="baiduwenku_helper_copy_box_close" style="width:100%;height:100%;position:fixed;top:0px;left:0px;"></div>'+
    					  	'<pre id="baiduwenku_helper_copy_text_content" style="width:60%;font-size:16px;line-height:22px;z-index:10000;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break:break-all;max-height:70%;overflow:auto;"></pre>'+
    					  '</div>"';
    	$('#baiduwenku_helper_copy_text_box').remove();
	    $('body').append(copyTextBox);
	    $('#baiduwenku_helper_copy_text_content').html(str);
	    $('#baiduwenku_helper_copy_box_close').click(function() {
	       $('#baiduwenku_helper_copy_text_box').remove();
	    });
   	};
   	baiduwenkuHelper.showDialog=function(str){
   		var dialogHtml = '<div id="baiduwenku_helper_dialog" style="margin:0px auto;opacity:0.8;padding:5px 10px;position:fixed;z-index: 10001;display: block;bottom:30px;left:44%;color:#fff;background-color:#CE480F;font-size:13px;border-radius:3px;">'+str+'</div>';
   		$('#baiduwenku_helper_dialog').remove();
	    $('body').append(dialogHtml);
	    setTimeout(function(){
	    	$('#baiduwenku_helper_dialog').remove();
	    }, 1500);
   	}
    baiduwenkuHelper.copybaiduWenkuAll=function(){
    	this.copybaiduWenkuOne($(".inner"));
    };
    baiduwenkuHelper.copybaiduWenkuOne=function($inner){
    	var $that = this;
		var str = "";  //提取文字
		
		$inner.find('.reader-word-layer').each(function(){
			str += $(this).text().replace(/\u2002/g, ' ');
		});
		$inner.find('.p-txt').each(function(){
			str += $(this).text().replace(/\u2002/g, ' ');
		});
		str = str.replace(/。\s/g, '。\r\n');
		
		//提取css中的图片
		var picHtml = "";
		var picUrlReg = /\(((\'|\")?https.*?)\)/i;
		var cssUrl = "";
		var picNum = 0;
		var picUrlLengthMin = 65;
		var picTemplate = "<div style='margin:10px 0px;text-align:center;'><img src='@' width='90%'><div>____图(#)____</div></div>";
		$inner.find('.reader-pic-item').each(function(){
			cssUrl= $(this).css("background-image");
			if(!!cssUrl && (cssUrl.indexOf("https")!=-1 || cssUrl.indexOf("HTTPS")!=-1)){
				var array = cssUrl.match(picUrlReg);
				if(array.length>1){
					cssUrl = array[1].replace(/\"/g, "");
					if(!!cssUrl && cssUrl.length>picUrlLengthMin){
						picNum ++;
						var onePic = picTemplate;
						onePic = onePic.replace(/#/g,picNum);
						onePic = onePic.replace(/@/g,cssUrl);
						picHtml += onePic;
					}
				}
			}
		});
		
		var srcUrl = "";
		$inner.find('img').each(function(){
			srcUrl = $(this).attr("src");
			if(!!srcUrl && srcUrl.length>picUrlLengthMin && srcUrl.indexOf("https://wkretype")!=-1){
				picNum ++;
				var onePic = picTemplate;
				onePic = onePic.replace(/#/g,picNum);
				onePic = onePic.replace(/@/g,srcUrl);
				picHtml += onePic;
			}
		});
		
		//追加内容
		var contentHtml = str+picHtml;
		if(!!contentHtml && contentHtml.length>0){
			if(picNum!=0){
				contentHtml = str+"<div style='color:red;text-align:center;margin-top:20px;'>文档中的图片如下：(图片可右键另存为)</div>"+picHtml;
			}
			$that.showBaiduCopyContentBox(contentHtml);
		}else{
			$that.showDialog("提取文档内容失败了");
		}
    };
	baiduwenkuHelper.start=function(){
		this.generateHtml();
		this.removeAD();
	};
	baiduwenkuHelper.start();
	
	var wenkuHelper={};
	wenkuHelper.autoDownload=function(){
		if(window_url.indexOf("www.tool77.com/wenku")!=-1){
			var wenkuHelperUrl = GM_getValue("wenku_helper_url_key");
			if(!!wenkuHelperUrl){
				$("#url-input").val(wenkuHelperUrl);
				GM_setValue("wenku_helper_url_key","");
			}
		}
	};
	wenkuHelper.autoDownload();

	//--抖音解析开始
	var douyingHelper={};
	douyingHelper.generateHtml = function(){
		var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:40%;left:0px;'>"+
						"<div id='douyin_helper_download_btn' style='font-size:12px;padding:8px 2px;width:100px;text-align:center;color:#FFF;background-color:#F93A60;'>"+
						"<a style='color:#FFFFFF;' href='javascript:void(0);' target='_blank'>准备中</a></div>"+
				 	 "</div>";
		$("body").append(topBox);
	};
	douyingHelper.isDouyin=function(){
		if(window_url.indexOf("www.iesdouyin.com/share/video")!=-1){
			return true;
		}
		return false;
	}
	douyingHelper.getItemIdAndDytk = function(){
		return new Promise(function(resolve, reject){
			GM_xmlhttpRequest({
				url: window_url,
			  	method: "post",
			  	headers: {
			  		'User-agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
        			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			  	},
			  	onload: function(response) {
					var status = response.status;
					if(status==200||status=='200'){
						var responseText = response.responseText;
						if(!!responseText){
							var itemIdReg = /itemId: "(.*?)",/g;
							var dytkReg= /dytk: "(.*?)"/g;
							var valueReges = /"(.+?)"/g;
							var itemIdText = responseText.match(itemIdReg);
							var dytkText = responseText.match(dytkReg);
							var itemId=null,dytk=null;
							try{
								itemId = itemIdText[0].match(valueReges)[0].replace(/"/g,"");
								dytk = dytkText[0].match(valueReges)[0].replace(/"/g,"");
							}catch(e){}
							if(!!itemId && !!dytk){
								resolve({"status":"success", "itemId":itemId, "dytk":dytk});
							}
						}
					}
					reject({"status":"error"}); 
			  	}
			});
		});
	};
	douyingHelper.getDownloadUrl=function(){
		var $that = this;
		return new Promise(function(resolve, reject){
			$that.getItemIdAndDytk().then((data)=>{
				var getDataUrl="https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids="+data.itemId+"&dyth="+data.dytk;
				GM_xmlhttpRequest({
					url: getDataUrl,
				  	method: "get",
				  	headers: {
				  		'User-agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
	        			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				  	},
				  	onload: function(response) {
						var status = response.status;
						if(status==200||status=='200'){
							var responseText = response.responseText;
							if(!!responseText){
								try{
									var jsonObjeect = JSON.parse(responseText);
									var item_list = jsonObjeect["item_list"][0]["video"]["play_addr"]["url_list"][0];
									resolve({"status":"success", "playerUrl":item_list})
								}catch(e){}
							}
						}
						reject({"status":"error"});
				  	}
				});
			}).catch((error)=>{
				reject({"status":"error"});
			});
		});
	};
	douyingHelper.getPlayerUrl=function(){
		this.getDownloadUrl().then((data)=>{
			var playerUrl = data.playerUrl;
			var $a = $("#douyin_helper_download_btn").find("a");
			GM_xmlhttpRequest({
				url: playerUrl,
			  	method: "get",
			  	headers: {
			  		'User-agent': 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			  	},
			  	onload: function(response) {
					var status = response.status;
					if(status==200||status=='200'){
						var finalUrl = response.finalUrl;
						if(!!finalUrl){
							$a.text("点我下载");
							$a.attr("href",finalUrl);
						}else{
							$a.text("出错了");
						}
					}
			  	}
			});
			
		}).catch((error)=>{$a.text("出错了");});
	};
	douyingHelper.start=function(){
		if(this.isDouyin()){
			this.generateHtml();
			this.getPlayerUrl();
		}
	}
	douyingHelper.start();
	
	//--VIP视频破解开始
	var VIPVIDEO={};
	VIPVIDEO.analysisWebsite="http://kiwi8.top/mov/s?url=";
	VIPVIDEO.judgeVipWebsite=function(){
		var isVip = false;
		var host = window.location.host;
		var vipWebsites = ["iqiyi.com","v.qq.com","youku.com", "le.com","tudou.com","mgtv.com","sohu.com",
			"acfun.cn","bilibili.com","baofeng.com","pptv.com"];
   		for(var b=0; b<vipWebsites.length; b++){
	   		if(host.indexOf(vipWebsites[b]) != -1){
	   			isVip = true;
	   			break;
	   		}
	   	}
   		return isVip;
	};
	VIPVIDEO.addStyle=function(){
		var innnerCss = 
		`
		#plugin_kiwi_analysis_vip_movie_box{position:fixed; top:310px; left:0px; width:25px; background-color:#BC2405;z-index:9999999899999;}
		#plugin_kiwi_analysis_vip_movie_box >.plugin_item{cursor:pointer; width:25px;height:35px;text-align:center;line-height:35px;}
		#plugin_kiwi_analysis_vip_movie_box >.plugin_item >img{width:18px;display: inline-block; vertical-align: middle;}
		`;
		$("body").prepend("<style>"+innnerCss+"</style>");
	};
	VIPVIDEO.generateHtml=function(){
		var html="";
		var vipImgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmUlEQVRoQ+2ZMU7FMAyGf4sLcAAYWVlZWVnYYIWNFVhBAi4ARwBmNk7AURi4x4+MUhSVVKpbJ3kR6Vj1uf78O7brJ2j8ksb9RweorWBXYGMVIMnazsXvF5FktkymUAdwlm+VAlM/dvbxj7k4CzpA7min7GdXgOQzgAcR+cwBWAJAS606rxAv3hClAAa/FcBVjdIACuKqRg0AVzVqArioURrgHMANgL3RYV58NooCaKckuRsgLkYQi85GcYDBaZKnAWR/jRrVANRpktsA7gBcLlWjKkCkxlEAObCqsREAQY0tAPcAbi1qdIAhWlOz+JwIkWwzhZo+xM2W0aYbGYC2R4nEx8yi8SG2M6dIzNoLzalC1iYV+sMOgBMAxwDeAbyJyFfUBH+Xa1m2EonllynqJB8BXEXwTyJyXQvAPDantn9xpEulkCnqoxzX8UIHvuHSb2q993OVAFi1ViF5COAsVDBV8FVEPooBJCqP663sCrh6mzDWAXJH2GJ/VR+wvCjXs/8PIFckve32v1m9I2q11xWwRsz7+eYV+Ab7MtpAiP16ugAAAABJRU5ErkJggg==";
		html+= "<div id='plugin_kiwi_analysis_vip_movie_box'>";
		html+= "<div class='plugin_item jump_analysis_website' title='VIP视频破解'><img src='"+vipImgBase64+"'></div>";
		html+= "</div>";
		$("body").append(html);
	};
	VIPVIDEO.operation=function(){
		$("body").on("click", "#plugin_kiwi_analysis_vip_movie_box .jump_analysis_website", function(){
			var jumpWebsite=VIPVIDEO.analysisWebsite+window_url;
			//GM_openInTab(jumpWebsite, { active: true });
			window.location.href=jumpWebsite;
		});
	};
	VIPVIDEO.start=function(){
    	if(VIPVIDEO.judgeVipWebsite() && window.top==window.self){
    		VIPVIDEO.addStyle();
			VIPVIDEO.generateHtml();
			VIPVIDEO.operation();
    	}
    };
	VIPVIDEO.start();
	
	//--知乎助手开始
	var zhihuHelper={};
	zhihuHelper.start = function(){
	    if(website_host == "link.zhihu.com"){  //直接跳转到目标网页
	    	var regRet = location.search.match(/target=(.+?)(&|$)/);
	    	if(regRet && regRet.length==3){
	    		location.href = decodeURIComponent(regRet[1]);
	    	}
		}else if(website_host.indexOf("zhihu.com")!=-1){  //知乎正文
	    	
	    	//自动展开问题全部信息,同时展示所有回答
		    if(window_url.indexOf("https://www.zhihu.com/question/") != -1) {
		        autoExpandQuestionInfo();
		    }
		    function autoExpandQuestionInfo() {
		    	$('.Button.QuestionRichText-more.Button--plain').click();
		        var moreAnswers = $('.QuestionMainAction');
		        if(moreAnswers.length > 0) {
		            moreAnswers[0].click();
		        }
		    }
		    
		    //去除首页广告
		    function clearAdvert() {
		    	$(".Pc-card").each(function(){
		    		if($(this).find(".Banner-adTag").length != 0){
		    			$(this).remove();
		    		}
		    	});
		    }
	        
	        //去除登录提示
	        document.querySelector('body').addEventListener('DOMNodeInserted',function(e){
		        if(e.target.getElementsByClassName('signFlowModal').length!==0){
		            e.target.getElementsByClassName('Modal-backdrop')[0].click();
		        }
		    });
		    
		    //更改为直接高清显示
		    function changeHeightQualityPic(){
		    	$("body").find("img").each(function(){
		    		var dataoriginal = $(this).attr("data-original");
		    		if(!!dataoriginal){
		    			$(this).attr("src", dataoriginal);
		    		}
		    	});
		    }
		    
		    setInterval(function(){  //定时循环处理
		    	clearAdvert();
		    	changeHeightQualityPic();
		    }, 500);
		}
	};
	zhihuHelper.start();
	
})();

//下载知乎视频，作者：王超， 脚本链接：https://greasyfork.org/zh-CN/scripts/39206
//版本：1.18
//版权归原作者所有
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

//https://greasyfork.org/zh-CN/scripts/372452
//版本：1.3.2
//名称：CSDN自动展开+去广告+净化剪贴板+免登陆
//作者：gorgiaxx
(function () {
    'use strict';
    var currentURL = window.location.href;
    // 根据网速自己设置时间间隔
	var interval = 3000;
	var sideInterval = 4000;
	var bbsInterval = 3000; // 在ADBlock之后运行
	var iteyeInterval = 100;
    var blog = /article/;
    var bbs = /topics/;
    var iteye = /iteye/;
    //若为CSDN论坛,则：
    if(bbs.test(currentURL)){
        setTimeout(function () {
            $(".js_show_topic").click();
            document.getElementsByClassName("pulllog-box")[0].remove(); // 底部广告
            $(".mediav_ad").remove();       // 帖子尾部广告
            $(".post_recommend").remove();  // 帖子内[CSDN推荐]
            $(".ad_item").remove(); // 右侧广告
        }, bbsInterval);
    }else if (blog.test(currentURL)){
        csdn.copyright.init("", "", ""); //去除剪贴板劫持
        localStorage.setItem("anonymousUserLimit", ""); // 免登陆
        if (document.getElementsByClassName("btn-readmore")[0]){
            document.getElementsByClassName("btn-readmore")[0].click();
        } //自动展开
        if (document.getElementsByClassName("hide-article-box")[0]){
            document.getElementsByClassName("hide-article-box")[0].remove();
            document.getElementById("content_views").setAttribute("style", "user-select: text;")
        } //移除专栏
        if (document.getElementsByClassName("comment-list-box")[0]){
            document.getElementsByClassName("comment-list-box")[0].removeAttribute("style");
        } //自动展开
        $("#content_views").unbind("click");//移除url拦截
        setTimeout(function () {
            if (document.getElementsByClassName("csdn-tracking-statistics mb8 box-shadow")[0]) {
                document.getElementsByClassName("csdn-tracking-statistics mb8 box-shadow")[0].remove(); //左上广告
            }
            document.getElementById("asideFooter").remove();
            if (document.getElementById("adContent")) {
                document.getElementById("adContent").remove();
            }
            if (document.getElementsByClassName("p4course_target")[0]) {
                document.getElementsByClassName("p4course_target")[0].remove(); //左上广告
            }
            document.getElementsByClassName("bdsharebuttonbox")[0].remove();
            document.getElementsByClassName("vip-caise")[0].remove();
            if (document.getElementsByClassName("fourth_column")[0]) {
                document.getElementsByClassName("fourth_column")[0].remove(); //左上广告
            }
        }, interval);
        setTimeout(function () {
            if ($("div[id^='dmp_ad']")[0]) {
                $("div[id^='dmp_ad']")[0].remove();
            }
            if (document.getElementsByClassName("fourth_column")[0]) {
                document.getElementsByClassName("fourth_column")[0].remove();
            }
        }, sideInterval);
        setTimeout(function () {
            if (document.getElementsByClassName("pulllog-box")[0]) {
                document.getElementsByClassName("pulllog-box")[0].remove(); // 底部广告
            }
            var recommendObj = document.getElementsByClassName("recommend-fixed-box")[0].getElementsByClassName("right-item");
            for (var h = (recommendObj.length - 1); h>=0; h--) {
                if (recommendObj[h].tagName == "DIV") {
                    recommendObj[h].remove();
                }
            }
            if (document.getElementsByClassName("p4course_target")[0]) {
                document.getElementsByClassName("p4course_target")[0].remove();
            }
        }, sideInterval);
        setTimeout(function () {
            var hot = document.getElementsByClassName("type_hot_word");
            var recommend = document.getElementsByClassName("recommend-ad-box");
            for (var i = (hot.length - 1); i >= 0; i--) {
                hot[i].remove();
            }
            for (var j = (recommend.length - 1); j >= 0; j--) {
                recommend[j].remove();
            }
            if (document.getElementsByClassName("fourth_column")[0]) {
                document.getElementsByClassName("fourth_column")[0].remove();
            }
        }, sideInterval);
        setTimeout(function () {
            for(var x=470; x<490; x++){
                var kp_box = document.getElementById("kp_box_"+x); //右侧广告
                if(kp_box) {
                    kp_box.remove();
                }
            }
        }, 5000);
    } else if (iteye.test(currentURL)) {
        setInterval(function(){
            document.getElementById('btn-readmore').click();
        }, iteyeInterval);
        setTimeout(function () {
            document.getElementsByClassName("blog-sidebar")[0].remove();
            document.getElementById('main').style.width = '1000px';
        }, sideInterval);
    }
})();
