// const os = require('os');
// var totalMemory = os.totalmem();
// console.log(`Total Memory : ${totalMemory}`);

// const EventEmitter = require('events');

// var eventEmitter = new EventEmitter();

// eventEmitter.on('logging', (arg)=>{
//     console.log(arg);
// });

// eventEmitter.emit('logging', {id:'1', message: 'Logging Event'});

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write("Hello World from Venky");
        res.end();
    }
});

server.listen(3000);
console.log("Listening on port 3000...");




