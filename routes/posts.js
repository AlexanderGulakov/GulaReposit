let PostsHandler = require('../handlers/posts');
let express = require('express');
let router = express.Router();
let postsHandler = new PostsHandler();
let checkAuthentication = require('../helpers/session').checkAuthentication;
const upload = require("../helpers/multer");

router.get('/getWithComments/:id', postsHandler.getPostWithComments);
router.get('/', postsHandler.getAllPosts);
router.get('/getWithUsers', postsHandler.getPostsWithUser);



router.get('/getByData', postsHandler.getPostsByUserByDate);
router.get('/:id', postsHandler.getPostById);
router.get('/authors/:userId', postsHandler.getPostsByUserId);

router.post('/', checkAuthentication, postsHandler.createPost);
router.patch('/:id', checkAuthentication, postsHandler.updatePost);

router.delete('/:id', checkAuthentication, postsHandler.deletePost);

router.post('/upload', upload.single("file"), postsHandler.upload);
module.exports = router;