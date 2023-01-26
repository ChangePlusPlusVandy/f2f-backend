const express = require("express");
const router = express.Router();
const {getAllPosts, getPostByUserId, createPost, updatePost, commentPost, upVoteComment, deleteComment, deletePost} = require("../controllers/post-controller.js");

router.get('/',  getAllPosts);
router.get('/:userId', getPostByUserId);
router.post('/', createPost);
router.patch('/updatePost/:postId', updatePost);
router.patch('/commentPost/:postId', commentPost);
router.patch('/upVoteComment/:commentId', upVoteComment);
router.delete('/deleteComment/:commentId', deleteComment);
router.delete('/:postId', deletePost);


module.exports = router;