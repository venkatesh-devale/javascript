var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insertuser', function(req, res, next) {
  console.log(req.body);
  
  
    console.log("Connected!");
    var sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    con.query(sql, [req.body.username, req.body.password, req.body.emailid] ,function (err, result) {
      if (err) throw err;
      res.json('SIGNUP_SUCCESS');
    });
  
  

});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  
    console.log("Connected!");
    var sql = "select * from users where username = " + mysql.escape(req.body.username) + ' and password = ' + mysql.escape(req.body.password);
    con.query(sql, function (err, result) {
      if (result.length == 0) {
        
        //req.session.email = result[0].email;
        
        
        var jsonresponse = {"error" : error};
      }
      else {
        req.session.username = result[0].username;
        console.log(req.session);
        var jsonresponse = {"result" : result};
      }
      res.send(jsonresponse);
      
    });
  
  

});

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
