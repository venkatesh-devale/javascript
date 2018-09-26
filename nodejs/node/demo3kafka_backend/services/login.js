var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function handle_request(msg, callback){

    console.log("In handle request:"+ JSON.stringify(msg));

    mongoClient.connect(url, (err, db) => {
        if(err) throw err;
        else
            console.log("Connected to mongodb...");
            var dbo = db.db('test');
            var query = {username: msg.username};
            dbo.collection("users").find(query).toArray( (err, result) => {
                if(err) {
                    
                }
                console.log(result[0].username);
                if(result.length > 0) {
                    dbo.close();
                    console.log("Inside result.length",result);

                    callback(null, result);
                }
        });
    });


    // if(msg.username == "bhavan@b.com" && msg.password =="a"){
    //     res.code = "200";
    //     res.value = "Success Login";
    //
    // }
    // else{
    //     res.code = "401";
    //     res.value = "Failed Login";
    // }

}

exports.handle_request = handle_request;