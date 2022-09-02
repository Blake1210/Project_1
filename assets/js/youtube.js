var API_KEY = "AIzaSyBXT5ItW1SRT6wG4faRYr2wamNpvnyDy0w";
var search = "";
var maxResults=1;

search = $(".search-input").val();

$("#duration").change(function () {
  duration = $(this).children("option:selected").val();
});
$("#order").change(function () {
  order = $(this).children("option:selected").val();
});

$("#myForm").submit(function (event) {
  e.preventDefault();

  var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}
      &part=snippet&q=${search}&maxResults=${maxResults}&type=video`;

  $.ajax({
    method: "GET",
    url: url,
    beforeSend: function () {
      $("#btn").attr("disabled", true);
      $("#results").empty();
    },
    success: function (data) {
      console.log(data);
      $("#btn").attr("disabled", false);
      displayVideos(data);
    },
  });
});

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