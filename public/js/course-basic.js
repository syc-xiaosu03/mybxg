define(["jquery","template","util","ckeditor","validate","form"],function($,template,util,CKEDITOR){

    //导航菜单高亮显示
    util.setMenu("/course/add");
    //获取地址栏中数据:cs_id
    var csId=util.qs("cs_id");
    //获取标志位
    var flag=util.qs("flag");
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
            // 当下拉框内容发生改变后触动事件
            $("#firstType").change(function(){
                //获取当前被选中下拉框的value值(一级id)
                var pid=$(this).val();
                console.log(pid);
                //发送请求,根据获取到得一级分类名的id查询二级分类的数据
                $.ajax({
                    type:"get",
                    url:"/api/category/child",
                    data:{cg_id:pid},
                    datdType:"json",
                    success:function(data){
                        console.log(data);
                        //根据后台返回数据,拼接二级菜单
                        var tpl='<option>请选择二级菜单</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                        var html=template.render(tpl,{list:data.result});
                        $("#secondType").html(html);
                    }
                })
            });
            //处理富文本
            CKEDITOR.replace("editor",{
                toolbarGroups : [
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
                  ]
            });
            //处理表单提交
            $("#basicForm").validate({
                sendForm:false,
                valid:function(){
                    //1.在这代表,所有输入域内容都通过了,在此时处理富文本同步
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    //提交表单
                    $(this).ajaxSubmit({
                        type:"post",
                        url:"/api/course/update/basic",
                        data:{cs_id:csId},
                        dataType:"json",
                        success:function(data){
                            if(data.code==200){
                                location.href="/course/picture?cs_id="+data.result.cs_id;
                            }
                        }
                    })

                }
            })

        }
    })

})