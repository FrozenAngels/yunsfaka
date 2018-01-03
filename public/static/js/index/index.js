
$("select#sgcid").change(function(){
    closeSgall()
    getSgoodsList($(this).val())
});

var getSgoodsList = function (id) {
    if(id == 0) return;
    var lodingid = layer.load();

    $.post(getGoodsUrl,{id:id},function(result){
        layer.close(lodingid);
        $('#glist').html(result.data)
    });
}


$("select#glist").change(function(){
    closeSgall()
    getSgoodsInfo($(this).val())
});

var getSgoodsInfo = function (id) {
    if(id == 0) return;
    var lodingid = layer.load();
    $.post(getGoodsInfo,{id:id},function(result){
        layer.close(lodingid);
       $('#money').val(result.data.money)
        if(result.data.html != ""){
           $('#okshop').before(result.data.html)
        }
    });
}
/**
 * 清除所有元素
 */
var closeSgall = function () {
    $("#ipu-scheck").remove()
    $("#ipu-tcheck").remove()
    $("#ipu-otitle").remove()
    $("#money").val('')
    $("#zmoney").val('')

}
/**
 * 提交手工订单
 */
var okSgOrder = function () {
    var cid = $('#sgcid').val();
    var gid = $('#glist').val();
    var num = $('#number').val();
    var account = $('#ipotitle').val();
    var ttitle = $('#ipttitle').val();
    var stitle = $('#ipstitle').val();
    var lodingid = layer.load();
    $.post(postSgOrder,{cid:cid,gid:gid,num:num,account:account,ttitle:ttitle,stitle:stitle},function(result){
        layer.close(lodingid);
        if(result.code == 0){
            layer.alert(result.msg,{icon:2})
        }else{
            if(result.data.status == 0){
                $('#okshop').before(result.data.html)
                $('#okshop').remove()
            }else{
                window.location.href = '/docha.html?account='+result.data.status
            }

        }
    });

}


$("select#zsgcid").change(function(){
    closeSgall()
    getZgoodsList($(this).val())
});
var getZgoodsList = function (id) {
    if(id == 0) return;
    var lodingid = layer.load();

    $.post(getGoodsUrl,{id:id},function(result){
        layer.close(lodingid);
        $('#zglist').html(result.data)
    });
}

$("select#zglist").change(function(){
    closeSgall()
    getZgoodsInfo($(this).val())
});

var getZgoodsInfo = function (id) {
    if(id == 0) return;
    var lodingid = layer.load();
    $.post(getGoodsInfo,{id:id},function(result){
        layer.close(lodingid);
        $('#zmoney').val(result.data.money)
        if(result.data.html != ""){
            $('#zokshop').before(result.data.html)
        }
    });
}

/**
 * 提交自动订单
 */
var okZdOrder = function () {
    var cid = $('#zsgcid').val();
    var gid = $('#zglist').val();
    var num = $('#znumber').val();
    var account = $('#ipotitle').val();
    var lodingid = layer.load();
    $.post(postZdOrder,{cid:cid,gid:gid,num:num,account:account},function(result){
        layer.close(lodingid);
        if(result.code == 0){
            layer.alert(result.msg,{icon:2})
        }else{
            $('#zokshop').before(result.data)
            $('#zokshop').remove()
        }
    });

}

/**
 * 查询订单详情
 * @param id
 */
var orderInfo = function (id,url) {

    var lodingid = layer.load();
    $.post(url,{id:id},function(result){
        layer.close(lodingid);
        if(result.code == 0){
            layer.alert(result.msg,{icon:2})
        }else{
            layer.open({
                type: 1,
                title: '充值信息',
                skin: 'layui-layer-rim', //加上边框
                area: ['600px', '360px'], //宽高
                content: result.data
            });
        }
    });

}