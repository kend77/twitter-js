const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hey! Welcome home!');
});

app.listen(3000, function() {
  console.log('Server listening...');
});
