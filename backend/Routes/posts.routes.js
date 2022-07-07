const express = require('express');
const router = express.Router();
const { getPost, getPostByUser, setPost, updatePost, deletePost, likePost, unlikePost, getLikedPosts } = require("../Controllers/post.controller");
const { protect } = require('../Middleware/auth.middleware');

// router.route('/').get(getPost).post(setPost);    Alt method

router.route('/').get(getPost).post(protect, setPost);

router.get('/user/:username',getPostByUser);

router.get('/liked',protect, getLikedPosts);

router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

router.put('/like/:id', protect, likePost)

router.put('/unlike/:id', protect, unlikePost)

module.exports = router;
