var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res, next) {
    var id = req.body.id;
    var pool = db.getPool();
  
    pool.getConnection((ex, conn) => {
        if (ex) {
            console.log(ex);
        }
        else {
            var movies = conn.query('select * from project where project_team = ?', id, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
                res.send(result);
            });
        }
        conn.release();
    });    
})

module.exports = router;