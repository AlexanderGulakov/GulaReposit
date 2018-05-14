// створення серверу за допомогою експресс
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let port = 3030;
let expressSession = require('express-session');
let MongoStore = require('connect-mongo')(expressSession);

mongoose.connect('mongodb://localhost:27017/testDb');//підключаємо монгуз

let connection = mongoose.connection;
connection.once('connected', function () {
    console.log('-----connected to DB---------');


    app.use(bodyParser.json());
    app.use(expressSession({
        //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    }));

    require('./routes/index')(app);
// app.get('/users',function (request,response,next) {
//     UserModel.find({},function (err,users) {
//         if(err){
//             return next(err);
//         }
//         response.status(200).send({users:users});
//
//     });
// });
// app.post('/news',function (request,response,next) {
//     let body=request.body;
//     response.status(200).send({body:body})
// });

    app.listen(port, function () {
        console.log('server listening on port ' + port);
    });
});
connection.on('error', function (err) {
    console.log('Error', err);
    process.exit(1);//закриє сервер при помилці
});