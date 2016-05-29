<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class freeTimeManageController extends Controller {
    public function addfreeTime() {
        $aid = I('cookie.userId');
        $Model = new Model();
        $free_time_array = I('post.free_time');
        $Model->execute("DELETE FROM ams_free_time WHERE aid = '$aid'");
        foreach ($free_time_array as $key => $value) {
            $weekday = $value[0];
            $stime = substr($value, 1, 4);
            $etime = substr($value, 5, 4);
            $result = $Model->execute("INSERT INTO ams_free_time (aid, stime, etime, weekday) VALUES ('$aid', '$stime', '$etime', '$weekday')");
            if ($result) {
                $response['success'] = 1;
            } else {
                $response['success'] = 0;
            }
        }
        $this->ajaxReturn($response,'JSON');

    }
    public function getfreeTime() {
        $Model = new Model();
        $aid = I('cookie.userId');
        $free_time_of_a_assistant = $Model->query("SELECT * FROM ams_free_time f WHERE f.aid = '$aid'");
        $free_time = array();
        if ($free_time_of_a_assistant) {
            foreach ($free_time_of_a_assistant as $key => $value) {
                // $free_time_item['fid'] = $value['id'];
                $free_time[] = $value['weekday'].$value['stime'].$value['etime'];
                // array_push($free_time, $free_time_item);
            }
        }
        $this->ajaxReturn($free_time,'JSON');
        // dump($free_time);
    }
    // public function updatefreeTime() {
    //     $Model = new Model();
    //     $free_time = I('post.free_time');
    //     $aid = I('cookie.userId');
    //     $result = $Model->execute("DELETE FROM ams_free_time WHERE aid = '$aid'");
    //     if ($result) {
    //         $response['success'] = 1;
    //         foreach ($free_time as $key => $value) {
    //             $weekday = substr($value, 0, 1);
    //             $stime = substr($value, 1, 4);
    //             $etime = substr($value, 5, 4);
    //             $Model->execute("INSERT INTO ams_free_time (aid, stime, etime, weekday) VALUES ('$aid', '$stime', '$etime', '$weekday')");
    //         }
    //     } else {
    //         $response['success'] = 0;
    //     }
    //     $this->ajaxReturn($response,'JSON');
    // }
}
