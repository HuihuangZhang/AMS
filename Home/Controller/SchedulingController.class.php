<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class SchedulingController extends Controller {
    // 添加排班表
    public function scheduling() {
        $Model = new Model();
        $schedule = I('post.scheduling');
        foreach ($schedule as $key => $value) {
            $aid = substr($value, 0, 8);
            $weekday = substr($value, 8, 1);
            $stime = substr($value, 9, 4);
            $etime = substr($value, 13, 4);
            $Model->execute("INSERT INTO ams_schedule (aid, stime, etime, weekday) VALUES ('$aid', '$stime', '$etime', '$weekday')");
        }
        $response['success'] = 1;
        $this->ajaxReturn($response,'JSON');
    }

    // 查看時間表，分助理的時間表和管理員查看自己管轄助理的排班表
    public function getScheduling() {
        $user_id = I('cookie.userId');

        $Model = new Model();
        if (I('cookie.type') == 1) {
            $result = $Model->query("SELECT s.aid, s.stime, s.etime, s.weekday FROM ams_schedule s WHERE s.aid = '$user_id'");
            if (!empty($result)) {
                $response['success'] = 1;
                $scheduling = array();
                foreach ($result as $key => $scheduling_item) {
                    $scheduling[] = $scheduling_item['aid'].$scheduling_item['weekday'].$scheduling_item['stime'].$scheduling_item['etime'];
                }
                $response['data'] = $scheduling;
            } else {
                $response['success'] = 0;
            }
        } else if (I('cookie.type') == 2) {
            $sql = "SELECT s.aid, s.stime, s.etime, s.weekday FROM ams_manage m INNER JOIN ams_schedule s ON m.aid = s.aid WHERE m.mid = '$user_id'";
            $result = $Model->query($sql);
            if (!empty($result)) {
                $response['success'] = 1;
                $scheduling = array();
                foreach ($result as $key => $scheduling_item) {
                    $scheduling[] = $scheduling_item['aid'].$scheduling_item['weekday'].$scheduling_item['stime'].$scheduling_item['etime'];
                }
                $response['data'] = $scheduling;
            } else {
                $response['success'] = 0;
            }
        }

        $this->ajaxReturn($response, 'JSON');
    }

    // 取得上一個結算月的工時
    public function getLastMonthWorkingHour() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $last_counting_time = $Model->query("SELECT MAX(time) AS time FROM ams_counting_time WHERE mid = '$mid'");
        $last_counting_time = $last_counting_time[0]['time'];
        $sql = "SELECT AMSa.id, AMSa.name, AMSa.email, AMSa.phone, AMSw.lel_time, AMSw.lel_work_hour, AMSw.work_hour FROM ams_work_hour AMSw 
                INNER JOIN AMS_assistant AMSa
                ON AMSw.aid = AMSa.id
                WHERE AMSw.time = '$last_counting_time'";
        $result = $Model->query($sql);
        $response['success'] = 1;
        $response['data'] = $result;
        $this->ajaxReturn($result,'JSON');
    }

    // 結算工時
    public function countWorkingHour() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $last_counting_time = $Model->query("SELECT MAX(time) AS time FROM ams_counting_time WHERE mid = '$mid'");
        $last_counting_time = $last_counting_time[0]['time'];
        // SELECT Tempa.id AS aid, Tempa.name, Tempa.email, Tempa.phone, Temps.stime, Temps.etime, Tempc.bias 
        // FROM ((SELECT aid, id, stime, etime
        //     FROM ams_schedule 
        //     WHERE EXISTS 
        //         (SELECT * 
        //         FROM ams_manage 
        //         WHERE ams_manage.mid = '$mid'  AND ams_schedule.aid = ams_manage.aid)) AS Temps 
        // INNER JOIN (SELECT sid, bias 
        //     FROM AMS_checkInOutInfo 
        //     WHERE date > '$last_counting_time' AND EXISTS 
        //         (SELECT * 
        //         FROM ams_manage 
        //         WHERE ams_manage.mid = '$mid' AND AMS_checkInOutInfo.aid = ams_manage.aid)) AS Tempc ON Temps.id = Tempc.sid
        // INNER JOIN AMS_assistant AS Tempa ON Temps.aid = Tempa.id
        // )
        // dump($last_counting_time);

        $sql = "SELECT Tempa.id AS aid, Tempa.name, Tempa.email, Tempa.phone, Temps.stime, Temps.etime, Tempc.bias 
                FROM ((SELECT aid, id, stime, etime
                    FROM ams_schedule 
                    WHERE EXISTS 
                        (SELECT * 
                        FROM ams_manage 
                        WHERE ams_manage.mid = '$mid'  AND ams_schedule.aid = ams_manage.aid)) AS Temps 
                INNER JOIN (SELECT sid, bias 
                    FROM AMS_checkInOutInfo 
                    WHERE date > '$last_counting_time' AND EXISTS 
                        (SELECT * 
                        FROM ams_manage 
                        WHERE ams_manage.mid = '$mid' AND AMS_checkInOutInfo.aid = ams_manage.aid)) AS Tempc ON Temps.id = Tempc.sid
                INNER JOIN AMS_assistant AS Tempa ON Temps.aid = Tempa.id
                )";
        $result = $Model->query($sql);
        // $val1 = '1300';
        // $val2 = '1430';
        // $temp =  (int)$val2 - (int)$val1;
        // $time = (int)($temp / 100) + (($temp % 100) / 60);
        // dump($time);
        // dump($result);
        $id = array();
        foreach ($result as $outterk => $outterv) {
            if (in_array($outterv['aid'], $id)) {
                if ($outterv['bias'] < 0) {
                    $lel_time[$outterv['aid']] += 1;
                    $lel_work_hour[$outterv['aid']] += $time;
                } else {
                    $work_hour[$outterv['aid']] += $time;
                }
            } else {
                $id[] = $outterv['aid'];
                $name[$outterv['aid']] = $outterv['name'];
                $email[$outterv['aid']] = $outterv['email'];
                $phone[$outterv['aid']] = $outterv['phone'];
                $temp = intval($outterv['etime']) - intval($outterv['stime']);
                $time = (int)($temp / 100) + (($temp % 100) / 60);
                // dump($time);
                if ($outterv['bias'] < 0) {
                    $lel_time[$outterv['aid']] = 1;
                    $lel_work_hour[$outterv['aid']] = $time;
                } else {
                    $work_hour[$outterv['aid']] = $time;
                }
            }
        }

        $response['success'] = 1;
        $response['id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        $response['phone'] = $phone;
        $response['lel_time'] = $lel_time;
        $response['lel_work_hour'] = $lel_work_hour;
        $response['work_hour'] = $work_hour;

        $date = date("Ymd");
        $Model->execute("INSERT INTO ams_counting_time (mid, time) VALUES ('$mid', '$date')");
        // dump($response);
        $this->ajaxReturn($response,'JSON');
    }

    // 获得排班表页面
    public function getSchedulingForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('ShowSchedulingForm');
        }
    }

    // 排班页面
    public function schedulingForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('ScheduleForm');
        }
    }

    // 统计工时
    public function workingHourForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('WorkHour');
        }
    }
}