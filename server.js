// створення серверу за допомогою експресс
let express = require('express');
let bodyParser = require('body-parser');

let mongoose = require('mongoose'); //
let app = express();//експресс будет обрабатывать все приходящие запросы
let port = 3030;
let expressSession = require('express-session');
let MongoStore = require('connect-mongo')(expressSession);//connect-mongo - модуль для хранения сессий в базе данных MongoDb

mongoose.connect('mongodb+srv://m-001-student:m-001-password@cluster0-8aoco.mongodb.net/users');//підключаємо монгуз до кластера монгоДБ
//mongoose.connect('mongodb://localhost:27017/testDb');//підключаємо монгуз до локальної БД
let connection = mongoose.connection;

connection.once('connected', function () {
    console.log('-----connected to DB---------');


    app.use(bodyParser.json()); //разбирает тело запроса, полностью считывает пост, парсит и данные стают доступны в req.body... после того как прочитал - передает управление дальше через некст
    app.use(express.static('src'));//почитати (експрес-статика)
//============================SESSIONS!!!================================
    app.use(expressSession({ // почитайте і запишіть собі на що ці параметри впливають
        name: 'test',
        key: 'testKey',
        secret: 'topSecret',//This is the secret used to sign the session ID cookie
        resave: false, // resave session even it was not changed, mostly not needed
        rolling: true, // cookie will not be set on a response with an uninitialized session.
        saveUninitialized: false,
        store: new MongoStore({ //создается объект класса MongoStore необхидимый для хранения сессий в МонгоДБ
            //url: 'mongodb+srv://m-001-student:m-001-password@cluster0-8aoco.mongodb.net/users',
            url: 'mongodb://localhost:27017/testDb',
            autoReconnect: true,
            ssl: false
        }),
        //store: new MongoStore({mongoose_connection:mongoose.connection})
        cookie: {
            maxAge: 31 * 24 * 60 * 60 * 1000 // One month
        }
    }));


    require('./routes/index')(app);

    app.listen(port, function () { //експресс обработает функцию (функция не влияет на работу, просто прослушивает порт(проверка работает ли сервер и на каком порту слушается)
        console.log('server listening on port ' + port);
    });
});
connection.on('error', function (err) {
    console.log('Error', err);
    process.exit(1);//закриє сервер при помилці
});

