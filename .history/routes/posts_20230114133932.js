const express = require("express");
const router = express.Router();
const { route } = require('express/lib/application');
const Post = require('../models/post.model');
const User = require('../models/user.model');

//get all posts
router.get('/', async (req, res)=> {
    try{
        const posts = await Post.find({});
        return res.json(posts);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

//get posts by userId
router.get('/:id', async (req, res)=> {
    try{
        const userId = req.params.id;
        const post = await Post.find({userId})
        res.status(200).json(post);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

//add posts 
router.post('/add:id', async(req, res)=> {
    const user = await User.findById(req.params.id);
    const post = new Post({
        userId: req.params.id,
        firstname: user.firstname,
        lastname: user.lastname, 
        heading: req.body.heading,
        description: req.body.description,
        image: req.body.image,
        likes: {},
        likeCount: req.body.likeCount,
        comments: [], 
    });
    try{
        const newPost=await post.save();
        res.send(res.status(200).json(newPost));
    }
    catch(err){
        res.json({message: err.message});
    }
});


//like post:
router.patch('/:id/like', async(req, res)=> {
    try{
        //id of post in params
        const {id} = req.params;
        //id of user in request body
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );
        res.status(200).json(updatedPost);
    }
    catch(err){
        res.json({message: err.message});
    }
});


module.exports = router;