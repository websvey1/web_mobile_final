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
module.exports = router;