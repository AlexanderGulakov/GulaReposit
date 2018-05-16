let UsersHandler = require('../handlers/users');
let express = require('express');
let router = express.Router();
let usersHandler = new UsersHandler();

let sessionHelper = require('../helpers/session');
let checkAuthentication = sessionHelper.checkAuthentication;
let destroySession = sessionHelper.destroySession;

router.post('/signUp',usersHandler.signUp);
router.post('/logIn',usersHandler.logIn);
router.get('/', checkAuthentication,usersHandler.getAllUsers); // где '/' - куда отправляется запрос. При запросе на '/', мы хотим проверить аутентификацию, затем вызвать функцию getAllUsers)
router.get('/:id',checkAuthentication,usersHandler.getUserById);
router.patch('/:id', checkAuthentication,usersHandler.updateUser);
router.delete('/:id',checkAuthentication,usersHandler.deleteUser);
//router.post('/',usersHandler.createUser);
router.post('/logOut',destroySession,usersHandler.logOut);


module.exports = router;