define(["jquery","util","validate","form"],function($,util){
     //设置导航菜单高亮显示
   util.setMenu(location.pathname);

   $("#coursebtn").click(function(){
    //提交数据
    $("#courseForm").ajaxSubmit({
        type:"get",
        url:"/api/course/create",
        dataType:"json",
        success:function(data){
            console.log(data)
           if(data.code==200){
            location.href="/course/basic?cs_id="+data.result.cs_id;
        }
           }

    })

   })

})