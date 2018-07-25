let UsersHandler = require('../handlers/users');
let express = require('express');
let router = express.Router();
let usersHandler = new UsersHandler();

let sessionHelper = require('../helpers/session');
let checkAuthentication = sessionHelper.checkAuthentication;
let destroySession = sessionHelper.destroySession;

router.post('/signUp', usersHandler.signUp);
router.post('/logIn', usersHandler.logIn);

router.get('/checkAuthentication', checkAuthentication, usersHandler.getCurrentUser);
router.get('/', checkAuthentication, usersHandler.getAllUsers);
router.get('/:id', usersHandler.getUserById);

router.patch('/:id', checkAuthentication, usersHandler.updateUser);
router.delete('/:id', checkAuthentication, usersHandler.deleteUser);

router.post('/logOut', destroySession, usersHandler.logOut);


module.exports = router;