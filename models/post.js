let mongoose = require('mongoose');
let Schema=mongoose.Schema;//схема
let ObjectId=mongoose.Schema.Types.ObjectId;

let PostsSchema=new Schema({
    title: {
        type: String,
        required: [true,"Error! Title required!"]
    },
    body: {
        type: String,
        required: [true,"Error! Text required!"]
    },
    description: String,
    userId:{type:ObjectId, ref:'User',default:null},
    rating: Number, //добавить функцию поставить оценку
    created: {
        type: Date,
        default: Date.now
    }

},{collection:'posts'});

let PostModel=mongoose.model('Post',PostsSchema);//

module.exports=PostModel;