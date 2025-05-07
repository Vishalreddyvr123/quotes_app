
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Vishal@2001",
    database: "quotes_db"
})

module.exports = pool
