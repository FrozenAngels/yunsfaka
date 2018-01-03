/**
 * Created by ashang on 2017/8/21.
 */


/**
 * 提示
 * @param id
 * @param msg
 */
var alert_tips = function (id, msg) {
    layer.tips(msg, "#"+id, {
        tips: [1, '#3595CC'],
        time: 4000
    });
    return;
}

var ys_aload = function ()
{
    var lodingid = layer.load();
    return lodingid;
}

var ys_cload = function (index) {
    layer.close(index);

}

/**
 * 查询订单详情
 * @param id
 */
var orderInfo = function (id,url) {

    var index = ys_aload();
    $.post(url,{id:id},function(result){
        ys_cload(index);
        if(result.code == 0){
            as_tips(result.msg)
        }else{
            as_content(result.data)
        }
    });

}
var as_tips =function (title) {
    layer.msg(title, {
        time: 20000, //20s后自动关闭
        btn: ['知道了']
    });
}

var as_content =function (html) {
    layer.open({
        type: 1,
        title: '充值信息',
        skin: 'layui-layer-rim', //加上边框
        area: ['600px', '360px'], //宽高
        content: html
    });
}

$("#checkAll").click(
    function(){
        if(this.checked){
            $("input[name='checkname']").prop('checked', true)
        }else{
            $("input[name='checkname']").prop('checked', false)
        }
    }
);

/**
 * 获取所有复选框选中的内容
 */
var getCheckAll = function () {
    var ids ="";
    $.each($('input:checkbox'),function(){
        if(this.checked && $(this).val() != 'on'){
                ids += $(this).val() + ','
        }
    });
    ids=ids.substring(0,ids.length-1)
    return ids
}
/**
 * 处理订单
 */
var checkOrder = function (url,status) {

    var ids = getCheckAll();
    if(ids == ""){layer.alert('请选择要处理的订单',{icon:2}); return}
    var index = ys_aload();
    $.post(url,{ids:ids,status:status},function(result){
        ys_cload(index);
        if(result.code == 0){
            layer.alert(result.msg,{icon:2})
        }else{
            location.reload()
        }
    });


}

var delAll = function (url) {
    var ids = getCheckAll();
    if(ids == ""){layer.alert('请选择要删除的选项',{icon:2}); return}
    var index = ys_aload();
    $.get(url,{ids:ids},function(result){
        ys_cload(index);
        if(result.code == 0){
            layer.alert(result.msg,{icon:2})
        }else{
            location.reload()
        }
    });
}
/**
 * 提示框
 * @param url
 * @param title
 */
var okisnotip = function (url,title,status) {
    layer.confirm(title, {
        btn: ['确定','取消'] //按钮
    }, function(){
        layer.closeAll();
        checkOrder(url,status);
    }, function(){

    });
}
/**
 * 上下架
 * @param url
 * @param status
 */

var shangxAll = function (url,status) {
    var ids = getCheckAll();
    if(ids == ""){layer.alert('请选择要操作的商品',{icon:2}); return}
    var index = ys_aload();
    $.post(url,{ids:ids,status:status},function(result){
        ys_cload(index);
        if(result.code == 0){
            layer.alert(result.msg,{icon:2})
        }else{
            location.reload()
        }
    });
}

var updatePwd = function (url) {
    layer.prompt({title: '输入新密码，并确认', formType: 1}, function(pass, index){
        layer.close(index);
        $.post(url,{pwd:pass},function(result){
            ys_cload(index);
            if(result.code == 0){
                layer.alert(result.msg,{icon:2})
            }else{
                alert('修改成功，新密码为：'+pass+"请牢记")
            }
        });
    });
}