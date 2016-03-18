var mongoose = require("mongoose");

var replySchema = mongoose.Schema({
  user: String,
  reply: String
});

module.exports = mongoose.model("Reply", replySchema);
