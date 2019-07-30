var express = require('express');
var router = express.Router();
var db = require("../database");

router.get('/', function(req, res, next) {
  var pool = db.getPool();
  
  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    }
    else {
      var movies = conn.query('select * from project', function (err, result) {
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

router.get('/:id', function(req, res, next) {
  var pool = db.getPool();

  var project_num = req.params.id;
  console.log(project_num);
  
  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    }
    else {
      var query = conn.query('select * from project where project_num = ' + project_num + ';', 
        function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }

          console.log(result);
          var project = {
            project: result,
            images: null,
          }

          var query = conn.query('select pjt.project_num, pjt.project_title, i.image_url from project as pjt inner join imageconnector as ic on ic.imageconn_project = pjt.project_num inner join image as i on ic.imageconn_image = i.image_num where ic.imageconn_project =' + project_num + ';',
          function(err, result) {
            if (err) {
              console.error(err);
              conn.release();
              throw err;
            }

            project.images = result

            console.log(project);
            res.send(project);
          })
        })
      }
    conn.release();
  })
})

router.post('/create', function(req, res, next) {
    var pool = db.getPool();
    
    console.log(req.body);

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
    var category = '1';
    var images = req.body.imgArray;

    pool.getConnection((ex, conn) => {
        if(ex){
          console.log(ex);
        }
        else{
          var query = conn.query('insert into project(project_user, project_title, project_goal, project_start_date, project_end_date,' + 
          'project_tech,project_content,project_status,project_git_url,project_share, project_category)' + 
          'values("'+ 1 + '","' + title + '","' + goal + '","' + start_date + '","' + end_date + '","' + tech + '","' + content + '","' +
          status + '","' + git_url + '","' + share + '","' + category + '")',
            (err, result) => {
            if (err) {
              console.error(err);
              throw err;
            }
            
            var project_num = result.insertId;
            console.log(project_num)
            
            var img_query = 'insert into image(image_url) values';

            if (images.length > 0) {
              for (var i=0; i < images.length; i++) {
                var img = images[i]
                console.log(img)
                img_query += '("' + img + '")';
                if (i+1 == images.length) {
                  img_query += ';'
                } else {
                  img_query += ','
                }     
              }
              
              var imgquery = conn.query(img_query, (err, result) => {
                if (err) {
                  console.error(err);
                  throw err;
                }
                var image_num = result.insertId;
                console.log(image_num);

                var imgleng = images.length;
                var imgcnt = image_num + images.length
                console.log(imgleng)
  
                var imgconn_query = 'insert into imageconnector(imageconn_image, imageconn_project, imageconn_category, imageconn_index) values';
                for (var j=0; image_num + j < imgcnt; j++) {
                  var imgnum = image_num + j
                  imgconn_query += '(' + imgnum + ',' + project_num + ', 1, 0)'
                  if (imgnum == imgcnt - 1) {
                    imgconn_query += ';'
                  } else {
                    imgconn_query += ','
                  }
                }
  
                console.log(imgconn_query)
                var imgconnquery = conn.query(imgconn_query, (err, result) => {
                  if (err) {
                    console.error(err);
                    throw err;
                  }
                  res.send("Success");
                })
              })
            } else {
              res.send("Out of range");
            }
          });
        }
    });
});

module.exports = router;