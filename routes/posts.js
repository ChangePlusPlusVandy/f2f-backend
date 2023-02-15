const express = require("express");
const router = express.Router();
const {getComments, getCommentById, getAllCommentsForPost, getPosts, getPostById, getPostByDisabilities, addPost, deletePost, updatePost, addComment, deleteComment, updateComment} = require("../controllers/post-controller.js");

router.get('/comments', getComments);
router.get('/:id/comments',getAllCommentsForPost);
router.get('/comments/:commentId', getCommentById);
router.get('/', getPosts);
router.get('/byDisabilities', getPostByDisabilities);
router.get('/:id',  getPostById);
router.post('/', addPost);
router.put('/:id/comments', addComment);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.delete('/:id/comments/:commentId', deleteComment);
router.put('/:id/comments/:commentId', updateComment);



module.exports = router;