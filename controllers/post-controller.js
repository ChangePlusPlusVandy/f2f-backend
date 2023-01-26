const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const Comment = require('../models/comment.model.js');


//get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json(posts);
    } 
    catch(err){
        return res.status(400).send({message: err.message});
    }
}


//get post by userId:
const getPostByUserId = async (req, res) => {
    try{
        const {userId} = req.params.userId;
        const post = await Post.find({"userId": userId})
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//create a news post:
const createPost = async (req, res) => {
    try{
        const {userId, firstName, lastName, disabilityTags, heading, description, votes, comments} = req.body;
        const user = await User.findById(userId);
        const newPost = await Post.create(req.body);
        await newPost.save();
        return res.status(200).json(newPost); 
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//update a post:
const updatePost = async (req, res) => {
    try{
        const postId = req.params.postId;
        let post;
        if (postId){
            post = await Post.findById(postId);
        }
        else{
            return res.status(500).send("Invalid postID query");
        }
        console.log(post);
        const {userId, firstName, lastName, disabilityTags, heading, description, votes, comments} = req.body;
        if (userId) post.userId = userId;
        if (firstName) post.firstName= firstName;
        if (lastName) post.lastName = lastName;
        if (disabilityTags) post.disabilityTags = disabilityTags;
        if (heading) post.heading = heading;
        if (description) post.description = description;
        if (votes) post.votes = votes;
        if (comments) post.comments = comments;
        await post.save();
        return res.status(200).json(post);
    }
    catch(err){
        console.log(error);
        return res.status(400).send({message: err.message});
    }
}

//like a post:
const commentPost = async (req, res) => {
    try{
        const postId = req.params.postId;
        const {userId, content, votes} = req.body;
        const post = await Post.findById(postId);
        const newComment = await new Comment({
            userId: req.body.userId,
            content: req.body.content,
            votes: req.body.votes,
        });
        await newComment.save();
        post.comments.push(newComment);
        await post.save();
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).json({message: err.message});    
    }
}

const upVoteComment = async (req, res) => {
    const commentId = req.params.commentId;
    try{
        const comment = await Comment.findById(commentId);
        comment.votes = comment.votes + 1;
        await comment.save();
        return res.status(200).json(comment);
    }
    catch(err){
        return res.status(400).json({message: err.message});    
    }
}


//delete a comment or reply:
const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.body.postId;
    try{
        const post = await Post.findById(postId);
        const allComments = post.comments.filter(comment => comment.commentId != commentId);
        post.comments = allComments;
        if (commentId){
            Comment.deleteOne({_id: commentId}).then(() => 
                    res.status(200).json({ message: "Comment successfully deleted." })
                );
        }
        else{
            return res.status(500).send("Invalid postID query");
        }
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}



//delete a post:
const deletePost = async (req, res) => {
    const postId = req.params.postId;
    try{
        if (postId){
            Post.deleteOne({_id: postId}).then(() => 
                    res.status(200).json({ message: "Post successfully deleted." })
                );
        }
        else{
            return res.status(500).send("Invalid postID query");
        }
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}


module.exports = {getAllPosts, getPostByUserId, createPost, updatePost, commentPost, upVoteComment, deleteComment, deletePost};
