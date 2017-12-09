var Mongoose = require("mongoose"),
Schema = Mongoose.Schema;

var PictureSchema = new Schema({
    "galleryId": { "type": Mongoose.SchemaTypes.ObjectId, "required": true },
    "title": { "type": String, "required": true, "default": "Title"},
    "description": { "type": String, "default": "Description" },
    "pictureDate": { "type": Date, "default": new Date() },
    "imageFile": {
        "displayName": { "type": String, "default": "New picture"},
        "filename": { "type": String, "required": true },
        "dateCreated": { "type": Date, "default":new Date() }
    }
});

module.exports = Mongoose.model("Picture", PictureSchema);