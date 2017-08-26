console.log('works');

import * as express from "express"
var ex = express();
ex.get('/', (req, res) => {
    res.send('jo!');
});

let port:number = 1337;
ex.listen(1337, _=>{
    console.log('Listening on port '+ port);
});

export class server{
    constructor() {
        
    }

}