let PostsModel = require('../models/post');
let CommentsModel = require('../models/comment');
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

let PostsHandler = function () {
    //знайти всі пости
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err) return next(err);
            res.status(201).send({data: result});
        })
    };
    //знайти всі пости за ID юзера
    this.getPostsByUserId = function (req, res, next) {
        let userId = req.params.userId;
        PostsModel.find({userId: userId}, function (err, result) {
            if (err) return next(err);
            res.status(201).send({data: result});
        })
    };

    // знайти пост за його Id
    this.getPostById = function (req, res, next) {
        let id = req.params.id;
        PostsModel.findById(id, function (err, result) {
            if (err) return next(err);
            res.status(201).send({data: result});
        })
    };
    // створити новий пост
    this.createPost = function (req, res, next) {
        let body = req.body;
        let userId = req.session.userId;
        body.userId = userId;
        let postModel = new PostsModel(body);
        postModel.save(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(201).send({data: result});
        })
    };

    //змінити пост за Id
    this.updatePost = function (req, res, next) {
        let currentUserId = req.session.userId;

        let body = req.body;
        let id = req.params.id;

        PostsModel.update({_id: id, userId: currentUserId}, {
            title: body.title,
            body: body.body
        }, function (err, result) {

            if (err) return next(err);
            PostsModel.findById(id, function (err, result) {
                if (err) return next(err);
                res.status(201).send({data: result});
            });
        })
    };

    //видалити пост за Id
    this.deletePost = function (req, res, next) {
        let currentUserId = req.session.userId;
        let id = req.params.id;
        PostsModel.remove({_id: id, userId: currentUserId}, function (err, result) {
            if (err) return next(err);
            res.status(201).send({deleted: result});
        })
    };


    this.getPostWithComments = function (req, res, next) {
        let id = req.params.id;
        CommentsModel.findOne({postId: id}, function (err, result) {
            if (err) return next(err);
            if (result) {
                PostsModel.aggregate([
                    {
                        $match: {
                            _id: ObjectId(id)
                        }
                    },
                    {
                        $lookup: {
                            from: 'comments',
                            localField: '_id',
                            foreignField: 'postId',
                            as: 'comments'
                        }
                    },
                    {
                        $unwind: {
                            path: "$comments",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup:
                            {
                                from: "users",
                                localField: "comments.authorId",
                                foreignField: "_id",
                                as: "comments.authorInfo"
                            }
                    },
                    {
                        $unwind: {
                            path: "$comments.authorInfo",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $addFields: {

                            "comments.date": {$dateToString: {format: "%d.%m.%Y %H:%M:%S", date: "$comments.created"}}
                        }

                    },
                    {
                        $group: {
                            _id: "$_id",
                            userId: {$first: "$userId"},
                            title: {$first: "$title"},
                            body: {$first: "$body"},
                            created: {$first: "$created"},
                            comments: {"$push": "$comments"}
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            body: 1,
                            userId: 1,
                            date: {$dateToString: {format: "%d.%m.%Y %H:%M:%S", date: "$created"}},
                            "comments._id": 1,
                            "comments.body": 1,
                            "comments.postId": 1,
                            "comments.authorId": 1,
                            "comments.authorInfo.name": 1,
                            "comments.date": 1
                        }
                    },
                ], function (err, result) {
                    if (err) return next(err);
                    let isResult = result.length ? result[0] : {};
                    res.status(201).send({data: isResult});
                })
            }

            else {
                PostsModel.aggregate([
                    {
                        $match: {
                            _id: ObjectId(id)
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            userId: 1,
                            body: 1,
                            date: {$dateToString: {format: "%d.%m.%Y %H:%M:%S", date: "$created"}},
                        }
                    },
                ], function (err, result) {
                    if (err) return next(err);
                    let isResult = result.length ? result[0] : {};
                    isResult.comments = isResult.comments || [];
                    res.status(200).send({data: isResult});
                })
            }
        })
    };


    this.upload = function (req, res, next) {
        res.status(201).send({data: 'uploaded'});
    }
};
module.exports = PostsHandler;