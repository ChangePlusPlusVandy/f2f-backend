const express = require("express");
const router = express.Router();
const {getAllPosts, getPostByUserId, createPost, updatePost, deletePost} = require("../controllers/post-controller.js");

router.get('/',  getAllPosts);
router.get('/byUserId', getPostByUserId);
router.post('/', createPost);
router.put('/', updatePost);
//router.put('/commentPost', commentPost);
//router.patch('/upVoteComment/:commentId', upVoteComment);
//router.delete('/deleteComment/:commentId', deleteComment);
router.delete('/', deletePost);


module.exports = router;