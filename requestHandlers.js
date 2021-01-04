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
var fs = require("fs");// read contents of the file into our Node.js server
var formidable = require("formidable");

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
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    // var content = "empty";
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
function upload(response, request){
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, (error, fields, files) => {
        console.log("parsing done");

        /*
        Possible error on Windows systems:
        tried to rename to an already existing file
        */
       fs.rename(files.upload.path, "tmp/test.png", (error) => {
           if(error){
               fs.unlink("tmp/test.png");
               fs.rename(files.upload.path, "tmp/test.png");
           }
       });
       response.writeHead(200, {"Content-Type": "text/html"});
       response.write("received image:<br/>");
       response.write("<img src='/show' />");
       response.end();
    });
}

/*
Headcodingly display the contents of the file /tmp/test.png 
*/
function show(response, postData){
    console.log("Request handler 'show' was called.");
    fs.readFile("tmp/test.png", "binary", (error, file) => {
        if(error){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else{
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;