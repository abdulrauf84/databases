const express = require('express');
const app = express()
const PORT = 5000;
const usersRoute = require('./router/index');


app.use('/api', usersRoute);


app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server is running on ${PORT}`)

})