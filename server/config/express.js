var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
bluebird = require("bluebird"),
glob = require("glob"),
logger = require("./logger"),
cors = require("cors");

module.exports = function(app, config) {
    //app.use(cors({ "origin": "http://localhost:9000" }));

    app.use(require("morgan")("dev"));

    mongoose.set("debug", true);
    mongoose.connection.once("open", function callback(){ logger.log("Mongoose connected to the database"); });

    var models = glob.sync(config.root + "/app/models/*.js");
    models.forEach(function(model){ require(model); });
    
    var controllers = glob.sync(config.root + "/app/controllers/*.js");
    controllers.forEach(function(controller){ require(controller); });

    if (process.env.NODE_ENV !== "test") {
        app.use(function(req, res, next) {
            logger.log("Request from " + req.connection.remoteAddress);
            next();
        });
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ "extended": true }));

    require("../app/controllers/users")(app, config);

    app.use(express.static(config.root + "/public"));

    app.use(function(req, res) {
        res.type("text/plain");
        res.status(404);
        res.send("404 not found");
    });

    app.use(function(err, req, res, next) {
        if (process.env.NODE_ENV !== "test") logger.log(err.stack, "error");

        res.type("text/plain");
        if (err.status) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send("500 server error");
        }
    });

    logger.log("Starting application...");
};