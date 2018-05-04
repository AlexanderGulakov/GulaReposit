let PostsHandler = require('../handlers/posts');
let express = require('express');
let router = express.Router();
let postsHandler = new PostsHandler();
router.get('/', postsHandler.getAllPosts);
router.post('/',postsHandler.createPost);
module.exports = router;