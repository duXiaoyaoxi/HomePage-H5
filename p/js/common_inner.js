(function($) {
	$.fn.lavaLamp = function(o) {
		o = $.extend({
					fx : "linear",
					speed : 500,
					click : function() {
					}
				}, o || {});
		return this.each(function() {
					var b = $(this), noop = function() {
					}, $back = $('<li class="back"><div class="left"></div></li>')
							.appendTo(b), $li = $("li", this), curr = $(
							"li.current", this)[0]
							|| $($li[0]).addClass("current")[0];
					$li.not(".back").hover(function() {
								move(this)
							}, noop);
					$(this).hover(noop, function() {
								move(curr)
							});
					$li.click(function(e) {
								setCurr(this);
								return o.click.apply(this, [e, this])
							});
					setCurr(curr);
					function setCurr(a) {
						$back.css({
									"left" : a.offsetLeft + "px",
									"width" : a.offsetWidth + "px"
								});
						curr = a
					};
					function move(a) {
						$back.each(function() {
									$.dequeue(this, "fx")
								}).animate({
									width : a.offsetWidth,
									left : a.offsetLeft
								}, o.speed, o.fx)
					}
				})
	}
})(jQuery);

function randomSort(nums) {
	var array = [];
	for (var i = 0; i < nums; i++) {
		array[i] = i;
	}
	for (var i = 0; i < nums; i++) {
		var rand = parseInt(nums * Math.random());
		var temp = array[i];
		array[i] = array[rand];
		array[rand] = temp;
	}
	return array;
}

function initServiceQQ() {
	if ($("#service-consult").size() > 0) {
		var html = [], arr = ['2484733604', '2736250395', '2565543522',
				'2308604769', '1516220270', '2201625802', '2302623079',
				'2961044192', '2300255988', '2301429137', '2873504150'];
		var newarr= [];
		$(randomSort(11)).each(function(i, n) {
			newarr[i]=arr[n];
		});
		$("#service-consult a").each(function(i){
				var title = "";
				if (newarr[i] == '2736250395') {
					title = "广州";
				} else if (newarr[i] == '2961044192') {
					title = "成都办";
				} else if (newarr[i] == '2201625802') {
					title = "深圳办";
				}else if (newarr[i] == '2873504150') {
					title = "深圳办";
				}
				var url = "http://wpa.qq.com/msgrd?v=3&uin="+ newarr[i] + "&site=qq&menu=yes";
				var src = "http://wpa.qq.com/pa?p=2:"+ newarr[i]+ ":45";
				$(this).attr("href",url);
				$(this).attr("title",title);
				$(this).find("img").attr("src",src);
		})
	}
}

function setHomepage(url) {
	if (document.all) {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(url);
	} else {
		alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
	}
}

function addFavorite(url, title) {
	try {
		window.external.addFavorite(encodeURI(url), title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, encodeURI(url), "");
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
		}
	}
}

$(function() {
			$("#nav-list").lavaLamp({
						fx : "linear",
						speed : 300
					});

			hideQuickOpt();

			$(window).resize(function() {
						hideQuickOpt();
					})
			initServiceQQ();
		});

/**
 * 隐藏快捷操作
 */
function hideQuickOpt() {
	var clientW = Math.max(document.body.clientWidth,
			document.documentElement.clientWidth);
	var scrollW = Math.max(document.body.scrollWidth,
			document.documentElement.scrollWidth);
	// console.log(scrollW+"-------"+document.documentElement.clientWidth);
	if (clientW <= scrollW && scrollW < 1142) {
		$(".quick-service").hide();
		$(".service-box").hide();
	} else {
		$(".quick-service").show();
	}
}

var count_sms = 60;
var timer_sms;
function countSms() {
	if (count_sms <= 0) {
		$('.down-sms').text('发送');
		clearInterval(timer_sms);
	} else {
		$('.down-sms').text(count_sms + '秒');
		count_sms--;
	}
}

function sendSms() {
	if ($('.down-sms').text() != '发送') {
		return;
	}
	var tel = $('.down-sms-input').val();
	if ($.trim(tel) == '') {
		$('.error-info').text('请输入手机号码！');
		return;
	}
	var reg = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
	if (!reg.test(tel)) {
		$('.error-info').text('手机号码不合法！');
		return;
	}
	$('.error-info').text('');
	$.ajax({
				type : 'get',
				dataType : 'jsonp',
				jsonp : 'callback',
				url : 'http://cloud.waiqin365.com/sendSms.action',
				data : {
					'sendFlag' : '',
					'moblie' : tel
				},
				success : function() {
					$('.error-info').text('短信已发送！');
				}
			})
	count_sms = 60;
	timer_sms = setInterval('countSms()', 1000);
}

function placeholder(t) {
	var hasPlaceholder = "placeholder" in document.createElement("input");
	var pt = $(t).attr("placeholder");
	if (!hasPlaceholder && pt) {
		var inputVal = $.trim($(t).val());
		var id = ($(t).id);
		var ph = $("<label class=\"input-placeholder\" for=" + id + ">" + pt
				+ "</label>").css({
					"width" : $(t).width(),
					"height" : $(t).outerHeight() + 'px',
					"line-height" : $(t).outerHeight() + 'px'
				});
		$(t).after(ph);
		if (inputVal) {
			ph.hide();
		}
		$(t).focus(function() {
					if (!$.trim($(t).val())) {
						ph.hide();
					}
				});
		$(t).blur(function() {
					if (!$.trim($(t).val())) {
						ph.show();
					}
				});
		ph.click(function() {
					if (!$.trim($(t).val())) {
						ph.hide();
						$(t).focus();
					}
				});
	}
};

function searchFaq() {
	var value = $(".search-input").val();
	if (value == "") {
		return;
	}
	$.ajax({
		type : "get",
		url : "http://www.waiqin365.com:28080/faq/search?key=" + value,
		dataType : "jsonp",
		jsonp : "jsonpcallback",
		success : function(data) {
			var htmlCont = "";
			var count = 0;
			if (data != undefined) {
				var re = /^.+([1-9]+(\.)){3,}.+$/;
				htmlCont = htmlCont + '<ul class="prop-items">'
				for (var i = 0; i < data.length; i++) {
					var htmlPath = data[i].htmlPath;
					var htmlTitle = data[i].htmlTitle.slice(0, -6);
					if (re.test(htmlPath)) {
						count = count + 1;
						htmlCont = htmlCont
								+ '<li class="prop-item"><span class="pro-icon"></span><a target="_blank" href="'
								+ htmlPath
								+ '#bzzx" target="_self" hideFocus="true">'
								+ htmlTitle
								+ '</a><span id="click-count" class="click-count"></span></li>'
					}
				}
				htmlCont = htmlCont + '</ul>'
			} else {
				var top = 0;
				$(".prop-classify-item").each(function(i) {
							top = top + $(this).outerHeight(true);
						})
				top = top / 2
				if (top <= 70) {
					top = 0;
				} else {
					top = top - 70;
				}
				var marginT = top + 24;
				htmlCont = htmlCont
						+ '<div class="sorry-warn"><img src="/portal_new/images/faq/sorry.png" style="margin-top:'
						+ top
						+ 'px"><div class="warn-word" style="margin-top:'
						+ marginT
						+ 'px"><div class="warn-title">温馨提醒：</div><div class="warn-cont">对不起，没有查到相关内容</div><div class="warn-cont">请重新输入关键字进行查询</div></div></div>'
				count = 0;
			}
			showResult(htmlCont, count);
		}
	});
}

function showResult(htmlCont, count) {
	var value = $(".search-input").val();
	var title = value;
	// title = "关键词："+value+"，返回"+count+"条匹配结果";
	$('.features-r .prop-title .title').html(title);
	$('.features-r .prop-list').html(htmlCont);
}