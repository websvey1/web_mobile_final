var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res, next){
    // console.log(req.body.num);
    var userNum = req.body.num;
    var pool = db.getPool();
    console.log("ajsdlfjkasldkfjalsdfjklaskdfjlasdkjflasdkj")
    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            // 먼저 지금 로그인 한 user가 << 어떠한 Team들에 속해있는지에 대한 data >> 가져옴
            var query = conn.query('select member_team from blog.member where member_user = ?', userNum, function (err, result) {
                if (err) {
                  console.error(err);
                  throw err;
                }
                
                // Team이 복수임을 고려
                for(var i = 0; i < result.length; i++){
                    var teamName = '';
                    var teamMember = [];

                    // 각 Team의 << Team Name >> 을 가져옴
                    var query = conn.query('select team_name from team where team_num = ?', result[i].member_team, function (err, result){
                        if (err){
                            console.log(error);
                            throw err;
                        }
                        teamName = result.team_name;
                    })
                    console.log("Here!!!!!!")
                    console.log(query);
                    console.log(teamName);
                    // 각 Team에 << 속해있는 member들 >> 을 가져옴
                    var query = conn.query('select member_user from blog.member where member_team = ?', result[i].member_team, function (err, result){
                        if (err){
                            console.log(error);
                            throw err;
                        }
                        
                        // Member가 복수임을 고려
                        for(var k = 0; k < result.length; k++){
                            // 각 member들의 << 이름 >> 을 가져옴
                            var query = conn.query('select user_name from user where user_num = ?', result[k].member_user, function (err, result){
                                if (err){
                                    console.log(error);
                                    throw err;
                                }
                                
                                console.log(result)
                            })
                        }
                    })

                }
        
                conn.release();
            });
        }
    });
});

module.exports = router;