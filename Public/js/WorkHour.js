window.onload = function() {
    add_banner();
    gotofunc();
    GetthisMonthWorkingHour();
}

function GetthisMonthWorkingHour() {
    $("#Settlement").click(function() {
        
        if (!CheckCookie()) {
            OverTime();
        } else {

            var d = new Date();
            var date = d.getDate();

            if (date < 27) {
                alert("未到本月27日，不可结算工时！");
            } else {
                $("tbody").empty();
                Set();
            }
        }
    });
}

function AssistantInfo(data) {
    this.aid = data.aid;
    this.sname = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.lel_time = data.lel_time;
    this.lel_work_hour = data.lel_work_hour;
    this.work_hour = data.work_hour;
    this.GetAssistantInfo_ = GetAssistantInfo(this);
}

function GetAssistantInfo(Assistant) {
    return ("<tr><td>"+Assistant.aid+"</td><td>"
        +Assistant.sname+"</td><td>"
        +Assistant.lel_time+"</td><td>"
        +Assistant.lel_work_hour+"</td><td>"
        +Assistant.work_hour+"</td><td>"
        +Assistant.phone+"</td><td>"
        +Assistant.email+"</td><tr>");
}

function Set() {
    $.ajax({
        url: 'countWorkingHour',
        dataType: 'json',
        success: function(data) {
            if (data['success'] == 1) {
                $.each(data['id'], function(index, val) {
                    console.log(val);
                     var temp = new Object();
                     temp['aid'] = val;
                     temp['name'] = data['name'][val];
                     temp['email'] = data['email'][val];
                     temp['phone'] = data['phone'][val];
                     temp['lel_time'] = data['lel_time'][val];
                     temp['lel_work_hour'] = data['lel_work_hour'][val];
                     temp['work_hour'] = data['work_hour'][val];

                     var a = new AssistantInfo(temp);
                     $("tbody").append(a.GetAssistantInfo_.toString());

                });
            }
            console.log(data);
        }, error: function(err) {
            console.log(err);
        }
    });
    
    // var data = [{"aid": "13331190", "name": "罗俊杰", "email": "13331190@123.com", "phone": "123", "lel_time": "0", "lel_work_hour": "0", "work_hour": "0"},
    // {"aid": "13331190", "name": "罗俊杰", "email": "13331190@123.com", "phone": "123", "lel_time": "0", "lel_work_hour": "0", "work_hour": "0"}];
    // for (var i = 0; i < data.length; i++) {
    //     var a = new AssistantInfo(data[i]);
    //     $("tbody").append(a.GetAssistantInfo_.toString());
    // }
}


function getLastMonthWorkingHour() {
    $.ajax({
        url: 'getLastWorkingHour',
        dataType: 'json',
        success: function(res) {
            if (res['success'] == 1) {
                for (var i = 0; i < res['data'].length; i++) {
                    var a = new AssistantInfo(res['data'][i]);
                    $("tbody").append(a.GetAssistantInfo_.toString());
                }
            }
            console.log(data);
        }, error: function(err) {
            console.log(err);
        }
    });
    // var data = [{"aid": "13331190", "name": "罗俊杰", "email": "13331190@123.com", "phone": "123", "lel_time": "0", "lel_work_hour": "0", "work_hour": "0"},
    // {"aid": "13331190", "name": "罗俊杰", "email": "13331190@123.com", "phone": "123", "lel_time": "0", "lel_work_hour": "0", "work_hour": "0"}];
    // for (var i = 0; i < data.length; i++) {
    //     var a = new AssistantInfo(data[i]);
    //     $("tbody").append(a.GetAssistantInfo_.toString());
    // }
}