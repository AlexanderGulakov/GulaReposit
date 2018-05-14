let PostsModel = require('../models/post');
let PostsHandler = function () {
    //знайти всі пости
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err) return next(err);
            res.status(200).send({data: result});
        })
    };
    //знайти всі пости за ID юзера
    this.getPostsByUserId = function (req, res, next) {
        let userId = req.params.userId;
        PostsModel.find({userId: userId}, function (err, result) {
            if (err) return next(err);
            res.status(200).send({data: result});
        })
    };

    // знайти пост за Id
    this.getPostById = function (req, res, next) {
        let body = req.body;
        let id = req.params.id;
        PostsModel.findById(id, body, function (err, result) {
            if (err) return next(err);
            res.status(200).send(result);
        })
    };
    // створити новий пост
    this.createPost = function (req, res, next) {
        let body = req.body;
        let postModel = new PostsModel(body);
        postModel.save(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(201).send(result);
        })
    };

    //змінити пост за Id
    this.updatePost = function (req, res, next) {
        let body = req.body;
        let id = req.params.id;
        PostsModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {//2-ий параметр - що змінюється, можна вказати конкретне поле - (id, { name: 'jason bourne' }, options, callback),
            // {new:true} - опція, завдяки якій функція після виконання поверне вже змінену версію поста.
            if (err) return next(err);
            res.status(201).send({updated: result});
        })
    };

    //видалити пост за Id
    this.deletePost = function (req, res, next) {
        let id = req.params.id;
        PostsModel.findByIdAndRemove(id, function (err, result) {
            if (err) return next(err);
            res.status(201).send({deleted: result});
        })
    };

    //разобраться
    this.getPostsWithUser = function (req, res, next) {
        /*PostsModel
          .find({})
          .populate('userId', { name: 1, _id: 0 })
          .exec(function (err, result) {
            if (err) {
              return next(err);
            }
            res.status(200).send({ data: result });
          })*/

        PostsModel.aggregate([{
            $match: {
                title: 'TestPost'
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
                title: 1,
                userId: { $arrayElemAt: ['$userId', 0] }
            }
        }], function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({ data: result });
        })
    }
};
module.exports = PostsHandler;