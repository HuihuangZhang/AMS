<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function home() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/LoginInForm');
        } else {
            $this->redirect('HomePage');
        }
    }
}