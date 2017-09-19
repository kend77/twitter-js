const router = require('express').Router();

const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  console.log(list);
  res.render( 'index', { tweets: list } );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.get('/tweets/:id', function(req, res) {
  var id = Number(req.params.id);
  console.log(id);
  var list = tweetBank.find( {id: id} );
  console.log(list);
  res.render( 'index', { tweets: list } );
});

module.exports = router;
