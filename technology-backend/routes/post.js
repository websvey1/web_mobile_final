var express = require('express');
var router = express.Router();
var db = require("../database")
var limit = 5;

router.get('/', function(req, res, next) {
  var pool = db.getPool();

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      // var query = conn.query('select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where imageconn_index = 0 order by p.post_num desc;',
      var query = conn.query('select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num order by p.post_num desc;',
        function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }

          res.send(result);
        })
    }
    conn.release();
  })
});

router.post('/create', function(req, res, next) {
  var pool = db.getPool();
                                  // PostWritePage.vue의 compited에서 선언한 form의 변수를 불러옴

  var user = req.body.user;
  var title = req.body.title;
  var content = req.body.content;
  var share = req.body.share;
  var category = req.body.category;
  var imageUrl = req.body.imageUrl;
  var created_at = req.body.created_at;
  var tags = req.body.tags;
  var project = req.body.project;

  console.log(req.body);


  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      var sql = 'insert into post(post_user, post_title, post_content, post_share, post_created_at, post_updated_at, post_category, post_project) values (?,?,?,?,?,?,?,?);'
      var sql_data = [user,title,content,share,created_at,created_at,category,project];
      var query = conn.query(sql,sql_data,(err, result) => {
          if (err) {
            console.error(err);
            throw err;
          }

          var post_num = result.insertId;

          var query = conn.query('insert into image(image_url) values("' + imageUrl + '");', (err, result) => {
            if (err) {
              console.error(err);
              throw err;
            }
            var image_num = result.insertId;

            var query = conn.query('insert into imageconnector(imageconn_image,imageconn_post,imageconn_category,imageconn_index) values(' + image_num + ',' + post_num + ',0, 0)', (err, result) => {
              if (err) {
                console.error(err);
                throw err;
              }

              if (tags.length > 0) {
                var tag_query = 'insert into tag(tag_post, tag_name) values';

                for (var i = 0; i < tags.length; i++) {
                  tag_query += '(' + post_num + ', "' + tags[i] + '")'
                  if (i + 1 == tags.length) {
                    tag_query += ';'
                  } else {
                    tag_query += ','
                  }
                }


                var query = conn.query(tag_query, (err, result) => {
                  if (err) {
                    console.error(err);
                    throw err;
                  }

                  res.send("Success");
                })
              } else {
                res.send("Success");
              }
            })
          })
        });
    }
    conn.release();

  })
})

router.get('/read/:id', function(req, res, next) {
  var pool = db.getPool();

  var post_num = req.params.id;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      var query = conn.query('select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_updated_at,p.post_category, p.post_project, project_title, ic.imageconn_num, i.image_num,i.image_url, u.user_num,u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num left join project on project_num = p.post_project where post_num = ' + post_num + ';',
        // var query = conn.query('select * from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where imageconn_index = 0 and post_num = '+post_num+ ';',
        function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }

          var post = {
            post: result[0],
            tags: null
          }

          // console.log(result[0]);
          var query = conn.query('select * from tag where tag_post = ' + post_num + ';',
            function(err, result) {
              if (err) {
                console.error(err);
                throw err;
              }

              post.tags = result

              // console.log(post);
              res.send(post);
            }
          )
        })
    }
    conn.release();
  })
});

router.get('/list/:id', function(req, res, next) {
  var pool = db.getPool();

  var user_num = req.params.id;
  // var post_category = req.body.post_category;
  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      // var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where imageconn_index = 0 and p.post_user = ?  order by p.post_num desc;'
      var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where p.post_user = ?  order by p.post_num desc;'
      var query = conn.query(sql, user_num, function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }

          res.send(result);
        })
    }
    conn.release();
  })
});

router.post('/list/:id', function(req, res, next) {
  var pool = db.getPool();

  var user_num = req.params.id;
  var post_category = req.body.post_category;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      // var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where imageconn_index = 0 and p.post_user = ? and p.post_category = ? order by p.post_num desc;'
      var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, pjt.project_title, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num left join project as pjt on p.post_project = pjt.project_num where p.post_user = ? and p.post_category = ? order by p.post_num desc;'
      var query = conn.query(sql, [user_num, post_category], function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }

          res.send(result);
        })
    }
    conn.release();
  })
});

router.post('/list/:id/:page', function(req, res, next) {
  var pool = db.getPool();

  var user_num = req.params.id;
  var post_category = req.body.post_category;

  var start = req.params.page * limit;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      // var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where imageconn_index = 0 and p.post_user = ? and p.post_category = ? order by p.post_num desc;'
      var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, pjt.project_title, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num left join project as pjt on p.post_project = pjt.project_num where p.post_user = ? and p.post_category = ? order by p.post_num desc limit ?, ?;'
      var query = conn.query(sql, [user_num, post_category, start, limit], function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }

          res.send(result);
        })
    }
    conn.release();
  })
});

router.post('/totalPageNum/:id', function(req, res, next) {
  var pool = db.getPool();

  var user_num = req.params.id;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      // var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where imageconn_index = 0 and p.post_user = ? and p.post_category = ? order by p.post_num desc;'
      var sql = 'select count(post_num) from post where post_user = ? and post_category = 0;'
      var query = conn.query(sql, user_num, function(err, result) {
          if (err) {
            console.error(err);
            conn.release();
            throw err;
          }
          var personal = result[0]["count(post_num)"];

          var sql = 'select count(post_num) from post where post_user = ? and post_category = 1;'
          var query = conn.query(sql, user_num, function(err, result) {
              if (err) {
                console.error(err);
                conn.release();
                throw err;
              }

              var team = result[0]["count(post_num)"];

              console.log("p:"+personal);
              console.log("t:"+team);
              var page = (personal > team) ? personal : team;

              console.log("r:"+page);

              if(page % limit == 0){
                res.send(parseInt(page/limit) + "");
              }
              else{
                res.send(parseInt(page/limit + 1) + "");
              }
            })
        })
    }
    conn.release();
  })
});

router.post('/search', function(req, res, next) {
  var pool = db.getPool();

  var category = req.body.category;
  var search = req.body.search;
  var post_category = req.body.post_category;

  // 제목
  if("0" == category){
    console.log("0");
    pool.getConnection((ex, conn) => {
      if (ex) {
        console.log(ex);
      } else {
        var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from (select * from post where post_title like concat ("%",?,"%")) as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where p.post_category = ? order by p.post_num desc;'
        var query = conn.query(sql, [search, post_category], function(err, result) {
            if (err) {
              console.error(err);
              conn.release();
              throw err;
            }

            res.send(result);
          })
      }
      conn.release();
    })
  }

  // 내용
  if("1" == category){
    console.log("1");
    pool.getConnection((ex, conn) => {
      if (ex) {
        console.log(ex);
      } else {
        var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from (select * from post where post_content like concat ("%",?,"%")) as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where p.post_category = ? order by p.post_num desc;'
        var query = conn.query(sql, [search, post_category], function(err, result) {
            if (err) {
              console.error(err);
              conn.release();
              throw err;
            }

            res.send(result);
          })
      }
      conn.release();
    })
  }

  // 제목 + 내용
  if("2" == category){
    console.log("2");
    pool.getConnection((ex, conn) => {
      if (ex) {
        console.log(ex);
      } else {
        var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from (select * from post where post_title like concat ("%",?,"%") or post_title like concat ("%",?,"%")) as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num left join user as u on p.post_user = u.user_num where p.post_category = ? order by p.post_num desc;'
        var query = conn.query(sql, [search,search, post_category], function(err, result) {
            if (err) {
              console.error(err);
              conn.release();
              throw err;
            }

            res.send(result);
          })
      }
      conn.release();
    })
  }

  // ID
  if("3" == category){
    console.log("3");
    pool.getConnection((ex, conn) => {
      if (ex) {
        console.log(ex);
      } else {
        var sql = 'select p.post_num, p.post_title, p.post_content, p.post_share, p.post_created_at, p.post_category, i.image_url, u.user_id, u.user_name from post as p left join imageconnector as ic on p.post_num = ic.imageconn_post left join image as i on ic.imageconn_image = i.image_num inner join (select * from user where user_id like concat ("%",?,"%")) as u on p.post_user = u.user_num where p.post_category = ? order by p.post_num desc;'
        var query = conn.query(sql, [search, post_category], function(err, result) {
            if (err) {
              console.error(err);
              conn.release();
              throw err;
            }

            res.send(result);
          })
      }
      conn.release();
    })
  }
});

router.put('/update/:id', function(req, res, next) {
  var pool = db.getPool();

  var post_num = req.params.id;

  var title = req.body.title;
  var content = req.body.content;
  var share = req.body.share;
  var category = req.body.category;
  var updated_at = req.body.updated_at;
  var tags = req.body.tags;
  var project = req.body.project;

  var image_num = req.body.image_num;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      conn.beginTransaction((err) => {
        if(err){
          throw err;
        }

        var sql = 'update post set post_title = ?, post_content = ?, post_updated_at= ?, post_share = ?, post_category = ?, post_project = ? where post_num = ?;'
        var sql_data = [title, content, updated_at, share, category, project, post_num];
        var query = conn.query(sql, sql_data, function(err, result) {
          if (err) {
            throw err;
          }

          var sql = 'delete from tag where tag_post = "' + post_num + '";'
          var query = conn.query(sql, function(err, result) {
            if (err) {
              throw err;
            }

            var imageUrl = req.body.imageUrl;

            var sql = 'update image set image_url = "' + imageUrl + '"  where image_num = ' + image_num + ';'
            var query = conn.query(sql, function(err, result) {
              if (err) {
                throw err;
              }

              if (tags.length > 0) {
                var tag_query = 'insert into tag(tag_post, tag_name) values';
                for (var i = 0; i < tags.length; i++) {
                  tag_query += '(' + post_num + ', "' + tags[i] + '")'
                  if (i + 1 == tags.length) {
                    tag_query += ';'
                  } else {
                    tag_query += ','
                  }
                }

                var query = conn.query(tag_query, (err, result) => {
                  if (err) {
                    throw err;
                  }

                  res.send("Success");
                })
              } else {
                res.send("Success");
              }
            })
          })
        })
      })
    }
    conn.release();
  })
});

router.delete('/delete/:id', function(req, res, next) {
  var pool = db.getPool();

  var post_num = req.params.id;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      var sql = 'delete from post where post_num = "'+post_num+'";'
      var query = conn.query(sql, function(err, result) {
        if (err) {
          console.error(err);
          conn.release();
          throw err;
        }

        var sql = 'select imageconn_image from imageconnector where imageconn_post = '+post_num+';'
        var query = conn.query(sql, function(err, result) {
          if (err) {
            console.error(err);
            throw err;
          }

          var image_nums = result;

          var sql = 'delete from image where ';
          for(var i = 0; i < image_nums.length; i++){
            sql += 'image_num = ' + image_nums[i].imageconn_image;
            if(i + 1 == image_nums.length){
              sql += ';';
            }
            else{
              sql += ' or ';
            }
          }
          var query = conn.query(sql, function(err, result) {
            if (err) {
              console.error(err);
              throw err;
            }

            res.send("Success");
          })
        })
      })
    }
    conn.release();
  })
});

router.post('/project/list/:id', function(req, res, next) {
  var pool = db.getPool();

  var user_num = req.params.id;

  pool.getConnection((ex, conn) => {
    if (ex) {
      console.log(ex);
    } else {
      var sql = 'select project_num, project_title, project_status, project_category,team_name from (select * from project where project_team in (select m.member_team from blog.member as m where m.member_user = ?) or project_user = ?) as p left join team as t on p.project_team = t.team_num;'
      var query = conn.query(sql, [user_num,user_num], function(err, result) {
        if (err) {
          console.error(err);
          conn.release();
          throw err;
        }

        res.send(result)
      })
    }
    conn.release();
  })
});

module.exports = router;
