/**
 * Created by Administrator on 2017/9/20.
 */
define(["jquery","template"],function($,template){
        //调用接口获取所有的讲师数据
    $.ajax({
        type:"get",
         url:"/api/teacher",
        dataType : "json",
        success : function(data){
            console.log(data);
            var html = template("tachertpl",{list:data.result});
            $("#teacherInfo").html(html);
        }
    })

})