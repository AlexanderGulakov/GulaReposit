let PostsModel = require('../models/post');
let PostsHandler = function () {
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err) return next(err);
            res.status(200).send({data: result});
        })
    };
    this.createPost = function (req, res, next) {
        let body = req.body;
        let postModel = new PostsModel(body);
        postModel.save(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(201).send(result);
        })
    }
};
module.exports = PostsHandler;