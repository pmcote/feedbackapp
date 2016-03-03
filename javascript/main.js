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

function goto(sec, eid, buttonId){
    if(player){
        seconds = sec;
        player.seekTo(seconds, true);
      	player.pauseVideo();
      	openClose(eid, buttonId);
    }
}


function openClose(eid, buttonId){
  //this is way easier to do if the element that contains the button has an id that is identifiable. 
  //Each button needs a unique ID and it has to be referenced in both the goto and the openClose calls.
    console.log(eid);
    if ($(eid).css('display') == 'none') { 
        $(eid).show();
        $(buttonId).html("–");
    }
    else {
        $(eid).hide();
        $(buttonId).html("+");
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
  var $commentAppend = $('.comments li').first().clone(); // clones
  console.log($commentAppend);
  var name = $form.find('input.comment-form-name').val();
  var commentText = $form.find('input.comment-form-text').val();
  var descText = $form.find('textarea.comment-form-desc').val();
  var categ = $form.find("[name='categ']:checked").val();
  $form.find('input.comment-form-text').val('');
  $form.find('textarea.comment-form-desc').val('');
  $form.find('input.comment-form-name').val('');
  var currentTime = player.getCurrentTime();
  var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  var rand = alpha[Math.floor(Math.random() * alpha.length)];
  var randId = rand + Math.random().toString(36).slice(-5);
  var randIdopener = rand + Math.random().toString(36).slice(-5);

  console.log(randId);
  console.log(randIdopener);

  $commentAppend.attr('class', categ);

  $commentAppend.find('#info').html('<b>'+name+'</b> says: <b>'+commentText + '</b> (' + formatSecString(currentTime)+')');
  var gotostring = 'goto('+ currentTime +','+randId+','+randIdopener+')';
  $commentAppend.find('#info').attr('onClick', gotostring);
  $commentAppend.find('div.readMore').attr('id', randIdopener);
  $commentAppend.find('div.readMore').attr('onClick', 'openClose('+randId+','+randIdopener+')');
  $commentAppend.find('div.desc').attr('id', randId);
  $commentAppend.find('p').html(descText);

  $commentAppend.find('ul.all-replies').html(''); // erase comments
  $commentAppend.find('ul.all-replies').attr('id', randId);
  //$commentAppend.text(commentText);

  $('.comments').append($commentAppend);

  //$(randId).hide(); // why doesn't this work

  createReplies();
});

$('form.comment-form').validate();

// // truncates comments
// var $commentsSection = $('.comments').unbind();
