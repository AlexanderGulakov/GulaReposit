let UsersModel = require('../models/user');
let sha256 = require('crypto-js/sha256');

let UsersHandler = function () {

    // реєстрація
    this.signUp = function (req, res, next) {
        let body = req.body; //отримує з Постмана весь обєкт(боді)
        let mail = body.mail; // в змінну mail записується mail який введений користувачем для реєстрації (з Постмана)
        let password = body.password; // те саме для пароля
        let err = new Error();

        err.status = 500;
        err.message = 'Password is required';

        if (!password) return next(err); // якщо пароль не введений, то помилка 500 Password is required

        UsersModel.find({mail: mail}).count(function (error, count) { //шукає в базі емейли всіх зареєстрованих юзерів і перевіряє чи є вже з таким мейлом.
            // .count повертає кількість таких мейлів.
            if (error) return next(error);
            if (count) {// в данному випадку це означає якщо не 0(тобто якщо вже є такий мейл)
                err.message = {
                    email: 'This email is already used'
                };
                return next(err);
            }
            body.password = sha256(body.password); // кодуванння паролю

            //перевірили унікальність мейлу, наявність паролю, закодували пароль, тепер створюємо нового юзера


            let user = new UsersModel(body);

            user.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send({updated: result})
            })
        })

    };

    // ЛОГІНІЗАЦІЯ/ВХІД

    this.logIn = function (req, res, next) {
        let body = req.body; //отримує з Постмана весь обєкт(боді)
        let mail = body.mail; // в змінну mail записується mail який введений користувачем для реєстрації (з Постмана)
        let password = body.pass;
        let cryptedPass = sha256(password);
        cryptedPass = cryptedPass.toString();//інакше не знайде, бо різні типи даних

        UsersModel.findOne({mail: mail, password: cryptedPass}, function (err, users) {
            if (err) return next(err);

            // SESSIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        UsersModel.find({}, function (err, result) {//находит все объекты, т.к. фигурные {} пустые и вызывает функцию
            if (err) return next(err);   //если ошибка - то передает управление обработчику ошибок
            res.status(201).send({data: result}); // иначе - статус 200(от 200 до 400 - все ок) и отправляет(выдает нам)
            // объект, в котором содержится массив,который называется data (можно назвать как угодно) и в этом массиве все найденные объекты (юзеры).
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
        let id = req.params.id;
        UsersModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
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
        //res.status(201).send({message: "Session end"}).redirect('/')
        //res.redirect('/');
    };

};
module.exports = UsersHandler;