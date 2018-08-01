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

    this.addComment = function (req, res, next) {
        let body = req.body;
        let userId = req.session.userId;

        body.authorId = userId;

        let commentModel = new CommentsModel(body);
        commentModel.save(function (err, result) {
            if (err) return next(err);


            let id = result._id;
            CommentsModel.aggregate([{
                $match: {
                    _id: ObjectId(id)
                }
            },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'authorInfo'
                    }
                },
                {
                    $unwind: {
                        path: "$authorInfo",
                        preserveNullAndEmptyArrays: true //each post return not only with comments
                    }
                },
                {
                    $project: {
                        _id: 1,
                        body: 1,
                        authorId: 1,
                        date: {$dateToString: {format: "%d.%m.%Y %H:%M:%S", date: "$created"}},
                        "authorInfo.name": 1

                    }
                },

            ], function (err, result) {
                if (err) {
                    return next(err);
                }
                let isResult = result.length ? result[0] : {};
                res.status(201).send({data: isResult});
            })
        });
    };

    this.updateComment = function (req, res, next) {
        let id = req.params.id;
        let userId = req.session.userId;
        let body = req.body;
        body = body.body.toString();
        CommentsModel.update({
                _id: id,
                authorId: userId
            },
            {
                body: body
            }, function (err, result) {
                if (err) return next(err);
                if (result.n == 0) res.status(403).send({update: "forbidden"});
                else res.status(200).send({updated: body})
            })
    };

    this.deleteComment = function (req, res, next) {
        let id = req.params.id;
        let userId = req.session.userId;

        CommentsModel.remove({
                _id: id,
                authorId: userId
            }
            , function (err, result) {
                if (err) return next(err);
                if (result.n == 0) res.status(403).send({update: "forbidden"});
                else res.status(200).send({deleted: "successful"})
            })
    };

};
module.exports = CommentsHandler;