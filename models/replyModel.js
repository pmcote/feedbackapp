var mongoose = require("mongoose");

var replySchema = mongoose.Schema({
  user: String,
  text: String
});

module.exports = mongoose.model("Reply", replySchema);
