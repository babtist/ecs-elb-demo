const http = require('http');
const dispatcher = require('httpdispatcher');
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'path', type: String},
  { name: 'content', alias: 'c', type: String }
]
const options = commandLineArgs(optionDefinitions)
const PORT=8080; 

console.log("Path: "+options.path);

function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet(options.path, function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(options.content);
});  

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
