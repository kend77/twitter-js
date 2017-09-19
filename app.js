const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

//Middleware
app.use(morgan('tiny'));
app.use('/special/', (req, res, next) => {
  console.log('You are someone special.');
  next();
});

//Routing
app.get('/', (req, res) => {
  res.render( 'index', {title: 'Hall of Fame', people: people} );
});

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

app.listen(3000, function() {
  console.log('Server listening...');
});
