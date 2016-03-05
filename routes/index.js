var routes = {};
var Video = require('./../models/videoModel.js');
var Comment = require('./../models/commentModel.js');

routes.home = function(req, res){
  res.render("home");
};

module.exports = routes;