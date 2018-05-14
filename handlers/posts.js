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
    };
    this.getPostsWithUser=function (req,res,next) {
    //   PostsModel.find({}).populate('userId','name').exec(function (err,result) {
    //       if (err) {
    //           return next (err);
    //       }
    //       res.status(200).send({
    //           data:result
    //       });
    //   }) 
    // }
    PostsModel.aggregate([
        {
            $match: {
                title: 'Test Title'//за яким параметром буде шукати пост
            }
        },
        {
            $project: {title:1, userId:1} // коли треба щоб повернуло якісь конкретні поля (в даному випадку тайтл та юзерАйДи.
        },
        {
            $lookup:{
                from: 'users',//name of collection
                localField:'userId',//pole z collectii postiv
                foreignField: '_id',// pole z collectii useriv
                as:'userId'//rewrite userId
            }
        },
        {
            $project: {
                title:1,
                userId:{
                    $arrayElemAt:['$userId',0]
                }
            }
        }
    ],function (err,result) {
        if(err){
            return next(err)
        }
        res.status(200).send({date:result})
    })
};};
module.exports = PostsHandler;