const express = require('express');
const router = express.Router();
const { getPost, getPostByUser, setPost, updatePost, deletePost } = require("../Controllers/post.controller");
const { protect } = require('../Middleware/auth.middleware');

// router.route('/').get(getPost).post(setPost);    Alt method

router.route('/').get(getPost).post(protect, setPost);

router.get('/user/:username',getPostByUser);

router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = router;