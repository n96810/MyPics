"use strict"

var express = require("express"),
router = express.Router(),
logger = require("../../config/logger");

var mongoose = require("mongoose"),
Picture = mongoose.model("Picture");

module.exports = function(app, config) {
    app.use("/api", router);

    router.get("/:userId/galleries/:galleryId/pictures", function(req, res, next) {
        logger.log("Get all pictures (thumbnails) for a user's gallery");
        
    });

    router.get("/:userId/galleries/:galleryId/pictures/:pictureId", function(req, res, next) {
        logger.log("Get a single picture from a user's gallery");
        var picture = Picture.find({
            "userId": req.params.userId,
            "galleryId": req.params.galleryId,
            "_id": req.params._id
        })
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "msg": "No image found"});
            }
        });
    });

    router.post("/:userId/galleries/:galleryId/pictures", function(req, res, next) {
        logger.log("Add a picture to a user's gallery");

        new Picture(req.body)
        .save()
        .then(result => {
            if (result) {
                res.status(201).json()
            }
        })
        .catch(err => {
            return next(err);
        })
    });

    router.put("/:userId/galleries/:galleryId/pictures/:pictureId", function(req, res, next) {
        logger.log("Update a picture in a user's gallery");
        
        Picture.findOneAndUpdate({ "_id": req.params._id }, req.body, { "multi": true, "new": false})
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            return next(err);
        });
    });

    router.delete("/:userId/galleries/:galleryId/pictures/:pictureId", function(req, res, next) {
        logger.log("Delete a picture from a user's gallery");
        
        Picture.findOneAndRemove({ "_id": req.params._id }, req.body, { "multi": true, "new": false})
        .then(result => {
            if (result) {
                res.status(200).json({ "msg": "Image deleted" });
            }
        })
        .catch(err => {
            return next(err);
        });
    });
}