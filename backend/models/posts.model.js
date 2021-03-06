const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Please add a title."]
    },
    body: {
        type: String,
        required: [true, "Please add body."]
    },
    likes: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
},{
    collection: 'posts'
})

module.exports = mongoose.model('Post', postSchema);