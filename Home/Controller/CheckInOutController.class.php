<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class CheckInOutController extends Controller {
    public function checkIn() {
        $Model = new Model();
        $data['sid'] = I('post.sid');
        $data['aid'] = I('cookie.userId');
        $data['bias'] = I('post.bias');
        $data['date'] = date("Ymd");

        $result = $Model->table('ams_check_in_out_info')->add($data);
        if($result) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }
    public function checkOut() {
        $Model = new Model();
        $condition['sid'] = I('post.sid');
        $condition['date'] = date("Ymd");
        $bias = I('post.bias');

        $Model->table('ams_check_in_out_info')->where($condition)->setInc('bias',$bias);
    }
    public function getCheckInfo() {

    }
}