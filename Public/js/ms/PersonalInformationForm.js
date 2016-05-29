window.onload = function() {
    document.getElementById("assure").style.display = "none";
    document.getElementById("PersonalInformationForm").style.display = "";
    document.getElementById("pas").style.display = "none";
    document.getElementById("au_pas").style.display = "none";
    document.getElementById("err").style.display = "none";
    document.getElementById("err0").style.display = "none";
    document.getElementById("savepersonalinfo").innerHTML = "修改";
    $("#password").blur(function() {
        if ($("#password").val().length <= 8 && $("#password").val().length > 0) {
            document.getElementById("err0").style.display = "";
        } else {
            document.getElementById("err0").style.display = "none";
        }
    });
    $("#au_password").blur(function() {
        if ($("#au_password").val() !== $("#password").val() && $("#password").val().length > 8) {
            document.getElementById("err").style.display = "";
        } else {
            document.getElementById("err").style.display = "none";
        }
    });
    add_banner();
    gotofunc();
    giveInfo();
    assure();
    addDangerAlert();
    setInfo()
}

function setInfo() { //显示从后台返回的个人信息
    var check_passwd_url = url + '/getUserInfo';
    $.ajax({
        url: check_passwd_url,
        type: 'post',
        dataType: 'json',
        // data: data,
        success: function(res) {
            console.log(res);
            if (res['success'] == 1) {
                $("#name").val(res['data'][0]['name']);
                $("#phone").val(res['data'][0]['phone']);
                $("#email").val(res['data'][0]['email']);
                closeDangerAlter();
            } else {
                openDangerAlter('请求失败');
            }
        }, error: function(err) {
            console.log(err);
        }
    });
}

function giveInfo() { //将设置好的个人信息交互给后台
    $("#savepersonalinfo").click(function() {
        if (this.innerHTML === "修改") {
            document.getElementById("assure").style.display = "";
            document.getElementById("PersonalInformationForm").style.display = "none";
        } else if (this.innerHTML === "保存") {
            var info = $("#infoform").serializeArray();
            var update_info_url = url + '/updateUserInfo';
            console.log(update_info_url);
            $.ajax({
                url: update_info_url,
                type: 'post',
                dataType: 'JSON',
                data: info,
                success: function(res) {
                    if (res['success'] == 1) {
                         window.location.reload();
                    } else {
                        openDangerAlter('更新失败');
                    }
                    console.log(res);
                }, error: function(err) {
                    console.log(err);
                }
            });
            console.log(info);
        }
    });
}

function assure() {
    $("#confirm").click(function() {
        data = $("#assureform").serializeArray();
        var check_passwd_url = url + '/checkUser';
        $.ajax({
            url: check_passwd_url,
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(res) {
                console.log(res);
                if (res['success'] == 1) {
                    document.getElementById("savepersonalinfo").innerHTML = "保存";
                    document.getElementById("pas").style.display = "";
                    document.getElementById("au_pas").style.display = "";
                    document.getElementById("PersonalInformationForm").style.display = "";
                    document.getElementById("assure").style.display = "none";
                    closeDangerAlter();
                } else {
                    openDangerAlter('密码错误');
                }
            }, error: function(err) {
                console.log(err);
            }
        });

        
    });
}