var routes = {};
var Video = require('./../models/videoModel.js');
var Comment = require('./../models/commentModel.js');
var Reply = require('./../models/replyModel.js');

routes.video = function(req, res) {
  var videoID = req.params.videoID; // This could also be name. That might be more useful for our demo, but this is more robust.

  // Find Video information, populating comments and replies. Pass to handlebars.
  // Video.find({name:videoID})
  // .populate(comments)
  // .exec(function(err, video) {console.log(video);});
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

},

routes.newReply = function(req, res) {

}

module.exports = routes;
