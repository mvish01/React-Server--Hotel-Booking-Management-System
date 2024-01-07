const mysql = require("mysql")

const connection = mysql.createConnection({
  user: "root",
  password: "Manager@1",
  host: "localhost",
  port: 3306,
  database: "project",
})

connection.connect()

module.exports = connection
