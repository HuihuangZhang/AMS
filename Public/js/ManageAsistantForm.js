window.onload = function() {
    add_banner();
    gotofunc();
    AssistantsTable();
    del_add_Assistant();
}

function AssistantInfo(aid, sname, phone, email) {
    this.head = "<tr id='"+aid+"'><form><th><button class='btn delbutton' value='"+aid+"'>注销</button></th><td>";
    this.text1 = "</td></form><td>";
    this.text2 = "</td><td>";
    this.text3 = "</td><td>";
    this.text4 = "</td></tr>";
    this.aid = aid;
    this.sname = sname;
    this.phone = phone;
    this.email = email;
    this.GetAssistantInfo_ = GetAssistantInfo(this);
}

function GetAssistantInfo(Assistant) {
    return (Assistant.head+Assistant.aid+Assistant.text1+Assistant.sname+Assistant.text2+Assistant.phone+Assistant.text3+Assistant.email+Assistant.text4);
}

function AssistantsTable() {
    console.log("huiuag");
    $.ajax({
        url: 'getAllAssistants',
        success: function(Assistants) {
            console.log(Assistants);
            for (var i = 0; i < Assistants.length; i++) {
                var a = new AssistantInfo(Assistants[i]["id"],
                                        Assistants[i]["name"],
                                        Assistants[i]["phone"],
                                        Assistants[i]["email"]
                                        );
                $("tbody").append(a.GetAssistantInfo_);
            }
        }, error: function(err) {
            console.log(err);
        }
    });

}

function del_add_Assistant() {
    $("#TableBody").delegate('.delbutton', 'click', function(event) {
        var delAssistantId = this.value;
        $.ajax({
            url: 'delAssistant',
            type: 'POST',
            dataType: 'JSON',
            data: {'aid': delAssistantId},
            success: function(data) {
                //删除成功后，删除表项；
                var id_ = "#" + delAssistantId;
                $(id_.toString()).remove();
                console.log(data);
            }, error: function(err) {
                console.log(err);
            }
        });
    });

    $("#addbutton").click(function(){
        var addAssistantId = $("#addid").val();
        $.ajax({
            url: 'addAssistant',
            type: 'POST',
            dataType: 'JSON',
            data: {'aid': addAssistantId},
            success: function(res) {
                if (res['success'] == 1) {
                    var a = new AssistantInfo(addAssistantId,"anonymous","0","xxx@xxx.com");
                    $("#TableBody").append(a.GetAssistantInfo_);
                    $("#addid").val("");
                }
                // console.log(res);
            }, error: function(err) {
                console.log(err);
            }
        });
    });
}

// function addDelAssistant() {
    // $("#addbutton").click(function(){ 
    //     var addAssistantId = $("#addid").val();
    //     var add_url = url + '/addAssistant';
    //     $.ajax({
    //         url: add_url,
    //         type: 'POST',
    //         dataType: 'JSON',
    //         data: {'aid': addAssistantId},
    //         success: function(data) {
    //             console.log(data);
    //         }, error: function(err) {
    //             console.log(err);
    //         }
    //     });
    // });

//     $(".delbutton").click(function(){ 
        // var delAssistantId = this.value;
        // alert(delAssistantId);
        // var del_url = url + '/delAssistant';
        // $.ajax({
        //     url: del_url,
        //     type: 'POST',
        //     dataType: 'JSON',
        //     data: {'aid': delAssistantId},
        //     success: function(data) {
        //         console.log(data);
        //     }, error: function(err) {
        //         console.log(err);
        //     }
        // });
//     });
// }
