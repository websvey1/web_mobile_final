var express = require('express');
var router = express.Router();
var db = require("../database");
var async = require('async')

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


module.exports = router;