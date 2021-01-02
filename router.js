function route(handle, pathname){//route by the pathname of url
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function'){ //We check if a request handler for the given apthanme exist
        //since we registered function as the key, we can simply check the typeof it and if function(so exists) just call it
        handle[pathname]();
    }
    else{
        console.log("No request handler found for " + pathname);
    }
}
exports.route = route;