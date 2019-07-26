// var mysql = require('mysql');
// module.exports = () => {
//   // Connection 객체 생성
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '12345',
//     database: 'blog'
//   });
//
//   // Connect
//   connection.connect(function (err) {
//     if (err) {
//       console.error('mysql connection error');
//       console.error(err);
//       throw err;
//     }
//     console.log("connect success");
//   });
//
//   init:function(){
//     return connection;
//   }
// }

var mysql = require('mysql');
var pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool({
        host: '192.168.31.65',
        port: 3306,
        user: 'root',
        password: '12345',
        database: 'blog'
      });
      return pool;
    }
};

// var dbConfig ={
//   host: '192.168.31.61',
//   user: 'root',
//   password: 'hello123!',
//   port: 3306,
//   database: 'blog'
// };

// var pool = mysql.createPool(dbConfig);

// pool.getConnection(function(err, connection){
//   if(!err){
//     console.log(err);
//   }
  
//   // connection.release();
// });