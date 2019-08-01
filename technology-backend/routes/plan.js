var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/personal', function(req, res, next){
    var user_num = req.body.data.num;
    var data = req.body.body;
    // console.log(data)
    
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('insert into calendar(user_num, cal_title, cal_start, cal_end, cal_color, cal_description, cal_category) values(?, ?, ?, ?, ?, ?, 0)', [user_num, data.title, data.start, data.end, data.cssClass, data.description], function (err, result) {
                if (err) {
                  console.error(err);
                  throw err;
                }

                res.send(data);
        
                conn.release();
            });
        }
    });
});

router.post('/team', function(req, res, next){
    var user_num = req.body.data.num;
    var data = req.body.body;
    // console.log(data)
    
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('insert into calendar(user_num, cal_title, cal_start, cal_end, cal_color, cal_description, cal_category) values(?, ?, ?, ?, ?, ?, 1)', [user_num, data.title, data.start, data.end, data.cssClass, data.description], function (err, result) {
                if (err) {
                  console.error(err);
                  throw err;
                }

                res.send(data);
        
                conn.release();
            });
        }
    });
});

router.post('/getPlan', function(req, res, next){
    var user_num = req.body.num;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('select cal_title, cal_start, cal_end, cal_color, cal_description from calendar where user_num = ? and cal_category = 0', user_num, function (err, result) {
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

router.post('/getTeamPlan', function(req, res, next){
    var user_num = req.body.num;
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('select cal_title, cal_start, cal_end, cal_color, cal_description from calendar where user_num = ? and cal_category = 1', user_num, function (err, result) {
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

module.exports = router;