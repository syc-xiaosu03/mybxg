/**
 * Created by Administrator on 2017/9/25.
 */
define(["jquery","template","ckeditor","uploadify","region","datepicker","language","validate","form"],function($,template,CKEDITOR){
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
            
            //处理富文本功能
            CKEDITOR.replace("editor",{
                toolbarGroups:[
                    {name:"clipboard" ,groups:["clpboard","undo"]},
                    {name:"editing",groups:["find","selection0","spellchecker","editing"]}
                ]
            });

            //处理表单提交
            //先验证表单
            $("#settingsForm").validate({
                sendForm:false,
                valid:function(){
                    //获取家乡的信息(根据省市县的值拼接)
                    var p = $("#p").find("option:selected").text();
                    var c = $("#c").find("option:selected").text();
                    var d = $("#d").find("option:selected").text();
                    var pcd=p+"|"+c+"|"+d;
                    console.log(pcd);
                    //同步富文本
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    //成功后 提交向后台发送数据
                    $(this).ajaxSubmit({
                        type:"post",
                        url:"/api/teacher/modify",
                        data:{tc_hometown:pcd},
                        dataType:"json",
                        success:function(data){
                            console.log(data)
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                }

            })
            
             
        }

    })

})