const mysql = require('mysql');
const express = require('express');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567890',
});
db.query('CREATE DATABASE IF NOT EXISTS new_world;', (err, result) => {
  if (err) throw err;
  console.log('Database created');
});
db.query('USE new_world;', (err, result) => {
  if (err) throw err;
  console.log('Database Connected');
});

app.get('/q1', (req, res) => {
  let sql = 'SELECT country.Name FROM country WHERE Population > 800000 ORDER BY country.Name ASC;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q2', (req, res) => {
  let sql = 'SELECT Name FROM country WHERE Name LIKE "%land%" ORDER BY Name ASC;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q3', (req, res) => {
  let sql = 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000 ORDER BY Name ASC; ';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q4', (req, res) => {
  let sql = 'SELECT Name FROM country WHERE Continent = "Europe";';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q5', (req, res) => {
  let sql = 'SELECT Name FROM country ORDER BY SurfaceArea DESC;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/q6', (req, res) => {
  let sql = 'SELECT Name FROM city WHERE countryCode="NLD";';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q7', (req, res) => {
  let sql = 'SELECT Population FROM city WHERE Name="Rotterdam";';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q8', (req, res) => {
  let sql = 'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q9', (req, res) => {
  let sql = 'SELECT Name FROM city ORDER BY Population DESC LIMIT 10;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.get('/q10', (req, res) => {
  let sql = 'SELECT SUM(Population) FROM country;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.listen('3300', () => {
  console.log('Server started on port 3300');
});
