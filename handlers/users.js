let UsersModel = require('../models/user');
let sha256 = require('crypto-js/sha256');

let UsersHandler = function () {

    this.signUp = function (req, res, next) {
        let body = req.body;
        let mail = body.mail;
        let password = body.password;
        let err = new Error();

        err.status = 500;
        err.message = 'Password is required';

        if (!password) return next(err);

        UsersModel.find({mail: mail}).count(function (error, count) {

            if (error) return next(error);
            if (count) {
                err.message = {
                    email: 'This email is already used'
                };
                return next(err);
            }
            body.password = sha256(body.password);

            let user = new UsersModel(body);

            user.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send({updated: result})
            })
        })

    };

    this.logIn = function (req, res, next) {
        let body = req.body;
        let mail = body.mail;
        let password = body.pass;
        let cryptedPass = sha256(password);
        cryptedPass = cryptedPass.toString();

        UsersModel.findOne({mail: mail, password: cryptedPass}, function (err, users) {
            if (err) return next(err);

            if (users && users._id) {
                req.session.userId = users._id;
                req.session.loggedIn = true;
                req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;

            }
            res.status(200).send({data: users, numbersOfVisits: req.session.numberOfVisits})
        })
    };

    // найти всех юзеров
    this.getAllUsers = function (req, res, next) {
        UsersModel.find({}, function (err, result) {
            if (err) return next(err);
            res.status(201).send({data: result});

        })
    };

    // найти юзера по Id
    this.getUserById = function (req, res, next) {
        let body = req.body;
        let id = req.params.id;
        UsersModel.findById(id, body, function (err, result) {
            if (err) return next(err);
            res.status(200).send({data: result});
        })
    };

    this.getCurrentUser = function (req, res, next) {
        let userId = req.session.userId;
        let type = req.query.type;

        console.log(type);

        UsersModel.findById(userId, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({user: result});
        })
    };

    // змінити юзера по ID
    this.updateUser = function (req, res, next) {
        let body = req.body;

        console.log(body.password);
        let id = req.params.id;
        UsersModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
            console.log(result);
            if (err) {
                return next(err);
            }
            res.status(201).send({updated: result});
        })
    };


// видалити юзера по ID
    this.deleteUser = function (req, res, next) {
        let id = req.params.id;
        UsersModel.findByIdAndRemove(id, function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({updated: result});
        })
    };

    // РОЗЛОГІНЕННЯ/ВИХІД
    this.logOut = function (req, res, next) {
        res.status(200).send({logout: 'success'});
    };

};
module.exports = UsersHandler;