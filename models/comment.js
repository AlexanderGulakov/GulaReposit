let mongoose = require('mongoose');
let Schema=mongoose.Schema;//схема
let ObjectId=mongoose.Schema.Types.ObjectId;


let CommentsSchema=new Schema({

    authorId:{type:ObjectId, ref:'User',default:null},
    body: {
        type: String,
        required: [true,"Error! Text required!"]
    },
    postId:{type:ObjectId, ref:'Post',default:null},

    created: {
        type: Date,
        default: Date.now
    }

},{collection:'comments'});

let CommentModel=mongoose.model('Comment',CommentsSchema);//

module.exports=CommentModel;