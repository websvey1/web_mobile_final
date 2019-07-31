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

                    // console.log(reqult);
                    // var project = {
                    //     project : result,
                    //     images : null,
                    // }
                    // var query = conn.query('select ')
                }

            )
        }
        conn.release();
    })
}
)

// router.post('/create', function(req, res, next){
//     vaar pool = db.getPool();

//     console.log(req.body);

//     var content = req.body.content;
//     var state = req.body.state;

//     pool.getConnection((ex, conn) => {
//         if(ex){
//             console.log(ex);

//         }
//         else{
//             var query = conn.query()
//         }
//     })
// }) 
module.exports = router;