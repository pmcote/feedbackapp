var player, seconds = 0;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
          'onReady': onPlayerReady
        }
      });
}

function onPlayerReady(event) {
    event.target.playVideo();
}


function seek(sec){
    if(player){
        seconds += sec;
        player.seekTo(seconds, true);
    }
}

function goto(sec, eid){
    if(player){
        seconds = sec;
        player.seekTo(seconds, true);
	player.pauseVideo();
	openClose(eid, $(event.target));
    }
}


function openClose(eid, liElement) {
    if ($(eid).css('display') == 'none') {
        $(eid).show();
	if (liElement){
	    console.log(liElement.find(".readMore").html());
	    liElement.find(".readMore").html("-");
	}
	else{
	    console.log("openClose, being called from goto")
	    $(event.target).html("-");
	}
    }
    else {
        $(eid).hide();
	if (liElement){
	    console.log(liElement.find(".readMore").html());
	    liElement.find(".readMore").html("+");
	}
	else{
	    console.log("openClose, being called from goto")
	    $(event.target).html("+");
	}
    }
}

function openReply() {
  $(event.target).parent().find('form.reply-form').show();  
}

function formatSecString(secs) {
    var mins = Math.floor(secs/60);
    var se = Math.floor(secs % 60);
    return mins+"m"+se+"s";
}

var $newvideoform = $('form.new-video-text').unbind();
$newvideoform.submit(function uploadNew(event) {
  event.preventDefault();
  var $form = $(event.target);
  var videoURL = $form.find('input.new-video-text').val();
  l = videoURL.length;
  var newsrc = 'https://www.youtube.com/embed/' + videoURL.substring(l-11,l) + '?enablejsapi=1';
  $('#player').attr('src', newsrc);
});

function createReplies() {
  var $replyform = $('form.reply-form').unbind();
  $replyform.submit(function handeReply(event) {
    event.preventDefault();
    var $form = $(event.target);
    var name = $form.find('input.name').val();
    var reply = $form.find('input.reply-text').val();
    $form.find('input.name').val('');
    $form.find('input.reply-text').val('');
    console.log($form.parent().attr('id'));
    var newreply = "<li class='reply'><b>"+name+"</b> says: "+reply+"</li>";
    $('ul.all-replies#'+$form.parent().attr('id')).append(newreply);

    $form.hide(); 
  });
}

createReplies();

// Handles adding a comment to the video, when you click the resulting comment, the video will go to the time posted
var $CommentForm = $('form.comment-form').unbind();
$CommentForm.submit(function handleComment(event){
  event.preventDefault();
  var $form = $(event.target);
  var $commentAppend = $('li').first().clone(); // clones
  var name = $form.find('input.comment-form-name').val();
  var commentText = $form.find('input.comment-form-text').val();
  var descText = $form.find('textarea.comment-form-desc').val();
  var categ = $form.find("[name='categ']:checked").val();
  $form.find('input.comment-form-text').val('');
  $form.find('textarea.comment-form-desc').val('');
  $form.find('input.comment-form-name').val('');
  var currentTime = player.getCurrentTime();
  var randId = Math.random().toString(36).slice(-5);
  $commentAppend.attr('onClick', 'goto('+ currentTime +')');
  $commentAppend.attr('class', categ);

  $commentAppend.find('#info').html('<b>'+name+'</b> says: <b>'+commentText + '</b> (' + formatSecString(currentTime)+')');
  $commentAppend.find('div.readMore').attr('onClick', 'openClose('+randId+')');
  $commentAppend.find('div.desc').attr('id', randId);
  $commentAppend.find('p').html(descText);

  $commentAppend.find('ul.all-replies').html(''); // erase comments
  $commentAppend.find('ul.all-replies').attr('id', randId);
  //$commentAppend.text(commentText);

  $('.comments').append($commentAppend);

  $(randId).hide(); // why doesn't this work

  createReplies();
});

$('form.comment-form').validate();

// // truncates comments
// var $commentsSection = $('.comments').unbind();
