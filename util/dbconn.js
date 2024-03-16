const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
    user: process.env.DBUSER,
    port: process.env.DBPORT
});

module.exports = db;