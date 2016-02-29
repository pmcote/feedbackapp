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

function goto(sec){
    if(player){
        seconds = sec;
        player.seekTo(seconds, true);
    }
}

function openClose(eid) {
    if ($(eid).css('display') == 'none') {
        $(eid).show();
    }
    else {
        $(eid).hide();
    }
}

function formatSecString(secs) {
    var mins = Math.floor(secs/60);
    var se = Math.floor(secs % 60);
    return mins+"m"+se+"s";
}

// Handles adding a comment to the video, when you click the resulting comment, the video will go to the time posted
var $CommentForm = $('form.comment-form').unbind();
$CommentForm.submit(function handleComment(event){
  event.preventDefault();
  var $form = $(event.target);
  var $commentAppend = $('li').first().clone();
  var commentText = $form.find('input.comment-form-text').val();
  var descText = $form.find('textarea.comment-form-desc').val();
  var categ = $form.find("[name='categ']:checked").val();
  $form.find('input.comment-form-text').val('');
  $form.find('textarea.comment-form-desc').val('');
  var currentTime = player.getCurrentTime();

  $commentAppend.attr('onClick', 'goto('+ currentTime +')');
  $commentAppend.attr('class', categ);

  $commentAppend.find('#info').html('<b>'+commentText + '</b> (' + formatSecString(currentTime)+')');
  $commentAppend.find('div.readMore').attr('onClick', 'openClose('+commentText+')');
  $commentAppend.find('div.desc').attr('id', commentText);
  $commentAppend.find('div.desc').html(descText);

  console.log($commentAppend);
  //$commentAppend.text(commentText);

  $('.comments').append($commentAppend);

});

$('form.comment-form').validate();

// // truncates comments
// var $commentsSection = $('.comments').unbind();
