
var mysql = require('mysql')


var pool = mysql.createPool({
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
   // "host": "192.168.0.120",
   // "user": "nodeaPP",
    //"password": "deV_nodE@2067@",
    "database": "tiggacomdesk_dev"
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool