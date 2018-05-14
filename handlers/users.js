let UsersModel=require('../models/user');
let crypto =  require('crypto-js/sha256');
let UsersHandler = function () {
    this.getAllUsers=function (req,res,next) {
       UsersModel.find({},function (err,result) {
           if(err) return next(err);
           res.status(200).send({data:result});
       })
    };
    this.createUser=function (req,res,next) {
        let body = req.body;
        let userModel=new UsersModel(body);
        userModel.save(function (err,result) {
            if(err){
                return next(err);
            }
            res.status(201).send(result);
        })
    };
    this.updateUser = function (req,res,next) {
       let body = req.body;
       let id = req.params.id;
       UsersModel.findByIdAndUpdate(id,body,{new: true}, function (err,result){
           if(err){
               return next(err);
           }
           res.status(201).send({updated: result});
       })
    };
    this.signUp=function (req,res,next) {
        let body=req.body;
        let mail=body.mail;
        let pass=body.pass;
        let err = new Error();

        err.status = 500;
        err.message="Password is required";

        if(!pass){ // ПЕРЕВІРКА НА НАЯВНІСТЬ ПАРОЛЮ
            return next(err)
        }
        UsersModel.find({
            mail:mail
        }).count(function (err,result) {
            if (err){
                return next (err);
            }
            if (count){//всі значення крім нуля
                err.message = 'This email is already used';
                return next (err);
            }
            body.pass=sha256(body.pass);
            let user = new UsersModel(body);//
            user.save(function (err, result) {
                if (err){
                    return next(err);
                }
                res.status(201).send(result);
            })

        })

    };
    this.signIn = function (req,res,next) {
        let body = req.body;
        let mail = body.mail;
        let pass = body.pass;
        cryptedPass.toString();
        let cryptedPass = sha256(pass);

        UsersModel.find(
            {
                mail:mail,
                pass:cryptedPass
            },function (err,users) {
                if(err){
                    return next (err);
                }
                if (users&&users._id){
                    //req.session.userId = users._id;
                    //req.session.loggedIn  true;
                }
                res.status(201).send(result)
            }
        )
    }
};
module.exports=UsersHandler;