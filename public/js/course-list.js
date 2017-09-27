define(["jquery","template","util"],function($,template,util){
    //设置导航菜单高亮显示
  util.setMenu(location.pathname);
    //通过ajax发送请求
    $.ajax({
        type:'get',
        url:"/api/course",
        dataType:"json",
        success:function(data){
            console.log(data);
            //解析数据,渲染页面
            var html = template("courseTpl",{list:data.result});
            $("#courseInfo").html(html);
        }

    })

})