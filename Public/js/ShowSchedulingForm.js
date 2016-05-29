window.onload = function() {
    add_banner();
    gotofunc();
    ShowScheduling();
}

function ShowScheduling() {
    var get_sche_url = url + '/checkScheduling';
    $.ajax({
        url: get_sche_url,
        type: 'POST',
        dataType: 'json',
        success: function(res) {
            if (res['success'] == 1) {
                var Scheduling = res['data'];
                console.log(Scheduling);
                for (var i = 0; i < Scheduling.length; i++) {
                    var sid = Scheduling[i].substring(0,8);
                    var time = Scheduling[i].substring(8,17);
                    var stime = "#" + time;
                    $(stime.toString()).append("<li><p>"+sid+"</p></li>");  
                }
            } else {
                
            }
        }, error: function(err) {
            console.log(err);
        }
    });
}
