let CommentsHandler = require('../handlers/comments');
let express = require('express');
let router = express.Router();
let commentsHandler = new CommentsHandler();
let checkAuthentication = require('../helpers/session').checkAuthentication;

router.get('/:id',commentsHandler.getById);
router.get('/', commentsHandler.getAllComments);
router.post('/addComment', commentsHandler.addComment);
router.patch('/:id', commentsHandler.updateComment);
router.delete('/:id', commentsHandler.deleteComment);


module.exports = router;