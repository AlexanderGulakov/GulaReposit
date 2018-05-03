let usersRouter = require('./users');
let postsRouter = require('./posts');

module.exports=function (app) {
    app.use(function (request,resp,next) {
        request.reqDate=new Date();
        next();
    });
    app.use('/users',usersRouter);
    app.use('/posts',postsRouter);
    app.use(function (err,req,res,next) {
        let status = err.status || 500;
        res.status(status).send(err);
    })
};