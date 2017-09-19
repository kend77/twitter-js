module.exports  = function(io){
    const router = require('express').Router();

    const tweetBank = require('../tweetBank');

    router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true } );
    });

    router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, showForm: true, name: name } );
    });

    router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
    io.sockets.emit('newTweet', { name:name, text : text });    
    });

    
    router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id);
    console.log(id);
    var list = tweetBank.find( {id: id} );
    console.log(list);
    res.render( 'index', { tweets: list } );
    });

    return router;
}
