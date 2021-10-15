const util = require('./util'); 
const router = require('./router');

const http = require('http');
const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const server = http.createServer((req, res)=>{
    router.route(req, res);
});
server.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});