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

router.post('/update', function(req, res, next){
    console,log("This is Back-End")
    var pool = db.getPool();
    console.log(req.body);
    var big = req.body;
    res.send("asd")
    // var myArray1 = req.body.myArray1;
    // var myArray2 = req.body.myArray2;
    // var myArray3 = req.body.myArray3;
    // var state_1 = 1;
    // var state_2 = 2;
    // var state_3 = 3;

    // pool.getConnection((ex, conn) => {
    //     if(ex){
    //         console.log(ex);
    //     }
    //     else{
            
    //         // var query = conn.query('select * from todos');
    //         var query = conn.query('delete from todos');
    //         var add_query = 'insert into todos(content, state) values';

    //         for (var [key,value] of Object.entries(big)){ // dict key 호출
    //             for (var j=1; j<4; j++){        // 범위 : 1,2,3 == state
    //                 for (var i=0; i<value.length; i++){ // 범위 : 0~길이만큼      
                                                  
    //                     add_query += '("' + big[key][i]['content'] + '",' + j +');'  
    //                     console.log(add_query);
    //                 }
    //             }
    //         }
    //         var query = conn.query(add_query, (err, result) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             res.send("SUCCESS");
    //         }) 
    //         res.send("suc");
    //     }
    // })
})

module.exports = router;