const fs = require('fs');

fs.readdir('./', function(err, res) {
    if(err)
        console.log('Error:',err);
    else
        console.log("Result:", res);
});