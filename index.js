var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);//functional programming, we sending function rather than the thing/object

/*
"request handler response handling" doesn't allow us to make proper use of non-blocking operations
*/