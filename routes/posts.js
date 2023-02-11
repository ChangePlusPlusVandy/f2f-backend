const express = require("express");
const router = express.Router();
const {getPosts, getPostById, addPost, deletePost, updatePost, addComment, deleteComment} = require("../controllers/post-controller.js");

router.get('/', getPosts);
router.get('/byId',  getPostById);
router.post('/', addPost);
router.put('/comment', addComment);
router.put('/', updatePost);
router.delete('/', deletePost);
router.delete('/comment', deleteComment);



module.exports = router;