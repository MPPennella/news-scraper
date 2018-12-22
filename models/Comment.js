const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const CommentSchema = new Schema({
    // `commentText` is required and of type String
    commentText: {
        type: String,
        trim: true,
        required: true
    },

    // `author` is required and is of type String
    author: {
        type: String,
        trim: true,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
