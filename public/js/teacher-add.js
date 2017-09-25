/**
 * Created by Administrator on 2017/9/22.
 */
define(["jquery","template","util","datepicker",'language',"validate","form"],function($,template,util){
    //获取id编辑对应的讲师
    var tcId=util.qs("tc_id");


    //若id存在,则实现编辑教师功能
   if(tcId){
       //根据id值请求后台数据
       $.ajax({
           type:"get",
           url:"/api/teacher/edit",
           data:{tc_id:tcId},
           dataType:"json",
           success:function(data){

               //把当前id所对应老师信息显示页面中
               data.result.operate = "编辑讲师";
               var html = template("teacherTpl",data.result);
               $("#teacherInfo").html(html);
               submitForm("/api/teacher/update")
           }
       })

   }else{
       //若id不存在,则实现添加老师信息功能
       var html = template("teacherTpl",{operate:"添加2讲师"});
       $("#teacherInfo").html(html);
       submitForm("/api/teacher/add")
   }

    //采用插件的方式,进行验证再提交(两个插件)
    function submitForm(url){
        //调用插件中的验证函数
       $("#teacherForm").validate({
            //禁默认的提交行为
            sendForm:false,
            //验证成功后,在这里提交
            valid:function(){
                //利用提交插件中的方法提交
                $(this).ajaxSubmit({
                    type:"post",
                    url:url,
                    dataType:"json",
                    success:function(data){
                        if(data.code ==200){
                            location.href="/teacher/list";
                        }
                    }
                })
            },
            //自定义当某个规则不通过时,弹出的提示信息
            description:{
                tcName:{
                    required:"用户名不能为空"
                },
                tcPass:{
                    required:"密码不能为空",
                    pattern:"密码必须为6位数字"
                },
                tcJoinDate:{
                    required:"日期不能为空"
                }
            }
        })
    }



    //采用表单验证和提交插件提交表单
    /*function submitForm(url){
        $("#submitBtn").click(function(){
            $.ajax({
                type:"post",
                url:url,
                data:$("#teacherForm").serialize(),
                dataType:"json",
                success:function(data){
                   if(data.code==200){}
                    location.href="/teacher/list";
                }
            })
        })
    }
*/

});