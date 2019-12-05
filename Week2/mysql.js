const mysql = require('mysql');
const express = require('express');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'new_world',
});

//1.What is the capital of country X ? (Accept X from user)
app.get('/capital/:country', (req, res) => {
  let sql = 'SELECT Capital FROM country WHERE Name=?;';
  db.query(sql, req.params.country, (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(field);
  });
});
//2.List all the languages spoken in the region Y (Accept Y from user)
app.get('/language/:region', (req, res) => {
  let sql = 'SELECT Language FROM country WHERE region=?';
  db.query(sql, req.params.continent, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//3.Find the number of cities in which language Z is spoken (Accept Z from user)
app.get('/cities/:language', (req, res) => {
  let sql = 'SELECT count(Name) FROM city WHERE Language=?';
  db.query(sql, req.params.language, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//4.List all the continents with the number of languages spoken in each continent
app.get('/lang-cont', (req, res) => {
  let sql = 'SELECT count(DISTINCT Language), Continent FROM Country GROUP BY Continent';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//5. List countries with same official language

// app.get('/Q5', (req, res) => {
//   let sql =
//     'SELECT A.Name AS Country1, B.Name AS Country2 , A.Language FROM country A, country B WHERE A.Code <> B.Code AND A.LANGUAGE=B.language ORDER BY Language ';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

app.listen('3300', () => {
  console.log('Server started on port 3300');
});
