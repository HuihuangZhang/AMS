<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class AssistantManageController extends Controller {
    public function addAssistant() {
        // if return 1, assistant is added successfully; if 0, the assistant already existd.
        // if 3, assistant is added failed;
        $Model = new Model();
        $assistantForm = M('assistant');
        $manageForm = M('manage');
        $assistant['id'] = I('post.aid');
        $aid = I('post.aid');
        
        // the code below checks if the assistant is existed aready.
        $found = $Model->query("SELECT * FROM ams_assistant WHERE id='$aid' LIMIT 1");
        if ($found) {
            $response['success'] = 0;
        } else {
            // Adding assistant in table ams_assistant
            $assistant['passwd'] = $assistant['id'];
            $aresult = $Model->query("INSERT INTO ams_assistant (id, passwd) VALUES ('$aid', '$aid')");

            // Adding management infomation in table ams_manage (aid, mid)
            $mid = I('cookie.userId');
            $mresult = $Model->query("INSERT INTO ams_manage (aid, mid) VALUES ('$aid', '$mid')");
            if($aresult && $mresult) {
                $response['success'] = 1;
            } else {
                $response['success'] = 3;
            }
        }
        $this->ajaxReturn($response,"JSON");
    }

    public function delAssistant() {
        // if flag bit is 1, which indicates the assistant is deleted successfully;

        $assistantForm = M('assistant');
        $map['id'] = I('post.aid');
        $assistantForm->where($map)->delete();
        $response['success'] = 1;
        $this->ajaxReturn($response,"JSON");
    }

    public function getAllAssistants() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $result = $Model->query("SELECT a.id, a.name, a.phone, a.email
                                FROM ams_assistant a
                                INNER JOIN ams_manage m ON a.id = m.aid
                                INNER JOIN ams_manager mr ON m.mid = mr.id
                                WHERE mr.id = '$mid'"
                                );
        if ($result) {
            $response['success'] = 1;
            $response['data'] = $result;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($result,'JSON');
    }
}