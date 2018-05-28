let CommentsModel = require('../models/comment');
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let CommentsHandler = function () {

    this.getById = function (req, res, next) {

        let id = req.params.id;
        CommentsModel.findOne({_id: id}, function (err, result) {
            if (err) return next(err);
            res.status(200).send(result);
        })
    };
    this.getAllComments = function (req, res, next) {
        CommentsModel.find({}, function (err, result) {
            if (err) return next(err);
            res.status(200).send({data: result});
        })
    };
    this.addComment = function (req, res, next) {
        let body = req.body;
        let userId = req.session.userId;

        body.authorId = userId;

        let commentModel = new CommentsModel(body);
        commentModel.save(function (err, result) {
            if (err) return next(err);
            res.status(201).send(result);
        })

    };
    // this.updateComment = function (req, res, next) {
    //
    //     let body=req.body;
    //     let id = req.params.id;
    //     let userId = req.session.userId;
    //
    //
    //    let comments=CommentsModel.findOne( {_id:id}, function (err, result) {
    //         if (err) return next(err);
    //     });
    //
    //    comments=comments.authorId.toString();
    //    userId=userId.toString();
    //     if (comments == userId) {
    //
    //         CommentsModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
    //             if (err) return next(err);
    //             res.status(201).send({updated: result});
    //         })
    //     }
    //     else res.status(403).send({message: "You have not rules"});
    // };

    this.updateComment = function (req, res, next) {
        let id = req.params.id;
        let userId = req.session.userId;
        let body = req.body;
        body=body.body.toString();
        CommentsModel.update({
                _id: id,
                authorId:userId
            },
            {
                body: body
            }, function (err, result) {
                if (err) return next(err);
                if(result.n==0) res.status(403).send({update:"forbidden"});
                else res.status(200).send({updated: body})
            })
    };

    this.deleteComment = function (req, res, next) {
        let id = req.params.id;
        let userId = req.session.userId;

        CommentsModel.remove({
                _id: id,
                authorId:userId
            }
            , function (err, result) {
                if (err) return next(err);
                if(result.n==0) res.status(403).send({update:"forbidden"});
                else res.status(200).send({deleted: "successful"})
            })
    };

};
module.exports = CommentsHandler;