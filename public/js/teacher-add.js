/**
 * Created by Administrator on 2017/9/22.
 */
define(["jquery","template","util"],function($,template,util){
    //获取id编辑对应的讲师
    var tcId=util.qs("tc_id");
    console.log(tcId)

    //若id存在,则实现编辑教师功能
   if(tcId){
       //根据id值请求后台数据
       $.ajax({
           type:"get",
           url:"/api/teacher/edit",
           data:{tc_id:tcId},
           dataType:"json",
           success:function(data){
               console.log(data);
               //把当前id所对应老师信息显示页面中
               data.result.operate = "编辑讲师";
               var html = template("teacherTpl",data.result);
               $("#teacherInfo").html(html);

           }
       })

   }else{
       //若id不存在,则实现添加老师信息功能
       var html = template("teacherTpl",{operate:"添加2讲师"});
       $("#teacherInfo").html(html);
   }


        //点击添加讲师
    //$.ajax({
    //    type:"post",
    //    url:"/api/teacher/add",
    //    data :$("#add-teacher").serialiaze(),
    //    dataType:"json",
    //    success:function(data){
    //        console.log(data)
    //
    //    }
    //})
});