// Controllers d=for posts

const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');
const Post = require('../models/posts.model');
const User = require('../models/user.model');

// CRUD OPERATIONS

const getPost = asyncHandler(async (req, res) => {
    res.status(200);
    const allPosts = await Post.find({}).sort({ createdAt: 'desc' }).populate('author', 'username');
    res.json(allPosts);
})

const getPostByUser = asyncHandler(async (req, res) => {
    const poster = await User.findOne({ username: req.params.username });
    if (!poster) {
        res.status(404);
        throw new Error("User not found");
    }
    else {
        const postsByPoster = await Post.find({ author: poster._id }).sort({ createdAt: 'desc' }).populate('author', 'username');

        res.status(200).json(postsByPoster)
    }
})

const getLikedPosts = expressAsyncHandler(async (req, res)=>{
    const populatedUser = await User.findOne({_id: req.user._id}).populate({path: 'liked_posts', options:{sort : {createdAt : 'desc'}}});

    await populatedUser.populate({path:'liked_posts.author', select:'username' , model: 'User'});

    res.status(200).json(populatedUser.liked_posts);
})

const setPost = asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(400);
        throw new Error("Invalid post format");
    }
    else {
        const newPost = await Post.create({
            author: req.user._id,
            title: title,
            body: body
        })

        res.status(201).json(newPost)
    };
})

const updatePost = asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(400);
        throw new Error('Empty field is not allowed');
    }
    else {
        const currPost = await Post.findOne({ _id: req.params.id })
        if (!currPost) {
            res.status(404);
            throw new Error('Post not found')
        }
        else if (currPost.author.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Unauthorised access');
        }
        else {
            const updatedPost = await currPost.updateOne({
                author: req.user._id,
                title: title,
                body: body
            })
            res.status(200).json(updatedPost);
        }
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const tbrPost = await Post.findById(req.params.id);

    if (!tbrPost) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (tbrPost.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Unauthorized access");
    }

    await tbrPost.remove();
    res.status(200).json({ id: req.params.id });
})

// LIKE FUNCTIONALITY

const likePost = expressAsyncHandler(async (req, res) => {
    const isLiked = await User.count({ _id: req.user._id, liked_posts: { $in: req.params.id } });

    if (isLiked > 0) {
        res.status(400);
        throw new Error("Post already liked");
    }

    const likedPost = await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: {likes: 1}});
    
    if (!likedPost) {
        res.status(404);
        throw new Error("Post not found");
    }
    
    await User.findByIdAndUpdate({_id: req.user._id}, {$push:{liked_posts: req.params.id}});

    res.status(200).json(likedPost);
})

const unlikePost = expressAsyncHandler(async (req, res) => {
    const isLiked = await User.count({ _id: req.user._id, liked_posts: { $in: req.params.id } });
    
    if (isLiked === 0) {
        res.status(400);
        throw new Error("Post not liked");
    }

    const unlikedPost = await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 } });
    
    if (!unlikedPost) {
        res.status(404);
        throw new Error("Post not found");
    }
    
    await User.findByIdAndUpdate({_id: req.user._id}, {$pull:{liked_posts: req.params.id}});

    res.status(200).json(unlikedPost);
})

module.exports = { getPost, getPostByUser, getLikedPosts, setPost, updatePost, deletePost, likePost, unlikePost }; 