let mongoose = require('mongoose');
let Schema=mongoose.Schema;//схема

let UsersSchema=new Schema({
    name: String,
    mail: {type:String, required:true},
    pass: String
},{collection:'users'});

let UserModel=mongoose.model('User',UsersSchema);//

module.exports=UserModel;