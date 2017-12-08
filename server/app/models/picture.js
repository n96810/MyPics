var Mongoose = require("mongoose"),
Schema = Mongoose.Schema;

var PictureSchema = new Schema({
    "GalleryId": { "type": Mongoose.SchemaTypes.ObjectId, "required": true },
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