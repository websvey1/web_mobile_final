var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/getUsers', function(req, res, next) {
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else{
            var query = conn.query('select user_num from user', 
            function(err, result){
                if(err) {
                    console.error(err);
                    throw err;
                }
                res.send(result);
            })
        }
        conn.release();
    })
})

router.post('/getInfo', function(req, res, next) {
    var userNum = req.body.userNum;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var userTech = null;

            var query = conn.query(
            'select t.tech_name from user as u inner join favor as f on f.favor_user = u.user_num inner join tech as t on f.favor_tech = t.tech_num where u.user_num =' + userNum + ';',
            function(err, result) {
                if (err){
                    console.error(err);
                    throw err;
                }

                var info = {
                    userN: '',
                    userId: '',
                    userEmail: '',
                    userTech: [],
                    userProject: '',
                    userPost: ''
                }
                if (result == '[]') {
                    info.userTech = null
                }
                else {
                    for (var i=0; i < result.length; i++){
                        info.userTech.push(result[i].tech_name)
                    }

                    var query = conn.query('select project_num from project where project_user =' + userNum + ';',
                    function(err, result) {
                        if (err){
                            console.error(err);
                            throw err;
                        }
                        info.userProject = result.length

                        var query = conn.query('select post_num from post where post_user =' + userNum + ';',
                        function(err, result) {
                            if (err){
                                console.error(err);
                                throw err;
                            }
                            
                            info.userPost = result.length

                            var query = conn.query('select user_num, user_id, user_email from user where user_num = ' + userNum + ';',
                            function(err, result) {
                                if (err){
                                    console.error(err);
                                    throw err;
                                }
                                info.userN = result[0].user_num
                                info.userId = result[0].user_id
                                info.userEmail = result[0].user_email
                                
                                res.send(info)
                            })
                        })
                    })
                }
            })
        }
        conn.release();
    })
})

router.post('/readuser', function(req, res, next) {
    var userNum = req.body.userNum;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query(
            'select t.tech_name from user as u inner join favor as f on f.favor_user = u.user_num inner join tech as t on f.favor_tech = t.tech_num where u.user_num =' + userNum + ';',
            function(err, result) {
                if (err){
                    console.error(err);
                    throw err;
                }
                var info = {
                    usernum: '',
                    userId: '',
                    userEmail: '',
                    userTech: [],
                }
                if (result == '[]') {
                    info.userTech = null
                }
                else {
                    for (var i=0; i < result.length; i++){
                        info.userTech.push(result[i].tech_name)
                    }

                    var query = conn.query('select user_num, user_id, user_email from user where user_num = ' + userNum + ';',
                    function(err, result) {
                        if (err){
                            console.error(err);
                            throw err;
                        }
                        info.usernum = result[0].user_num
                        info.userId = result[0].user_id
                        info.userEmail = result[0].user_email
                        
                        res.send(info)
                        console.log(info)
                    })
                }
            })
        }
        conn.release();
    })
})

router.post('/getproject', function(req, res, next) {
    var userNum = req.body.userNum;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('select project_num, project_title, project_goal, project_status from project where project_category = 0 and project_share = 0 and project_user = ?', userNum, 
            function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                console.log(result)
                res.send(result)
            })
        }
    conn.release()
    })
})

router.post('/teamproject', function(req, res, next) {
    var userNum = req.body.userNum;
    var pool = db.getPool()

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('select t.team_num, t.team_name, p.project_num, p.project_user, p.project_title, p.project_goal, p.project_status from user as u inner join blog.member as m on u.user_num = m.member_user inner join team as t on m.member_team = t.team_num inner join project as p on p.project_team = t.team_num where m.member_auth = 1 and p.project_category = 1 and p.project_share = 0 and u.user_num = ?', userNum, function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                res.send(result)
            })
        }
        conn.release()
    })
})

router.post('/member', function(req, res, next) {
    var teamNum = req.body.teamNum
    var pool = db.getPool()

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('select t.team_num, t.team_name, u.user_id from blog.member as m inner join team as t on m.member_team = t.team_num inner join user as u on u.user_num = m.member_user where t.team_num = ?', teamNum,
            function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                console.log(result)
                var member = []
                for (var i=0; i < result.length; i++){
                    member.push(result[i].user_id)
                }
                console.log(member)
                res.send(member)
            })
        }
    conn.release()
    })
})

router.post('/getpost', function(req, res, next) {
    var userNum = req.body.userNum
    var pool = db.getPool()

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('select p.post_num, p.post_title, p.post_category, t.tag_name from post as p inner join tag as t on t.tag_post = p.post_num where post_share = 0 and post_user = ?', userNum,
            function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                res.send(result)
            })
        }
    conn.release()
    })
})
module.exports = router;