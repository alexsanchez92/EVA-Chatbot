var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'db4free.net',
  port            : 3306,
  user            : '',
  password        : '',
  database        : ''
});

module.exports = pool;