
// npm init /// Initialize new package.json file
// npm i --save express   /// install module and save in Package.json
// npm r --save "module name"   /// delete module and save in Package.json



var http = require('http');
// comment

var server = http.createServer(function(request, response) {
    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var body = [];
    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', function(err) {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', '<!DOCTYPE html>');
        // Note: the 2 lines above could be replaced with this next one:
        //response.writeHead(200, {'Content-Type': 'application/json'})

        var responseBody = {
            headers: headers,
            method: method,
            url: url,
            body: body
        };

        let result1 = 15;

        //response.write(JSON.stringify(responseBody));
        response.write('<html>');
        response.write('<body>');
        response.write('<h1>First Case: ' + result1 + '</h1>');
        response.write(`<h1>Second Case: ${result1+10}</h1>`);
        response.write('</body>');
        response.write('</html>');
        response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });
});

let port1 = 8000;

server.listen(port1, () => {
    console.log("HTTP Server is running " + port1);
    console.log(`HTTP LSX Server is running ${port1}`);
});

const express = require("express");
const app = express();


let result = 15;

app.get("/", (req, res, next) => {
    let rezultat = makeCalc(result);
    res.send(`result is ${rezultat}`);
});

let makeCalc = function(a) {
    return a * 2;
};

let port = 3000;

app.listen(port, () => {
    console.log("Express Server is running " + port);
    console.log(`Express LSX Server is running ${port}`);
});

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // Insert a new listener in front
        myEmitter.on('event', () => {
            console.log('B');
        });
    }
});
myEmitter.on('event', () => {
    console.log('A');
});
myEmitter.emit('event');

const myEmitter1 = new MyEmitter();
let m = 0;
myEmitter1.on('event', () => {
    console.log(++m);
});
myEmitter1.emit('event');
// Prints: 1
myEmitter1.emit('event');
// Prints: 2