let usersRouter = require('./users');
let postsRouter = require('./posts');
let commentsRouter = require('./comments');

module.exports = function (app) {
    app.use(function (req, resp, next) {
        req.reqDate = new Date();
        next();//передает управление по цепочке следующей миддлварке (следующей функции, которая объявлена через app.use)
    });
    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
    app.use('/comments', commentsRouter);

    // app.get('/', function (req, res, next) { //для відправки index.html
    //     res.sendfile('index.html');
    // });

    app.use(function (err, req, res, next) { // ОБРАБОТЧИК ОШИБОК!Експресс если видит функцию с 4 элементами, то понимает, что это обработчик ошибок. Сюда передается управление, если сработал throw,либо в некcте передан аргумент.
        let status = err.status || 500;
        res.status(status).send(err);
    })
};