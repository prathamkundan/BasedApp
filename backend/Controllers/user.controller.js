// Controllers for users

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Checking if username exists
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Checking if email exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        res.status(400);
        throw new Error("Email adress already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            liked_posts: user.liked_posts
        })
    }
    else {
        throw new Error("Invalid User Data");
    }
})

const authenticateUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password){
        res.status(400);
        throw new Error("Missing credentials"); 
    }

    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            liked_posts: user.liked_posts
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid Username or Password");
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        id: req.user.id,
        name: req.user.username,
        email: req.user.email,
        token: generateToken(user._id),
        liked_posts: req.user.liked_posts
    });
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

module.exports = { registerUser, authenticateUser, getMe };

