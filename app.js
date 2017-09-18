const express = require('express');
const morgan = require('morgan');
const app = express();

//Middleware
app.use(morgan('tiny'));
app.use('/special/', (req, res, next) => {
  console.log('You are someone special.');
  next();
});

//Routing
app.get('/', (req, res) => {
  res.send('Hey! Welcome home!');
});

app.listen(3000, function() {
  console.log('Server listening...');
});
