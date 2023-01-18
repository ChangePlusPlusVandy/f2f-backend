const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');


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
        const post = await Post.find({userId})
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//create a news post:
const createPost = async (req, res) => {
    try{
        const {userId, firstName, lastName, heading, description, image, likes, likeCount, comments} = req.body;
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
    const postId = req.params.id;
    try{
        let post;
        if (postId){
            post = await Post.findById(postId);
        }
        else{
            return res.status(500).send("Invalid postID query");
        }
        const {userId, firstName, lastName, heading, description, image, likes, likeCount, comments} = req.body;
        if (userId) post.userId = userId;
        if (firstName) post.firstName= firstName;
        if (lastName) post.lasttName = lastName;
        if (heading) post.lastName = lastName;
        if (description) post.description = description;
        if (image) post.image = image;
        if (likes) post.likes = likes;
        if (likeCount) post.likeCount = likeCount;
        if (comments) post.comments = comments;
        await post.save();
        console.log(post);
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//update a post:
const likePost = async (req, res) => {
    const postId = req.params.id;
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        //check if user already liked post
        const isLiked = post.likes.get(userId);
        //if is liked, unlike post
        if (isLiked){
            post.likes.delete(userId);
        }
        //if haven't liked, like post
        else{
            post.likes.push(userId, true);
        }
        await post.save();
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).json({message: err.message});    
    }
}

//delete a post:
const deletePost = async (req, res) => {
    const postId = req.params.id;
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


module.exports = {getAllPosts, getPostByUserId, createPost, updatePost, likePost, deletePost};
