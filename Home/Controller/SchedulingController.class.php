<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class SchedulingController extends Controller {
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
        // if ($result) {
        //     $response['success'] = 1;
        // } else {
        //     $response['success'] = 2;
        // }
        $response['success'] = 1;
        $this->ajaxReturn($response,'JSON');
    }
    public function checkScheduling() {
        $user_id = I('cookie.userId');

        $Model = new Model();
        if (I('cookie.type') == 1) {
            $result = $Model->query("SELECT s.aid, s.stime, s.etime, s.weekday FROM ams_schedule s WHERE s.aid = '$user_id'");
            if ($result) {
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
            if ($result) {
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

    public function getAllFreeTime() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $sql = "SELECT * FROM ams_free_time f INNER JOIN ams_manage m ON f.aid = m.aid WHERE m.mid = '$mid'";
        $result = $Model->query($sql);
        // dump($result);
        // echo $Model->getLastSql();
        $free_time = array();
        if ($result) {
            foreach ($result as $key => $value) {
                $free_time[] = $value['aid'].$value['weekday'].$value['stime'].$value['etime'];
            }
            $response['success'] = 1;
            $response['data'] = $free_time;
        } else {
            $response['success'] = 0;
        }
        // dump($free_time);
        $this->ajaxReturn($response,'JSON');
    }

    public function getLastMonthWorkingHour() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $last_counting_time = $Model->query("SELECT MAX(time) AS time FROM ams_counting_time WHERE mid = '$mid'");
        $last_counting_time = $last_counting_time[0]['time'];
        $sql = "SELECT AMSa.id, AMSa.name, AMSa.email, AMSa.phone, AMSw.lel_time, AMSw.lel_work_hour, AMSw.work_hour FROM AMS_workHour AMSw 
                INNER JOIN AMS_assistant AMSa
                ON AMSw.aid = AMSa.id
                WHERE AMSw.time = '$last_counting_time'";
        $result = $Model->query($sql);
        $response['success'] = 1;
        $response['data'] = $result;
        $this->ajaxReturn($result,'JSON');
    }

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

        // dump($response);
        $this->ajaxReturn($response,'JSON');
        // $date = date("Ymd");
        // $Model->query("INSERT INTO ams_counting_time (mid, time) VALUES ('$mid', '$date')");
    }
}