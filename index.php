
<?php
/*---------1.初步分发路由---------*/
//这个页面就是路由--后端路由 职责:根据url的不同响应不同的页面(路径分发)
	//include('./views/main/index.html');
	/*需求:必须能够通过url区分出用户想访问哪个页面*/
	  /* php的一个全局变量 $_SERVER :作用-获取地址栏url信息;
	     其中属性 PATH_INFO :里面存储了url地址后面的信息内容
	     路由:根据请求的地址内容不同得到不同的信息*/

	//$path = $_SERVER["PATH_INFO"];
	//echo $path;
	//include("./views".$path.".html");
/*----------2.完善路由分发-------------------*/		
	
	/*2.1设置一个默认的地址*/
	/*默认目录名称*/
	$dir = "main";
	/*默认文件名称*/
	$filename = "index";
	//2.2判断 地址栏信息是否存在 方法:array_key_exists(属性,对象) 即判断 $_SERVER 对象中是否存在PATH_INFO这个属性
	/*2.3 在这些信息内容存在的基础上再去获取并且处理*/
	if(array_key_exists("PATH_INFO", $_SERVER)){
	/*获取地址栏内容*/
	$path = $_SERVER["PATH_INFO"];
	/*去掉内容里的第一个斜杠"/" php方法:substr(内容,排位数) */
	$str = substr($path, 1);
	/*以中间的斜杠,将内容分隔为数组 php方法:explode("分隔符",内容)*/
	//var_dump($str);
	$ret = explode("/",$str);
	/*2.4再次判断,内容即地址路由是否有两层 php方法:count(数组),返回数组的长度*/
	//var_dump($ret);
	if(count($ret)==2){
		/*若路由是两层,则用这两层分别覆盖目录及文件名*/
		$dir = $ret[0];
		$filename = $ret[1];
	}else{
		/*若少一层,就将文件名设置为登录页名,使其直接跳转至登录页*/
		$filename = "login";
	}

	}
	//echo $dir."/".$filename;
		/*这里注意上面去掉斜杠,要在这里再加上一个斜杠*/
	include("./views/".$dir."/".$filename.".html");	



/*---复制文件.htaccess- 作用:隐藏地址栏里的index.php*/

/*********3.嵌入子页面************/
/*从后台角度解决跨域问题(因为ajax不能跨哉请求):
	配置反向代理 ProxyPass /api http://api.studyit.com */

?>
