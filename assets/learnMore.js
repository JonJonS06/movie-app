let requestMovieUrl = ' https://www.omdbapi.com/?apikey=9b9137db';
let backToHome = document.querySelector('#homeBtn');
let youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
let googleapiKey = 'AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc';
let youtubeVideoURL = 'https://www.googleapis.com/youtube/v3/videos'

backToHome.addEventListener('click', function() {
    localStorage.removeItem("imdbID")
    window.location.replace('./index.html');
})

var getMoreInfo = function(imdbID) {
    var apiUrl = requestMovieUrl + '&i=' + imdbID + '&plot=full';

    fetch(apiUrl)
        .then(function (response) {  
            if (response.ok) {
                response.json().then(function (data) {
                    displayMovieCard(data);
                    displayExtraInfo(data);
                });
            } else {
                modalDescription.textContent = 'Error: ' + response.statusText;
            }
        })
        .catch(function (error) {
            modalDescription.textContent = 'Unable to connect to OMDb database';
            $('.ui.modal').modal('show');
        })
}

function getMoreData () {
   var movie = JSON.parse(localStorage.getItem("imdbID"));
   getMoreInfo(movie);
   findVideo(movie);
}

getMoreData();

function displayMovieCard (data) {
    var cardContainer= document.getElementsByClassName('card-container');
    var uiCard = document.createElement('div')
    $(uiCard).addClass("ui card")
    var img = $('<img />', { 
    src: data.Poster,
    });
    img.appendTo($(uiCard));
    var main = document.createElement('div');
    $(main).addClass("content");
    var title = document.createElement('a');
    $(title).addClass("header movieTitle");
    title.textContent = data.Title;
    main.append(title);
    var meta = document.createElement('div');
    $(meta).addClass("meta");
    var year = document.createElement('span');
    $(year).addClass("year");
    year.textContent= data.Year;
    meta.append(year);
    var type = document.createElement('span');
    $(type).addClass("type");
    type.textContent= data.Type;
    meta.append(type);
    main.append(meta);
    uiCard.append(main);
    $(uiCard).appendTo(cardContainer);
    $(uiCard).addClass("column"); 
}

function displayExtraInfo(data) {
    var plot= document.getElementsByClassName('plot');
    $(plot).text(data.Plot);
    var cast= document.getElementsByClassName('cast');
    $(cast).text(data.Actors);
    var director= document.getElementsByClassName('director');
    $(director).text(data.Director);
    var writer= document.getElementsByClassName('writer');
    $(writer).text(data.Writer);
}

function findVideo(imdbID) {
  var query = `${youtubeURL}?part=snippet&q=${imdbID}%20trailer&key=${googleapiKey}`;
  if (document.getElementsByClassName('movieTitle')) {
    fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let videos = data.items;
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].snippet.title.includes(document.querySelector('.movieTitle').textContent)) {
          var videoMatch = videos[i];
          var videoID = videoMatch.id.videoId;
          var movieTrailerURL =`https://www.youtube.com/watch?v=${videoID}`;
          $(document).ready(showVideo(movieTrailerURL));
          break;
        }
      }
    })
  } else {
    setTimeout(findVideo, 15);
  }
}

function showVideo(video) {
  if (video){
    var embedlink = video.replace(/watch\?v=/,`embed/`)
    var videocontainer = document.createElement('div');
    $(videocontainer).addClass('ui container embed');
    var videoplayer = document.createElement('iframe');
    $(videocontainer).attr('id','video');
    $(videoplayer).attr('src',embedlink);
    $(videoplayer).attr('class','fluid ui container');
    $(videoplayer).appendTo(videocontainer);
    var main = document.getElementsByTagName('main');
    $(main).children().first().append(videocontainer);
  } else {
    setTimeout(showVideo,30);
  }
}