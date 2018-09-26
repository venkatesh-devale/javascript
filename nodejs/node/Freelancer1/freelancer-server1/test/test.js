var assert = require('assert');
var request = require('request');

/*it('Checking Login for 200 status', function(done) {
  request.post('http://localhost:3001/login', { form: { username: "venky345", password: "637" } },
    function (error, response, body) {
      console.log(body);
      assert.equal(200, response.statusCode);
      done();
    });
});*/

/*it('Checking for the correct profile data', function(done) {
    request.post('http://localhost:3001/getprofile', { form: { username: "venky345" } },
      function (error, response, body) {
        console.log(body);
        assert.equal(200, response.statusCode);
        done();
      });
  });*/

  /*it('Checking for all open projects if retrieving successfully', function(done) {
    request.post('http://localhost:3001/getallopenprojects', { form: {  } },
      function (error, response, body) {
        console.log(body);
        assert.equal(200, response.statusCode);
        done();
      });
  });*/

  /*it('Checking for all published projects by user qwerty', function(done) {
    request.post('http://localhost:3001/getmypublishedprojects', { form: { username: "qwerty" } },
      function (error, response, body) {
        console.log(body);
        assert.equal(200, response.statusCode);
        done();
      });
  });*/

  /*it('Checking for all projects on which user venky345 has bid on', function(done) {
    request.post('http://localhost:3001/getmybiddedprojects', { form: { username: "venky345" } },
      function (error, response, body) {
        console.log(body);
        assert.equal(200, response.statusCode);
        done();
      });
  });*/

  it('Checking for correct retrieval of project with id = 2', function(done) {
    request.post('http://localhost:3001/getproject', { form: { projectid: "2" } },
      function (error, response, body) {
        console.log(body);
        assert.equal(200, response.statusCode);
        done();
      });
  });