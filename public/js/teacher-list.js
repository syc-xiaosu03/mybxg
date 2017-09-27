/**
 * Created by Administrator on 2017/9/20.
 */
define(["jquery","template","util","bootstrap"],function($,template,util){
    //设置导航菜单高亮显示
   util.setMenu(location.pathname)
        //调用接口获取所有的讲师数据
    $.ajax({
        type:"get",
         url:"/api/teacher",
        dataType : "json",
        success : function(data){

            var html = template("tachertpl",{list:data.result});
            $("#teacherInfo").html(html);

            //1.启用注销功能
            //渲染成功后,绑定点击事件,实现注销功能
            $(".eod").click(function(){
                var that = $(this);
                //获取其父元素
                var td = that.closest("td");
                //获取父元素的自定义属性,并得到其中从后台传来当前的代表是否注销的数据
                var tcId = td.attr("data-tcId"); //要得到当前是哪个用户点击注销
                var status = td.attr("data-status");
                console.log(tcId +","+ status);
                //把代表是否注销的数据传送给后台(后台会根据点击操作改变权限注销或启用_)
                $.ajax({
                    type:"post",
                    url : "/api/teacher/handle",
                    data : {
                        tc_id : tcId,
                        tc_status : status
                    },
                    dataType:"json",
                    //响应成功后,把后台修改过的权限数据再返回给前台(点击发送是0,会传回1,发送1,会响应回来0)
                    success:function(data){
                        console.log(data);
                        //如果成功,
                        if(data.code ==200 ){
                            //修改当前状态
                            //1.先修改当前状态td中保存权限数据的自定义属性值
                            td.attr("data-status",data.result.tc_status)
                            //2.再根据修改后的权限数据更改按钮的内容
                            if(data.result.tc_status==0){
                                console.log(that)
                                that.text("注销");
                            }else{
                                that.text("启用");
                            }
                        }
                        }
                })

            });

            //2.查看讲师信息
            $(".preview").click(function(){
                var that = $(this);
                var td = that.closest("td");
                //根据其父元素自定义属性得知是哪个讲师
                var tcId = td.attr("data-tcId");
                //向后台发送讲师id请求数据(后台根据这个id回传数据)
                $.ajax({
                    type:"get",
                    url:"/api/teacher/view",
                    data:{
                        tc_id :tcId
                    },
                    success:function(data){
                        console.log(data);
                        var html=template("modelTpl",data.result);
                        $("#modelInfo").html(html);
                        $("#teacherModal").modal();
                    }
                })


            });

        }
    })

})