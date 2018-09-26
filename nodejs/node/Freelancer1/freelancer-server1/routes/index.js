var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const saltRounds = 10;


var connectionPool = mysql.createPool({
  connectionLimit : 1000,
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'freelancer'
})

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "freelancer"
// });

//var globalUsername = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);

  const username = req.body.username;
  let password = req.body.password;
  const emailid = req.body.emailid;
  
  
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log("In /signup....password hash is:" + hash);
      console.log('Connected to database with thread '+ connection.threadId);
      var sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      connection.query(sql,[username, emailid, hash], (err, result) => {
        if(err) {
          console.log(err.name);
          console.log(err.message);
          res.json('ERROR');
        }
        else {
          console.log("New user signed up...");
          res.json('SIGNUP_SUCCESS');
        }
      });
      
      })
      
    }
  })
  
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      console.log('Connected to database with thread '+ connection.threadId);
      var sql = 'SELECT * from users WHERE username = ' + mysql.escape(req.body.username);
      
      connection.query(sql, (err, result) => {


      var hash = result[0].password;
      console.log("This is hashed password from the db...." + hash);  
      bcrypt.compare(req.body.password, hash, (err, doesMatch) => {
        if(doesMatch) {
          console.log('Session started....');
          req.session.username = result[0].username;
          var jsonResponse = {"result" : result[0].username, "session": req.session.username};
          res.send(jsonResponse);
        } else {
          console.log(err);
          res.json('ERROR');
        }
      })
      });
      
    }
  })
});


router.get('/checksession', (req, res) => {
  console.log("In checksession...",req.session.username);
  if(req.session.username) {
    res.json({"session" : req.session});
  }
    
  else 
    res.json({"session" : "ERROR"});
});

router.post('/logout', (req, res) => {
  console.log('Logging out...', req.session.username);
  req.session.destroy();
  res.json({"result": "Session destoryed..please login"});
});

router.post('/updateprofile', function(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const aboutme = req.body.aboutme;

  connectionPool.getConnection((err, connection) => {
    if(err) {
      console.log('Cannot connect to DB..');
    } else {
      console.log('Connected to database with thread '+ connection.threadId);
      var sql = 'UPDATE users SET email = ' + mysql.escape(email) + ', phone = ' + mysql.escape(phone) + ', aboutme = ' + mysql.escape(aboutme) +
                  ' WHERE username = ' + mysql.escape(username);
      console.log(sql);
      connection.query(sql,(err, result) => {
        if(err) {
          console.log(err.name);
          console.log(err.message);
          //res.json('ERROR');
        }
        else {
          console.log("user updated...");
          res.json('UPDATE_SUCCESS');
        }
      });
    }
  })
});

router.post('/getprofile', function(req, res, next) {
  console.log(req.body);
  console.log('In getprofile node...' + req.session.username);
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      console.log('Connected to database with thread '+ connection.threadId);
      var sql = 'SELECT * from users WHERE username = ' + mysql.escape(req.body.username);
      connection.query(sql, (err, result) => {
        if(result.length == 0) {
          res.json('ERROR');
        }
        else {
          console.log(result);
          res.json(result);
        }
      });
      
    }
  })
});


router.post('/postproject', function(req, res, next) {
  console.log('In server side...', req.body);
  const employer = req.body.owner;
  const title = req.body.title;
  const description = req.body.description;
  const skills_required = req.body.skillsRequired;
  const budgetrange = req.body.budgetrange;
  const id = req.body.id;

  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json('DB Connection error');
    } else {
      var sql = 'INSERT INTO projects (id, title, description, skills_required, budgetrange, employer) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(sql, [id, title, description, skills_required, budgetrange, employer], (err, result) => {
          if(err) {
            console.log(err);
            res.json('ERROR');
          } else {
            console.log('Project inserted successfully...');
            res.json('PROJECT_INSERTED_SUCCESS');
          }
        })
    }
  })
  
});


router.post('/getallopenprojects', function(req, res, next) {
  console.log('In getallopenprojects');
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      console.log('Connected to database with thread '+ connection.threadId);
      var sql = 'SELECT * from projects WHERE open = ' + mysql.escape('open');
      connection.query(sql, (err, result) => {
        if(result.length == 0) {
          res.json('ERROR');
        }
        else {
          console.log(result);
          res.json(result);
        }
      });
      
    }
  })
});

router.post('/getmypublishedprojects', function(req, res, next) {
  console.log('In getmypublishedprojects');
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      console.log('Connected to database with thread '+ connection.threadId);
      var sql = 'select * from projects left join (select projectid, sum(bidamount)/count(projectid) as average from bids group by projectid) as t' +
                ' on projects.id = t.projectid where employer = ' +  mysql.escape(req.body.username);


      connection.query(sql, (err, result) => {
        if(result.length == 0) {
          console.log("In getmypublished projects...1",result);
          res.json('ERROR');
        }
        else {
          console.log("In getmypublished projects...2",result);
          res.json(result);
        }
      });
      
    }
  })
});


router.post('/insertBidAndUpdateNumberOfBids', function(req, res, next) {
  console.log(req.body);
  const pid = req.body.project_id;
  const bidAmount = req.body.bid;
  const days = req.body.deliveryDays;
  const freelancer = req.body.freelancer;
  let bids = 0;
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      console.log('Connected to database with thread '+ connection.threadId);
      var sqltemp = 'SELECT * FROM bids WHERE freelancer = ' + mysql.escape(freelancer) + ' AND projectid = ' + mysql.escape(pid);
      connection.query(sqltemp, (err, result) => {
        if(result.length == 0) {
          var sqlInsert = 'INSERT INTO bids (projectid, freelancer, period, bidamount) VALUES (?, ?, ?, ?)';
          connection.query(sqlInsert,[pid, freelancer, days, bidAmount], (err, result) => {
            if(err) {
              //console.log(err.name);
              //console.log(err.message);
              res.json('ERROR');
            }
            else {
              console.log("Bid inserted Successfully...");
              res.json('BID INSERTED SUCCESS');
            }
          });
        } else {
          res.json('ERROR');
        }
      })
      
       
      var getNumberOfBids = 'SELECT number_of_bids from projects WHERE id = ' + mysql.escape(pid);
      connection.query(getNumberOfBids, (err, result) => {
        if(err) 
          console.log(err);
        else {
          bids = result[0].number_of_bids;
        console.log('After getNumberOfBids...'+bids);
        var ubids = bids + 1;
        var updateBids = 'UPDATE projects SET number_of_bids = ' + ubids + ' WHERE id = ' + mysql.escape(pid);
          connection.query(updateBids, (err, result) => {
            if(err)
              console.log(err);
            else
              console.log('After updateBids...',result);
        
        });
        }
        
      });
    }
  })
  
});


router.post('/getmybiddedprojects', function(req, res, next) {
  
  console.log(req.body);
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : 'Error in connecting to database'
      })
    } else {
      let sql = 'select * from projects as p ' +
      'inner join ((select b.projectid, b.freelancer, b.bidamount, b.period, t1.average from bids as b ' +
      'inner join (select projectid, sum(bidamount)/count(projectid) as average from bids ' +
      'group by projectid) as t1 ' +
      'on b.projectid = t1.projectid ' +
      'where b.freelancer = ' + mysql.escape(req.body.username) + ') as t2 )' +
      'on p.id = t2.projectid';
      connection.query(sql, (err, result) => {
        if(err)
          console.log(err);
        else {
          console.log(result);
          res.json(result);
        }
      })
    }
  })



});

router.post('/getproject', function(req, res, next) {
  console.log('In getproject', req.body);
  const projectId = req.body.projectid;
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      var sql = 'select * from projects as p ' +
      'left join ((select projectid, sum(bidamount)/count(projectid) as average ' +
      'from bids ' +
      'group by projectid) as t) ' +
      'on p.id = t.projectid ' +
      'where p.id = ' + mysql.escape(projectId);
      connection.query(sql, (err, result) => {
        if(err) {
          res.json({
            code : 100,
            status : "Error retreiving project..."
          });
        } else {
          res.json(result);
        }
      })
    }
  })
})

router.post('/getAllBidsForThisProject', (req, res, next) => {
  console.log('In getAllBidsForThisProject', req.body.projectid);
  const projectId = req.body.projectid;
  connectionPool.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Error in connecting to database"
      });
      
    } else {
      var sql = 'SELECT * from bids inner join projects on bids.projectid = projects.id WHERE projectid = ' + mysql.escape(projectId);
      connection.query(sql, (err, result) => {
        if(err) {
          res.json({
            code : 100,
            status : "Error retreiving bids..."
          });
        } else {
          res.json(result);
        }
      })
    }
  })
})

router.post('/setworkerforproject', (req, res, next) => {
  console.log(req.body);
  connectionPool.getConnection( (err, connection) => {
    if(err) {
      res.json('Error connecting to database...')
    } else {
      var sql = 'update projects set worker = ' + mysql.escape(req.body.freelancer) + ' where id = ' + mysql.escape(req.body.pid);
      connection.query(sql, (err, result) => {
        if(err) {
          res.json('Error updating the worker for this project');
        } else {
          //res.json('Worker set successfully for this project');
          var newQuery = 'update projects set estimated_completion_date = (SELECT DATE_ADD(CURDATE(), INTERVAL (select period from bids ' +
          'where freelancer = '+ mysql.escape(req.body.freelancer) +' and projectid = '+ mysql.escape(req.body.pid) +' ) DAY)) ' + 'where id = ' + mysql.escape(req.body.pid);
          connection.query(newQuery, (err, result) => {
            if(err) {
              console.log(err);
            } else {
              res.json('Updated the estimated completion date...');
            }
          })
        }
      });

    }
  })
})


router.post('/saveimage', (req, res, next) => {
  console.log("In /saveImage... ", req.body);
});

module.exports = router;
