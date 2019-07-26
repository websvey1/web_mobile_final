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