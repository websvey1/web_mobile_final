var express = require('express');
var router = express.Router();
var db = require("../database");

router.get('/', function(req, res, next){
    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);

        }
        else {
            var movies = conn.query('select * from todos', function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.send(result);
            });
        }
        conn.release()
    });
})

router.get('/:id', function(req, res, next){
    var pool = db.getPool();

    var prime_key = req.params.id;
    console.log(prime_key);

    pool.getConnection((ex, conn) => {
        if (ex) {
            console.log(ex);
        }
        else{
            var query = conn.query('select * from todos where id = ' + prime_key + ';',
                function(err, result) {
                    if (err) {
                        console.error(err);
                        conn.release();
                        throw err;
                    }
                })
            }
        conn.release();
        })
    })

router.put('/update', function(req, res, next){
    var pool = db.getPool();

    console.log(req.body);

    var myArray1 = req.body.myArray1;
    var myArray2 = req.body.myArray2;
    var myArray3 = req.body.myArray3;

    pool.getConnection((ex, conn) => {
        if(ex){
            console.log(ex);
        }
        else{
            /*var sql = ""
            var query = conn.query('update todos set status =' + state + '')
*/
            console.log('TTTT')
            res.send("suc")
        }
    })
}) 
module.exports = router;