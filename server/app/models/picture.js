var Mongoose = require("mongoose");

var PictureSchema = new Mongoose.Schema({
    "GalleryId": { "type": ObjectID, "required": true },
    "Title": { "type": String, "required": true, "default": "Title"},
    "Description": { "type": String, "default": "Description" },
    "PictureDate": { "type": Date, "default": new Date() },
    "ImageFile": {
        "DisplayName": { "type": String, "default": "New picture"},
        "Filename": { "type": String, "required": true },
        "DateCreated": { "type": Date }
    }
});

module.exports = Mongoose.model("Picture", PictureSchema);