/**
 * Created by Administrator on 2017/9/22.
 */
define(["jquery"],function($){
    return {
        qs:function(key){
            //获取id编辑对应的讲师
            //拿到地址栏中对应讲师的id (tc_id=4)
            var param = location.search.substr(1);
            var result = null;
            //如果地址栏内有数据 ,处理地址栏数据
            if(param){
                //以&为基准,分隔成为数组
                var ps = param.split("&");
                //再遍历分隔后的数组
                $.each(ps,function(index,item){
                    //再以=为分隔
                    var kv = item.split("=");
                    if(kv[0]==key){
                        //拿到tc_id的值(数组中第二项)
                        result = kv[1];
                        return false;
                    }
                })
            }
            return result
        },
        setMenu:function(path){
        //设置导航菜单高亮显示
        $(".navs a[href='"+path+"']").addClass('active').closest('ul').show();
        }

    }
});