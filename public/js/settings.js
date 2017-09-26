/**
 * Created by Administrator on 2017/9/25.
 */
define(["jquery","template","uploadify","region"],function($,template){
    //调用接口获取后台信息
    $.ajax({
        type:"get",
        url:"/api/teacher/profile",
        dataType:"json",
        success:function(data){
            //根据数据 渲染个人中心的页面
            var html = template("settingsTpl",data.result);
            $("#settingsInfo").html(html);

            //处理头像上传
            //利用插件uploadify异步上传文件,调用插件方法:uploadify()
            $("#upfile").uploadify({
                width:120,
                height:120,
                buttonText:"",
                itemTemplate:"<span></span>",
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                fileObjName : 'tc_avatar',
                onUploadSuccess: function(a,b){
                    location.href="/teacher/list";
                }
            })

            //处理省市县三级联动(利用插件)
            $("#pcd").region({
                url : '/public/assets/jquery-region/region.json'
            })

        
    
             
        }

    })

})