    var express = require('express');
    var router = express.Router();
    var mysql = require('mysql');
    var mongo = require('mongodb');
    var mongoClient = require('mongodb').MongoClient;
    var passport = require('passport')
        , LocalStrategy = require('passport-local').Strategy;

    var kafka = require('./kafka/client');




    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.post('/insertuser', function(req, res, next) {
      console.log(req.body);
      var name = req.body.username;
      var password = req.body.password;
      var email = req.body.email

      req.checkBody('username', 'Username is required').notEmpty();
      var errors = req.validationErrors();

      if(errors) {
        console.log('YES');
      } else {
          console.log('NO');
          mongoClient.connect(url, (err, db) => {
              if(err) throw err;
              else {
                      console.log("Connected to mongodb...");
                      var dbo = db.db("test");
                      dbo.collection('users').insertOne({
                          username: req.body.username,
                          password: req.body.password,
                          email: req.body.emailid
                      }).then( (result) => {
                          console.log("Insertion Successfully");
                      console.log(result.insertedId);

                      res.json('SIGNUP_SUCCESS');
                  })
                      db.close();
                  }
          });
      }



    });


    passport.use(new LocalStrategy( function(username, password, done) {

        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log("After our result from kafka backend",results);
                        if(err) {
                            return done(err, {});
                        }
                        console.log(results[0].username);
                        if(results.length > 0) {

                            console.log("Inside result.length",results[0].username);
                            return done(null, results[0]);
                        }
        });
        }
    ));

    router.post('/login', function(req, res) {
            passport.authenticate('local', function(err, user) {
                if(err) {
                    console.log("In authenticate....",err);
                }

                if(!user) {
                    console.log("In authenticate....");
                }
                if(user) {
                    console.log("In user authenticate....", user);
                    req.session.username = user.username;
                    console.log("Session Started...", req.session);
                    var jsonResponse = {"result" : user.username, "session": req.session.username};
                    res.send(jsonResponse);
                }

            })(req, res);
        }
    );

    router.get('/checksession', (req, res) => {
      console.log("In checksession....", req.session);
      if(req.session.username)
        res.json({"session" : req.session});
      else
        res.json({"session" : "ERROR"});
    });

    router.post('/logout', (req, res) => {
      console.log('Before logout call....', req.session);
      req.session.destroy();
      console.log('After logout call....', req.session);
      res.json('SESSION_DESTROYED');
    })



    module.exports = router;
