let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    newPassword: String,
    gender: String,
    age: Number,
    country: String,
    created: {
        type: Date,
        default: Date.now
    }
}, {collection: 'users'});

let UserModel = mongoose.model('User', UsersSchema);

module.exports = UserModel;