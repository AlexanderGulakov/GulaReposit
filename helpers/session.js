let Session = function () {
    this.checkAuthentication = function (req,res,next) {
        if(req.session &&req.session.userId.loggedIn){
            return next();
        }
        error = new Error();
        error.message = 'Unauthorized';
        error.status =401;
        next(error);
        //;adkfa;dlfkja;dlfkja;ldkfja;dlfkjasdl;kfjasldfkja;lkgja;lhgk
    }
}