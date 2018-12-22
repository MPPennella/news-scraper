// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Database tools and model configuration
const mongoose = require("mongoose");
const db = require("../models");

module.exports = function(app) {
    // Homepage
    app.get("/", (req, res) => {
        // Get articles from database
        const articles = [
            {headline: "TEST", summary:"A short description of the article content", url: "http://nytimes.com"},
            {headline: "TEST", summary:"A short description of the article content", url: "http://nytimes.com"}
        ]

        // Render page with article info
        res.render("index", {articles: articles} );
    });

    // A GET route for scraping the echoJS website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://www.nytimes.com/section/world").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);

            // Now, we grab every .story-body class within an article tag, and do the following:
            $("article .story-body").each(function(i, element) {
                // Create an empty result object to save article data
                const article = {};
                
                // Save headline
                article.headline = $(this).children(".headline").text().trim();
                // Save article summary
                article.summary = $(this).children(".summary").text().trim();
                // Save article URL
                article.url = $(this).children(".headline").children("a").attr("href");

                // Check for valid article
                if (article.headline && article.url) {
                    console.log(JSON.stringify(article,null, 4));
                    console.log();

                    // Check for existance of article in database already

                    // If new, create a new Article using the `result` object built from scraping
                    db.Article.create(article)
                        .then( dbArticle => console.log(dbArticle) )
                        .catch( err => console.log(err) );
                }
                else {
                    console.log("Couldn't read from article tag!!!");
                }
            
            });

            // Send a message to the client
            res.send("Scrape Complete");
        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
    });
}