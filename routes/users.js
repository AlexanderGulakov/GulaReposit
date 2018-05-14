let UsersHandler = require('../handlers/users');
let express = require('express');
let router = express.Router();
let usersHandler = new UsersHandler();

let checkAuthentication = require('../helpers/session').checkAuthentication;

router.get('/', usersHandler.getAllUsers); // где '/' - куда отправляется запрос. При запросе на '/', мы хотим вызвать функцию getAllUsers)
router.get('/:id',usersHandler.getUserById);
router.post('/',usersHandler.createUser);
router.post('/signUp',usersHandler.signUp);
router.post('/logIn',usersHandler.logIn);
router.post('/logOut',usersHandler.logOut);
router.patch('/:id', usersHandler.updateUser);
router.delete('/:id',usersHandler.deleteUser);
module.exports = router;