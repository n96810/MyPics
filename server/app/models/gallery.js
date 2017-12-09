var Mongoose = require("mongoose"),
Schema = Mongoose.Schema;

var GallerySchema = new Schema({
    "userId": { "type": Mongoose.SchemaTypes.ObjectId, "required": true },
    "name": { "type": String, "required": true },
    "description": { "type": String, "default": "Gallery description" }
});

module.exports = Mongoose.model("Gallery", GallerySchema);