import * as express from "express"
var path = require('path');
var app  = express();

console.log('works ');

var clientdir = path.resolve(__dirname,'../../client/dist/',)

console.log(clientdir );



app.use(express.static(__dirname)); 

app.get('*.js', (req, res) => {
  let file:string = (clientdir + req.params[0] + '.js' ) 
  res.sendFile(file, _=>{
    console.log('send: ' + file);
  })
})

app.get('*.png', (req, res) => {
  res.sendFile(clientdir + req.params[0] + '.png')
})

app.get('*.ico', (req, res) => {
  res.sendFile(clientdir + req.params[0] + '.ico')
})

app.get("/", (req, res)=>{
  res.sendFile('index.html',{ root: clientdir })
});



let port:number = 8080;


var listen = true;
if ( listen ){
  app.listen(port, _=>{
    console.log('Listening on port '+ port);
  });
}