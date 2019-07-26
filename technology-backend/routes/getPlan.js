var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res, next){
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('select cal_title, cal_start, cal_end, cal_color, cal_description from calendar where user_num = 1', function (err, result) {
                if (err) {
                  console.error(err);
                  throw err;
                }
                console.log(result)
                res.send(result);
        
                conn.release();
            });
        }
    });
});

module.exports = router;