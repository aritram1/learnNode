const serverutil = require('./serverUtil'); 
const router = require('./routes/router');

const http = require('http');
const HOSTNAME = '127.0.0.1';
const PORT = 8008;
const server = http.createServer((req, res)=>{
    router.route(req, res);
});
server.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});