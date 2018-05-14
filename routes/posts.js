

let PostsHandler = require('../handlers/posts');
let express = require('express');
let router = express.Router();
let postsHandler = new PostsHandler();

router.get('/', postsHandler.getAllPosts);
router.get('/getWithUsers', postsHandler.getPostsWithUser);
router.get('/getByData',postsHandler.getPostsByUserByDate);
router.get('/:id', postsHandler.getPostById);
router.get('/authors/:userId', postsHandler.getPostsByUserId);

router.post('/',postsHandler.createPost);
router.patch('/:id',postsHandler.updatePost);
router.delete('/:id',postsHandler.deletePost);

module.exports = router;