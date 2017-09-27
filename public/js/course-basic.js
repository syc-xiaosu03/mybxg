define(["jquery","template","util"],function($,template,util){

    //导航菜单高亮显示
    util.setMenu("/course/add");
    //获取地址栏中数据:cs_id
    var csId=util.qs("cs_id");
    //获取标志位
    var flag=util.qs("flag");
    console.log(flag)

    //发送请求,渲染数据
    $.ajax({
        type:'get',
        url:"/api/course/basic",
        data:{cs_id:csId},
        dataType:"json",
        success:function(data){
            console.log(data);
            if(flag){
                //实现编辑课程功能
                data.result.operate="课程编辑";
            }else{
                //实现创建功能
                data.result.operate="课程添加";
            }
            var html=template("basicTpl",data.result);
            $("#basicInfo").html(html);
        }
    })

})