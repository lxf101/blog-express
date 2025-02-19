const mysql = require('mysql2');
const {MYSQL_CONFIG} = require('../conf/db');

// create connection object
const con = mysql.createConnection(MYSQL_CONFIG);

// start connection
con.connect();

// execute sql function
function exec(sql){
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        })
    });
    return promise;
}

module.exports = {
    exec,
    escape: mysql.escape
}