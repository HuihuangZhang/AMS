window.onload = function() {
    setfreetime();
    add_banner();
    gotofunc();
    givefreetime();
    //修改空闲时间
    $("td").click(function(){ 
        if (this.innerHTML == "busy") {
            this.innerHTML = "free";
            this.style.backgroundColor = "#F0FEFF";
            this.style.fontWeight = "bold"; 
        } else if (this.innerHTML == "free") {
            this.innerHTML = "busy";
            this.style.removeProperty('background-color');
            // this.style.backgroundColor = "white";
            this.style.removeProperty('font-weight'); 
        }
    });
}

function setfreetime() { //显示休闲时间以及修改空闲时间
    //显示空闲时间
    var get_free_time_url = url + '/getFreeTime';
    $.ajax({
        url: get_free_time_url,
        dataType: 'JSON',
        success: function(res) {
            // console.log(res);
            var freetime = res;
            for (var i = 0; i < freetime.length; i++) {
                var tb =  document.getElementById("tb")
                var rows = tb.rows;
                var cell;
                var row = parseInt(freetime[i][2]);
                var col = parseInt(freetime[i][0]);
                if (freetime[i][1] == 0) {
                    cell = rows[row - 7].cells[col];
                } else if (freetime[i][1] == 1) {
                    cell = rows[row + 3].cells[col];
                } else if (freetime[i][1] == 2) {
                    cell = rows[row + 13].cells[col];
                } else {
                    alert("Time Format Error!!!");
                }
                cell.innerHTML = "free";
                cell.style.backgroundColor = "#F0FEFF";
                cell.style.fontWeight = "bold"; 
            }
        }, error: function(err) {
            console.log(err);
        }
    });   
}

function givefreetime() { //将设定好的空闲时间交互给后台
    var tb =  document.getElementById("tb")
     var rows = tb.rows;
     var freetime_array = new Array();
     var str = rows[1].cells[0].innerHTML;
     var time = "";
     for (var k = 0; k < str.length; k++) {
         if (str[k] != "~" && str[k] != ":" && str[k] != " ")
                 time = time + str[k];
     }
     for (var j = 1; j < rows[1].cells.length; j++) {
         var cell = rows[1].cells[j];
         if (cell.innerHTML == "busy") {
             //处理数据 
             var weekday = j.toString();
             var weekday_time = weekday + time;
             freetime_array.push(weekday_time);
             // console.log(weekday_time)
         }
     }
    $("#savefreetime").click(function() {
        var tb =  document.getElementById("tb")
        var rows = tb.rows;
        var freetime_array = new Array();
        for (var i = 1; i < rows.length; i++) {
            var str = rows[i].cells[0].innerHTML;
            var time = "";
            for (var k = 0; k < str.length; k++) {
                if (str[k] != "~" && str[k] != ":" && str[k] != " ")
                    time = time + str[k];
            }
            for (var j = 1; j < rows[i].cells.length; j++) {
                var cell = rows[i].cells[j];
                if (cell.innerHTML == "free") {
                    //处理数据
                    var weekday = j.toString();
                    var weekday_time = weekday + time;
                    freetime_array.push(weekday_time); //特定形式的数据
                }
            }
        }
        var save_free_time_url = url + '/addFreeTime';
        console.log(freetime_array)
        $.ajax({
            url: save_free_time_url,
            type: 'POST',
            dataType: 'json',
            data: {'free_time': freetime_array},
            success: function(data) {
                console.log(data);
            }, error: function(err) {
                console.log(err);
            }
        });

    });
}

