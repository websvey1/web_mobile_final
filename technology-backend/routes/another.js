var express = require('express');
var router = express.Router();
var db = require("../database");
var async = require('async')

router.get('/', function(req, res, next) {
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('select user_num, user_id, user_email from user', 
            (err, result) => {
                if (err) {
                    console.error(err);
                    throw err;
                }
                var users = result

                var getUsers = []

                async.forEachOf(users, function(getuser, i, cb) {
                    var person = {
                        user_num: null, 
                        user_id: '',
                        user_email: '',
                        user_project: null,
                        user_post: null,
                        user_tech: null,
                    }
                    console.log(getuser)
                    var user_num = getuser.user_num;
                    person.user_num = user_num
                    person.user_id = getuser.user_id;
                    person.user_email = getuser.user_email;
                    getUsers.push(person)
                    console.log(getUsers)
                    
                    async.series([
                        function(callback){
                            if (err) {
                                callback('fail');
                            }
                            var query = conn.query(
                            'select t.tech_name from user as u inner join favor as f on f.favor_user = u.user_num inner join tech as t on f.favor_tech = t.tech_num where u.user_num =' + user_num + ';',
                            (err, result) => {
                                if (err){
                                    console.error(err);
                                    throw err;
                                }

                                person.user_tech = result;
                                console.log(person.user_tech)
                                console.log(person)
                            })
                            getUsers.push(person)

                        },

                        function(callback) {
                            if (err) {
                                callback('fail');
                            }
                            var query = conn.query('select count(post_num) from post where post_user =' + user_num + ';',
                            (err, result) => {
                                if (err) {
                                    console.error(err);
                                    throw err;
                                }
                                person.user_post = result;
                            })
                        },

                        function(callback) {
                            if (err) {
                                callback('fail');
                            }
                            var query = conn.query('select count(project_num) from project where project_user =' + user_num + ';',
                            (err, result) => {
                                if (err) {
                                    console.error(err);
                                    throw err;
                                }
                                person.user_project = result;
                            })
                        }],
                        function(err, results) {
                            if(err) {
                                console.log(err);
                            }
                            console.log(result)
                            console.log(person)
                            getUsers.push(person)
                    });
                     
                })
                res.send(getUsers);
            })
        }
    conn.release();
    })
})

module.exports = router;