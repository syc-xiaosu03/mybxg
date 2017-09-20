define(['jquery',"cookie"],function($) {
  // body...
   $("#loginbtn").click(function(){           
            $.ajax({
               type: "post",
               url: "/api/login",
               data : $("#loginForm").serialize(),
               dataType : "json",
               success:function(data){ 
                    //1.重新回到登录页
                    if(data.code==200){
                        //2.登录成功后把要传的数据转成字符串格式放到cookie里面
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});

                        location.href = "/main/index";
                    }
               }
        });

            return false;     
});

})
