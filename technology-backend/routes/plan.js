var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res, next){
    var data = req.body.body;
    console.log(data)
    
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }else{
            var query = conn.query('insert into calendar(user_num, cal_title, cal_start, cal_end, cal_color, cal_description) values(1, ?, ?, ?, ?, ?)', [data.title, data.start, data.end, data.cssClass, data.description], function (err, result) {
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

module.exports = router;