const myevent = require('../../event_incomplete/myevent');
const routerUtil = require('./routerUtil');

const Router = {
    route: function(req, res){
        let responseBody = '';
        switch(req.method){
            case 'GET':
                responseBody = this.handleGetRequest(req, res);
                break;
            case 'POST':
                responseBody = this.handlePostRequest(req, res); 
                break;
            case 'PUT':
                responseBody = this.handlePutRequest(req, res);
                break;
            case 'DELETE':
                responseBody = this.handleDeleteRequest(req, res); 
                break;
            default:
                responseBody = `${req.method} is not permitted at ${req.url}!`;
                break;
        }
        res.end(JSON.stringify(responseBody)); 
    },
    
    handleGetRequest: function(req, res){
        let processedResponse;
        if(req.url == '/'){
            processedResponse = routerUtil.getData(req, res);
        }
        else if(req.url == '/mockdata'){
            processedResponse = routerUtil.getMockData(req, res);
        }
        else if(req.url == '/students'){
            processedResponse = routerUtil.getStudents(req, res);
        }
        else if(req.url == '/courses'){
            processedResponse = routerUtil.getCourses(req, res);
        }
        else if(req.url.includes('/student/')){
            let startIndex = req.url.lastIndexOf('/');
            let l = req.url.length;
            let studentId = req.url.substring(startIndex+1, l);
            console.log('studentId=>'+ studentId);
            processedResponse = routerUtil.getStudent(studentId);
        }
        else if(req.url.includes('/course/')){
            let startIndex = req.url.lastIndexOf('/');
            let l = req.url.length;
            let courseId = req.url.substring(startIndex+1, l);
            processedResponse = routerUtil.getCourse(courseId);
        }
        else{
            processedResponse = `GET is not supported at ${req.url}`;
        }

        return processedResponse;
    },

    handlePostRequest : function(req, res){
        let requestbody = this.extractRequestBody(req, res);
        let processedResponse = this.echoResponse(req, res, requestbody);
        return processedResponse;
    },

    handlePutRequest: function(req, res){
        let processedResponse = this.echoResponse(req, res);
        return processedResponse;
    },

    handleDeleteRequest: function(req, res){
        let processedResponse = this.echoResponse(req, res);
        return processedResponse;
    },
    
    extractRequestBody: function(req, res){
        let bodyContent;
        req.on('error', (err)=>{
            throw err;//error = err;
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

    echoResponse(req, res, body){
        let pr = {
            path: req.url.split('?')[0],
            method: req.method,
            headers: Object.assign({}, req.headers),
            body: body ? Object.assign({},body) : routerUtil.name,
            q: req.url.split('?')[1],
            params: req.params
        };
        return pr;
    },
}
module.exports = Router;