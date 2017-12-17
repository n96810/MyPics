var Mongoose = require("mongoose"),
Schema = Mongoose.Schema;

var PictureSchema = new Schema({
    "galleryId": { "type": Mongoose.SchemaTypes.ObjectId, "required": true },
    "name": { "type": String, "required": true, "default": "Title"},
    "description": { "type": String, "default": "Description" },
    "pictureDate": { "type": Date, "default": new Date() },
    "imageFile": {
        "originalName": { "type": String},
        "filename": { "type": String },
        "dateUploaded": { "type": Date, "default":new Date() }
    }
});

module.exports = Mongoose.model("Picture", PictureSchema);