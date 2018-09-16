const http = require('http');
const server = http.createServer((req, res)=>{
    if(req.url === '/') {
        res.write("Hello World");
        res.end();
    }
     
    if(req.url === '/hellofromme') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});


server.listen(3000);
console.log("Server is listening on 3000...");