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
app.get('/search', (req, res) => {
  let sql = 'SELECT Capital FROM country WHERE Name=?';
  let capital = req.query.capital;
  db.query(sql, capital, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//2.List all the languages spoken in the region Y (Accept Y from user)
app.get('/language/:region', (req, res) => {
  let sql =
    'SELECT DISTINCT(cl.Language) From countrylanguage cl JOIN  country ON country.Code=cl.CountryCode where country.Region=?';
  db.query(sql, req.params.region, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//3.Find the number of cities in which language Z is spoken (Accept Z from user)
app.get('/city/:language', (req, res) => {
  let sql =
    'SELECT COUNT(DISTINCT city.Name) From city JOIN  countrylanguage ON city.CountryCode=countrylanguage.CountryCode WHERE countrylanguage.Language=?';
  db.query(sql, req.params.language, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
//4.List all the continents with the number of languages spoken in each continent
app.get('/continent', (req, res) => {
  let sql =
    'SELECT COUNT(DISTINCT countrylanguage.Language),country.Continent From countrylanguage JOIN  country ON countrylanguage.CountryCode=country.Code GROUP BY country.Continent';
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
