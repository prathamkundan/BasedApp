const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    liked_posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema);