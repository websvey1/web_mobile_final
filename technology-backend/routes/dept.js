var express = require('express');
var router = express.Router();
var db = require("../database")

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var dept_no = req.params.id;

  var pool = db.getPool();
  pool.getConnection((ex, conn) => {
    if(ex){
      console.log(ex);
    }
    else{
      var query = conn.query('select * from dept where dept_no = ?',dept_no, function (err, result) {
        if (err) {
          console.error(err);
          throw err;
        }

        // res.json(result);
        res.send(result);

        conn.release();
      });
    }
  });
});

module.exports = router;

//표준
