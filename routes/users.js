let UsersHandler = require('../handlers/users');
let express = require('express');
let router = express.Router();
let usersHandler = new UsersHandler();
let checkAuthentification =require('../helpers/session').checkAuthentification;

router.get('/', usersHandler.getAllUsers);
router.post('/',usersHandler.createUser);
router.post('/signUp',usersHandler.signUp);
router.post('/signIn',usersHandler.signIn);

router.patch('/:id', usersHandler.updateUser);
module.exports = router;