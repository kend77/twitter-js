const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
var socketio = require('socket.io');


// ...



// old code 
var server = app.listen(3000);
var io = socketio.listen(server);


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

//middleware
app.use(morgan('tiny'));
// body parser: grab data that clients post in forms, and prepare data as array 
app.use(bodyParser.json());// for AJAX request. nothing with our project
app.use(bodyParser.urlencoded({ extended: false })); // for HTML form submits
//static: go check if public fold has any css file. if yes, send then ALL to client
app.use(express.static('public')); 

//routes
app.use('/', routes(io) );

//stat server
// app.listen(3000, function() {
//   console.log('Server listening...');
// });
