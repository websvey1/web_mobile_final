var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res, next){
    var name = req.body.name;
    var pool = db.getPool();
    console.log("?????");
    console.log(name);

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

module.exports = router;