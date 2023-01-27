const express = require("express");
const router = express.Router();
const {getAllPosts, getPostByUserId, createPost, updatePost, deletePost} = require("../controllers/post-controller.js");
const {createComment, deleteComment, createReply} = require("../controllers/comment-controller.js");

//post routes:
router.get('/',  getAllPosts);
router.get('/byUserId', getPostByUserId);
router.post('/', createPost);
router.put('/', updatePost);
router.delete('/', deletePost);

//comment routes:
router.post('/comment', createComment);
router.delete('/comment', deleteComment);
router.post('/comment/reply', createReply);


module.exports = router;