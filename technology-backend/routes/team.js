var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/getUser', function(req, res, next){
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('select user_name, user_id from user', function (err, result) {
                if (err) {
                  console.error(err);
                  throw err;
                }
                // console.log(result)
                res.send(result);
        
                conn.release();
            });
        }
    });
});

router.post('/makeTeam', function(req, res, next){
    var name = req.body.name;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('insert into team(team_name, team_created_at, team_updated_at) values(?, now(), now())', name, function (err, result) {
                if (err) {
                  console.error(err);
                  throw err;
                }

                var num = result.insertId;
                res.send(num + "");
            });

            conn.release();
        }
    });
});

router.post('/makeMember', function(req, res, next){
    var teamNum = req.body.teamNum;
    var members = req.body.member;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            for(var i = 0; i < members.length; i++){
                // 1st. user table로 가서, 지금 가져온 members에 있는 이름의 user의 user_num을 가져옴
                // 2nd. 이 user_num과 teamNum을 이용하여 member table에 집어넣음

                var query = conn.query('select user_num from user where user_name = ?', members[i], function (err, result) {
                    if (err) {
                      console.error(err);
                      throw err;
                    }
                    
                    var query = conn.query('insert into blog.member(member_user, member_team, member_auth) values(?, ?, 0)', [result[0].user_num, teamNum], function (err, result) {
                        if (err) {
                          console.error(err);
                          throw err;
                        }
                    });
                });
            }
            conn.release();
        }
    });
});

router.post('/getTeamList', function(req, res, next){
    var userNum = req.body.num;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('select * from user as u inner join blog.member as m on u.user_num = m.member_user inner join team as t on m.member_team = t.team_num where u.user_num = ?', userNum, function(err, result){
                if(err){
                    console.log(err)
                    throw err
                }
                // console.log(result)
                res.send(result);
            })

            conn.release();
        }
    });
});

router.post('/getMember', function(req, res, next){
    var teamNum = req.body.teamNum;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('select * from team as t inner join blog.member as m on t.team_num = m.member_team inner join user as u on m.member_user = u.user_num where t.team_num = ?', teamNum, function(err, result){
                if(err){
                    console.log(err)
                    throw err
                }
                // console.log(result)
                res.send(result);
            })

            conn.release();
        }
    });
});

module.exports = router;
