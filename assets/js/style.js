// 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
      
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
            });
          }
      
            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
              event.target.playVideo();
            }
      
            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;
            function onPlayerStateChange(event) {
              if (event.data == YT.PlayerState.PLAYING && !done) {
                done = true;
              }
            }
            function stopVideo() {
              player.stopVideo();
            }






$(document).ready(function() {

    function highlight(word, query) {
        let check = new RegExp(query, "ig")
        return word.toString().replace(check, function(matchedText) {
            return matchedText 
        })
    }

    $("#result-list").hide()
    $("#list").hide()

    $(".search-input").keyup(function() {
        let search = $(this).val()
        let results = ""
        if (search == "") {
            $("#result-list").hide()
            $(".search-input").removeClass("arrow").addClass("search")
        } else {
            $(".search-input").removeClass("search").addClass("arrow")
        }

        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", s: search }, function(data) {
            if (data.Search !== undefined) {
                $.each(data.Search, function(index, value) {
                    if (index < 2) {
                        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", i: value.imdbID }, function(movieData) {
                            if (movieData) {
                                results += '<div class="result row p-1" id="result">'
                                results += '<div class="col-sm-5" id="movie-poster"><img src=' + movieData.Poster + ' style="width: 170px; height: 250px;" /></div>'
                                results += '<div class="col-sm-7 text-left">'
                                results += '<div class="movie-title" id="movie-title">'+ highlight(movieData.Title, $(".search-input").val()) +' ('+ movieData.Year +')</div>'
                                results += '<div class="rating-div" id="movie-rating"><span class="h4 rating">'+ movieData.imdbRating +'</span>/10</div>'
                                results += '<div class="my-3">'
                                results += '<div id="language">Language: '+ movieData.Language + '</div>'
                                results += '<div id="actors">Stars: '+ movieData.Actors.split(",").slice(0, 3) + ' | <a href="#" id="button">Show All »</a></div>'
                                results += '</div>'
                                results += '<div class="my-3">'
                                results += '<div id="plot">'+ movieData.Plot.slice(0, 100) + '... <a href="single-repo.html">Details »</a></div>'
                                results += '</div>'
                                results += '</div>'
                                results += "</div>"
                                $("#results").html(results)
                                
                                var cast = document.getElementById("button")
                                console.log(cast)
                                cast.addEventListener("click", testing);

                                if (/Mobi|Android/i.test(navigator.userAgent)) {
                                    $("#results").children(".result").eq(1).hide();
                                } else {
                                    $(".result").first().after("<hr>")
                                }
                            }
                        })
                    }
                });
                $("#result-list").show()
            }
        });
    });
    
    $("#show-more").click(function(e) {
        e.preventDefault()
        var search = $(".search-input").val()
        let listResults = ""
        $("#search").hide()
        $("#list").show()
        $("#search-term").html("Results for: " + search)
        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", s: search }, function(listData) {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                $("#list-count").html("(" + listData.totalResults + ")")
            } else {
                $("#list-count").html(listData.totalResults + " movie found")
            }
            if (listData.Search !== undefined) {
                $.each(listData.Search, function(index, value) {
                    $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", i: value.imdbID }, function(listMovieData) {
                        if (listMovieData) {
                            listResults += '<div class="list-result col-6 p-3">'
                            listResults += '<div class="row">'
                            listResults += '<div class="col-md-6"><img src="' + listMovieData.Poster + '" style="width: 100%;" /></div>'
                            listResults += '<div class="col-md-6 text-left">'
                            listResults += '<div class="movie-title" id="movie-title">'+ listMovieData.Title, $(".search-input").val() +' ('+ listMovieData.Year +')</div>'
                            listResults += '<div class="rating-div" id="rating">'+ listMovieData.imdbRating +'/10 /div>'
                            listResults += '<div class="my-3">'
                            listResults += '<div id="langauge">Language: '+ listMovieData.Language + '</div>'
                            listResults += '<div>Stars: '+ listMovieData.Actors.split(",").slice(0, 3) + ' | <a href="#">Show All »</a></div>'
                            listResults += '</div>'
                            listResults += '<div class="my-3">'
                            listResults += '<div id="plot">'+ listMovieData.Plot.slice(0, 100) + '... <a href="#">Details »</a></div>'
                            listResults += '</div>'
                            listResults += '</div>' // col-6 end
                            listResults += "</div>" // row end
                            listResults += "</div>" // list-result col-6 end
                            $("#list-results").html(listResults)
                            $(".list-result:odd:not(:last-child)").after("<div class='col-12'><hr></div>")
                        }
                    })
                });
            }
        });
    });

    $("#searchAgain").click(function() {
        $("#search").show()
        $("#list").hide()
        $("#result-list").hide()
        $(".search-input").val("")
    });
});



function testing(pleaseWork) {
    var title = document.getElementById("movie-title")
    var rating = document.getElementById("movie-rating")
    var language = document.getElementById("language")
    var cast = document.getElementById("actors")
    var plot = document.getElementById("plot")
    var resultButton = document.getElementById("result")

    console.log("I am here")
    pleaseWork.preventDefault();

    localStorage.clear();
    console.log(title)
    console.log(rating)
    console.log(title.innerHTML)

    var movieInfo = {
      title: title.innerHTML,
      rating: rating.innerHTML,
      language: language.innerHTML,
      plot: plot.innerHTML,
    };
    console.log(movieInfo)
    localStorage.setItem("titleInfo", JSON.stringify(title.innerHTML));
    renderMessage();

    localStorage.setItem("ratingInfo", JSON.stringify(rating.innerHTML));
    renderMessage();
    localStorage.setItem("languageInfo", JSON.stringify(language.innerHTML));
    renderMessage();
    localStorage.setItem("plotInfo", JSON.stringify(plot.innerHTML));
    renderMessage();
    }