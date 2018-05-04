let UsersHandler = require('../handlers/users');
let express = require('express');
let router = express.Router();
let usersHandler = new UsersHandler();
router.get('/', usersHandler.getAllUsers);
router.post('/',usersHandler.createUser);
router.patch('/:id', usersHandler.updateUser);
module.exports = router;