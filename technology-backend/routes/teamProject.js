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
            var movies = conn.query('select * from project where project_team = ? and project_category = 1', id, function (err, result) {
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

router.post('/create', function(req, res, next) {
    var teamNum = req.body.teamNum;
    var project = req.body.project;

    var pool = db.getPool();
    console.log(project)

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('insert into project(project_user, project_title, project_captain, project_team, project_goal, project_status, project_start_date, project_end_date, project_git_url, project_content, project_tech, project_share, project_category, project_modify) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [project.user, project.title, project.captain, teamNum, project.goal, project.status, project.start_date, project.end_date, project.git_url, project.content, project.tech, project.share, project.category, project.modify], function(err, result) {
                if (err) {
                    console.error(err)
                    throw err
                }
                var projectNum = result.insertId;
                console.log(projectNum)
                res.send(projectNum+'')
            })
        }
        conn.release();
    })
})

router.post('/images', function(req, res, next) {
    var teamNum = req.body.teamNum
    var pjtNum = req.body.pjtNum
    var image = req.body.image
    var category = '1'

    var pool = db.getPool();

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex);
        }
        else {
            var query = conn.query('insert into image(image_url) values (?)', image, function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                var imgNum = result.insertId;

                var query = conn.query('insert into imageconnector(imageconn_image, imageconn_project, imageconn_category) values (?, ?, ?)', 
                [imgNum, pjtNum, category], function(err, result) {
                    if (err) {
                        console.error(err)
                        throw err
                    }
                    res.send("Success!")
                })
                
            })
        conn.release();
        }
    })
})

router.post('/getproject', function(req, res, next) {
    var teamNum = req.body.teamNum
    var pjtNum = req.body.pjtNum

    var pool = db.getPool()

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex)
        }
        else {
            var query = conn.query('select * from project where project_num = ? and project_team = ?', [pjtNum, teamNum], function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                res.send(result)
            })
        }
        conn.release();
    })
})

router.post('/getimage', function(req, res, next) {
    var pjtNum = req.body.pjtNum 

    var pool = db.getPool()

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex)
        }
        else {
            var query = conn.query('select i.image_url from project as pjt inner join imageconnector as ic on ic.imageconn_project = pjt.project_num inner join image as i on ic.imageconn_image = i.image_num where ic.imageconn_category = 1 and ic.imageconn_project =' + pjtNum + ';',            
            function(err, result) {
                if (err){
                    console.error(err)
                    throw err
                }
                res.send(result)
            })
        }
        conn.release();
    })
})

router.post('/getpjt', function(req, res, next) {
    var pjtNum = req.body.pjtNum 
    var pool = db.getPool()

    pool.getConnection((ex, conn) => {
        if (ex){
            console.log(ex)
        }
        else {
            var query = conn.query('select * from project where project_category = 1 and project_num = ' + pjtNum + ';', function(err, result) {
                if (err) {
                  console.log(err);
                  throw err;
                }
        
                var project = {
                  project: result,
                  image: null
                }
        
                var query = conn.query('select i.image_url from project as pjt inner join imageconnector as ic on ic.imageconn_project = pjt.project_num inner join image as i on ic.imageconn_image = i.image_num where ic.imageconn_category = 1 and ic.imageconn_project =' + pjtNum + ';',
                function(err, result) {
                  if (err) {
                    console.error(err);
                    conn.release();
                    throw err;
                  }
        
                  console.log(result)
                  if (result.length > 0) {
                    project.image = result[0].image_url
                  }
                  else {
                    project.image = 'https://source.unsplash.com/random/300x300'
                  }
        
                  res.send(project);
                })
                
              })
        }
        conn.release()
    })
})

router.post('/update/getProject', function(req, res, next) {
    var pool = db.getPool();
    var pjtNum = req.body.pjtNum
  
    pool.getConnection((ex, conn) => {
      if (ex){
        console.log(ex)
      }
      else {
        var query = conn.query('select * from project where project_category = 1 and project_num = ?', pjtNum, 
        function(err, result) {
          if (err){
            console.error(err)
            throw err
          }
  
          var project = {
            project: result,
            images: null
          }
  
          var query = conn.query('select i.image_num, i.image_url from project as pjt inner join imageconnector as ic on ic.imageconn_project = pjt.project_num inner join image as i on ic.imageconn_image = i.image_num where ic.imageconn_project =' + pjtNum + ';',
          function(err, result) {
            if (err) {
              console.error(err);
              conn.release();
              throw err;
            }
  
            var image = []
            for (var i=0; i < result.length; i++){
              image.push({imgnum: result[i].image_num, imgurl: result[i].image_url});
            }
  
            project.images = image
            res.send(project);
          })
        })
      }
      conn.release()
    }) 
})

router.post('/update/project', function(req, res, next) {
    var pool = db.getPool();
    var pjtNum = req.body.pjtNum;
    var project = req.body.project;
    console.log(project)
  
    pool.getConnection((ex, conn) => {
      if (ex) {
        console.log(ex)
      }
      else {
        var query = conn.query('update project set project_title = ?, project_goal = ?, project_status = ?, project_start_date = ?, project_end_date = ?, project_content = ?, project_tech = ?, project_share = ? where project_num = ' + pjtNum + ';', 
        [project.project_title, project.project_goal, project.project_status, project.project_start_date, project.project_end_date, project.project_content, project.project_tech, project.project_share],
        function(err, result) {
          if (err){
            console.err(err)
            throw err
          }
          res.send("UpdateTeamProjectSuccess")
        })
      }
      conn.release()
    })
})


router.post('/update/images', function(req, res, next) {
  var pool = db.getPool();
  console.log(req.body)
  var pjtNum = req.body.pjtNum
  var imgUrl = req.body.imgUrl
  
  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex)
    }
    else {
      var query = conn.query('insert into image(image_url) values (?)', imgUrl, function(err, result) {
        if (err){
          console.error(err)
          throw err
        }
        
        var imgNum = result.insertId;
        console.log(imgNum)

        var query = conn.query('insert into imageconnector(imageconn_image, imageconn_project, imageconn_category, imageconn_index) values (?, ?, 1, 0)',
        [imgNum, pjtNum], function(err, result) {
          if(err) {
            console.error(err)
            throw err
          }

          var image = {
            imgnum: imgNum, 
            imgurl: req.body.imgUrl
          }
          console.log(image)
          res.send(image)
        })
      }) 
    }
  })
})



module.exports = router;