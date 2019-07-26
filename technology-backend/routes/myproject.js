var express = require('express');
var router = express.Router();
var db = require("../database")

router.post('/create', function(req, res, next) {
    var pool = db.getPool();
    console.log('개씨발닝러ㅏㄴ이ㅏ러닝러닝러ㅏ니ㅏ러니ㅓㅏㅣ');
    
    console.log(req.body);
    console.log('개씨발닝러ㅏㄴ이ㅏ러닝러닝러ㅏ니ㅏ러니ㅓㅏㅣ');

    var user = req.body.user;
    var title = req.body.title;
    var goal = req.body.goal;
    var status = req.body.status;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var git_url = req.body.git_url;
    var content = req.body.content;
    var tech = req.body.tech;
    var share = req.body.share;
    var category = '0';

    pool.getConnection((ex, conn) => {
        if(ex){
          console.log(ex);
        }
        else{
          var query = conn.query('insert into project(project_user, project_title, project_goal, project_start_date, project_end_date,' + 
          'project_tech,project_content,project_status,project_git_url,project_share, project_category)' + 
          'values("'+ 1 + '","' + title + '","' + goal + '","' + start_date + '","' + end_date + '","' + tech + '","' + content + '","' +
          status + '","' + git_url + '","' + share + '","' + category + '")',
            function (err, result) {
            if (err) {
              console.error(err);
              throw err;
            }
    
            res.send("Success");
          });
        }
    });
}) 

module.exports = router;