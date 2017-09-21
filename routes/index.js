const client = require('../db');
const router = require('express').Router();
const tweetBank = require('../tweetBank');




module.exports  = function(io){

    router.get('/', (req, res) => {
        client.query('select tweets.id as id, name, content from tweets join users on users.id = tweets.user_id;', function (err, result) {
            if (err) return next(err); // pass errors to Express
            var tweets = result.rows;
            //console.log('here!!!!!!!!', tweets[0].name);
            res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
          });
    }),



    // router.get('/', function (req, res) {
    // let tweets = tweetBank.list();
    // res.render( 'index', { tweets: tweets, showForm: true } );
    // });

    router.get('/users/:name', function(req, res) {
    var name = req.params.name;
        client.query('select tweets.id as id, name, content from tweets join users on users.id = tweets.user_id WHERE name = ' + "'" + name + "';", function(err, result)   {
            if (err) return err;
            var tweets = result.rows;
            res.render( 'index', { tweets: tweets, showForm: true, name: name } );
        })
    // var list = tweetBank.find( {name: name} );
    
    }),

    router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    //get currents tweets
    
    function insertNewUser()   {
        const nameInsert = {
            text : 'insert into users(name) values ($1);',
            values: [name]
        };
        client.query(nameInsert, function(err, result){
                if(err) return err;
        })
    }


    function insertNewTweet(result){
        var tweets = result.rows;
        var realId = tweets[0].id; // data type: number
        const query = {
        text: 'insert into tweets(user_id, content) values($1, $2)',
        values: [realId, text]
        };
        client.query(query, function(err, result)   {
        //console.log('insert result is: ' , result.rows);
            if (err) return err;

        })
    }

    client.query('select users.id as id, name, content from tweets join users on users.id = tweets.user_id where name = ' + "'" + name + "';" , function(err, result)   {
        if (err) return err;
        // if(result.rows.length === 0){
        //     insertNewUser();
        // } 
            insertNewTweet(result)
            console.log(result);
    })

  
    res.redirect('/');
    }),

    
    router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id);
    //console.log('id from url: ', id);
    client.query('select tweets.id as id, name, content from tweets join users on users.id = tweets.user_id WHERE tweets.id = ' + id + ";", function(err, result)   {
        if (err) return err;
        var tweets = result.rows;
        //console.log('id from database: ', tweets[0].id);
        res.render( 'index', { tweets: tweets } );
    })
    });

    return router;
}
