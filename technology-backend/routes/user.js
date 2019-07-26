var express = require('express');
var router = express.Router();
var db = require("../database")

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
          throw err;
        }

        res.send("Success");
      });
    }
  });
});


module.exports = router;

//표준
