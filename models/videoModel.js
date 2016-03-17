var mongoose = require("mongoose");

var videoSchema = mongoose.Schema({
  url: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model("Video", videoSchema);
