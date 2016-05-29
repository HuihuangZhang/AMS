window.onload = function() {
    add_banner();
    gotofunc();
    SelectInput();
    SetScheduling();
    SaveScheduling();
}

function SetScheduling() {
    $.ajax({
        url: '../FreeTimeManage/getAllFreeTime',
        dataType: 'json',
        success: function(res) {
            console.log(res['success']);
            if (res['success']) {
                var Scheduling = res['data'];
                for (var i = 0; i < Scheduling.length; i++) {
                    var sid = Scheduling[i].substring(0,8);
                    var time = Scheduling[i].substring(8,17);
                    var stime = "#" + time;
                    $(stime.toString()).append("<li><input type='checkbox' name='checkbox' class='labelauty' id= '"+sid+time+"' style='display: none'><label for='"+sid+time+"'><span class='labelauty-unchecked-img'></span><span class='labelauty-unchecked'>"+sid+"</span><span class='labelauty-checked-img'></span><span class='labelauty-checked'>"+sid+"</span></label></li>");  
                }
            }
        }, error: function(err) {
            console.log(err);
        }
    });
}

function SaveScheduling() {
    $("#saveScheduling").click(function() {
        
        if (!CheckCookie()) {
            OverTime();
        } else {

            var Scheduling = new Array();
            var obj_checkbox = document.getElementsByName("checkbox");
            for (var i = 0; i < obj_checkbox.length; i++) {
                if (obj_checkbox[i].checked)
                    Scheduling.push(obj_checkbox[i].id);
            }
            var save_sche_url = url + '/scheduling'
            $.ajax({
                url: save_sche_url,
                type: 'POST',
                dataType: 'JSON',
                data: {"scheduling": Scheduling},
                success: function(res) {
                    console.log(res);
                    // 添加时间表后的行为
                }, error: function(err) {
                    console.log(err);
                }
            });
        }
    });
}


function SelectInput() {
    $(':input').labelauty();
}