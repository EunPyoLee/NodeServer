/*
request handlers
placeholder functions for every request handler
*/

/*
"request handler response handling" doesn't allow us to make proper use of non-blocking operations
so we use exec() to support non-blocking operation

instead of bringing the content to the server, we will bring the server to the content
*/

var exec = require("child_process").exec;
var querystring = require("querystring");
/*
exec() executes a shell command from within Node.js.
*/

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" method="post">' +
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="submit" value="Submit text" />' +
    '</form>' +
    '</body>' +
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    var content = "empty";
    //Instead of server, handler compose the respond object
    // exec("ls -lah", (error, stdout, stderr) => {
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.write(stdout);
    //     response.end();
    // });//get a list of all files in the current directory("ls -lah")
    //exec() execute very expensive shell operation without forcing our application into a full stop as the blocking sleep operation did
    //exec() operates "asynchrnously"
}


/*
when handling POST request by receiving data from user
always expect the the amount of data can be large and so cause the request to be blocking operation
TO make the process non-blocking, Node.js servers our code the POST data in small chunkcs,
callbacks that are called upon certain events --> these events are "data" (an new chunk of POST data arrives)
and "end" (all chunks have been received)
--> so we need request handler for "data" and "end" to listen the events
*/
function upload(response, postData){
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You have sent: " + querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload = upload;