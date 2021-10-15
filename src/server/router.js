const myevent = require('MyEvent');

const Router = {
    route: function(req, res){
        let responseBody = req.method === 'GET' ? this.handleGetRequest(req, res) : this.handlePostRequest(req, res);
        res.end(JSON.stringify(responseBody)); 
    },
    
    handleGetRequest: function(req, res){
        let processedResponse = this.processResponse(req, res);
        return processedResponse;
    },

    handlePostRequest : function(req, res){
        let bodyContent =   this.extractRequestBody(req, res);
        let processedResponse = this.processResponse(req, res, bodyContent);
        return processedResponse;
    },
    
    extractRequestBody: function(req, res){
        let bodyContent;
        req.on('error', (err)=>{
            error = err;
            console.error(err);
        })
        .on('data', (chunk)=>{
            body.push(chunk);
        })
        .on('end', ()=>{
            bodyContent = Buffer.concat(body).toString();
            console.log(`Inside 'end' event listener. body is=> ${bodyContent}`);
        });
        return bodyContent;
    },

    processResponse(req, res, body){
        let pr = {
            path: req.url.split('?')[0],
            method: req.method,
            //headers: Object.assign({}, req.headers),
            body: body ? Object.assign({},body) : 'No body sends it better!',
            q: req.url.split('?')[1],
            params: req.params
        };
        return pr;
    },
}
module.exports = Router;