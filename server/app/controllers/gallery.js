"use strict"

var express = require("express"),
router = express.Router(),
logger = require("../../config/logger");

var mongoose = require("mongoose"),
Gallery = mongoose.model("Gallery");

module.exports = function(app, config) {
    app.use("/api", router);

    router.get("/:userId/galleries", function(req, res, next) {
        logger.log("Get all galleries for user " + req.params.userId);

        var galleries = Gallery.find({ "userId": req.params.userId })
        .exec()
        .then(result => {
            if (result && result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "msg": "No galleries" });
            }
        })
        .catch(err => {
            return next(err);
        });
    });

    router.post("/:userId/galleries", function(req, res, next) {
        logger.log("Add a gallery with id for user " + req.params.userId);
        
        new Gallery(req.body)
        .save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        });
    });

    router.put("/:userId/galleries/:galleryId", function(req, res, next) {
        logger.log("Update a gallery with id " + req.params.galleryId + " for user " + req.params.userId);

        Gallery.findOneAndUpdate({ "_id": req.params.galleryId }, req.body, { "new": true, "multi": false })
        .then(gallery => {
            res.status(200).json(gallery);
        })
        .catch(err => {
            return next(err);
        });
    });
    
    router.delete("/:userId/galleries/:galleryId", function(req, res, next) {
        logger.log("Delete a gallery with id " + req.params.galleryId + " for user " + req.params.userId);

        Gallery.findOneAndRemove( { "_id": req.params.galleryId } )
        .then(gallery => {
            res.status(200).json({ "msg": "Gallery deleted" });
        })
        .catch(err => {
            return next(err);
        });
    });
}