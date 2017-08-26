import * as express from "express"
var server = express();
server.get('/', function (req, res) {
    console.log(req);
    res.send('jo!');
});
