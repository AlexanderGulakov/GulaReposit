let Session = function () {
    this.checkAuthentication = function (req, res, next) {
        let error;

        if (req.session && req.session.userId && req.session.loggedIn) {
            return next();
        }

        error = new Error();

        error.message = 'Unauthorized';
        error.status = 401;

        next(error)
    };
    this.destroySession = function (req, res, next) {
        if (req.session.loggedIn) {
            req.session.destroy();
            next();
        }
        else {
            res.status(401).send({message: "You are not authorized"})
        }
    }
};

module.exports = new Session();