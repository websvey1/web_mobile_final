var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res, next){
    var teamNum = req.body.teamNum;
    var members = req.body.member;
    var pool = db.getPool();
    // console.log("?????");
    console.log(teamNum);
    console.log(members);
    // console.log(members.length);
    var list = [];

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

module.exports = router;