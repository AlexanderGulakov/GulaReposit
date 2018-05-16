let CommentsHandler = require('../handlers/comments');
let express = require('express');
let router = express.Router();
let commentsHandler = new CommentsHandler();
let checkAuthentication = require('../helpers/session').checkAuthentication;


router.post('/addComment', checkAuthentication, commentsHandler.addComment);

module.exports = router;