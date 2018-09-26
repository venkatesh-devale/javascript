var express = require('express');
var router = express.Router();

var userDetails = {};

router.post('/signup', function(req, res){
  
  userDetails.firstname =  req.body.txtFirstName;
  userDetails.lastname =  req.body.txtLastName;
  userDetails.username = req.body.txtUsername;
  userDetails.password =  req.body.txtPassword;
  userDetails.birthdate = req.body.txtBirthDate;
  userDetails.gender = req.body.gender;

  console.log("Printing the request after signup...");
  console.log(req.body);
  console.log(userDetails.firstname);
  console.log("Printing the signup request ends...");
  res.render('login');
});

router.post('/success', function(req, res){
  console.log("Printing the request in success...");
  console.log(userDetails.firstname);
  console.log(req.body);
  console.log("username: "+userDetails.username);
  console.log("password: "+userDetails.password);
  console.log("Printing in success request ends...");
  if(req.body.txtUsername == userDetails.username) {
    if(req.body.txtPassword == userDetails.password){ 
      console.log("Success...");
      res.render('success', { firstname: userDetails.firstname,
                              lastname: userDetails.lastname,
                              gender: userDetails.gender,
                              birthdate: userDetails.birthdate 
      });
    } else {
      res.render('myErrorLogin');
    }
  } else {
    res.render('myErrorLogin');
  }
 });

 router.get('/error', function(req, res){
  console.log('In /error....');
  res.render('login');
 });

 module.exports = router;

