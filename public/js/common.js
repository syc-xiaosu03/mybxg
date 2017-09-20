	define(["jquery","template","cookie"],function($,template) {
// NProgress.start();

// 	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	//实现退出功能
	//当点击退出按键时
	$("#loginOut").click(function(){
		//发送请求
		$.ajax({
			type:"post",
			url:"/api/logout",
			success:function(data){
				if(data.code == 200){
					//请求成功后会删除id
					console.log("请求成功后会删除id");
					//跳转登录页
					location.href = 'main/index';
				}
			}

		})

	})

	//全局下检测用户是否有登录,若没有sessid信息,只能在登录页
	var ret = $.cookie("PHPSESSID");

	if(!ret && location.pathname !="/main/login"){
		
		location.href = '/main/login';
	};
	//设置用户信息
		//拿到cookie里存放的数据,
	var loginInfo = $.cookie("loginInfo");
		//转成对象格式,
	loginInfo = loginInfo && JSON.parse(loginInfo);
		//添加到页面中
	// $(".aside .profile img").attr("src",loginInfo.tc_avatar);
	// $(".aside .profile h4").html(loginInfo.tc_name);//
	//第二种方式

		var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4> ';
		var html = template.render(tpl,loginInfo);
		$(".aside .profile").html(html);

	})

	

