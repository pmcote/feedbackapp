var routes = {};
var util = require('util');
var Video = require('./../models/videoModel.js');
var Comment = require('./../models/commentModel.js');
var Reply = require('./../models/replyModel.js');

routes.video = function(req, res) {
  // var videoID = req.params.videoID; // This could also be name. That might be more useful for our demo, but this is more robust.
  var tempID = '56ec6d6a4c0fb046a0f5f182';
  // Find Video information, populating comments and replies. Pass to handlebars.
  Video.find({_id: tempID})
  .populate({path: 'comments', model: 'Comment',
  populate:{path: 'replies', model: 'Reply'}})
  .exec(function(err, video) {console.log(util.inspect(video, false, null));});

  res.render('home');
},

routes.newVideo = function(req, res) {
  var video = {};
  video.name = req.body.name;
  video.url = req.body.url;

  var saveVideo = new Video(video);

  saveVideo.save(function(err) {
    if (err) {console.log('err:', err);}
    else {console.log('save success');}
  });
},

routes.newComment = function(req, res) {
  var tempID = '56ec6d6a4c0fb046a0f5f182'; //This will be a capture of whatever video it is ObjectId("56eae22b7cd14f259b8323ea")

  var comment = {};
  comment.user = req.body.user;
  comment.text = req.body.text;
  comment.desc = req.body.desc;
  comment.category = req.body.category;
  console.log('comment', comment);
  // Save comment and get comment _id
  var saveComment = new Comment(comment);

  saveComment.save(function(err) {
    if (err) {console.log('err:', err);}
    else {
      // Add comment _id to Video's list of comments
      Video.findOneAndUpdate({_id: tempID},
        {$push: {comments: {_id: saveComment._id}}},
        {safe: true, upsert: true, new: true},
        function(err) {console.log('err updating video comments', err);}
      );
    }
  });

  res.send(comment);
},

routes.newReply = function(req, res) {
  var tempID = '56ec6dbb04491258a00f3377'; // This will also be a capture of the comment ID, we may want to make mongoose _id a class in Handlebars
  // Save reply and get reply _id
  var replyObj = {};
  replyObj.name = req.body.name;
  replyObj.reply = req.body.reply;

  var saveReply = new Reply(replyObj);

  saveReply.save(function(err){
    if (err) {
      console.log('error saving reply');
    } else {
      // Add reply to Comment's list of replies
      Comment.findOneAndUpdate({_id: tempID},
        {$push: {replies: {_id: saveReply._id}}},
        {safe: true, upsert: true, new: true},
        function(err) {console.log('err updating comment replies', err);}
      );
    }
  });

  res.send(replyObj);
}

module.exports = routes;
