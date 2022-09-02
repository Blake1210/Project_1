
 var tag = document.createElement('script');
      
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


 var player;

 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
   height: '288',
   width: '512',
   videoId: 'r5X-hFf6Bwo',
   playerVars: {
     'playsinline': 1
   },
   events: {
     'onReady': onPlayerReady,
     'onStateChange': onPlayerStateChange
   }
     });
     var newVideoId = 'videoId';
     player[newVideoId] = search;
   }

     function onPlayerReady(event) {
     }
     var done = false;
     function onPlayerStateChange(event) {
       if (event.data == YT.PlayerState.PLAYING && done) {
         done = true;
       }
     }
     function stopVideo() {
       player.stopVideo();
     }

     url()