var http = require('http');
var url = require('url');


var server = http.createServer((req, res) => {
    //res.end("Hello shiva\n");

    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var trimmedPath = pathname.replace(/^\/+|\/+$/g, '');

    console.log(trimmedPath);

    var chosenHandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;

    chosenHandler(trimmedPath,(statusCode, jsonObject) => {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonObject));
    })

})


var handlers = {};

handlers.hello = (pathname,callback) => {
    var statusCode = 200;
    var jsonObject = {
        "API Status": pathname + " API successfully completed Hello World job"
    }
    callback(statusCode, jsonObject);

}

handlers.notFound = (pathname,callback) => {
    var statusCode = 404;
    var jsonObject = {
        "API Status": pathname + " Not Found"
    }
    callback(statusCode, jsonObject);

}



var router = {

    'hello': handlers.hello
};




server.listen(2001, () => {
    console.log("Server listening on port 2001");
})