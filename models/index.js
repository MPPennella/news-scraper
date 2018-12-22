const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

// Object that will contain models to export
const models = {};

// Find all other .js files in directory and export as models
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach(function(file) {
        
        models[file.slice(0,-3)] = require(path.join(__dirname, file));
    });

module.exports = models;
