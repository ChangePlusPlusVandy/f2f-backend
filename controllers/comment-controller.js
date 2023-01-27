const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const ObjectId = require('mongodb').ObjectId;
const numOfComments = require('../utils/numOfComments');

//create a news post:
//put postID in the params
const createComment = async (req, res) => {
    try{
        const postId = req.query.postId;
        const post = await Post.find(ObjectId(postId));
        const {userId, content, replies, upvotedBy} = req.body;
        const user = await User.find(ObjectId(userId));
        if (!user){
            res.status(400).json({message: "User not found"});
        }
        if (!post){
            res.status(400).json({message: "Post not found"});
        }
        post.comments = post.comments.concat({
            userId: userId,
            content: content,
            replies: replies,
            upvotedBy: upvotedBy
        });
        post.commentCount = numOfComments(post.comments);
        const savedPost = await post.save();
        const populatedPost = await savedPost
            .populate('comments.commentedBy', '')
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}