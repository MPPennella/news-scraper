const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
    // `headline` is required and of type String
    headline: {
        type: String,
        trim: true,
        required: true
    },

    // `summary` is required and is of type String
    summary: {
        type: String,
        trim: true,
        required: true
    },

    // `url` is required and of type String
    // Must be unique to uniquely identify articles
    url: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    // `comments` is an array that stores Comment ObjectIds
    // The ref property links the ObjectId to the Comment model
    // This allows us to populate the Article with any associated Comments
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
