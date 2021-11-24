const express = require('express');
const mysql = require('mysql');
const app = express()
const port = 3000

const con = mysql.createConnection({
  host: 'db',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 100
});

//gives back err ECONREFUSED
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS history (time DATETIME)T";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

function insert_time() {
  var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO history (time) VALUES (" + time + ")";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });
}

function get_history() {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      return result;
    });
  });
}


app.get('/', (req, res) => {
  insert_time()
  var history = get_history()
  res.send(history)
})

app.listen(port, function () {console.log("app listening on port 3000'!") })