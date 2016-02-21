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

// Handles adding a comment to the video, when you click the resulting comment, the video will go to the time posted
var $CommentForm = $('form.comment-form').unbind();
$CommentForm.submit(function handleComment(event){
  event.preventDefault();
  var $form = $(event.target);
  var $commentAppend = $('.comment').first().clone();
  var commentText = $form.find('input.comment-form-text').val();
  $form.find('input.comment-form-text').val('');
  var currentTime = player.getCurrentTime();
  $commentAppend.attr('onClick', 'goto('+ currentTime +')');
  $commentAppend.html(commentText);

  $('.comments').append($commentAppend);

});
