let usersRouter = require('./users');
let postsRouter = require('./posts');
let commentsRouter = require('./comments');

module.exports = function (app) {
    app.use(function (req, resp, next) {
        req.reqDate = new Date();
        next();
    });
    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
    app.use('/comments', commentsRouter);

    app.use(function (err, req, res, next) {
        let status = err.status || 500;
        res.status(status).send(err);
    })
};