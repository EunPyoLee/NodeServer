var http = require("http"); //requires http module shipped by Node.js and make it accessible by varialbe `http`
var url = require("url");
/*
instead of bringing the content to the server, we will bring the server to the content
*/

/*
Here, we handle the POST data processing in the server, so that we pass the final data on to the router and the request handler
*/
function start(route, handle){
    function onRequest(request, response){
        // var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
        // request.setEncoding("utf8");

        // request.addListener("data", (postDataChunk) => {
        //     postData += postDataChunk; //it's like a tcp collecting packet
        //     console.log("Received POST data chunk '" + postDataChunk + "'.");
        // })

        // request.addListener("end", () => {
        //     route(handle,pathname, response, postData);
        // })
    }
    http.createServer(onRequest).listen(8888);//Opens up the server on port 8888 and keep running the server there
    console.log("Server has started.");
}

exports.start = start;

/*
http.createServer returns an object that has an method name `listen`, and takes a port number to listen to
*/



