var static = require("node-static");

var file = new static.Server("./wwwroot");

require("http").createServer(function (request, response) {
    request.addListener("end", function () {
        file.serve(request, response);
    }).resume();
}).listen(3000);

console.log("Server listening on port 3000.")
