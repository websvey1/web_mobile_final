var express = require('express');
var router = express.Router();
var db = require("../database")

router.post('/login', function(req, res, next) {
  var pool = db.getPool();
  var id = req.body.id;
  var password = req.body.password;
  console.log(req.body);

  pool.getConnection((ex, conn) => {
    if(ex){
      console.log(ex);
    }
    else{
      var query = conn.query('select user_num, user_id, user_email, user_name, user_created_at, user_updated_at from user where user_id = "'+id+'" and user_password = "'+password+'"',
      // var query = conn.query('select user_num, user_id, user_email, user_name, user_created_at, user_updated_at from user where user_id = "myeong" and user_password = "12345";',
        function (err, result) {
        if (err) {
          console.error(err);
          conn.release();
          throw err;
        }

        res.send(result);
      });
    }
    conn.release();
  });
});

router.post('/adduser', function(req, res, next) {
  var pool = db.getPool();
  var id = req.body.id;
  var password = req.body.password;
  var email = req.body.password;
  var name = req.body.name;

  pool.getConnection((ex, conn) => {
    if(ex){
      console.log(ex);
    }
    else{
      var query = conn.query('insert into user(user_id, user_password, user_email, user_name) values("'+id+'","' +password+'","'+email+'","' +name + '")',
        function (err, result) {
        if (err) {
          console.error(err);
          conn.release();
          throw err;
        }

        res.send("Success");
      });
    }
    conn.release();
  });
});
module.exports = router;

//표준
