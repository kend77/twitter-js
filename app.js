const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
var socketio = require('socket.io');
// ...


var server = app.listen(3000);
var io = socketio.listen(server);


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

//middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//routes
app.use('/', routes(io) );

//stat server
// app.listen(3000, function() {
//   console.log('Server listening...');
// });
