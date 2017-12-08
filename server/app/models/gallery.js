var Mongoose = require("mongoose"),
Schema = Mongoose.Schema;

var GallerySchema = new Schema({
    "UserId": { "type": Mongoose.SchemaTypes.ObjectId, "required": true },
    "Name": { "type": String, "required": true },
    "Description": { "type": String, "default": "Gallery Title" }
});

module.exports = Mongoose.model("Gallery", GallerySchema);