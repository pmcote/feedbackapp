var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  user: String,
  text: String,
  replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'reply'}]
});

module.exports = mongoose.model("Comment", commentSchema);
