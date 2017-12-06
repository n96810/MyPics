var Mongoose = require("mongoose"),
Schema = mongoose.Schema;

var GallerySchema = new Schema({
    "UserId": { "type": ObjectID, "required": true },
    "Name": { "type": String, "required": true },
    "Description": { "type": String, "default": "Gallery Title" }
});

module.exports = Mongoose.model("Gallery", GallerySchema);