let mongoose = require('mongoose');
let Schema=mongoose.Schema;//схема

let UsersSchema=new Schema({    //типа класс
    name: {
        type: String,
        unique: true,
        required: true
    },
    mail: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    gender: String,
    age: Number,
    country: String,
    created: {
        type: Date,
        default: Date.now
    }
},{collection:'users'}); // название коллекции можно не указывать, если оно не указано, будет генерироваться по названию модели.

let UserModel=mongoose.model('User',UsersSchema);// название коллекции генеррируется по 'User', только во множ числе users.

module.exports=UserModel;