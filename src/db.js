const mysql = require('mysql2')
const db = mysql.createConnection({
  host: "MySQL-8.0",
  user: "root",
  password: "",
  database: "myfirstbd"
});

module.exports = db;
