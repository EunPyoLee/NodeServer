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
/*
exec() executes a shell command from within Node.js.
*/

function start(response) {
    console.log("Request handler 'start' was called.");
    var content = "empty";
    //Instead of server, handler compose the respond object
    exec("ls -lah", (error, stdout, stderr) => {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });//get a list of all files in the current directory("ls -lah")
    //exec() execute very expensive shell operation without forcing our application into a full stop as the blocking sleep operation did
    //exec() operates "asynchrnously"
}

function upload(response){
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;