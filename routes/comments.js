let CommentsHandler = require('../handlers/comments');
let express = require('express');
let router = express.Router();
let commentsHandler = new CommentsHandler();
let checkAuthentication = require('../helpers/session').checkAuthentication;

router.get('/:id', commentsHandler.getById);
router.post('/addComment', checkAuthentication, commentsHandler.addComment);
router.patch('/:id', checkAuthentication, commentsHandler.updateComment);
router.delete('/:id', checkAuthentication, commentsHandler.deleteComment);


module.exports = router;