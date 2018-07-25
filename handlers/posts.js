let PostsModel = require('../models/post');
let CommentsModel = require('../models/comment');
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
//var ObjectId = require('mongoose').Schema.Types.ObjectId;

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
        PostsModel.remove({_id: id, userId:currentUserId}, function (err, result) {
            if (err) return next(err);
            res.status(201).send({deleted: result});
        })
    };

    //разобраться
    this.getPostsWithUser = function (req, res, next) {

        let body = req.body;
        let count = body.count || 20;
        let page = body.page || 1;

        let skip = count * (page - 1);
        let limit = count;

        PostsModel.aggregate([{
            $match: {
                title: 'Tets',
                _id: ObjectId("sdhajhak"),
                date: new Date()
            }
        }, {
            $project: {
                title: 1,
                userId: 1
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userId'
            }
        }, {
            $project: {
                year: {$year: '$date'},
                title: 1,
                userId: {$arrayElemAt: ['$userId', 0]}
            }
        }, {
            $sort: {
                title: -1
            }
        }, {
            $match: {
                'userId.name': 'Ivan'
            }
        }, /*{
      $group: {
        _id: '$title',
        count: {$sum: 1}
      }
    },*/ {
            $group: {
                _id: null,
                count: {$sum: 1}
            }
        }, {
            $skip: skip
        }, {
            $limit: limit
        }], function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({data: result});
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
                            from: 'comments', //з колекції коментів
                            localField: '_id', // у даній колекції поле _id
                            foreignField: 'postId',// у колекції коментів - поле postId = ці поля повязані
                            as: 'comments'//після лукапу в це поле запишеться результат
                        }
                    },
                    {
                        $unwind:  {
                            path: "$comments",
                            preserveNullAndEmptyArrays: true //each post returns not only with comments
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
                        $unwind:  {
                            path: "$comments.authorInfo",
                            preserveNullAndEmptyArrays: true //each post returns not only with comments
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
                            userId:1,
                            date: {$dateToString: {format: "%d.%m.%Y %H:%M:%S", date: "$created"}},
                            "comments._id":1,
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
                            userId:1,
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
    })};


    //Зробити агрегатну функцію, яка поверне пости, створені певним користувачем в певний діапазон дат, і зробити lookup юзера до посту
    this.getPostsByUserByDate = function (req, res, next) {
        let firstDate = new Date("2018-05-13T09:01:12.411Z");
        let secondDate = new Date("2018-05-18T09:01:12.411Z");
        PostsModel.aggregate([
            {
                $match: {
                    $and: [
                        {created: {$gte: firstDate, $lte: secondDate}},
                        {userId: ObjectId("5afbf6384cc49713406c5664")}]
                }
            }, //для запиту за Id (тип ObjectId) треба підтягнути ObjectId!!!! let mongoose = require('mongoose');let ObjectId=mongoose.Types.ObjectId;
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'authorInfo'// як буде називатися поле в результаті
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    created: 1,
                    authorInfo: 1
                }
            }
        ], function (err, result) {
            if (err) return next(err);
            res.status(200).send({data: result});
        })
    };


    this.upload = function (req, res, next) {
        res.status(201).send({data: 'uploaded'});
    }
};
module.exports = PostsHandler;