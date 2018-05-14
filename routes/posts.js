let PostsHandler = require('../handlers/posts');
let express = require('express');
let router = express.Router();
let postsHandler = new PostsHandler();
router.get('/', postsHandler.getAllPosts);
router.get('/getWithUsers',postsHandler.getPostsWithUser); // в Постмене для запроса надо прописать posts/getWithUsers

router.post('/',postsHandler.createPost);
module.exports = router;