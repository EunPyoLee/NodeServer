function route(handle, pathname, response, postData){//route by the pathname of url
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function'){ //We check if a request handler for the given apthanme exist
        //since we registered function as the key, we can simply check the typeof it and if function(so exists) just call it
        handle[pathname](response, postData);
    }
    else{
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
    //now router and handler takes care of response rather than server takes care of it
}
exports.route = route;