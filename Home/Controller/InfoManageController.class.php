<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class InfoManageController extends Controller {
    public function updateUserInfo() {
        $Model = new Model();
        $aid = $_COOKIE['userId'];
        $email = I('post.email');
        $name = I('post.name');
        $phone = I('post.phone');
        $passwd = I('post.passwd');

        if ($passwd == "") {
            $result = $Model->execute("UPDATE ams_assistant SET name='$name', email='$email', phone='$phone' WHERE id='$aid'");
        } else {
            $result = $Model->execute("UPDATE ams_assistant SET name='$name', email='$email', phone='$phone', passwd='$passwd' WHERE id='$aid'");
            $response['succe'] = 1;
        }
        if($result) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function getUserInfo() {
        $Model = new Model();
        $aid = I('cookie.userId');
        $res_data = $Model->query("SELECT name, phone, email, department FROM ams_assistant WHERE id = '$aid' LIMIT 1");
        if($res_data) {
            $response['success'] = 1;
            $response['data'] = $res_data;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,"JSON");
    }

    public function checkUser() {
        $Model = new Model();
        $passwd = I('post.passwd');
        $aid = I('cookie.userId');
        $result = $Model->query("SELECT * FROM ams_assistant WHERE id = '$aid' AND passwd = '$passwd' LIMIT 1");
        if ($result) {
            $response['success'] = 1;
            $res_data = $Model->query("SELECT name, phone, email, department FROM ams_assistant WHERE id = '$aid' LIMIT 1");
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }
}