const express = require("express");
const router = express.Router();
const {getAllPosts, getPostByUserId, createPost, updatePost, likePost, deletePost} = require("../controllers/post-controller.js");

router.get('/',  getAllPosts);
router.get('/:userId', getPostByUserId);
router.post('/', createPost);
router.put('/:id', updatePost);
router.put('/:id', likePost);
router.delete('/:id', deletePost);


module.exports = router;