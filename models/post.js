let mongoose = require('mongoose');
let Schema=mongoose.Schema;//схема
let ObjectId=mongoose.Schema.Types.ObjectId;

let PostsSchema=new Schema({
    title: String,
    body: String,
    description: String,
    userId:{type:ObjectId, ref:'User',default:null}


},{collection:'posts'});

let PostModel=mongoose.model('Post',PostsSchema);//

module.exports=PostModel;