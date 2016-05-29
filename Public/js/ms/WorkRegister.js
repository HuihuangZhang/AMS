window.onload = function() {
    add_banner();
    gotofunc();
    addschedule();
    // workregister();
}

function addschedule() { //从后台接收个人排班数据并显示
<<<<<<< HEAD
    // var schedule = ["108000900", "110001100", "210001100", "312001300", "415001600", "518001900"]; //test data
    $.ajax({
        url: '../Scheduling/getScheduling',
        success:function(res) {
            if(res['success'] == 1) {
                var schedule = res['data'];
                tbody = document.getElementById("tbo");
                for (var i = 0; i < schedule.length; i++) {
                    tbody.insertRow(i);
                    tbody.rows[i].insertCell(0).innerHTML = i;
                    if (schedule[i][0] == '1')
                        tbody.rows[i].insertCell(1).innerHTML = "星期一";
                    else if (schedule[i][0] == '2') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期二";
                    }
                    else if (schedule[i][0] == '3') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期三";
                    }
                    else if (schedule[i][0] == '4') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期四";
                    }
                    else if (schedule[i][0] == '5') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期五";
                    }
                    else if (schedule[i][0] == '6') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期六";
                    }
                    else if (schedule[i][0] == '7') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期日";
                    } else {
                        alert("Time Format Error!!!")
                    }
                    var time = schedule[i][1] + schedule[i][2] + ":" + schedule[i][3] + schedule[i][4] + " ~ " + schedule[i][5] + schedule[i][6] +":" + schedule[i][7] + schedule[i][8];
                    tbody.rows[i].insertCell(2).innerHTML = time;
                    var on_work = document.createElement("a");
                    on_work.href = "javascript:void(0)";
                    on_work.setAttribute('class','onwork');
                    tbody.rows[i].insertCell(3).appendChild(on_work);
                    var off_work = document.createElement("a");
                    off_work.href = "javascript:void(0)";
                    off_work.setAttribute('class','offwork');
                    tbody.rows[i].insertCell(4).appendChild(off_work);
                    var myDate = new Date();
                    var Day = myDate.getDay();
                    var work_Day = parseInt(schedule[i][0]);
                    console.log(Day); 
                    if (work_Day < Day) {
                        on_work.innerHTML = "已上";
                        off_work.innerHTML = "已下";
                    } else {
                        on_work.innerHTML = "上班";
                        off_work.innerHTML = "下班";
                    }
                    $(".panel-body").delegate('.onwork', 'click', function(event) {
                        if (this.innerHTML === "上班") {
                            this.innerHTML = "已上";
                            // console.log(this);
                            var ontime_str = this.parentNode.previousSibling.innerHTML;
                            var myDate = new Date();
                            var hour = myDate.getHours();
                            var onhour = parseInt(ontime_str[0] + ontime_str[1]);
                            var offhour = parseInt(ontime_str[8] + ontime_str[9]);
                            console.log(hour);
                            console.log(onhour);
                            console.log(offhour);
                            if (hour >= offhour) {

                            }
                            console.log(ontime_str);
                        }
                    });
                    $(".panel-body").delegate('.offwork', 'click', function(event) {
                        if (this.innerHTML === "下班") {
                            this.innerHTML = "已下";
                            var myDate = new Date();
                            var hour = myDate.getHours();
                            var offtime_str = this.parentNode.previousSibling.previousSibling.innerHTML;
                            console.log(offtime_str);
                        }
                    });
                }
            } else {

            }
            console.log(res);
        }, error:function(err) {
            console.log(err);
        }
    });
=======
	var schedule = ["108000900", "110001100", "210001100", "312001300", "415001600", "522002100"]; //test data
	tbody = document.getElementById("tbo");
	for (var i = 0; i < schedule.length; i++) {
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0).innerHTML = i;
		if (schedule[i][0] == '1')
			tbody.rows[i].insertCell(1).innerHTML = "星期一";
		else if (schedule[i][0] == '2') {
			tbody.rows[i].insertCell(1).innerHTML = "星期二";
		}
		else if (schedule[i][0] == '3') {
			tbody.rows[i].insertCell(1).innerHTML = "星期三";
		}
		else if (schedule[i][0] == '4') {
			tbody.rows[i].insertCell(1).innerHTML = "星期四";
		}
		else if (schedule[i][0] == '5') {
			tbody.rows[i].insertCell(1).innerHTML = "星期五";
		}
		else if (schedule[i][0] == '6') {
			tbody.rows[i].insertCell(1).innerHTML = "星期六";
		}
		else if (schedule[i][0] == '7') {
			tbody.rows[i].insertCell(1).innerHTML = "星期日";
		} else {
			alert("Time Format Error!!!")
		}
		var time = schedule[i][1] + schedule[i][2] + ":" + schedule[i][3] + schedule[i][4] + " ~ " + schedule[i][5] + schedule[i][6] +":" + schedule[i][7] + schedule[i][8];
		tbody.rows[i].insertCell(2).innerHTML = time;
		var on_work = document.createElement("a");
		on_work.href = "javascript:void(0)";
		on_work.setAttribute("class", "onwork");
		tbody.rows[i].insertCell(3).appendChild(on_work);
		var off_work = document.createElement("a");
		off_work.href = "javascript:void(0)";
		off_work.setAttribute("class", "offwork");
		tbody.rows[i].insertCell(4).appendChild(off_work);
		on_work.innerHTML = "上班";
		off_work.innerHTML = "下班";
		// var myDate = new Date();
		// var Day = myDate.getDay();
		// var work_Day = parseInt(schedule[i][0]);
		// console.log(Day); 
		// if (work_Day < Day) {
		// 	on_work.innerHTML = "已上";
		// 	off_work.innerHTML = "已下";
		// } else {
		// 	on_work.innerHTML = "上班";
		// 	off_work.innerHTML = "下班";
		// }
	}
}

function workregister() { //登记上下班
	$(".onwork").click(function() {
		// if (this.innerHTML === "上班") {
		// 	this.innerHTML = "已上";
		// 	console.log(this)
		// 	var ontime_str = this.parentNode.previousSibling.innerHTML;
		// 	var myDate = new Date();
		// 	var hour = myDate.getHours();
		// 	var onhour = parseInt(ontime_str[0] + ontime_str[1]);
		// 	var offhour = parseInt(ontime_str[8] + ontime_str[9]);
		// 	var min = myDate.getHours();
		// 	if (hour >= offhour) {
				
		// 	}
		// 	console.log(ontime_str);
		// }
		var ontime_str = this.parentNode.previousSibling.innerHTML;
		var myDate = new Date();
		var hour = myDate.getHours();
		var onhour = parseInt(ontime_str[0] + ontime_str[1]);
		var min = myDate.getMinutes();
		var bias = 0;
		if (hour >= onhour) {
				bias += min;
				bias += 60 * (hour - onhour);
				bias -= bias;
		} else {
				bias += (60 - min);
				bias += 60 * (offhour - hour - 1);
		}
		//把bias传给后台
		console.log(bias)	
	});
	$(".offwork").click(function() {
		// if (this.innerHTML === "下班") {
		// 	this.innerHTML = "已下";
		// 	var myDate = new Date();
		// 	var hour = myDate.getHours();
		// 	var offtime_str = this.parentNode.previousSibling.previousSibling.innerHTML;
		// 	console.log(offtime_str);
		// }
		var myDate = new Date();
		var hour = myDate.getHours();
		var offtime_str = this.parentNode.previousSibling.previousSibling.innerHTML;
		var offhour = parseInt(ontime_str[8] + ontime_str[9]);
		var min = myDate.getMinutes();
		var bias = 0;
		if (hour < offhour) {
				bias += (60 - min);
				bias += 60 * (offhour - hour - 1);
				bias -= bias;
		} else {
			bias += min;
			bias += 60 * (hour - offhour);
		}
		//把bias传给后台
		console.log(bias)
	});
>>>>>>> df5f76888f3b654be8cf07654b82d91cdb989c30
}