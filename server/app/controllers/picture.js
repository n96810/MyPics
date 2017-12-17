"use strict"

var express = require("express"),
router = express.Router(),
logger = require("../../config/logger"),
multer = require("multer"),
mkdirp = require("mkdirp");

var mongoose = require("mongoose"),
Picture = mongoose.model("Picture");

module.exports = function(app, config) {
    var storage = multer.diskStorage({
        "destination": function(req, file, cb) {
            var path = config.uploads + "/" + req.params.galleryId + "/" + req.params.pictureId;
            mkdirp(path, function(err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        "filename": function(req, file, cb) {
            let fileName = file.originalname.split(".");
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
    });

    var upload = multer({ "storage": storage });

    app.use("/api", router);

    router.get("/galleries/:galleryId/pictures", function(req, res, next) { 
        logger.log("Get all pictures (thumbnails) for a user's gallery");
        var pictures = Picture.find({ "galleryId": req.params.galleryId })
        .exec()
        .then(result => {
            if (result && result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).json({"message": "No images found"});
            }
        })
        .catch(err => {
            return next(err);
        });
    });

    router.post("/pictures", function(req, res, next) {//OK
        logger.log("Add a picture to a user's gallery");

        new Picture(req.body)
        .save()
        .then(result => {
            if (result) {
                res.status(201).json(result);
            }
        })
        .catch(err => {
            return next(err);
        })
    });
    
    router.post("/pictures/:galleryId/:pictureId/files", upload.any(), function(req, res, next) {
        logger.log("Add image file for picture");

        Picture.findById(req.params.pictureId, function(err, picture) {
            if (err) {
                return next(err);
            } else {
                if (req.files) {
                    picture.imageFile = {
                        "filename": req.files[0].filename,
                        "originalName": req.files[0].originalname,
                        "dateUploaded": new Date()
                    };

                    picture.save()
                    .then(picture => {
                        res.status(200).json(picture);
                    })
                    .catch(err => {
                        return next(err);
                    })
                }
            }
        })
        

    });
    
    router.get("/galleries/:galleryId/pictures/:pictureId", function(req, res, next) {//OK
        logger.log("Get a single picture from a user's gallery");
        var picture = Picture.find({
            "galleryId": req.params.galleryId,
            "_id": req.params.pictureId
        })
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "msg": "No image found"});
            }
        });
    });

    router.put("/galleries/:galleryId/pictures/:pictureId", function(req, res, next) {//OK
        logger.log("Update a picture in a user's gallery");
        
        Picture.findOneAndUpdate({ "_id": req.params.pictureId }, req.body, { "multi": true, "new": false})
        .then(result => {
            if (result) {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            return next(err);
        });
    });

    router.delete("/galleries/:galleryId/pictures/:pictureId", function(req, res, next) {//OK
        logger.log("Delete a picture from a user's gallery");
        
        Picture.findOneAndRemove({ "_id": req.params.pictureId })
        .then(pciture => {
            res.status(200).json({ "msg": "Image deleted" });
        })
        .catch(err => {
            return next(err);
        });
    });
}