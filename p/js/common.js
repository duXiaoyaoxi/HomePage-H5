var notice = null;
function getCurrentCity(info){
	var qq = ['2853126133,2853126134,2853126135|四川','2853126137,2853126138,2853126139|北京','2853126141,2853126142|广东','2853126147,2853126148|上海','2853126150,2853126151|河南','2853126154|湖南','2853126155|山东','2853126156,2853126157,2853126158,2853126159,2853126160,2853126161,2853126162|江苏'];
	var local = ['2853126156,2853126157,2853126158,2853126159,2853126160,2853126161,2853126162'];
	var tq = local[parseInt((local.length - 1)*Math.random())];
	for(var i = 0; i < qq.length; i++){
		var tmp = qq[i].split('|');
		
		if(info.province == tmp[1]){
			var qs = tmp[0].split(',');
			tq = qs[parseInt((qs.length - 1)*Math.random())];
		}
	}
	$('.shortcut .contact .cpzx a').attr('href','http://wpa.qq.com/msgrd?v=3&uin=' + tq + '&site=qq&menu=yes');
}

function initShortcut(){
	var html = [];
	html.push('<ul class="shortcut">');
		html.push('<li class="focus">');
			html.push('<span class="shortcut-text" title="关注我们">关注我们</span>');
			html.push('<div class="shortcut-inner ss">');
				html.push('<div class="shortcut-box">');
					html.push('<div class="shortcut-arrow"></div>');
					html.push('<div class="shortcut-item weixin">');
						html.push('<h4 class="shortcut-item-title">企+微信</h4>');
						html.push('<div class="shortcut-item-pic"></div>');
						html.push('<p>扫一扫</p>');
					html.push('</div>');
				html.push('</div>');
			html.push('</div>');
		html.push('</li>');
		if(notice && notice.message){	
			html.push('<li class="notice active">');
				html.push('<span class="shortcut-text" title="通知公告">通知公告</span>');
				html.push('<div class="shortcut-inner">');
					html.push('<div class="shortcut-box">');
						html.push('<div class="shortcut-arrow"></div>');
						html.push('<div class="notice-icon"><div class="notice-icon-shadow"></div><div class="notice-icon-round"></div><div class="notice-icon-i"></div></div>');
						html.push('<div class="notice-text">');
							html.push('<p>' + notice.message + '</p>');
						html.push('</div>');
					html.push('</div>');
				html.push('</div>');
			html.push('</li>');
				
			$('.shortcut .notice').live('mouseover',function(){
				$(this).removeClass('active');
			});
		}
		
		html.push('<li class="contact">');
			html.push('<span class="shortcut-text" title="联系我们">联系我们</span>');
			html.push('<div class="shortcut-inner">');
				html.push('<div class="shortcut-box">');
					html.push('<div class="shortcut-arrow"></div>');
					html.push('<div class="shortcut-item cpzx">');
						html.push('<a href="javascript:0;" target="_blank">');
							html.push('<h4 class="shortcut-item-title">产品咨询</h4>');
							html.push('<div class="shortcut-item-pic"></div>');
						html.push('</a>');
					html.push('</div>');
					html.push('<div class="shortcut-item jszc">');
						html.push('<a href="javascript:0;" target="_blank">');
							html.push('<h4 class="shortcut-item-title">技术支持</h4>');
							html.push('<div class="shortcut-item-pic"></div>');
						html.push('</a>');
					html.push('</div>');
					html.push('<div class="clearfix"></div>');
					html.push('<h2 class="shortcut-tel">产品咨询：4001-025-365</h2>');
                                        html.push('<h2 class="shortcut-tel">技术支持：025-68736873</h2>');
				html.push('</div>');
			html.push('</div>');
		html.push('</li>');
		html.push('<li class="gotop" style="display:none;">');
			html.push('<span class="shortcut-text" title="回到顶部">回到顶部</span>');
		html.push('</li>');
	html.push('</ul>');
	
	$(html.join('')).appendTo('body');
	
	/*var jq = ['2853126123','2853126124','2853126125','2853126126'];
	
	$('.shortcut .contact .jszc a').attr('href','' + jq[parseInt((jq.length - 1)*Math.random())] + '');
	
	$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
	    getCurrentCity(remote_ip_info);
	});*/
	
	$('.shortcut .gotop').live('click',function(){
		$('html,body').animate({'scroll-top':0},'fast');
	});
}

function popWeiXin(){
	var html = [];
	html.push('<div id="weixin-pop">');
		html.push('<div class="pop-wrap">');
			html.push('<div class="pop-layout"></div>');
			html.push('<div class="pop-frame">');
				html.push('<div class="pop-con">');
					html.push('<div class="pop-title">');
						html.push('<span class="pop-close" onclick="javascript:$(\'#weixin-pop\').hide()">×</span>');
						html.push('<strong>官方微信二维码</strong>');
					html.push('</div>');
					html.push('<div class="pop-main" style="height:480px;">');
						html.push('<p>打开微信，点击右上角的“魔法棒”，选择“扫一扫”功能，对准下方二维码即可。</p>');
						html.push('<h2 class=" mt20" style="text-align:center"><img src="/p/images/index/weixin.jpg"></h2>');
					html.push('</div>');
				html.push('</div>');
			html.push('</div>');
		html.push('</div>');
	html.push('</div>');
	
	if($('#weixin-pop').size() > 0){
		$('#weixin-pop').show();
	}else{
		$('body').append(html.join(''));
	}
}

var p = getCodePath(request('r'));
if(p && p != 'null'){
	$.cookie('codepath',p,{path:'/'});
}
var c = $.cookie('codepath');
if(c){
	$('.footer .code').html('<img alt="" src="http://xiazai.qijia.com/' + c + '/code.png"/>');
}

function initSms(){
	$('.sms .sms-text').val('');
	
	$('.sms .sms-text').focus(function(){
		$(this).prev('.sms-placeholder').css('visibility','hidden');
	}).blur(function(){
		if($.trim($(this).val()) == ''){
			$(this).prev('.sms-placeholder').css('visibility','visible');
		}
	});
}

var count = 60;
var timer;
function countSms(){
    if (count <= 0) {
        $('.sms .send-btn').text('发送');
        clearInterval(timer);
    }
    else {
       $('.sms .send-btn').text('等待' + count + '秒');
        count --;
    }
}

function sendSms(){
	if($('.sms .send-btn').text() != '发送'){
		return ;
	}
	var tel = $('.sms .sms-text').val();
	if($.trim(tel) == ''){
		$('.sms .sms-info').text('请输入手机号码！');
		return ;
	}
	var reg = /^1[0-9]{10}$/;
	if(!reg.test(tel)){
		$('.sms .sms-info').text('手机号码不合法！');
		return ;
	}
	$('.sms .sms-info').text('');
	$.ajax({  
       	type: 'get', 
       	dataType: 'jsonp',
		jsonp:'callback',
       	url: '#',	
		data:{'moblie':tel,'ref':c},
       	success: function(data){  
       		$('.sms .sms-info').text(data.error);
       	}  
   	});
	count = 60;
	timer = setInterval('countSms()',1000);	
}

function request(param){
	var oRegex = new RegExp('[\?&]' + param + '=([^&]+)','i') ;
	var oMatch = oRegex.exec(window.location.search) ;
	if(oMatch && oMatch.length > 1)
		return oMatch[1];
	else
		return '';
}

function getCodePath(channel){
	if(channel == 'baidu_ss'){
		return 1;
	}else if(channel == 'baidu_wm'){
		return 2;
	}else if(channel == '360_ss'){
		return 3;
	}else if(channel == '360_wm'){
		return 4;
	}else if(channel == 'sogou_ss'){
		return 5;
	}else if(channel == 'sogou_wm'){
		return 6;
	}else if(channel == 'dsp'){
		return 7;
	}else if(channel == 'zh'){
		return 8;
	}else if(channel == 'gdt'){
		return 9;
	}else if(channel == 'xrj'){
		return 10;
	}else if(channel == 'sm_ss'){
		return 12;
	}else if(channel == 'jrtt'){
		return 13;
	}else if(channel == 'baidu_qpx'){
		return 14;
	}else if(channel == 'xlfy'){
		return 15;
	}else{
		return null;
	}
}