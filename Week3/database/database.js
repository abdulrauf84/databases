const mysql = require('mysql');
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_NAME;



const db = mysql.createConnection(

  {
    host: host,
    user: user,
    password: pass,
    database: database,
  }
)


module.exports = db;