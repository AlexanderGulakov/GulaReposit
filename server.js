// створення серверу за допомогою експресс
let express=require('express');
let bodyParser = require('body-parser');
let app=express();
let port = 3000;
app.use(bodyParser.json());
app.use(function (request,resp,next) {
    request.reqDate=new Date();
    next();
});
app.get('/news/:id',function (request,response,next) {
    let id = request.params.id;
    response.status(200).send({id:id,reqDate: request.reqDate});
});
app.post('/news',function (request,response,next) {
    let body=request.body;
    response.status(200).send({body:body})
});

app.listen(port, function () {
    console.log('server listening on port '+port);
});
