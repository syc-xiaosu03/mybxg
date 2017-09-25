/**
 * Created by Administrator on 2017/9/25.
 */
define(["jquery","template"],function($,template){
    //调用接口获取后台信息
    $.ajax({
        type:"get",
        url:"/api/teacher/profile",
        dataType:"json",
        success:function(data){
            console.log(data);
            //根据数据 渲染个人中心的页面
            var html = template("settingsTpl",data.result);
            $("#settingsInfo").html(html);
        }

    })

})