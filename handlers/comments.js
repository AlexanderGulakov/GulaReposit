let CommentsModel = require('../models/comment');
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let CommentsHandler = function () {
this.addComment = function (req, res, next) {
    let body = req.body;
    let userId = req.session.userId;
    body.authorId = userId;

    let commentModel = new CommentsModel(body);
    commentModel.save(function (err, result) {
        if (err) return next(err);
        res.status(201).send(result)
    })


};
};
module.exports = CommentsHandler;