# 中山大学勤工俭学助理管理系统
# Assistant Management System (SYSU)

###系统部署：
- 系统前端使用html/css/javascript
- 后台采用php和thinkphp框架
- 数据库使用mysql

####Unix系统中：
安装LAMP(Linux + Apache + Mysql + Php)环境本系统中使用的版本分别是：
- Linux: centOS 6.5
- Apache: 2.2.15
- Mysql: 5.6.29
- php: 5.6.18

将所有文件放入`/var/www/html/`(Apache项目的默认文件)中，在terminal中执行：
```
# sh setDBPassword.sh <your-mysql-password>  //配置数据库密码
# sh configDB.sh  //配置数据库表
# cd ..
# chmod -R 777 AMS //修改权限，让其可以创建运行时缓存文件，即Runtime中的文件
```
在浏览器中输入localhost/AMS/index.php/Home/ManagerManage/DepartAdminForm.html**超级管理员** 界面，创建部门及管理部门的管理员
在浏览器中输入localhost/AMS/index.php/Home/Index/home进入登录界面

###系统主要功能：
- 超级管理员：添加/注销管理员，添加部门
- 管理员：添加/注销助理，排班，结算工时，修改个人信息 *注：管理员账号需要被添加后才能登陆，登陆初始密码为工号*
- 助理：登记空闲时间，登记上下班，修改个人信息，查看排班表 *注：助理账号需要被添加后才能登陆，登陆初始密码为工号*

