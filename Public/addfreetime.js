$(function() {
    $("#addline").click(function(event) {
        var tdata = new Array('110002000', '210002000', '310002000');
        var post_url = url + '/addFreeTime';
        $.ajax({
            url: post_url,
            type: "get",
            dataType: "json",
            data: {"freetime": tdata},
            success:function(msg) {
                console.log("huihuang");
                console.log(msg);
            }, error:function(error) {
                console.log(error);
            }
        })
    });
});